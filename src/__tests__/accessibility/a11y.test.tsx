import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HeroSection } from '@/components/sections/HeroSection';
import { InterestForm } from '@/components/forms/InterestForm';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('HeroSection has no accessibility violations', async () => {
    const { container } = render(<HeroSection submissionCount={100} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('InterestForm has no accessibility violations', async () => {
    const { container } = render(<InterestForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper heading structure', () => {
    render(<HeroSection submissionCount={100} />);
    
    // Check for main heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    
    // Check for form heading
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('has proper form labels', () => {
    render(<InterestForm />);
    
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(<InterestForm />);
    
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    const submitButton = screen.getByRole('button', { name: 'Join the Waitlist' });
    
    // Tab through form elements
    nameInput.focus();
    expect(nameInput).toHaveFocus();
    
    emailInput.focus();
    expect(emailInput).toHaveFocus();
    
    submitButton.focus();
    expect(submitButton).toHaveFocus();
  });

  it('has proper ARIA attributes', () => {
    render(<InterestForm />);
    
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    
    expect(nameInput).toHaveAttribute('name', 'name');
    expect(emailInput).toHaveAttribute('name', 'email');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('has proper error announcements', () => {
    render(<InterestForm />);
    
    // Submit empty form to trigger errors
    const submitButton = screen.getByRole('button', { name: 'Join the Waitlist' });
    submitButton.click();
    
    // Check for error messages
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('has proper color contrast', () => {
    render(<HeroSection submissionCount={100} />);
    
    // Check that text is readable
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-gray-900');
  });

  it('has proper focus indicators', () => {
    render(<InterestForm />);
    
    const nameInput = screen.getByLabelText('Full Name');
    nameInput.focus();
    
    // Check for focus ring
    expect(nameInput).toHaveClass('focus:ring-2');
  });
}); 