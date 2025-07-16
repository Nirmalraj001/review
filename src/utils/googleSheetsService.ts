import { FormData } from "../components/ReviewForm";

const SHEETS_API_URL = 'https://sheetdb.io/api/v1/n8ypdr0bncurd';

export const saveReviewToSheet = async (reviewData: FormData): Promise<void> => {
  try {
    const response = await fetch(SHEETS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        data: {
          name: reviewData.name,
          mobile: reviewData.mobile,
          email: reviewData.email || "", // optional
          address: reviewData.address || "", // optional
          products: reviewData.products || "",
          otherProduct: reviewData.otherProduct || "",
          alreadyBought: reviewData.alreadyBought,
          deliveryMode: reviewData.deliveryMode || "",
          rating: reviewData.rating || 0,
          message: reviewData.feedback,
          timestamp: new Date().toISOString()
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.created) {
      throw new Error('Failed to save to Google Sheets');
    }
  } catch (error) {
    console.error('Google Sheets service error:', error);
    throw new Error('Failed to save review to database');
  }
};

export const getReviewsFromSheet = async (): Promise<FormData[]> => {
  try {
    const response = await fetch(SHEETS_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.map((item: any) => ({
      name: item.name,
      mobile: item.mobile,
      email: item.email,
      address: item.address,
      products: item.products,
      otherProduct: item.otherProduct,
      alreadyBought: item.alreadyBought,
      deliveryMode: item.deliveryMode,
      rating: parseInt(item.rating) || 0,
      message: item.message,
      timestamp: item.timestamp
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};
