const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("mongoose").Error;
const User = require("../models/user");
const {
  CREATE_STATUS,
  UNIQUE_STATUS,
  incorrectDataMessage,
  exitMessage,
  emailBusyMessage,
} = require("../utils/constants");
const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const sendUser = require("../utils/sendUser");

const { NODE_ENV, JWT_SECRET } = process.env;

const updateData = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    sendUser(res, user);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequestError(incorrectDataMessage));
    } else if (err.code === UNIQUE_STATUS) {
      next(new ConflictError(emailBusyMessage));
    } else {
      next(err);
    }
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    sendUser(res, user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(CREATE_STATUS).send({ data: user });
  } catch (err) {
    if (err.code === UNIQUE_STATUS) {
      next(new ConflictError(emailBusyMessage));
    } else if (err instanceof ValidationError) {
      next(new BadRequestError(incorrectDataMessage));
    } else {
      next(err);
    }
  }
};

const updateProfile = (req, res, next) => updateData(req, res, next);

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV !== "production" ? "some-key" : JWT_SECRET,
      { expiresIn: "7d" },
    );

    res
      .cookie("token", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .send({ email });
  } catch (err) {
    next(err);
  }
};

const signOut = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .send({ message: exitMessage });
};

module.exports = {
  getMe,
  createUser,
  updateProfile,
  login,
  signOut,
};
