import React, { useEffect } from "react";
import { HiOutlineViewBoards } from "react-icons/hi";
import { FaPlus, FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../lib/redux/slices/themeSlice";
import { setCurrentBoard } from "../../lib/redux/slices/currentBoardSlice";
import type { RootState } from "../../lib/redux/store";
import { Board } from "@/types";

type SidebarProps = {
  setAddBoardModalOpen: (isOpen: boolean) => void;
};

const Sidebar = ({setAddBoardModalOpen}: SidebarProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.value);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.value);
  const boards = useSelector((state: RootState) => state.boards.value);
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value as Board | null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const storedBoard = localStorage.getItem("currentBoard");
    if (storedBoard) {
      dispatch(setCurrentBoard(JSON.parse(storedBoard)));
    } else if (boards.length > 0) {
      dispatch(setCurrentBoard(boards[0]));
    }
  }, [boards, dispatch]);

  return (
    <div
      className={`${darkMode ? "bg-[#2C2A37]" : "bg-white"} ${
        isSidebarOpen ? "flex" : "hidden"
      }  w-fit min-w-65 h-screen  flex-col justify-between `}
    >
      <div className=" gap-6 py-6 flex flex-col">
        <h3 className="px-5 font-semibold text-sm text-[#7C8CA4] uppercase">
          All Boards ( <span>{boards.length}</span> )
        </h3>
        <ul className="w-full flex flex-col pr-6">
          {boards.map((board) => {
            const isActive = currentBoard && board.name == currentBoard.name;
            return (
              <li
                className={`py-3  text-[#7C8CA4] flex capitalize gap-2 items-center text-md w-full hover:duration-250 hover:text-[#7247ce] rounded-[0px_40px_40px_0] board px-5 cursor-pointer ${
                  darkMode ? "hover:bg-white " : "hover:bg-[#ded8ec6b]"
                } ${isActive ? "bg-[#7247ce] text-white" : ""}`}
                onClick={() => {
                  dispatch(setCurrentBoard(board));
                }}
                key={board.id}
              >
                <HiOutlineViewBoards className="text-xl" />
                {board.name}
              </li>
            );
          })}

          <li
            className={`py-4  text-[#7247ce] flex gap-2 items-center text-sm w-full hover:duration-250 hover:text-[#7247ce] rounded-[0px_40px_40px_0] board px-5 cursor-pointer ${
              darkMode ? "hover:bg-white " : "hover:bg-[#ded8ec6b]"
            }`}
            onClick={() => {
              setAddBoardModalOpen(true);
            }}
          >
            <HiOutlineViewBoards className="text-xl" />{" "}
            <span className="flex items-center gap-1">
              <FaPlus /> Add New Board
            </span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 p-5 mb-18 ">
        <div
          className={`flex w-full text-[#7C8CA4] items-center justify-center space-x-6 ${
            darkMode ? "bg-[#211F2C]" : "bg-[#ded8ec6b]"
          } p-3 text-lg rounded-xl`}
        >
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
          <FaMoon className="-rotate-z-20" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
