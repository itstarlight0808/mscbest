import { FETCH_EVENT_LIST, ADD_EVENT, UPDATE_EVENT, DELETE_EVENT } from "../types";
import httpClient from "../../utils/http-client";

export const fetchEventList = () => async (dispatch, getState) => {
    try {
        const {data} = await httpClient.get('/event');

        dispatch({type: FETCH_EVENT_LIST, payload: data.event});
    } catch(error) {
        
    }
}
export const addEvent = (eventName) => async (dispatch, getState) => {
    try {
        const {data} = await httpClient.post('/event', {name: eventName});

        dispatch({type: ADD_EVENT, payload: data});
    } catch(error) {

    }
}
export const deleteEvent = (id) => async (dispatch, getState) => {
    try {
        const {data} = await httpClient.delete(`/event/${id}`);

        dispatch({type: DELETE_EVENT, payload: id});
    } catch(error) {

    }
}

export const toggleEventStatus = (id) => async (dispatch, getState) => {
    try {
        const {data} = await httpClient.put(`/event/${id}`, {});

        dispatch({type: UPDATE_EVENT, payload: id});
    } catch(error) {

    }
}

export const followEvent = (eventId, user) => async (dispatch, getState) => {
    try {
        const {data} = await httpClient.put(`/event/${eventId}/toggleFollow`, {eventId, userId: user._id});

        dispatch(fetchEventList());
    } catch(error) {

    }
}

export const unfollowEvent = (eventId, userId) => async (dispatch, getState) => {
    try {
        const {data} = await httpClient.put(`/event/${eventId}/toggleFollow`, {eventId, userId});

        dispatch(fetchEventList());
    } catch(error) {

    }
}