"use client";
import Header from "./components/header";
import Sidebar from "./components/sideBar";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import ToggleSidebarBtn from "./components/sidebar_btn";
import AddTaskModal from "./components/add_task_modal";

export default function Home() {
  const darkMode = useSelector((state: RootState) => state.theme.value);
  const isAddTaskModalOpen = useSelector((state: RootState) => state.addTaskModal.value);

  return (
    <div
      className={`flex flex-col h-screen w-screen ${
        darkMode && "bg-[#211F2C]"
      }`}
    >
      {isAddTaskModalOpen && <AddTaskModal />}
      <Header />
      <main className="relative flex-1">
        <Sidebar />
        <ToggleSidebarBtn />
      </main>
    </div>
  );
}
