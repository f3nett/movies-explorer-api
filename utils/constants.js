const SALT_ROUNDS = 10;
const userNotFoundMessage = 'Пользователь не найден';
const userConflictMessage = 'Такой пользователь уже существует';
const movieNotFoundMessage = 'Фильм не найден';
const movieForbiddenMessage = 'Фильм не принадлежит пользователю';
const movieWrongIdMessage = 'Некорректный идентификатор фильма';
const movieDeleteMessage = 'Фильм удален из списка пользователя';

module.exports = {
  SALT_ROUNDS,
  userNotFoundMessage,
  userConflictMessage,
  movieNotFoundMessage,
  movieForbiddenMessage,
  movieWrongIdMessage,
  movieDeleteMessage,
};
