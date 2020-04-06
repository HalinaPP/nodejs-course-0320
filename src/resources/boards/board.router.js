const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const statusCodes = require('./board.constants.js');
/** mergeParams */

router.route('/').get(async (req, res) => {
  const status = 200;
  res.statusMessage = statusCodes[status].all;
  await boardsService
    .getAll()
    .then(boards =>
      res
        .json(boards)
        .status(status)
        .set('Content-Type', 'application/json')
        .end()
    )
    .catch(err => {
      // console.log(err);
      res.status(500);
    });
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getBoardById(req.params.id);
  res.set('Content-Type', 'application/json');
  if (board[1] === 200) {
    res.statusMessage = statusCodes[board[1]].all;
    res
      .json(board[0])
      .status(board[1])
      .end();
  } else {
    res.statusMessage = statusCodes[board[1]];
    res.status(board[1]).end();
  }
});

router.route('/').post(async (req, res) => {
  const newBoard = req.body;
  const status = 200;
  res.statusMessage = statusCodes[status].create;
  await boardsService
    .createBoard(newBoard)
    .then(board =>
      res
        .json(board.map(Board.toResponse)[0])
        .status(status)
        .set('Content-Type', 'application/json')
        .end()
    )
    .catch(err => {
      // console.log(err);
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/:id').put(async (req, res) => {
  const newBoardData = req.body;
  const status = 200;
  res.statusMessage = statusCodes[status].update;
  await boardsService
    .updateBoardById(req.params.id, newBoardData)
    .then(board =>
      res
        .json(board.map(Board.toResponse)[0])
        .status(status)
        .set('Content-Type', 'application/json')
        .end()
    )
    .catch(err => {
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/:id').delete(async (req, res) => {
  const statusNum = await boardsService.deleteBoardById(req.params.id);
  res.statusMessage = statusCodes[statusNum];
  res.status(statusNum).end();
});

module.exports = router;
