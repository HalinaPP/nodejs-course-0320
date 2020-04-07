const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const statusCodes = require('./task.constants.js');

router.route('/').get(async (req, res) => {
  const boardId = req.params.boardId;
  const status = 200;
  res.statusMessage = statusCodes[status].all;
  const tasks = await tasksService.getAll(boardId);
  if (tasks[1] === 200) {
    res.statusMessage = statusCodes[tasks[1]].all;
    res
      .json(tasks[0])
      .status(tasks[1])
      .end();
  } else {
    res.statusMessage = statusCodes[tasks[1]];
    res.status(tasks[1]).end();
  }
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getTaskById(
    req.params.id,
    req.params.boardId
  );
  res.set('Content-Type', 'application/json');
  if (task[1] === 200) {
    res.statusMessage = statusCodes[task[1]].all;
    res
      .json(task[0])
      .status(task[1])
      .end();
  } else {
    res.statusMessage = statusCodes[task[1]];
    res.status(task[1]).end();
  }
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
  const status = 200;
  res.statusMessage = statusCodes[status].update;
  await tasksService
    .updateTaskById(req.params.id, newTaskData, req.params.boardId)
    .then(task =>
      res
        .json(task.map(Task.toResponse)[0])
        .status(status)
        .set('Content-Type', 'application/json')
        .end()
    )
    .catch(() => {
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/:id').delete(async (req, res) => {
  // console.log(`b=${req.params.boardId} id=${req.params.id}`);
  const statusNum = await tasksService.deleteTaskById(
    req.params.id,
    req.params.boardId
  );

  res.statusMessage = statusCodes[statusNum];
  // console.log(`num=${statusNum}`);
  res.status(statusNum).end();
});

module.exports = router;
