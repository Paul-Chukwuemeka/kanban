import { configureStore } from "@reduxjs/toolkit";
import { themeReducer, sidebarReducer, addTaskModalReducer,boardsReducer,addBoardModalReducer, currentBoardReducer, EditBoardModalReducer } from "./slices/slices";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    addTaskModal: addTaskModalReducer,
    editBoardModal: EditBoardModalReducer,
    boards: boardsReducer,
    addBoardModal: addBoardModalReducer,
    currentBoard: currentBoardReducer
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
