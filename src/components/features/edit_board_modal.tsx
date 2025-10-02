import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from "../../lib/redux/slices/boardsSlice";
import { useState, useEffect } from "react";
import { FaXmark, FaPlus } from "react-icons/fa6";
import { RootState } from "../../lib/redux/store";
import { v4 as uuidv4 } from "uuid";

interface Board {
  name: string;
  id: string;
  columns: { name: string }[];
}

type EditBoardModalProps = {
  onClose: () => void;
};

const EditBoardModal = ({ onClose }: EditBoardModalProps) => {
  const dispatch = useDispatch();

  const [error, setError] = useState({
    isError: false,
    reason: "",
  });
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value as Board | null
  );
  const [board, setBoard] = useState({
    id: currentBoard ? currentBoard.id : null,
    name: currentBoard ? currentBoard.name : "",
    columns: currentBoard ? currentBoard.columns : [{ name: "" }],
  });
  const [boardName, setBoardName] = useState(
    currentBoard ? currentBoard.name : ""
  );
  const [columns, setColumns] = useState(
    currentBoard ? currentBoard.columns : [{ name: "" }]
  );

  useEffect(() => {
    setBoard({
      id: currentBoard && currentBoard.id,
      name: boardName,
      columns: columns.filter((column) => column && column.name.length > 0),
    });
  }, [boardName, columns, currentBoard]);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-[#00000052] flex justify-center items-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[450px] h-fit rounded-lg p-8 flex flex-col gap-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-xl font-semibold">Edit Board</h2>
        <div className="flex flex-col">
          <p className="text-[#7C8CA4] text-md font-medium">Board Name</p>
          <input
            type="text"
            placeholder="e.g Web Design"
            className="w-full border capitalize border-[#7C8CA4] rounded-md p-2 px-3 focus:outline-none"
            defaultValue={boardName}
            onChange={(e) => {
              setBoardName(e.currentTarget.value);
            }}
          />
        </div>
        <div className="gap-2 flex flex-col">
          <p className="text-[#7C8CA4] text-md font-medium">Board Columns</p>
          {columns &&
            columns.map((column: { name: string }, index: number) => {
              return (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    className="flex-1 border border-[#7C8CA4] rounded-md p-2 px-3 capitalize placeholder:lowercase focus:outline-none"
                    placeholder="e.g To Do"
                    defaultValue={column && column.name}
                    onChange={(e) => {
                      const updatedColumns = columns.map(
                        (column: { name: string }, i: number) => {
                          return i === index
                            ? { ...column, name: e.currentTarget.value }
                            : column;
                        }
                      );
                      setColumns(updatedColumns);
                    }}
                  />
                  <FaXmark
                    className="text-3xl text-[#7C8CA4] cursor-pointer"
                    onClick={() => {
                      setColumns(
                        columns.filter(
                          (_: { name: string }, index: number) =>
                            index !== columns.indexOf(column)
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
            const updatedColumns = [
              ...columns,
              { name: "", id: uuidv4(), tasks: [] },
            ];
            setColumns(updatedColumns);
          }}
        >
          <FaPlus />
          Add New Column
        </button>
        <button
          className="w-full bg-[#7247ce] text-white p-3 font-semibold rounded-full hover:bg-[#5a34a0] transition-colors duration-200 cursor-pointer"
          onClick={() => {
            const colNames = board.columns.map((col) =>
              col.name.trim().toLowerCase()
            );
            const uniqueColNames = new Set(colNames);
            if (colNames.length !== uniqueColNames.size) {
              setError({
                isError: true,
                reason: "Column names must be unique",
              });
              return;
            }
            if (board.name.trim() === "") {
              setError({
                isError: true,
                reason: "Board name is required",
              });
              return;
            }
            if (
              board.columns.length === 0 ||
              board.columns.some((col) => col.name.trim() === "")
            ) {
              setError({
                isError: true,
                reason: "All columns must have a name",
              });
              return;
            }
            // If all checks pass, update board
            dispatch(updateBoard(board));
            onClose();
          }}
        >
          Save Changes
        </button>
        {error.isError && (
          <p className="text-red-500 text-lg text-center p-2">{error.reason}</p>
        )}
      </div>
    </div>
  );
};

export default EditBoardModal;
