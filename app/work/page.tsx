import Link from "next/link";
import PhotoLightboxGallery from "@/components/PhotoLightboxGallery";
import InteractiveTimeline from "@/components/work/InteractiveTimeline";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Work | Milan Joshi",
  "Professional experience, project contributions, organizational engagements and field events from Milan Joshi's work.",
  "/work"
);

const journey = [
  {
    number: "01",
    period: "2011 — 2017",
    title: "Service, study and business",
    description:
      "I studied Marketing at Janapriya Multiple Campus while gaining experience in hospitality and banking. Later, I worked in administration and ran regional sales and distribution operations.",
  },
  {
    number: "02",
    period: "2020 — 2023",
    title: "Logistics and public health projects",
    description:
      "I moved from delivery operations into development work, coordinating partners on biomedical equipment management and capacity building. The work involved training, research, field data, reporting and connecting teams.",
  },
  {
    number: "03",
    period: "2022 — PRESENT",
    title: "Insurance advice and digital practice",
    description:
      "I became a licensed life insurance agent with Life Insurance Corporation (Nepal) Ltd. Digital work remains part of my practice, from maintaining websites to learning analytics, web development and new tools.",
  },
];

const credentials = [
  {
    src: "/images/credentials/governor-for-the-future.jpg",
    alt: "Governor for the Future badge from the 100 Country Summit 2025",
    title: "Governor for the Future",
    detail: "100 Country Summit · 2025",
    description:
      "The badge carries the “Governor for the Future” designation shown at the 2025 summit, in the wider context of NELIS and One Million Leaders’ work with emerging sustainability leaders.",
  },
  {
    src: "/images/credentials/blueprint-better-tomorrow.jpg",
    alt: "Blueprint for a Better Tomorrow sustainable leadership badge",
    title: "Blueprint for a Better Tomorrow",
    detail: "Sustainable Leadership Workshop · NELIS",
    description:
      "The Blueprint brings together ideas from more than 1,000 young people for a more sustainable and inclusive future.",
  },
  {
    src: "/images/credentials/omlas-champions-2025.jpg",
    alt: "OMLAS Champions 2025 badge",
    title: "OMLAS Champions",
    detail: "One Million Leaders Asia · 2025",
    description:
      "A 2025 OMLAS badge connected with One Million Leaders’ work to develop young sustainability leaders across regions, including Asia.",
  },
  {
    src: "/images/credentials/core-humanitarian-certification.jpg",
    alt: "Core Humanitarian Certification badge from DisasterReady.org",
    title: "Core Humanitarian Certification",
    detail: "DisasterReady.org",
    description:
      "Covers humanitarian basics, legal frameworks, cross-cutting issues, safety and security, duty of care, and the humanitarian project cycle.",
  },
];

const moments = [
  {
    src: "/images/about/conference.jpg",
    alt: "Attendees at the International AI and Robotics Conference",
    caption: "International AI and Robotics Conference",
  },
  {
    src: "/images/about/community-visit.jpg",
    alt: "A group gathered outside Siddhi Shaligram Senior Citizens’ Home in Bhaktapur",
    caption: "Training of Trainers Program — a joint initiative of UNDP, RAN and BSN",
  },
  {
    src: "/images/about/project-team.jpg",
    alt: "Participants at a report dissemination for the biomedical equipment assessment in Bagmati Province government hospitals",
    caption:
      "Report dissemination: Assessment of Biomedical Equipment in Government Hospitals in Bagmati Province, Nepal",
  },
  {
    src: "/images/about/professional-meeting.jpg",
    alt: "Colleagues attending the NRNA Global Knowledge Conference",
    caption: "NRNA Global Knowledge Conference",
  },
];

