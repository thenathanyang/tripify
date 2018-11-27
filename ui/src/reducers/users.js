import axios from "axios";
import produce from "immer";
import Config from "config";
import Storage from "storage";

import User from "models/user";
import { handleAxiosError } from "./error";

///////////////////////////////////////////////////////////////////////////////
//                       Contants and helper functions                       //
///////////////////////////////////////////////////////////////////////////////

const GET_USER_INIT = Symbol("GET_USER_INIT");
const GET_USER_SUCCESS = Symbol("GET_USER_SUCCESS");
const GET_USER_FAILURE = Symbol("GET_USER_FAILURE");

const CREATE_USER_INIT = Symbol("CREATE_USER_INIT");
const CREATE_USER_SUCCESS = Symbol("CREATE_USER_SUCCESS");
const CREATE_USER_FAILURE = Symbol("CREATE_USER_FAILURE");

const LOGIN_INIT = Symbol("LOGIN_INIT");
const LOGIN_SUCCESS = Symbol("LOGIN_SUCCESS");
const LOGIN_FAILURE = Symbol("LOGIN_FAILURE");

/** export this one so that the error handler can access it */
export const LOGOUT = Symbol("LOGOUT");

const initState = () => ({
  error: null,
  timestamp: null,
  authenticated: !!Storage.get('user'),
  user: !Storage.get('user') ? null : User.fromObject({
    id: Storage.get('user') || undefined
  }),

  gettingUser: false,
  getUserSuccess: false,
  getUserFailure: false,

  creatingUser: false,
  createUserSuccess: false,
  createUserFailure: false,

  loggingIn: false,
  logInSuccess: false,
  logInFailure: false,
});

const resetFlags = state => {
  state.gettingUser = false;
  state.getUserSuccess = false;
  state.getUserFailure = false;

  state.creatingUser = false;
  state.createUserSuccess = false;
  state.createUserFailure = false;

  state.loggingIn = false;
  state.logInSuccess = false;
  state.logInFailure = false;
};

///////////////////////////////////////////////////////////////////////////////
//                            Action Descriptors                             //
///////////////////////////////////////////////////////////////////////////////

class Action {
  static InitAction(type) {
    return { type };
  }
  static GetUser(error, user) {
    return {
      type: error ? GET_USER_FAILURE : GET_USER_SUCCESS,
      user: error ? null : user,
      error: error || null,
    };
  }
  static CreateUser(error, user) {
    return {
      type: error ? CREATE_USER_FAILURE : CREATE_USER_SUCCESS,
      user: error ? null : user,
      error: error || null,
    };
  }
  static LoginUser(error, user) {
    return {
      type: error ? LOGIN_FAILURE : LOGIN_SUCCESS,
      user: error ? null : user,
      error: error || null,
    };
  }
}

///////////////////////////////////////////////////////////////////////////////
//                                  Actions                                  //
///////////////////////////////////////////////////////////////////////////////

/**
 * Gets a User by a particular User ID
 * 
 * @param {String} id 
 * @param {Function} callback
 */
const GetUser = (id, callback) => async dispatch => {
  dispatch(Action.InitAction(GET_USER_INIT));
  try {
    const response = await axios.get(Config.routes.users.getOne(id));
    const user = User.fromObject(response.data.user);
    dispatch(Action.GetUser(null, user));
    if (callback) callback(user);
  } catch (err) {
    handleAxiosError(dispatch, err, Action.GetUser, false);
  }
};

/**
 * Creates a User
 * 
 * @param {User} user 
 * @param {Function} callback
 */
const CreateUser = (name, email, password, callback) => async dispatch => {
  dispatch(Action.InitAction(CREATE_USER_INIT));
  try {
    const response = await axios.post(Config.routes.users.create(), { user: { name, email, password } });
    const newUser = User.fromObject(response.data.user);
    dispatch(Action.CreateUser(null, newUser));
    if (callback) callback(newUser);
  } catch (err) {
    handleAxiosError(dispatch, err, Action.CreateUser, false);
  }
};

/**
 * Verifies the existence of the user and authenticates
 * 
 * @param {String} email
 * @param {Function} callback
 */
const LoginUser = (email, password, callback) => async dispatch => {
  dispatch(Action.InitAction(LOGIN_INIT));
  try {
    const response = await axios.post(Config.routes.auth.login(), { email, password });
    const user = User.fromObject(response.data.user);
    dispatch(Action.LoginUser(null, user));
    if (callback) callback(user);
  } catch (err) {
    handleAxiosError(dispatch, err, Action.LoginUser, false);
  }
};


///////////////////////////////////////////////////////////////////////////////
//                                  Reducer                                  //
///////////////////////////////////////////////////////////////////////////////

const Users = (state = initState(), action) =>
  produce(state, draft => {
    draft.error = action.error;
    resetFlags(draft);

    /**
     * Init actions
     */
    switch (action.type) {
      case GET_USER_INIT:
        draft.gettingUser = true;
        return;
      case CREATE_USER_INIT:
        draft.creatingUser = true;
        return;
      case LOGIN_INIT:
        draft.loggingIn = true;
        return;
    }

    draft.timestamp = Date.now();
    /**
     * Failure actions
     */
    switch (action.type) {
      case GET_USER_FAILURE:
        draft.authenticated = false;
        draft.getUserFailure = true;
        draft.user = null;
        return;
      case CREATE_USER_FAILURE:
        draft.authenticated = false;
        draft.createUserFailure = true;
        draft.user = null;
        return;
      case LOGOUT:
      case LOGIN_FAILURE:
        draft.authenticated = false;
        draft.logInFailure = true;
        draft.user = null;
        Storage.remove('token');
        return;
    }

    /**
     * Success actions
     */
    switch (action.type) {
      case GET_USER_SUCCESS:
        draft.getUserSuccess = true;
        draft.user = action.user;
        return;
      /** I lazy so I lump these together, but generally not good practice */
      case CREATE_USER_SUCCESS:
      case LOGIN_SUCCESS:
        draft.authenticated = true;
        draft.createUserSuccess = true;
        draft.logInSuccess = true;
        draft.user = action.user;
        Storage.set('user', action.user.id);
        return;
    }
  });

export { Users, GetUser, CreateUser, LoginUser };
