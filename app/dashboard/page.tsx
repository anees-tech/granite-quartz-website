"use client";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserReviews, getGalleryItemById, type Review, deleteReview, updateReview } from "@/lib/gallery";


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

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.displayName || user.email}!</h1>
      <button
        onClick={logout}
        className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition mb-8"
      >
        Logout
      </button>
      <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>
      <div className="space-y-4">
        {reviewsLoading ? (
          <div className="text-center text-muted-foreground">Loading your reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-muted-foreground">You haven't left any reviews yet.</div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border rounded p-4 bg-muted/30">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{galleryTitles[review.galleryId] || "Unknown Gallery"}</span>
                <span className="text-yellow-500 font-bold">{"★".repeat(review.rating)}</span>
              </div>
              <div className="text-muted-foreground text-sm mb-1">
                {new Date(review.createdAt).toLocaleDateString()} &middot; <span className="capitalize">{review.status}</span>
              </div>
              {editingReviewId === review.id ? (
                <>
                  <textarea
                    className="w-full border rounded p-2 mb-2"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        type="button"
                        className={star <= editRating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}
                        onClick={() => setEditRating(star)}
                        aria-label={`Set rating to ${star}`}
                      >★</button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">{editRating} / 5</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-1 bg-primary text-white rounded hover:bg-primary/80"
                      onClick={() => handleUpdate(review.id)}
                    >Save</button>
                    <button
                      className="px-4 py-1 bg-muted text-foreground rounded border"
                      onClick={cancelEdit}
                    >Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div>{review.reviewText}</div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => startEdit(review)}
                    >Edit</button>
                    <button
                      className="text-xs text-red-500 hover:underline"
                      onClick={() => handleDelete(review.id)}
                    >Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
