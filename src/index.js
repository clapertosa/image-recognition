import React from "react";
import ReactDOM from "react-dom";
import jwtDecode from "jwt-decode";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  signupReducer,
  validateReducer,
  loginReducer,
  userReducer,
  recognitionReducer
} from "./store/reducers";
import { setCurrentUser, logout } from "./store/actions/user";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : null || compose;

const rootReducer = combineReducers({
  signup: signupReducer,
  validate: validateReducer,
  login: loginReducer,
  user: userReducer,
  recognition: recognitionReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

if (localStorage.token) {
  const user = jwtDecode(localStorage.token);
  const currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    store.dispatch(logout());
  } else {
    store.dispatch(setCurrentUser(user));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
