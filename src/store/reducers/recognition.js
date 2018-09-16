import * as actionTypes from "../actions/actionTypes";
const initialState = {
  loading: false,
  error: undefined,
  success: null,
  data: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECOGNITION_INIT:
      return {
        ...state,
        loading: true,
        error: undefined,
        success: null,
        data: null
      };
    case actionTypes.RECOGNITION_COMPLETED:
      return {
        ...state,
        loading: false,
        error: undefined,
        success: true,
        data: action.payload
      };
    case actionTypes.RECOGNITION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        data: null
      };
    case actionTypes.RECOGNITION_RESET:
      return {
        ...state,
        loading: false,
        error: undefined,
        success: null,
        data: null
      };
    default:
      return state;
  }
};

export default reducer;
