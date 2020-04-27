const Task = require('./task.model');
const HttpStatus = require('http-status-codes');

const getAll = async boardId => {
  return Task.find({
    boardId
  });
};

const getTaskById = async (id, boardId) => {
  return Task.findOne({
    _id: id,
    boardId
  });
};

const createTask = async (taskData, boardId) => {
  taskData.boardId = boardId;
  return Task.create(taskData);
};

const updateTaskById = async (id, taskData, boardId) => {
  const res = Task.updateOne({ _id: id, boardId }, taskData).exec();
  if (res.n === res.nModified) {
    return getTaskById(id, taskData.boardId);
  }
  return false;
};

const deleteTaskById = async (id, boardId) => {
  return (await Task.deleteOne({ _id: id, boardId }).exec()).deletedCount;
};

const deleteTaskByBoardId = async boardId => {
  return (await Task.deleteMany({ boardId }).exec()).deletedCount;
};

const deleteUserInTask = async userId => {
  Task.updateMany({ userId }, { userId: null }).exec((err, task) => {
    if (err) return Error(err);
    let statusCode;
    try {
      if (task.n === task.nModified) {
        return HttpStatus.INTERNAL_SERVER_ERROR;
      }
      statusCode = HttpStatus.OK;
    } catch (error) {
      statusCode = HttpStatus.NOT_FOUND;
    }
    return statusCode;
  });
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
