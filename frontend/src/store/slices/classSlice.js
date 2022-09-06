import { createSlice } from "@reduxjs/toolkit";

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
            const { selected, schedule } = action.payload;

            state.classList[selected].schedule.push(schedule);
        },
        deleteClassSchedule: (state, action) => {
            const { selected, scheduleId } = action.payload;

            state.classList[selected].schedule = state.classList[selected].schedule.filter(one => one.id !== scheduleId);
        }
    }
});

export const { setClassList, addClassSchedule, deleteClassSchedule } = classSlice.actions;
export default classSlice.reducer;