const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({
    boardId
  }).exec();
};

const getTaskById = async (id, boardId) => {
  return Task.find({
    _id: id,
    boardId
  }).exec(/* (err, task) => {
    if (err) return Error(err);
    console.log(task);
    // 'athletes' содержит список спортсменов, соответствующих критерию.
  }*/);
  /* const currentTask = data.find(task => {
    return task.id === id && task.boardId === boardId;
  });

  return [currentTask];*/
};

const createTask = async (taskData, boardId) => {
  taskData.boardId = boardId;
  return Task.create(taskData);
  /* taskData.id = uuid();

  data.push(taskData);
  return [taskData];*/
};

const updateTaskById = async (id, taskData, boardId) => {
  const res = Task.updateOne({ _id: id, boardId }, taskData).exec();
  if (res.n === res.nModified) {
    return getTaskById(id, taskData.boardId);
  }
  return false;

  /* const taskIndex = data.findIndex(task => {
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
  return [newTask];*/
};

const deleteTaskById = async (id, boardId) => {
  return (await Task.deleteOne({ _id: id, boardId }).exec()).deletedCount;
  /* const taskIndex = data.findIndex(task => {
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
  return statusCode;*/
};

const deleteTaskByBoardId = async boardId => {
  return (await Task.deleteMany({ boardId }).exec()).deletedCount;
  /* let statusCode;
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
  return statusCode;*/
};

const deleteUserInTask = async userId => {
  Task.updateMany({ userId }, { userId: null }).exec((err, task) => {
    if (err) return Error(err);
    console.log(task);
    let statusCode;
    try {
      if (task.n === task.nModified) {
        return 500;
      }
      statusCode = 200;
    } catch (error) {
      statusCode = 400;
    }
    return statusCode;
  });

  /* n
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
  return statusCode;*/
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
