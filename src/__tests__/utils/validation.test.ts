import { validateEmail, validateName, validateForm } from '@/utils/validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('returns null for valid email', () => {
      expect(validateEmail('test@example.com')).toBeNull();
      expect(validateEmail('user.name+tag@domain.co.uk')).toBeNull();
      expect(validateEmail('test123@test-domain.com')).toBeNull();
    });

    it('returns error for invalid email', () => {
      expect(validateEmail('')).toBe('Email is required');
      expect(validateEmail('invalid-email')).toBe('Please enter a valid email address');
      expect(validateEmail('test@')).toBe('Please enter a valid email address');
      expect(validateEmail('@example.com')).toBe('Please enter a valid email address');
      expect(validateEmail('a'.repeat(256) + '@example.com')).toBe('Email must be less than 255 characters');
    });
  });

  describe('validateName', () => {
    it('returns null for valid name', () => {
      expect(validateName('John')).toBeNull();
      expect(validateName('John Doe')).toBeNull();
      expect(validateName('a'.repeat(100))).toBeNull();
      expect(validateName('Jean-Pierre')).toBeNull();
    });

    it('returns error for invalid name', () => {
      expect(validateName('')).toBe('Name is required');
      expect(validateName('a')).toBe('Name must be at least 2 characters');
      expect(validateName('a'.repeat(101))).toBe('Name must be less than 100 characters');
    });
  });

  describe('validateForm', () => {
    it('returns empty object for valid form data', () => {
      const result = validateForm({
        name: 'John Doe',
        email: 'john@example.com',
      });
      expect(result).toEqual({});
    });

    it('returns errors for invalid form data', () => {
      const result = validateForm({
        name: '',
        email: 'invalid-email',
      });
      expect(result).toEqual({
        name: 'Name is required',
        email: 'Please enter a valid email address',
      });
    });

    it('returns partial errors for partially invalid form data', () => {
      const result = validateForm({
        name: 'John Doe',
        email: '',
      });
      expect(result).toEqual({
        email: 'Email is required',
      });
    });
  });
}); 