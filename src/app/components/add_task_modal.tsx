import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from "../redux/slices/slices";
import { useState } from "react";
import { FaPlus, FaXmark } from "react-icons/fa6";
import { toggleAddTaskModal } from "../redux/slices/slices";
import type { RootState } from "../redux/store";

interface Board {
  name: string,
  id: string,
  columns: {
    name: string,
    tasks: Array<{
      name: string,
      description: string,
      subTasks: Array<{ name: string }>
    }>,
  }[]
}

const AddTaskModal = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value ? state.currentBoard.value as Board : null
  );
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [subTasks, setSubTasks] = useState([{ name: "" }]);
  const [status, setStatus] = useState<string | null>(currentBoard ? currentBoard.columns[0].name : null);
  const [task, setTask] = useState<{
    name: string;
    description: string;
    subTasks: { name: string }[];
  }>({
    name: "",
    description: "",
    subTasks: [],
  });

  useEffect(() => {
    setTask({
      name: taskName,
      description,
      subTasks: subTasks.filter((subtask) => subtask.name.length > 3),
    });
  }, [description, subTasks, taskName]);

  return (
    <div
      className="bg-[#00000052] w-full flex justify-center items-center h-full absolute top-0 left-0 z-[100]"
      onClick={() => {
        dispatch(toggleAddTaskModal());
      }}
    >
      <div
        className="bg-white w-full max-w-[500px] h-fit min-h-[500px] rounded-lg p-8 flex flex-col ite gap-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-xl font-bold">Add New Task</h1>
        <div>
          <p className="text-lg font-medium text-[#7C8CA4]">Task Name</p>
          <input
            type="text"
            placeholder="e.g Take coffee break"
            className="w-full border border-[#7C8CA4] rounded-md p-3 px-4 focus:outline-none"
            onChange={(e) => {
              setTaskName(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <p className="text-lg font-medium text-[#7C8CA4]">Description</p>
          <textarea
            className="w-full border border-[#7C8CA4] rounded-sm p-3 focus:outline-none px-4"
            onChange={(e) => {
              setDescription(e.currentTarget.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-medium text-[#7C8CA4]">Subtasks</p>
          {subTasks.map((subtask, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  className="border border-[#7C8CA4] focus:outline-none flex-1 p-3 rounded-md"
                  onInput={(e) => {
                    const newSubTasksArray = subTasks.map((subtask, i) => {
                      return i == index
                        ? { name: e.currentTarget.value }
                        : subtask;
                    });
                    setSubTasks(newSubTasksArray);
                  }}
                />
                <FaXmark
                  className="text-2xl text-[#7C8CA4]"
                  onClick={() => {
                    setSubTasks(
                      subTasks.filter((_, i) => i !== subTasks.indexOf(subtask))
                    );
                  }}
                />
              </div>
            );
          })}
        </div>
        <button
          className="flex items-center self-center gap-2 bg-[#7247ce] font-semibold text-white p-3 rounded-full hover:bg-[#5a34a0] transition-colors duration-200 cursor-pointer w-full justify-center"
          onClick={() => {
            const subTasksArr = [...subTasks, { name: "" }];
            setSubTasks(subTasksArr);
          }}
        >
          <FaPlus /> Add New Subtask
        </button>

        <div>
          <p className="text-lg font-medium text-[#7C8CA4]">Current status</p>
          <select
            name=""
            id=""
            className="w-full h-full focus:outline-none bg-transparent border border-[#7C8CA4] rounded-md p-3 px-4 cursor-pointer"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            {currentBoard &&
              currentBoard.columns.map(
                (column, index: number) => {
                 if(column) return (
                    <option value={column.name} key={index}>
                      {column.name}
                    </option>
                  );
                }
              )}
          </select>
        </div>
        <button
          className="w-full bg-[#7247ce] text-white p-3 font-semibold rounded-full hover:bg-[#5a34a0] transition-colors duration-200 cursor-pointer"
          onClick={() => {
            if (!currentBoard) {
              return;
            }

            const updatedBoard: Board = {
              ...currentBoard as Board,
              columns: (currentBoard as Board).columns.map((col) => {
                if (col && col.name === status) {
                  return {
                    ...col,
                    tasks: [...(col.tasks || []), task]
                  };
                }
                return col;
              }),
            };
            dispatch(updateBoard(updatedBoard))
            dispatch(toggleAddTaskModal())
          }}
        >
          Create Task
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
