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
      throw new errors.MethodNotAllowed('Cannot create a trip without a user');
    const trip = Trips.createTrip(req.body.trip, req.user.id);
    trip.addMember(req.user, 'owner');
    req.user.addTrip(trip.id);
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

router.route('/:id/rsvp')
  .post((req, res) => {
    // cannot create a trip if a user is not specified
    if (!req.user)
      throw new errors.MethodNotAllowed('Cannot RSVP to a trip without a user');
    if (!Trips.hasTrip(req.params.id))
      throw new errors.NotFound(`Trip with ID ${req.params.id} not found`);
    if (!req.body.rsvp)
      throw new errors.BadRequest("RSVP must include an 'rsvp' field");
    if (req.body.rsvp !== 'declined' && req.body.rsvp !== 'accepted')
      throw new errors.BadRequest("RSVP must be either 'declined' or 'accepted'");

    const trip = Trips.getTrip(req.params.id);
    if (trip.owner === req.user.id)
      throw new errors.BadRequest('You cannot RSVP to your own trip');

    trip.addMember(req.user, req.body.rsvp);
    if (req.body.rsvp === 'accepted')
      req.user.addTrip(trip.id);
    if (req.body.rsvp === 'declined')
      req.user.deleteTrip(trip.id);
    res.status(202).json();
  });

module.exports = router;
