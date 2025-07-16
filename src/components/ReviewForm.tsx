import React, { useState, useEffect } from 'react';
import { Star, Send, MapPin, Phone, Mail, Check, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { saveReviewToSheet } from '../utils/googleSheetsService';
import { openGoogleMapsReview } from '../utils/googleMapsService';
import ThankYouPage from './ThankYouPage';

export interface FormData {
  name: string;
  mobile: string;
  email: string;
  address: string;
  products: any;
  otherProduct: string;
  alreadyBought: string;
  deliveryMode: string;
  rating: number;
  feedback: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  products?: string;
  rating?: string;
}

const ReviewForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    address: '',
    products: [],
    otherProduct: '',
    alreadyBought: '',
    deliveryMode: '',
    rating: 0,
    feedback: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; rating: number } | null>(null);
  const [hoveredStar, setHoveredStar] = useState(0);

  const products = [
    'Black Uraddal Laddu',
    'Moong Bean Laddu',
    'Dry Fruits Laddu',
    'Pepper milk powder',
    'Sukku Powder',
    'Dry Ginger Powder',
    'Avarampoo drink powder',
    'Idly podi',
    'Multi mix Masala powder',
    'Paruppu powder',
    'Kasturi manjal for face'
  ];

  const starDescriptions = [
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent'
  ];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your-public-key');
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (formData.products.length === 0 && !formData.otherProduct.trim()) {
      newErrors.products = 'Please select at least one product';
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Please provide a rating';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProductChange = (product: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p: any) => p !== product)
        : [...prev.products, product]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Store submitted data for thank you page
      setSubmittedData({ name: formData.name, rating: formData.rating });

      // Prepare email template parameters
      const templateParams = {
        to_name: 'N2H ENTERPRISES',
        from_name: formData.name,
        customer_name: formData.name,
        mobile: formData.mobile,
        from_email: formData.email,
        email: 'ntwohenterprises@gmail.com' || 'Not provided',
        address: formData.address || 'Not provided',
        products: formData.products.join(', ') + (formData.otherProduct ? `, ${formData.otherProduct}` : ''),
        alreadyBought: formData.alreadyBought,
        deliveryMode: formData.deliveryMode || 'Not applicable',
        rating: formData.rating,
        rating_description: starDescriptions[formData.rating - 1],
        message: formData.feedback || 'No feedback provided',
        review_date: new Date().toLocaleDateString()
      };

      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your-service-id',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your-template-id',
        templateParams
      );

      // Send to Google Sheets
      const sheetsData = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address,
        products: formData.products.join(', '),
        otherProduct: formData.otherProduct,
        alreadyBought: formData.alreadyBought,
        deliveryMode: formData.deliveryMode,
        rating: formData.rating,
        ratingDescription: starDescriptions[formData.rating - 1],
        feedback: formData.feedback,
      };

      await saveReviewToSheet(sheetsData);

      setSubmitSuccess(true);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        address: '',
        products: [],
        otherProduct: '',
        alreadyBought: '',
        deliveryMode: '',
        rating: 0,
        feedback: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`text-2xl transition-all duration-200 transform hover:scale-110 ${star <= (hoveredStar || formData.rating)
              ? 'text-yellow-400'
              : 'text-gray-300'
              }`}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
          >
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
        <span className="ml-3 text-sm text-gray-600">
          {(hoveredStar || formData.rating) > 0 &&
            starDescriptions[(hoveredStar || formData.rating) - 1]}
        </span>
      </div>
    );
  };

  if (submitSuccess) {
    return (
      <ThankYouPage
        name={submittedData?.name || ''}
        rating={submittedData?.rating || 0}
        onSubmitAnother={() => {
          setSubmitSuccess(false);
          setSubmittedData(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl p-8 shadow-lg">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold">N2H ENTERPRISES</h1>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-blue-100 text-sm text-center md:text-left">
            {/* Address */}
            <div className="flex items-center gap-2 max-w-xs">
              <MapPin className="w-4 h-4" />
              <span>No:12, Purasaradi, Agraharam 1st cross street, Avaniyapuram, Madurai - 625012.</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+91 9942352907 / <br /> +91 8903449788</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>ntwohenterprises@gmail.com</span>
            </div>
          </div>
        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-xl shadow-lg">
          {/* Personal Information */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.mobile ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter your mobile number"
                />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email ID <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </div>

          {/* Product Selection */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold">2</span>
              </div>
              Product Selection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {products.map((product) => (
                <label key={product} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-white transition-all duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.products.includes(product)}
                    onChange={() => handleProductChange(product)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{product}</span>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Others (Please specify)
              </label>
              <input
                type="text"
                value={formData.otherProduct}
                onChange={(e) => setFormData(prev => ({ ...prev, otherProduct: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter other products"
              />
            </div>
            {errors.products && <p className="text-red-500 text-sm mt-2">{errors.products}</p>}
          </div>

          {/* Purchase Information */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              Purchase Information
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Have you already bought this product?
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="alreadyBought"
                    value="yes"
                    checked={formData.alreadyBought === 'yes'}
                    onChange={(e) => setFormData(prev => ({ ...prev, alreadyBought: e.target.value }))}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="alreadyBought"
                    value="no"
                    checked={formData.alreadyBought === 'no'}
                    onChange={(e) => setFormData(prev => ({ ...prev, alreadyBought: e.target.value }))}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Delivery Mode
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryMode"
                    value="courier"
                    checked={formData.deliveryMode === 'courier'}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliveryMode: e.target.value }))}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Courier</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryMode"
                    value="hand-delivery"
                    checked={formData.deliveryMode === 'hand-delivery'}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliveryMode: e.target.value }))}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Hand Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Rating & Feedback */}
          <div className="p-6 bg-orange-50">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              Rating & Feedback
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rate your experience <span className="text-red-500">*</span>
              </label>
              {renderStars()}
              {errors.rating && <p className="text-red-500 text-sm mt-2">{errors.rating}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Kindly share your feedback
              </label>
              <textarea
                value={formData.feedback}
                onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Share your experience with our products and services..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-blue-600 font-semibold py-4 px-6 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Review</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;