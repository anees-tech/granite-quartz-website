"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, Send, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { addReview, getCurrentUser, type Review } from "@/lib/firebase"
import Link from "next/link"

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment must be less than 500 characters"),
})

type ReviewFormData = z.infer<typeof reviewSchema>

interface ReviewFormProps {
  galleryId: string
  onReviewAdded: (review: Review) => void
}

export function ReviewForm({ galleryId, onReviewAdded }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser()
      setCurrentUser(user)
      setLoading(false)
    }
    fetchUser()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  })

    const onSubmit = async (data: ReviewFormData) => {
    if (!currentUser) return

    setIsSubmitting(true)
    try {
      const review = await addReview({
        userId: currentUser.uid,
        userName: currentUser.displayName || "Anonymous",
        galleryId,
        rating: data.rating,
        comment: data.comment,
      })

      onReviewAdded(review)
      reset()
      setSelectedRating(0)
    } catch (error) {
      console.error("Failed to submit review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating)
    setValue("rating", rating)
  }

  if (loading) {
    return (
      <Card className="animate-in fade-in slide-in-from-bottom duration-500">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    )
  }

  if (!currentUser) {
    return (
      <Card className="animate-in fade-in slide-in-from-bottom duration-500">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Sign In to Leave a Review</h3>
          <p className="text-muted-foreground mb-6">
            Share your experience with this project by signing in to your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/login">
              <Button>Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline">Create Account</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-in fade-in slide-in-from-bottom duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Leave a Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Rating Selection */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={cn(
                    "w-8 h-8 transition-all duration-200 hover:scale-110",
                    star <= (hoverRating || selectedRating) ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {selectedRating > 0 && (
                  <>
                    {selectedRating} star{selectedRating !== 1 ? "s" : ""}
                  </>
                )}
              </span>
            </div>
            {errors.rating && <p className="text-sm text-destructive">{errors.rating.message}</p>}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this project..."
              rows={4}
              {...register("comment")}
              className="resize-none"
            />
            {errors.comment && <p className="text-sm text-destructive">{errors.comment.message}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
