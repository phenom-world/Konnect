import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import profile from "./profileReducer";
import status from "./statusReducer";
import homePosts from "./postReducer";
import modal from "./modalReducer";
import detailPost from "./detailPostReducer";
import discover from "./discoverReducer";
import suggestions from "./suggestionsReducer";
import socket from "./socketReducer";
import notify from "./notifyReducer";
import message from "./messageReducer";
import online from "./onlineReducer";
import call from "./callReducer";
import peer from "./peerReducer";

const reducer = combineReducers({
  auth,
  profile,
  status,
  modal,
  socket,
  notify,
  homePosts,
  detailPost,
  call,
  online,
  discover,
  suggestions,
  message,
  alert,
  theme,
  peer,
});

export const rootReducer = (state, action) => {
  if (action.type === "logout") {
    localStorage.removeItem("firstLogin");
    state = undefined;
  }
  return reducer(state, action);
};
