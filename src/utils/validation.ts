import { ValidationError, InterestSubmission, FormValidationErrors } from '@/types'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validation functions
export const validateEmail = (email: string): ValidationError | null => {
  if (!email) {
    return {
      field: 'email',
      message: 'Email is required'
    }
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return {
      field: 'email',
      message: 'Please enter a valid email address'
    }
  }
  
  return null
}

export const validateName = (name: string): ValidationError | null => {
  if (name && name.trim().length < 2) {
    return {
      field: 'name',
      message: 'Name must be at least 2 characters long'
    }
  }
  
  return null
}

// Form validation
export const validateLeadForm = (data: { email: string; name?: string }) => {
  const errors: ValidationError[] = []
  
  const emailError = validateEmail(data.email)
  if (emailError) errors.push(emailError)
  
  if (data.name) {
    const nameError = validateName(data.name)
    if (nameError) errors.push(nameError)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// New validation functions for interest submission form
export function validateEmailSimple(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return 'Email is required';
  }
  
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  if (email.length > 255) {
    return 'Email must be less than 255 characters';
  }
  
  return null;
}

export function validateNameSimple(name: string): string | null {
  if (!name) {
    return 'Name is required';
  }
  
  if (name.length < 2) {
    return 'Name must be at least 2 characters';
  }
  
  if (name.length > 100) {
    return 'Name must be less than 100 characters';
  }
  
  return null;
}

export function validateForm(data: { name: string; email: string }) {
  const errors: { name?: string; email?: string } = {};
  
  const nameError = validateNameSimple(data.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmailSimple(data.email);
  if (emailError) errors.email = emailError;
  
  return errors;
}

export function validateInterestSubmission(data: InterestSubmission): FormValidationErrors {
  const errors: FormValidationErrors = {};
  
  // Validate name
  const nameError = validateNameSimple(data.name);
  if (nameError) errors.name = nameError;
  
  // Validate email
  const emailError = validateEmailSimple(data.email);
  if (emailError) errors.email = emailError;
  
  return errors;
}

export function isFormValid(data: InterestSubmission): boolean {
  const errors = validateInterestSubmission(data);
  return Object.keys(errors).length === 0;
}

export function getFieldError(field: keyof FormValidationErrors, errors: FormValidationErrors): string | undefined {
  return errors[field];
} 