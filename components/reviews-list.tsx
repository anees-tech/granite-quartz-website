"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MessageCircle } from "lucide-react"
import { getReviews, type Review } from "@/lib/firebase"
import { cn } from "@/lib/utils"

interface ReviewsListProps {
  galleryId: string
  newReviews: Review[]
}

export function ReviewsList({ galleryId, newReviews }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews(galleryId)
        setReviews(fetchedReviews)
      } catch (error) {
        console.error("Failed to fetch reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [galleryId])

  // Combine fetched reviews with new reviews
  const allReviews = [...newReviews, ...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  const averageRating =
    allReviews.length > 0 ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length : 0

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-8 bg-muted animate-pulse rounded"></div>
          <div className="w-32 h-4 bg-muted animate-pulse rounded"></div>
        </div>
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-muted animate-pulse rounded"></div>
                  <div className="w-20 h-3 bg-muted animate-pulse rounded"></div>
                </div>
                <div className="w-16 h-3 bg-muted animate-pulse rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-3 bg-muted animate-pulse rounded"></div>
                <div className="w-3/4 h-3 bg-muted animate-pulse rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-top duration-500">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-5 h-5",
                  i < Math.round(averageRating) ? "text-primary fill-current" : "text-muted-foreground",
                )}
              />
            ))}
          </div>
          <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          {allReviews.length} Review{allReviews.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Reviews List */}
      {allReviews.length === 0 ? (
        <Card className="animate-in fade-in slide-in-from-bottom duration-500">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
            <p className="text-muted-foreground">Be the first to share your experience with this project!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {allReviews.map((review, index) => (
            <Card
              key={review.id}
              className={cn(
                "hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom",
                `delay-${Math.min(index * 100, 500)}`,
              )}
              style={{
                animationDelay: `${Math.min(index * 100, 500)}ms`,
                animationFillMode: "forwards",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{review.userName}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < review.rating ? "text-primary fill-current" : "text-muted-foreground",
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {review.rating} star{review.rating !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{formatDate(new Date(review.createdAt))}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
