const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate Error';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el) => ({
      [el.path]: el.message,
    }));
    error = {
      message: errors,
      statusCode: 400,
    };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error || 'Server Error',
  });

  next();
};

module.exports = errorHandler;
