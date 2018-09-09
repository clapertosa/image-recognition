import * as actionTypes from "./actionTypes";
import axios from "../../axiosInstance";
import jwtDecode from "jwt-decode";
import { setCurrentUser } from "./auth";

export const loginInit = () => {
  return {
    type: actionTypes.LOGIN_INIT
  };
};

export const login = user => {
  return dispatch => {
    dispatch(loginInit());
    axios
      .post("/api/login", user)
      .then(response => {
        const decodedUser = jwtDecode(response.data.token);
        localStorage.setItem("token", response.data.token);
        dispatch(setCurrentUser(decodedUser));
        dispatch(loginCompleted(response.data));
      })
      .catch(error => {
        dispatch(loginFailed(error.response.data));
      });
  };
};

export const loginCompleted = success => {
  return {
    type: actionTypes.LOGIN_COMPLETED,
    payload: success
  };
};

export const loginFailed = error => {
  return {
    type: actionTypes.LOGIN_FAILED,
    payload: error
  };
};
