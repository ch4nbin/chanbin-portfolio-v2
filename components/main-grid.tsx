"use client"

import { useEffect, useRef, useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { EducationSection } from "@/components/education-section"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { GithubBush } from "@/components/github-bush"

export function MainGrid() {
  const rightRef = useRef<HTMLDivElement>(null)
  const [leftHeight, setLeftHeight] = useState<number | null>(null)

  // Set left column height to match right exactly so bottoms align (mount + resize only).
  useEffect(() => {
    const syncHeight = () => {
      if (!rightRef.current) return
      const h = rightRef.current.offsetHeight
      if (h > 0) setLeftHeight(h)
    }

    const raf = requestAnimationFrame(() => {
      syncHeight()
      setTimeout(syncHeight, 150)
    })
    window.addEventListener("resize", syncHeight)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", syncHeight)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16 lg:items-start">
      {/* Left: exact same height as right so bottom of Get in Touch aligns with bottom of Projects */}
      <div
        className="flex flex-col gap-12 min-h-0 shrink-0 overflow-hidden lg:self-start"
        style={leftHeight != null ? { height: leftHeight } : undefined}
      >
        <div className="flex flex-col gap-12 min-h-0 min-w-0 shrink">
          <HeroSection />
          <EducationSection />
          <GithubBush />
        </div>
        <div className="flex-1 min-h-0" aria-hidden />
        <ContactSection />
      </div>

      <div ref={rightRef} className="flex flex-col gap-12 min-h-0">
        <ExperienceTimeline />
        <ProjectsSection />
      </div>
    </div>
  )
}
