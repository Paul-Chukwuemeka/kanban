import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../lib/redux/store";
import { deleteBoard } from "../../lib/redux/slices/boardsSlice";
import { Board } from "@/types";

type DeleteboardmodalProps = {
  onClose: () => void;
};

const Deleteboardmodal = ({ onClose }: DeleteboardmodalProps) => {
  const currentBoard = useSelector((state: RootState) => state.currentBoard.value) as Board | null;
  const dispatch = useDispatch();



  return (
    <div
      className="absolute flex items-center justify-center z-[100] h-screen w-screen bg-[#00000052]"
      onClick={onClose}
    >
      <div
        className="bg-white p-10 rounded-xl flex flex-col w-[450px] space-y-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="font-semibold text-xl text-red-500">
          Delete this board?
        </h2>
        <p className="text-[#7C8CA4]">
          Are you sure you want to delete the &quot;
          {currentBoard && currentBoard.name}&quot; board? This action will
          remove all columns and tasks and cannot be reversed.
        </p>
        <div className="flex space-x-8 justify-between text-lg font-bold">
          <button
            className="w-1/2 border bg-red-500 text-white cursor-pointer p-3 py-2 rounded-full"
            onClick={() => {
              dispatch(deleteBoard(currentBoard && currentBoard.id));
              onClose();
            }}
          >
            Delete
          </button>
          <button
            className="w-1/2 border bg-[#b5c0d2] cursor-pointer border-none p-3 py-2 rounded-full"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deleteboardmodal;
