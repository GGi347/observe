import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFormOpen: false,
};

const MiscellaneousSlice = createSlice({
  initialState,
  name: "miscellaneous",
  reducers: {
    setIsFormOpen(state, action) {
      state.isFormOpen = action.payload;
    },
  },
});
export const { setIsFormOpen } = MiscellaneousSlice.actions;

export default MiscellaneousSlice.reducer;
