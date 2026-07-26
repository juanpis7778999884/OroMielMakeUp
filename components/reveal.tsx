"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { ease } from "@/lib/animation"

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
