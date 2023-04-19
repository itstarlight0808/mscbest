import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../utils/http-client";
import { addNewError } from "./errorSlice";

const teacherSlice = createSlice({
    name: "teachers",
    initialState: {
        teacherList: [],
        myStudents: [],
        classGroups: []
    },
    reducers: {
        setTeacherList: (state, action) => {
            state.teacherList = action.payload;
        },
        setMyStudents: (state, action) => {
            state.myStudents = action.payload;
        },
        setClassGroups: (state, action) => {
            state.classGroups = action.payload;
        }
    }
});

export const { setTeacherList, setMyStudents, setClassGroups } = teacherSlice.actions;
export default teacherSlice.reducer;

export const getTeacherListAPI = dispatch => {
    httpClient.get("/teachers").then(res => {
        dispatch(setTeacherList(res.data));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Fetching Teacher List",
            msg: err.response.data.msg
        }))
    })
}

export const getMyStudents = (params = {}) => dispatch => {
    httpClient.get("/teachers/getMyStudents", { params }).then(res => {
        dispatch(setMyStudents(res.data));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Fetching My Students",
            msg: err.response.data.msg
        }))
    })
}

export const addMyStudent = ({ studentEmail, groupId, status }, cb = null) => dispatch => {
    httpClient.post("/teachers/addMyStudent", { studentEmail, groupId, status }).then(res => {
        dispatch(getMyStudents());
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Add My Student",
            msg: err.response.data.msg
        }));
    })
}
export const updateMyStudent = ({ id, groupId, status }, cb = null) => dispatch => {
    httpClient.post("/teachers/updateMyStudent", { id, groupId, status }).then(res => {
        dispatch(getMyStudents());
        if(cb)
            cb(res);
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Update My Student",
            msg: err.response.data.msg
        }));
    })
}
export const deleteMyStudent = ({ ids }) => dispatch => {
    httpClient.post("/teachers/deleteMyStudents", { ids }).then(res => {
        dispatch(getMyStudents());
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Delete My Student",
            msg: err.response.data.msg
        }));
    })
}

export const getAllClassGroupsAPI = dispatch => {
    httpClient.get("/teachers/getAllClassGroups").then(res => {
        dispatch(setClassGroups(res.data));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Get All Class Groups",
            msg: err.response.data.msg
        }))
    })
}