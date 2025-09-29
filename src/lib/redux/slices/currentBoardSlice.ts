import { createSlice } from "@reduxjs/toolkit";

const currentBoardSlice = createSlice({
  name: "currentBoard",
  initialState: { value: null },
  reducers: {
    setCurrentBoard: (state, action) => {
      state.value = action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("currentBoard", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("currentBoard");
        }
      }
    },
  },
});

export const { setCurrentBoard } = currentBoardSlice.actions;
export const currentBoardReducer = currentBoardSlice.reducer;
