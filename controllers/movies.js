const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  movieNotFoundMessage, movieForbiddenMessage, movieWrongIdMessage, movieDeleteMessage,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner', { name: 1 })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    movieId,
    nameRU,
    nameEN,
    year,
    description,
    country,
    director,
    duration,
    image,
    thumbnail,
    trailerLink,
  } = req.body;
  Movie.create({
    movieId,
    nameRU,
    nameEN,
    year,
    description,
    country,
    director,
    duration,
    image,
    thumbnail,
    trailerLink,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new NotFoundError(movieNotFoundMessage)))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(movieForbiddenMessage));
      }
      return movie.remove()
        .then(() => res.send({ message: movieDeleteMessage }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(movieWrongIdMessage));
      }
      return next(err);
    });
};
