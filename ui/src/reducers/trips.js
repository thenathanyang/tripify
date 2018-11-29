import axios from "axios";
import produce from "immer";
import Config from "config";
import Storage from "storage";

import Trip from "models/trip";
import { MEMBER_ACCEPTED, MEMBER_DECLINED } from "models/member";

import { handleAxiosError } from "./error";

///////////////////////////////////////////////////////////////////////////////
//                       Contants and helper functions                       //
///////////////////////////////////////////////////////////////////////////////

const GET_TRIPS_INIT = Symbol("GET_TRIPS_INIT");
const GET_TRIPS_SUCCESS = Symbol("GET_TRIPS_SUCCESS");
const GET_TRIPS_FAILURE = Symbol("GET_TRIPS_FAILURE");

const GET_TRIP_INIT = Symbol("GET_TRIP_INIT");
const GET_TRIP_SUCCESS = Symbol("GET_TRIP_SUCCESS");
const GET_TRIP_FAILURE = Symbol("GET_TRIP_FAILURE");

const CREATE_TRIP_INIT = Symbol("CREATE_TRIP_INIT");
const CREATE_TRIP_SUCCESS = Symbol("CREATE_TRIP_SUCCESS");
const CREATE_TRIP_FAILURE = Symbol("CREATE_TRIP_FAILURE");

const UPDATE_TRIP_INIT = Symbol("UPDATE_TRIP_INIT");
const UPDATE_TRIP_SUCCESS = Symbol("UPDATE_TRIP_SUCCESS");
const UPDATE_TRIP_FAILURE = Symbol("UPDATE_TRIP_FAILURE");

const DELETE_TRIP_INIT = Symbol("DELETE_TRIP_INIT");
const DELETE_TRIP_SUCCESS = Symbol("DELETE_TRIP_SUCCESS");
const DELETE_TRIP_FAILURE = Symbol("DELETE_TRIP_FAILURE");

const RSVP_INIT = Symbol("RSVP_INIT");
const RSVP_SUCCESS = Symbol("RSVP_SUCCESS");
const RSVP_FAILURE = Symbol("RSVP_FAILURE");

const initState = () => ({
  error: null,
  timestamp: null,
  trips: [],
  trip: null,

  gettingTrip: false,
  getTripSuccess: false,
  getTripFailure: false,

  gettingTrips: false,
  getTripsSuccess: false,
  getTripsFailure: false,

  creatingTrip: false,
  createTripSuccess: false,
  createTripFailure: false,

  updatingTrip: false,
  updateTripSuccess: false,
  updateTripFailure: false,

  deletingTrip: false,
  deleteTripSuccess: false,
  deleteTripFailure: false,

  rsvping: false,
  rsvpSuccess: false,
  rsvpFailure: false,
});

const resetFlags = state => {
  state.gettingTrip = false;
  state.getTripSuccess = false;
  state.getTripFailure = false;

  state.gettingTrips = false;
  state.getTripsSuccess = false;
  state.getTripsFailure = false;

  state.creatingTrip = false;
  state.createTripSuccess = false;
  state.createTripFailure = false;

  state.updatingTrip = false;
  state.updateTripSuccess = false;
  state.updateTripFailure = false;

  state.deletingTrip = false;
  state.deleteTripSuccess = false;
  state.deleteTripFailure = false;

  state.rsvping = false;
  state.rsvpSuccess = false;
  state.rsvpFailure = false;
};

///////////////////////////////////////////////////////////////////////////////
//                            Action Descriptors                             //
///////////////////////////////////////////////////////////////////////////////

class Action {
  static InitAction(type) {
    return { type };
  }
  static GetTrip(error, trip) {
    return {
      type: error ? GET_TRIP_FAILURE : GET_TRIP_SUCCESS,
      trip: error ? null : trip,
      error: error || null,
    };
  }
  static GetTrips(error, trips) {
    return {
      type: error ? GET_TRIPS_FAILURE : GET_TRIPS_SUCCESS,
      trips: error ? [] : trips,
      error: error || null,
    };
  }
  static UpdateTrip(error, trip) {
    return {
      type: error ? UPDATE_TRIP_FAILURE : UPDATE_TRIP_SUCCESS,
      trip: error ? null : trip,
      error: error || null,
    };
  }
  static CreateTrip(error, trip) {
    return {
      type: error ? CREATE_TRIP_FAILURE : CREATE_TRIP_SUCCESS,
      trip: error ? null : trip,
      error: error || null,
    };
  }
  static DeleteTrip(error) {
    return {
      type: error ? DELETE_TRIP_FAILURE : DELETE_TRIP_SUCCESS,
      error: error || null,
    };
  }
  static RSVP(error) {
    return {
      type: error ? RSVP_FAILURE : RSVP_SUCCESS,
      error: error || null,
    };
  }
}

///////////////////////////////////////////////////////////////////////////////
//                                  Actions                                  //
///////////////////////////////////////////////////////////////////////////////

/**
 * Gets a Trip by a particular ID
 * 
 * @param {String} id 
 * @param {Function} callback
 */
const GetTrip = (id, callback) => async dispatch => {
  dispatch(Action.InitAction(GET_TRIP_INIT));
  try {
    const response = await axios.get(Config.routes.trips.getOne(id));
    const trip = Trip.fromObject(response.data.trip);
    dispatch(Action.GetTrip(null, trip));
    if (callback) callback();
  } catch (err) {
    handleAxiosError(dispatch, err, Action.GetTrip);
  }
};

