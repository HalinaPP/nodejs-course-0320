const morgan = require('morgan');
morgan.token('query', (req, res) => {
  return JSON.stringify(req.query);
});

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

const { createLogger, format, transports } = require('winston');
// const winston = require('winston');
/* const options = {
   file: {
    level: 'info',
    filename: './logs/info.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  file: {
    level: 'error',
    filename: './logs/error.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};
*/
const logger = new createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.prettyPrint())
    }),
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.prettyPrint())
    })
  ]
});
logger.stream = {
  write(message, encoding) {
    logger.info(message);
  }
};

/* logger.error_stream = {
  write(message, encoding) {
    logger.error(message);
  }
};*/

module.exports = { morgan, logger };
