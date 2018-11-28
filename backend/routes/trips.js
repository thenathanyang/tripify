const { Router } = require('express');
const errors = require('http-errors');
const Trips = require('../controllers/trips');

const router = new Router();

router.get('/', (req, res) => {
  /* if there is no apriori user trip getter, use the AllTrips getter */
  if (!req.trips)
    req.trips = Trips.allTrips();
  res.json({ trips: req.trips.getTrips() });
});

router.post('/', (req, res) => {
  /* if there is no apriori user trip getter, this route is not available */
  if (!req.trips)
    throw errors.MethodNotAllowed('Cannot create a trip without a user');
  res.json({ trip: req.trips.createTrip(req.body.trip) });
})

router.route('/:id')
  .all((req, res, next) => {
    /* if there is no apriori user trip getter, use the allTrips getter */
    if (!req.trips)
      req.trips = Trips.allTrips();
    if (!req.trips.getTrip(req.params.id))
      throw new errors.NotFound(`Trip with ID ${req.params.id} not found`);
    next();
  })
  .get((req, res) => res.json({ trip: req.trips.getTrip(req.params.id) }))
  .put((req, res) => res.json({ trip: req.trips.updateTrip(req.params.id, req.body.trip) }))

router.delete('/:id', (req, res) => {
  /* if there is no apriori user trip getter, this route is not available */
  if (!req.trips)
    throw errors.MethodNotAllowed('Cannot delete a trip without a user');
  res.json({ trip: req.trips.deleteTrip(req.params.id) });
});

module.exports = router;
