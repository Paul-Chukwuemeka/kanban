import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from "../redux/slices/slices";
import { useState } from "react";
import { FaPlus, FaXmark } from "react-icons/fa6";
import { toggleAddTaskModal } from "../redux/slices/slices";
import type { RootState } from "../redux/store";

const AddTaskModal = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards.value);
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value
  );
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [subTasks, setSubTasks] = useState([{name:""}]);

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
          <textarea className="w-full border border-[#7C8CA4] rounded-sm p-3 focus:outline-none px-4" 
          onChange={(e)=>{
            setDescription(e.currentTarget.value)
          }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-medium text-[#7C8CA4]">Subtasks</p>
          {
            subTasks.map((subtask,index)=>{
              return(
                <div key={index} className="flex items-center gap-2">
                  <input type="text" className="border border-[#7C8CA4] focus:outline-none flex-1 p-3 rounded-md"/>
                  <FaXmark className="text-2xl text-[#7C8CA4]"/>
                </div>
              )
            })
          }
        </div>
        <button className="flex items-center self-center gap-2 bg-[#7247ce] font-semibold text-white p-3 rounded-full hover:bg-[#5a34a0] transition-colors duration-200 cursor-pointer w-full justify-center">
          <FaPlus /> Add New Subtask
        </button>

        <div>
          <p className="text-lg font-medium text-[#7C8CA4]">Current status</p>
          <select
            name=""
            id=""
            className="w-full h-full focus:outline-none bg-transparent border border-[#7C8CA4] rounded-md p-3 px-4 cursor-pointer"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button className="w-full bg-[#7247ce] text-white p-3 font-semibold rounded-full hover:bg-[#5a34a0] transition-colors duration-200 cursor-pointer">
          Create Task
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
