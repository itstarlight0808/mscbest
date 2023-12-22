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
            msg: err.response.data.msg
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
            msg: err.response.data.msg
        }))
    })
}

export const getInvitationToDBInfoAPI = (id, cb = null) => dispatch => {
    httpClient.get(`/students/getInvitationToDBInfo/${id}`).then(res => {
        if(cb)
            cb(res)
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Get Invitation Detail",
            msg: err.response.data.msg
        }))
    })
}

export const acceptInvitationToDBAPI = (id, cb = null) => dispatch => {
    httpClient.post("/students/acceptInvitationToDB", { id }).then(res => {
        if(cb)
            cb(res)
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Accept Invitation To DB",
            msg: err.response.data.msg
        }))
    })
}