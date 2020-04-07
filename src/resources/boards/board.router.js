const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const statusCodes = require('./board.constants.js');

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
    .catch(() => {
      res.statusMessage = statusCodes[400];
      res.status(400).send();
    });
});

router.route('/:id').get(async (req, res) => {
  await boardsService
    .getBoardById(req.params.id)
    .then(board => {
      if (board[0] === 404) {
        res.statusMessage = statusCodes[404];
        res.status(404).end();
      } else {
        res.statusMessage = statusCodes[200].all;
        res
          .json(board[0])
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
    .catch(() => {
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/:id').put(async (req, res) => {
  const newBoardData = req.body;

  await boardsService
    .updateBoardById(req.params.id, newBoardData)
    .then(board => {
      if (board[0] === 404) {
        res.statusMessage = statusCodes[404];
        res.status(404).end();
      } else {
        res.statusMessage = statusCodes[200].update;
        res
          .json(board.map(Board.toResponse))
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
  const statusNum = await boardsService.deleteBoardById(req.params.id);
  res.statusMessage = statusCodes[statusNum];
  res.status(statusNum).end();
});

module.exports = router;
