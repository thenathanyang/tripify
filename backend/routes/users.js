const { Router } = require('express');
const errors = require('http-errors');
const trips = require('./trips');
const Users = require('../controllers/users');

const router = new Router();

router.route('/')
  .get((req, res) => res.json({ users: Users.getUsers() }))
  .post((req, res) => {
    if (!req.body.user)
      throw new errors.BadRequest('User object is required');
    const { email, name, password } = req.body.user;
    if (!email)
      throw new errors.BadRequest('Email is required');
    if (!name)
      throw new errors.BadRequest('Name is required');
    if (!password)
      throw new errors.BadRequest('Password is required');
    if (!/[A-z0-9\.\_]+@(?:[A-z0-9]+\.)+[A-z0-9]+/.test(email))
      throw new errors.BadRequest('Please provide a valid email')
    res.json({ user: Users.createUser(name, email, password) });
  });

router.use('/:user', (req, res, next) => {
  if (!Users.hasUser(req.params.user))
    throw new errors.NotFound('User not found');
  req.user = Users.getUser(req.params.user);
  next();
});

router.get('/:user', (req, res) => res.json({ user: req.user.json() }));
router.use('/:user/trips', trips);

module.exports = router;