import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "ALL",
};

const fiterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = fiterSlice.actions;
export default fiterSlice.reducer;
