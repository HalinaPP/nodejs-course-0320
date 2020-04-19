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
/*
const catchErrors = fn => async (res, req, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};
*/
module.exports = {
  ErrorHandler,
  handleError /* ,
  catchErrors*/
};
