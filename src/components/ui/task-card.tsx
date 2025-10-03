import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTask } from "@/lib/redux/slices/currentTaskSlice";
import { Task } from "@/types";
import { RootState } from "@/lib/redux/store";

type Props = {
  task: Task;
  setViewTaskOpen: (open: boolean) => void;
  setDragOriginColumnId: (id: string) => void;
  setDraggedItem: (item: Task | null) => void;
  columnId: string;
};

const TaskCard = ({
  task,
  setViewTaskOpen,
  setDragOriginColumnId,
  setDraggedItem,
  columnId,
}: Props) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.value);

  return (
    <div>
      <div
        className={`${
          darkMode ? "bg-[#2C2A37] text-white" : "bg-white text-black"
        } w-full cursor-grab shadow-lg rounded-lg p-5 flex gap-1.5 flex-col`}
        onClick={() => {
          dispatch(setCurrentTask(task));
          setViewTaskOpen(true);
        }}
        draggable
        onDragStart={() => {
          setDraggedItem(task);
          setDragOriginColumnId(columnId);
        }}
      >
        <h1 className="text-md capitalize font-semibold">
          {task.name || "Untitled Task"}
        </h1>
        <p className="text-[#7C8CA4] text-sm font-semibold">
          {task.subTasks?.length || 0} substasks{" "}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
