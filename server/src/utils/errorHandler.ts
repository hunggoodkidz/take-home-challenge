import { Request, Response, NextFunction } from 'express';

// Custom Error class to format error responses
class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error handling middleware
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // Log the error details (you might want to use a logging library here)
  console.error(err);

  // If error does not have a statusCode, set to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send the error response
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export { CustomError, errorHandler };