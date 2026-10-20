"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Mic, Sparkles } from "lucide-react";

const StartupConversation = dynamic(() => import("@/components/StartupConversation"), {
  ssr: false,
});

export default function HomeStartupExperience() {
  const [isConversationOpen, setIsConversationOpen] = useState(false);

  // Auto-open on initial startup after a brief delay
  useEffect(() => {
    const hasSeenStartup = sessionStorage.getItem("milan-seen-startup-conversation");
    if (!hasSeenStartup) {
      const timer = setTimeout(() => {
        setIsConversationOpen(true);
        sessionStorage.setItem("milan-seen-startup-conversation", "true");
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <div className="hero-conversation-cta">
        <button
          type="button"
          className="button button-primary startup-voice-hero-btn"
          onClick={() => setIsConversationOpen(true)}
          aria-haspopup="dialog"
        >
          <Sparkles size={16} className="sparkle-gold" aria-hidden="true" />
          <span>Talk with Milan (Live Voice)</span>
          <Mic size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Floating launcher so users can re-open anytime from anywhere on the page */}
      <button
        type="button"
        className="floating-voice-launcher"
        onClick={() => setIsConversationOpen(true)}
        aria-label="Open Live Voice Conversation with Gemini 3.8"
        title="Open Live Voice Conversation (Gemini 3.8 Live)"
      >
        <span className="floating-voice-pulse" />
        <Mic size={20} />
        <span className="floating-voice-label">Live Voice</span>
      </button>

      <StartupConversation
        isOpen={isConversationOpen}
        onClose={() => setIsConversationOpen(false)}
      />
    </>
  );
}
