"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error("App boundary error caught:", error);
  }, [error]);

  return (
    <div className="error-container">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">SYSTEM · ERROR RECOVERY</p>
          <h1>
            Something went <span>unexpectedly wrong.</span>
          </h1>
          <p className="hero-description">
            We encountered an unexpected issue while loading this page. You can try refreshing or return to the main showcase.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "32px" }}>
            <button
              type="button"
              onClick={() => reset()}
              className="button button-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
            >
              <RefreshCw size={16} />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="button"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
