const { ValidationError } = require('mongoose').Error;
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');

const {
  CREATE_STATUS,
  incorrectDataMessage,
  movieNotFoundMessage,
  movieDeleteMessage,
  notDeleteMovieMessage,
} = require('../utils/constants');

const getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({ owner: req.user._id }).sort({ createdAt: -1 }).populate('owner');
    res.send({ data: movie });
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  try {
    const movieCreate = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    });
    const movie = await movieCreate.populate('owner');
    res.status(CREATE_STATUS).send({ data: movie });
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequestError(incorrectDataMessage));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      throw new NotFoundError(movieNotFoundMessage);
    } else if (req.user._id === movie.owner.toString()) {
      await Movie.findByIdAndRemove(req.params.movieId);
      res.send({ message: movieDeleteMessage });
    } else {
      return next(new ForbiddenError(notDeleteMovieMessage));
    }
  } catch (err) {
    next(err);
  }
  return false;
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
