"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Mic, MicOff, Volume2, VolumeX, X, Send, Sparkles, MessageSquare, Radio, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "model" | "system";
  text: string;
  time: string;
}

interface StartupConversationProps {
  isOpen: boolean;
  onClose: () => void;
}

function floatTo16BitPCM(input: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(input.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const suggestedPrompts = [
  "Tell me about your background and roots in Bhaktapur.",
  "What was your role in the Mission Oxygen initiative?",
  "What are your 6 core principles for work and life?",
  "Can you explain your Governor for the Future credential?",
  "What services do you offer for projects or life insurance?",
];

export default function StartupConversation({ isOpen, onClose }: StartupConversationProps) {
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Connecting to Gemini Live...");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "model",
      text: "Namaste! I am Milan Joshi's interactive portfolio assistant powered by Gemini 3.8 Live. Feel free to speak or type any questions about Milan's work, credentials, public health initiatives, or principles.",
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [micPermissionError, setMicPermissionError] = useState<string | null>(null);

  // WebSockets & Audio References
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const scheduledSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const isMutedRef = useRef(isMuted);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  isMutedRef.current = isMuted;

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAssistantSpeaking]);

  // Clean stop audio playback
  const stopAllPlayback = useCallback(() => {
    scheduledSourcesRef.current.forEach((src) => {
      try {
        src.stop();
        src.disconnect();
      } catch {}
    });
    scheduledSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
    setIsAssistantSpeaking(false);
  }, []);

  // Play audio chunk at 24kHz
  const playAudioChunk = useCallback((base64Audio: string) => {
    if (isMutedRef.current) return;

    try {
      if (!outputAudioCtxRef.current) {
        // @ts-ignore
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        outputAudioCtxRef.current = new AudioContextClass({ sampleRate: 24000 });
      }

      const outputCtx = outputAudioCtxRef.current;
      if (outputCtx.state === "suspended") {
        outputCtx.resume();
      }

      const binary = atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const audioBuffer = outputCtx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);

      const source = outputCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(outputCtx.destination);

      const currentTime = outputCtx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime;
      }

      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;

      scheduledSourcesRef.current.push(source);
      setIsAssistantSpeaking(true);

      source.onended = () => {
        scheduledSourcesRef.current = scheduledSourcesRef.current.filter((s) => s !== source);
        if (scheduledSourcesRef.current.length === 0) {
          setIsAssistantSpeaking(false);
        }
      };
    } catch (e) {
      console.error("[Audio Playback Error]", e);
    }
  }, []);

  // Connect WebSocket to Gemini Live API
  const connectLiveWebSocket = useCallback(() => {
    if (typeof window === "undefined") return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/api/live-ws`;

    setStatusMessage("Connecting to Gemini Live...");

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsLiveConnected(true);
        setStatusMessage("Gemini 3.8 Live active · Speak or type");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === "audio" && data.audio) {
            playAudioChunk(data.audio);
          } else if (data.type === "transcript") {
            const sender = data.sender === "user" ? "user" : "model";
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              // Append to last message if same sender and recent
              if (last && last.sender === sender && Date.now() - Number(last.id) < 6000) {
                return [
                  ...prev.slice(0, -1),
                  { ...last, text: `${last.text} ${data.text}`.trim() },
                ];
              }
              return [
                ...prev,
                {
                  id: String(Date.now()),
                  sender,
                  text: data.text,
                  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ];
            });
          } else if (data.type === "interrupted") {
            stopAllPlayback();
          } else if (data.type === "turnComplete") {
            // Finished current response turn
          } else if (data.error) {
            console.warn("[Live API Server Message]:", data.error);
            setStatusMessage("Voice proxy connecting (Text chat active)");
          }
        } catch (e) {
          console.error("[Live WS Message Error]", e);
        }
      };

      ws.onerror = () => {
        setIsLiveConnected(false);
        setStatusMessage("Voice server standby (Instant text fallback ready)");
      };

      ws.onclose = () => {
        setIsLiveConnected(false);
      };
    } catch (e) {
      console.error("[Live WS Connection Error]", e);
      setIsLiveConnected(false);
    }
  }, [playAudioChunk, stopAllPlayback]);

  // Start capturing microphone at 16kHz
  const startMic = async () => {
    setMicPermissionError(null);

    if (typeof window === "undefined" || !navigator?.mediaDevices?.getUserMedia) {
      setMicPermissionError("Microphone input is not supported in this browser environment.");
      setStatusMessage("Mic unavailable · Text mode active");
      return;
    }

    try {
      stopAllPlayback();

      // @ts-ignore
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      inputAudioCtxRef.current = inputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      mediaStreamRef.current = stream;

      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(inputCtx.destination);

      processor.onaudioprocess = (e) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        const inputChannelData = e.inputBuffer.getChannelData(0);

        // Calculate simple volume level for visualizer
        let sum = 0;
        for (let i = 0; i < inputChannelData.length; i++) {
          sum += Math.abs(inputChannelData[i]);
        }
        const avg = sum / inputChannelData.length;
        setVolumeLevel(Math.min(100, Math.round(avg * 450)));

        const pcm16 = floatTo16BitPCM(inputChannelData);
        const base64 = arrayBufferToBase64(pcm16);

        wsRef.current.send(JSON.stringify({ audio: base64 }));
      };

      setIsMicActive(true);
      setMicPermissionError(null);
      setStatusMessage("Listening... Speak now");
    } catch (err: any) {
      const isDenied =
        err?.name === "NotAllowedError" ||
        err?.name === "PermissionDeniedError" ||
        String(err?.message || err).toLowerCase().includes("permission");

      if (isDenied) {
        setMicPermissionError("Microphone permission was denied. You can enable it in your browser settings or continue chatting smoothly using text below.");
        setStatusMessage("Mic permission denied · Text conversation active");
      } else {
        setMicPermissionError("Microphone is currently unavailable. Text conversation is active.");
        setStatusMessage("Mic unavailable · Text mode active");
      }
      setIsMicActive(false);
    }
  };

  const stopMic = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close().catch(() => {});
      inputAudioCtxRef.current = null;
    }
    setIsMicActive(false);
    setVolumeLevel(0);
    setStatusMessage("Microphone paused · Click mic to speak");
  };

  const toggleMic = () => {
    if (isMicActive) {
      stopMic();
    } else {
      startMic();
    }
  };

  // Initialize connection when dialog opens
  useEffect(() => {
    if (isOpen) {
      connectLiveWebSocket();
    } else {
      stopMic();
      stopAllPlayback();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    }
    return () => {
      stopMic();
      stopAllPlayback();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [isOpen, connectLiveWebSocket, stopAllPlayback]);

  // Send message via text (WebSocket or HTTP fallback)
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    setInputText("");
    const newMsg: Message = {
      id: String(Date.now()),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);

    // If WebSocket is connected, send text over Live session
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text }));
      return;
    }

    // Fallback: send to Next.js API route /api/conversation
    setIsTextLoading(true);
    try {
      const res = await fetch("/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6),
        }),
      });

      const data = await res.json();
      if (data.text) {
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            sender: "model",
            text: data.text,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            sender: "system",
            text: `Note: ${data.error}`,
            time: "System",
          },
        ]);
      }
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          sender: "system",
          text: "Unable to contact assistant server. Please check connection.",
          time: "System",
        },
      ]);
    } finally {
      setIsTextLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="startup-conversation-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="conversation-modal-title"
    >
      <div className="startup-conversation-modal">
        {/* Modal Header */}
        <div className="startup-conversation-header">
          <div className="startup-conversation-header-info">
            <div className="startup-conversation-badge">
              <span className={`status-dot ${isLiveConnected ? "is-live" : ""}`} />
              <span>GEMINI 3.8 LIVE</span>
            </div>
            <h2 id="conversation-modal-title">Conversational Portfolio Assistant</h2>
            <p className="startup-conversation-status">{statusMessage}</p>
          </div>

          <div className="startup-conversation-controls">
            <button
              type="button"
              className={`startup-conversation-mode-toggle ${mode === "voice" ? "is-active" : ""}`}
              onClick={() => setMode(mode === "voice" ? "text" : "voice")}
              title={mode === "voice" ? "Switch to Text mode" : "Switch to Voice mode"}
              aria-label="Toggle between voice and text view"
            >
              {mode === "voice" ? <MessageSquare size={14} /> : <Radio size={14} />}
              <span>{mode === "voice" ? "Text View" : "Voice View"}</span>
            </button>

            <button
              type="button"
              className="startup-conversation-close"
              onClick={onClose}
              aria-label="Close conversation modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Voice Visualizer Section */}
        {mode === "voice" && (
          <div className="startup-conversation-voice-stage">
            <div
              className={`startup-conversation-orb ${
                isAssistantSpeaking ? "is-speaking" : isMicActive ? "is-listening" : ""
              }`}
              style={{
                transform: `scale(${1 + (isMicActive ? volumeLevel / 120 : isAssistantSpeaking ? 0.15 : 0)})`,
              }}
            >
              <div className="orb-ring ring-1" />
              <div className="orb-ring ring-2" />
              <div className="orb-core">
                <Sparkles size={28} className="orb-icon" />
              </div>
            </div>

            <div className="startup-conversation-voice-indicators">
              {isAssistantSpeaking ? (
                <span className="voice-status-pill is-speaking-pill">
                  Assistant is speaking...
                </span>
              ) : isMicActive ? (
                <span className="voice-status-pill is-listening-pill">
                  Listening to you ({volumeLevel}%)
                </span>
              ) : (
                <span className="voice-status-pill">Microphone is idle</span>
              )}
            </div>

            <div className="startup-conversation-voice-actions">
              <button
                type="button"
                className={`startup-voice-mic-btn ${isMicActive ? "is-active" : ""}`}
                onClick={toggleMic}
                aria-label={isMicActive ? "Stop microphone" : "Start microphone"}
              >
                {isMicActive ? <Mic size={22} /> : <MicOff size={22} />}
                <span>{isMicActive ? "Mute Mic" : "Start Speaking"}</span>
              </button>

              <button
                type="button"
                className={`startup-voice-mute-btn ${isMuted ? "is-muted" : ""}`}
                onClick={() => {
                  if (!isMuted) stopAllPlayback();
                  setIsMuted(!isMuted);
                }}
                aria-label={isMuted ? "Unmute assistant voice" : "Mute assistant voice"}
                title={isMuted ? "Unmute speaker" : "Mute speaker"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <button
                type="button"
                className="startup-voice-reconnect-btn"
                onClick={connectLiveWebSocket}
                title="Reconnect session"
                aria-label="Reconnect live session"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {micPermissionError && (
              <div className="mic-permission-notice" role="alert">
                <p>{micPermissionError}</p>
                <div className="mic-permission-actions">
                  <button
                    type="button"
                    className="mic-notice-btn is-primary"
                    onClick={() => {
                      setMode("text");
                      setMicPermissionError(null);
                    }}
                  >
                    Switch to Text Mode
                  </button>
                  <button
                    type="button"
                    className="mic-notice-btn"
                    onClick={() => startMic()}
                  >
                    Retry Mic Access
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Conversation Transcript Stream */}
        <div className="startup-conversation-body">
          <div className="startup-conversation-messages">
            {messages.map((m) => (
              <div key={m.id} className={`startup-message is-${m.sender}`}>
                <div className="startup-message-header">
                  <span className="startup-message-sender">
                    {m.sender === "model" ? "Milan's Assistant" : m.sender === "user" ? "You" : "System"}
                  </span>
                  <span className="startup-message-time">{m.time}</span>
                </div>
                <div className="startup-message-text">{m.text}</div>
              </div>
            ))}

            {isTextLoading && (
              <div className="startup-message is-model">
                <div className="startup-message-header">
                  <span className="startup-message-sender">Milan&apos;s Assistant</span>
                </div>
                <div className="startup-message-typing">Thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="startup-conversation-suggestions">
            <span className="startup-suggestions-title">Ask about:</span>
            <div className="startup-suggestions-tags">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="startup-suggestion-chip"
                  onClick={() => handleSendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Text Input Footer */}
        <div className="startup-conversation-footer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="startup-conversation-input-form"
          >
            <input
              type="text"
              className="startup-conversation-input"
              placeholder="Ask anything about Milan Joshi or his work..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              type="submit"
              className="startup-conversation-send-btn"
              disabled={!inputText.trim()}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
