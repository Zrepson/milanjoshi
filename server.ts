import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const systemInstruction = `You are Milan Joshi's interactive portfolio voice assistant for his website.
Milan Joshi is based in Bhaktapur, Nepal.
Key details about Milan to converse about:
- Place: Bhaktapur, Nepal. Rooted in the heritage, living traditions, and communities of the Kathmandu Valley.
- Life Insurance: Licensed Life Insurance Consultant with Life Insurance Corporation (Nepal) Limited (LIC Nepal), providing client-focused financial protection and advisory.
- Public Health & Disaster Response: Key coordinator in the Mission Oxygen initiative during Nepal's emergency oxygen supply crisis. Coordinated biomedical equipment assessment and management in Bagmati Province government hospitals with UNDP, Robotics Association of Nepal (RAN), and Biotechnology Society of Nepal (BSN).
- Recognition & Leadership: "Governor for the Future" at the 100 Country Summit 2025; "Blueprint for a Better Tomorrow" sustainable leadership workshop by NELIS; "OMLAS Champions 2025" from One Million Leaders Asia; Core Humanitarian Certification from DisasterReady.org.
- Core Principles: 1. Make it useful. 2. Put people first. 3. Communicate clearly. 4. Earn trust. 5. Keep learning. 6. Respect the past, imagine the future.
- Services Offered: Web Development, Project & Program Coordination, Digital Strategy & SEO, Life Insurance Advisory.
- Personal Interests: Nepal mountain trekking, photography, United Nations Sustainable Development Goals (SDGs), and emerging technology.

Instructions:
- Maintain a warm, clear, professional, and humble conversational tone.
- Keep your spoken responses concise (2 to 4 sentences) so voice dialogue flows naturally.
- Answer questions directly and offer to guide the user to relevant pages on the website.`;

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error handling request:", err);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  });

  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (req, socket, head) => {
    const { pathname } = parse(req.url || "", true);
    if (pathname === "/api/live-ws") {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on("connection", async (clientWs: WebSocket) => {
    console.log("[Live API] Client connected to WebSocket");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      clientWs.send(JSON.stringify({ error: "GEMINI_API_KEY is not configured on the server" }));
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const session = await ai.live.connect({
        model: "gemini-3.8-live",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          // @ts-ignore
          outputAudioTranscription: {},
          // @ts-ignore
          inputAudioTranscription: {},
          systemInstruction,
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            // Audio chunk from model
            const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: "audio", audio }));
            }

            // Output transcription
            // @ts-ignore
            const outputText = message.serverContent?.outputAudioTranscription?.text;
            if (outputText && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: "transcript", text: outputText, sender: "model" }));
            }

            // Input transcription
            // @ts-ignore
            const inputText = message.serverContent?.inputAudioTranscription?.text;
            if (inputText && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: "transcript", text: inputText, sender: "user" }));
            }

            if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: "interrupted", interrupted: true }));
            }

            if (message.serverContent?.turnComplete && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: "turnComplete" }));
            }
          },
        },
      });

      clientWs.on("message", (data) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: "audio/pcm;rate=16000" },
            });
          } else if (parsed.text) {
            session.sendRealtimeInput({
              text: parsed.text,
            });
          }
        } catch (e) {
          console.error("[Live API] Error parsing client message:", e);
        }
      });

      clientWs.on("close", () => {
        console.log("[Live API] Client disconnected");
        try {
          session.close();
        } catch {}
      });
    } catch (err: any) {
      console.error("[Live API] Connection error:", err);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ error: err?.message || "Failed to connect to Live API" }));
      }
    }
  });

  server.listen(port, hostname, () => {
    console.log(`> Server ready on http://${hostname}:${port}`);
  });
});
