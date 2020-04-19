const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const statusCodes = require('./board.constants.js');
const { ErrorHandler } = require('./../../helpers/errorHandler');
const { isUUID } = require('./../../helpers/validator');

router
  .route('/')
  .get(async (req, res, next) => {
    res.statusMessage = statusCodes[200].all;
    res.contentType = 'application/json';
    try {
      const boards = await boardsService.getAll();
      res.contentType = 'application/json';
      res
        .json(boards.map(Board.toResponse))
        .status(200)
        .end();
    } catch (error) {
      next(error);
    }
  })

  .post(async (req, res, next) => {
    try {
      const newBoard = req.body;
      const board = await boardsService.createBoard(newBoard);

      res.statusMessage = statusCodes[200].create;
      res.contentType = 'application/json';
      res
        .json(Board.toResponse(board))
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
    } catch (error) {
      next(error);
    }
  })

  .put(async (req, res, next) => {
    try {
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
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
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
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
