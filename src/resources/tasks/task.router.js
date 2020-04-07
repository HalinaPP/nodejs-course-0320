const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const statusCodes = require('./task.constants.js');

router.route('/').get(async (req, res) => {
  const boardId = req.params.boardId;

  await tasksService
    .getAll(boardId)
    .then(tasks => {
      if (tasks[0] === 404) {
        res.statusMessage = statusCodes[404];
        res.status(404).end();
      } else {
        res.statusMessage = statusCodes[200].all;
        res
          .json(tasks[0])
          .status(200)
          .set('Content-Type', 'application/json')
          .end();
      }
    })
    .catch(() => {
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/:id').get(async (req, res) => {
  await tasksService
    .getTaskById(req.params.id, req.params.boardId)
    .then(task => {
      if (task[0] === 404) {
        res.statusMessage = statusCodes[404];
        res.status(404).end();
      } else {
        res.statusMessage = statusCodes[200].all;
        res
          .json(task[0])
          .status(200)
          .set('Content-Type', 'application/json')
          .end();
      }
    })
    .catch(() => {
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/').post(async (req, res) => {
  const newTask = req.body;
  const status = 200;
  res.statusMessage = statusCodes[status].create;
  await tasksService
    .createTask(newTask, req.params.boardId)
    .then(task =>
      res
        .json(task[0])
        .status(status)
        .set('Content-Type', 'application/json')
        .end()
    )
    .catch(() => {
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/:id').put(async (req, res) => {
  const newTaskData = req.body;

  await tasksService
    .updateTaskById(req.params.id, newTaskData, req.params.boardId)
    .then(task => {
      if (task[0] === 404) {
        res.statusMessage = statusCodes[404];
        res.status(404).end();
      } else {
        res.statusMessage = statusCodes[200].update;
        res
          .json(task.map(Task.toResponse)[0])
          .status(200)
          .set('Content-Type', 'application/json')
          .end();
      }
    })
    .catch(() => {
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/:id').delete(async (req, res) => {
  const statusNum = await tasksService.deleteTaskById(
    req.params.id,
    req.params.boardId
  );

  res.statusMessage = statusCodes[statusNum];
  res.status(statusNum).end();
});

module.exports = router;
