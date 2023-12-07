require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/handle-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL } = process.env;

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(limiter);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
