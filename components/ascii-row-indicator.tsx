"use client"

const ROW_LINE = "│"
const NODE = "●"
const BRANCH_OPEN = "├──"
const BRANCH_LINE = "│  "
const BRANCH_END = "└──"

export function AsciiSegment({ expanded }: { expanded: boolean }) {
  return (
    <div className="w-8 shrink-0 pt-5 pb-1 flex flex-col items-center font-mono text-[10px] leading-tight text-muted-foreground/50 select-none border-r border-border/50 pr-2 mr-2">
      <span className="text-muted-foreground/40">{ROW_LINE}</span>
      <span className={expanded ? "text-orange-400/90" : "text-muted-foreground/60"}>{NODE}</span>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <span className="block text-orange-400/60">{BRANCH_OPEN}</span>
          <span className="block text-muted-foreground/30">{BRANCH_LINE}</span>
          <span className="block text-muted-foreground/30">{BRANCH_LINE}</span>
          <span className="block text-muted-foreground/40">{BRANCH_END}</span>
        </div>
      </div>
    </div>
  )
}
