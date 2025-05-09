import type React from "react"
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`container mx-auto ${className}`}>{children}</div>
}
