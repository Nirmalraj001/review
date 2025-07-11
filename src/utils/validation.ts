export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  if (name.trim().length > 50) return 'Name must be less than 50 characters';
  return null;
};

export const validateMobile = (mobile: string): string | null => {
  if (!mobile.trim()) return 'Mobile number is required';
  const phoneRegex = /^[0-9]{10}$/;
  const cleanedMobile = mobile.replace(/\D/g, '');
  if (!phoneRegex.test(cleanedMobile)) return 'Please enter a valid 10-digit mobile number';
  return null;
};

export const validateMessage = (message: string): string | null => {
  if (!message.trim()) return 'Message is required';
  if (message.trim().length < 10) return 'Message must be at least 10 characters';
  if (message.trim().length > 500) return 'Message must be less than 500 characters';
  return null;
};

export const formatMobileForDisplay = (mobile: string): string => {
  const cleaned = mobile.replace(/\D/g, '');
  return `${cleaned.slice(0, 3)}***${cleaned.slice(-2)}`;
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};