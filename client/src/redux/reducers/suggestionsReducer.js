import { PROFILE_TYPES } from "../actions/profileAction";
import { SUGGES_TYPES } from "../actions/suggestionsAction";

const initialState = {
  loading: false,
  users: [],
};

const suggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUGGES_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PROFILE_TYPES.FOLLOW:
      return {
        ...state,
        users: state.users.filter((x) => x._id !== action.payload._id),
      };
    case SUGGES_TYPES.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};

export default suggestionsReducer;
