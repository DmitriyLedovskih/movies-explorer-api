const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, deleteMovieValidator } = require('../utils/validators/movieValidator');

router.get('/', getMovies);

router.post('/', createMovieValidator, createMovie);

router.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
