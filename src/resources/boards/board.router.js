const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const statusCodes = require('./board.constants.js');
const { ErrorHandler, catchError } = require('./../../helpers/errorHandler');
const { isUUID } = require('./../../helpers/validator');
const HttpStatus = require('http-status-codes');

router
  .route('/')
  .get(
    catchError(async (req, res, next) => {
      const boards = await boardsService.getAll();

      res.statusMessage = statusCodes[HttpStatus.OK].all;
      res.contentType = 'application/json';
      res
        .json(boards.map(Board.toResponse))
        .status(HttpStatus.OK)
        .end();
      next();
    })
  )

  .post(
    catchError(async (req, res, next) => {
      const newBoard = req.body;
      const board = await boardsService.createBoard(newBoard);

      res.statusMessage = statusCodes[HttpStatus.OK].create;
      res.contentType = 'application/json';
      res
        .json(Board.toResponse(board))
        .status(HttpStatus.OK)
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
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND]
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.OK].all;
        res.contentType = 'application/json';
        res
          .json(Board.toResponse(board))
          .status(HttpStatus.OK)
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
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }

      const board = await boardsService.updateBoardById(
        req.params.id,
        newBoardData
      );

      if (!board) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND]
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.OK].update;
        res.contentType = 'application/json';
        res
          .json(Board.toResponse(board))
          .status(HttpStatus.OK)
          .end();
      }
      next();
    })
  )

  .delete(
    catchError(async (req, res, next) => {
      const boardId = req.params.id;

      if (!boardId || !isUUID(boardId)) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }
      const deleteCount = await boardsService.deleteBoardById(boardId);

      if (deleteCount === 0) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND]
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.NO_CONTENT];
        res.status(HttpStatus.NO_CONTENT).end();
      }
      next();
    })
  );

module.exports = router;
