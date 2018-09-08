import * as actionTypes from "../actions/actionTypes";
const initialState = {
  loading: false,
  success: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_INIT:
      return {
        ...state,
        loading: true,
        success: null,
        error: null
      };
    case actionTypes.LOGIN_COMPLETED:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: null
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
