const { getID } = require('../utils');
const trips = {};

class Trip {
  constructor(trip, owner, tripId) {
    this.owner = owner;
    this.trip = trip;
    this.id = tripId;
  }

  json() {
    return {...this.trip, owner: this.owner, id: this.id }
  };

  update(trip) {
    this.trip = trip;
    return this;
  }
}

exports.hasTrip = (id) => !!trips[id];

exports.getTrip = (id) => trips[id];

exports.getTrips = () =>
  Object.keys(trips).map(exports.getTrip)

exports.createTrip = (trip, owner, id = getID()) =>
  (trips[id] = new Trip(trip, owner, id));

exports.deleteTrip = (id) =>
  delete trips[id];

exports.userTrips = user =>
  exports.getTrips().filter(trip => trip.owner === user);
