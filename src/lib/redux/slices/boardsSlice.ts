import { createSlice } from "@reduxjs/toolkit";
import { Board } from "@/types";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    value: [] as Board[],
  },
  reducers: {
    setBoards: (state, action) => {
      state.value = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("boards", JSON.stringify(action.payload));
      }
    },
    updateBoard: (state, action) => {
      const payload = action.payload;
      state.value = state.value.map((board) =>
        board.id === payload.id ? payload : board
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("boards", JSON.stringify(state.value));
      }
    },
    deleteBoard: (state, action) => {
      state.value = state.value.filter((board) => board.id !== action.payload);
      if (typeof window !== "undefined") {
        if (state.value.length === 0) {
          localStorage.removeItem("boards");
        } else {
          localStorage.setItem("boards", JSON.stringify(state.value));
        }
      }
    },
  },
});

export const { setBoards, updateBoard, deleteBoard } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
