class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message || "Internal server error";
    this.status = statusCode >= 400 && statusCode < 500 ? "failed" : "error";

    this.isOperational = true;
  }
}

module.exports = CustomError;
