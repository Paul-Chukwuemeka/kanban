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


const EditBoardModalSlice = createSlice({
  name: "EditBoardModal",
  initialState: { value: false },
  reducers: {
    toggleEditBoardModal: (state) => {
      state.value = !state.value;
    },
  },
});

const DeleteBoardModalSlice = createSlice({
  name:"deleteslice",
  initialState:{value : false},
  reducers:{
    toggleDeleteModal: (state)=>{
      state.value = !state.value
    }
  }
})
// Boards Slice
interface Board {
  id: string;
  name: string;
  columns: { name: string }[];
}

const boardsSlice = createSlice({
  name: "boards",
  initialState: { 
    value: [] as Board[]
  },
  reducers: {
    setBoards: (state, action) => {
      state.value = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem("boards", JSON.stringify(action.payload));
      }
    },
    updateBoard:(state,action)=>{
      const payload = action.payload;
      state.value = state.value.map((board) => 
        board.id === payload.id ? payload : board
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem("boards", JSON.stringify(state.value));
      }
    },
    deleteBoard:(state,action)=>{
      state.value = state.value.filter((board)=> board.id !== action.payload);
      if (typeof window !== 'undefined') {
        if (state.value.length === 0) {
          localStorage.removeItem("boards");
        } else {
          localStorage.setItem("boards", JSON.stringify(state.value));
        }
      }
    }
    
  }
});

const currentBoardSlice = createSlice({
  name: "currentBoard",
  initialState:{ value: null },
  reducers:{
    setCurrentBoard: (state,action)=>{
      state.value = action.payload;
      if (typeof window !== 'undefined') {
        if (action.payload) {
          localStorage.setItem("currentBoard", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("currentBoard");
        }
      }
    }
  }
})



export const { toggleTheme } = themeSlice.actions;
export const { toggleSidebar } = sidebarSlice.actions;
export const { toggleAddTaskModal } = addTaskModalSlice.actions;
export const { toggleAddBoardModal } = addBoardModalSlice.actions;
export const { toggleEditBoardModal } = EditBoardModalSlice.actions;
export const { setBoards } = boardsSlice.actions;
export const { updateBoard } = boardsSlice.actions;
export const { deleteBoard } = boardsSlice.actions;
export const {setCurrentBoard} = currentBoardSlice.actions
export const {toggleDeleteModal} = DeleteBoardModalSlice.actions

export const themeReducer = themeSlice.reducer;
export const sidebarReducer = sidebarSlice.reducer;
export const addTaskModalReducer = addTaskModalSlice.reducer;
export const addBoardModalReducer = addBoardModalSlice.reducer;
export const EditBoardModalReducer = EditBoardModalSlice.reducer;
export const boardsReducer = boardsSlice.reducer;
export const currentBoardReducer = currentBoardSlice.reducer
export const deleteBoardModalReducer = DeleteBoardModalSlice.reducer