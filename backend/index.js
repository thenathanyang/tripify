const bodyParser = require('body-parser');
const cors = require('cors');
const errors = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const config = require('./config');
const logger = require('./logger');
const routes = require('./routes');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/trips', routes.trips);

app.use((req, res, next) => next(new errors.NotFound()));
app.use((error, req, res, next) =>
  res.status(error.status || 500)
     .json({ error: error.message }));

app.listen(config.port, config.host, () => {
  logger.info(`Started server on ${config.host}:${config.port}`)
});
