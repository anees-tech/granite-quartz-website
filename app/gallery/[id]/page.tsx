"use client"

import { use, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ImageCarousel } from "@/components/image-carousel"
import { ReviewForm } from "@/components/review-form"
import { ReviewsList } from "@/components/reviews-list"
import type { Review } from "@/lib/firebase"

// Enhanced gallery data with multiple images for carousel
const getGalleryItem = (id: string) => {
  const items = {
    "1": {
      id: 1,
      title: "Modern Kitchen Renovation",
      category: "Kitchen",
      material: "Calacatta Quartz",
      mainImage: "/modern-white-quartz-kitchen-countertop.png",
      images: [
        "/modern-white-quartz-kitchen-countertop.png",
        "/modern-granite-kitchen-countertop.png",
        "/luxury-granite-kitchen-countertop-installation.png",
        "/granite-fabrication-workshop-with-craftsman.png",
      ],
      description:
        "This stunning modern kitchen features premium Calacatta quartz countertops with dramatic veining that mimics natural marble. The waterfall edge on the island creates a sophisticated focal point, while the seamless integration with custom cabinetry showcases our precision fabrication capabilities. Every detail has been carefully crafted to create a space that's both functional and breathtakingly beautiful.",
      specifications: {
        Material: "Calacatta Quartz",
        Thickness: "3cm (1.25 inches)",
        "Edge Profile": "Waterfall & Eased",
        Finish: "Polished",
        Installation: "Undermount Sink",
        "Project Duration": "5 days",
      },
      client: "The Johnson Family",
      location: "Westfield, NJ",
      completedDate: "March 2024",
    },
    "2": {
      id: 2,
      title: "Luxury Master Bathroom",
      category: "Bathroom",
      material: "Carrara Marble",
      mainImage: "/luxury-marble-bathroom-vanity.png",
      images: [
        "/luxury-marble-bathroom-vanity.png",
        "/luxury-quartz-bathroom-vanity.png",
        "/granite-showroom-with-stone-samples.png",
      ],
      description:
        "An elegant master bathroom transformation featuring premium Carrara marble with its distinctive gray veining. The custom vanity top and matching backsplash create a cohesive, luxurious aesthetic that transforms the space into a personal spa retreat.",
      specifications: {
        Material: "Carrara Marble",
        Thickness: "2cm (0.75 inches)",
        "Edge Profile": "Bullnose",
        Finish: "Honed",
        Installation: "Undermount Sink",
        "Project Duration": "3 days",
      },
      client: "The Chen Family",
      location: "Summit, NJ",
      completedDate: "February 2024",
    },
    "3": {
      id: 3,
      title: "Commercial Office Lobby",
      category: "Commercial",
      material: "Black Galaxy Granite",
      mainImage: "/black-granite-commercial-reception-desk.png",
      images: [
        "/black-granite-commercial-reception-desk.png",
        "/commercial-granite-reception-desk.png",
        "/brown-marble-restaurant-bar-counter.png",
      ],
      description:
        "A sophisticated commercial installation featuring Black Galaxy granite with its distinctive sparkle and deep black base. The reception desk and wall cladding create an impressive first impression for visitors while maintaining durability for high-traffic use.",
      specifications: {
        Material: "Black Galaxy Granite",
        Thickness: "3cm (1.25 inches)",
        "Edge Profile": "Straight Polished",
        Finish: "Polished",
        Installation: "Commercial Grade",
        "Project Duration": "7 days",
      },
      client: "TechCorp Industries",
      location: "Newark, NJ",
      completedDate: "January 2024",
    },
  }

  return items[id as keyof typeof items] || items["1"]
}

export default function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const item = getGalleryItem(id)
  const [newReviews, setNewReviews] = useState<Review[]>([])

  const handleReviewAdded = (review: Review) => {
    setNewReviews((prev) => [review, ...prev])
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/gallery">
          <Button
            variant="outline"
            size="sm"
            className="hover:scale-105 transition-transform duration-200 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
        </Link>
      </div>

      {/* Enhanced Image Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative">
          <ImageCarousel
            images={item.images}
            title={item.title}
            showThumbs={true}
            autoplay={false}
            className="animate-in fade-in slide-in-from-bottom duration-700"
          />
          <div className="absolute top-6 left-6 z-20">
            <Badge className="bg-primary text-primary-foreground shadow-lg">{item.category}</Badge>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 animate-in fade-in slide-in-from-left duration-700 delay-200">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h1>
            <p className="text-xl text-primary font-semibold mb-6">{item.material}</p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{item.description}</p>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700 delay-300">
            {/* Project Info */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Client:</span>
                    <p className="font-medium">{item.client}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <p className="font-medium">{item.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Completed:</span>
                    <p className="font-medium">{item.completedDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(item.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-sm text-muted-foreground">{key}:</span>
                      <span className="font-medium text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-primary text-primary-foreground hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Love This Design?</h3>
                <p className="mb-4 opacity-90">Get a free quote for your project</p>
                <Link href="/contact">
                  <Button variant="secondary" className="w-full hover:scale-105 transition-transform duration-200">
                    Get Free Quote
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-8 animate-in fade-in slide-in-from-bottom duration-500">
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reviews List */}
            <div className="lg:col-span-2">
              <ReviewsList galleryId={id} newReviews={newReviews} />
            </div>

            {/* Review Form */}
            <div>
              <ReviewForm galleryId={id} onReviewAdded={handleReviewAdded} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
