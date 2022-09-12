const { INTERNAL_SERVER_ERROR } = require('./statuscodes');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.status = INTERNAL_SERVER_ERROR;
  }
}

module.exports = ServerError;
