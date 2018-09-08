import * as actionTypes from "./actionTypes";

export const setCurrentUser = user => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGOUT
  };
};
