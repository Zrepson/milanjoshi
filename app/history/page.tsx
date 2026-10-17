import Link from "next/link";

export const metadata = {
  title: "History | Milan Joshi",
  description: "A new space for Milan Joshi's history and archive.",
};

export default function HistoryPage() {
  return (
    <section className="history-placeholder">
      <div className="container history-placeholder-inner">
        <p className="eyebrow"><span className="status-dot" /> MILAN JOSHI · HISTORY</p>
        <h1>Past work.<br /><span>Useful context.</span></h1>
        <p className="history-placeholder-copy">
          This space is being prepared for stories, milestones, projects, and the moments that shaped the work.
        </p>
        <div className="history-placeholder-actions">
          <span className="history-placeholder-status">CONTENT COMING SOON</span>
          <Link href="/" className="text-link">Return to the main site <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
