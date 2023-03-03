import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../utils/http-client";
import { addNewError } from "./errorSlice";

const teacherSlice = createSlice({
    name: "teachers",
    initialState: {
        myStudents: [], 
        classGroups: []
    },
    reducers: {
        setMyStudents: (state, action) => {
            state.myStudents = action.payload;
        },
        setClassGroups: (state, action) => {
            state.classGroups = action.payload;
        }
    }
});

export const { setMyStudents, setClassGroups } = teacherSlice.actions;
export default teacherSlice.reducer;

export const getMyStudents = dispatch => {
    httpClient.get("/teachers/getMyStudents").then(res => {
        dispatch(setMyStudents(res.data));
    })
}

export const addMyStudent = ({ studentId, groupId, status }, cb = null) => dispatch => {
    httpClient.post("/teachers/addMyStudent", { studentId, groupId, status }).then(res => {
        dispatch(getMyStudents);
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Error",
            msg: res.response.statusText
        }));
    })
}
export const updateMyStudent = ({ id, studentId, groupId, status }, cb = null) => dispatch => {
    httpClient.post("/teachers/updateMyStudent", { id, studentId, groupId, status }).then(res => {
        dispatch(getMyStudents);
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Error",
            msg: res.response.statusText
        }));
    })
}
export const deleteMyStudent = ({ ids }) => dispatch => {
    httpClient.post("/teachers/deleteMyStudents", { ids }).then(res => {
        dispatch(getMyStudents);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Error",
            msg: res.response.statusText
        }));
    })
}

export const getAllClassGroupsAPI = dispatch => {
    httpClient.get("/teachers/getAllClassGroups").then(res => {
        dispatch(setClassGroups(res.data));
    })
}