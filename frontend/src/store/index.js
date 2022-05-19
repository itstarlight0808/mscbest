import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { COOKIE_KEY } from "../config/index";

import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import eventReducer from "./reducers/eventReducers";


const userInfo = Cookie.getJSON(COOKIE_KEY.USER_INFO) || null;

const initialState = {
  userSignin: { userInfo },
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userEvent: eventReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
