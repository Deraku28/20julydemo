import { useState, useCallback } from 'react';
import { InterestSubmission, FormValidationErrors } from '@/types';
import { validateForm } from '@/utils/validation';
import { submitInterest } from '@/lib/database';

export function useInterestForm() {
  const [formData, setFormData] = useState<InterestSubmission>({
    name: '',
    email: '',
    subscribe_newsletter: false,
    subscribe_updates: false,
    subscribe_releases: false,
  });
  
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const updateField = useCallback((field: keyof InterestSubmission, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (typeof value === 'string' && errors[field as keyof FormValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);
  
  const validateField = useCallback((field: 'name' | 'email', value: string) => {
    const fieldErrors = validateForm({ [field]: value } as any);
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
  }, []);
  
  const submit = useCallback(async () => {
    // Validate all fields
    const validationErrors = validateForm({
      name: formData.name,
      email: formData.email
    });
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return { success: false, errors: validationErrors };
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const { error } = await submitInterest(formData);
      
      if (error) {
        let errorMessage = 'Something went wrong. Please try again.';
        
        if (error.code === '23505') { // Unique constraint violation
          errorMessage = 'This email is already registered';
          setErrors({ email: errorMessage });
        } else {
          setErrors({ general: errorMessage });
        }
        
        return { success: false, error: errorMessage };
      } else {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subscribe_newsletter: false,
          subscribe_updates: false,
          subscribe_releases: false,
        });
        return { success: true };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection and try again.';
      setErrors({ general: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);
  
  const reset = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      subscribe_newsletter: false,
      subscribe_updates: false,
      subscribe_releases: false,
    });
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);
  }, []);
  
  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    updateField,
    validateField,
    submit,
    reset,
  };
} 