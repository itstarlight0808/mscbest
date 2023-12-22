import { createSlice } from "@reduxjs/toolkit";
import httpClient from "../../utils/http-client";
import { addNewError } from "./errorSlice";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        systemNotificationList: [],
        personalNotificationList: []
    },
    reducers: {
        setSystemNotificationList: (state, action) => {
            state.systemNotificationList = action.payload;
        },
        addSystemNotification: (state, action) => {
            state.systemNotificationList.push(action.payload);
        },
        deleteSystemNotification: (state, action) => {
            const { notificationId } = action.payload;
            let index = state.systemNotificationList.findIndex(notification => notification.id === notificationId);
            state.systemNotificationList.splice(index, 1);
        },
        setPersonalNotificationList: (state, action) => {
            state.personalNotificationList = action.payload;
        },
        addPersonalNotification: (state, action) => {
            state.personalNotificationList.push(action.payload);
        },
        deletePersonalNotification: (state, action) => {
            const { notificationId } = action.payload;
            let index = state.personalNotificationList.findIndex(notification => notification.id === notificationId);
            state.personalNotificationList.splice(index, 1);
        },
        markAsRead: (state, action) => {
            const { notificationId, isSystem } = action.payload;
            let notification = isSystem? state.systemNotificationList.find(notification => notification.id === notificationId)
                : state.personalNotificationList.find(notification => notification.id === notificationId);
            notification.isRead = 1;
        }
    }
})

export const { setSystemNotificationList, setPersonalNotificationList, addPersonalNotification, addSystemNotification, deletePersonalNotification, deleteSystemNotification, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;

export const getNotificationListAPI = async dispatch => {
    httpClient.get("/notifications/").then(res => {
        dispatch(setSystemNotificationList(res.data.systemNotifications));
        dispatch(setPersonalNotificationList(res.data.personalNotifications));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Fetching Notification List",
            msg: err.response.data.msg
        }))
    })
}

export const deleteNotificationAPI = (params = {}) => dispatch => {
    const { notificationId, isSystem } = params;

    httpClient.delete(`/notifications/${notificationId}`).then(res => {
        isSystem? dispatch(deleteSystemNotification({ notificationId })): dispatch(deletePersonalNotification({ notificationId }));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Deleting Notification",
            msg: err.response.data.msg
        }))
    })
}

export const markAsReadAPI = (params = {}) => dispatch => {
    const { notificationId, isSystem } = params;

    httpClient.post(`/notifications/${notificationId}/markAsRead`).then(res => {
        dispatch(markAsRead({ notificationId, isSystem }));
    }, err => {
        dispatch(addNewError({
            status: false,
            title: "Mark As Read about Notification",
            msg: err.response.data.msg
        }))
    })
}