import httpClient from "../../utils/http-client";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../types";
import { COOKIE_KEY } from "../../config/index";

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await httpClient.put("/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set(COOKIE_KEY.USER_INFO, data);
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await httpClient.post("/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set(COOKIE_KEY.USER_INFO, data);
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await httpClient.post("/users/register", { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set(COOKIE_KEY.USER_INFO, data);
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove(COOKIE_KEY.USER_INFO);
  dispatch({ type: USER_LOGOUT })
}
export { signin, register, logout, update };