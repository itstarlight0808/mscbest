import { configureStore } from "@reduxjs/toolkit";
import Cookie from 'js-cookie';
import { COOKIE_KEY } from "../config/index";

import userReducer from "./slices/userSlice";
import errorReducer from "./slices/errorSlice";


const userInfo = Cookie.getJSON(COOKIE_KEY.USER_INFO) || null;
console.log("Cookie Info", userInfo);
const initialState = {
  user: { userInfo, loading: false },
};
const store = configureStore(
  {
    reducer: {
      user: userReducer,
      error: errorReducer,
    },
    preloadedState: initialState
  }
);

export default store;
