import React from "react";
import ReactDOM from "react-dom";
import jwtDecode from "jwt-decode";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import signupReducer from "./store/reducers/signup";
import loginReducer from "./store/reducers/login";
import authReducer from "./store/reducers/auth";
import { setCurrentUser, logout } from "./store/actions/auth";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : null || compose;

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  auth: authReducer
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
