const { Router } = require('express');
const errors = require('http-errors');
const trips = require('./trips');
const Users = require('../controllers/users');
const Trips = require('../controllers/trips');

const router = new Router();

router.route('/')
  .get((req, res) => res.json({ users: Users.getUsers() }))
  .post((req, res) => {
    if (!req.body.email)
      throw new errors.BadRequest('User email is required');
    if (!req.body.name)
      throw new errors.BadRequest('User name is required');
    if (!/[A-z0-9\.\_]+@(?:[A-z0-9]+\.)+[A-z0-9]+/.test(req.body.email))
      throw new errors.BadRequest('Please provide a valid email')
    res.json({ user: Users.createUser(req.body.name, req.body.email) });
  });

router.route('/:user')
  .get((req, res) => {
    const user = Users.getUser(req.params.user);
    if (!user)
      throw new errors.NotFound('User not found');
    res.json({ user });
  });

router.use('/:user/trips', (req, res, next) => {
  req.trips = Trips.userTrips(req.params.user);
  next();
}, trips);

module.exports = router;