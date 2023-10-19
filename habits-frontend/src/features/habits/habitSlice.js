import { createSlice } from "@reduxjs/toolkit";
import { useGetHabitDetail } from "../../hooks/useGetHabitDetail";

const initialState = {
  habits: [],
  habitDetails: [],
};

const HabitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    receive(state, action) {
      state.habits = action.payload;
      console.log("REVCEVOE", state.habits);
    },
    add(state, action) {
      state.habits = [...state.habits, action.payload];
    },
    remove(state, action) {
      state.habits = state.habits.filter(
        (habit) => habit.name !== action.payload
      );
    },
    addHabitDetails(state, action) {
      console.log("In slice addHD", action.payload);
      state.habitDetails = [...action.payload];
    },

    deleteHabitDetails(state, action) {
      if (state.habitDetails.length > 0) {
        console.log("dispatch", action.payload);
        state.habitDetails = state.habitDetails.filter((habitDetail) => {
          return habitDetail != action.payload;
        });
      }
      console.log("deleted", state.habitDetails);
    },

    // changeMonth(state, action) {
    //   state.month = action.payload;
    // },
  },
});

export const {
  receive,
  add,
  remove,
  addHabitDetails,
  deleteHabitDetails,
  changeMonth,
} = HabitSlice.actions;

export default HabitSlice.reducer;
