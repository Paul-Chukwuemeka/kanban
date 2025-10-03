import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { Board, SubTask, Task } from "@/types";
import { useDispatch } from "react-redux";
import { updateBoard } from "@/lib/redux/slices/boardsSlice";
import { useEffect, useState } from "react";
import { moveTask, updateSubtaskStatus } from "@/helper/updateTasks";

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
  const darkMode = useSelector((state: RootState) => state.theme.value);

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [completedSubtasks, setCompletedSubtasks] = useState(0);
  const dispatch = useDispatch();
  const currentTask: Task = useSelector(
    (state: RootState) => state.currentTask.value
  );
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value
  ) as Board | null;
  const boards = useSelector((state: RootState) => state.boards.value);

  useEffect(() => {
    if (subTasks.length <= 0) return;
    setCompletedSubtasks(
      subTasks.filter((subtask) => subtask.completed).length
    );
  }, [subTasks]);

  useEffect(() => {
    if (currentTask) {
      setSubTasks(currentTask.subTasks);
      setCompletedSubtasks(
        currentTask.subTasks.filter((subtask) => subtask.completed).length
      );
    }
  }, [currentTask]);

  useEffect(() => {
    if (currentBoard) {
      const current =
        currentBoard?.columns.find((col) =>
          col.tasks.find((task) => task.id === currentTask.id)
        )?.id || null;
      setCurrentStatus(current);
    }
  }, [currentBoard, currentTask]);

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
            className={`w-full max-w-[480px] h-fit rounded-lg p-8 flex flex-col gap-3 ${darkMode ? "bg-[#2C2A37] text-white" : "bg-white text-black"}`}
            onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`flex items-center ${darkMode ? "text-white" : "text-black"} justify-between text-lg gap-3`}>
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
              <ul className={`w-30 p-1  text-sm text-left rounded-sm ${darkMode ? "bg-[#2C2A37] text-white shadow-[0_0_5px_2px] shadow-gray-600/50" : "bg-white text-black"} absolute right-0 top-6`}>
                <li
                  className=" p-0.5 px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    setIsEditTaskModalOpen(true);
                  }}
                >
                  Edit Task
                </li>
                <li
                  className=" p-0.5 px-2 text-red-500"
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
        <p className=" text-md font-semibold">
          Subtasks ({completedSubtasks} of {currentTask.subTasks.length})
        </p>
        <div className="text-[#7C8CA4] text-sm font-medium">
          {currentTask.subTasks.map((subtask, i) => (
            <div key={i} className="capitalize flex gap-4 text-lg">
              <input
                type="checkbox"
                checked={subTasks[i]?.completed || false}
                onChange={() => {
                  setSubTasks((prevSubtasks) => {
                    const newSubtasks = [...prevSubtasks];
                    newSubtasks[i] = {
                      ...newSubtasks[i],
                      completed: !newSubtasks[i].completed,
                    };
                    return newSubtasks;
                  });
                  // Dispatch action to update global state
                  if (!currentBoard) return;
                  const updatedBoard = updateSubtaskStatus(
                    currentBoard,
                    currentTask.id,
                    subtask.id,
                    !subtask.completed
                  );
                  dispatch(updateBoard(updatedBoard));
                }}
                className="relative peer cursor-pointer pl-7 before:w-5 before:h-5 before:border-2 before:border-[#7C8CA4] before:rounded-full before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 checked:before:bg-[url('/check.svg')] checked:before:bg-no-repeat checked:before:bg-[length:14px] checked:before:bg-[position:1px_2px] before:bg-white"
              />
              <span
                className={`peer-checked:line-through peer-checked:decoration-2 font-medium`}
              >
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
