const users = {};
const getID = () => (''+Math.random()).split('.')[1];

class UserTrips {
  constructor() {
    this.trips = [];
  }

  getTripIndex(id) {
    return this.trips.findIndex(elem => elem.id === id);
  }

  getTrip(id) {
    return this.trips.find(trip => trip.id === id);
  }

  getTrips() {
    return this.trips;
  }

  createTrip(trip) {
    return this.trips[this.trips.push({ ...trip, id: getID() }) - 1];
  }

  updateTrip(id, trip) {
    return this.trips[this.getTripIndex(id)] = trip;
  }

  deleteTrip(id) {
    return this.trips.splice(this.getTripIndex(id), 1)[0];
  }
}

exports.userTrips = user => {
  if (!users[user])
    users[user] = new UserTrips();
  return users[user];
};
