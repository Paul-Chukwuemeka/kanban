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
  toggleViewTaskReducer
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
    viewTaskModal:toggleViewTaskReducer
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
