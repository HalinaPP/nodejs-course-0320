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

      await tasksService.getAll(boardId).then(tasks => {
        if (!tasks) {
          throw new ErrorHandler(404, statusCodes[404]);
        } else {
          res.statusMessage = statusCodes[200].all;
          res.contentType = 'application/json';
          res
            .json(tasks.map(Task.toResponse))
            .status(200)
            .end();
        }
      });
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

      const task = await tasksService.createTask(newTask, boardId);

      res.statusMessage = statusCodes[200].create;
      res.contentType = 'application/json';
      res
        .json(Task.toResponse(task))
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
      //  console.log(`t=${taskId} b=${boardId}`);
      if (!boardId || !isUUID(boardId) || !taskId || !isUUID(taskId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }

      await tasksService.getTaskById(taskId, boardId).then(task => {
        // console.log(`t=${task}`);
        if (!task) {
          throw new ErrorHandler(404, statusCodes[404]);
        } else {
          res.statusMessage = statusCodes[200].all;
          res.contentType = 'application/json';
          res
            .json(Task.toResponse(task[0]))
            .status(200)
            .end();
        }
      });
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

      if (!task) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[200].update;
        res.contentType = 'application/json';
        res
          .json(Task.toResponse(task[0]))
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

      const deleteCount = await tasksService.deleteTaskById(taskId, boardId);
      if (deleteCount === 0) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[204];
        res.status(204).end();
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
