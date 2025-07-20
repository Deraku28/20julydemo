import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HeroSection } from '@/components/sections/HeroSection';
import { submitInterest, getSubmissionCount } from '@/lib/database';

jest.mock('@/lib/database', () => ({
  submitInterest: jest.fn(),
  getSubmissionCount: jest.fn(),
}));

describe('Form Submission Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getSubmissionCount as jest.Mock).mockResolvedValue(100);
  });

  it('submits form and updates counter', async () => {
    const mockSubmitInterest = submitInterest as jest.MockedFunction<typeof submitInterest>;
    mockSubmitInterest.mockResolvedValue({ data: { id: '1' }, error: null });

    render(<HeroSection submissionCount={100} />);

    // Fill form
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    
    // Submit form
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
    });
  });

  it('handles submission errors gracefully', async () => {
    const mockSubmitInterest = submitInterest as jest.MockedFunction<typeof submitInterest>;
    mockSubmitInterest.mockResolvedValue({ 
      data: null, 
      error: { message: 'Duplicate email', code: '23505' } 
    });

    render(<HeroSection submissionCount={100} />);

    // Fill form with duplicate email
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'existing@example.com' } });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Join the Waitlist' }));

    await waitFor(() => {
      expect(screen.getByText('This email is already registered')).toBeInTheDocument();
    });
  });

  it('validates form before submission', async () => {
    render(<HeroSection submissionCount={100} />);

    // Try to submit empty form
    fireEvent.click(screen.getByRole('button', { name: 'Join the Waitlist' }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    // Verify no API call was made
    expect(submitInterest).not.toHaveBeenCalled();
  });

  it('handles network errors during submission', async () => {
    const mockSubmitInterest = submitInterest as jest.MockedFunction<typeof submitInterest>;
    mockSubmitInterest.mockRejectedValue(new Error('Network error'));

    render(<HeroSection submissionCount={100} />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Join the Waitlist' }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const mockSubmitInterest = submitInterest as jest.MockedFunction<typeof submitInterest>;
    mockSubmitInterest.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<HeroSection submissionCount={100} />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Join the Waitlist' }));

    // Check loading state
    expect(screen.getByRole('button', { name: 'Joining...' })).toBeInTheDocument();
  });
}); 