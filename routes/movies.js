const moviesRoutes = require('express').Router();
const { postMovieValidation, movieIdValidation } = require('../validation/movies');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', postMovieValidation, addMovie);
moviesRoutes.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = moviesRoutes;
