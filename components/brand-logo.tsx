import Image from "next/image"
import { cn } from "@/lib/utils"

export function BrandLogo({
  className,
  showText = true,
  size = 40,
}: {
  className?: string
  showText?: boolean
  size?: number
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/images/oromiel-logo.png"
        alt="Oromiel Makeup"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[1.35rem] font-semibold tracking-[0.22em] text-foreground sm:text-xl">
            OROMIEL
          </span>
          <span className="mt-px text-[0.6rem] font-light uppercase tracking-[0.35em] text-muted-foreground">
            Maquillaje &amp; Piel
          </span>
        </span>
      )}
    </span>
  )
}

/** Just the logo mark, no wordmark. */
export function BrandMark({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/images/oromiel-logo.png"
      alt="Oromiel Makeup"
      width={size}
      height={size}
      className={cn("object-contain", className)}
    />
  )
}
