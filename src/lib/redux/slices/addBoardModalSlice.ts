import { createSlice } from "@reduxjs/toolkit";

const addBoardModalSlice = createSlice({
  name: "addBoardModal",
  initialState: { value: false },
  reducers: {
    toggleAddBoardModal: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleAddBoardModal } = addBoardModalSlice.actions;
export const addBoardModalReducer = addBoardModalSlice.reducer;
