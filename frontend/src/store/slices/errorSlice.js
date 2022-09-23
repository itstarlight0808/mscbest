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
            state.errorList.splice(action.payload, 1);
        }
    }
})

export const { addNewError, deleteError } = errorSlice.actions;
export default errorSlice.reducer;