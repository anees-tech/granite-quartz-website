"use client"

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Thumbs, Autoplay } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"

interface ImageCarouselProps {
  images: string[]
  title: string
  showThumbs?: boolean
  autoplay?: boolean
  className?: string
}

export function ImageCarousel({
  images,
  title,
  showThumbs = true,
  autoplay = false,
  className = "",
}: ImageCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  useEffect(() => {
    // Preload images
    images.forEach((src, index) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        setLoadedImages((prev) => {
          const newSet = new Set(prev)
          newSet.add(index)
          if (newSet.size === images.length) {
            setIsLoading(false)
          }
          return newSet
        })
      }
      img.src = src
    })
  }, [images])

  if (isLoading) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-96 bg-muted animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-muted-foreground">Loading images...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs, Autoplay]}
        spaceBetween={10}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        autoplay={autoplay ? { delay: 4000, disableOnInteraction: false } : false}
        className="rounded-lg overflow-hidden"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-96 md:h-[500px]">
              <img
                src={image || "/placeholder.svg"}
                alt={`${title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110">
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110">
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      {/* Thumbnail Navigation */}
      {showThumbs && images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          className="mt-4"
          breakpoints={{
            640: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 6,
            },
            1024: {
              slidesPerView: 8,
            },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="relative w-full h-16 md:h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
