const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const getTaskById = (id, boardId) => tasksRepo.getTaskById(id, boardId);
const createTask = (taskData, boardId) =>
  tasksRepo.createTask(taskData, boardId);
const updateTaskById = (id, taskData, boardId) =>
  tasksRepo.updateTaskById(id, taskData, boardId);
const deleteTaskById = (id, boardId) => tasksRepo.deleteTaskById(id, boardId);
const deleteTaskByBoardId = boardId => tasksRepo.deleteTaskByBoardId(boardId);
const deleteUserInTask = userId => tasksRepo.deleteUserInTask(userId);
module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  deleteTaskByBoardId,
  deleteUserInTask
};
