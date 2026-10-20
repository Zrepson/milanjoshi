"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, Filter } from "lucide-react";
import { searchableItems, SearchCategory, SearchItem } from "@/lib/search-data";

interface NavbarSearchProps {
  language?: string;
}

const categoryTabs: { id: SearchCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "projects", label: "Projects & Work" },
  { id: "credentials", label: "Credentials" },
  { id: "principles", label: "Principles" },
  { id: "services", label: "Services" },
  { id: "impact", label: "Impact" },
];

const popularSearches = [
  "Mission Oxygen",
  "Governor for the Future",
  "Life Insurance",
  "Biomedical Equipment",
  "Make it useful",
  "SDGs",
  "Web Development",
];

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="navbar-search-highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function NavbarSearch({ language = "en" }: NavbarSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>("all");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Global hotkey: "/" or "Ctrl+K" / "Cmd+K" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter items
  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    return searchableItems.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Query filter
      if (!trimmed) return true;

      const titleMatch = item.title.toLowerCase().includes(trimmed);
      const descMatch = item.description.toLowerCase().includes(trimmed);
      const categoryMatch = item.categoryLabel.toLowerCase().includes(trimmed);
      const keywordMatch = item.keywords.some((k) => k.toLowerCase().includes(trimmed));

      return titleMatch || descMatch || categoryMatch || keywordMatch;
    });
  }, [query, selectedCategory]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current && listRef.current.children[selectedIndex]) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Key navigation in results
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredResults.length ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      if (filteredResults.length > 0 && filteredResults[selectedIndex]) {
        e.preventDefault();
        const target = filteredResults[selectedIndex];
        setIsOpen(false);
        router.push(target.href);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleSelectResult = () => {
    setIsOpen(false);
  };

  return (
    <div className="navbar-search" ref={containerRef}>
      <div className={`navbar-search-bar ${isOpen ? "is-active" : ""}`}>
        <Search className="navbar-search-icon" aria-hidden="true" size={15} />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="navbar-search-results"
          aria-autocomplete="list"
          aria-label="Search content across pages (projects, credentials, principles, services)"
          className="navbar-search-input"
          placeholder="Search site (/ or ⌘K)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
        />
        {query ? (
          <button
            type="button"
            className="navbar-search-clear"
            onClick={clearSearch}
            aria-label="Clear search input"
          >
            <X size={14} />
          </button>
        ) : (
          <kbd className="navbar-search-kbd" aria-hidden="true" title="Press / to search">
            /
          </kbd>
        )}
      </div>

      {isOpen && (
        <div
          id="navbar-search-results"
          className="navbar-search-dropdown"
          role="region"
          aria-label="Search results and filters"
        >
          {/* Category Filter Bar */}
          <div className="navbar-search-filter-bar">
            <span className="navbar-search-filter-label" aria-hidden="true">
              <Filter size={12} /> Filter:
            </span>
            <div className="navbar-search-categories" role="tablist">
              {categoryTabs.map((tab) => {
                const isSelected = selectedCategory === tab.id;
                // Count results in this category
                const count =
                  tab.id === "all"
                    ? query.trim()
                      ? searchableItems.filter((i) => {
                          const t = query.trim().toLowerCase();
                          return (
                            i.title.toLowerCase().includes(t) ||
                            i.description.toLowerCase().includes(t) ||
                            i.keywords.some((k) => k.toLowerCase().includes(t))
                          );
                        }).length
                      : searchableItems.length
                    : searchableItems.filter((i) => {
                        if (i.category !== tab.id) return false;
                        if (!query.trim()) return true;
                        const t = query.trim().toLowerCase();
                        return (
                          i.title.toLowerCase().includes(t) ||
                          i.description.toLowerCase().includes(t) ||
                          i.keywords.some((k) => k.toLowerCase().includes(t))
                        );
                      }).length;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`navbar-search-tab ${isSelected ? "is-selected" : ""}`}
                    onClick={() => {
                      setSelectedCategory(tab.id);
                      inputRef.current?.focus();
                    }}
                  >
                    <span>{tab.label}</span>
                    <span className="navbar-search-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Suggestions when query is empty */}
          {!query.trim() && (
            <div className="navbar-search-suggestions">
              <div className="navbar-search-suggestions-header">
                <Sparkles size={13} className="navbar-search-sparkle-icon" />
                <span>Popular topics to explore:</span>
              </div>
              <div className="navbar-search-tags">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    className="navbar-search-tag"
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          <div className="navbar-search-results-wrapper">
            {filteredResults.length > 0 ? (
              <ul className="navbar-search-list" ref={listRef} role="listbox">
                {filteredResults.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      className={`navbar-search-item ${isSelected ? "is-highlighted" : ""}`}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <Link
                        href={item.href}
                        onClick={handleSelectResult}
                        className="navbar-search-item-link"
                      >
                        <div className="navbar-search-item-header">
                          <span className="navbar-search-item-category">
                            {item.categoryLabel}
                          </span>
                          <span className="navbar-search-item-page">
                            {item.page}
                          </span>
                        </div>
                        <h4 className="navbar-search-item-title">
                          {highlightMatch(item.title, query)}
                        </h4>
                        <p className="navbar-search-item-desc">
                          {highlightMatch(item.description, query)}
                        </p>
                        <span className="navbar-search-item-arrow" aria-hidden="true">
                          <ArrowRight size={13} />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="navbar-search-empty">
                <p className="navbar-search-empty-title">
                  No matches found for &ldquo;{query}&rdquo;
                </p>
                <p className="navbar-search-empty-hint">
                  Try searching for keywords like <strong>Mission Oxygen</strong>,{" "}
                  <strong>Governor</strong>, <strong>Principles</strong>,{" "}
                  <strong>Insurance</strong>, or <strong>Biomedical</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Footer with keyboard shortcuts hint */}
          <div className="navbar-search-footer">
            <span className="navbar-search-footer-hint">
              <span className="navbar-search-key">↑</span>
              <span className="navbar-search-key">↓</span> Navigate
            </span>
            <span className="navbar-search-footer-hint">
              <span className="navbar-search-key">
                <CornerDownLeft size={10} style={{ display: "inline" }} />
              </span>{" "}
              Open
            </span>
            <span className="navbar-search-footer-hint">
              <span className="navbar-search-key">Esc</span> Close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
