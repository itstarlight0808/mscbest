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