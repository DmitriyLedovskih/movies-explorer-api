const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUserValidator, loginValidator } = require('../utils/validators/userValidator');
const { createUser, login, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUserValidator, createUser);

router.post('/signin', loginValidator, login);

router.post('/signout', auth, signOut);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('URL не найден'));
});

module.exports = router;
