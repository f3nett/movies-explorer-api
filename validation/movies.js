const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const ValidationError = require('../errors/validation-err');

const urlValidate = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new ValidationError('wrong URL');
};

const postMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidate),
    trailerLink: Joi.string().required().custom(urlValidate),
    thumbnail: Joi.string().required().custom(urlValidate),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  postMovieValidation,
  movieIdValidation,
};
