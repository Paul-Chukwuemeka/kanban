export type Board = {
  id: string;
  name: string;
  columns: Column[];
};

export type Task = {
  name: string;
  description: string;
  subTasks: SubTask[];
  id: string;
};
export type Column = {
  name: string;
  tasks: Task[];
  id: string;
};
export type SubTask = {
  name: string;
  completed: boolean;
  id: string;
};
