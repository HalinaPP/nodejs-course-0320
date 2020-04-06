const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getBoardById = id => boardsRepo.getBoardById(id);
const createBoard = boardData => boardsRepo.createBoard(boardData);
const updateBoardById = (id, boardData) =>
  boardsRepo.updateBoardById(id, boardData);
const deleteBoardById = id => boardsRepo.deleteBoardById(id);

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoardById,
  deleteBoardById
};
