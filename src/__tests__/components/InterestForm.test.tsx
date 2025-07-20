import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InterestForm } from '@/components/forms/InterestForm';
import { submitInterest } from '@/lib/database';

// Mock the database module
jest.mock('@/lib/database', () => ({
  submitInterest: jest.fn(),
}));

describe('InterestForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields', () => {
    render(<InterestForm />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Join the Waitlist' })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<InterestForm />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Join the Waitlist' }));
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<InterestForm />);
    
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: 'Join the Waitlist' }));
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('submits form successfully', async () => {
    const mockSubmitInterest = submitInterest as jest.MockedFunction<typeof submitInterest>;
    mockSubmitInterest.mockResolvedValue({ data: { id: '1' }, error: null });
    
    const onSuccess = jest.fn();
    render(<InterestForm onSuccess={onSuccess} />);
    
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Join the Waitlist' }));
    
    await waitFor(() => {
      expect(mockSubmitInterest).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subscribe_newsletter: false,
        subscribe_updates: false,
        subscribe_releases: false,
      });
    });
    
    await waitFor(() => {
      expect(screen.getByText('Thank you for your interest!')).toBeInTheDocument();
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('handles submission errors', async () => {
    const mockSubmitInterest = submitInterest as jest.MockedFunction<typeof submitInterest>;
    mockSubmitInterest.mockResolvedValue({ 
      data: null, 
      error: { message: 'Database error', code: 'DB_ERROR' } 
    });
    
    const onError = jest.fn();
    render(<InterestForm onError={onError} />);
    
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Join the Waitlist' }));
    
    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
      expect(onError).toHaveBeenCalledWith('Database error');
    });
  });

  it('handles checkbox changes', () => {
    render(<InterestForm />);
    
    const newsletterCheckbox = screen.getByLabelText('Subscribe to newsletter');
    const updatesCheckbox = screen.getByLabelText('Get product updates');
    const releasesCheckbox = screen.getByLabelText('Get release notifications');
    
    fireEvent.click(newsletterCheckbox);
    fireEvent.click(updatesCheckbox);
    fireEvent.click(releasesCheckbox);
    
    expect(newsletterCheckbox).toBeChecked();
    expect(updatesCheckbox).toBeChecked();
    expect(releasesCheckbox).toBeChecked();
  });

  it('shows loading state during submission', async () => {
    const mockSubmitInterest = submitInterest as jest.MockedFunction<typeof submitInterest>;
    mockSubmitInterest.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<InterestForm />);
    
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Join the Waitlist' }));
    
    expect(screen.getByRole('button', { name: 'Joining...' })).toBeInTheDocument();
  });
}); 