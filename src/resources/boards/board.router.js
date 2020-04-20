const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const statusCodes = require('./board.constants.js');
const { ErrorHandler, catchError } = require('./../../helpers/errorHandler');
const { isUUID } = require('./../../helpers/validator');

router
  .route('/')
  .get(
    catchError(async (req, res, next) => {
      const boards = await boardsService.getAll();

      res.statusMessage = statusCodes[200].all;
      res.contentType = 'application/json';
      res
        .json(boards.map(Board.toResponse))
        .status(200)
        .end();
      next();
    })
  )

  .post(
    catchError(async (req, res, next) => {
      const newBoard = req.body;
      const board = await boardsService.createBoard(newBoard);

      res.statusMessage = statusCodes[200].create;
      res.contentType = 'application/json';
      res
        .json(Board.toResponse(board))
        .status(200)
        .end();
      next();
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res, next) => {
      const board = await boardsService.getBoardById(req.params.id);

      if (!board) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[200].all;
        res.contentType = 'application/json';
        res
          .json(Board.toResponse(board))
          .status(200)
          .end();
      }
      next();
    })
  )

  .put(
    catchError(async (req, res, next) => {
      const newBoardData = req.body;
      const boardId = req.params.id;

      if (!boardId || !isUUID(boardId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }

      const board = await boardsService.updateBoardById(
        req.params.id,
        newBoardData
      );

      if (!board) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[200].update;
        res.contentType = 'application/json';
        res
          .json(Board.toResponse(board))
          .status(200)
          .end();
      }
      next();
    })
  )

  .delete(
    catchError(async (req, res, next) => {
      const boardId = req.params.id;

      if (!boardId || !isUUID(boardId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }
      const deleteCount = await boardsService.deleteBoardById(boardId);

      if (deleteCount === 0) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[204];
        res.status(204).end();
      }
      next();
    })
  );

module.exports = router;
