import * as actionTypes from "../actions/actionTypes";

const initialState = {
  email: undefined,
  exp: undefined,
  isAuthenticated: false,
  activated: false,
  recognitions: undefined,
  error: undefined
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        email: action.payload.email,
        exp: action.payload.exp,
        isAuthenticated: true,
        activated: action.payload.activated,
        recognitions: action.payload.recognitions
      };
    case actionTypes.ADD_RECOGNITION_COMPLETED:
      return { ...state, recognitions: action.payload };
    case actionTypes.SET_RECOGNITIONS:
      return { ...state, recognitions: action.payload };
    case actionTypes.ADD_RECOGNITION_FAILED:
      return { ...state, error: action.payload };
    case actionTypes.LOGOUT:
      return {
        ...state,
        email: "",
        exp: undefined,
        isAuthenticated: false,
        recognitions: undefined
      };
    default:
      return state;
  }
};

export default reducer;
