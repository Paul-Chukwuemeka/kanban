"use client";
import Header from "./components/header";
import Sidebar from "./components/sideBar";
import {useSelector } from "react-redux";


export default function Home() {
  const darkMode = useSelector((state) => state.theme.value);

  return (
    <div className={`flex flex-col h-screen w-screen ${darkMode && "bg-[#211F2C]" }`}>
      <Header />
      <main className="relative flex-1">
        <Sidebar />
      </main>
    </div>
  );
}
