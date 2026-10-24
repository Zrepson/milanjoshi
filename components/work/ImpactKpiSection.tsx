"use client";

import React, { useState, useEffect, useRef } from "react";
import { FolderKanban, Handshake, CalendarCheck, ShieldCheck, ArrowUpRight, RotateCcw, LucideIcon } from "lucide-react";

interface KpiItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  category: string;
  context: string;
  milestone: string;
  icon: LucideIcon;
}

const KPI_DATA: KpiItem[] = [
  {
    id: "projects-delivered",
    value: 48,
    suffix: "+",
    label: "Projects Delivered",
    category: "Execution & Delivery",
    context: "Public health emergency supply chain, digital web systems, and biomedical assessments.",
    milestone: "Mission Oxygen · Bagmati Province · Web Platforms",
    icon: FolderKanban,
  },
  {
    id: "partners-supported",
    value: 32,
    suffix: "+",
    label: "Partners Supported",
    category: "Collaboration",
    context: "UN agencies, provincial health directorates, engineering bodies, and LIC Nepal.",
    milestone: "UNDP · RAN · BSN · Healthcare Facilities",
    icon: Handshake,
  },
  {
    id: "events-coordinated",
    value: 26,
    suffix: "+",
    label: "Events Coordinated",
    category: "Stakeholder Alignment",
    context: "Technical dissemination workshops, emergency task forces, and national conferences.",
    milestone: "AI & Robotics Summit · Knowledge Dissemination",
    icon: CalendarCheck,
  },
  {
    id: "clients-advised",
    value: 180,
    suffix: "+",
    label: "Families & Clients Advised",
    category: "Financial Protection",
    context: "Life insurance consultations, risk protection, and long-term security guidance.",
    milestone: "Licensed Life Insurance Consultant (LIC Nepal)",
    icon: ShieldCheck,
  },
];

function AnimatedCounter({
  target,
  duration = 1800,
  shouldAnimate,
}: {
  target: number;
  duration?: number;
  shouldAnimate: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setCurrent(target);
      return;
    }

    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCurrent(target);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const nextValue = Math.floor(easedProgress * target);

      setCurrent(nextValue);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, shouldAnimate]);

  return <span>{current}</span>;
}

export default function ImpactKpiSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [replayKey, setReplayKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  const handleReplay = () => {
    setIsVisible(false);
    setTimeout(() => {
      setReplayKey((prev) => prev + 1);
      setIsVisible(true);
    }, 60);
  };

  return (
    <section
      ref={sectionRef}
      className="impact-kpi-section"
      aria-labelledby="impact-kpi-heading"
    >
      <div className="container">
        <div className="impact-kpi-header">
          <div>
            <p className="eyebrow">MEASURABLE OUTCOMES</p>
            <h2 id="impact-kpi-heading" className="impact-kpi-title">
              Project impact at a <span>glance.</span>
            </h2>
          </div>
          <div className="impact-kpi-controls">
            <p className="impact-kpi-summary">
              Verified cumulative milestones across public health emergency logistics, engineering coordination, digital systems, and client advisory.
            </p>
            <button
              type="button"
              onClick={handleReplay}
              className="impact-kpi-replay-btn"
              title="Replay counter animation"
              aria-label="Replay counter animation"
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>Replay Metrics</span>
            </button>
          </div>
        </div>

        <div className="impact-kpi-grid">
          {KPI_DATA.map((item) => {
            const Icon = item.icon;
            const isSelected = activeCardId === item.id;

            return (
              <div
                key={`${item.id}-${replayKey}`}
                className={`impact-kpi-card ${isSelected ? "is-selected" : ""}`}
                onClick={() => setActiveCardId(isSelected ? null : item.id)}
                role="region"
                aria-label={`${item.label} metric`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveCardId(isSelected ? null : item.id);
                  }
                }}
              >
                <div className="impact-kpi-card-top">
                  <span className="impact-kpi-category">{item.category}</span>
                  <div className="impact-kpi-icon-wrap" aria-hidden="true">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="impact-kpi-number-row">
                  <div className="impact-kpi-value" aria-hidden="true">
                    <AnimatedCounter
                      target={item.value}
                      duration={1600}
                      shouldAnimate={isVisible}
                    />
                    <span className="impact-kpi-suffix">{item.suffix}</span>
                  </div>
                  <span className="sr-only">
                    {item.value}
                    {item.suffix} {item.label}
                  </span>
                </div>

                <h3 className="impact-kpi-label">{item.label}</h3>

                <p className="impact-kpi-context">{item.context}</p>

                <div className="impact-kpi-milestone-strip">
                  <span className="impact-kpi-milestone-marker" aria-hidden="true" />
                  <span className="impact-kpi-milestone-text">{item.milestone}</span>
                </div>

                <div className="impact-kpi-card-footer">
                  <span className="impact-kpi-card-action">
                    {isSelected ? "Showing details" : "Inspect focus"}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className={`impact-kpi-arrow ${isSelected ? "is-rotated" : ""}`}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
