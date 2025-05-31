import React from "react";
import { HiOutlineViewBoards } from "react-icons/hi";
import { FaPlus,FaMoon, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeslice";

const Sidebar = () => {
  const darkMode = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        darkMode ? "bg-[#2C2A37]" : "bg-white"
      } w-fit min-w-65 h-full flex flex-col justify-between`}
    >
      <div className=" gap-6 py-6 flex flex-col">
        <h3 className="px-5 font-semibold text-sm text-[#7C8CA4] uppercase">
          All Boards ( <span>3</span> )
        </h3>
        <ul className="w-full flex flex-col pr-4">
          <li
            className={`py-4  flex gap-3 items-center text-sm w-full hover:duration-250 hover:text-[#7247ce] rounded-[0px_40px_40px_0] board px-5 cursor-pointer ${
              darkMode ? "hover:bg-white" : "hover:bg-[#ded8ec6b]"
            } bg-[#7533C9] text-white `}
          >
            <HiOutlineViewBoards className="text-xl" />
            App Launch
          </li>
          <li
            className={`py-4  text-[#7C8CA4] flex gap-3 items-center text-sm w-full hover:duration-250 hover:text-[#7247ce] rounded-[0px_40px_40px_0] board px-5 cursor-pointer ${
              darkMode ? "hover:bg-white" : "hover:bg-[#ded8ec6b]"
            }`}
          >
            <HiOutlineViewBoards className="text-xl" /> Packages Update
          </li>
          <li
            className={`py-4  text-[#7C8CA4] flex gap-3 items-center text-sm w-full hover:duration-250 hover:text-[#7247ce] rounded-[0px_40px_40px_0] board px-5 cursor-pointer ${
              darkMode ? "hover:bg-white" : "hover:bg-[#ded8ec6b]"
            }`}
          >
            <HiOutlineViewBoards className="text-xl" /> Design System
          </li>
          <li
            className={`py-4  text-[#7247ce] flex gap-2 items-center text-sm w-full hover:duration-250 hover:text-[#7247ce] rounded-[0px_40px_40px_0] board px-5 cursor-pointer ${
              darkMode
                ? "hover:bg-white "
                : "hover:bg-[#ded8ec6b]"
            }`}
          >
            <HiOutlineViewBoards className="text-xl" /> <span className="flex items-center gap-1"><FaPlus /> Add New Board</span>
          </li>
          <input type="color" name="" id="" />
        </ul>
      </div>
      <div className="flex flex-col gap-4 p-5 mb-18 ">
        <div className={`flex w-full text-[#7C8CA4] items-center justify-center space-x-6 ${darkMode ? "bg-[#211F2C]":"bg-[#ded8ec6b]" } p-3 text-lg rounded-xl`}>
          <MdWbSunny />
          <button
            className={`w-11 h-5 rounded-full p-[3px] cursor-pointer bg-[#7247ce]`}
            onClick={() => {
              dispatch(toggleTheme());
            }}
          >
            <span
              className={`h-full block bg-white w-3.5 rounded-full ${
                darkMode && "translate-x-5.5"
              }`}
            ></span>
          </button>
          <FaMoon className="-rotate-z-20"/>
        </div>
        <button className={`w-60 top-[84vh] rounded-tr-full rounded-br-full p-3 px-5 absolute left-0 flex items-center text-md gap-1  space-x-2 text-[#7C8CA4] cursor-pointer font-semibold  ${darkMode ? "hover:bg-white": "hover:bg-[#ded8ec6b] "} hover:text-[#7247ce]`}>
          <FaEyeSlash className="text-xl text-[#7C8CA4]" />
          <span>Hide Sidebar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
