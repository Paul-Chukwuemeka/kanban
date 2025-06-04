import { configureStore } from "@reduxjs/toolkit";
import { themeReducer, sidebarReducer, addTaskModalReducer,boardsReducer,addBoardModalReducer } from "./slices/slices";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    addTaskModal: addTaskModalReducer,
    boards: boardsReducer,
    addBoardModal: addBoardModalReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
