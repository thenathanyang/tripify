// events reducer

import axios from "axios";
import produce from "immer";
import Config from "config";

import Event from "models/event";
import { handleAxiosError } from "./error";
import { Trips } from "./trips";

///////////////////////////////////////////////////////////////////////////////
//                       Contants and helper functions                       //
///////////////////////////////////////////////////////////////////////////////

const GET_EVENTS_INIT = Symbol("GET_EVENTS_INIT");
const GET_EVENTS_SUCCESS = Symbol("GET_EVENTS_SUCCESS");
const GET_EVENTS_FAILURE = Symbol("GET_EVENTS_FAILURE");

const GET_EVENT_INIT = Symbol("GET_EVENT_INIT");
const GET_EVENT_SUCCESS = Symbol("GET_EVENT_SUCCESS");
const GET_EVENT_FAILURE = Symbol("GET_EVENT_FAILURE");

const initState = () => ({
  error: null,
  timestamp: null,
  events: [],

  gettingEvents: false,
  getEventsSuccess: false,
  getEventsFailure: false,

  gettingEvent: false,
  getEventSuccess: false,
  getEventFailure: false,
});

const resetFlags = state => {
  state.gettingEvents = false;
  state.getEventsSuccess = false;
  state.getEventsFailure = false;

  state.gettingEvent = false;
  state.getEventSuccess = false;
  state.getEventFailure = false;
};

///////////////////////////////////////////////////////////////////////////////
//                            Action Descriptors                             //
///////////////////////////////////////////////////////////////////////////////

class Action {
  static InitAction(type) {
    return { type };
  }

  static GetEvents(error, events) {
    return {
      type: error ? GET_EVENTS_FAILURE : GET_EVENTS_SUCCESS,
      events: error ? [] : events,
      error: error || null,
    };
  }

  static GetEvent(error, event) {
    return {
      type: error ? GET_EVENT_FAILURE : GET_EVENT_SUCCESS,
      event: error ? null : event,
      error: error || null,
    };
  }
}

///////////////////////////////////////////////////////////////////////////////
//                                  Actions                                  //
///////////////////////////////////////////////////////////////////////////////


/**
 * Gets all Events for current month from Mappening 
 */
const GetEvents = () => async dispatch => {
  dispatch(Action.InitAction(GET_EVENTS_INIT));
  try {
    var d = new Date();
    var month = d.getMonth();
    const response = await axios.get(Config.routes.events.get(month+1));
    response.data.features.sort(function (a,b){
      var timeA = a.properties.start_time;
      var timeB = b.properties.start_time;
      return (timeA < timeB) ? -1 : (timeA > timeB) ? 1 : 0;
    });
    dispatch(Action.GetEvents(null, response.data.features.map(Event.fromMappeningObject)));
  } catch (err) {
    handleAxiosError(dispatch, err, Action.GetEvents);
  }
};

/**
 * Get an event from Mappening by an ID
 * 
 * @param {String} id 
 */
const GetEvent = (id, callback) => async dispatch => {
  dispatch(Action.InitAction(GET_EVENT_INIT));
  try{
    const response = await axios.get(Config.routes.events.getOne(id));
    var data =  Event.fromMappeningObject(response.data.features[0]);
    dispatch(Action.GetEvent(null, data));
    if (callback) callback (data);
  }catch (err) {
    handleAxiosError(dispatch, err, Action.GetEvent);
  }
};



///////////////////////////////////////////////////////////////////////////////
//                                  Reducer                                  //
///////////////////////////////////////////////////////////////////////////////

const Events = (state = initState(), action) =>
  produce(state, draft => {
    draft.error = action.error;
    resetFlags(draft);

    /**
     * Init actions
     */
    switch (action.type) {
      case GET_EVENTS_INIT:
        draft.gettingEvents = true;
        return;
      case GET_EVENT_INIT:
        draft.gettingEvent = true;
        return;
    }

    draft.timestamp = Date.now();
    /**
     * Failure actions
     */
    switch (action.type) {
      case GET_EVENTS_FAILURE:
        draft.getEventsFailure = true;
        draft.events = null;
        return;
      case GET_EVENT_FAILURE:
        draft.getEventFailure = true;
        draft.event = null;
        return;
    }

    /**
     * Success actions
     */
    switch (action.type) {
      case GET_EVENTS_SUCCESS:
        draft.getEventsSuccess = true;
        draft.events = action.events;
        return;
      case GET_EVENT_SUCCESS:
        draft.getEventSuccess = true;
        draft.event = action.event;
    }
  });

export { Events, GetEvents, GetEvent};
