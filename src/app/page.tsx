"use client";
import Header from "../components/layout/header";
import Sidebar from "../components/layout/sideBar";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import type { RootState } from "../lib/redux/store";
import ToggleSidebarBtn from "../components/ui/sidebarBtn";
import AddTaskModal from "../components/features/add_task_modal";
import AddBoardModal from "../components/features/add_board_modal";
import { FaPlus } from "react-icons/fa";
import EditBoardModal from "../components/features/edit_board_modal";
import Deleteboardmodal from "../components/features/delete_board_modal";
import ViewTask from "../components/features/view_Task";
import { Task, Column, Board } from "@/types";
import EditTaskModal from "@/components/features/edit_Task_Modal";
import DeleteTaskModal from "@/components/features/delete_task_modal";
import { moveTask } from "@/helper/updateTasks";
import { updateBoard } from "@/lib/redux/slices/boardsSlice";
import { ToastContainer, toast } from "react-toastify";
import ColumnComponent from "@/components/ui/column";

export default function Home() {
  const darkMode = useSelector((state: RootState) => state.theme.value);
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value as Board | null
  );
  const dispatch = useDispatch();
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isAddBoardModalOpen, setAddBoardModalOpen] = useState(false);
  const [isEditBoardModalOpen, setEditBoardModalOpen] = useState(false);
  const [isDeleteModal, setDeleteModalOpen] = useState(false);
  const [isViewTask, setViewTaskOpen] = useState(false);
  const [isDeleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Task | null>(null);
  const [dragOriginColumnId, setDragOriginColumnId] = useState<string | null>(
    null
  );
  const boards = useSelector((state: RootState) => state.boards.value);

  const columns = currentBoard ? currentBoard.columns : [];

  const handleDrop = (destinationColumnId: string) => {
    try {
      if (draggedItem && dragOriginColumnId && currentBoard) {
        if (dragOriginColumnId !== destinationColumnId) {
          const updatedBoard = moveTask(
            boards,
            currentBoard.id,
            draggedItem.id,
            dragOriginColumnId,
            destinationColumnId
          );
          if (updatedBoard) {
            dispatch(updateBoard(updatedBoard));
          }
        }
      }
    } catch (error) {
      console.error("Error moving task:", error);
      toast.error("Failed to move task. Please try again.");
    }
    setDraggedItem(null);
    setDragOriginColumnId(null);
  };

  function notifySuccess(message: string) {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function notifyError(message: string) {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  return (
    <div
      className={`flex flex-col h-screen w-screen ${
        darkMode && "bg-[#211F2C]"
      }`}
    >
      <ToastContainer />
      {isDeleteTaskModalOpen && (
        <DeleteTaskModal
          onClose={() => setDeleteTaskModalOpen(false)}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      )}
      {isEditTaskModalOpen && (
        <EditTaskModal
          onClose={() => setEditTaskModalOpen(false)}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      )}

      {isAddTaskModalOpen && (
        <AddTaskModal
          onClose={() => setAddTaskModalOpen(false)}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      )}
      {isAddBoardModalOpen && (
        <AddBoardModal
          onClose={() => setAddBoardModalOpen(false)}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      )}
      {isEditBoardModalOpen && (
        <EditBoardModal
          onClose={() => setEditBoardModalOpen(false)}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      )}
      {isDeleteModal && (
        <Deleteboardmodal
          onClose={() => setDeleteModalOpen(false)}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      )}
      {isViewTask && (
        <ViewTask
          onClose={() => setViewTaskOpen(false)}
          setIsEditTaskModalOpen={setEditTaskModalOpen}
          setIsDeleteTaskModalOpen={setDeleteTaskModalOpen}
        />
      )}
      <Header
        setEditBoardModalOpen={setEditBoardModalOpen}
        setAddTaskModalOpen={setAddTaskModalOpen}
        setDeleteBoardModalOpen={setDeleteModalOpen}
      />
      <main className="relative flex-1 flex ">
        <Sidebar setAddBoardModalOpen={setAddBoardModalOpen} />
        <ToggleSidebarBtn />
        <div className=" flex-1 flex flex-col overflow-hidden">
          <h2
            className={` ${
              darkMode && "text-white"
            } md:hidden text-lg font-semibold capitalize py-1 px-6 `}
          >
            {currentBoard && currentBoard.name} Board
          </h2>
          <div className=" flex p-4 py-1 flex-1 overflow-auto hide-scroll ">
            {currentBoard ? (
              <div className="flex p-4 gap-10  ">
                {columns?.map((column: Column, index: number) => {
                  const tasks = column?.tasks;
                  return (
                    <ColumnComponent
                      key={index}
                      column={column}
                      tasks={tasks}
                      setDraggedItem={setDraggedItem}
                      setDragOriginColumnId={setDragOriginColumnId}
                      handleDrop={handleDrop}
                      setViewTaskOpen={setViewTaskOpen}
                      darkMode={darkMode}
                    />
                  );
                })}
                <button
                  className="w-[200px] max-md:w-[170px] bg-[#7c8ca440] cursor-pointer text-[#7247ce] rounded-lg flex gap-2 justify-center items-center"
                  onClick={() => {
                    setEditBoardModalOpen(true);
                  }}
                >
                  <FaPlus />
                  <h2 className="text-xl max-md:text-md max-md:font-medium font-semibold">
                    New Column
                  </h2>
                </button>
              </div>
            ) : (
              <div className="p-4 text-gray-500 flex-1 flex items-center justify-center flex-col text-lg gap-2">
                <p>
                  No boards available. Please create a board to get started.
                </p>
                <button
                  className="mt-2 text-lg px-4 py-4 bg-[#7247ce] text-white rounded-full hover:bg-blue-600 flex items-center gap-2"
                  onClick={() => setAddBoardModalOpen(true)}
                >
                  <FaPlus /> Create New Board
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
