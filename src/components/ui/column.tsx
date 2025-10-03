import React from "react";
import { Column, Task } from "@/types";

import TaskCard from "./task-card";

type Props = {
  column: Column;
  handleDrop: (columnId: string) => void;
  setDragOriginColumnId: (id: string) => void;
  setDraggedItem: (item: Task | null) => void;
  tasks: Task[];
  darkMode: boolean;
  setViewTaskOpen: (open: boolean) => void;
};

const ColumnComponent = ({ column, handleDrop, setDragOriginColumnId, setDraggedItem, tasks, setViewTaskOpen }: Props) => {
  return (
    <div
      className="w-[280px] max-md:w-[190px]"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={() => {
        handleDrop(column.id);
      }}

    >
      <h1 className="font-semibold  text-md capitalize text-[#7C8CA4] tracking-widest flex gap-1 pb-3">
        {column && column.name}
        <span>({tasks ? tasks.length : 0})</span>
      </h1>
      <div className="flex flex-col gap-2">
        {tasks?.map((task: Task, index: number) => {
          if (!task) return null;
          return (
            <TaskCard key={index} task={task} columnId={column.id} setViewTaskOpen={setViewTaskOpen} setDragOriginColumnId={setDragOriginColumnId} setDraggedItem={setDraggedItem} />
          );
        })}
      </div>
    </div>
  );
};

export default ColumnComponent;
