import * as actionTypes from "../actions/actionTypes";

const initialState = {
  email: "",
  exp: undefined,
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        email: action.payload.email,
        exp: action.payload.exp,
        isAuthenticated: true
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        email: "",
        exp: undefined,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default reducer;
