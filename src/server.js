const { logger } = require('./middleware/logger');

process
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled Rejection at Promise: ${reason.message}`);
    process.exitCode = 1;
  })
  .on('uncaughtException', error => {
    logger.error(`Uncaught Exception: ${error}`);
    process.exitCode = 1;
  });

// PUT IT HERE for Review
// throw Error('Oops!');
// Promise.reject(Error('Oops!'));
const { connectToDB } = require('./db/db.client');
const { PORT } = require('./common/config');
const app = require('./app');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
