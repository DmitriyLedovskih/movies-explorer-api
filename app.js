require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const error = require('./middlewares/error');
const router = require('./routes');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_LINK } = process.env;

mongoose.connect(DB_LINK);

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
