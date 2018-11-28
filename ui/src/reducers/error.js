import { replace } from "connected-react-router";
import Storage from "storage";

import { LOGOUT } from "./users";

///////////////////////////////////////////////////////////////////////////////
//                       Constants and helper functions                      //
///////////////////////////////////////////////////////////////////////////////

/**
 * Universal error handling, finally!
 *
 * @param dispatch the dispatch function to dispatch events
 * @param err the error object thrown by axios
 * @param fn the action to call with the processed error
 * @param logoutOnFailure logs out the user if a failure occured
 */
const handleAxiosError = (dispatch, err, fn, logoutOnFailure = true) => {
  let e = "A network error occurred: Check your internet connection";
  let status = 0;
  if (err.response && err.response.data) {
    e = err.response.data.error || `Unknown error: ${err.statusText}`;
    status = err.response.status;
  }
  dispatch(fn(e));
  const authFail = (status === 401 || status === 403 || status === 404);
  if (authFail && logoutOnFailure) {
    dispatch({ type: LOGOUT });
  }
};

export { handleAxiosError };
