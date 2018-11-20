const trips = [];

const getID = () => (''+Math.random()).split('.')[1];

const getTripIndex = id =>
  trips.findIndex(elem => elem.id === id);

exports.getTrip = id =>
  trips.find(trip => trip.id === id);

exports.getTrips = () => trips;

exports.createTrip = trip =>
  trips[trips.push({ ...trip, id: getID() }) - 1];

exports.updateTrip = (id, trip) => 
  trips[getTripIndex(id)] = trip;

exports.deleteTrip = id =>
  trips.splice(getTripIndex(id), 1)[0];
