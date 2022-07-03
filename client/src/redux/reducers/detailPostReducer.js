import { POST_TYPES } from "../actions/postTypes";

const initialState = {
  loading: true,
  details: {},
};
const detailPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.GET_POST:
      return { ...state, details: action.payload };
    case POST_TYPES.LOADING_DETAILS:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_TYPES.UPDATE_POST:
      return { ...state, details: action.payload };
    default:
      return state;
  }
};

export default detailPostReducer;
