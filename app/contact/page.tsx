import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Contact | Milan Joshi",
  "Get in touch with Milan Joshi about web development, projects, digital strategy or life insurance.",
  "/contact"
);

export default function ContactPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">CONTACT</p>

          <h1>
            Let&apos;s <span>connect.</span>
          </h1>

          <p className="hero-description">
            Have an idea, project or question? I&apos;d love to hear about it.
            Reach out and let&apos;s start a conversation.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">GET IN TOUCH</p>
              <h2>Start a conversation.</h2>
            </div>
            <p>
              Whether it&apos;s a website, a project plan or a life insurance
              question — I&apos;m here to help.
            </p>
          </div>

          <div className="explore-grid">
            <a href="mailto:mail@milanjoshi.com.np" className="explore-card">
              <h3>Email</h3>
              <p>The best way to reach me for project inquiries.</p>
              <span className="contact-card-detail">mail@milanjoshi.com.np →</span>
            </a>

            <a href="https://linkedin.com/in/milanjoshi18" className="explore-card" target="_blank" rel="noopener noreferrer">
              <h3>LinkedIn</h3>
              <p>Connect professionally and view my background.</p>
              <span className="contact-card-detail">View LinkedIn profile →</span>
            </a>

            <a href="https://wa.me/9779823267863" className="explore-card" target="_blank" rel="noopener noreferrer">
              <h3>WhatsApp</h3>
              <p>Message me directly about a project or question.</p>
              <span className="contact-card-detail">+977 982-326-7863 →</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
