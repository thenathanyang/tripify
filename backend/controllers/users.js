const { getID } = require('../utils');
const { getTrip } = require('./trips');
const users = {}

class User {
  constructor(user, id) {
    this.user = user;
    this.trips = [];
    this.id = id;
  }

  json() {
    return {
      ...this.user,
      id: this.id,
      trips: this.getTrips().map(t => t.json()),
    }
  };

  getTrips() {
    return this.trips.map(getTrip);
  }

  addTrip(id) {
    this.deleteTrip(id);
    this.trips.push(id);
  }

  deleteTrip(id) {
    this.trips = this.trips.filter(tripId => tripId !== id);
  }
}

exports.hasUser = (id) => !!users[id];

exports.getUser = (id) => users[id];

exports.getUsers = () =>
  Object.keys(users).map(exports.getUser);

exports.getUserByEmail = email =>
  exports.getUsers().find(u => u.user.email === email);

exports.createUser = (name, email, password, id = getID()) =>
  (users[id] = new User({name, email, password}, id));

exports.deleteTripFromUsers = (id) =>
  exports.getUsers().forEach(user => user.deleteTrip(id));
