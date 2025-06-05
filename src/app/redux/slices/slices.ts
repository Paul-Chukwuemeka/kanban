import { createSlice } from "@reduxjs/toolkit";

// Theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState: { value: false },
  reducers: {
    toggleTheme: (state) => {
      state.value = !state.value;
    },
  },
});

// Sidebar slice
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { value: true },
  reducers: {
    toggleSidebar: (state) => {
      state.value = !state.value;
    },
  },
});
// Add Task Modal slice
const addTaskModalSlice = createSlice({
  name: "addTaskModal",
  initialState: { value: false },
  reducers: {
    toggleAddTaskModal: (state) => {
      state.value = !state.value;
    },
  },
});
// Add Board Modal slice
const addBoardModalSlice = createSlice({
  name: "addBoardModal",
  initialState: { value: false },
  reducers: {
    toggleAddBoardModal: (state) => {
      state.value = !state.value;
    },
  },
});

// Boards Slice
interface Board {
  id: string;
  name: string;
  currentBoard?: boolean;
  columns: { name: string }[];
}

const boardsSlice = createSlice({
  name: "boards",
  initialState: { value: [] as Board[] },
  reducers: {
    addNewBoard: (state, action: { payload: Board }) => {
      state.value.push(action.payload);
    },
    setBoards: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const { toggleSidebar } = sidebarSlice.actions;
export const { toggleAddTaskModal } = addTaskModalSlice.actions;
export const { toggleAddBoardModal } = addBoardModalSlice.actions;
export const { addNewBoard, setBoards } = boardsSlice.actions;

export const themeReducer = themeSlice.reducer;
export const sidebarReducer = sidebarSlice.reducer;
export const addTaskModalReducer = addTaskModalSlice.reducer;
export const addBoardModalReducer = addBoardModalSlice.reducer;
export const boardsReducer = boardsSlice.reducer;
