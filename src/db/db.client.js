const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const users = [
  new User({ name: 'user1', login: 'user_login1', password: 'pass' }),
  new User({ name: 'user2', login: 'user_login2', password: 'pass' })
];

const boards = [
  new Board({
    title: 'Board1',
    columns: [
      {
        id: '9876269f-3fd2-43cb-8eb9-9477eba5d902',
        title: 'to do smt',
        order: 0
      },
      {
        id: '0934169f-3fd2-43cb-8eb9-9477eba5d902',
        title: 'in progress',
        order: 1
      },
      {
        id: 'ac6424eb-8404-4992-be53-1204686c6d2e',
        title: 'done',
        order: 2
      }
    ]
  }),
  new Board({
    title: 'Board2',
    columns: [
      {
        id: 'ac6424eb-8784-4992-be53-1204686c6d2e',
        title: 'describe',
        order: 0
      },
      {
        id: '126424eb-ac04-4992-be53-1204686c6d2e',
        title: 'draw',
        order: 1
      }
    ]
  })
];
const tasks = [
  new Task({
    title: 'useddr1',
    order: '1',
    description: 'useddr_login1',
    userId: 'ec6424eb-8784-4992-be53-1204686c6d2e',
    boardId: 'ac6424eb-8404-4992-be53-1204686c6d2e',
    columnId: '9876269f-3fd2-43cb-8eb9-9477eba5d902'
  }),
  new Task({
    title: 'uddser2',
    order: '2',
    description: 'uddser_login2',
    userId: 'f36424eb-8784-4992-be53-1204686c6d2e',
    boardId: '45876269f-3fd2-43cb-8eb9-9477eba5d902',
    columnId: '9676269f-3fd2-43cb-8eb9-9477eba5d902'
  })
];
/*
const tasks = [
  new Task(
    {
      title: 'Task1',
      // order: 0,
      description:
        'about Task1' /* ,
      userId: '3dce4430-895c-463e-b5e2-ae8f23f425f5',
      boardId: '79340640-e1a1-486e-8131-51082db4c6cf',
      columnId: 'ac6424eb-8784-4992-be53-1204686c6d2e'
    },
    {
      title: 'Task5',
      // order: 1,
      description:
        'about Task5' /* ,
      userId: '0c5c99e1-b78b-4d48-a4a9-266a84c5aa42',
      boardId: '79340640-e1a1-486e-8131-51082db4c6cf',
      columnId: 'ac6424eb-8784-4992-be53-1204686c6d2e2'
    },
    {
      title: 'Task2',
      // order: 2,
      description:
        'about Task2' /* ,
      userId: '0c5c99e1-b78b-4d48-a4a9-266a84c5aa42',
      boardId: 'de6424eb-8404-4992-be53-1204686c6d2e',
      columnId: '126424eb-ac04-4992-be53-1204686c6d2e'
    }
  )
];
*/
const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to DB');
    db.dropDatabase();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    cb();
  });
};

module.exports = { connectToDB };
