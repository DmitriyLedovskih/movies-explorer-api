const NotFoundError = require('../errors/NotFoundError');
const { OK_STATUS, userNotFoundMessage } = require('./constants');

module.exports = function sendUser(res, data) {
  if (!data) {
    throw new NotFoundError(userNotFoundMessage);
  }

  res.status(OK_STATUS).send({ data });
};
