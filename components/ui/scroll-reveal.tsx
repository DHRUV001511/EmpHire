"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
}

export function ScrollReveal({ children, direction = "up", delay = 0, className = "" }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxSection({
  children,
  offset = 50,
}: {
  children: React.ReactNode
  offset?: number
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, offset])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

export function FloatingCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="transition-shadow hover:shadow-2xl"
    >
      {children}
    </motion.div>
  )
}
