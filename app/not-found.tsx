import Link from "next/link";
import { Home, Compass, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Page Not Found (404) | Milan Joshi",
  description: "The requested page could not be found.",
};

export default function NotFound() {

  return (
    <div className="not-found-container py-16">
      <section className="hero">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="eyebrow tracking-widest text-xs uppercase font-semibold text-slate-500 mb-2">
            404 · PAGE NOT FOUND
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Road not <span className="text-amber-600">found.</span>
          </h1>
          <p className="hero-description text-slate-600 max-w-xl mx-auto leading-relaxed">
            Like a mountain trail obscured by fog, the page or resource you requested isn&apos;t here.
            It may have moved, or the URL might be mistyped.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              href="/"
              className="button button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              <Home size={16} />
              <span>Return Home</span>
            </Link>
            <Link
              href="/work"
              className="button inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
            >
              <Compass size={16} />
              <span>Explore Work &amp; Experience</span>
            </Link>
            <Link
              href="/contact"
              className="button inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
            >
              <MessageSquare size={16} />
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
