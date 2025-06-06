"use client";
import Header from "./components/header";
import Sidebar from "./components/sideBar";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./redux/store";
import ToggleSidebarBtn from "./components/sidebar_btn";
import AddTaskModal from "./components/add_task_modal";
import AddBoardModal from "./components/add_board_modal";
import { toggleAddBoardModal } from "./redux/slices/slices";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { setBoards } from "./redux/slices/slices";
import EditBoardModal from "./components/edit_board_modal";
import Deleteboardmodal from "./components/delete_board_modal";

export default function Home() {
  const darkMode = useSelector((state: RootState) => state.theme.value);
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

  const dispatch = useDispatch();
  useEffect(() => {
    const boards = localStorage.getItem("boards")
      ? JSON.parse(localStorage.getItem("boards")!)
      : [];
    dispatch(setBoards(boards));
  }, [dispatch]);

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
      <Header />
      <main className="relative flex-1 flex">
        <Sidebar />
        <ToggleSidebarBtn />
        <div className="p-4 text-gray-500 flex-1 flex items-center justify-center flex-col text-lg gap-2">
          <p>No boards available. Please create a board to get started.</p>
          <button
            className="mt-2 text-lg px-4 py-4 bg-[#7247ce] text-white rounded-full hover:bg-blue-600 flex items-center gap-2"
            onClick={() => dispatch(toggleAddBoardModal())}
          >
            <FaPlus /> Create New Board
          </button>
        </div>
      </main>
    </div>
  );
}
