function createAndThrowError(statusCode, status, message, ...args) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = status;
  error.args = args ?? null;
  throw error;
}

module.exports = { createAndThrowError };