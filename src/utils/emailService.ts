import emailjs from '@emailjs/browser';

export interface ReviewData {
  customerName: string;
  mobile: string;
  email: string;
  address: string;
  products: string;
  alreadyBought: string;
  deliveryMode: string;
  rating: number;
  ratingDescription: string;
  feedback: string;
  reviewDate: string;
}

export const sendReviewEmail = async (data: ReviewData): Promise<boolean> => {
  try {
    const templateParams = {
      to_name: 'N2H ENTERPRISES',
      from_name: data.customerName,
      customer_name: data.customerName,
      mobile: data.mobile,
      email: data.email || 'Not provided',
      address: data.address || 'Not provided',
      products: data.products,
      already_bought: data.alreadyBought,
      delivery_mode: data.deliveryMode || 'Not applicable',
      rating: data.rating,
      rating_description: data.ratingDescription,
      feedback: data.feedback || 'No feedback provided',
      review_date: data.reviewDate,
      // Additional fields for better email formatting
      star_rating: '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating),
      rating_color: data.rating >= 4 ? '#10b981' : data.rating >= 3 ? '#f59e0b' : '#ef4444'
    };

    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your-service-id',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your-template-id',
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your-public-key'
    );

    return result.status === 200;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

export const sendToGoogleSheets = async (data: ReviewData): Promise<boolean> => {
  try {
    // This would integrate with Google Sheets API
    // You would need to set up Google Sheets API and create a service account
    const response = await fetch('YOUR_GOOGLE_SHEETS_WEBHOOK_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...data
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Google Sheets integration failed:', error);
    return false;
  }
};

export const openGoogleMapsReview = () => {
  // Replace with actual N2H ENTERPRISES Google Maps place ID
  const placeId = 'YOUR_GOOGLE_MAPS_PLACE_ID';
  const reviewUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  window.open(reviewUrl, '_blank');
};