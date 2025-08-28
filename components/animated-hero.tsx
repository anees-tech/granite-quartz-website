"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  children?: React.ReactNode
  className?: string
  showCTA?: boolean
  ctaPrimary?: string
  ctaSecondary?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export function AnimatedHero({
  title,
  subtitle,
  backgroundImage,
  children,
  className,
  showCTA = false,
  ctaPrimary = "Get Started",
  ctaSecondary = "Learn More",
  onPrimaryClick,
  onSecondaryClick,
}: AnimatedHeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero content on load
      gsap.fromTo(
        ".hero-title",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "easeOut",
          delay: 0.2,
        },
      )

      gsap.fromTo(
        ".hero-subtitle",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "easeOut",
          delay: 0.5,
        },
      )

      gsap.fromTo(
        ".hero-cta",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "easeOut",
          delay: 0.8,
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.section
      ref={containerRef}
      className={cn("relative h-screen flex items-center justify-center overflow-hidden pt-20", className)}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Parallax Background */}
      {backgroundImage && <motion.div className="absolute inset-0 bg-black/40" style={{ y }} />}

      {/* Animated Content */}
      <motion.div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4" style={{ opacity }}>
        <h1
          className={cn(
            "hero-title text-4xl md:text-6xl font-bold mb-4",
            backgroundImage ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={cn(
              "hero-subtitle text-lg md:text-xl mb-8 max-w-2xl mx-auto",
              backgroundImage ? "text-white/90" : "text-muted-foreground",
            )}
          >
            {subtitle}
          </p>
        )}

        {children}

        {showCTA && (
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              onClick={onPrimaryClick}
              className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              {ctaPrimary}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onSecondaryClick}
              className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg bg-transparent"
            >
              {ctaSecondary}
            </Button>
          </div>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
