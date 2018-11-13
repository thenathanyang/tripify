import { replace } from "connected-react-router";
import Storage from "storage";

///////////////////////////////////////////////////////////////////////////////
//                       Contants and helper functions                       //
///////////////////////////////////////////////////////////////////////////////

/**
 * Universal error handling, finally!
 *
 * @param dispatch the dispatch function to dispatch events
 * @param err the error object thrown by axios
 * @param fn the action to call with the processed error
 */
const handleAxiosError = (dispatch, err, fn) => {
  let e = "A network error occurred: Check your internet connection";
  let status = 0;
  if (err.response && err.response.data) {
    e = err.response.data.message || `Unknown error: ${err.statusText}`;
    status = err.response.status;
  }
  dispatch(fn(e));
};

export { handleAxiosError };
