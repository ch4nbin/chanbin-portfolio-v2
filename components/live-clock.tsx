"use client"

import { useEffect, useState } from "react"

export function LiveClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="font-mono text-sm tracking-[0.2em] text-muted-foreground tabular-nums">
      {time || "00:00:00"}
    </span>
  )
}
