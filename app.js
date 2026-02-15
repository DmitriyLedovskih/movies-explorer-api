require("dotenv").config();
const express = require("express");
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const error = require("./middlewares/error");
const router = require("./routes");
const { errorLogger, requestLogger } = require("./middlewares/logger");
const cors = require("./middlewares/cors");
const limiter = require("./middlewares/limiter");

const { PORT = 3001, DB_LINK = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
  process.env;

mongoose.connect(DB_LINK);

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(cors);

app.use(requestLogger);

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
