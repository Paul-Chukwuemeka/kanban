import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  value: {
    name: string;
    description: string;
    subTasks: { name: string; completed: boolean; id: string }[];
    id: string;
  };
}

const currentTaskSlice = createSlice({
  name: "currentTask",
  initialState: {
    value: {
      name: "",
      description: "",
      subTasks: [{ name: "", completed: false, id: "" }],
      id: "",
    },
  } as TaskState,
  reducers: {
    setCurrentTask: (state: TaskState, action: PayloadAction<TaskState["value"]>) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentTask } = currentTaskSlice.actions;
export const currentTaskReducer = currentTaskSlice.reducer;
