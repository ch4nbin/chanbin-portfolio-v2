"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github, ChevronDown } from "lucide-react"

interface Project {
  name: string
  description: string
  descriptionHighlight?: string
  tech: string
  links: { href: string; icon: "github" | "external" }[]
  bullets: string[]
}

const projects: Project[] = [
  {
    name: "Lumenta",
    description: "AI video surveillance platform, Grand Prize at SB Hacks XII",
    descriptionHighlight: "Grand Prize at SB Hacks XII",
    tech: "Next.js / TypeScript / MongoDB / YOLOv8 / Gemini",
    links: [
      { href: "https://github.com/ch4nbin", icon: "github" },
      { href: "#", icon: "external" },
    ],
    bullets: [
      "Engineered an AI video surveillance platform that interprets live camera feeds and autonomously triggers actions via MCP tools winning SB Hacks XII (Grand Prize, 2nd Place) among 340+ participants.",
      "Combined on-device YOLOv8 detection achieving 85% precision with a from-scratch blob-tracking motion algorithm maintaining stable object tracking across 90%+ frame transitions at 1s/frame.",
      "Built an event-driven pipeline storing 5K+ timestamped detections in MongoDB Atlas for real-time querying.",
      "Designed a modular provider system with runtime switching and local fallbacks for reliable MCP tool execution.",
    ],
  },
  {
    name: "Tempo",
    description: "Real-time collaborative video editor with WebGPU effects",
    tech: "Next.js / TypeScript / Go / AWS / Docker / WebGPU",
    links: [
      { href: "https://github.com/ch4nbin", icon: "github" },
      { href: "#", icon: "external" },
    ],
    bullets: [
      "Developed a real-time collaborative video editor with WebGPU/WGSL supporting advanced temporal effects.",
      "Implemented a CRDT-based conflict-free collaboration system using Yjs and WebSockets with sub-100 ms latency.",
      "Engineered a Docker-containerized Go backend for FFmpeg processing and AWS S3/CloudFront delivery.",
      "Developed a CI/CD pipeline using GitHub Actions for automated builds, validation, and Vercel/AWS deploys.",
    ],
  },
  {
    name: "NoteNest",
    description: "AI-powered note-taking social media platform",
    tech: "Next.js / React / TypeScript / Supabase / Grok / Gemini",
    links: [
      { href: "https://github.com/ch4nbin", icon: "github" },
      { href: "https://notenestapp.tech", icon: "external" },
    ],
    bullets: [
      "Built a web app that turns lectures and articles into AI notes and compiles friends’ notes and Q&A into one master doc.",
      "Implemented a real-time audio transcription pipeline using API routes and WebSockets that ingests audio/transcripts and uses Google Gemini for voice-to-text transcription from sources like Zoom and YouTube.",
      "Utilized Grok (xAI) to generate notes and power live Q&A as well as fold answers back into the running notes.",
      "Designed Supabase/Postgres schema with RLS and Supabase Auth deployed on Vercel with env-scoped configs.",
    ],
  },
]

function ProjectRow({ project, index }: { project: Project; index: number }) {
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
        className="w-full flex items-center justify-between gap-4 px-5 py-5 h-[88px] text-left transition-colors duration-200 hover:bg-muted/40 cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex flex-col gap-1 min-w-0">
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
            {project.descriptionHighlight ? (
              <>
                {project.description.split(project.descriptionHighlight)[0]}
                <span className="text-orange-400">{project.descriptionHighlight}</span>
                {project.description.split(project.descriptionHighlight)[1]}
              </>
            ) : (
              project.description
            )}
          </p>
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground/70">
            {project.tech}
          </p>
        </div>

        <div className="hidden sm:block h-px flex-1 bg-border min-w-8" />

        <div className="flex items-center gap-3 shrink-0">
          <p className="font-mono text-xs tracking-[0.12em] uppercase text-foreground text-right">
            {project.name}
          </p>
          <div className="flex items-center gap-1.5">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/70 transition-colors duration-200 hover:text-foreground"
                aria-label={link.icon === "github" ? "GitHub" : "External link"}
                onClick={(e) => e.stopPropagation()}
              >
                {link.icon === "github" ? (
                  <Github className="h-3.5 w-3.5" />
                ) : (
                  <ExternalLink className="h-3.5 w-3.5" />
                )}
              </a>
            ))}
          </div>
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
            {project.bullets.map((bullet, i) => (
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

export function ProjectsSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
        Projects
      </h2>

      <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
        {projects.map((project, index) => (
          <ProjectRow key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
