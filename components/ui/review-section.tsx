"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageCircle, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react";
import { addReview, getApprovedReviews, getReviews, type Review } from "@/lib/gallery";
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
        // Always show only approved reviews to everyone
        // Users can see their own reviews (including pending) in the dashboard
        const approvedReviews = await getApprovedReviews(galleryId);
        setReviews(approvedReviews);
      } catch (error) {
        console.error("Failed to fetch review data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [galleryId, currentUser]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim() || !currentUser || rating < 1) return;

    setIsSubmitting(true);
    try {
      await addReview({
        galleryId,
        userId: currentUser.uid,
        userEmail: currentUser?.email ?? "",
        reviewText: newReview.trim(),
        rating,
        status: "pending",
      });
      setNewReview("");
      setRating(0);
      // Refresh reviews to show the new pending review
      const allReviews = await getReviews(galleryId);
      setReviews(allReviews);
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

  // Calculate average rating (only from approved reviews for public display)
  const approvedReviews = reviews.filter(r => r.status === "approved");
  const averageRating = approvedReviews.length > 0 ? (approvedReviews.reduce((sum: number, r) => sum + (r.rating || 0), 0) / approvedReviews.length) : 0;

  return (
    <div className={cn("space-y-8", className)}>
      {/* Reviews Header with Stats */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl text-primary">
              <MessageCircle className="w-8 h-8" />
              Customer Reviews
            </CardTitle>
            {reviews.length > 0 && (
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className={star <= Math.round(averageRating) ? "text-yellow-500 text-lg" : "text-gray-300 text-lg"}>★</span>
                  ))}
                </div>
                <span className="font-semibold text-primary">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({approvedReviews.length} review{approvedReviews.length !== 1 ? 's' : ''})</span>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Review Form */}
      {currentUser ? (
        <Card className="border-2 border-dashed border-primary/30 bg-white/50 backdrop-blur-sm shadow-lg hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1,2,3,4,5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={cn(
                        "text-3xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded",
                        star <= rating ? "text-yellow-500 drop-shadow-sm" : "text-gray-300 hover:text-yellow-300"
                      )}
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-3 text-sm font-medium text-muted-foreground">
                    {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Your Review</label>
                <Textarea
                  placeholder="Tell us about your experience with this project. What did you love most about the design, quality, or service?"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  rows={4}
                  className="resize-none border-primary/30 focus:border-primary/50 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting || !newReview.trim() || rating < 1}
                  className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
                >
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
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-primary">Share Your Experience</h3>
            <p className="text-muted-foreground mb-6">
              Sign in to leave a review and help others discover amazing projects
            </p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Sign In to Review
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="border-dashed border-2 border-muted-foreground/20">
            <CardContent className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-muted-foreground">No reviews yet</h3>
              <p className="text-muted-foreground">
                Be the first to share your thoughts about this project!
              </p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review, index) => (
            <Card key={review.id} className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="w-12 h-12 border-2 border-primary/20 shadow-sm">
                    <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                      {review.userEmail.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg text-foreground">{review.userEmail.split('@')[0]}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map(star => (
                              <span key={star} className={star <= review.rating ? "text-yellow-500 text-lg" : "text-gray-300 text-lg"}>★</span>
                            ))}
                            <span className="ml-2 text-sm font-medium text-muted-foreground">{review.rating}/5</span>
                          </div>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{formatDate(review.createdAt)}</span>
                          {currentUser && review.userId === currentUser.uid && review.status !== "approved" && (
                            <>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className={cn(
                                "text-xs px-2 py-1 rounded-full font-medium",
                                review.status === "pending" ? "bg-yellow-100 text-yellow-700" : 
                                review.status === "rejected" ? "bg-red-100 text-red-700" : 
                                "bg-gray-100 text-gray-700"
                              )}>
                                {review.status === "pending" ? "Pending Approval" : 
                                 review.status === "rejected" ? "Rejected" : review.status}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">
                      {review.reviewText}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
