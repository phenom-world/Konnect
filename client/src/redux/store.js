import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import { setupAxios } from "../utils/fetchData";

export const store = configureStore({
  reducer: rootReducer,
  devTools: composeWithDevTools(applyMiddleware(thunk)),
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
  ],
});

setupAxios(axios, store);
const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
