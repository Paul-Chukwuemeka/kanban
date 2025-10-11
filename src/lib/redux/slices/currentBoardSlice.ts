import { createSlice } from "@reduxjs/toolkit";

const currentBoardSlice = createSlice({
  name: "currentBoard",
  initialState: { value: null },
  reducers: {
    setCurrentBoard: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentBoard } = currentBoardSlice.actions;
export const currentBoardReducer = currentBoardSlice.reducer;
