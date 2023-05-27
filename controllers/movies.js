const { ValidationError } = require('mongoose').Error;
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');

const {
  CREATE_STATUS,
} = require('../utils/constants');

const getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({}).sort({ createdAt: -1 }).populate('owner');
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
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    } else if (req.user._id === movie.owner.toString()) {
      await Movie.findByIdAndRemove(req.params.movieId);
      res.send({ message: 'Фильм удален' });
    } else {
      return next(new ForbiddenError('Нельзя удалять не ваш фильм'));
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
