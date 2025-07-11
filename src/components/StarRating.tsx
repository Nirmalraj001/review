import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  onRatingChange, 
  size = 'md', 
  readonly = false 
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10'
  };

  const handleStarClick = (starRating: number) => {
    if (!readonly) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating: number) => {
    if (!readonly) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center gap-1" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoverRating || rating);
        const isHovered = hoverRating > 0 && star <= hoverRating;
        
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            disabled={readonly}
            className={`transition-all duration-200 ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-125 active:scale-110'
            } ${size === 'lg' ? 'p-1' : ''}`}
          >
            <Star
              className={`${sizeClasses[size]} transition-all duration-200 ${
                isActive
                  ? isHovered
                    ? 'text-yellow-400 fill-yellow-400 drop-shadow-lg'
                    : 'text-amber-400 fill-amber-400'
                  : readonly
                    ? 'text-gray-300'
                    : 'text-gray-300 hover:text-amber-200'
              } ${size === 'lg' && !readonly ? 'hover:drop-shadow-lg' : ''}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;