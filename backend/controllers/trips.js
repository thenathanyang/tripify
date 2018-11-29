const { getID } = require('../utils');
const trips = {};

class Trip {
  constructor(trip, owner, tripId) {
    this.owner = owner;
    this.trip = trip;
    this.id = tripId;
    this.members = [];
  }

  json() {
    return {
      ...this.trip,
      id: this.id,
      owner: this.owner,
      members: this.members,
    }
  };

  update(trip) {
    this.trip = trip;
    return this;
  }

  addMember(member, state) {
    const existingMember = this.members.find(m => m.id === member.id);
    if (existingMember) {
      existingMember.state = state;
    } else {
      this.members.push({
        email: member.user.email,
        name: member.user.name,
        id: member.id,
        state,
      });
    }
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
