import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-sm border border-border/50 bg-transparent px-3 py-2.5 text-[0.85rem] font-light transition-all duration-300 outline-none placeholder:text-muted-foreground/50 focus-visible:border-foreground/30 focus-visible:shadow-[0_0_0_3px_oklch(0.55_0.07_65/0.06)] disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
