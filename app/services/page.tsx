import Link from "next/link";
import EngagementCarousel from "@/components/work/EngagementCarousel";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Services | Milan Joshi",
  "Web development, project coordination, digital strategy and life insurance guidance from Milan Joshi.",
  "/services"
);

type ServiceOffering = {
  number: string;
  title: string;
  summary: string;
  support: string[];
  note?: string;
};

const services: ServiceOffering[] = [
  {
    number: "01",
    title: "Web development",
    summary:
      "Responsive websites and digital experiences with clear information structure and maintainable implementation.",
    support: [
      "Page structure and responsive layouts",
      "Interface development and integration",
      "Launch handoff and practical next steps",
    ],
  },
  {
    number: "02",
    title: "Project coordination",
    summary:
      "Keep people, workstreams and decisions aligned from planning through delivery.",
    support: [
      "Work plans, milestones and documentation",
      "Stakeholder coordination and clear updates",
      "Follow-through across teams and activities",
    ],
  },
  {
    number: "03",
    title: "Digital strategy",
    summary:
      "Create a practical direction for reaching the right people through search, content and measurement.",
    support: [
      "Search and content priorities",
      "Audience and website goals",
      "Measurement and improvement opportunities",
    ],
  },
  {
    number: "04",
    title: "Life insurance guidance",
    summary:
      "Client-focused conversations through LIC Nepal to help individuals and families understand financial protection and long-term security.",
    support: [
      "Discussing protection needs and priorities",
      "Explaining relevant policy information",
      "Helping people consider informed next steps",
    ],
    note: "Policy terms, eligibility and benefits are subject to LIC Nepal’s official policy information.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    description: "We clarify the need, context and people involved.",
  },
  {
    number: "02",
    title: "Agree on a plan",
    description: "We define the scope, priorities and next steps together.",
  },
  {
    number: "03",
    title: "Deliver and follow through",
    description: "I keep communication clear through handoff and close-out.",
  },
];

const engagements = [
  { name: "Nepal Insurance Authority", src: "/images/engagements/nepal-insurance-authority.jpg", href: "https://www.nia.gov.np/" },
  { name: "NRNA Global Knowledge Convention", src: "/images/engagements/nrna-global-knowledge-convention.jpg", href: "https://knowledge.nrna.org/" },
  { name: "Nepal Health Professional Council", src: "/images/engagements/nepal-health-science-council.jpg", href: "https://nhpc.gov.np/" },
  { name: "Grande International Hospital", src: "/images/engagements/grande-international-hospital.jpg", href: "https://www.grandehospital.com/" },
  { name: "Siddhi Memorial Foundation", src: "/images/engagements/siddhi-memorial-foundation.jpg", href: "https://smf.org.np/" },
  { name: "International Nepal Fellowship", src: "/images/engagements/international-nepal-fellowship.jpg", href: "https://inf.org.np/" },
  { name: "Pokhara Grande", src: "/images/engagements/pokhara-grande.jpg", href: "https://www.pokharagrande.com/" },
  { name: "Shangri-La Village Resort Pokhara", src: "/images/engagements/shangri-la-village-pokhara.jpg", href: "https://shangrilavillageresort.com/" },
  { name: "Nepal Investment Mega Bank", src: "/images/engagements/nepal-investment-mega-bank.jpg", href: "https://www.nimb.com.np/" },
  { name: "Himalayan Bank", src: "/images/engagements/himalayan-bank.jpg", href: "https://himalayanbank.com/" },
  { name: "A & D Enterprises", src: "/images/engagements/a-and-d-enterprises.jpg" },
  { name: "Angel Engineering Consultancy Pvt. Ltd.", src: "/images/engagements/angel-engineering-consultancy.jpg", href: "https://www.aecpl.com.np/" },
  { name: "Daraz", src: "/images/engagements/daraz.jpg", href: "https://www.daraz.com.np/" },
  { name: "United Nations Development Programme", src: "/images/engagements/undp.jpg", href: "https://www.undp.org/nepal" },
  { name: "Biotechnology Society of Nepal", src: "/images/engagements/biotechnology-society-of-nepal.jpg", href: "https://www.bsn.org.np/" },
  { name: "Ministry of Health and Population, Nepal", src: "/images/engagements/ministry-of-health-and-population-nepal.jpg", href: "https://www.mohp.gov.np/" },
  { name: "The Asia Foundation", src: "/images/engagements/asia-foundation.jpg", href: "https://asiafoundation.org/country/nepal/" },
  { name: "Mission Oxygen Team", src: "/images/engagements/mission-oxygen-team.jpg", href: "https://www.ran.org.np/mission-oxygen-team/" },
  { name: "Data for Development in Nepal", src: "/images/engagements/data-for-development-nepal.jpg", href: "https://www.d4dnepal.org/" },
  { name: "Robotics Association of Nepal", src: "/images/engagements/robotics-association-of-nepal.jpg", href: "https://www.ran.org.np/" },
  { name: "National Health Action Force Nepal", src: "/images/engagements/nhafn.jpg", href: "https://www.nhafn.org.np/" },
  { name: "Nepal Scouts", src: "/images/engagements/nepal-scouts.jpg", href: "https://www.nepalscouts.org/" },
  { name: "Nepal Cycle Society", src: "/images/engagements/nepal-cycle-society.jpg", href: "https://nepalcyclesociety.org.np/" },
  { name: "International AI and Robotics Conference", src: "/images/engagements/ai-conference.jpg", href: "https://www.ran.org.np/events/" },
  { name: "One Million Leaders Asia (OMLAS)", src: "/images/engagements/omlas.jpg", href: "https://onemillionleadersasia.org/" },
  { name: "NELIS Global", src: "/images/engagements/nelis.jpg", href: "https://nelisglobal.org/" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">SERVICES</p>
          <h1>
            Practical <span>expertise.</span>
          </h1>
          <p className="hero-description">
            Combining structured thinking, technology and communication to turn
            ideas into useful outcomes across web, projects, strategy and
            insurance.
          </p>
        </div>
      </section>

      <section className="service-offerings-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WAYS I CAN HELP</p>
              <h2>Clear scope. Useful next steps.</h2>
            </div>
            <p>
              Each engagement starts with a conversation about what you need and
              what a practical result would look like.
            </p>
          </div>

          <div className="service-offerings-list">
            {services.map((service) => (
              <article className="service-offering" key={service.number}>
                <span className="service-offering-number">{service.number}</span>
                <div className="service-offering-intro">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </div>
                <div className="service-offering-detail">
                  <p className="eyebrow">TYPICAL SUPPORT</p>
                  <ul>
                    {service.support.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {service.note ? (
                    <p className="service-offering-note">{service.note}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-process-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HOW WE WORK</p>
              <h2>A clear route from conversation to delivery.</h2>
            </div>
            <p>
              The details vary by service, but good collaboration starts with
              listening and ends with clear next steps.
            </p>
          </div>
          <ol className="service-process-list">
            {processSteps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="work-engagements-section" id="engagements">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PROFESSIONAL ENGAGEMENTS</p>
              <h2>Organizations and initiatives.</h2>
            </div>
            <p>
              Selected organizations, institutions and project teams connected
              to my work across public health, project coordination, hospitality,
              financial services and digital initiatives.
            </p>
          </div>
          <EngagementCarousel items={engagements} />
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">LET&apos;S TALK</p>
          <h2>Tell me what you need help with.</h2>
          <Link href="/contact" className="button button-primary">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
