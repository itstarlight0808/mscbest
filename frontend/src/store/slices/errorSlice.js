import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: {
        errorList: []
    },
    reducers: {
        addNewError: (state, action) => {
            state.errorList.push(action.payload);
        },
        deleteError: (state, action) => {
            state.errorList = state.errorList.splice(action.payoad);
        }
    }
})

export const { addNewError, deleteError } = errorSlice.actions;
export default errorSlice.reducer;