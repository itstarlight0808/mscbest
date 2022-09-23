import { configureStore } from "@reduxjs/toolkit";
import Cookie from 'js-cookie';
import { COOKIE_KEY } from "../config/index";

import userReducer from "./slices/userSlice";
import errorReducer from "./slices/errorSlice";
import classReducer from "./slices/classSlice";
import teacherReducer from "./slices/teacherSlice";
import studentReducer from "./slices/studentSlice";


const userInfo = Cookie.getJSON(COOKIE_KEY.USER_INFO) || null;
console.log("Cookie Info", userInfo);
const initialState = {
  user: { userInfo, loading: false },
};
const store = configureStore(
  {
    reducer: {
      user: userReducer,
      teacher: teacherReducer,
      student: studentReducer,
      error: errorReducer,
      classes: classReducer
    },
    preloadedState: initialState
  }
);

export default store;
