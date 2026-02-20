"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type ExpandState = {
  experience: [boolean, boolean, boolean]
  projects: [boolean, boolean, boolean]
}

const defaultState: ExpandState = {
  experience: [false, false, false],
  projects: [false, false, false],
}

type ContextValue = ExpandState & {
  setExperience: (index: number, value: boolean) => void
  setProject: (index: number, value: boolean) => void
}

const RightColumnExpandContext = createContext<ContextValue | null>(null)

export function RightColumnExpandProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ExpandState>(defaultState)

  const setExperience = useCallback((index: number, value: boolean) => {
    setState((prev) => ({
      ...prev,
      experience: prev.experience.map((v, i) => (i === index ? value : v)) as [boolean, boolean, boolean],
    }))
  }, [])

  const setProject = useCallback((index: number, value: boolean) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((v, i) => (i === index ? value : v)) as [boolean, boolean, boolean],
    }))
  }, [])

  return (
    <RightColumnExpandContext.Provider
      value={{
        ...state,
        setExperience,
        setProject,
      }}
    >
      {children}
    </RightColumnExpandContext.Provider>
  )
}

export function useRightColumnExpand() {
  const ctx = useContext(RightColumnExpandContext)
  if (!ctx) throw new Error("useRightColumnExpand must be used within RightColumnExpandProvider")
  return ctx
}
