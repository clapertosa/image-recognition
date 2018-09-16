import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const recognitionInit = () => {
  return {
    type: actionTypes.RECOGNITION_INIT
  };
};

export const facesRecognition = formData => {
  return dispatch => {
    dispatch(recognitionInit());
    axios
      .post("/api/recognition/faces", formData)
      .then(response => dispatch(recognitionCompleted(response.data)))
      .catch(error => dispatch(recognitionFailed(error.response.data)));
  };
};

export const describeImage = formData => {
  return dispatch => {
    dispatch(recognitionInit());
    axios
      .post("/api/recognition/describe", formData)
      .then(response => dispatch(recognitionCompleted(response.data)))
      .catch(error => dispatch(recognitionFailed(error.response.data)));
  };
};

export const detectObjects = formData => {
  return dispatch => {
    dispatch(recognitionInit());
    axios
      .post("/api/recognition/detect", formData)
      .then(response => dispatch(recognitionCompleted(response.data)))
      .catch(error => dispatch(recognitionFailed(error.response.data)));
  };
};

export const nsfw = formData => {
  return dispatch => {
    dispatch(recognitionInit());
    axios
      .post("/api/recognition/nsfw", formData)
      .then(response => dispatch(recognitionCompleted(response.data)))
      .catch(error => dispatch(recognitionFailed(error.response.data)));
  };
};

export const recognitionReset = () => {
  return {
    type: actionTypes.RECOGNITION_RESET
  };
};

export const recognitionCompleted = data => {
  return {
    type: actionTypes.RECOGNITION_COMPLETED,
    payload: data
  };
};

export const recognitionFailed = error => {
  return {
    type: actionTypes.RECOGNITION_FAILED,
    payload: error
  };
};
