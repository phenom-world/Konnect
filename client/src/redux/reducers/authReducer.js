import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = { loading: false };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return { state, ...action.payload };
    case "SET_AUTH_LOADING":
      return { ...state, loading: action.payload };
    case "logout":
      return {};

    default:
      return state;
  }
};

export default authReducer;
