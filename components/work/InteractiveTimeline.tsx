"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Calendar, ChevronRight, CheckCircle2, Sparkles, Compass, Shield, HeartPulse } from "lucide-react";

export interface JourneyMilestone {
  number: string;
  period: string;
  title: string;
  description: string;
  role: string;
  focus: string;
  highlights: string[];
  icon: "business" | "health" | "insurance";
}

const milestones: JourneyMilestone[] = [
  {
    number: "01",
    period: "2011 — 2017",
    title: "Service, study and business",
    description:
      "I studied Marketing at Janapriya Multiple Campus while gaining experience in hospitality and banking. Later, I worked in administration and ran regional sales and distribution operations.",
    role: "Administration & Distribution Lead",
    focus: "Commerce, Hospitality & Regional Operations",
    icon: "business",
    highlights: [
      "Marketing studies at Janapriya Multiple Campus",
      "Hands-on frontline experience across banking & hospitality",
      "Management of regional supply, warehousing & distribution",
      "Cross-functional operational planning & logistics",
    ],
  },
  {
    number: "02",
    period: "2020 — 2023",
    title: "Logistics and public health projects",
    description:
      "I moved from delivery operations into development work, coordinating partners on biomedical equipment management and capacity building. The work involved training, research, field data, reporting and connecting teams.",
    role: "Project Coordinator & Field Researcher",
    focus: "Public Health, Biomedical Systems & Emergency Response",
    icon: "health",
    highlights: [
      "Mission Oxygen initiative coordination during national healthcare emergencies",
      "Biomedical equipment assessment across Bagmati Province government hospitals",
      "Field data collection, report dissemination & partner alignments",
      "Facilitation of Training of Trainers (ToT) programs with UNDP, RAN, and BSN",
    ],
  },
  {
    number: "03",
    period: "2022 — PRESENT",
    title: "Insurance advice and digital practice",
    description:
      "I became a licensed life insurance agent with Life Insurance Corporation (Nepal) Ltd. Digital work remains part of my practice, from maintaining websites to learning analytics, web development and new tools.",
    role: "Life Insurance Consultant & Digital Practitioner",
    focus: "Financial Security, Modern Web Tech & Sustainability",
    icon: "insurance",
    highlights: [
      "Licensed Life Insurance Consultant with Life Insurance Corporation (Nepal) Ltd.",
      "Advising families & individuals on financial resilience and life protection",
      "Modern web architecture, interface engineering and performance optimization",
      "Active engagement in sustainable leadership (NELIS Governor for the Future, OMLAS)",
    ],
  },
];

export default function InteractiveTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [filterEra, setFilterEra] = useState<string>("all");
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll-based progress bar animation
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const filteredItems = milestones.filter((item) => {
    if (filterEra === "all") return true;
    return item.number === filterEra;
  });

  const toggleExpand = (num: string) => {
    setSelectedMilestone(selectedMilestone === num ? null : num);
  };

  return (
    <div className="interactive-timeline-wrapper" ref={timelineRef}>
      {/* Era Filter Selector */}
      <div className="timeline-filter-bar">
        <span className="timeline-filter-label">Filter by Era:</span>
        <div className="timeline-filter-buttons" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={filterEra === "all"}
            className={`timeline-filter-btn ${filterEra === "all" ? "is-active" : ""}`}
            onClick={() => setFilterEra("all")}
          >
            All Milestones (01 — 03)
          </button>
          {milestones.map((m) => (
            <button
              key={m.number}
              type="button"
              role="tab"
              aria-selected={filterEra === m.number}
              className={`timeline-filter-btn ${filterEra === m.number ? "is-active" : ""}`}
              onClick={() => setFilterEra(m.number)}
            >
              <span className="filter-num">{m.number}</span>
              <span className="filter-period">{m.period}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Timeline Stream */}
      <div className="interactive-timeline-track">
        {/* Scroll Progress Bar (Desktop & Tablet) */}
        <div className="timeline-rail" aria-hidden="true">
          <motion.div
            className="timeline-rail-fill"
            style={{ scaleY, transformOrigin: "top" }}
          />
        </div>

        <div className="interactive-timeline-items">
          {filteredItems.map((item, index) => {
            const isExpanded = selectedMilestone === item.number;

            return (
              <motion.article
                key={item.number}
                className={`interactive-timeline-card ${isExpanded ? "is-expanded" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                {/* Node Indicator */}
                <div className="timeline-node" aria-hidden="true">
                  <div className="timeline-node-dot" />
                  <span className="timeline-node-number">{item.number}</span>
                </div>

                <div className="timeline-card-content">
                  {/* Card Header */}
                  <div className="timeline-card-header">
                    <div className="timeline-meta-badges">
                      <span className="timeline-period-badge">
                        <Calendar size={13} aria-hidden="true" />
                        <span>{item.period}</span>
                      </span>
                      <span className="timeline-focus-tag">{item.focus}</span>
                    </div>

                    <span className="timeline-role-pill">{item.role}</span>
                  </div>

                  <h3 className="timeline-card-title">{item.title}</h3>
                  <p className="timeline-card-desc">{item.description}</p>

                  {/* Expandable Key Highlights */}
                  <div className="timeline-expandable-section">
                    <button
                      type="button"
                      className="timeline-expand-btn"
                      onClick={() => toggleExpand(item.number)}
                      aria-expanded={isExpanded}
                      aria-controls={`highlights-${item.number}`}
                    >
                      <span>{isExpanded ? "Hide key achievements" : "Explore key milestones & takeaways"}</span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={15} />
                      </motion.span>
                    </button>

                    {isExpanded && (
                      <motion.div
                        id={`highlights-${item.number}`}
                        className="timeline-highlights-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="timeline-highlights-title">
                          <Sparkles size={14} className="sparkle-icon" aria-hidden="true" />
                          Key Contributions &amp; Experience
                        </h4>
                        <ul className="timeline-highlights-list">
                          {item.highlights.map((h, i) => (
                            <li key={i} className="timeline-highlight-item">
                              <CheckCircle2 size={14} className="highlight-check" aria-hidden="true" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
