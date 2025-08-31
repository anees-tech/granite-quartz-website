"use client"

import { use, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ImageCarousel } from "@/components/image-carousel"
import { ReviewForm } from "@/components/review-form"
import { ReviewsList } from "@/components/reviews-list"
import { getGalleryItemById, type Review } from "@/lib/gallery";
import { ReviewSection } from "@/components/ui/review-section";

export default function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const galleryItem = await getGalleryItemById(id)
        if (galleryItem) {
          setItem(galleryItem)
        }
      } catch (error) {
        console.error("Failed to fetch gallery item:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItem()
  }, [id])

  return (
    <div className="min-h-screen pt-20">
      {loading ? (
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : !item ? (
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Gallery Item Not Found</h1>
            <p className="text-muted-foreground mb-6">The gallery item you're looking for doesn't exist or has been removed.</p>
            <Link href="/gallery">
              <Button>Back to Gallery</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
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
            images={item?.images ? Object.values(item.images).map((img: any) => img.url) : item?.mainImageUrl ? [item.mainImageUrl] : []}
            title={item?.title || "Gallery Item"}
            showThumbs={true}
            autoplay={false}
            className="animate-in fade-in slide-in-from-bottom duration-700"
          />
          <div className="absolute top-6 left-6 z-20">
            <Badge className="bg-primary text-primary-foreground shadow-lg">{item?.category || "Gallery"}</Badge>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 animate-in fade-in slide-in-from-left duration-700 delay-200">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{item?.title || "Gallery Item"}</h1>
            <p className="text-xl text-primary font-semibold mb-6">{item?.material || "Material"}</p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{item?.description || "Description not available"}</p>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700 delay-300">
            {/* Project Info */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                <div className="space-y-3">
                  {item?.client && (
                    <div>
                      <span className="text-sm text-muted-foreground">Client:</span>
                      <p className="font-medium">{item.client}</p>
                    </div>
                  )}
                  {item?.location && (
                    <div>
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <p className="font-medium">{item.location}</p>
                    </div>
                  )}
                  {item?.completedDate && (
                    <div>
                      <span className="text-sm text-muted-foreground">Completed:</span>
                      <p className="font-medium">{item.completedDate}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-muted-foreground">Created:</span>
                    <p className="font-medium">{item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            {item?.specifications && (
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(item.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-sm text-muted-foreground">{key}:</span>
                        <span className="font-medium text-sm">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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
          <ReviewSection galleryId={id} />
        </div>
      </section>
        </>
      )}
    </div>
  )
}
