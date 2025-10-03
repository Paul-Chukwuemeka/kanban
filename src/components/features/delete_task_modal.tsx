import { RootState } from "@/lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from "@/lib/redux/slices/boardsSlice";
import { Board } from "@/types";

type DeleteTaskModalProps = {
  onClose: () => void;
  notifySuccess: (msg: string) => void;
  notifyError: (msg: string) => void;
};

const DeleteTaskModal = ({ onClose, notifySuccess, notifyError }: DeleteTaskModalProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value
  )!;
  const currentTask = useSelector(
    (state: RootState) => state.currentTask.value
  );

  function handleDeleteTask() {
   try {
     const newColumns = (currentBoard as Board).columns.map((column) => {
      return {
        ...column,
        tasks: column.tasks?.filter((task) => task.id !== currentTask?.id),
      };
    });
    const newBoard = {
      ...(currentBoard as Board),
      columns: newColumns,
    };
    notifySuccess("Task deleted successfully");
    dispatch(updateBoard(newBoard));
    onClose();
   } catch (error) {
     console.error("Error deleting task:", error);
     notifyError("Failed to delete task. Please try again.");
   }
  }
  return (
    <div
      className="absolute w-full h-screen top-0 flex items-center justify-center left-0 z-10 bg-[#00000052] p-5"
      onClick={onClose}
    >
      <div className={`w-full max-w-[480px] h-fit rounded-lg p-8 flex flex-col gap-2 ${darkMode ? "bg-[#2C2A37] text-white" : "bg-white text-black"}`}>
        <h2 className="text-xl font-bold leading-10">Delete Task</h2>
        <div>
          <p>Are you sure you want to delete this task?</p>
          <p>This can not be undone?</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className={`bg-gray-300 p-2 w-full cursor-pointer max-w-54 rounded ${darkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white cursor-pointer p-2 w-full max-w-54 rounded"
            onClick={handleDeleteTask}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
