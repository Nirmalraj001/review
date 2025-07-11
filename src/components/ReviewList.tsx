import React from 'react';
import { MessageSquare, Star, TrendingUp, Users } from 'lucide-react';
import { Review } from '../types/review';
import ReviewCard from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
  isLoading: boolean;
  variant?: 'default' | 'compact';
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, isLoading, variant = 'default' }) => {
  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Customer Reviews
          </h2>
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="h-10 w-10 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Reviews Yet</h2>
        <p className="text-gray-600 text-lg">Be the first to share your experience!</p>
      </div>
    );
  }

  const averageRating = reviews.reduce((sum, review) => sum + (review.rating || 5), 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => (review.rating || 5) === rating).length
  );

  return (
    <div className="space-y-8">
      {/* Statistics Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Review Analytics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Average Rating */}
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < Math.round(averageRating) ? 'text-amber-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>

          {/* Total Reviews */}
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {reviews.length}
            </div>
            <div className="flex justify-center mb-2">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600">Total Reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-3">{rating}</span>
                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${reviews.length > 0 ? (ratingDistribution[index] / reviews.length) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-6">{ratingDistribution[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Customer Reviews ({reviews.length})
          </h2>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} variant={variant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;