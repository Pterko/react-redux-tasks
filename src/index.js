import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { TasksPage } from "./components/TasksPage";
import store from "./store";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

ReactDOM.render(
  <Provider store={store.makeStore()}>
    <TasksPage />
  </Provider>,
  document.getElementById("root")
);
