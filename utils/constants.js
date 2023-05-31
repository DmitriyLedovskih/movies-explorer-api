const OK_STATUS = 200;
const CREATE_STATUS = 201;
const BAD_REQUEST_ERROR_STATUS = 400;
const UNAUTHORIZED_ERROR_STATUS = 401;
const FORBIDDEN_ERROR_STATUS = 403;
const NOT_FOUND_ERROR_STATUS = 404;
const CONFLICT_ERROR_STATUS = 409;
const INTERNAL_SERVER_ERROR_STATUS = 500;
const UNIQUE_STATUS = 11000;
const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const incorrectEmailOrPasswordMessage = 'Неправильные почтам или пароль';
const incorrectDataMessage = 'Переданы некорректные данные';
const exitMessage = 'Вы вышли из системы';
const emailBusyMessage = 'Email уже занят';
const movieNotFoundMessage = 'Фильм не найден';
const movieDeleteMessage = 'Фильм удален';
const notDeleteMovieMessage = 'Нельзя удалять не ваш фильм';
const urlNotFoundMessage = 'URL не найден';
const serverErrorMessage = 'На сервере произошла ошибка';
const notAuthMessage = 'Вы не авторизованы';
const userNotFoundMessage = 'Пользователь не найден';

module.exports = {
  OK_STATUS,
  CREATE_STATUS,
  BAD_REQUEST_ERROR_STATUS,
  FORBIDDEN_ERROR_STATUS,
  NOT_FOUND_ERROR_STATUS,
  UNAUTHORIZED_ERROR_STATUS,
  CONFLICT_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  UNIQUE_STATUS,
  regex,
  incorrectEmailOrPasswordMessage,
  incorrectDataMessage,
  exitMessage,
  emailBusyMessage,
  movieNotFoundMessage,
  movieDeleteMessage,
  notDeleteMovieMessage,
  urlNotFoundMessage,
  serverErrorMessage,
  notAuthMessage,
  userNotFoundMessage,
};
