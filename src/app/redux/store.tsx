import { configureStore } from "@reduxjs/toolkit";
import { themeReducer, sidebarReducer, addTaskModalReducer,boardsReducer } from "./slices/slices";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    addTaskModal: addTaskModalReducer,
    boards: boardsReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
