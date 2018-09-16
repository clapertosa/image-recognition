import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const validateInit = () => {
  return {
    type: actionTypes.VALIDATE_INIT
  };
};

export const validate = token => {
  return dispatch => {
    dispatch(validateInit());

    axios
      .post(`/api/signup/validate${token}`)
      .then(response => dispatch(validateCompleted(response.data)))
      .catch(error => dispatch(validateFailed(error.response.data)));
  };
};

export const validateCompleted = data => {
  return {
    type: actionTypes.VALIDATE_COMPLETED,
    payload: data
  };
};

export const validateFailed = error => {
  return {
    type: actionTypes.VALIDATE_FAILED,
    payload: error
  };
};
