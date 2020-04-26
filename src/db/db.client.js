const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const bcrypt = require('bcrypt');

const hash = bcrypt.hashSync('admin', 10);

const users = [
  new User({
    name: 'Admin User',
    login: 'admin',
    password: hash
  })
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

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to DB');
    db.dropDatabase().then(() => {
      users.forEach(user => user.save());
      boards.forEach(board => board.save());
      tasks.forEach(task => task.save());
    });
    cb();
  });
};

module.exports = { connectToDB };
