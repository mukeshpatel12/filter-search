import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { employees } from "./reducers";
import App from "./containers/App";
import './assets/styles/global.css';
import "bootstrap/dist/css/bootstrap.css";

const store = createStore(employees);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
