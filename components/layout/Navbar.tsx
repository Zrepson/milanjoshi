"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavbarSearch from "./NavbarSearch";

const nepaliMonthStarts = [
  { date: "2026-04-14", month: "बैशाख", year: 2083 },
  { date: "2026-05-15", month: "जेठ", year: 2083 },
  { date: "2026-06-15", month: "असार", year: 2083 },
  { date: "2026-07-17", month: "साउन", year: 2083 },
  { date: "2026-08-17", month: "भदौ", year: 2083 },
  { date: "2026-09-17", month: "असोज", year: 2083 },
  { date: "2026-10-18", month: "कात्तिक", year: 2083 },
  { date: "2026-11-17", month: "मंसिर", year: 2083 },
  { date: "2026-12-17", month: "पुस", year: 2083 },
  { date: "2027-01-15", month: "माघ", year: 2083 },
  { date: "2027-02-14", month: "फागुन", year: 2083 },
  { date: "2027-03-16", month: "चैत", year: 2083 },
];

type Language = "en" | "ne" | "hi";

const languageLabels: Record<Language, string> = {
  en: "English",
  ne: "नेपाली",
  hi: "हिन्दी",
};

const navigationLabels: Record<Language, string[]> = {
  en: ["About", "Experience", "Services", "Projects", "Credentials", "Insights", "Community", "Contact"],
  ne: ["परिचय", "अनुभव", "सेवाहरू", "परियोजनाहरू", "प्रमाणपत्र", "अन्तर्दृष्टि", "समुदाय", "सम्पर्क"],
  hi: ["परिचय", "अनुभव", "सेवाएँ", "परियोजनाएँ", "प्रमाणपत्र", "अंतर्दृष्टि", "समुदाय", "संपर्क"],
};

const clockLabels: Record<Language, { zone: string; upcoming: string; holidays: string; viewCalendar: string }> = {
  en: { zone: "NPT · UTC+05:45", upcoming: "UPCOMING HOLIDAY", holidays: "NEPAL HOLIDAYS", viewCalendar: "View calendar ↗" },
  ne: { zone: "एनपीटी · यूटीसी+०५:४५", upcoming: "आउँदो बिदा", holidays: "नेपालका बिदाहरू", viewCalendar: "क्यालेन्डर हेर्नुहोस् ↗" },
  hi: { zone: "एनपीटी · यूटीसी+०५:४५", upcoming: "आगामी अवकाश", holidays: "नेपाल की छुट्टियाँ", viewCalendar: "कैलेंडर देखें ↗" },
};

function toNepaliDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => "०१२३४५६७८९"[Number(digit)]);
}

function formatNepaliDate(now: Date | null, dateKey: string, language: Language) {
  if (!now || !dateKey) return "";

  const today = Date.parse(`${dateKey}T00:00:00Z`);
  const monthStart = [...nepaliMonthStarts]
    .reverse()
    .find((month) => Date.parse(`${month.date}T00:00:00Z`) <= today);

  if (!monthStart) return "";

  const monthDay = Math.floor(
    (today - Date.parse(`${monthStart.date}T00:00:00Z`)) / 86_400_000,
  ) + 1;
  const weekday = new Intl.DateTimeFormat("ne-NP", {
    timeZone: "Asia/Kathmandu",
    weekday: "long",
  }).format(now);
  const localizedWeekday =
    language === "en"
      ? new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kathmandu", weekday: "long" }).format(now)
      : language === "hi"
        ? new Intl.DateTimeFormat("hi-IN", { timeZone: "Asia/Kathmandu", weekday: "long" }).format(now)
        : weekday;

  return `${localizedWeekday} · ${monthStart.month} ${toNepaliDigits(monthDay)}, ${toNepaliDigits(monthStart.year)}`;
}

