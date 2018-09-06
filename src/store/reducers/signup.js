import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  success: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_INIT:
      return {
        ...state,
        loading: true,
        error: null,
        success: null
      };
    case actionTypes.SIGNUP_COMPLETED:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null
      };
    case actionTypes.SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        success: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
