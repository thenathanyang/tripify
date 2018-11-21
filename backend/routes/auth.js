const { Router } = require('express');
const errors = require('http-errors');
const Users = require('../controllers/users');

const router = new Router();

router.route('/login')
  .post((req, res, next) => {
    if (!req.body.email)
      throw new errors.BadRequest('User email is required');
    const user = Users.getUserByEmail(req.body.email);
    if (!user)
      throw new errors.NotFound('A user was not found for that email address');
    res.json({ user });
  });

module.exports = router;