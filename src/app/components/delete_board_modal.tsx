import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { toggleDeleteModal } from "../redux/slices/slices";

const Deleteboardmodal = () => {
  const targetBoard = useSelector(
    (state: RootState) => state.currentBoard.value
  );
  const dispatch = useDispatch();
  return (
    <div className="absolute flex items-center justify-center z-[100] h-screen w-screen bg-[#00000052]"
    onClick={()=>{
        dispatch(toggleDeleteModal())
    }}
    >
      <div className="bg-white p-10 rounded-xl flex flex-col w-[520px] space-y-4">
        <h2 className="font-semibold text-xl text-red-500">
          Delete this board?
        </h2>
        <p className="text-[#7C8CA4]">
          Are you sure you want to delete the &quot;
          {targetBoard && targetBoard.name}&quot; board? This action will remove
          all columns and tasks and cannot be reversed.
        </p>
        <div className="flex space-x-8 justify-between text-lg font-bold">
          <button className="w-1/2 border bg-red-500 text-white cursor-pointer p-3 py-2 rounded-full">
            Delete
          </button>
          <button className="w-1/2 border bg-[#b5c0d2] cursor-pointer border-none p-3 py-2 rounded-full">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deleteboardmodal;
