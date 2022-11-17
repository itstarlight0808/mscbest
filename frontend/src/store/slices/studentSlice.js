import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../utils/http-client";
import { addNewError } from "./errorSlice";

const studentSlice = createSlice({
    name: "students",
    initialState: {
        studentList: []
    },
    reducers: {
        setStudentList: (state, action) => {
            state.studentList = action.payload;
        }
    }
})

export const { setStudentList } = studentSlice.actions;
export default studentSlice.reducer;

export const searchStudentAPI = searchStr => dispatch => {
    httpClient.post("/students/searchStudents", { searchStr }).then(res => {
        dispatch(setStudentList(res.data));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Search student by Email",
            msg: err.response.statusText
        }))
    })
}

export const getMyTeachersAPI = (cb = null) => dispatch => {
    httpClient.get("/students/getMyTeachers").then(res => {
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Get my teachers",
            msg: err.response.statusText
        }))
    })
}