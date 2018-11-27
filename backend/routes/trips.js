const { Router } = require('express');
const errors = require('http-errors');

const router = new Router();

router.route('/')
  .get((req, res) => res.json({ trips: req.trips.getTrips() }))
  .post((req, res) => res.json({ trip: req.trips.createTrip(req.body.trip) }));

router.route('/:id')
  .all((req, res, next) => {
    if (!req.trips.getTrip(req.params.id))
      throw new errors.NotFound(`Trip with ID ${req.params.id} not found`);
    next();
  })
  .get((req, res) => res.json({ trip: req.trips.getTrip(req.params.id) }))
  .put((req, res) => res.json({ trip: req.trips.updateTrip(req.params.id, req.body.trip) }))
  .delete((req, res) => res.json({ trip: req.trips.deleteTrip(req.params.id) }));

module.exports = router;
