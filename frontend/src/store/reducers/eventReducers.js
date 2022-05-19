import { FETCH_EVENT_LIST, ADD_EVENT, UPDATE_EVENT, DELETE_EVENT } from "../types";

const eventReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_EVENT_LIST:
            state.event = action.payload;
            break;
        case ADD_EVENT:
            state.event.push(action.payload);
            break;
        case UPDATE_EVENT:
            let event = state.event.find(one => one._id === action.payload);
            event.status = !event.status;
            break;
        case DELETE_EVENT:
            let index = state.event.findIndex(one => one._id === action.payload);
            state.event.splice(index, 1);
            break;
        default:
            return state;
    }
    return {...state};
}

export default eventReducer;