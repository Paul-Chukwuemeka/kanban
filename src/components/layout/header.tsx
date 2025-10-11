import { useState, useEffect } from "react";
import { PiKanbanFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/redux/store";
import { setCurrentBoard } from "@/lib/redux/slices/currentBoardSlice";
import { Board } from "@/types";

type HeaderProps = {
  setEditBoardModalOpen: (isOpen: boolean) => void;
  setDeleteBoardModalOpen: (isOpen: boolean) => void;
  setAddTaskModalOpen: (isOpen: boolean) => void;
};

const Header = ({
  setEditBoardModalOpen,
  setDeleteBoardModalOpen,
  setAddTaskModalOpen,
}: HeaderProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const darkMode = useSelector((state: RootState) => state.theme.value);
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value as Board | null
  );
  const boards = useSelector((state: RootState) => state.boards.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (boards.length > 0) {
      dispatch(setCurrentBoard(boards[0]));
    } else if (boards.length === 0) {
      dispatch(setCurrentBoard(null));
    }
  }, [boards, dispatch]);

  return (
    <header
      className={`flex p-5  relative font-semibold  max-md:p-2 ${
        darkMode ? "bg-[#2C2A37] text-white" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-1 w-45 max-md:w-38 mr-14  max-md:mr-0">
        <PiKanbanFill className="text-[rgb(114,71,206)] text-4xl max-md:text-2xl" />
        <h1 className="text-3xl max-md:text-xl font-bold tracking-tighter">
          kanban
        </h1>
      </div>
      <div className="flex items-end flex-1 justify-between ">
        <h1 className="text-[22px] max-md:text-[16px]  capitalize">
          {currentBoard ? currentBoard.name + " Board" : "No Board Selected"}
        </h1>
        {currentBoard && (
          <div className="flex gap-3 ">
            <button
              className="flex items-center text-md max-md:text-sm max-sm:text-xs gap-1 text-white p-4 py-2.5 cursor-pointer rounded-full bg-[#7247ce]"
              onClick={() => {
                setAddTaskModalOpen(true);
              }}
            >
              <FaPlus />
              Add New Task
            </button>
            <button
              className="text-xl max-md:text-sm max-sm:text-xs cursor-pointer"
              onClick={() => {
                setShowOptions((isOptions) => !isOptions);
              }}
            >
              <BsThreeDotsVertical />
            </button>
            {showOptions && (
              <div
                className={`text-sm z-[100] p-4 rounded-md flex flex-col items-start gap-1  absolute top-full right-5 ${
                  darkMode
                    ? "bg-[#2C2A37] text-white shadow-[0_0_5px_2px] shadow-gray-600/50"
                    : "bg-white text-black shadow-[0px_1px_2px_#7C8CA4]"
                }`}
              >
                <button
                  className="font-normal cursor-pointer "
                  onClick={() => {
                    setShowOptions(false);
                    setEditBoardModalOpen(true);
                  }}
                >
                  Edit board
                </button>
                <button
                  className="font-normal cursor-pointer text-red-500 "
                  onClick={() => {
                    setShowOptions(false);
                    setDeleteBoardModalOpen(true);
                  }}
                >
                  Delete board
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
