import { Review } from '../types/review';

// Replace with your SheetDB API endpoint
const SHEETS_API_URL = 'https://sheetdb.io/api/v1/ezk9n3qwq71l2';

export const saveReviewToSheet = async (reviewData: Review): Promise<void> => {
  try {
    const response = await fetch(SHEETS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        data: {
          id: reviewData.id,
          name: reviewData.name,
          mobile: reviewData.mobile,
          message: reviewData.message,
          timestamp: reviewData.timestamp,
          rating: reviewData.rating || 5
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

export const getReviewsFromSheet = async (): Promise<Review[]> => {
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
      id: item.id,
      name: item.name,
      mobile: item.mobile,
      message: item.message,
      timestamp: item.timestamp,
      rating: item.rating || 5
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};