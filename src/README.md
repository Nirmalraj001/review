# Professional Review Page Setup Instructions

## Integration Setup

### 1. EmailJS Setup
1. Go to [EmailJS](https://www.emailjs.com/) and create an account
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template using the provided HTML template
4. Get your:
   - Public Key
   - Service ID
   - Template ID
5. Update the values in `src/services/emailService.ts`

### 2. Google Sheets Setup
1. Go to [SheetDB](https://sheetdb.io/) and create an account
2. Create a new Google Sheet with columns: id, name, mobile, message, timestamp, rating
3. Connect your sheet to SheetDB
4. Get your SheetDB API URL
5. Update the `SHEETS_API_URL` in `src/services/sheetsService.ts`

### 3. Environment Variables (Optional)
Create a `.env` file in the root directory:
```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_SHEETS_API_URL=your_sheetdb_url
```

## Features Included

- ✅ Professional form with validation
- ✅ Email notifications with HTML template
- ✅ Google Sheets integration
- ✅ Google Maps-style review display
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Real-time form validation
- ✅ Phone number masking for privacy
- ✅ Toast notifications
- ✅ Professional styling with Tailwind CSS

## Usage

1. Fill out the form with name, mobile, and message
2. On submission, the system will:
   - Send an email notification
   - Save the review to Google Sheets
   - Display the review in the list
3. Reviews are displayed in a Google Maps-style format
4. Mobile numbers are masked for privacy

## Customization

- Update colors in Tailwind classes
- Modify email template in `emailService.ts`
- Adjust validation rules in `validation.ts`
- Change review display format in `ReviewCard.tsx`