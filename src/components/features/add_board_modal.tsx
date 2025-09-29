import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setBoards } from "../../lib/redux/slices/boardsSlice";
import { useState, useEffect } from "react";
import { FaXmark, FaPlus } from "react-icons/fa6";
import { RootState } from "../../lib/redux/store";

type AddBoardModalProps = {
  onClose: () => void;
};

const AddBoardModal = ({ onClose }: AddBoardModalProps) => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards.value);
  const [error, setError] = useState({
    isError: false,
    reason: "",
  });
  const [board, setBoard] = useState({
    id: "",
    name: "",
    columns: [{ name: "" }],
  });

  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([{ name: "" }]);

  useEffect(() => {
    setBoard({
      id: uuidv4(),
      name: boardName,
      columns: columns.map((column) => ({ name: column.name, tasks: [] })),
    });
  }, [boardName, columns]);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-[#00000052] flex justify-center items-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[450px] h-fit rounded-lg p-8 flex flex-col gap-3"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-xl font-semibold">Add new board</h2>
        <div className="flex flex-col">
          <p className="text-[#7C8CA4] text-lg font-medium">Board Name</p>
          <input
            type="text"
            placeholder="e.g Web Design"
            className="w-full capitalize placeholder:lowercase border border-[#7C8CA4] rounded-md p-2 px-3 focus:outline-none"
            onInput={(e) => {
              setBoardName(e.currentTarget.value);
              setError({
                isError: false,
                reason: "",
              });
            }}
          />
        </div>
        <div className="gap-2 flex flex-col">
          <p className="text-[#7C8CA4] text-md font-medium">Board Columns</p>
          {columns.map((column, index) => {
            return (
              <div key={index} className="flex items-center gap-3">
                <input
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
            const newColumns = [...columns, { name: "" }];
            setColumns(newColumns);
          }}
          >
          <FaPlus />
          Add New Column
        </button>
        <button
          className="w-full bg-[#7247ce] text-white p-3 font-semibold rounded-full hover:bg-[#5a34a0] transition-colors duration-200 cursor-pointer"
          onClick={() => {
            try {
              if (!boards.every((b) => b.name.toLowerCase() !== board.name.toLowerCase())) {
                throw new Error("Board name must be unique");
              } else if (board.name.trim() === "") {
                throw new Error("Board name is required");
              } 
              else if(board.columns.length === 0 || board.columns.some((col) => col.name.trim() === "")) {
                throw new Error("All columns must have a name");
              }
              else if (board.columns.length !== new Set(board.columns.map(col => col.name)).size) {
                throw new Error("Column names must be unique");
              }
              else {
                dispatch(setBoards([...boards, board]));
                onClose();
                setBoardName("");
                setColumns([{ name: "" }]);
              }
            } catch (error) {
              setError({
                isError: true,
                reason: String(error),
              });
            }
          }}
          >
          Create New Board
        </button>
          {error.isError && (
            <p className="text-red-500 text-center text-md p-2">{error.reason}</p>
          )}
      </div>
    </div>
  );
};

export default AddBoardModal;
