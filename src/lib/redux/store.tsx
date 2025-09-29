import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slices/themeSlice";
import { sidebarReducer } from "./slices/sidebarSlice";
import { boardsReducer } from "./slices/boardsSlice";
import { addBoardModalReducer } from "@/lib/redux/slices/addBoardModalSlice";
import { currentBoardReducer } from "./slices/currentBoardSlice";
import { currentTaskReducer } from "./slices/currentTaskSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    boards: boardsReducer,
    addBoardModal: addBoardModalReducer,
    currentBoard: currentBoardReducer,
    currentTask: currentTaskReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