function NepalClock({ language }: { language: Language }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const date = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kathmandu",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(now)
    : "-- --- ----";
  const time = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)
    : "--:--:--";
  const todayParts = now
    ? new Intl.DateTimeFormat("en", {
        timeZone: "Asia/Kathmandu",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(now)
    : [];
  const todayKey = ["year", "month", "day"]
    .map((type) => todayParts.find((part) => part.type === type)?.value ?? "")
    .join("-");
  const nepaliDate = formatNepaliDate(now, todayKey, language);
  const nextHoliday = [{ date: "2026-10-17", name: "Phulpati", dateLabel: "17 Oct" }]
    .find((holiday) => holiday.date >= todayKey);
  const labels = clockLabels[language];

  return (
    <>
      <time className="nepal-clock" dateTime={now?.toISOString()}>
        <span className="nepal-clock-date">{date}</span>
        <span className="nepal-clock-bs" lang="ne">{nepaliDate}</span>
        <span className="nepal-clock-time">{time}</span>
        <span className="nepal-clock-zone">{labels.zone}</span>
      </time>
      <a
        className="nepal-holiday"
        href="https://moha.gov.np/en/page/government-and-public-holidays-in-2083"
        aria-label={nextHoliday ? `Upcoming Nepal holiday: ${nextHoliday.name}, ${nextHoliday.dateLabel}` : "View Nepal public holiday calendar"}
        title="View the official Nepal public holiday calendar"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="nepal-holiday-label">{nextHoliday ? labels.upcoming : labels.holidays}</span>
        <span className="nepal-holiday-name">
          {nextHoliday
            ? `${nextHoliday.name} · ${nextHoliday.dateLabel}`
            : labels.viewCalendar}
        </span>
      </a>
    </>
  );
}

function ThemeToggle() {
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("milan-joshi-theme");
    const nextLightMode = savedTheme === "light";
    setLightMode(nextLightMode);
    document.documentElement.dataset.theme = nextLightMode ? "light" : "dark";
  }, []);

  const toggleTheme = () => {
    const nextLightMode = !lightMode;
    setLightMode(nextLightMode);
    document.documentElement.dataset.theme = nextLightMode ? "light" : "dark";
    window.localStorage.setItem("milan-joshi-theme", nextLightMode ? "light" : "dark");
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={lightMode ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={lightMode}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {lightMode ? "☼" : "◐"}
      </span>
      <span>{lightMode ? "Light" : "Dark"}</span>
    </button>
  );
}

export default function Navbar() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("milan-joshi-language");
    if (savedLanguage === "en" || savedLanguage === "ne" || savedLanguage === "hi") {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const updateLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem("milan-joshi-language", nextLanguage);
  };

  const labels = navigationLabels[language];

  return (
    <>
      <div className="navbar-meta" aria-label="Nepal time and upcoming holidays">
        <div className="container navbar-meta-inner">
          <p className="navbar-notice" role="status">
            Website not finalized yet ·{" "}
            <a
              href="https://milanjoshicomnp.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              visit the previous website ↗
            </a>
          </p>
          <div className="navbar-meta-details">
            <NepalClock language={language} />
            <div className="navbar-meta-controls">
              <label className="language-select">
                <span className="sr-only">Website language</span>
                <select
                  value={language}
                  aria-label="Website language"
                  onChange={(event) => updateLanguage(event.target.value as Language)}
                >
                  {(Object.keys(languageLabels) as Language[]).map((option) => (
                    <option key={option} value={option}>
                      {languageLabels[option]}
                    </option>
                  ))}
                </select>
              </label>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      <header className="navbar">
        <div className="container navbar-inner">
        <Link href="/" className="logo">
          <span className="logo-word">MILAN<span>.</span></span>
        </Link>

          <div className="navbar-right">
            <nav className="navigation" aria-label="Primary navigation">
              <Link href="/about">{labels[0]}</Link>
              <Link href="/work">{labels[1]}</Link>
              <Link href="/services">{labels[2]}</Link>
              <Link href="/work#areas">{labels[3]}</Link>
              <Link href="/credentials">{labels[4]}</Link>
              <Link href="/lab">{labels[5]}</Link>
              <Link href="/impact">{labels[6]}</Link>
              <Link href="/contact">{labels[7]}</Link>
            </nav>
            <NavbarSearch language={language} />
          </div>
        </div>
      </header>
    </>
  );
}
