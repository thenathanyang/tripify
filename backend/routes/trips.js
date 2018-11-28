const { Router } = require('express');
const errors = require('http-errors');
const Trips = require('../controllers/trips');
const Users = require('../controllers/users');

const router = new Router();

router.route('/')
  .get((req, res) => {
    // get trips for the current user if available, else get all trips
    const trips = req.user ? req.user.getTrips() : Trips.getTrips();
    res.json({ trips: trips.map(t => t.json()) });
  })
  .post((req, res) => {
    // cannot create a trip if a user is not specified
    if (!req.user)
      throw errors.MethodNotAllowed('Cannot create a trip without a user');
    const trip = Trips.createTrip(req.body.trip, req.user.id);
    req.user.trips.push(trip.id);
    res.json({ trip });
  });

router.route('/:id')
  .all((req, res, next) => {
    if (!Trips.hasTrip(req.params.id))
      throw new errors.NotFound(`Trip with ID ${req.params.id} not found`);
    req.trip = Trips.getTrip(req.params.id);
    next();
  })
  .get((req, res) => res.json({ trip: req.trip.json() }))
  .put((req, res) => res.json({ trip: req.trip.update(req.body.trip).json() }))
  .delete((req, res) => {
    Trips.deleteTrip(req.params.id);
    Users.deleteTripFromUsers(req.params.id);
    res.status(204).json();
  });

module.exports = router;
