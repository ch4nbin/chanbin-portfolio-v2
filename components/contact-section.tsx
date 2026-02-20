"use client"

import { Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
        Get in Touch
      </h2>

      <a
        href="mailto:cp5721@princeton.edu"
        className="group rounded-lg border border-border p-5 flex items-center gap-4 transition-colors duration-200 hover:border-foreground/30 hover:bg-foreground/[0.03]"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-foreground/30 shrink-0">
          <Mail className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium text-foreground">cp5721@princeton.edu</p>
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/70 uppercase">
            Open to opportunities
          </p>
        </div>
      </a>
    </section>
  )
}
