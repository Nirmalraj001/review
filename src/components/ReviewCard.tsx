import React from 'react';
import { User, ThumbsUp, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Review } from '../types/review';
import { formatMobileForDisplay, formatTimestamp } from '../utils/validation';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: Review;
  variant?: 'default' | 'compact';
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, variant = 'default' }) => {
  const isCompact = variant === 'compact';

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
      isCompact ? 'p-4' : 'p-6'
    }`}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center ${
            isCompact ? 'w-10 h-10' : 'w-12 h-12'
          }`}>
            <User className={`text-white ${isCompact ? 'h-5 w-5' : 'h-6 w-6'}`} />
          </div>
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className={`font-bold text-gray-900 ${isCompact ? 'text-base' : 'text-lg'}`}>
                {review.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={review.rating || 5} onRatingChange={() => {}} readonly size="sm" />
                <span className="text-sm text-gray-500">•</span>
                <p className="text-sm text-gray-500">
                  {formatTimestamp(review.timestamp)}
                </p>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          <p className={`text-gray-700 leading-relaxed mb-4 ${isCompact ? 'text-sm' : ''}`}>
            {review.message}
          </p>

          {/* Contact Info */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              📱 {formatMobileForDisplay(review.mobile)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors group">
              <ThumbsUp className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Helpful</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors group">
              <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;