const profileMoments = [
  {
    src: "/images/work-profile/robotics-demonstration.jpg",
    alt: "Milan exploring a robotics demonstration at an event",
    caption: "Exploring a robotics demonstration",
  },
  {
    src: "/images/work-profile/climate-risk-lab.jpg",
    alt: "Milan trying a virtual reality experience at the Climate Risk and Resilience Lab",
    caption: "At the Climate Risk and Resilience Lab",
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">WORK &amp; EXPERIENCE</p>

          <h1>
            Experience and <span>contribution.</span>
          </h1>

          <p className="hero-description">
            Professional experience, project contributions, organizational
            engagements and field events from across my career.
          </p>
        </div>
      </section>

      <section className="work-experience-section" id="experience">
        <div className="container work-experience-grid">
          <div className="work-experience-aside">
            <p className="eyebrow">PROFESSIONAL PROFILE</p>
            <span className="work-experience-monogram" aria-hidden="true">MJ</span>
            <p>People, systems,<br />technology and execution.</p>
          </div>
          <div className="work-experience-copy">
            <h2>A multidisciplinary professional.</h2>
            <p>
              My work brings together life insurance advisory, project and
              program coordination, operations, administration, digital
              development and sustainable development initiatives.
            </p>
            <p>
              I currently serve as a Life Insurance Consultant with Life
              Insurance Corporation (Nepal) Limited (LIC Nepal). I work with
              individuals and families to understand life insurance, financial
              protection and long-term security through informed,
              client-focused advice.
            </p>
            <p>
              Earlier in my career, I contributed to public health, biomedical
              engineering, emergency response, humanitarian and development
              initiatives. This work brought me together with government,
              development, technical and private-sector partners, and
              strengthened my capabilities in planning, implementation,
              stakeholder coordination, documentation, operations and
              problem-solving.
            </p>
            <p>
              My professional perspective sits at the intersection of people,
              systems, technology and execution. I bring structured thinking,
              operational discipline and clear communication to complex work,
              connecting strategic objectives with practical implementation
              and measurable outcomes while adapting to changing environments.
            </p>
            <p>
              I am also interested in emerging technologies and modern
              life-saving tools, including artificial intelligence, drones,
              digital communication and user-centered digital experiences.
              My journey reflects an ongoing effort to bridge strategic
              thinking with execution, professional discipline with emerging
              technology, and individual expertise with broader social impact.
            </p>
            <PhotoLightboxGallery
              moments={profileMoments}
              gridClassName="work-profile-gallery-grid"
              itemClassName="work-profile-gallery-item"
              imageClassName="work-profile-gallery-image"
              triggerClassName="work-profile-gallery-trigger"
              imageSizes="(max-width: 700px) 100vw, 340px"
            />
          </div>
        </div>
      </section>

      <section className="about-closing-section">
        <div className="container about-closing-inner">
          <p className="eyebrow">STILL LEARNING · STILL EXPLORING</p>
          <h2>There is always another road worth discovering.</h2>
          <p>
            I don&apos;t see life as a straight line. It is a network of roads—some
            planned, some unexpected. I&apos;m still learning, still building and
            open to where they lead. My aim is to contribute with curiosity
            and leave things a little better than I found them.
          </p>
        </div>
      </section>

      <section className="section work-journey-section" id="timeline">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CAREER TIMELINE</p>
              <h2>How my work evolved.</h2>
            </div>
            <p>
              Different settings, new responsibilities, and a growing set of
              ways to contribute.
            </p>
          </div>
          <InteractiveTimeline />
        </div>
      </section>

      <section className="process-section" id="approach">
        <div className="container">
          <p className="eyebrow">PROFESSIONAL APPROACH</p>
          <h2>Clarity, accountability and practical results.</h2>
          <p>
            Whether I&apos;m coordinating a project, working on a digital
            experience or advising on insurance, I aim to make information
            clear, decisions informed and next steps manageable.
          </p>
        </div>
      </section>

      <section className="work-moments-section" id="moments">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EVENTS &amp; FIELD WORK</p>
              <h2>People and places<br /><span className="muted-heading">along the way.</span></h2>
            </div>
            <p>
              Selected moments from conferences, events, important meetings
              and professional gatherings.
            </p>
          </div>
          <PhotoLightboxGallery
            moments={moments}
            gridClassName="work-moments-grid"
            itemClassName="work-moment"
            imageClassName="work-moment-image"
            triggerClassName="work-moment-trigger"
            imageSizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
          />
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">LET&apos;S BUILD</p>

          <h2>Have a project in mind?</h2>

          <Link href="/contact" className="button button-primary">
            Start a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
