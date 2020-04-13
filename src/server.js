const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./middleware/logger');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
process
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled Rejection at Promise: ${reason.message}`);
    logger.on('finish', () => process.exit(1));
  })
  .on('uncaughtException', error => {
    logger.error(`Uncaught Exception: ${error}`);
    logger.on('finish', () => process.exit(1));
  });

// PUT IT HERE for Review
// throw Error('Oops!');
// Promise.reject(Error('Oops!'));
