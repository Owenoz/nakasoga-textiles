"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

// Sample reviews - in production, these would come from a database
const sampleReviews: Review[] = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    date: "2026-04-15",
    comment: "Beautiful fabric! The colors are even more vibrant in person. Great quality and fast delivery.",
    helpful: 12,
  },
  {
    id: "2",
    author: "John K.",
    rating: 4,
    date: "2026-04-10",
    comment: "Very nice Ankara print. Good quality material. Would recommend for traditional wear.",
    helpful: 8,
  },
  {
    id: "3",
    author: "Grace N.",
    rating: 5,
    date: "2026-04-05",
    comment: "Excellent service! The staff at City Mall were very helpful. Love my purchase!",
    helpful: 15,
  },
];

interface ProductReviewsProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

export default function ProductReviews({ productId, averageRating, totalReviews }: ProductReviewsProps) {
  const [reviews] = useState<Review[]>(sampleReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    name: "",
    comment: "",
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to your backend
    console.log("New review:", newReview);
    alert("Thank you for your review! It will be published after moderation.");
    setShowReviewForm(false);
    setNewReview({ rating: 5, name: "", comment: "" });
  };

  return (
    <div className="mt-16 border-t pt-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Customer Reviews</h2>
        
        {/* Rating Summary */}
        <div className="flex items-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-forest-700">{averageRating}</div>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(averageRating)
                      ? "fill-gold-500 text-gold-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Based on {totalReviews} reviews
            </div>
          </div>

          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            variant="outline"
            className="border-forest-600 text-forest-600 hover:bg-forest-50"
          >
            Write a Review
          </Button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-earth-50 rounded-lg p-6 mb-8 animate-fade-in">
            <h3 className="font-semibold mb-4">Write Your Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= newReview.rating
                            ? "fill-gold-500 text-gold-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md min-h-[100px]"
                  placeholder="Share your experience with this product..."
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-forest-600 hover:bg-forest-700">
                  Submit Review
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.author}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-gold-500 text-gold-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-3">{review.comment}</p>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-forest-600">
              <ThumbsUp className="h-4 w-4" />
              Helpful ({review.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
