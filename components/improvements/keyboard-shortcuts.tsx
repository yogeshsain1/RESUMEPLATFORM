"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K for quick search
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        // Open search modal (implement later)
        console.log("[v0] Quick search shortcut triggered")
      }

      // Cmd/Ctrl + N for new resume
      if ((event.metaKey || event.ctrlKey) && event.key === "n") {
        event.preventDefault()
        router.push("/builder")
      }

      // Cmd/Ctrl + D for dashboard
      if ((event.metaKey || event.ctrlKey) && event.key === "d") {
        event.preventDefault()
        router.push("/dashboard")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return null
}
