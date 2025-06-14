"use client";
import Header from "./components/header";
import Sidebar from "./components/sideBar";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./redux/store";
import ToggleSidebarBtn from "./components/sidebar_btn";
import AddTaskModal from "./components/add_task_modal";
import AddBoardModal from "./components/add_board_modal";
import {
  toggleAddBoardModal,
  toggleEditBoardModal,
} from "./redux/slices/slices";
import { FaPlus } from "react-icons/fa";
import EditBoardModal from "./components/edit_board_modal";
import Deleteboardmodal from "./components/delete_board_modal";
import ViewTask from "./components/viewTask";
import { useState } from "react";

interface Task {
  name: string;
  description: string;
  subTasks: { name: string }[];
}
interface Column {
  name: string;
  tasks: Task[];
}

export default function Home() {
  const darkMode = useSelector((state: RootState) => state.theme.value);
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value
  );
  const isAddTaskModalOpen = useSelector(
    (state: RootState) => state.addTaskModal.value
  );
  const isAddBoardModalOpen = useSelector(
    (state: RootState) => state.addBoardModal.value
  );
  const isEditBoardModalOpen = useSelector(
    (state: RootState) => state.editBoardModal.value
  );
  const isDeleteModal = useSelector(
    (state: RootState) => state.deleteBoardModal.value
  );
  const isViewTask = useSelector(
    (state: RootState) => state.viewTaskModal.value
  );

  const dispatch = useDispatch();
  const columns = currentBoard ? currentBoard.columns : [];
  return (
    <div
      className={`flex flex-col h-screen w-screen ${
        darkMode && "bg-[#211F2C]"
      }`}
    >
      {isAddTaskModalOpen && <AddTaskModal />}
      {isAddBoardModalOpen && <AddBoardModal />}
      {isEditBoardModalOpen && <EditBoardModal />}
      {isDeleteModal && <Deleteboardmodal />}
      {isViewTask && <ViewTask/>}
      <Header />
      <main className="relative flex-1 flex ">
        <Sidebar />
        <ToggleSidebarBtn />
        <div className=" hide-scroll flex-1 flex overflow-scroll p-4 ">
          {currentBoard ? (
            <div className="flex p-4 gap-10">
              {columns?.map((item: Column, index: number) => {
                const tasks = item?.tasks;
                return (
                  <div key={index} className="w-[280px]">
                    <h1 className="font-semibold text-md  text-[#7C8CA4] tracking-widest flex gap-1 pb-3">
                      {item && item.name}
                      <span>({tasks ? tasks.length : 0})</span>
                    </h1>
                    <div className="flex flex-col gap-2">
                      {tasks?.map((task: Task, index: number) => {
                        if (!task) return null;
                        return (
                          <div
                            key={index}
                            className="w-full cursor-pointer shadow-lg rounded-lg bg-white p-5 flex gap-1.5 flex-col"
                          >
                            <h1 className="text-md capitalize font-semibold">
                              {task.name || "Untitled Task"}
                            </h1>
                            <p className="text-[#7C8CA4] text-sm font-semibold">
                              {task.subTasks?.length || 0} substasks{" "}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <div
                className="w-[200px] bg-[#7c8ca440] cursor-pointer text-[#7247ce] rounded-lg flex gap-2 justify-center items-center"
                onClick={() => {
                  dispatch(toggleEditBoardModal());
                }}
              >
                <FaPlus />
                <h2 className="text-xl font-semibold">New Column</h2>
              </div>
            </div>
          ) : (
            <div className="p-4 text-gray-500 flex-1 flex items-center justify-center flex-col text-lg gap-2">
              <p>No boards available. Please create a board to get started.</p>
              <button
                className="mt-2 text-lg px-4 py-4 bg-[#7247ce] text-white rounded-full hover:bg-blue-600 flex items-center gap-2"
                onClick={() => dispatch(toggleAddBoardModal())}
              >
                <FaPlus /> Create New Board
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
