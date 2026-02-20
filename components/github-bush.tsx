"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import useSWR from "swr"

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""]

const LEVELS = [
  "bg-muted",
  "bg-orange-900/50",
  "bg-orange-700/50",
  "bg-orange-500/50",
  "bg-orange-400/60",
]

interface ContributionDay {
  date: string
  level: number
  count: number
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function groupIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  if (days.length === 0) return []

  const start = new Date(days[0].date)
  const startDay = start.getDay()
  start.setDate(start.getDate() - startDay)

  const dayMap = new Map(days.map((d) => [d.date, d]))

  const weeks: ContributionDay[][] = []
  const current = new Date(start)
  const end = new Date(days[days.length - 1].date)
  end.setDate(end.getDate() + (6 - end.getDay()))

  let week: ContributionDay[] = []

  while (current <= end) {
    const key = current.toISOString().split("T")[0]
    const entry = dayMap.get(key)
    week.push({
      date: key,
      level: entry?.level ?? 0,
      count: entry?.count ?? 0,
    })
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
    current.setDate(current.getDate() + 1)
  }
  if (week.length > 0) weeks.push(week)

  return weeks
}

function getMonthLabels(weeks: ContributionDay[][]): { label: string; col: number }[] {
  const months: { label: string; col: number }[] = []
  let lastMonth = -1

  for (let w = 0; w < weeks.length; w++) {
    if (weeks[w].length === 0) continue
    const d = new Date(weeks[w][0].date)
    const m = d.getMonth()
    if (m !== lastMonth) {
      months.push({
        label: d.toLocaleString("en-US", { month: "short" }),
        col: w,
      })
      lastMonth = m
    }
  }
  return months
}

export function GithubBush() {
  const { data, isLoading } = useSWR<{ contributions: ContributionDay[]; total: number }>(
    "/api/github",
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 * 30 }
  )

  const [hoveredCell, setHoveredCell] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cellSize, setCellSize] = useState(11)
  const gap = 3

  const weeks = useMemo(() => {
    if (!data?.contributions?.length) return []
    return groupIntoWeeks(data.contributions)
  }, [data])

  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks])
  const totalContributions = data?.total ?? 0

  // Calculate cell size to fill available width
  useEffect(() => {
    if (!containerRef.current || weeks.length === 0) return

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width
      const labelWidth = 28 // day labels column
      const padding = 40 // container padding
      const available = width - labelWidth - padding
      const numWeeks = weeks.length
      const size = Math.floor((available - gap * (numWeeks - 1)) / numWeeks)
      setCellSize(Math.max(8, Math.min(size, 16)))
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [weeks])

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
          Contributions
        </h2>
        {!isLoading && (
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
            {totalContributions} in the last 6 months
          </span>
        )}
      </div>

      <div ref={containerRef} className="rounded-lg border border-border p-4 overflow-hidden flex justify-center">
        {isLoading ? (
          <div className="h-[120px] flex items-center justify-center">
            <span className="font-mono text-xs text-muted-foreground animate-pulse">
              Loading contributions...
            </span>
          </div>
        ) : weeks.length === 0 ? (
          <div className="h-[120px] flex items-center justify-center">
            <span className="font-mono text-xs text-muted-foreground">
              No contribution data available
            </span>
          </div>
        ) : (
          <div className="inline-flex flex-col">
            {/* Month labels row */}
            <div className="flex mb-2" style={{ paddingLeft: 28 + gap }}>
              {weeks.map((_, wi) => {
                const label = monthLabels.find((m) => m.col === wi)
                return (
                  <div
                    key={wi}
                    style={{ width: cellSize, marginRight: gap }}
                    className="shrink-0"
                  >
                    {label && (
                      <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                        {label.label}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex" style={{ gap }}>
              {/* Day labels */}
              <div className="flex flex-col shrink-0" style={{ gap, width: 28 }}>
                {DAY_LABELS.map((label, i) => (
                  <div key={i} className="flex items-center justify-end pr-1" style={{ height: cellSize }}>
                    <span className="font-mono text-[9px] text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Grid */}
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={`rounded-[2px] ${LEVELS[day.level]} transition-all duration-150 hover:ring-1 hover:ring-foreground/20 hover:brightness-125 cursor-default`}
                      style={{ width: cellSize, height: cellSize }}
                      onMouseEnter={() => setHoveredCell(day.date)}
                      onMouseLeave={() => setHoveredCell(null)}
                      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
