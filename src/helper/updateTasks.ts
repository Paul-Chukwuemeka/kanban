import { Board } from "@/types";

export const moveTask = (
  boards: Board[],
  currentBoardId: string,
  currentTaskId: string,
  sourceColumnId: string,
  destinationColumnId: string
): Board | undefined => {
  const board = boards.find((board) => board.id === currentBoardId);

  if (!board) {
    return undefined;
  }

  const sourceColumn = board.columns.find(
    (column) => column.id === sourceColumnId
  );
  const destinationColumn = board.columns.find(
    (column) => column.id === destinationColumnId
  );
  const task = sourceColumn?.tasks.find((task) => task.id === currentTaskId);

  if (!sourceColumn || !destinationColumn || !task) {
    return undefined;
  }

  const updatedBoard = {
    ...board,
    columns: board.columns.map((column) => {
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== currentTaskId),
        };
      }
      if (column.id === destinationColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, task],
        };
      }
      return column;
    }),
  };

  return updatedBoard;
};

export const updateSubtaskStatus = (
  board: Board,
  taskId: string,
  subtaskId: string,
  isCompleted: boolean
): Board => {
  const updatedBoard = {
    ...board,
    columns: board.columns.map((column) => ({
      ...column,
      tasks: column.tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subTasks: task.subTasks.map((subtask) => {
              if (subtask.id === subtaskId) {
                return { ...subtask, completed: isCompleted };
              }
              return subtask;
            }),
          };
        }
        return task;
      }),
    })),
  };

  return updatedBoard;
};
