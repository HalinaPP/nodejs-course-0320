const Board = require('./board.model');

const getAll = async () => {
  return Board.find();
};

const getBoardById = async id => {
  return Board.findById(id);
};

const createBoard = async boardData => {
  return Board.create(boardData);
  // boardData.id = uuid();
  /* const columns = boardData.columns.map(element => {
    element.id = uuid();
    const { id, title, order } = element;
    return { id, title, order };
  });
  boardData.columns = columns;
  data.push(boardData);
  return [boardData];*/
};

const updateBoardById = async (id, boardData) => {
  return Board.updateOne({ _id: id }, boardData);
};

const deleteBoardById = async id => {
  return (await Board.deleteOne({ _id: id }).exec()).deletedCount;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoardById,
  deleteBoardById
};
