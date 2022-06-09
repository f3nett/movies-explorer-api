const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { needAuthMessage } = require('../utils/constants');
const { JWT_SECRET_DEV } = require('../utils/dev-config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new AuthError(needAuthMessage));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    return next(new AuthError(needAuthMessage));
  }

  req.user = payload;
  return next();
};
