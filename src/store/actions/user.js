import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const setCurrentUser = user => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};

export const addRecognition = () => {
  return dispatch => {
    axios
      .put("/api/recognition/add", null, {
        headers: { Authorization: localStorage.token }
      })
      .then(response =>
        dispatch(addRecognitionCompleted(response.data.recognitions))
      )
      .catch(error => dispatch(addRecognitionFailed(error)));
  };
};

export const addRecognitionCompleted = recognitions => {
  return {
    type: actionTypes.ADD_RECOGNITION_COMPLETED,
    payload: recognitions
  };
};

export const addRecognitionFailed = error => {
  return {
    type: actionTypes.ADD_RECOGNITION_FAILED,
    payload: error
  };
};

export const getRecognitions = () => {
  return dispatch => {
    axios
      .post("/api/recognition/get", null, {
        headers: { Authorization: localStorage.token }
      })
      .then(response => {
        dispatch(setRecognitions(response.data));
      });
  };
};

export const setRecognitions = recognitions => {
  return {
    type: actionTypes.SET_RECOGNITIONS,
    payload: recognitions
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGOUT
  };
};
