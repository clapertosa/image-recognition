import * as actionTypes from "./actionTypes";
import axios from "axios";

export const signupInit = () => {
  return {
    type: actionTypes.SIGNUP_INIT
  };
};

export const signup = user => {
  return dispatch => {
    dispatch(signupInit());
    axios
      .post(
        `http${process.env.NODE_ENV === "production" ? "s" : ""}://${
          window.location.host
        }/api/signup`,
        user
      )
      .then(response => dispatch(signupCompleted(response.data)))
      .catch(error => dispatch(signupFailed(error.response.data)));
  };
};

export const signupCompleted = response => {
  return {
    type: actionTypes.SIGNUP_COMPLETED,
    payload: response
  };
};

export const signupFailed = error => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    payload: error
  };
};
