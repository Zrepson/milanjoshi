"use client";

import React, { useState, useEffect, useId } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import {
  Briefcase,
  TrendingUp,
  Layers,
  PieChart as PieIcon,
  Activity,
  Building2,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export interface ProjectRecord {
  id: string;
  title: string;
  era: string;
  yearRange: string;
  sector: "Public Health" | "Insurance & Finance" | "Web & Digital" | "Operations & Logistics" | "Sustainable Leadership";
  category: "Field Coordination" | "Digital Engineering" | "Advisory & Protection" | "Supply & Operations" | "Research & Dissemination";
  partner: string;
  summary: string;
  impactMetrics: string;
  featured?: boolean;
}

// Full documented portfolio of professional projects and engagements
const projectsData: ProjectRecord[] = [
  {
    id: "mission-oxygen",
    title: "Mission Oxygen Emergency Coordination",
    era: "2020 — 2021",
    yearRange: "2020-2021",
    sector: "Public Health",
    category: "Field Coordination",
    partner: "Robotics Association of Nepal (RAN), MoHP, UNDP",
    summary:
      "Core coordination role managing emergency oxygen plant assessments, field repair logistics, and equipment delivery to critical healthcare centers across Nepal.",
    impactMetrics: "National crisis response · 60+ health centers assisted",
    featured: true,
  },
  {
    id: "biomedical-assessment",
    title: "Bagmati Province Biomedical Hospital Assessment",
    era: "2021 — 2022",
    yearRange: "2021-2022",
    sector: "Public Health",
    category: "Research & Dissemination",
    partner: "UNDP, Biotechnology Society of Nepal (BSN), RAN",
    summary:
      "Conducted extensive province-wide assessment of biomedical equipment across government hospitals, producing research data and policy dissemination materials.",
    impactMetrics: "Province-wide coverage · Published research report",
    featured: true,
  },
  {
    id: "tot-public-health",
    title: "Training of Trainers (ToT) Capacity Building",
    era: "2021 — 2022",
    yearRange: "2021-2022",
    sector: "Public Health",
    category: "Field Coordination",
    partner: "UNDP, Siddhi Shaligram Senior Citizens Home, BSN",
    summary:
      "Facilitated multi-institution training programs to upskill healthcare technicians and community coordinators in biomedical maintenance protocols.",
    impactMetrics: "Multi-cohort technical certification · 100+ trainees",
  },
  {
    id: "lic-nepal-advisory",
    title: "Life Insurance Financial Resilience Practice",
    era: "2022 — Present",
    yearRange: "2022-2026",
    sector: "Insurance & Finance",
    category: "Advisory & Protection",
    partner: "Life Insurance Corporation (Nepal) Ltd., Nepal Insurance Authority",
    summary:
      "Licensed consultant providing long-term financial security planning, risk management, and client education for families and businesses in Bagmati and beyond.",
    impactMetrics: "Licensed practitioner · Client-first advisory model",
    featured: true,
  },
  {
    id: "insurance-literacy",
    title: "Community Financial Literacy & Advisory Outreach",
    era: "2023 — Present",
    yearRange: "2023-2026",
    sector: "Insurance & Finance",
    category: "Advisory & Protection",
    partner: "LIC Nepal & Community Groups in Bhaktapur",
    summary:
      "Demystifying insurance policies, claims procedures, and family wealth preservation through clear, structured educational consultations.",
    impactMetrics: "150+ families consulted · Plain-language guidance",
  },
  {
    id: "portfolio-nextjs",
    title: "Multidisciplinary Portfolio Platform",
    era: "2024 — 2026",
    yearRange: "2024-2026",
    sector: "Web & Digital",
    category: "Digital Engineering",
    partner: "Independent Practice",
    summary:
      "Architected modern high-performance web platform with Next.js App Router, interactive data visualizers, schema SEO, and accessible UI.",
    impactMetrics: "Sub-second TTFB · Accessible interactive visualizers",
    featured: true,
  },
  {
    id: "digital-strategy-seo",
    title: "Digital Strategy & Knowledge Web Platforms",
    era: "2023 — 2025",
    yearRange: "2023-2025",
    sector: "Web & Digital",
    category: "Digital Engineering",
    partner: "Regional Consultancies & Community Initiatives",
    summary:
      "Implemented comprehensive organic discovery architectures, performance optimizations, and content taxonomies for specialized technical platforms.",
    impactMetrics: "Organic search visibility +180% · Structured data compliance",
  },
  {
    id: "ai-robotics-conf",
    title: "International AI & Robotics Conference Digital Support",
    era: "2022 — 2023",
    yearRange: "2022-2023",
    sector: "Web & Digital",
    category: "Research & Dissemination",
    partner: "Robotics Association of Nepal (RAN)",
    summary:
      "Assisted conference communications, digital dissemination, and technical presentation coordination for international engineering symposium.",
    impactMetrics: "500+ attendees · Global researchers & industry delegates",
  },
  {
    id: "100-country-summit",
    title: "Governor for the Future at 100 Country Summit",
    era: "2025",
    yearRange: "2025",
    sector: "Sustainable Leadership",
    category: "Research & Dissemination",
    partner: "NELIS Global (Next Leaders' Initiative for Sustainability)",
    summary:
      "Selected as Governor for the Future representing Nepal; contributed perspectives on sustainable transition, resilience, and grassroots execution.",
    impactMetrics: "Global delegation · 100 country representation",
    featured: true,
  },
  {
    id: "omlas-champions",
    title: "One Million Leaders Asia (OMLAS) Champions Program",
    era: "2025",
    yearRange: "2025",
    sector: "Sustainable Leadership",
    category: "Field Coordination",
    partner: "OMLAS (One Million Leaders Asia)",
    summary:
      "Completed leadership cohort focused on systemic social change, sustainable development goals (SDGs), and youth empowerment strategies in South Asia.",
    impactMetrics: "Regional cohort · SDG execution framework",
  },
  {
    id: "blueprint-tomorrow",
    title: "Blueprint for a Better Tomorrow Workshop",
    era: "2024 — 2025",
    yearRange: "2024-2025",
    sector: "Sustainable Leadership",
    category: "Research & Dissemination",
    partner: "NELIS Global",
    summary:
      "Collaborated with emerging leaders to synthesize actionable ideas from over 1,000 young people into actionable sustainability blueprints.",
    impactMetrics: "1,000+ youth voices synthesized · Policy blueprint",
  },
  {
    id: "disaster-ready-cert",
    title: "Core Humanitarian & Project Cycle Certification",
    era: "2023 — 2024",
    yearRange: "2023-2024",
    sector: "Sustainable Leadership",
    category: "Research & Dissemination",
    partner: "DisasterReady.org",
    summary:
      "Mastery of international humanitarian legal frameworks, duty of care standards, emergency safety protocols, and cyclical relief project delivery.",
    impactMetrics: "International standard certification · Safety & duty of care",
  },
  {
    id: "commercial-dist-ops",
    title: "Regional Sales & Distribution Operations",
    era: "2015 — 2017",
    yearRange: "2015-2017",
    sector: "Operations & Logistics",
    category: "Supply & Operations",
    partner: "A&D Enterprises",
    summary:
      "Managed regional commercial logistics, warehousing, dealer supply chains, and staff operational workflows across multi-district retail networks.",
    impactMetrics: "Multi-district distribution · Supply chain reliability",
    featured: true,
  },
  {
    id: "hospitality-management",
    title: "Frontline Hospitality Operations & Client Experience",
    era: "2013 — 2015",
    yearRange: "2013-2015",
    sector: "Operations & Logistics",
    category: "Supply & Operations",
    partner: "Pokhara Grande & Shangri-La Village Resort",
    summary:
      "Delivered high-touch guest relations, operational administration, and service quality coordination in premium hospitality environments.",
    impactMetrics: "Premium service standard · Guest satisfaction benchmarks",
  },
  {
    id: "banking-operations",
    title: "Frontline Banking & Financial Service Support",
    era: "2012 — 2014",
    yearRange: "2012-2014",
    sector: "Operations & Logistics",
    category: "Supply & Operations",
    partner: "Nepal Investment Mega Bank (NIMB) / Himalayan Bank",
    summary:
      "Administered customer accounts, verified commercial financial transactions, and maintained strict compliance with banking procedures.",
    impactMetrics: "Financial reconciliation · Rigorous transaction compliance",
  },
  {
    id: "marketing-foundations",
    title: "Market Analysis & Business Administration Studies",
    era: "2011 — 2013",
    yearRange: "2011-2013",
    sector: "Operations & Logistics",
    category: "Research & Dissemination",
    partner: "Janapriya Multiple Campus",
    summary:
      "Foundational academic studies in marketing systems, consumer economics, organizational communications, and regional trade dynamics.",
    impactMetrics: "Academic marketing degree · Analytical groundwork",
  },
  {
    id: "engineering-consultancy-support",
    title: "Technical Coordination & Project Documentation",
    era: "2018 — 2020",
    yearRange: "2018-2020",
    sector: "Operations & Logistics",
    category: "Field Coordination",
    partner: "Angel Engineering Consultancy Pvt. Ltd.",
    summary:
      "Provided project scheduling, client liaison, technical specification documentation, and stakeholder reporting for civil and municipal contracts.",
    impactMetrics: "Cross-engineering liaison · Timely contract delivery",
  },
  {
    id: "nrna-convention-liaison",
    title: "Knowledge Exchange & Diaspora Network Liaison",
    era: "2020 — 2022",
    yearRange: "2020-2022",
    sector: "Sustainable Leadership",
    category: "Field Coordination",
    partner: "NRNA Global Knowledge Convention",
    summary:
      "Coordinated thematic sessions connecting Nepali diaspora experts, health researchers, and policymakers on technology transfer and crisis resilience.",
    impactMetrics: "Diaspora knowledge transfer · Healthcare policy alignment",
  },
];

// Timeline Era Aggregates for Chart 1
const timelineData = [
  { era: "2011–2014", label: "Foundations", total: 3, operations: 3, health: 0, digital: 0, insurance: 0, leadership: 0 },
  { era: "2015–2017", label: "Commerce & Ops", total: 2, operations: 2, health: 0, digital: 0, insurance: 0, leadership: 0 },
  { era: "2018–2020", label: "Strategy & Transition", total: 3, operations: 1, health: 1, digital: 1, insurance: 0, leadership: 0 },
  { era: "2020–2022", label: "Crisis & Health Systems", total: 5, operations: 0, health: 3, digital: 1, insurance: 0, leadership: 1 },
  { era: "2022–2024", label: "Insurance & Advisory", total: 5, operations: 0, health: 0, digital: 2, insurance: 2, leadership: 1 },
  { era: "2024–2026", label: "Leadership & Modern Tech", total: 6, operations: 0, health: 0, digital: 2, insurance: 1, leadership: 3 },
];

// Sector Distribution for Chart 2
const sectorData = [
  { name: "Public Health & Relief", shortName: "Public Health", count: 4, percentage: 22, color: "#10b981", keyPartners: "UNDP · MoHP · RAN · BSN" },
  { name: "Financial Protection & Insurance", shortName: "Insurance", count: 3, percentage: 17, color: "#f59e0b", keyPartners: "LIC Nepal · Nepal Insurance Authority" },
  { name: "Web & Digital Engineering", shortName: "Web & Digital", count: 4, percentage: 22, color: "#3b82f6", keyPartners: "Modern Web · Voice AI · SEO Platforms" },
  { name: "Operations & Logistics", shortName: "Operations", count: 4, percentage: 22, color: "#06b6d4", keyPartners: "A&D · NIMB · Pokhara Grande · Angel Eng." },
  { name: "Sustainable Leadership", shortName: "Leadership", count: 4, percentage: 22, color: "#8b5cf6", keyPartners: "NELIS · OMLAS · 100 Country Summit · NRNA" },
];

// Category Distribution for Chart 3
const categoryData = [
  { category: "Field Coordination", count: 5, reach: "Nationwide crisis & regional hubs", color: "#10b981" },
  { category: "Digital Engineering", count: 4, reach: "Next.js apps, AI speech, SEO systems", color: "#3b82f6" },
  { category: "Advisory & Protection", count: 3, reach: "150+ families & licensed consultation", color: "#f59e0b" },
  { category: "Supply & Operations", count: 4, reach: "Warehousing, retail supply, banking", color: "#06b6d4" },
  { category: "Research & Dissemination", count: 5, reach: "Hospital whitepapers & leadership blueprints", color: "#8b5cf6" },
];

type ViewMode = "timeline" | "sector" | "category";

export default function ProjectGrowthVisualizer() {
  const [activeView, setActiveView] = useState<ViewMode>("timeline");
  const [sectorFilter, setSectorFilter] = useState<string>("All");
  const [isClient, setIsClient] = useState(false);
  const chartId = useId();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredProjects = projectsData.filter((p) => {
    if (sectorFilter === "All") return true;
    return p.sector === sectorFilter;
  });

  return (
    <section className="project-growth-section" id="career-growth">
      <div className="container">
        {/* Section Header */}
        <div className="section-heading">
          <div>
            <p className="eyebrow">CAREER METRICS &amp; PROJECT ANALYTICS</p>
            <h2>
              A decade of multidisciplinary growth,{" "}
              <span className="muted-heading">visualized.</span>
            </h2>
          </div>
          <p>
            Explore how my professional focus transitioned from regional commerce and banking operations
            into nationwide public health emergency coordination, licensed life insurance consulting,
            and modern digital development.
          </p>
        </div>

        {/* High-Level Quantitative Rigor Strip */}
        <div className="growth-kpi-grid">
          <div className="growth-kpi-card">
            <div className="growth-kpi-top">
              <Calendar size={18} className="growth-kpi-icon" aria-hidden="true" />
              <span className="growth-kpi-period">2011 — Present</span>
            </div>
            <p className="growth-kpi-value">15+ Years</p>
            <p className="growth-kpi-label">Continuous Professional Practice</p>
          </div>

          <div className="growth-kpi-card">
            <div className="growth-kpi-top">
              <Building2 size={18} className="growth-kpi-icon" aria-hidden="true" />
              <span className="growth-kpi-period">Institutional Reach</span>
            </div>
            <p className="growth-kpi-value">26+ Partners</p>
            <p className="growth-kpi-label">Agencies, Hospitals &amp; Corporations</p>
          </div>

          <div className="growth-kpi-card">
            <div className="growth-kpi-top">
              <Layers size={18} className="growth-kpi-icon" aria-hidden="true" />
              <span className="growth-kpi-period">Multidisciplinary</span>
            </div>
            <p className="growth-kpi-value">5 Sectors</p>
            <p className="growth-kpi-label">Health, Finance, Web, Ops &amp; Governance</p>
          </div>

          <div className="growth-kpi-card">
            <div className="growth-kpi-top">
              <Activity size={18} className="growth-kpi-icon" aria-hidden="true" />
              <span className="growth-kpi-period">Documented Scope</span>
            </div>
            <p className="growth-kpi-value">18 Major Initiatives</p>
            <p className="growth-kpi-label">Coordinated, Delivered or Consulted</p>
          </div>
        </div>

        {/* Interactive Visualizer Surface */}
        <div className="growth-visualizer-frame">
          {/* View Controller Bar */}
          <div className="visualizer-header-bar">
            <div className="visualizer-title-area">
              <h3 className="visualizer-title">
                {activeView === "timeline" && "Project Timeline & Initiative Trajectory"}
                {activeView === "sector" && "Sectoral Portfolio Composition"}
                {activeView === "category" && "Core Discipline & Impact Delivery"}
              </h3>
              <p className="visualizer-subtitle">
                {activeView === "timeline" && "Visualizing initiative density across six key development eras."}
                {activeView === "sector" && "Proportional distribution across Milan's five primary areas of engagement."}
                {activeView === "category" && "Work volume grouped by delivery modality and operational focus."}
              </p>
            </div>

            {/* Segmented View Controls (Buttons with click handlers) */}
            <div className="visualizer-view-tabs" role="tablist" aria-label="Visualization views">
              <button
                type="button"
                role="tab"
                aria-selected={activeView === "timeline"}
                className={`visualizer-tab-btn ${activeView === "timeline" ? "is-active" : ""}`}
                onClick={() => setActiveView("timeline")}
              >
                <TrendingUp size={14} aria-hidden="true" />
                <span>Timeline</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeView === "sector"}
                className={`visualizer-tab-btn ${activeView === "sector" ? "is-active" : ""}`}
                onClick={() => setActiveView("sector")}
              >
                <PieIcon size={14} aria-hidden="true" />
                <span>By Sector</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeView === "category"}
                className={`visualizer-tab-btn ${activeView === "category" ? "is-active" : ""}`}
                onClick={() => setActiveView("category")}
              >
                <Briefcase size={14} aria-hidden="true" />
                <span>By Category</span>
              </button>
            </div>
          </div>

          {/* Chart Display Area */}
          <div className="growth-chart-container">
            {!isClient ? (
              <div className="chart-loading-placeholder">
                <p>Loading interactive chart telemetry...</p>
              </div>
            ) : (
              <>
                {/* VIEW 1: TIMELINE AREA / BAR STACK */}
                {activeView === "timeline" && (
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={340}>
                      <AreaChart
                        data={timelineData}
                        margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id={`grad-total-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d9e66b" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#d9e66b" stopOpacity={0.0} />
                          </linearGradient>
                          <linearGradient id={`grad-health-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" vertical={false} />
                        <XAxis
                          dataKey="era"
                          stroke="var(--muted)"
                          tick={{ fill: "var(--muted)", fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: "rgba(255, 255, 255, 0.12)" }}
                        />
                        <YAxis
                          stroke="var(--muted)"
                          tick={{ fill: "var(--muted)", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          allowDecimals={false}
                        />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="recharts-custom-tooltip">
                                  <p className="tooltip-title">{label}</p>
                                  <p className="tooltip-era-name">{data.label}</p>
                                  <div className="tooltip-divider" />
                                  <p className="tooltip-stat">
                                    Total Initiatives: <strong>{data.total}</strong>
                                  </p>
                                  <div className="tooltip-breakdown">
                                    {data.health > 0 && <span>· Public Health: {data.health}</span>}
                                    {data.insurance > 0 && <span>· Insurance Advisory: {data.insurance}</span>}
                                    {data.digital > 0 && <span>· Web &amp; Digital: {data.digital}</span>}
                                    {data.operations > 0 && <span>· Operations &amp; Commerce: {data.operations}</span>}
                                    {data.leadership > 0 && <span>· Sustainable Leadership: {data.leadership}</span>}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="total"
                          name="Total Initiatives"
                          stroke="#d9e66b"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill={`url(#grad-total-${chartId})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>

                    {/* Timeline Era Callout Indicators */}
                    <div className="timeline-era-legend">
                      {timelineData.map((d) => (
                        <div key={d.era} className="era-legend-item">
                          <span className="era-legend-time">{d.era}</span>
                          <span className="era-legend-title">{d.label}</span>
                          <span className="era-legend-count">{d.total} projects</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VIEW 2: SECTOR DISTRIBUTION DONUT + DETAILS */}
                {activeView === "sector" && (
                  <div className="sector-split-layout">
                    <div className="sector-chart-pane">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={sectorData}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={72}
                            outerRadius={108}
                            paddingAngle={4}
                            stroke="var(--surface)"
                            strokeWidth={2}
                          >
                            {sectorData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="recharts-custom-tooltip">
                                    <p className="tooltip-title" style={{ color: data.color }}>
                                      {data.name}
                                    </p>
                                    <div className="tooltip-divider" />
                                    <p className="tooltip-stat">
                                      {data.count} Key Projects ({data.percentage}% of portfolio)
                                    </p>
                                    <p className="tooltip-note">Partners: {data.keyPartners}</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="sector-donut-center">
                        <span className="donut-center-num">18</span>
                        <span className="donut-center-lbl">Projects</span>
                      </div>
                    </div>

                    <div className="sector-details-pane">
                      <p className="sector-pane-title">Sectors of Engagement</p>
                      <div className="sector-list">
                        {sectorData.map((sec) => (
                          <div
                            key={sec.name}
                            className={`sector-row-item ${sectorFilter === sec.shortName || (sectorFilter === "All" && "") ? "is-highlighted" : ""}`}
                            onClick={() => setSectorFilter(sectorFilter === sec.shortName ? "All" : sec.shortName)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                setSectorFilter(sectorFilter === sec.shortName ? "All" : sec.shortName);
                              }
                            }}
                          >
                            <div className="sector-row-left">
                              <span className="sector-color-indicator" style={{ backgroundColor: sec.color }} />
                              <div>
                                <span className="sector-row-name">{sec.name}</span>
                                <span className="sector-row-partners">{sec.keyPartners}</span>
                              </div>
                            </div>
                            <div className="sector-row-right">
                              <span className="sector-row-count">{sec.count}</span>
                              <span className="sector-row-pct">{sec.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 3: BY CATEGORY BAR CHART */}
                {activeView === "category" && (
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart
                        data={categoryData}
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 120, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" horizontal={false} />
                        <XAxis
                          type="number"
                          stroke="var(--muted)"
                          tick={{ fill: "var(--muted)", fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: "rgba(255, 255, 255, 0.12)" }}
                          allowDecimals={false}
                        />
                        <YAxis
                          type="category"
                          dataKey="category"
                          stroke="var(--muted)"
                          tick={{ fill: "var(--text)", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          width={110}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="recharts-custom-tooltip">
                                  <p className="tooltip-title" style={{ color: data.color }}>
                                    {data.category}
                                  </p>
                                  <div className="tooltip-divider" />
                                  <p className="tooltip-stat">
                                    Initiatives tracked: <strong>{data.count}</strong>
                                  </p>
                                  <p className="tooltip-note">Typical reach: {data.reach}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="count"
                          radius={[0, 4, 4, 0]}
                          maxBarSize={28}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`bar-cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="chart-caption-note">
                      Categorization reflects operational capacity: field execution under emergency constraints, client-centered advisory, technical systems engineering, operational commerce, and published policy research.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Interactive Project Deep-Dive Explorer */}
        <div className="growth-deepdive-block">
          <div className="deepdive-header">
            <div>
              <p className="eyebrow">DOCUMENTED PORTFOLIO</p>
              <h3 className="deepdive-title">Selected Projects &amp; Contributions</h3>
            </div>

            {/* Filter Buttons for Sector (Accessible interactive controls) */}
            <div className="deepdive-filter-group" role="tablist" aria-label="Filter projects by sector">
              {["All", "Public Health", "Insurance & Finance", "Web & Digital", "Operations & Logistics", "Sustainable Leadership"].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  role="tab"
                  aria-selected={sectorFilter === sec}
                  className={`deepdive-filter-btn ${sectorFilter === sec ? "is-active" : ""}`}
                  onClick={() => setSectorFilter(sec)}
                >
                  {sec === "All" ? "All Projects (18)" : sec}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className={`project-card ${project.featured ? "is-featured" : ""}`}>
                <div className="project-card-header">
                  {/* Clean unboxed metadata with typographic separators (anti-slop rule) */}
                  <div className="project-metadata-strip">
                    <span className="project-meta-era">{project.era}</span>
                    <span aria-hidden="true" className="meta-sep">·</span>
                    <span className="project-meta-sector">{project.sector}</span>
                    <span aria-hidden="true" className="meta-sep">·</span>
                    <span className="project-meta-cat">{project.category}</span>
                  </div>

                  {project.featured && (
                    <span className="featured-flag">
                      <Sparkles size={12} aria-hidden="true" />
                      <span>Key Initiative</span>
                    </span>
                  )}
                </div>

                <h4 className="project-card-title">{project.title}</h4>
                <p className="project-card-summary">{project.summary}</p>

                <div className="project-card-footer">
                  <div className="project-partner-info">
                    <span className="partner-label">Partner / Setting:</span>
                    <span className="partner-name">{project.partner}</span>
                  </div>
                  <div className="project-metrics-info">
                    <span className="metrics-label">Outcome / Reach:</span>
                    <span className="metrics-text">{project.impactMetrics}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="projects-empty-state">
              <p>No projects found matching the selected filter.</p>
              <button
                type="button"
                className="button"
                onClick={() => setSectorFilter("All")}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
