import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Research & Documentation",
    description: "Turning information into structured reports, insights, presentations, digital content, and practical decision-support materials.",
    label: "Design · Build · Launch",
  },
  {
    number: "02",
    title: "Project & Program Coordination",
    description: "Clear plans, steady communication and practical delivery from kickoff to handoff.",
    label: "Plan · Align · Deliver",
  },
  {
    number: "03",
    title: "Digital strategy",
    description: "A sharper path to reach the right people through search, content and measurement.",
    label: "Search · Content · Growth",
  },
  {
    number: "04",
    title: "Life insurance guidance",
    description: "Helping individuals and families understand life insurance, financial protection and long-term planning through professional guidance.",
    label: "Understand · Choose · Protect",
  },
];

const explorations = [
  { title: "Work & experience", description: "Project contributions, professional experience and field moments.", href: "/work", number: "01" },
  { title: "About Milan", description: "The person, perspective and process behind the work.", href: "/about", number: "02" },
  { title: "Impact", description: "Exploring how technology and data can support useful ideas.", href: "/impact", number: "03" },
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow"><span className="status-dot" /> INDEPENDENT · MULTIDISCIPLINARY</p>
            <h1>Good ideas deserve <span>good execution.</span></h1>
            <p className="hero-description">
              I&apos;m Milan Joshi. I bring ideas to life through digital experiences, thoughtful project work and practical guidance.
            </p>
            <div className="hero-actions">
              <Link href="/work" className="button button-primary">Explore my work <span aria-hidden="true">↗</span></Link>
              <Link href="/about" className="text-link">A little about me <span aria-hidden="true">→</span></Link>
            </div>
            <div className="hero-note"><span>BASED IN NEPAL</span><span className="note-line" /><span>WORKING EVERYWHERE</span></div>
          </div>
          <div className="hero-art" aria-label="Abstract golden orbital artwork">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
            <div className="art-core"><span>MJ</span><i /></div>
            <span className="orbit-label orbit-label-top">CURIOUS BY NATURE</span>
            <span className="orbit-label orbit-label-bottom">BUILT WITH INTENTION</span>
            <span className="art-index">01 / 04</span>
          </div>
        </div>
        <div className="container hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-mark">↓</span><span className="hero-bottom-fill" /><span>IDEAS INTO OUTCOMES</span></div>
      </section>

      <section className="intro-strip">
        <div className="container intro-strip-inner"><span className="eyebrow">A PRACTICAL CREATIVE PARTNER</span><p>Clear thinking, considered craft, and follow-through at every step.</p><Link href="/services" className="text-link">How I can help <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">WHAT I DO</p><h2>Different disciplines.<br /><span className="muted-heading">One thoughtful approach.</span></h2></div><p>Bring me a challenge, a starting point, or just a question. We&apos;ll find a clear way forward together.</p></div>
          <div className="home-services-list">{services.map((service) => <article className="home-service" key={service.number}><span className="home-service-number">{service.number}</span><div className="home-service-main"><h3>{service.title}</h3><p>{service.description}</p></div><span className="home-service-label">{service.label}</span><span className="home-service-arrow" aria-hidden="true">↗</span></article>)}</div>
          <div className="section-link-row"><span>GOOD WORK STARTS WITH A GOOD CONVERSATION.</span><Link href="/contact" className="text-link">Tell me what you&apos;re working on <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="approach-section"><div className="container approach-grid"><div><p className="eyebrow">HOW I WORK</p><h2>Make it clear.<br /><span>Make it count.</span></h2></div><div className="approach-copy"><p>Good work comes from listening first, making a thoughtful plan, and staying close to the details through delivery.</p><div className="approach-steps"><span>01 <b>Understand</b></span><span>02 <b>Shape</b></span><span>03 <b>Deliver</b></span></div><Link href="/about" className="text-link">More about my approach <span aria-hidden="true">→</span></Link></div></div></section>

      <section className="section explore-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">TAKE A CLOSER LOOK</p><h2>Explore the site.</h2></div><p>More context, selected work and a few things I&apos;m exploring.</p></div><div className="explore-grid home-explore-grid">{explorations.map((item) => <Link href={item.href} className="home-explore-card" key={item.number}><span className="home-explore-number">{item.number}</span><h3>{item.title}</h3><p>{item.description}</p><span className="home-explore-arrow" aria-hidden="true">↗</span></Link>)}</div></div></section>

      <section className="cta"><div className="container cta-inner"><div><p className="eyebrow">HAVE SOMETHING IN MIND?</p><h2>Let&apos;s make it happen.</h2></div><Link href="/contact" className="button button-primary">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>
    </>
  );
}
