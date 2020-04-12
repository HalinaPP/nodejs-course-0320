const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const statusCodes = require('./task.constants.js');
const { ErrorHandler } = require('./../../helpers/errorHandler');
const { isUUID } = require('./../../helpers/validator');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boardId = req.params.boardId;
      if (!boardId || !isUUID(boardId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }

      const tasks = await tasksService.getAll(boardId);

      if (!tasks[0]) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[200].all;
        res
          .json(tasks[0])
          .status(200)
          .end();
      }
    } catch (error) {
      next(error);
    }
  })

  .post(async (req, res, next) => {
    try {
      const newTask = req.body;
      const boardId = req.params.boardId;
      if (!boardId || !isUUID(boardId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }

      res.statusMessage = statusCodes[200].create;
      const task = await tasksService.createTask(newTask, boardId);
      res
        .json(task[0])
        .status(200)
        .end();
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const boardId = req.params.boardId;
      const taskId = req.params.id;
      if (!boardId || !isUUID(boardId) || !taskId || !isUUID(taskId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }

      const task = await tasksService.getTaskById(taskId, boardId);

      if (!task[0]) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[200].all;
        res
          .json(task[0])
          .status(200)
          .end();
      }
    } catch (error) {
      next(error);
    }
  })

  .put(async (req, res, next) => {
    try {
      const newTaskData = req.body;
      const boardId = req.params.boardId;
      const taskId = req.params.id;
      if (!boardId || !isUUID(boardId) || !taskId || !isUUID(taskId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }

      const task = await tasksService.updateTaskById(
        taskId,
        newTaskData,
        boardId
      );

      if (!task[0]) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[200].update;
        res
          .json(task.map(Task.toResponse)[0])
          .status(200)
          .end();
      }
    } catch (error) {
      next(error);
    }
  })

  .delete(async (req, res, next) => {
    try {
      const boardId = req.params.boardId;
      const taskId = req.params.id;
      if (!boardId || !isUUID(boardId) || !taskId || !isUUID(taskId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }

      const statusNum = await tasksService.deleteTaskById(taskId, boardId);
      if (statusNum === 404) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[statusNum];
        res.status(statusNum).end();
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
