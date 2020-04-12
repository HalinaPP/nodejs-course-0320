const uuid = require('uuid');
const data = require('../../data/data.json').tasks;

const getAll = async boardId => {
  const tasks = data.filter(task => {
    return task.boardId === boardId;
  });

  return [tasks];
};

const getTaskById = async (id, boardId) => {
  const currentTask = data.find(task => {
    return task.id === id && task.boardId === boardId;
  });

  return [currentTask];
};

const createTask = async (taskData, boardId) => {
  taskData.id = uuid();
  taskData.boardId = boardId;
  data.push(taskData);
  return [taskData];
};

const updateTaskById = async (id, taskData, boardId) => {
  const taskIndex = data.findIndex(task => {
    return task.id === id && task.boardId === boardId;
  });
  if (taskIndex === -1) {
    return [];
  }
  taskData.id = id;
  data.splice(taskIndex, 1, taskData);
  const newTask = data.find(task => {
    return task.id === id && task.boardId === boardId;
  });
  return [newTask];
};

const deleteTaskById = async (id, boardId) => {
  const taskIndex = data.findIndex(task => {
    return task.id === id && task.boardId === boardId;
  });
  let statusCode;
  if (taskIndex === -1) {
    statusCode = 404;
    return statusCode;
  }
  try {
    data.splice(taskIndex, 1);
    statusCode = 204;
  } catch (error) {
    statusCode = 400;
  }
  return statusCode;
};

const deleteTaskByBoardId = async boardId => {
  let statusCode;
  try {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].boardId === boardId) {
        data.splice(i, 1);
      }
    }
    statusCode = 204;
  } catch (error) {
    statusCode = 400;
  }
  return statusCode;
};

const deleteUserInTask = async userId => {
  let statusCode;
  try {
    data.map(task => {
      if (task.userId === userId) {
        task.userId = null;
      }
    });
    statusCode = 200;
  } catch (error) {
    statusCode = 400;
  }
  return statusCode;
};

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  deleteTaskByBoardId,
  deleteUserInTask
};
