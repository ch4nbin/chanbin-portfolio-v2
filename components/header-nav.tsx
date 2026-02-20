"use client"

import { LiveClock } from "./live-clock"
import { Github, Linkedin, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function HeaderNav() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log("[v0] HeaderNav mounted, resolvedTheme:", resolvedTheme)
  }, [resolvedTheme])

  const isDark = resolvedTheme === "dark"

  return (
    <header className="px-6 py-6 lg:px-10">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <LiveClock />

        <nav className="flex items-center gap-2" aria-label="Social links">
          <a
            href="https://linkedin.com/in/chanbinp"
            className="group flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground transition-colors duration-200 hover:text-foreground hover:border-foreground/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="https://github.com/ch4nbin"
            className="group flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground transition-colors duration-200 hover:text-foreground hover:border-foreground/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <button
            onClick={() => {
              const next = isDark ? "light" : "dark"
              console.log("[v0] theme toggle clicked, resolvedTheme:", resolvedTheme, "switching to:", next)
              setTheme(next)
            }}
            className="group flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground transition-colors duration-200 hover:text-foreground hover:border-foreground/30 cursor-pointer"
            aria-label="Toggle theme"
            type="button"
          >
            {mounted && isDark ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {mounted ? (isDark ? "Light" : "Dark") : "Light"}
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
