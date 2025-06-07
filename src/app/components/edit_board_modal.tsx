import React from "react";
import { useDispatch } from "react-redux";
import { toggleEditBoardModal } from "../redux/slices/slices";

const EditBoardModal = () => {
  const dispatch = useDispatch()
  return (
    <div className="absolute top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center bg-[#00000052]"
    onClick={()=>{
      dispatch(toggleEditBoardModal())
    }}>
      <div className="bg-white h-90 w-96 rounded-xl"
      onClick={(e)=>{
        e.stopPropagation()
      }}
      >

      </div>
    </div>
  );
};

export default EditBoardModal;
