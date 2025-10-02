import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { Board, Task } from "@/types";
import { useDispatch } from "react-redux";
import { updateBoard } from "@/lib/redux/slices/boardsSlice";
import { useEffect, useState } from "react";
import { moveTask } from "@/helper/updateTasks";

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
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const dispatch = useDispatch();
  const currentTask: Task = useSelector(
    (state: RootState) => state.currentTask.value
  );
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value
  ) as Board | null;
  const boards = useSelector((state: RootState) => state.boards.value);

  let completedSubtasks = 0;
  if (currentTask) {
    completedSubtasks = currentTask.subTasks.filter(
      (subtask) => subtask.completed
    ).length;
  }

  useEffect(() => {
    if (currentBoard) {
      const current =
        currentBoard?.columns.find((col) =>
          col.tasks.find((task) => task.id === currentTask.id)
        )?.id || null;
      setCurrentStatus(current);
    }
  }, []);

  function handleStateChange(id: string) {
    if (!currentBoard) return;
    if (!currentTask) return;
    if (id === currentStatus) return;
    const updatedBoard = moveTask(
      boards,
      currentBoard.id,
      currentTask.id,
      currentStatus!,
      id
    );

    dispatch(updateBoard(updatedBoard));
    setCurrentStatus(id);
  }

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
        <div className="flex items-center text-[#7247ce] justify-between text-lg gap-3">
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
          <p className="text-md font-semibold text-[#4916b7]">
            {currentTask.description.slice(0, 1).toUpperCase() +
              currentTask.description.slice(1)}
          </p>
        )}
        <p className=" text-[#7247ceba] text-md font-semibold">
          Subtasks ({completedSubtasks} of {currentTask.subTasks.length})
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
        <div className="w-full border border-[#47424282] rounded-lg pr-3">
          <select
            name="status"
            className=" w-full  capitalize font-medium p-3  focus:outline-none"
            value={currentStatus ? currentStatus : ""}
            onChange={(e) => {
              handleStateChange(e.target.value);
            }}
          >
            {currentBoard &&
              currentBoard.columns.map((column, i) => {
                return (
                  <option key={i} className="capitalize" value={column.id}>
                    {column.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
