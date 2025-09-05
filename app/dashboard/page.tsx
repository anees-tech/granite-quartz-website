"use client";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserReviews, getGalleryItemById, type Review, deleteReview, updateReview } from "@/lib/gallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  LogOut, 
  Star, 
  MessageSquare, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";


export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [galleryTitles, setGalleryTitles] = useState<Record<string, string>>({});
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    setReviewsLoading(true);
    getUserReviews(user.uid).then(async (userReviews) => {
      setReviews(userReviews);
      // Fetch gallery titles for each review
      const titles: Record<string, string> = {};
      await Promise.all(
        userReviews.map(async (review) => {
          if (!titles[review.galleryId]) {
            const gallery = await getGalleryItemById(review.galleryId);
            titles[review.galleryId] = gallery?.title || "Unknown Gallery";
          }
        })
      );
      setGalleryTitles(titles);
      setReviewsLoading(false);
    });
  }, [user]);

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    await deleteReview(reviewId);
    setReviews(reviews => reviews.filter(r => r.id !== reviewId));
  };

  const startEdit = (review: Review) => {
    setEditingReviewId(review.id);
    setEditText(review.reviewText);
    setEditRating(review.rating);
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
    setEditText("");
    setEditRating(0);
  };

  const handleUpdate = async (reviewId: string) => {
    await updateReview(reviewId, { reviewText: editText, rating: editRating });
    setReviews(reviews =>
      reviews.map(r =>
        r.id === reviewId
          ? { ...r, reviewText: editText, rating: editRating, status: "pending" }
          : r
      )
    );
    cancelEdit();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!user) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="mb-8">
          <Card className="border-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      Welcome back, {user.displayName || 'User'}!
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-blue-900 mb-1">{reviews.length}</div>
              <div className="text-sm text-blue-600">Total Reviews</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-green-900 mb-1">
                {reviews.filter(r => r.status === 'approved').length}
              </div>
              <div className="text-sm text-green-600">Approved</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/10 text-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-yellow-900 mb-1">
                {reviews.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-yellow-600">Pending</div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Your Reviews
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Manage and edit your project reviews
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {reviewsLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start by visiting our gallery and leaving your first review!
                </p>
                <Button onClick={() => router.push('/gallery')} className="bg-primary hover:bg-primary/90">
                  Visit Gallery
                </Button>
              </div>
            ) : (
              reviews.map((review, index) => (
                <div key={review.id}>
                  <Card className="border border-border/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">
                            {galleryTitles[review.galleryId] || "Unknown Gallery"}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(review.status)}
                              <Badge variant="outline" className={getStatusColor(review.status)}>
                                {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= (editingReviewId === review.id ? editRating : review.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm font-medium">
                              {editingReviewId === review.id ? editRating : review.rating} / 5
                            </span>
                          </div>
                        </div>
                      </div>

                      {editingReviewId === review.id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Review Text</label>
                            <Textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              placeholder="Share your experience..."
                              className="min-h-[100px]"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium mb-2 block">Rating</label>
                            <div className="flex items-center gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  className={`p-1 rounded transition-colors ${
                                    star <= editRating
                                      ? "text-yellow-400 hover:text-yellow-500"
                                      : "text-gray-300 hover:text-gray-400"
                                  }`}
                                  onClick={() => setEditRating(star)}
                                  aria-label={`Set rating to ${star}`}
                                >
                                  <Star className="w-6 h-6 fill-current" />
                                </button>
                              ))}
                              <span className="ml-2 text-sm text-muted-foreground">
                                {editRating} / 5
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={() => handleUpdate(review.id)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </Button>
                            <Button
                              onClick={cancelEdit}
                              variant="outline"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-foreground mb-4 leading-relaxed">
                            {review.reviewText}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => startEdit(review)}
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDelete(review.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  {index < reviews.length - 1 && <Separator className="my-6" />}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
