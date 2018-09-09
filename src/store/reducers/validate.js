import * as actionTypes from "../actions/actionTypes";

const initialState = {
  success: undefined,
  error: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VALIDATE_INIT:
      return {
        ...state,
        error: false,
        loading: true
      };
    case actionTypes.VALIDATE_COMPLETED:
      return {
        ...state,
        success: action.payload,
        error: false,
        loading: false
      };
    case actionTypes.VALIDATE_FAILED:
      return {
        ...state,
        success: false,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
