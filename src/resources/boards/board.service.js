const boardsRepo = require('./board.db.repository');
const tasks = require('../tasks/task.memory.repository.js');

const getAll = () => boardsRepo.getAll();
const getBoardById = id => boardsRepo.getBoardById(id);
const createBoard = boardData => boardsRepo.createBoard(boardData);
const updateBoardById = (id, boardData) =>
  boardsRepo.updateBoardById(id, boardData);
const deleteBoardById = async id => {
  await tasks.deleteTaskByBoardId(id);
  return await boardsRepo.deleteBoardById(id);
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoardById,
  deleteBoardById
};
