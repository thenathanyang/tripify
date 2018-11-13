import { connectRouter, routerMiddleware } from "connected-react-router";
import createHistory from "history/createHashHistory";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { Trips } from "./trips";

const history = createHistory();
const store = createStore(
  connectRouter(history)(
    combineReducers({
      // add reducers here
      Trips,
    })
  ),
  compose(applyMiddleware(routerMiddleware(history), thunk))
);

export { store, history };
