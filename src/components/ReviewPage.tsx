import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';
import { Review, ReviewFormData } from '../types/review';
import { sendReviewEmail, initializeEmailJS } from '../services/emailService';
import { saveReviewToSheet, getReviewsFromSheet } from '../services/sheetsService';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import ReviewListPage from './ReviewListPage';

const ReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  useEffect(() => {
    initializeEmailJS();
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setIsLoadingReviews(true);
      const fetchedReviews = await getReviewsFromSheet();
      const sortedReviews = fetchedReviews.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setReviews(sortedReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
      showNotification('warning', 'Unable to load existing reviews. You can still submit new ones.');
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (formData: ReviewFormData & { rating: number }) => {
    setIsSubmitting(true);
    
    try {
      const review: Review = {
        id: Date.now().toString(),
        name: formData.name,
        mobile: formData.mobile,
        message: formData.message,
        timestamp: new Date().toISOString(),
        rating: formData.rating
      };

      const [emailResult, sheetResult] = await Promise.allSettled([
        sendReviewEmail({
          name: review.name,
          mobile: review.mobile,
          message: review.message,
          timestamp: review.timestamp
        }),
        saveReviewToSheet(review)
      ]);

      const emailSuccess = emailResult.status === 'fulfilled';
      const sheetSuccess = sheetResult.status === 'fulfilled';

      if (emailSuccess && sheetSuccess) {
        setReviews(prev => [review, ...prev]);
        showNotification('success', 'Thank you! Your review has been submitted successfully.');
      } else if (emailSuccess || sheetSuccess) {
        if (sheetSuccess) {
          setReviews(prev => [review, ...prev]);
        }
        showNotification('warning', 'Your review was partially submitted. Our team will follow up.');
      } else {
        showNotification('error', 'Failed to submit your review. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showNotification('error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const NotificationComponent = () => {
    if (!notification) return null;

    const icons = {
      success: <CheckCircle className="h-5 w-5" />,
      error: <XCircle className="h-5 w-5" />,
      warning: <AlertTriangle className="h-5 w-5" />
    };

    const colors = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    };

    return (
      <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-xl border ${colors[notification.type]} shadow-xl backdrop-blur-lg`}>
        <div className="flex items-center gap-2">
          {icons[notification.type]}
          <p className="font-medium">{notification.message}</p>
          <button
            onClick={() => setNotification(null)}
            className="ml-auto text-gray-500 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
        </div>
      </div>
    );
  };

  if (showAllReviews) {
    return <ReviewListPage onBack={() => setShowAllReviews(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Customer Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your feedback helps us improve our service and create better experiences for everyone
          </p>
        </div>

        {/* Review Form */}
        <ReviewForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

        {/* Review List with View All Button */}
        <div className="space-y-6">
          <ReviewList reviews={reviews.slice(0, 3)} isLoading={isLoadingReviews} />
          
          {reviews.length > 3 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllReviews(true)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Eye className="h-5 w-5" />
                View All {reviews.length} Reviews
              </button>
            </div>
          )}
        </div>

        <NotificationComponent />
      </div>
    </div>
  );
};

export default ReviewPage;