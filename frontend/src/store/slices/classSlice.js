import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../utils/http-client";
import moment from "moment";

import { addNewError } from "./errorSlice";

const classSlice = createSlice({
    name: "classes",
    initialState: {
        classList: []
    },
    reducers: {
        setClassList: (state, action) => {
            state.classList = action.payload;
        },
        addClassSchedule: (state, action) => {
            const { classId, schedule } = action.payload;

            const oneClass = state.classList.find(one => one.id === classId);
            oneClass.schedule.push(schedule);
        },
        deleteClassSchedule: (state, action) => {
            const { selected, scheduleId } = action.payload;

            state.classList[selected].schedule = state.classList[selected].schedule.filter(one => one.id !== scheduleId);
        },
        bookClass: (state, action) => {
            const { classId, participant } = action.payload;

            const selClass = state.classList.find(one => one.id === classId);
            selClass.isBooked = true;
            selClass.participants.push(participant);
        },
        cancelBook: (state, action) => {
            const { classId, participantId } = action.payload;

            const selClass = state.classList.find(one => one.id === classId);
            selClass.isBooked = false;
            selClass.participants = selClass.participants.filter(one => one.studentId !== participantId);
        }
    }
});

export const { setClassList, addClassSchedule, deleteClassSchedule, bookClass, cancelBook } = classSlice.actions;
export default classSlice.reducer;

export const getClassListAPI = async dispatch => {
    httpClient.get("/classes/").then(res => {
        let data = res.data;
        dispatch(setClassList(data));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Fetching Class List",
            msg: err.response.data.msg
        }))
    })
}

export const getClassByIdAPI = (params = {}, cb = null) => dispatch => {
    httpClient.get(`/classes/${params.classId}`).then(res => {
        if(cb)
            cb(res);
    }, err=> {
        dispatch(addNewError({
            status: false,
            title: "Fetching Class",
            msg: err.response.data.msg
        }))
    })
}

export const addClassScheduleAPI = (params = {}, cb = null) => dispatch => {
    const { classId, startDate } = params;

    httpClient.post("/classes/schedule/add", { classId, startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss A") }).then(res => {
        dispatch(addClassSchedule({ classId, schedule: {...res.data, startDate: startDate.utc().format()} }))
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Adding Schedule",
            msg: err.response.data.msg
        }));
    })
}

export const deleteClassScheduleAPI = (params = {}, cb = null) => dispatch => {
    const { selected, scheduleId } = params;
    httpClient.delete(`/classes/schedule/delete/${scheduleId}`).then(res => {
        if(res.status === 200) {
            dispatch(deleteClassSchedule({ selected, scheduleId }));
        }
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Deleting Schedule",
            msg: err.response.data.msg
        }))
    })
}

export const doBookingAPI = (params = {}, cb = null) => dispatch => {
    const { classId, groupId } = params;
    httpClient.post(`/classes/${classId}/book`, { groupId }).then(res => {
        dispatch(bookClass({ classId, participant: res.data }));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Booking Class",
            msg: err.response.data.msg
        }))
    })
}

export const cancelBookingAPI = (params = {}, cb = null) => dispatch => {
    const { classId } = params;
    httpClient.delete(`/classes/${classId}/cancelBooking`).then(res => {
        dispatch(cancelBook({ classId, participantId: res.data.userId }));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Cancel Booking",
            msg: err.response.data.msg
        }))
    })
}