"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Sparkles, Search, MessageSquare, ArrowRight } from "lucide-react";

export type FAQCategory = "all" | "consulting" | "insurance";

export interface FAQItem {
  id: string;
  category: "consulting" | "insurance";
  categoryLabel: string;
  question: string;
  shortSummary: string;
  answer: string[];
  takeaways?: string[];
  ctaLink?: {
    label: string;
    href: string;
  };
}

const faqData: FAQItem[] = [
  // --- CONSULTING PROCESS & DIGITAL PRACTICE ---
  {
    id: "consulting-kickoff",
    category: "consulting",
    categoryLabel: "Consulting Process",
    question: "What does the initial consultation look like, and how do we begin?",
    shortSummary: "A 30-minute discovery conversation with no upfront commitment.",
    answer: [
      "Every engagement starts with a straightforward, no-obligation conversation—either by phone, video, or in person in the Kathmandu or Bhaktapur area. During this session, we discuss your core objectives, current challenges, project timeline, and desired outcomes.",
      "Within 48 hours following our conversation, I provide a concise written summary outlining the agreed scope, suggested milestones, deliverables, and estimated turnaround before any formal agreement is made.",
    ],
    takeaways: [
      "Zero upfront commitment or high-pressure pitches",
      "Clear written scope summary delivered within 48 hours",
      "Flexible formats: virtual meeting or local in-person discussion",
    ],
    ctaLink: {
      label: "Schedule an initial conversation",
      href: "/contact",
    },
  },
  {
    id: "consulting-strategy-execution",
    category: "consulting",
    categoryLabel: "Consulting Process",
    question: "Can you assist with both high-level strategy and hands-on technical execution?",
    shortSummary: "Bridging strategic planning directly with implementation.",
    answer: [
      "Yes. A frequent challenge in consulting is a gap between theoretical recommendations and actual field execution. My practice is deliberately structured to bridge both sides.",
      "Depending on your organization's needs, I can shape high-level digital strategy, lead multi-stakeholder alignments (as proven in biomedical and public health initiatives), or dive directly into hands-on web development, performance optimization, and technical documentation.",
    ],
    takeaways: [
      "Single point of contact from concept to delivery",
      "Demonstrated experience in complex institutional ecosystems",
      "Direct frontend engineering, SEO architecture, and structured data execution",
    ],
  },
  {
    id: "consulting-timelines-structure",
    category: "consulting",
    categoryLabel: "Consulting Process",
    question: "How are project milestones, deliverables, and communication structured?",
    shortSummary: "Three clear phases: Understand, Shape & Deliver, and Follow-Through.",
    answer: [
      "Projects follow a predictable, transparent rhythm broken down into three stages: Discovery & Scope Definition, Iterative Delivery & Alignment, and Close-out & Handoff.",
      "You receive weekly progress checkpoints and direct access to working drafts. There are no sudden surprises at the end of the project—next steps and blockers are communicated clearly as work unfolds.",
    ],
    takeaways: [
      "Defined milestone gates with explicit approval steps",
      "Weekly progress updates with zero technical jargon",
      "Complete documentation, asset handoff, and post-launch orientation",
    ],
  },
  {
    id: "consulting-remote-international",
    category: "consulting",
    categoryLabel: "Consulting Process",
    question: "Do you collaborate with international institutions, remote teams, or cross-border partners?",
    shortSummary: "Extensive experience working across time zones and multicultural contexts.",
    answer: [
      "Absolutely. Over the years, I have worked alongside international development partners such as UNDP, regional coalitions like One Million Leaders Asia (OMLAS), and global networks like NELIS (Next Leaders' Initiative for Sustainability) and the NRNA diaspora platform.",
      "I am comfortable collaborating across time zones using modern asynchronous workflows, shared project repositories, and clear documentation.",
    ],
    takeaways: [
      "Familiar with international development standards and reporting",
      "Comfortable with asynchronous work tools and scheduled virtual touchpoints",
      "Respectful of diverse organizational cultures and local community realities",
    ],
  },
  {
    id: "consulting-reporting-research",
    category: "consulting",
    categoryLabel: "Consulting Process",
    question: "What types of reporting, research, and technical documentation services do you offer?",
    shortSummary: "From biomedical assessments to digital audits and stakeholder briefings.",
    answer: [
      "My documentation practice includes comprehensive field survey reports (such as the Bagmati Province hospital biomedical equipment assessment), institutional baseline studies, digital audit reports, and user-facing guidelines.",
      "The emphasis is always on actionable clarity: structuring complex qualitative and quantitative data so that decision-makers, technical specialists, and community stakeholders can immediately act on the findings.",
    ],
    takeaways: [
      "Plain-language synthesis of dense technical or healthcare data",
      "Data visualization and structured executive summaries",
      "Publication-ready layouts and stakeholder dissemination materials",
    ],
  },

  // --- INSURANCE GUIDANCE (LIC NEPAL) ---
  {
    id: "insurance-fee-structure",
    category: "insurance",
    categoryLabel: "Insurance Guidance",
    question: "How does life insurance advisory through LIC Nepal work, and is there any fee for consultation?",
    shortSummary: "All advisory discussions are completely free of charge and obligation.",
    answer: [
      "There are zero advisory fees, consultation charges, or hidden costs for discussing your life insurance needs. As a licensed Life Insurance Consultant with Life Insurance Corporation (Nepal) Limited (LIC Nepal), my role is to help you thoroughly evaluate and understand your options.",
      "You receive objective, tailored analysis regarding family protection, policy durations, premium commitments, and maturity benefits before deciding if and when to proceed with an official policy.",
    ],
    takeaways: [
      "100% free advisory consultations with no upfront financial commitment",
      "Transparent comparison of endowment, term, money-back, and pension structures",
      "Completely pressure-free environment focused on informed decision-making",
    ],
    ctaLink: {
      label: "Book a life insurance advisory session",
      href: "/contact",
    },
  },
  {
    id: "insurance-policy-selection",
    category: "insurance",
    categoryLabel: "Insurance Guidance",
    question: "What factors determine the most appropriate life insurance policy for my situation?",
    shortSummary: "A tailored evaluation based on dependents, income horizon, and milestones.",
    answer: [
      "Rather than recommending a generic product, we examine four key anchors: your current dependent family members, income stability, upcoming major life milestones (such as children's higher education or marriage), and your targeted retirement timeline.",
      "This ensures your annual or monthly premium remains sustainable over the long haul, while providing adequate death benefit protection and inflation-resilient savings.",
    ],
    takeaways: [
      "Protection-to-savings ratio customized to your life stage",
      "Sustainable premium sizing that prevents policy lapse",
      "Alignment with major future expenditure dates",
    ],
  },
  {
    id: "insurance-documentation-needed",
    category: "insurance",
    categoryLabel: "Insurance Guidance",
    question: "What documents and background information are required for an insurance consultation?",
    shortSummary: "Minimal for preliminary advice; standard KYC for policy issuance.",
    answer: [
      "For an initial advisory conversation, no formal paperwork is required—just an honest estimate of your monthly savings capacity, your family size, and your financial protection objectives.",
      "If you subsequently choose to apply for a policy through LIC Nepal, standard Know-Your-Customer (KYC) documentation will be required, including a copy of your Nepali Citizenship card, recent passport-sized photographs, nominee details, and a routine medical declaration (or physical medical checkup depending on age and sum assured).",
    ],
    takeaways: [
      "Zero paperwork required for your preliminary consultation",
      "Full step-by-step guidance provided for application and KYC compliance",
      "Clear explanation of medical underwriting thresholds",
    ],
  },
  {
    id: "insurance-ongoing-servicing",
    category: "insurance",
    categoryLabel: "Insurance Guidance",
    question: "How are claims, policy servicing, and ongoing support handled over the years?",
    shortSummary: "Long-term dedication across policy duration, renewals, and claims settlement.",
    answer: [
      "A life insurance policy spans decades, and dependable agent servicing is critical throughout that entire period. I remain your direct advisor for premium payment reminders, address or nominee updates, policy loan assistance, and tax benefit documentation.",
      "In the event of a maturity payout or a critical claim, I personally assist your family with documentation, coordination with LIC Nepal branch offices, and expediting formal claim settlement.",
    ],
    takeaways: [
      "Dedicated personal contact throughout the lifetime of your policy",
      "Prompt assistance with digital and physical premium renewal methods",
      "Compassionate, end-to-end guidance for claims and maturity disbursements",
    ],
  },
  {
    id: "insurance-guarantees-regulations",
    category: "insurance",
    categoryLabel: "Insurance Guidance",
    question: "Are insurance policy benefits, returns, and bonus rates officially guaranteed?",
    shortSummary: "Governed strictly by official LIC Nepal terms and regulated by Nepal Insurance Authority.",
    answer: [
      "Sum assured death benefits and guaranteed surrender values are contractual obligations set forth in your official LIC Nepal policy bond. Reversionary bonuses are declared annually by LIC Nepal based on actuarial valuations and approved by the Nepal Insurance Authority (NIA).",
      "During our consultation, I clearly distinguish between contractually guaranteed sums and projected bonus illustrations, ensuring you have realistic expectations grounded in historical performance and regulatory guidelines.",
    ],
    takeaways: [
      "Transparent distinction between contractual guarantees and bonus rates",
      "Regulated under the legal framework of Nepal Insurance Authority (NIA)",
      "Official policy bond issued directly by Life Insurance Corporation (Nepal) Ltd.",
    ],
  },
];

