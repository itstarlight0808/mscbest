import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import httpClient from "../../utils/http-client";

import { COOKIE_KEY } from "../../config/index";
import { addNewError } from "../slices/errorSlice";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false
    },
    reducers: {
        setLoadingStatus: (state, action) => {
            state.loading = action.payload;
        },
        setUserLocale: (state, action) => {
            state.userLocale = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = {...action.payload};
            if(action.payload.registered)
                delete action.payload.registered;
            Cookie.set(COOKIE_KEY.USER_INFO, action.payload);
        },
        userLogOut: (state, action) => {
            Cookie.remove(COOKIE_KEY.USER_INFO);

            return {loading: false};
        }
    }
});

export const { setUserLocale, setLoadingStatus, setUserInfo, userLogOut } = userSlice.actions;
export default userSlice.reducer;

export const getUserLocale = () => (dispatch, getState) => {
    // httpClient.get('https://api.ipregistry.co/?key=tryout').then(function (res) {
    //     dispatch(setUserLocale(res.data));
    //     console.log(res.data.location.country.name + ', ' + res.data.location.city);
    // });
}
export const userSignin = (email, password) => async (dispatch, getState) => {
    dispatch(setLoadingStatus(true));
    const res = await httpClient.post("/users/signin", { email, password }).then(res => {
        dispatch(setUserInfo(res.data));
    }, error => {
        dispatch(addNewError({
            title: "SignIn",
            message: error.response.statusText
        }))
    });
    dispatch(setLoadingStatus(false));
}
export const userUpdate = (userId, params) => async dispatch => {
    dispatch(setLoadingStatus(true));
    const res = await httpClient.put("/users/" + userId, params).then(res => {
        dispatch(setUserInfo(res.data));
    }, error => {
        dispatch(addNewError({
            title: "User Update",
            message: error.response.statusText
        }));
    });
    dispatch(setLoadingStatus(false));
}
export const userRegister = params => async dispatch =>  {
    dispatch(setLoadingStatus(true));
    await httpClient.post("/users/register", params).then(res => {
        dispatch(setUserInfo(res.data));
    }, error => {
        dispatch(addNewError({
            title: "Registration",
            message: error.response.data.message
        }));
    });
    dispatch(setLoadingStatus(false));
}