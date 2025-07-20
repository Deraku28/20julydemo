import { ErrorHandler, ErrorType, ErrorSeverity } from '@/utils/error-handling';

describe('Error Handler', () => {
  let errorHandler: ErrorHandler;

  beforeEach(() => {
    errorHandler = ErrorHandler.getInstance();
  });

  it('creates error with correct properties', () => {
    const error = errorHandler.createError(
      ErrorType.NETWORK,
      'Connection failed',
      ErrorSeverity.HIGH
    );

    expect(error.type).toBe(ErrorType.NETWORK);
    expect(error.severity).toBe(ErrorSeverity.HIGH);
    expect(error.message).toBe('Connection failed');
    expect(error.timestamp).toBeInstanceOf(Date);
  });

  it('handles network errors', () => {
    const networkError = new Error('fetch failed');
    const result = errorHandler.handleError(networkError);

    expect(result.type).toBe(ErrorType.NETWORK);
    expect(result.message).toContain('Network connection error');
  });

  it('handles validation errors', () => {
    const validationError = new Error('validation failed');
    validationError.message = 'validation failed';
    const result = errorHandler.handleError(validationError);

    expect(result.type).toBe(ErrorType.VALIDATION);
    expect(result.message).toBe('validation failed');
  });

  it('handles database errors', () => {
    const dbError = new Error('database connection failed');
    dbError.message = 'database connection failed';
    const result = errorHandler.handleError(dbError);

    expect(result.type).toBe(ErrorType.DATABASE);
    expect(result.message).toBe('database connection failed');
  });

  it('provides user-friendly messages', () => {
    const error = errorHandler.createError(
      ErrorType.NETWORK,
      'Connection failed',
      ErrorSeverity.HIGH
    );

    const message = errorHandler.getUserFriendlyMessage(error);
    expect(message).toBe('Please check your internet connection and try again.');
  });

  it('provides user-friendly messages for validation errors', () => {
    const error = errorHandler.createError(
      ErrorType.VALIDATION,
      'Invalid email format',
      ErrorSeverity.MEDIUM
    );

    const message = errorHandler.getUserFriendlyMessage(error);
    expect(message).toBe('Please check your input and try again.');
  });

  it('provides user-friendly messages for database errors', () => {
    const error = errorHandler.createError(
      ErrorType.DATABASE,
      'Database connection failed',
      ErrorSeverity.HIGH
    );

    const message = errorHandler.getUserFriendlyMessage(error);
    expect(message).toBe('We are experiencing technical difficulties. Please try again later.');
  });

  it('handles unknown errors', () => {
    const unknownError = new Error('Some random error');
    const result = errorHandler.handleError(unknownError);

    expect(result.type).toBe(ErrorType.UNKNOWN);
    expect(result.message).toBe('An unexpected error occurred. Please try again.');
  });

  it('maintains singleton pattern', () => {
    const instance1 = ErrorHandler.getInstance();
    const instance2 = ErrorHandler.getInstance();
    expect(instance1).toBe(instance2);
  });
}); 