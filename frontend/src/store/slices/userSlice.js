import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import httpClient from "../../utils/http-client";

import { COOKIE_KEY } from "../../config/index";
import { getNotificationListAPI } from "../slices/notificationSlice";
import { addNewError } from "../slices/errorSlice";
import { getStudioSettingAPI } from "./settingSlice";

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
            Cookie.set(COOKIE_KEY.USER_LOCALE, action.payload);
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            Cookie.set(COOKIE_KEY.USER_INFO, state.userInfo);
        },
        setIsRegistered: (state, action) => {
            state.isRegistered = action.payload.registered;
        },
        userLogOut: (state, action) => {
            Cookie.remove(COOKIE_KEY.USER_INFO);
            Cookie.remove(COOKIE_KEY.USER_LOCALE);

            return {loading: false};
        }
    }
});

export const { setUserLocale, setLoadingStatus, setUserInfo, setIsRegistered, userLogOut } = userSlice.actions;
export default userSlice.reducer;

export const getUserLocale = () => (dispatch, getState) => {
    httpClient.get('https://ipapi.co/json/').then(function (res) {
        dispatch(setUserLocale(res.data));
        console.log(res.data);
    });
}

/**
 * triggers after sign in or browser reload while sign in
 * @param {*} dispatch 
 */
export const afterSignin = (accountType, isAdmin) => dispatch => {
    if(!isAdmin && accountType === 1)       // in case of teacher
        dispatch(getStudioSettingAPI);
    dispatch(getNotificationListAPI);
}

export const userSignin = (params = {}, cb = null) => async (dispatch, getState) => {
    const { email, password } = params;

    dispatch(setLoadingStatus(true));
    const res = await httpClient.post("/users/signin", { email, password }).then(res => {
        dispatch(setUserInfo(res.data));
        dispatch(getUserLocale());
        dispatch(afterSignin(res.data.accountType, res.data.isAdmin));
        if(cb)
            cb(res);
    }, error => {
        console.log(error.response)
        dispatch(addNewError({
            status: false,
            title: "SignIn",
            msg: error.response.data.msg
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
            status: false,
            title: "User Update",
            msg: error.response.data.msg
        }));
    });
    dispatch(setLoadingStatus(false));
}
export const userRegister = (params, cb = null) => async dispatch =>  {
    dispatch(setLoadingStatus(true));
    await httpClient.post("/users/register", params).then(res => {
        dispatch(setIsRegistered(res.data));
        if(cb)
            cb(res);
    }, error => {
        dispatch(addNewError({
            status: false,
            title: "Registration",
            msg: error.response.data.msg
        }));
    });
    dispatch(setLoadingStatus(false));
}

export const updateMyProfile = (params, cb = null) => dispatch => {
    httpClient.put("/users/updateProfile", params).then(res => {
        dispatch(setUserInfo(res.data));
        dispatch(addNewError({
            status: true,
            title: "Update Profile",
            msg: "Success!"
        }))
    }, error => {
        dispatch(addNewError({
            status: false,
            title: "Update Profile",
            msg: error.response.data.msg
        }))
    })
}

export const changeMyPassword = (params, cb = null) => dispatch => {
    httpClient.put("/users/changePassword", params).then(res => {
        dispatch(addNewError({
            status: true,
            title: "Change password",
            msg: "Success!"
        }))
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Change password",
            msg: err.response.data.msg
        }))
    })
}