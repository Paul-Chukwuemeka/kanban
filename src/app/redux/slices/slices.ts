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

// Boards Slice
interface Board {
  id: string;
  name: string;
  columns: [];
}

const boardsSlice = createSlice({
  name: "boards",
  initialState: { value: [] as Board[] },
  reducers: {
    addBoard: (state, action: { payload: Board }) => {
      state.value.push(action.payload);
    },
    setBoards: (state, action: { payload: Board[] }) => {
      state.value = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const { toggleSidebar } = sidebarSlice.actions;
export const { toggleAddTaskModal } = addTaskModalSlice.actions;
export const { addBoard, setBoards } = boardsSlice.actions;

export const themeReducer = themeSlice.reducer;
export const sidebarReducer = sidebarSlice.reducer;
export const addTaskModalReducer = addTaskModalSlice.reducer;
export const boardsReducer = boardsSlice.reducer;
