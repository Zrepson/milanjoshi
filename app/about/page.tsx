import Link from "next/link";
import PhotoLightboxGallery from "@/components/PhotoLightboxGallery";

export const metadata = {
  title: "About | Milan Joshi",
  description:
    "Meet Milan Joshi: rooted in Bhaktapur, Nepal, curious about people, places, technology and the ideas shaping the future.",
};

const principles = [
  {
    number: "01",
    title: "Make it useful.",
    description: "Good ideas should answer a real need and make life a little better.",
  },
  {
    number: "02",
    title: "Put people first.",
    description: "Technology and systems matter most when they work for people.",
  },
  {
    number: "03",
    title: "Communicate clearly.",
    description: "Clarity helps people understand their choices and move forward.",
  },
  {
    number: "04",
    title: "Earn trust.",
    description: "Trust grows through consistency, care and responsibility.",
  },
  {
    number: "05",
    title: "Keep learning.",
    description: "Curiosity and learning continue well beyond formal education.",
  },
  {
    number: "06",
    title: "Respect the past. Imagine the future.",
    description: "Heritage and progress can inform and strengthen one another.",
  },
];

const personalMoments = [
  {
    src: "/images/about/personal-lakeside.jpeg",
    alt: "Milan beside a lake with forested hills in the distance",
    caption: "A quiet moment by the water.",
  },
  {
    src: "/images/about/family.jpeg",
    alt: "Milan sharing a photo with family at a gathering",
    caption: "Time with family.",
  },
  {
    src: "/images/about/horseback-journey.jpeg",
    alt: "Milan travelling on horseback through a mountain landscape",
    caption: "Taking the scenic route.",
  },
  {
    src: "/images/about/cafe-moment.jpeg",
    alt: "Milan taking a break at a café",
    caption: "A pause between explorations.",
  },
  {
    src: "/images/about/mountain-trek.jpg",
    alt: "Milan and fellow travellers on a snow-covered mountain trek",
    caption: "A day in the mountains.",
  },
  {
    src: "/images/about/prayer-flags-trek.jpg",
    alt: "Milan sitting beneath colorful prayer flags with mountains behind him",
    caption: "A pause beneath the prayer flags.",
  },
  {
    src: "/images/about/lake-boat.jpg",
    alt: "Milan and a companion relaxing in a wooden boat on a lake",
    caption: "An unhurried day on the water.",
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="hero about-hero">
        <div className="container">
          <p className="eyebrow">ABOUT ME · BHAKTAPUR, NEPAL</p>
          <h1>
            Rooted in Nepal.<br />
            <span>Curious about what&apos;s next.</span>
          </h1>
          <p className="hero-description">
            I&apos;m Milan Joshi, from Bhaktapur. The Kathmandu Valley is home, and
            the roads across Nepal continue to expand my sense of place, people
            and possibility.
          </p>
        </div>
      </section>

      <section className="about-profile-section">
        <div className="container about-profile-grid">
          <aside className="about-profile-index">
            <p className="eyebrow">01 / A SENSE OF PLACE</p>
            <span className="about-profile-number" aria-hidden="true">01</span>
            <p>Bhaktapur<br />Nepal</p>
          </aside>
          <div className="about-profile-copy">
            <h2>Home is more than a point on a map.</h2>
            <p className="about-profile-lead">
              I grew up connected to the Kathmandu Valley, with its living
              traditions, historic places and changing city life.
            </p>
            <p>
              Travelling through different parts of Nepal has introduced me to
              new landscapes, communities and ways of seeing the world. Home,
              to me, is made of people, memories, places and shared
              responsibilities.
            </p>
          </div>
        </div>
      </section>

      

      <section className="about-profile-section about-profile-section-contrast">
        <div className="container about-profile-grid">
          <aside className="about-profile-index">
            <p className="eyebrow">02 / PEOPLE &amp; PERSPECTIVE</p>
            <span className="about-profile-number" aria-hidden="true">02</span>
            <p>Family<br />and friends</p>
          </aside>
          <div className="about-profile-copy">
            <h2>The people in my life keep me grounded.</h2>
            <p className="about-profile-lead">
              I am a son, brother and friend. Family, friendship and shared time
              are an important part of who I am.
            </p>
            <p>
              I value a good conversation and hearing how someone else sees the
              world. Staying curious, listening carefully and making time for
              people help me keep perspective as life changes.
            </p>
          </div>
        </div>
      </section>

      <section className="about-profile-section">
        <div className="container about-profile-grid">
          <aside className="about-profile-index">
            <p className="eyebrow">03 / CURIOSITY &amp; DISCOVERY</p>
            <span className="about-profile-number" aria-hidden="true">03</span>
            <p>Travel, culture<br />and new ideas</p>
          </aside>
          <div className="about-profile-copy">
            <h2>There is always more to explore.</h2>
            <p className="about-profile-lead">
              I enjoy travelling through Nepal, photography, technology,
              design, history and culture—and learning how things work.
            </p>
            <p>
              Mountains have a special place in my imagination. They remind me
              that a change in perspective can reveal a new route. Time away
              from a screen, somewhere unfamiliar, often gives me the space to
              think and return with better questions.
            </p>
          </div>
        </div>
      </section>

      <section className="about-beliefs-section" id="beliefs">
        <div className="container">
          <div className="section-heading about-beliefs-heading">
            <div>
              <p className="eyebrow">A FEW THINGS I BELIEVE</p>
              <h2>Principles for the road ahead.</h2>
            </div>
            <p>
              The ideas I return to as I keep learning, making choices and
              finding my way forward.
            </p>
          </div>
          <div className="about-beliefs-grid">
            {principles.map((principle) => (
              <article className="about-belief" key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-gallery-section" id="gallery">
        <div className="container">
          <div className="about-gallery-heading">
            <div>
              <p className="eyebrow">OUTSIDE THE DAY-TO-DAY</p>
              <h2>A few personal moments.</h2>
            </div>
            <p>
              Travel, family and the landscapes that give me room to pause,
              notice and explore.
            </p>
          </div>
          <PhotoLightboxGallery
            moments={personalMoments}
            gridClassName="about-gallery-grid"
            itemClassName="about-gallery-item"
            imageClassName="about-gallery-image"
            triggerClassName="about-gallery-trigger"
            imageSizes="(max-width: 600px) 92vw, (max-width: 900px) 44vw, 38vw"
          />
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <p className="eyebrow">SAY HELLO</p>
          <h2>Let&apos;s connect.</h2>
          <Link href="/contact" className="button button-primary">
            Get in touch <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
