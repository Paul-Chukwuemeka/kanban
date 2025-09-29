import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { value: true },
  reducers: {
    toggleSidebar: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
