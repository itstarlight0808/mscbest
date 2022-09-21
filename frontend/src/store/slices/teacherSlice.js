import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../utils/http-client";

const teacherSlice = createSlice({
    name: "teachers",
    initialState: {
        myStudents: []
    },
    reducers: {
        setMyStudents: (state, action) => {
            state.myStudents = action.payload;
        }
    }
});

export const { setMyStudents } = teacherSlice.actions;
export default teacherSlice.reducer;

export const getMyStudents = dispatch => {
    httpClient.get("/teachers/getMyStudents").then(res => {
        dispatch(setMyStudents(res.data));
    })
}