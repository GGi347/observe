import { configureStore } from "@reduxjs/toolkit";
import habitSlice from "./src/features/habits/habitSlice";
import calendarSlice from "./src/features/habits/calendarSlice";

const store = configureStore({
  reducer: {
    habits: habitSlice,
    calendar: calendarSlice,
  },
});

export default store;
