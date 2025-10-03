import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setBoards } from "../../lib/redux/slices/boardsSlice";
import { useState, useEffect } from "react";
import { FaXmark, FaPlus } from "react-icons/fa6";
import { RootState } from "../../lib/redux/store";
import { Column } from "@/types";

type AddBoardModalProps = {
  onClose: () => void;
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
};

const AddBoardModal = ({
  onClose,
  notifySuccess,
  notifyError,
}: AddBoardModalProps) => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards.value);
  const darkMode = useSelector((state: RootState) => state.theme.value);
  const [board, setBoard] = useState({
    id: "",
    name: "",
    columns: [] as Column[],
  });

  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    setBoard({
      id: uuidv4(),
      name: boardName,
      columns: columns.map((column) => ({
        name: column.name,
        tasks: [],
        id: column.id,
      })),
    });
  }, [boardName, columns]);

  function handleAddBoard() {
    try {
      if (
        !boards.every((b) => b.name.toLowerCase() !== board.name.toLowerCase())
      ) {
        throw new Error("Board name must be unique");
      } else if (board.name.trim() === "") {
        throw new Error("Board name is required");
      } else if (
        board.columns.length !== 0 &&
        board.columns.some((col) => col.name.trim() === "")
      ) {
        throw new Error("All columns must have a name");
      } else if (
        board.columns.length !==
        new Set(board.columns.map((col) => col.name)).size
      ) {
        throw new Error("Column names must be unique");
      } else {
        dispatch(setBoards([...boards, board]));
        onClose();
        setBoardName("");
        setColumns([{ name: "", id: uuidv4(), tasks: [] }]);
        notifySuccess("Board added successfully");
      }
    } catch (error) {
      notifyError((error as Error).message);
    }
  }

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-[#00000052] p-5 flex justify-center items-center z-[100]"
      onClick={onClose}
    >
      <form
        className={` w-full max-w-[450px] h-fit rounded-lg p-8 flex flex-col gap-3 ${
          darkMode ? "bg-[#2C2A37] text-white" : "bg-gray-50 text-black"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddBoard();
        }}
      >
        <h2 className="text-xl font-semibold">Add new board</h2>
        <div className="flex flex-col">
          <p className="text-[#7C8CA4] text-lg font-medium">Board Name</p>
          <input
            required
            type="text"
            placeholder="e.g Web Design"
            className="w-full capitalize placeholder:lowercase border border-[#7C8CA4] rounded-md p-2 px-3 focus:outline-none"
            onInput={(e) => {
              setBoardName(e.currentTarget.value);
            }}
          />
        </div>
        <div className="gap-2 flex flex-col">
          <p className="text-[#7C8CA4] text-md font-medium">Board Columns</p>
          {columns.map((column, index) => {
            console.log(columns);
            return (
              <div key={index} className="flex items-center gap-3">
                <input
                  required
                  type="text"
                  className="flex-1 border border-[#7C8CA4] rounded-md p-2 px-3 focus:outline-none"
                  placeholder="e.g To Do"
                  onChange={(e) => {
                    const newColumns = [...columns];
                    newColumns[index].name = e.currentTarget.value;
                    setColumns(newColumns);
                  }}
                />
                <FaXmark
                  className="text-3xl text-[#7C8CA4] cursor-pointer"
                  onClick={() => {
                    setColumns(
                      columns.filter(
                        (_, index) => index !== columns.indexOf(column)
                      )
                    );
                  }}
                />
              </div>
            );
          })}
        </div>
        <button
          className="w-full flex items-center justify-center bg-[#7247ce] text-white p-3 font-semibold rounded-full hover:bg-[#5a34a0] transition-colors duration-200 cursor-pointer"
          onClick={() => {
            const newColumns = [
              ...columns,
              { name: "", id: uuidv4(), tasks: [] },
            ];
            setColumns(newColumns);
          }}
          type="button"
        >
          <FaPlus />
          Add New Column
        </button>
        <button className="w-full bg-[#7247ce] text-white p-3 font-semibold rounded-full hover:bg-[#5a34a0] transition-colors duration-200 cursor-pointer">
          Create New Board
        </button>
      </form>
    </div>
  );
};

export default AddBoardModal;
