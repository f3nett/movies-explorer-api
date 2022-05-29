const NotFoundError = require('../errors/not-found-err');
const { pathErrorMessage, serverErrorMessage } = require('../utils/constants');

// обработчик ошибки некорректного пути
const wrongPathHandler = (req, res, next) => {
  next(new NotFoundError(pathErrorMessage));
};

// централизованный обработчик
const errHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? serverErrorMessage
      : message,
  });
  next();
};

module.exports = { wrongPathHandler, errHandler };
