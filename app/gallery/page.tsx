"use client"

import { Button } from "@/components/ui/button"

import Link from "next/link"

import { Hero } from "@/components/hero"
import { Badge } from "@/components/ui/badge"
import { GalleryGrid } from "@/components/gallery-grid"

export default function GalleryPage() {
  const galleryItems = [
    {
      id: 1,
      title: "Modern Kitchen Renovation",
      category: "Kitchen",
      material: "Calacatta Quartz",
      image: "/modern-white-quartz-kitchen-countertop.png",
      description: "Stunning white quartz countertops with waterfall edge and seamless integration",
    },
    {
      id: 2,
      title: "Luxury Master Bathroom",
      category: "Bathroom",
      material: "Carrara Marble",
      image: "/luxury-marble-bathroom-vanity.png",
      description: "Elegant marble vanity with custom backsplash and precision-cut edges",
    },
    {
      id: 3,
      title: "Commercial Office Lobby",
      category: "Commercial",
      material: "Black Galaxy Granite",
      image: "/black-granite-commercial-reception-desk.png",
      description: "Sophisticated granite reception desk with dramatic veining and polished finish",
    },
    {
      id: 4,
      title: "Outdoor Kitchen Paradise",
      category: "Outdoor",
      material: "Steel Grey Granite",
      image: "/outdoor-granite-kitchen-countertop.png",
      description: "Weather-resistant granite perfect for outdoor entertaining and cooking",
    },
    {
      id: 5,
      title: "Contemporary Fireplace",
      category: "Living",
      material: "Absolute Black Granite",
      image: "/black-granite-fireplace-surround.png",
      description: "Sleek granite fireplace surround creating a stunning focal point",
    },
    {
      id: 6,
      title: "Restaurant Bar Top",
      category: "Commercial",
      material: "Emperador Brown Marble",
      image: "/brown-marble-restaurant-bar-counter.png",
      description: "Rich marble bar top with live edge detail and premium finish",
    },
    {
      id: 7,
      title: "Executive Office Desk",
      category: "Commercial",
      material: "White Ice Granite",
      image: "/modern-granite-kitchen-countertop.png",
      description: "Premium granite desk surface with integrated cable management",
    },
    {
      id: 8,
      title: "Spa Bathroom Retreat",
      category: "Bathroom",
      material: "Travertine",
      image: "/luxury-quartz-bathroom-vanity.png",
      description: "Luxurious travertine surfaces creating a serene spa-like atmosphere",
    },
    {
      id: 9,
      title: "Gourmet Kitchen Island",
      category: "Kitchen",
      material: "Nero Marquina Marble",
      image: "/commercial-granite-reception-desk.png",
      description: "Dramatic black marble island with gold veining and waterfall edges",
    },
  ]

  const categories = ["All", "Kitchen", "Bathroom", "Commercial", "Outdoor", "Living"]

  return (
    <div className="min-h-screen">
      {/* Hero Section with enhanced animations */}
      <Hero
        title="Our Gallery"
        subtitle="Explore our portfolio of stunning granite and quartz installations"
        backgroundImage="/granite-showroom-with-stone-samples.png"
        className="h-[60vh]"
      />

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 animate-in fade-in slide-in-from-top duration-500">
              Our Work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-in fade-in slide-in-from-top duration-500 delay-100">
              Featured Projects
            </h2>
          </div>

          <GalleryGrid items={galleryItems} categories={categories} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Inspired by Our Work?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Let's create something beautiful for your space. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="hover:scale-105 transition-transform duration-200">
                Get Free Quote
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="hover:scale-105 transition-transform duration-200 bg-transparent"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
