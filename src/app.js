const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { ErrorHandler, handleError } = require('./helpers/errorHandler');
const { validate } = require('./helpers/validator');
const { exit } = process;

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const { morgan, logger } = require('./middleware/logger');
app.use(
  morgan(
    ':method :status :url query=:query body=:body size :res[content-length] - :response-time ms',
    {
      stream: logger.stream
    }
  )
);
/* app.use(morgan('combined', { stream: winston.stream }));
 */
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

console.log('Working');
// const timeResB = Date.now();
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.param.boardId;
    next();
  },
  taskRouter
);
app.use('*', (req, res) => {
  throw new ErrorHandler(400, 'Bad request');
});
/* app.use('/error', (req, res) => {
  throw new ErrorHandler(500, 'My Internal server error');
});*/
app.use((err, req, res, next) => {
  handleError(err, res);

  const { method, url, query, body } = req;
  const bodyJ = JSON.stringify(body);
  const str = JSON.stringify(query);
  const headers = res.getHeaders();
  //  const timeForRes = (Date.now() - timeResB) / 1000;
  logger.error(
    `${method} ${res.statusCode} ${url} query=${str} body=${bodyJ} size ${headers['content-length']} `
  );
});

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at Promise: ${reason.message}`);
    logger.on('finish', () => exit(1));
  })
  .on('uncaughtException', (error, origin) => {
    logger.error(`Uncaught Exception: ${error}`);
    // winston.error(`Uncaught Exception origin:  ${origin}`);
    logger.on('finish', () => exit(1));
  });

// PUT IT HERE for Review
// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
