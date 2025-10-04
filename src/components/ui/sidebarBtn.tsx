"use client";
import { toggleSidebar } from "../../lib/redux/slices/sidebarSlice";
import type { RootState } from "../../lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ToggleSidebarBtn = () => {
  const darkMode = useSelector((state: RootState) => state.theme.value);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.value);
  const dispatch = useDispatch();
  return (
    <button
      title="Hide/show sidebar"
      className={`bottom-[5vh] max-md:bottom-[1vh] rounded-tr-full max-md:w-fit rounded-br-full p-3 px-5 fixed left-0 flex items-center text-md max-md:text-sm gap-1  space-x-2 text-[#7C8CA4] cursor-pointer font-semibold  ${
        darkMode ? "hover:bg-white" : "hover:bg-[#ded8ec6b] "
      } hover:text-[#7247ce] ${
        isSidebarOpen
          ? "w-60 max-md:w-50"
          : "w-fit bg-[#7247ce] hover:text-[#7C8CA4] text-white"
      }
          `}
      onClick={() => {
        dispatch(toggleSidebar());
      }}
    >
      {isSidebarOpen && <FaEyeSlash className="text-xl max-md:text-lg" />}
      {!isSidebarOpen && <FaEye className="text-xl max-md:text-lg" />}

      <span className={`${!isSidebarOpen && "hidden"} max-md:hidden`}>Hide Sidebar</span>
    </button>
  );
};

export default ToggleSidebarBtn;
