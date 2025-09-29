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

const Header = ({setEditBoardModalOpen,setDeleteBoardModalOpen,setAddTaskModalOpen}: HeaderProps) => {
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
      className={`flex p-5 relative font-semibold  ${
        darkMode ? "bg-[#2C2A37] text-white" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-1 w-64 spa">
        <PiKanbanFill className="text-[#7247ce] text-4xl" />
        <h1 className="text-3xl font-bold tracking-tighter">kanban</h1>
      </div>
      <div className="flex items-center flex-1 justify-between">
        <h1 className="text-[22px] capitalize">
          {currentBoard ? currentBoard.name : "No Board Selected"}
        </h1>
        {currentBoard && (
          <div className="flex gap-3">
            <button
              className="flex items-center gap-1 text-white p-4 py-2.5 cursor-pointer rounded-3xl bg-[#7247ce]"
              onClick={() => {
                setAddTaskModalOpen(true);
              }}
            >
              <FaPlus />
              Add New Task
            </button>
            <button
              className="text-xl cursor-pointer"
              onClick={() => {
                setShowOptions((isOptions) => !isOptions);
              }}
            >
              <BsThreeDotsVertical />
            </button>
            {showOptions && (
              <div className="bg-white text-md z-[100] p-4 rounded-md flex flex-col items-start gap-1 shadow-[0px_1px_2px_#7C8CA4] absolute top-full right-5">
                <button
                  className="font-normal text-[#7C8CA4] cursor-pointer "
                  onClick={() => {
                    setShowOptions((isOptions) => !isOptions);
                    setEditBoardModalOpen(true)
                  }}
                >
                  Edit board
                </button>
                <button
                  className="font-normal cursor-pointer text-red-500 "
                  onClick={() => {
                    setShowOptions((isOptions) => !isOptions);
                    setDeleteBoardModalOpen(true)
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
