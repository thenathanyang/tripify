const express = require("express");
const path = require("path");

const config = require("./config");
const logger = require("./logger");

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.port, config.host, () => {
  logger.info(`Started server on ${config.host}:${config.port}`)
});
