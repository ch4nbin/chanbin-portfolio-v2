"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

interface ExperienceItem {
  dateRange: string
  company: string
  role: string
  bullets: string[]
}

const experiences: ExperienceItem[] = [
  {
    dateRange: "Jan. 2026 - Present",
    company: "Princeton Stigma and Social Perception Lab",
    role: "Machine Learning Research Intern",
    bullets: [
      "Applied TensorFlow ML/NLP embeddings to analyze 30K+ conversational text segments and quantify social patterns.",
      "Built Python pipelines (pandas, NumPy) to process 50K+ embeddings reducing preprocessing time by 40%.",
      "Used scikit-learn to evaluate embedding quality through clustering and cosine similarity analysis of conversational text.",
      "Designed modular configuration-driven analysis code reused across 3+ research projects to reduce duplicated logic.",
    ],
  },
  {
    dateRange: "Aug. 2025 - Dec. 2025",
    company: "WIT Sports",
    role: "Software Engineer Intern",
    bullets: [
      "Developed a full-stack “Guess the Player” web app using React and Phaser deployed in production for 200+ partners.",
      "Designed a backend API with Express and MongoDB achieving ∼45 ms leaderboard fetch latency at 10K+ records.",
      "Added read-through Redis caching to leaderboard endpoints to reduce database load and stabilize response latency.",
      "Implemented gameplay analytics (guesses, time, opt-in email) enabling 1.2K+ submissions and a 65% consent rate",
    ],
  },
  {
    dateRange: "June 2025 - Aug. 2025",
    company: "Cambridge University Digital Humanities",
    role: "Software Engineer Intern",
    bullets: [
      "Built a Python NLP pipeline to convert 85+ research papers into structured summaries reducing review time by 50%.",
      "Implemented a TypeScript and React web application for exploration of 1K+ entities with dynamic filtering.",
      "Developed Python workflows to normalize text into JSON datasets cutting manual preprocessing by 60%.",
      "Indexed extracted PDF text using SQLite FTS5 to enable fast keyword search across 750+ research documents.",
    ],
  },
]

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-4 px-5 py-5 min-h-[72px] text-left transition-colors duration-200 hover:bg-muted/40 cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
            {item.dateRange}
          </p>
          <p className="text-xs text-muted-foreground/70">{item.role}</p>
        </div>
        <div className="hidden sm:block h-px flex-1 bg-border min-w-8" />
        <div className="flex items-center gap-2 shrink-0">
          <p className="font-mono text-xs tracking-[0.12em] uppercase text-foreground text-right">
            {item.company}
          </p>
          <ChevronDown
            className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-2 px-5 pb-5 pt-1">
            {item.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-xs leading-relaxed text-muted-foreground"
              >
                <span className="text-muted-foreground/50 select-none shrink-0">{"--"}</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function ExperienceTimeline() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
        Work Experience
      </h2>

      <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
        {experiences.map((item, index) => (
          <TimelineItem key={item.company} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
