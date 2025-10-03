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
      className={`bottom-[5vh] max-md:hidden rounded-tr-full  rounded-br-full p-3 px-5 fixed left-0 flex items-center text-md gap-1  space-x-2 text-[#7C8CA4] cursor-pointer font-semibold  ${
        darkMode ? "hover:bg-white" : "hover:bg-[#ded8ec6b] "
      } hover:text-[#7247ce] ${
        isSidebarOpen
          ? "w-60"
          : "w-fit bg-[#7247ce] hover:text-[#7C8CA4] text-white"
      }
          `}
      onClick={() => {
        dispatch(toggleSidebar());
      }}
    >
      {isSidebarOpen && <FaEyeSlash className="text-xl" />}
      {!isSidebarOpen && <FaEye className="text-xl" />}

      <span className={`${!isSidebarOpen && "hidden"}`}>Hide Sidebar</span>
    </button>
  );
};

export default ToggleSidebarBtn;
