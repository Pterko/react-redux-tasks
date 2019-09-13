import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";

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

const middlewares = [thunkMiddleware, logger];

const makeStore = (initState = initialState) => {
  return createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export default { makeStore };
