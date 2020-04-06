const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'New task',
    order = 0,
    description = 'description',
    userId = '',
    boardId = ''
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
  }
  static toResponse(task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}

module.exports = Task;
