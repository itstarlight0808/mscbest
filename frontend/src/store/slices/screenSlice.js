import { createSlice } from "@reduxjs/toolkit";

const screenSlice = createSlice({
    name: "screen",
    initialState: {
        isSidebarOpen: true
    },
    reducers: {
        setSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload;
        }
    }
})

export const { setSidebarOpen } = screenSlice.actions;
export default screenSlice.reducer;