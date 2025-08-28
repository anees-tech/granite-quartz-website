"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "stagger"
  delay?: number
  duration?: number
}

export function AnimatedSection({
  children,
  className,
  animation = "fadeIn",
  delay = 0,
  duration = 0.8,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      const elements = ref.current?.children

      if (!elements) return

      switch (animation) {
        case "fadeIn":
          gsap.fromTo(
            elements,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: "easeOut",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          )
          break

        case "slideUp":
          gsap.fromTo(
            elements,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: "easeOut",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          )
          break

        case "slideLeft":
          gsap.fromTo(
            elements,
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: "easeOut",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          )
          break

        case "slideRight":
          gsap.fromTo(
            elements,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: "easeOut",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          )
          break

        case "stagger":
          gsap.fromTo(
            elements,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: "easeOut",
              stagger: 0.2,
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          )
          break
      }
    }, ref)

    return () => ctx.revert()
  }, [animation, delay, duration])

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className={cn("", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
