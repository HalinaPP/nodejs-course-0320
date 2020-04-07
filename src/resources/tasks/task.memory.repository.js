const uuid = require('uuid');
const data = [
  {
    id: uuid(),
    title: 'Task1',
    order: 0,
    description: 'about Task1',
    userId: '3dce4430-895c-463e-b5e2-ae8f23f425f5',
    boardId: '79340640-e1a1-486e-8131-51082db4c6cf',
    columnId: '0'
  },
  {
    id: uuid(),
    title: 'Task5',
    order: 1,
    description: 'about Task5',
    userId: '67ce4430-895c-463e-b5e2-ae8f23f425f5',
    boardId: '79340640-e1a1-486e-8131-51082db4c6cf',
    columnId: '2'
  },
  {
    id: uuid(),
    title: 'Task2',
    order: 2,
    description: 'about Task2',
    userId: '67ce4430-895c-463e-b5e2-ae8f23f425f5',
    boardId: 'de6424eb-8404-4992-be53-1204686c6d2e',
    columnId: '1'
  }
];
const getAll = async boardId => {
  const tasks = data.filter(task => {
    return task.boardId === boardId;
  });
  let statusCode = 200;
  if (tasks === undefined || tasks.length === 0) {
    statusCode = 404;
  }
  return [tasks, statusCode];
};

const getTaskById = async (id, boardId) => {
  const currentTask = data.find(task => {
    return task.id === id && task.boardId === boardId;
  });
  let statusCode = 200;
  if (currentTask === undefined) {
    statusCode = 404;
  }
  return [currentTask, statusCode];
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
    // console.log(`err=${error}`);
    statusCode = 400;
  }
  return statusCode;
};

const deleteTaskByBoardId = async boardId => {
  let statusCode;
  try {
    for (let i = data.length - 1; i >= 0; i--) {
      //  console.log(`boardId=${boardId}`);
      if (data[i].boardId === boardId) {
        //   console.log(`boardDel=${data[i].id} i=${i}`);
        data.splice(i, 1);
      }
    }
    statusCode = 204;
  } catch (error) {
    // console.log(`err=${error}`);
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
    // console.log(`err=${error}`);
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
