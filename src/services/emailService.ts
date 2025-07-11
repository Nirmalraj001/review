import emailjs from '@emailjs/browser';
import { EmailTemplateData } from '../types/review';

// Initialize EmailJS with your public key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
const EMAILJS_PUBLIC_KEY = '8zapjqABRvc2P0VQP';
const EMAILJS_SERVICE_ID = 'service_u55vp4p';
const EMAILJS_TEMPLATE_ID = 'template_xkiiyxc';

export const initializeEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};

export const sendReviewEmail = async (reviewData: EmailTemplateData): Promise<void> => {
  try {
    const templateParams = {
      to_name: 'Admin',
      from_name: reviewData.name,
      customer_name: reviewData.name,
      customer_mobile: reviewData.mobile,
      customer_message: reviewData.message,
      submission_time: reviewData.timestamp,
      reply_to: 'noreply@yourcompany.com'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email service error:', error);
    throw new Error('Failed to send email notification');
  }
};

// Professional HTML email template for EmailJS
export const EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f8f9fa; }
    .review-box { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Customer Review Submitted</h2>
    </div>
    <div class="content">
      <div class="review-box">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {{customer_name}}</p>
        <p><strong>Mobile:</strong> {{customer_mobile}}</p>
        <p><strong>Submitted:</strong> {{submission_time}}</p>
        <h3>Review Message</h3>
        <p>{{customer_message}}</p>
      </div>
    </div>
    <div class="footer">
      <p>This email was automatically generated from your review system.</p>
    </div>
  </div>
</body>
</html>
`;