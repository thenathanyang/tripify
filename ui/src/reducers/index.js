import { connectRouter, routerMiddleware } from "connected-react-router";
import createHistory from "history/createBrowserHistory";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

const history = createHistory();
const store = createStore(
  connectRouter(history)(
    combineReducers({
      // add reducers here
    })
  ),
  compose(applyMiddleware(routerMiddleware(history), thunk))
);

export { store, history };
