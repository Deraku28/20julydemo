import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/Input';

describe('Input Component', () => {
  it('renders with label', () => {
    render(<Input label="Email" name="email" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Input label="Email" name="email" required value="" onChange={() => {}} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Input 
        label="Email" 
        name="email" 
        value="" 
        onChange={() => {}} 
        error="Invalid email format" 
      />
    );
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input label="Email" name="email" value="" onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test@example.com' } });
    expect(handleChange).toHaveBeenCalledWith('test@example.com');
  });

  it('applies error styling when error is present', () => {
    render(
      <Input 
        label="Email" 
        name="email" 
        value="" 
        onChange={() => {}} 
        error="Invalid email" 
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('form-input-error');
  });

  it('renders with placeholder', () => {
    render(
      <Input 
        label="Email" 
        name="email" 
        value="" 
        onChange={() => {}} 
        placeholder="Enter your email" 
      />
    );
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('renders with different types', () => {
    const { rerender } = render(
      <Input label="Email" name="email" type="email" value="" onChange={() => {}} />
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input label="Password" name="password" type="password" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('handles onBlur and onFocus events', () => {
    const handleBlur = jest.fn();
    const handleFocus = jest.fn();
    render(
      <Input 
        label="Email" 
        name="email" 
        value="" 
        onChange={() => {}} 
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
}); 