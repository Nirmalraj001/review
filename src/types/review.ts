export interface Review {
  id: string;
  name: string;
  mobile: string;
  message: string;
  timestamp: string;
  rating?: number;
}

export interface ReviewFormData {
  name: string;
  mobile: string;
  message: string;
}

export interface EmailTemplateData {
  name: string;
  mobile: string;
  message: string;
  timestamp: string;
}