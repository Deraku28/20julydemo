'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Checkbox, ErrorMessage } from '@/components/ui';
import { InterestSubmission, FormValidationErrors } from '@/types';
import { validateForm } from '@/utils/validation';
import { submitInterest } from '@/lib/database';
import { useInterestForm } from '@/hooks/useInterestForm';
import { useFormAnalytics } from '@/hooks/useFormAnalytics';
import { SuccessMessage } from './SuccessMessage';
import { ErrorRecovery } from '@/components/ErrorRecovery';
import { FormErrorRecovery } from '@/utils/form-error-recovery';
import { classNames } from '@/utils/styles';

interface InterestFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export function InterestForm({ onSuccess, onError, className = '' }: InterestFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    updateField,
    validateField,
    submit,
    reset,
  } = useInterestForm();
  
  const { trackFormStart, trackFormSubmit, trackFieldFocus, trackFormError } = useFormAnalytics();
  const [hasStarted, setHasStarted] = useState(false);
  const [submissionError, setSubmissionError] = useState<any>(null);
  const formId = 'interest-form';
  
  // Track form start when user first interacts
  useEffect(() => {
    if (!hasStarted && (formData.name || formData.email)) {
      setHasStarted(true);
      trackFormStart();
    }
  }, [formData.name, formData.email, hasStarted, trackFormStart]);
  
  // Setup form auto-save
  useEffect(() => {
    const cleanup = FormErrorRecovery.setupAutoSave(formId, () => formData);
    return cleanup;
  }, [formData]);
  
  // Try to recover form data on mount
  useEffect(() => {
    const recoveredData = FormErrorRecovery.recoverFormData(formId);
    if (recoveredData && !formData.name && !formData.email) {
      // Restore form data if form is empty
      Object.entries(recoveredData).forEach(([key, value]) => {
        updateField(key as keyof InterestSubmission, value as string | boolean);
      });
    }
  }, []);
  
  const handleInputChange = (field: keyof InterestSubmission, value: string | boolean) => {
    updateField(field, value);
  };
  
  const handleFieldFocus = (fieldName: string) => {
    trackFieldFocus(fieldName);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Cache form data before submission
      FormErrorRecovery.cacheFormData(formId, formData);
      
      const result = await submit();
      
      if (result.success) {
        trackFormSubmit(true);
        // Clear cached data on success
        FormErrorRecovery.clearFormData(formId);
        setSubmissionError(null);
        onSuccess?.();
      } else {
        trackFormSubmit(false);
        if (result.error) {
          trackFormError(result.error);
          setSubmissionError(result.error);
          onError?.(result.error);
        }
      }
    } catch (error) {
      trackFormSubmit(false);
      const formError = FormErrorRecovery.handleFormError(error, formId);
      setSubmissionError(formError);
      trackFormError(formError.message);
      onError?.(formError.message);
    }
  };
  
  if (isSubmitted) {
    return <SuccessMessage className={className} />;
  }
  
  return (
    <form onSubmit={handleSubmit} className={classNames('space-y-6', className)}>
      <div className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          required
          value={formData.name}
          onChange={(value) => handleInputChange('name', value)}
          onBlur={() => validateField('name', formData.name)}
          onFocus={() => handleFieldFocus('name')}
          error={errors.name}
        />
        
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          onBlur={() => validateField('email', formData.email)}
          onFocus={() => handleFieldFocus('email')}
          error={errors.email}
        />
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Subscription Preferences</h3>
          
          <Checkbox
            label="Subscribe to newsletter"
            name="subscribe_newsletter"
            checked={formData.subscribe_newsletter}
            onChange={(checked) => handleInputChange('subscribe_newsletter', checked)}
            description="Get weekly newsletters with coding tips, industry insights, and exclusive content"
          />
          
          <Checkbox
            label="Get product updates"
            name="subscribe_updates"
            checked={formData.subscribe_updates}
            onChange={(checked) => handleInputChange('subscribe_updates', checked)}
            description="Receive notifications about new course modules, features, and improvements"
          />
          
          <Checkbox
            label="Get release notifications"
            name="subscribe_releases"
            checked={formData.subscribe_releases}
            onChange={(checked) => handleInputChange('subscribe_releases', checked)}
            description="Be the first to know when new course versions and major releases are available"
          />
        </div>
      </div>
      
      {errors.general && (
        <ErrorMessage message={errors.general} />
      )}
      
      {submissionError && (
        <ErrorRecovery
          error={submissionError}
          onRetry={() => handleSubmit({} as React.FormEvent)}
          onRecover={(data) => {
            Object.entries(data).forEach(([key, value]) => {
              updateField(key as keyof InterestSubmission, value as string | boolean);
            });
            setSubmissionError(null);
          }}
          formId={formId}
        />
      )}
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Joining Waitlist...' : 'Join the Waitlist'}
      </Button>
      
      <p className="caption text-center">
        By joining, you agree to receive updates about the Vibe Coding Course.
      </p>
    </form>
  );
} 