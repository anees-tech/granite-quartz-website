"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroProps {
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

export function Hero({
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
}: HeroProps) {
  return (
    <section
      className={cn("relative h-screen flex items-center justify-center overflow-hidden", className)}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      {backgroundImage && <div className="absolute inset-0 bg-black/40" />}

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
        <h1 className={cn("text-4xl md:text-6xl font-bold mb-4", backgroundImage ? "text-white" : "text-foreground")}>
          {title}
        </h1>

        {subtitle && (
          <p
            className={cn(
              "text-lg md:text-xl mb-8 max-w-2xl mx-auto",
              backgroundImage ? "text-white/90" : "text-muted-foreground",
            )}
          >
            {subtitle}
          </p>
        )}

        {children}

        {showCTA && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" onClick={onPrimaryClick}>
              {ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" onClick={onSecondaryClick}>
              {ctaSecondary}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
