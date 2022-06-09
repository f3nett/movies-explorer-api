const SALT_ROUNDS = 10;
const userNotFoundMessage = 'Пользователь не найден';
const userConflictMessage = 'Такой пользователь уже существует';
const movieNotFoundMessage = 'Фильм не найден';
const movieForbiddenMessage = 'Фильм не принадлежит пользователю';
const movieWrongIdMessage = 'Некорректный идентификатор фильма';
const movieDeleteMessage = 'Фильм удален из списка пользователя';
const needAuthMessage = 'Необходима авторизация';
const pathErrorMessage = 'Путь не найден';
const serverErrorMessage = 'На сервере произошла ошибка';
const LimiterMessage = 'Повторите попытку позже';
const emailErrorMessage = 'Email имеет некорректный формат';
const authErrorMessage = 'Неправильная почта или пароль';
const urlErrorMessage = 'wrong URL';

module.exports = {
  SALT_ROUNDS,
  userNotFoundMessage,
  userConflictMessage,
  movieNotFoundMessage,
  movieForbiddenMessage,
  movieWrongIdMessage,
  movieDeleteMessage,
  needAuthMessage,
  pathErrorMessage,
  serverErrorMessage,
  LimiterMessage,
  emailErrorMessage,
  authErrorMessage,
  urlErrorMessage,
};
