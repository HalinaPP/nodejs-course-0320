const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { authRouter, authenticate } = require('./resources/auth/auth.router');
const { returnError } = require('./helpers/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const { morgan, logger } = require('./middleware/logger');
const passport = require('passport');

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(passport.initialize());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use(
  morgan(
    ':method :status :url query=:query body=:body size :res[content-length] - :response-time ms',
    {
      stream: logger.stream
    }
  )
);

app.use('/users', authenticate, userRouter);
app.use('/boards', authenticate, boardRouter);
boardRouter.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.param.boardId;
    next();
  },
  authenticate,
  taskRouter
);
app.use('/login', authRouter);
app.use('*', authenticate);
app.use((err, req, res, next) => {
  returnError(err, res);
  next();
});
module.exports = app;
