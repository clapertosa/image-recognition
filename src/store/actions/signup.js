import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const signupInit = () => {
  return {
    type: actionTypes.SIGNUP_INIT
  };
};

export const signupReset = () => {
  return {
    type: actionTypes.SIGNUP_RESET
  };
};

export const signup = user => {
  return dispatch => {
    dispatch(signupInit());
    axios
      .post("/api/signup", user)
      .then(response => dispatch(signupCompleted(response.data)))
      .catch(error => dispatch(signupFailed(error.response.data)));
  };
};

export const signupCompleted = data => {
  return {
    type: actionTypes.SIGNUP_COMPLETED,
    payload: data
  };
};

export const signupFailed = error => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    payload: error
  };
};
