import { configureStore } from "@reduxjs/toolkit";
import {
  themeReducer,
  sidebarReducer,
  addTaskModalReducer,
  boardsReducer,
  addBoardModalReducer,
  currentBoardReducer,
  EditBoardModalReducer,
  deleteBoardModalReducer,
} from "./slices/slices";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    addTaskModal: addTaskModalReducer,
    editBoardModal: EditBoardModalReducer,
    deleteBoardModal: deleteBoardModalReducer,
    boards: boardsReducer,
    addBoardModal: addBoardModalReducer,
    currentBoard: currentBoardReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
