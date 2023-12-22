import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../utils/http-client";
import { addNewError } from "./errorSlice";

const settingSlice = createSlice({
    name: "setting",
    initialState: {
        studio: {}
    },
    reducers: {
        setStudioSetting: (state, action) => {
            state.studio = action.payload;
        },
        updateStudioSetting: (state, action) => {
            state.studio = {...state.studio, ...action.payload};
        }
    }
})

export const { setStudioSetting, updateStudioSetting } = settingSlice.actions;
export default settingSlice.reducer;

export const getStudioSettingAPI = dispatch => {
    httpClient.get("/settings/getStudioSetting").then(res => {
        dispatch(setStudioSetting(res.data));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Get Studio Setting",
            msg: err.response.data.msg
        }))
    })
}

export const updateStudioSettingAPI = (params = {}) => dispatch => {
    httpClient.put("/settings/updateStudioSetting", params).then(res => {
        dispatch(updateStudioSetting(params));
        dispatch(addNewError({
            status: true,
            title: "Update Studio Setting",
            msg: "Success!"
        }))
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Update Studio Setting",
            msg: err.response.data.msg
        }))
    })
}

export const getTeacherBioSettingAPI = (cb = null) => dispatch => {
    httpClient.get("/settings/getTeacherBioSetting").then(res => {
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Get Teacher Bio Setting",
            msg: err.response.data.msg
        }))
    })
}

export const updateTeacherBioSettingAPI = (params = {}, cb = null) => dispatch => {
    httpClient.put("/settings/updateTeacherBioSetting", params).then(res => {
        dispatch(addNewError({
            status: true,
            title: "Update Teacher Bio Setting",
            msg: "Success!"
        }))
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Update Teacher Bio Setting",
            msg: err.response.data.msg
        }))
    })
}

export const getInvoiceSettingAPI = (cb = null) => dispatch => {
    httpClient.get("/settings/getInvoiceSetting").then(res => {
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Get Invoice Setting",
            msg: err.response.data.msg
        }))
    })
}

export const updateInvoiceSettingAPI = (params = {}, cb = null) => dispatch => {
    httpClient.put("/settings/updateInvoiceSetting", params).then(res => {
        dispatch(addNewError({
            status: true,
            title: "Update Invoice Setting",
            msg: "Success!"
        }))
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Update Invoice Setting",
            msg: err.response.data.msg
        }))
    })
}