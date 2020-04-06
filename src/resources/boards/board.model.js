const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'New board' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [];
  }
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
