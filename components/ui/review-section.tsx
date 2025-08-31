"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageCircle, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react";
import { addReview, getPendingReviews, type Review } from "@/lib/gallery";
import { useAuthContext } from "@/components/auth-provider";
import { cn } from "@/lib/utils";

interface ReviewSectionProps {
  galleryId: string;
  className?: string;
}

export function ReviewSection({ galleryId, className }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const { user: currentUser, loading: authLoading } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedReviews = await getPendingReviews(galleryId);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Failed to fetch review data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [galleryId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim() || !currentUser || rating < 1) return;

    setIsSubmitting(true);
    const approvedReviews = reviews.filter(r => r.status === "approved");
    const averageRating = approvedReviews.length > 0 ? (approvedReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / approvedReviews.length) : 0;
    try {
      const review = await addReview({
        galleryId,
        userId: currentUser.uid,
        userEmail: currentUser?.email ?? "",
        reviewText: newReview.trim(),
        rating,
        status: "pending",
      });
      setReviews(prev => [review, ...prev]);
      setNewReview("");
      setRating(0);
    } catch (error) {
      console.error("Failed to add review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Pending Review";
    }
  };

  if (loading || authLoading) {
    return (
      <Card className={cn("animate-in fade-in slide-in-from-bottom duration-500", className)}>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading reviews...</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate average rating (for approved reviews)
  const approvedReviews = reviews.filter(r => r.status === "approved");
  const averageRating = approvedReviews.length > 0 ? (approvedReviews.reduce((sum: number, r) => sum + (r.rating || 0), 0) / approvedReviews.length) : 0;

  return (
    <Card className={cn("animate-in fade-in slide-in-from-bottom duration-500 border-2 border-primary/30 shadow-xl bg-white/90", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <MessageCircle className="w-7 h-7 text-primary" />
          Customer Reviews ({reviews.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Review Form */}
        {currentUser ? (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              {[1,2,3,4,5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={star <= rating ? "text-yellow-400 text-2xl" : "text-gray-300 text-2xl"}
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
              <span className="ml-3 text-lg text-muted-foreground">{rating > 0 ? `${rating} / 5` : "Select rating"}</span>
            </div>
            <Textarea
              placeholder="Share your experience with this project..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows={4}
              className="resize-none text-lg p-4 min-h-[80px]"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting || !newReview.trim() || rating < 1}
                size="lg"
                className="px-8 py-2 text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Review
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center p-6 bg-muted/30 rounded-lg">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-lg text-muted-foreground mb-3">
              Sign in to leave a review
            </p>
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                No reviews yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="flex gap-5 p-6 bg-muted/20 rounded-xl items-start">
                <Avatar className="w-12 h-12 text-xl">
                  <AvatarFallback className="text-lg">
                    {review.userEmail.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-lg">{review.userEmail}</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(review.status)}
                      <span className="text-base text-muted-foreground">
                        {getStatusText(review.status)}
                      </span>
                    </div>
                    <span className="text-base text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <span key={star} className={star <= review.rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}>★</span>
                    ))}
                    <span className="text-base text-muted-foreground ml-2">{review.rating} / 5</span>
                  </div>
                  <p className="text-lg text-foreground break-words leading-relaxed">
                    {review.reviewText}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
