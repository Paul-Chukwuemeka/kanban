import React from "react";
import { PiKanbanFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {useSelector } from "react-redux";


const Header = () => {
    const darkMode = useSelector((state)=> state.theme.value)
  
  return (
    <header className={`flex p-5 font-semibold ${darkMode ? "bg-[#2C2A37] text-white": "bg-white"}`}>
      <div className="flex items-center gap-1 w-64 spa">
        <PiKanbanFill className="text-[#7247ce] text-4xl" />
        <h1 className="text-3xl font-bold tracking-tighter">kanban</h1>
      </div>
      <div className="flex items-center flex-1 justify-between">
        <h1 className="text-[22px]">App Launch</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-1 text-white p-4 py-2.5 cursor-pointer rounded-3xl bg-[#7247ce]">
            <FaPlus />
            Add New Task
          </button>
          <button className="text-xl">
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
