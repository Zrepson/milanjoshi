import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Impact | Milan Joshi",
  "Selected contributions across public health, project coordination, sustainable development and emerging technology.",
  "/impact"
);

const contributions = [
  {
    title: "Health systems",
    description:
      "Worked with partners on biomedical equipment assessment and management in Bagmati Province government hospitals, contributing to research, field data, reporting, training and capacity building.",
    label: "PUBLIC HEALTH",
    href: "/work#moments",
    linkLabel: "See related field work",
  },
  {
    title: "Connecting teams",
    description:
      "Across development and public health projects, my work has involved bringing people, institutions and practical delivery together around shared objectives.",
    label: "COORDINATION",
    href: "/work#timeline",
    linkLabel: "See related experience",
  },
  {
    title: "Sustainable development",
    description:
      "My personal interest in the SDGs guides ongoing learning about inclusive communities, climate action, health, education, innovation and responsible development. It is not an official UN affiliation.",
    label: "PERSONAL INTEREST",
    href: "#sustainable-development",
    linkLabel: "Read about this interest",
  },
];

const sdgGoals = [
  "No Poverty",
  "Zero Hunger",
  "Good Health and Well-Being",
  "Quality Education",
  "Gender Equality",
  "Clean Water and Sanitation",
  "Affordable and Clean Energy",
  "Decent Work and Economic Growth",
  "Industry, Innovation and Infrastructure",
  "Reduced Inequalities",
  "Sustainable Cities and Communities",
  "Responsible Consumption and Production",
  "Climate Action",
  "Life Below Water",
  "Life on Land",
  "Peace, Justice and Strong Institutions",
  "Partnerships for the Goals",
];

export default function ImpactPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">IMPACT &amp; CONTRIBUTIONS</p>

          <h1>
            Exploring ideas with <span>practical impact.</span>
          </h1>

          <p className="hero-description">
            Selected contributions in public health and project coordination,
            alongside a personal interest in sustainable development.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED CONTRIBUTIONS</p>
              <h2>Work with practical purpose.</h2>
            </div>
            <p>
              A snapshot of areas where my experience, collaboration and
              personal interests meet practical needs. Follow each link for
              more context and related material.
            </p>
          </div>

          <div className="explore-grid">
            {contributions.map((item) => (
              <article className="explore-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>{item.label}</span>
                <Link
                  href={item.href}
                  className="text-link impact-related-link"
                  aria-label={`${item.linkLabel}: ${item.title}`}
                >
                  {item.linkLabel} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work-interest-section" id="sustainable-development">
        <div className="container">
          <div className="work-interest-grid">
            <div className="work-interest-heading">
              <p className="eyebrow">PERSONAL INTEREST</p>
              <h2>Interest in sustainable development.</h2>
              <figure className="work-interest-photo">
                <div className="work-interest-photo-image">
                  <Image
                    src="/images/work-profile/sustainable-development-dialogue.jpg"
                    alt="Milan at a Youth Dialogue on the Sustainable Development Goals"
                    fill
                    sizes="(max-width: 850px) 100vw, 32vw"
                  />
                </div>
                <figcaption>Youth Dialogue on the SDGs · June 11, 2022</figcaption>
              </figure>
            </div>
            <div className="work-interest-copy">
              <p>
                I have a strong personal interest in the <strong>United Nations
                Sustainable Development Goals (SDGs)</strong> and the broader
                global development agenda. I see the SDGs as an important
                framework for understanding some of the world&apos;s most pressing
                challenges and for encouraging meaningful action at the
                individual, community, national, and global levels.
              </p>
              <p>
                My interests include <strong>sustainable cities and communities,
                climate action, good health and well-being, quality education,
                decent work, innovation, social inclusion, humanitarian response,
                and responsible development.</strong> Through my professional
                experience, community engagement, volunteering, continuous
                learning, and personal initiatives, I seek opportunities to
                contribute to areas that support a more inclusive, resilient, and
                sustainable future.
              </p>
              <p>
                I am particularly interested in how <strong>individual action,
                technology, community participation, responsible institutions,
                and cross-sector collaboration</strong> can contribute to
                sustainable development. I believe meaningful change does not
                always begin with large organizations—it can also begin with
                informed individuals taking practical action within their
                communities.
              </p>
              <p className="work-interest-disclaimer">
                My engagement with the SDGs represents a <strong>personal
                commitment and area of interest</strong>, rather than an official
                affiliation or representation of the United Nations. I continue
                to learn, participate, and explore ways to translate global
                development principles into practical initiatives and everyday
                action.
              </p>
            </div>
          </div>
          <div className="work-sdg-goals">
            <details className="work-sdg-details">
              <summary className="work-sdg-summary">
                <span className="work-sdg-summary-copy">
                  <span className="work-sdg-summary-title">
                    The 17 Sustainable Development Goals
                  </span>
                  <span className="work-sdg-summary-hint">
                    Explore each goal on the United Nations website.
                  </span>
                </span>
                <span className="work-sdg-summary-indicator" aria-hidden="true">
                  +
                </span>
              </summary>
              <ul
                className="work-sdg-grid"
                aria-label="United Nations Sustainable Development Goals"
              >
                {sdgGoals.map((goal, index) => {
                  const number = index + 1;
                  const goalNumber = String(number).padStart(2, "0");

                  return (
                    <li className="work-sdg-item" key={goal}>
                      <a
                        href={`https://sdgs.un.org/goals/goal${number}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Goal ${number}: ${goal} — opens the United Nations website in a new tab`}
                      >
                        <Image
                          src={`https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${goalNumber}.jpg`}
                          alt={`UN Sustainable Development Goal ${number}: ${goal}`}
                          width={80}
                          height={80}
                          unoptimized
                          loading="lazy"
                        />
                        <span>{goal}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">LET&apos;S CONNECT</p>
          <h2>Have an idea with potential?</h2>
          <Link href="/contact" className="button button-primary">
            Start a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
