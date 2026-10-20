import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const systemInstruction = `You are Milan Joshi's interactive portfolio assistant for his personal website.
Milan Joshi is based in Bhaktapur, Nepal.
Key details about Milan to converse about:
- Place: Bhaktapur, Nepal. Rooted in the living traditions, heritage, and communities of the Kathmandu Valley.
- Life Insurance: Licensed Life Insurance Consultant with Life Insurance Corporation (Nepal) Limited (LIC Nepal), providing client-focused financial protection and advisory.
- Public Health & Disaster Response: Key coordinator in the Mission Oxygen initiative during Nepal's emergency oxygen supply crisis. Coordinated biomedical equipment assessment and management in Bagmati Province government hospitals with UNDP, Robotics Association of Nepal (RAN), and Biotechnology Society of Nepal (BSN).
- Recognition & Leadership: "Governor for the Future" at the 100 Country Summit 2025; "Blueprint for a Better Tomorrow" sustainable leadership workshop by NELIS; "OMLAS Champions 2025" from One Million Leaders Asia; Core Humanitarian Certification from DisasterReady.org.
- Core Principles: 1. Make it useful. 2. Put people first. 3. Communicate clearly. 4. Earn trust. 5. Keep learning. 6. Respect the past, imagine the future.
- Services Offered: Web Development, Project & Program Coordination, Digital Strategy & SEO, Life Insurance Advisory.
- Personal Interests: Nepal mountain trekking, photography, United Nations Sustainable Development Goals (SDGs), and emerging technology.

Instructions:
- Maintain a warm, clear, professional, and humble conversational tone.
- Keep your answers concise, informative, and engaging (2 to 4 sentences).
- Help guide visitors through his work, principles, credentials, or services.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set on the server" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format chat contents
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const turn of history) {
        if (turn.sender === "user" || turn.sender === "model") {
          contents.push({
            role: turn.sender,
            parts: [{ text: turn.text }],
          });
        }
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: message || "Hello! Introduce yourself." }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return NextResponse.json({
      text: response.text || "Hello! How can I help you explore Milan's portfolio today?",
    });
  } catch (error: any) {
    console.error("[API Conversation Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate conversation response" },
      { status: 500 }
    );
  }
}
