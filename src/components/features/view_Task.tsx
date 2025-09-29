import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { Board, Task } from "@/types";
import { useState } from "react";

type ViewTaskProps = {
  onClose: () => void;
  setIsEditTaskModalOpen: (isOpen: boolean) => void;
  setIsDeleteTaskModalOpen: (isOpen: boolean) => void;
};

const ViewTask = ({
  onClose,
  setIsEditTaskModalOpen,
  setIsDeleteTaskModalOpen,
}: ViewTaskProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const currentTask: Task = useSelector(
    (state: RootState) => state.currentTask.value
  );
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value
  ) as Board | null;

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-[#00000052] flex justify-center items-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[480px] h-fit rounded-lg p-8 flex flex-col gap-3"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between text-lg gap-3">
          <h2 className="flex-1 font-bold capitalize">{currentTask.name}</h2>
          <button
            className="cursor-pointer relative"
            onClick={() => {
              setIsOptionsOpen(true);
            }}
            onBlur={() => {
              setIsOptionsOpen(false);
            }}
          >
            <BsThreeDotsVertical
              className="text-xl"
              onClick={(e) => {
                e.stopPropagation();
                setIsOptionsOpen(!isOptionsOpen);
              }}
            />
            {isOptionsOpen && (
              <ul className="w-30 p-1  text-sm text-left rounded-sm bg-white shadow-[0_0_5px]  shadow-gray-300 absolute right-0 top-6">
                <li
                  className="font-extralight hover:bg-purple-100 p-0.5 px-2 text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    setIsEditTaskModalOpen(true);
                  }}
                >
                  Edit Task
                </li>
                <li
                  className="font-extralight hover:bg-purple-100 p-0.5 px-2 text-red-500"
                  onClick={() => {
                    onClose();
                    setIsDeleteTaskModalOpen(true);
                  }}
                >
                  Delete Task
                </li>
              </ul>
            )}
          </button>
        </div>
        {currentTask.description && (
          <p className="text-[#7C8CA4] text-md font-semibold">
            {currentTask.description}
          </p>
        )}
        <p className="text-[rgb(124,140,164)] text-md font-semibold">
          Subtasks (1 of {currentTask.subTasks.length})
        </p>
        <div className="text-[#7C8CA4] text-sm font-medium">
          {currentTask.subTasks.map((subtask, i) => (
            <div key={i} className="capitalize flex gap-4 text-lg">
              <input
                type="checkbox"
                checked={subtask.completed}
                className={`${
                  subtask.completed && "subtask-completed "
                } cursor-pointer after:visible  invisible relative  after:w-5 after:h-5 after:border-2 after:border-[#7C8CA4] after:rounded-full after:block after:absolute after:top-1/2 after:-translate-y-1/2 after:-translate-x-1/6 after:left-0"`}
              />
              <span className={` ${subtask.completed ? "line-through" : ""}`}>
                {subtask.name}
              </span>
            </div>
          ))}
        </div>
        <span>Current Status</span>
        <select
          name="status"
          className="border border-[#47424282] capitalize font-medium p-3 rounded-lg px-4 pr-8 appearance-none bg-[length:12px] bg-[right_12px_center] bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%23635FC7%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] focus:outline-none"
        >
          {currentBoard &&
            currentBoard.columns.map((column, i) => (
              <option key={i} className="capitalize" value={column.name}>
                {column.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default ViewTask;
