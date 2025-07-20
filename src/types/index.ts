// Form data interface
export interface InterestSubmission {
  id?: string;
  name: string;
  email: string;
  subscribe_newsletter: boolean;
  subscribe_updates: boolean;
  subscribe_releases: boolean;
  created_at?: string;
  updated_at?: string;
}

// Form validation errors
export interface FormValidationErrors {
  name?: string;
  email?: string;
  general?: string;
}

// Form submission state
export interface FormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  errors: FormValidationErrors;
}

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Input field types
export interface InputFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

// Checkbox field types
export interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

// Legacy types for backward compatibility
export interface Lead {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

export interface LeadFormData {
  email: string
  name?: string
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
} 