export default function ServicesFAQ() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "consulting-kickoff": true,
    "insurance-fee-structure": true,
  });

  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      // Category filter
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.shortSummary.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.answer.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    faqData.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const allAreOpen = filteredFAQs.length > 0 && filteredFAQs.every((item) => openItems[item.id]);

  return (
    <section className="services-faq-section" id="faq">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading">
          <div>
            <p className="eyebrow">COMMON QUESTIONS · CLARITY &amp; SCOPE</p>
            <h2>Frequently asked questions.</h2>
          </div>
          <p>
            Honest answers about how we work together, what to expect from an engagement,
            and how life insurance guidance operates under LIC Nepal.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="services-faq-controls">
          {/* Category Tabs (Segmented Buttons) */}
          <div className="services-faq-tabs" role="tablist" aria-label="FAQ categories">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              className={`services-faq-tab ${activeCategory === "all" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <span>All Questions</span>
              <span className="tab-count">({faqData.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "consulting"}
              className={`services-faq-tab ${activeCategory === "consulting" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("consulting")}
            >
              <span>Consulting Process &amp; Web</span>
              <span className="tab-count">(5)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "insurance"}
              className={`services-faq-tab ${activeCategory === "insurance" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("insurance")}
            >
              <span>Insurance Guidance</span>
              <span className="tab-count">(5)</span>
            </button>
          </div>

          {/* Quick Search & Bulk Toggle */}
          <div className="services-faq-actions">
            <div className="services-faq-search-box">
              <Search size={14} className="search-icon" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter questions..."
                className="services-faq-search-input"
                aria-label="Filter FAQ questions"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={allAreOpen ? collapseAll : expandAll}
              className="services-faq-toggle-all-btn"
            >
              {allAreOpen ? "Collapse all" : "Expand all"}
            </button>
          </div>
        </div>

        {/* Collapsible FAQ List (Adheres to the SDG Goals Component Pattern) */}
        <div className="services-faq-list" role="region" aria-label="Frequently Asked Questions">
          {filteredFAQs.map((item) => {
            const isOpen = !!openItems[item.id];

            return (
              <details
                key={item.id}
                className="services-faq-details"
                open={isOpen}
                onToggle={(e) => {
                  const target = e.currentTarget;
                  if (target.open !== isOpen) {
                    toggleItem(item.id);
                  }
                }}
              >
                <summary className="services-faq-summary">
                  <div className="services-faq-summary-copy">
                    {/* Clean unboxed metadata with typographic separator (anti-slop rule) */}
                    <div className="services-faq-meta">
                      <span className="faq-category-label">{item.categoryLabel}</span>
                      <span aria-hidden="true" className="faq-sep">·</span>
                      <span className="faq-summary-hint">{item.shortSummary}</span>
                    </div>
                    <h3 className="services-faq-question">{item.question}</h3>
                  </div>

                  {/* Indicator rotating 45deg on open (identical to SDG component) */}
                  <span className="services-faq-indicator" aria-hidden="true">
                    +
                  </span>
                </summary>

                <div className="services-faq-body">
                  <div className="services-faq-answer">
                    {item.answer.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {item.takeaways && item.takeaways.length > 0 && (
                    <div className="services-faq-takeaways">
                      <p className="takeaways-title">
                        <Sparkles size={13} className="takeaways-icon" aria-hidden="true" />
                        <span>Key Takeaways</span>
                      </p>
                      <ul className="takeaways-list">
                        {item.takeaways.map((takeaway, idx) => (
                          <li key={idx}>
                            <span className="takeaway-bullet" aria-hidden="true">✓</span>
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.ctaLink && (
                    <div className="services-faq-cta-row">
                      <Link href={item.ctaLink.href} className="services-faq-link">
                        <span>{item.ctaLink.label}</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </div>
              </details>
            );
          })}

          {filteredFAQs.length === 0 && (
            <div className="services-faq-empty">
              <p>No matching questions found for &ldquo;{searchQuery}&rdquo;.</p>
              <button
                type="button"
                className="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Section Closer / Still have a question banner */}
        <div className="services-faq-footer-note">
          <div className="faq-footer-copy">
            <span className="faq-footer-title">Have a question that isn&apos;t covered here?</span>
            <span className="faq-footer-desc">
              Every situation has unique requirements. Feel free to send a short message and we can clarify details together.
            </span>
          </div>
          <Link href="/contact" className="button button-primary">
            Ask a Question <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
