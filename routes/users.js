const router = require('express').Router();
const {
  updateProfile,
  getMe,
} = require('../controllers/users');
const { updateProfileValidator } = require('../utils/validators/userValidator');

router.get('/me', getMe);

router.patch('/me', updateProfileValidator, updateProfile);

module.exports = router;
