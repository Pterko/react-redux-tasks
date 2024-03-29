import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { createStateSyncMiddleware } from "redux-state-sync";

import userReducer, { userInitialState } from "./user";
import tasksReducer, { tasksInitialState } from "./tasks";

const initialState = {
  user: userInitialState,
  tasks: tasksInitialState
};

const reducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer
});

const config = {
  whitelist: ["LOGIN_SUCCESS", "LOGOUT"]
};

const middlewares = [thunkMiddleware, createStateSyncMiddleware(config)];

if (process.env.NODE_ENV === "dev") {
  middlewares.push(logger);
}

const makeStore = (initState = initialState) => {
  return createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export default { makeStore };
