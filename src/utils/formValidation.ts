export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface FormValidationSchema {
  [key: string]: ValidationRules;
}

export const validateField = (value: any, rules: ValidationRules): string | null => {
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return 'This field is required';
  }

  if (value && typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = (data: any, schema: FormValidationSchema): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  Object.keys(schema).forEach(key => {
    const error = validateField(data[key], schema[key]);
    if (error) {
      errors[key] = error;
    }
  });

  return errors;
};

// N2H ENTERPRISES specific validation schema
export const n2hValidationSchema: FormValidationSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  mobile: {
    required: true,
    pattern: /^[6-9]\d{9}$/, // Indian mobile number format
    custom: (value: string) => {
      if (value && value.length !== 10) {
        return 'Mobile number must be 10 digits';
      }
      return null;
    }
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      return null;
    }
  },
  products: {
    custom: (value: string[]) => {
      if (!value || value.length === 0) {
        return 'Please select at least one product';
      }
      return null;
    }
  },
  rating: {
    required: true,
    custom: (value: number) => {
      if (!value || value < 1 || value > 5) {
        return 'Please provide a rating between 1 and 5 stars';
      }
      return null;
    }
  }
};