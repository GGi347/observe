import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

const CalendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    increaseMonth(state, action) {
      if (state.month + 1 > 11) {
        state.year = state.year + 1;
        state.month = 0;
      } else {
        state.month = state.month + 1;
      }
      console.log("Increase month", state.month);
    },
    decreaseMonth(state, action) {
      if (state.month - 1 < 0) {
        state.year = state.year - 1;
        state.month = 11;
      } else {
        state.month = state.month - 1;
      }
      console.log("Decrease month", state.month);
    },
  },
});

export const { increaseMonth, decreaseMonth } = CalendarSlice.actions;

export default CalendarSlice.reducer;
