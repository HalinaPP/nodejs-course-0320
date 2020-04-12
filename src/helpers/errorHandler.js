class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  let { statusCode, message } = err;
  if (!statusCode) {
    statusCode = 500;
    message = 'Internal server error';
  }
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = {
  ErrorHandler,
  handleError
};
