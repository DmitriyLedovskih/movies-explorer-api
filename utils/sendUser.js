const NotFoundError = require('../errors/NotFoundError');
const { OK_STATUS } = require('./constants');

module.exports = function sendUser(res, data) {
  if (!data) {
    throw new NotFoundError('Пользователь не найден');
  }

  res.status(OK_STATUS).send({ data });
};
