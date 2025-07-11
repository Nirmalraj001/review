import React, { useState } from 'react';
import { Send, User, Phone, MessageSquare, AlertCircle, Star } from 'lucide-react';
import { ReviewFormData } from '../types/review';
import { validateName, validateMobile, validateMessage } from '../utils/validation';
import StarRating from './StarRating';

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData & { rating: number }) => Promise<void>;
  isSubmitting: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    mobile: '',
    message: ''
  });

  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState<Partial<ReviewFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ReviewFormData, boolean>>>({});

  const handleInputChange = (field: keyof ReviewFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field: keyof ReviewFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof ReviewFormData, value: string) => {
    let error: string | null = null;
    
    switch (field) {
      case 'name':
        error = validateName(value);
        break;
      case 'mobile':
        error = validateMobile(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error || '' }));
    return !error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameValid = validateField('name', formData.name);
    const mobileValid = validateField('mobile', formData.mobile);
    const messageValid = validateField('message', formData.message);
    
    setTouched({ name: true, mobile: true, message: true });
    
    if (nameValid && mobileValid && messageValid) {
      await onSubmit({ ...formData, rating });
      setFormData({ name: '', mobile: '', message: '' });
      setRating(5);
      setTouched({});
      setErrors({});
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-3 shadow-lg">
          <Star className="h-7 w-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Share Your Experience
        </h2>
        <p className="text-gray-600">Your feedback helps us improve our service</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Section - Prominent Display */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <div className="text-center">
            <label className="block text-lg font-bold text-gray-800 mb-4">
              How would you rate your experience?
            </label>
            <div className="flex justify-center mb-4">
              <StarRating rating={rating} onRatingChange={setRating} size="lg" />
            </div>
            <p className="text-sm font-medium text-gray-600">
              {rating === 1 && "😞 Poor - We need to improve"}
              {rating === 2 && "😐 Fair - Could be better"}
              {rating === 3 && "🙂 Good - Satisfactory experience"}
              {rating === 4 && "😊 Very Good - Great experience"}
              {rating === 5 && "🤩 Excellent - Outstanding service!"}
            </p>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-gray-50/50 text-sm ${
                    errors.name && touched.name
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-gray-200 focus:border-purple-400 hover:border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.name && touched.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Mobile Field */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-bold text-gray-700 mb-2">
                Mobile Number *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <input
                  type="tel"
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  onBlur={() => handleBlur('mobile')}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-gray-50/50 text-sm ${
                    errors.mobile && touched.mobile
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-gray-200 focus:border-purple-400 hover:border-gray-300'
                  }`}
                  placeholder="Enter your 10-digit mobile number"
                />
                {errors.mobile && touched.mobile && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.mobile && touched.mobile && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.mobile}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Message Field */}
            <div className="h-full flex flex-col">
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                Your Review *
              </label>
              <div className="relative group flex-1">
                <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                </div>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  rows={6}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none bg-gray-50/50 text-sm h-full ${
                    errors.message && touched.message
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-gray-200 focus:border-purple-400 hover:border-gray-300'
                  }`}
                  placeholder="Tell us about your experience with our service..."
                />
                {errors.message && touched.message && (
                  <div className="absolute top-4 right-0 pr-4 flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.message && touched.message && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.message}
                </p>
              )}
              <div className="mt-2 text-sm text-gray-500 text-right">
                {formData.message.length}/500 characters
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform text-lg ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Submitting Review...
              </>
            ) : (
              <>
                <Send className="h-6 w-6" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;