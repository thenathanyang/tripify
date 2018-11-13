const { Router } = require('express');
const errors = require('http-errors');
const Trips = require('../controllers/trips');

const router = new Router();
router.route('/')
.get((req, res) => res.json({ trips: Trips.getTrips() }))
.post((req, res) => res.json({ trip: Trips.createTrip(req.body.trip) }));

router.route('/:id')
.all((req, res, next) => {
  if (!Trips.getTrip(req.params.id))
    throw new errors.NotFound(`Trip with ID ${req.params.id} not found`);
  next();
})
.get((req, res) => res.json({ trip: Trips.getTrip(req.params.id) }))
.put((req, res) => res.json({ trip: Trips.updateTrip(req.params.id, req.body.trip) }))
.delete((req, res) => res.json({ trip: Trips.deleteTrip(req.params.id) }));

module.exports = router;
