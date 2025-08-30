"use client";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!user) return null;

  // Dummy reviews data
  const reviews = [
    {
      id: 1,
      galleryTitle: "Modern Kitchen Renovation",
      rating: 5,
      comment: "Absolutely love our new countertops! The team was professional and the quality is outstanding.",
      date: "2025-08-01",
    },
    {
      id: 2,
      galleryTitle: "Luxury Master Bathroom",
      rating: 4,
      comment: "Beautiful work and excellent customer service. Highly recommend!",
      date: "2025-07-15",
    },
  ];

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
        {reviews.map((review) => (
          <div key={review.id} className="border rounded p-4 bg-muted/30">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{review.galleryTitle}</span>
              <span className="text-yellow-500 font-bold">{"★".repeat(review.rating)}</span>
            </div>
            <div className="text-muted-foreground text-sm mb-1">{review.date}</div>
            <div>{review.comment}</div>
            <button className="mt-2 text-xs text-red-500 hover:underline" disabled>
              Delete (coming soon)
            </button>
          </div>
        ))}
        {reviews.length === 0 && <div className="text-muted-foreground">You haven't left any reviews yet.</div>}
      </div>
    </div>
  );
}
