import { useDispatch } from "react-redux";
import { toggleAddBoardModal } from "../redux/slices/slices";
import { FaXmark, FaPlus } from "react-icons/fa6";

const AddBoardModal = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-[#00000052] flex justify-center items-center z-[100]"
      onClick={() => {
        dispatch(toggleAddBoardModal());
      }}
    >
      <div
        className="bg-white w-full max-w-[500px] h-fit rounded-lg p-8 flex flex-col gap-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-2xl font-semibold">Add new board</h2>
        <div className="flex flex-col">
          <p className="text-[#7C8CA4] text-lg font-medium">Board Name</p>
          <input
            type="text"
            placeholder="e.g Web Design"
            className="w-full border border-[#7C8CA4] rounded-md p-3 px-4 focus:outline-none"
          />
        </div>
        <div className="gap-4 flex flex-col">
          <p className="text-[#7C8CA4] text-lg font-medium">Board Columns</p>
          <div className="flex items-center gap-1">
            <input
              type="text"
              className="flex-1 border border-[#7C8CA4] rounded-md p-3 px-4 focus:outline-none"
            />
            <FaXmark className="text-3xl text-[#7C8CA4] " />
          </div>
          <div className="flex items-center gap-1">
            <input
              type="text"
              className="flex-1 w-full border border-[#7C8CA4] rounded-md p-3 px-4 focus:outline-none"
            />
            <FaXmark className="text-3xl text-[#7C8CA4] " />
          </div>
        </div>
        <button className="w-full flex items-center justify-center bg-[#7247ce] text-white p-3 font-semibold rounded-full hover:bg-[#5a34a0] transition-colors duration-200 cursor-pointer">
          <FaPlus />
          Add New Column
        </button>
        <button className="w-full bg-[#7247ce] text-white p-3 font-semibold rounded-full hover:bg-[#5a34a0] transition-colors duration-200 cursor-pointer">
          Create New Board
        </button>
      </div>
    </div>
  );
};

export default AddBoardModal;
