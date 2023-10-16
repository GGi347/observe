import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  isCurrDate: false,
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
    // setIsCurrDate(state, action) {
    //   const date = new Date();

    //   if (
    //     state.month === date.getMonth() &&
    //     state.year === date.getFullYear() &&
    //     action.payload + 1 === date.getDate()
    //   ) {
    //     state.isCurrDate = true;
    //   } else {
    //     state.isCurrDate = false;
    //   }
    //   console.log("callled", state.isCurrDate, action.payload);
    // },
  },
});

export const { increaseMonth, decreaseMonth, setIsCurrDate } =
  CalendarSlice.actions;

export default CalendarSlice.reducer;
