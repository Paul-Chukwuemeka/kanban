import { RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes, FaPlus } from "react-icons/fa";
import { Board, SubTask, Task } from "@/types";
import { useEffect, useState } from "react";
import { updateBoard } from "@/lib/redux/slices/boardsSlice";

type EditTaskModalProps = {
  onClose: () => void;
  notifySuccess: (msg: string) => void;
  notifyError: (msg: string) => void;
};

const EditTaskModal = ({
  onClose,
  notifySuccess,
  notifyError,
}: EditTaskModalProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.value);

  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    subTasks: [] as SubTask[],
  });
  const dispatch = useDispatch();
  const currentTask = useSelector(
    (state: RootState) => state.currentTask.value
  );
  const currentBoard = useSelector(
    (state: RootState) => state.currentBoard.value!
  );

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    }
  }, [currentTask]);

  function handleSave() {
    try {
      const newColumns = (currentBoard as Board).columns.map((column) => {
        return {
          ...column,
          tasks: column.tasks?.map((t) =>
            t.id === currentTask?.id ? task : t
          ),
        };
      });
      const newBoard = {
        ...(currentBoard as Board),
        columns: newColumns,
      };
      notifySuccess("Task edited successfully");
      dispatch(updateBoard(newBoard));
      onClose();
    } catch (error) {
      console.error("Error editing task:", error);
      notifyError("Failed to edit task. Please try again.");
    }
  }
  function handleDeleteSubtask(subtaskId: string) {
    setTask({
      ...task,
      subTasks: task.subTasks.filter((subtask) => subtask.id !== subtaskId),
    });
  }

  return (
    <div
      className="absolute w-full h-screen p-5 bg-[#00000052] top-0 flex items-center justify-center left-0 z-10"
      onClick={onClose}
    >
      <form
        className={` w-full max-w-md h-fit *:w-full min-h-[300px] rounded-lg p-8 px-6 flex flex-col items-center gap-5 ${
          darkMode ? "bg-[#2C2A37] text-white" : "bg-gray-100 text-black"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <h1 className="text-2xl font-semibold">Edit Task</h1>
        <div className="flex flex-col gap-2">
          <p className="text-[#7C8CA4] text-md font-medium">Task Name</p>
          <input
            required
            type="text"
            placeholder="e.g. Design the landing page"
            value={task.name}
            className="w-full border border-[#7C8CA4] rounded-md p-2 px-3 focus:outline-none"
            onChange={(e) => {
              setTask({
                ...task,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Description</p>
          <textarea
            placeholder="e.g. Create a detailed design document"
            value={task.description}
            className="w-full border min-h-20 border-[#7C8CA4] rounded-md p-2 px-3 focus:outline-none"
            onChange={(e) => {
              setTask({
                ...task,
                description: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#7C8CA4] text-md font-medium">Subtasks</p>
          {task &&
            task.subTasks.map((subtask, index) => (
              <div className="flex items-center text-md gap-2" key={index}>
                <input
                  required
                  type="text"
                  value={subtask.name}
                  placeholder="e.g. Create wireframes"
                  className="w-full border border-[#7C8CA4] rounded-md p-2 px-3 focus:outline-none"
                  onChange={(e) => {
                    setTask({
                      ...task,
                      subTasks: task.subTasks.map((subtask, i) =>
                        i === index
                          ? { ...subtask, name: e.target.value }
                          : subtask
                      ),
                    });
                  }}
                />
                <FaTimes
                  className="text-gray-500 cursor-pointer"
                  onClick={() => {
                    handleDeleteSubtask(subtask.id);
                  }}
                />
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-2  items-center">
          <button
            className="flex items-center gap-2 bg-[#7247ce] font-semibold text-white h-14 rounded-xl hover:bg-[#5a34a0] w-full transition-colors duration-200 cursor-pointer justify-center"
            onClick={() => {
              setTask({
                ...task,
                subTasks: [...task.subTasks, { name: "", id: "" }] as SubTask[],
              });
            }}
            type="button"
          >
            <FaPlus />
            Add new task
          </button>
          <button
            className="text-white  font-semibold text-lg h-14 rounded-xl hover:bg-[#5a34a0] cursor-pointer w-full bg-[#7247ce]"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskModal;
