import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataSetForYear: [],
};

const GraphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    addDataSetForYear(state, action) {
      state.dataSetForYear = action.payload;
    },
  },
});

export const { addDataSetForYear } = GraphSlice.actions;

export default GraphSlice.reducer;