/**
 * Gets all Trips
 * 
 * @param {Function} callback
 */
const GetTrips = (callback) => async dispatch => {
  dispatch(Action.InitAction(GET_TRIPS_INIT));
  try {
    const userId = Storage.get('user');
    const response = await axios.get(Config.routes.trips.get(userId));
    const trips = response.data.trips.map(Trip.fromObject);
    dispatch(Action.GetTrips(null, trips));
    if (callback) callback(user);
  } catch (err) {
    handleAxiosError(dispatch, err, Action.GetTrips);
  }
};

/**
 * Creates a Trip
 * 
 * @param {Trip} trip 
 * @param {Function} callback
 */
const CreateTrip = (trip, callback) => async dispatch => {
  dispatch(Action.InitAction(CREATE_TRIP_INIT));
  try {
    const userId = Storage.get('user');
    const response = await axios.post(Config.routes.trips.create(userId), { trip: trip.toObject() });
    const newTrip = Trip.fromObject(response.data.trip);
    dispatch(Action.CreateTrip(null, newTrip));
    if (callback) callback(newTrip);
  } catch (err) {
    handleAxiosError(dispatch, err, Action.CreateTrip);
  }
};

/**
 * Updates a Trip for a particular ID with the given Trip object
 * 
 * @param {String} id
 * @param {Trip} trip 
 * @param {Function} callback
 */
const UpdateTrip = (id, trip, callback) => async dispatch => {
  dispatch(Action.InitAction(UPDATE_TRIP_INIT));
  try {
    const response = await axios.put(Config.routes.trips.update(id), { trip: trip.toObject() });
    const newTrip = Trip.fromObject(response.data.trip);
    dispatch(Action.UpdateTrip(null, newTrip));
    if (callback) callback(newTrip);
  } catch (err) {
    handleAxiosError(dispatch, err, Action.UpdateTrip);
  }
};

/**
 * Deletes a Trip by a particular ID
 * 
 * @param {String} id 
 * @param {Function} callback
 */
const DeleteTrip = (id, callback) => async dispatch => {
  dispatch(Action.InitAction(DELETE_TRIP_INIT));
  try {
    const userId = Storage.get('user');
    await axios.delete(Config.routes.trips.delete(userId, id));
    dispatch(Action.DeleteTrip());
    if (callback) callback();
  } catch (err) {
    handleAxiosError(dispatch, err, Action.DeleteTrip);
  }
};

/**
 * RSVPs a particular user to a trip
 * 
 * @param {string} id
 * @param {boolean} accepted
 * @param {Function} callback
 */
const RSVPTrip = (id, accepted, callback) => async dispatch => {
  dispatch(Action.InitAction(RSVP_INIT));
  try {
    const userId = Storage.get('user');
    const rsvp = accepted ? MEMBER_ACCEPTED : MEMBER_DECLINED;
    await axios.post(Config.routes.trips.rsvp(userId, id), { rsvp });
    dispatch(Action.RSVP(null));
    if (callback) callback();
  } catch (err) {
    handleAxiosError(dispatch, err, Action.RSVP);
  }
};


///////////////////////////////////////////////////////////////////////////////
//                                  Reducer                                  //
///////////////////////////////////////////////////////////////////////////////

const Trips = (state = initState(), action) =>
  produce(state, draft => {
    draft.error = action.error;
    resetFlags(draft);

    /**
     * Init actions
     */
    switch (action.type) {
      case GET_TRIP_INIT:
        draft.gettingTrip = true;
        return;
      case GET_TRIPS_INIT:
        draft.gettingTrips = true;
        return;
      case CREATE_TRIP_INIT:
        draft.creatingTrip = true;
        return;
      case UPDATE_TRIP_INIT:
        draft.updatingTrip = true;
        return;
      case DELETE_TRIP_INIT:
        draft.deletingTrip = true;
        return;
      case RSVP_INIT:
        draft.rsvping = true;
        return;
    }

    draft.timestamp = Date.now();
    /**
     * Failure actions
     */
    switch (action.type) {
      case GET_TRIP_FAILURE:
        draft.getTripFailure = true;
        draft.trip = null;
        return;
      case GET_TRIPS_FAILURE:
        draft.getTripsFailure = true;
        draft.trips = [];
        return;
      case CREATE_TRIP_FAILURE:
        draft.createTripFailure = true;
        return;
      case UPDATE_TRIP_FAILURE:
        draft.updateTripFailure = true;
        return;
      case DELETE_TRIP_FAILURE:
        draft.deleteTripFailure = true;
        return;
      case RSVP_FAILURE:
        draft.rsvpFailure = true;
        return;
    }

    /**
     * Success actions
     */
    switch (action.type) {
      case GET_TRIP_SUCCESS:
        draft.getTripSuccess = true;
        draft.trip = action.trip;
        return;
      case GET_TRIPS_SUCCESS:
        draft.getTripsSuccess = true;
        draft.trips = action.trips;
        return;
      case CREATE_TRIP_SUCCESS:
        draft.createTripSuccess = true;
        return;
      case UPDATE_TRIP_SUCCESS:
        draft.updateTripSuccess = true;
        draft.trip = action.trip;
        return;
      case DELETE_TRIP_SUCCESS:
        draft.deleteTripSuccess = true;
        return;
      case RSVP_SUCCESS:
        draft.rsvpSuccess = true;
        return;
    }
  });

export { Trips, GetTrip, GetTrips, CreateTrip, UpdateTrip, DeleteTrip, RSVPTrip };
