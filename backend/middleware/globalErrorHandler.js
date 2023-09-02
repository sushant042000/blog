module.exports = globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal server error";
  error.status =
    error.statusCode >= 400 && error.statusCode < 500 ? "failed" : "error";
  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
