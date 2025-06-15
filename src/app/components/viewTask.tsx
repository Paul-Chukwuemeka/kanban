import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ViewTask = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#00000052] flex justify-center items-center z-[100]">
      <div className="bg-white w-full max-w-[480px] h-fit rounded-lg p-8 flex flex-col gap-5">
        <div className="flex items-center justify-between text-lg gap-3">
          <h2 className="flex-1 font-bold ">
            Create paper prototypes and conduct 10 usability tests with
            potential customers
          </h2>
          <BsThreeDotsVertical className="text-xl" />
        </div>
        <p>Subtasks (1 of 3)</p>
        <div>
          <div>
            <input type="checkbox" />
            <span className="line-through">testing and stuff</span>
          </div>
          <div>
            <input type="checkbox" />
            <span className="line-through">testing and stuff</span>
          </div>
        </div>
        <span>Current Status</span>
        <select name="status">
          <option value="Done">Done</option>
          <option value="Done">Done</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default ViewTask;
