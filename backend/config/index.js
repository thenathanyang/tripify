module.exports = {
  production: process.env.NODE_ENV === 'production',
  /** port to accept connections on */
  port: parseInt(process.env.PORT || '3000'),
  /** host address to bind to */
  host: process.env.HOST || '0.0.0.0',
  /** minimum log level to output */
  logLevel: process.env.LOG_LEVEL || 'debug',
};