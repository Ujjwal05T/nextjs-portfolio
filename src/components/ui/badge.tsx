import * as React from "react"
import { cn } from "@/lib/utils"

// export interface BadgeProps
//   extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-700/50 px-2.5 py-0.5 text-xs font-semibold transition-colors",
        className
      )}
      {...props}
    />
  )
}

export { Badge }