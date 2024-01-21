import { configureStore } from "@reduxjs/toolkit";
import Cookie from 'js-cookie';
import { COOKIE_KEY } from "../config/index";

import userReducer from "./slices/userSlice";
import errorReducer from "./slices/errorSlice";
import classReducer from "./slices/classSlice";
import teacherReducer from "./slices/teacherSlice";
import studentReducer from "./slices/studentSlice";
import notificationReducer from "./slices/notificationSlice";
import settingReducer from "./slices/settingSlice";
import invoiceReducer from "./slices/invoiceSlice";
import transactionReducer from "./slices/transactionSlice";


const userInfo = Cookie.getJSON(COOKIE_KEY.USER_INFO) || null;
const userLocale = Cookie.getJSON(COOKIE_KEY.USER_LOCALE) || null;
console.log("Cookie Info", userInfo);
console.log("Cookie USER_LOCALE", userLocale);
const initialState = {
  user: { userInfo, userLocale, loading: false },
};
const store = configureStore(
  {
    reducer: {
      user: userReducer,
      teacher: teacherReducer,
      student: studentReducer,
      error: errorReducer,
      classes: classReducer,
      invoice: invoiceReducer,
      transaction: transactionReducer,
      notification: notificationReducer,
      setting: settingReducer
    },
    preloadedState: initialState
  }
);

export default store;
