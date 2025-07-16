import React, { useEffect, useState } from 'react';
import { Check, Star, MapPin, RotateCcw, Sparkles } from 'lucide-react';

interface ThankYouPageProps {
  name: string;
  rating: number;
  onSubmitAnother: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ 
  name, 
  rating, 
  onSubmitAnother 
}) => {
  const [showContent, setShowContent] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Staggered animations
    const timer1 = setTimeout(() => setShowContent(true), 300);
    const timer2 = setTimeout(() => setShowStars(true), 800);
    const timer3 = setTimeout(() => setShowButtons(true), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleGoogleReview = () => {
    const placeId = import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID;
    const reviewUrl = placeId 
      ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
      : `https://www.google.com/maps/search/N2H+ENTERPRISES`;
    window.open(reviewUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Main card */}
        <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-1000 ${
          showContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}>
          
          {/* Success icon with animation */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto relative">
              <Check className="w-10 h-10 text-white animate-bounce" />
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
              <div className="absolute inset-2 rounded-full bg-green-300 animate-pulse opacity-30"></div>
            </div>
            
            {/* Floating sparkles */}
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-2 w-4 h-4 text-blue-400 animate-pulse animation-delay-1000" />
          </div>

          {/* Thank you message */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Thank You{name ? `, ${name}` : ''}!
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Your review has been submitted successfully. We truly appreciate your valuable feedback!
          </p>

          {/* Rating display with animation */}
          {rating > 0 && (
            <div className={`mb-6 transform transition-all duration-800 delay-300 ${
              showStars ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <p className="text-sm text-gray-500 mb-2">Your Rating:</p>
              <div className="flex justify-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 transition-all duration-300 ${
                      star <= rating 
                        ? 'text-yellow-400 fill-current transform scale-110' 
                        : 'text-gray-300'
                    }`}
                    style={{ animationDelay: `${star * 100}ms` }}
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-700">
                {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good!' : rating === 3 ? 'Good!' : rating === 2 ? 'Fair' : 'Thank you for your feedback'}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className={`space-y-4 transform transition-all duration-800 delay-500 ${
            showButtons ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            
            {/* Google Review button */}
            <button
              onClick={handleGoogleReview}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 group"
            >
              <MapPin className="w-5 h-5 group-hover:animate-bounce" />
              <span>Leave a Google Review</span>
            </button>

            {/* Submit another review button */}
            <button
              onClick={onSubmitAnother}
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group border border-gray-300"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Submit Another Review</span>
            </button>
          </div>

          {/* Company branding */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                N2H ENTERPRISES
              </h3>
              <p className="text-xs text-gray-500">
                Thank you for choosing our products!
              </p>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -z-10 top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute -z-10 top-20 right-10 w-3 h-3 bg-purple-400 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute -z-10 bottom-10 left-20 w-5 h-5 bg-green-400 rounded-full animate-float animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default ThankYouPage;