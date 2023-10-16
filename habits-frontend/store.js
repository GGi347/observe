import { configureStore } from "@reduxjs/toolkit";
import habitSlice from "./src/features/habits/habitSlice";
import calendarSlice from "./src/features/habits/calendarSlice";
import userSlice from "./src/features/habits/userSlice";
import miscellaneousSlice from "./src/features/habits/miscellaneousSlice";
import graphSlice from "./src/features/habits/graphSlice";

const store = configureStore({
  reducer: {
    habits: habitSlice,
    calendar: calendarSlice,
    user: userSlice,
    miscellaneous: miscellaneousSlice,
    graph: graphSlice,
  },
});

export default store;
