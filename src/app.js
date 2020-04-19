const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { ErrorHandler, handleError } = require('./helpers/errorHandler');
// const { db } = require('./middleware/mongoW');

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

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

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

app.use((err, req, res, next) => {
  handleError(err, res);
});
module.exports = app;
