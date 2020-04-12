const uuid = require('uuid');

const data = [
  {
    id: uuid(),
    title: 'Board1',
    columns: [
      {
        id: uuid(),
        title: 'to do smth',
        order: 0
      },
      {
        id: uuid(),
        title: 'in progress',
        order: 1
      },
      {
        id: uuid(),
        title: 'done',
        order: 2
      }
    ]
  },
  {
    id: uuid(),
    title: 'Board2',
    columns: [
      {
        id: uuid(),
        title: 'describe',
        order: 0
      },
      {
        id: uuid(),
        title: 'draw',
        order: 1
      }
    ]
  }
];
const getAll = async () => {
  return data;
};

const getBoardById = async id => {
  const currentBoard = data.find(board => {
    return board.id === id;
  });
  if (currentBoard === undefined) {
    return [404];
  }
  return [currentBoard];
};

const createBoard = async boardData => {
  boardData.id = uuid();
  const columns = boardData.columns.map(element => {
    element.id = uuid();
    const { id, title, order } = element;
    return { id, title, order };
  });
  boardData.columns = columns;
  data.push(boardData);
  return [boardData];
};

const updateBoardById = async (id, boardData) => {
  const boardIndex = data.findIndex(board => {
    return board.id === id;
  });
  if (boardIndex === -1) {
    return [404];
  }

  boardData.id = id;
  data.splice(boardIndex, 1, boardData);
  const newBoard = data.find(board => {
    return board.id === id;
  });
  return [newBoard];
};

const deleteBoardById = async id => {
  const boardIndex = data.findIndex(board => {
    return board.id === id;
  });
  let statusCode;
  if (boardIndex === -1) {
    statusCode = 404;
    return statusCode;
  }
  try {
    data.splice(boardIndex, 1);
    statusCode = 204;
  } catch (error) {
    statusCode = 400;
  }
  return statusCode;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoardById,
  deleteBoardById
};
