import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | Milan Joshi",
  description:
    "Get in touch with Milan Joshi about web development, projects, digital strategy or life insurance.",
};

export default function ContactPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">CONTACT · BHAKTAPUR, NEPAL</p>

          <h1>
            Let&apos;s <span>connect.</span>
          </h1>

          <p className="hero-description">
            Have an idea, project or question? I&apos;d love to hear about it.
            Reach out through the verified form below or connect via email, LinkedIn, or WhatsApp.
          </p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Validated Contact Form */}
            <div className="contact-form-column">
              <ContactForm />
            </div>

            {/* Direct Connect Options */}
            <aside className="contact-direct-column">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">DIRECT CHANNELS</p>
                  <h2>Quick contact.</h2>
                </div>
                <p>
                  Prefer direct communication? Reach out via any of these channels anytime.
                </p>
              </div>

              <div className="contact-direct-cards">
                <a href="mailto:mail@milanjoshi.com.np" className="explore-card contact-direct-card">
                  <h3>Email</h3>
                  <p>The best way to reach me for project inquiries and detailed briefs.</p>
                  <span className="contact-card-detail">mail@milanjoshi.com.np →</span>
                </a>

                <a
                  href="https://linkedin.com/in/milanjoshi18"
                  className="explore-card contact-direct-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>LinkedIn</h3>
                  <p>Connect professionally, explore recommendations, and review experience.</p>
                  <span className="contact-card-detail">View LinkedIn profile →</span>
                </a>

                <a
                  href="https://wa.me/9779823267863"
                  className="explore-card contact-direct-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>WhatsApp</h3>
                  <p>Message me directly for timely project questions or consultations.</p>
                  <span className="contact-card-detail">+977 982-326-7863 →</span>
                </a>

                <div className="contact-location-card">
                  <span className="eyebrow">BASE LOCATION</span>
                  <p className="contact-location-city">Bhaktapur · Kathmandu Valley</p>
                  <p className="contact-location-sub">Nepal · Time Zone: UTC+05:45 (NPT)</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
