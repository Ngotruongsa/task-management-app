// import Image from "next/image";
import { useState } from "react";
import Header from "@/components/layout/Header";
import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
// import EditTaskModal from "@/components/EditTaskModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("ASSIGNED"); // Initial active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full">
        <div className="text-center mb-8">
          <Header />
        </div>

        {/* Tabs */}
        <ul className="flex border-b">
          <li className="-mb-px mr-1">
            <a
              className={`bg-white inline-block py-2 px-4 text-blue-700 font-semibold cursor-pointer ${activeTab === "ASSIGNED" && "active-tab border-l border-t border-r rounded-t"}`}
              onClick={() => handleTabClick("ASSIGNED")}
            >
              ASSIGNED
            </a>
          </li>
          <li className="-mb-px mr-1">
            <a
              className={`bg-white inline-block py-2 px-4 text-blue-700 font-semibold cursor-pointer ${activeTab === "RECEIVED" && "active-tab border-l border-t border-r rounded-t"}`}
              onClick={() => handleTabClick("RECEIVED")}
            >
              RECEIVED
            </a>
          </li>
          {/* <li className="mr-1">
            <a
              className={`bg-white inline-block py-2 px-4 text-blue-700 font-semibold cursor-pointer ${activeTab === "FOLLOW" && "active-tab border-l border-t border-r rounded-t"}`}
              onClick={() => handleTabClick("FOLLOW")}
            >
              FOLLOW
            </a>
          </li> */}
        </ul>

        {/* Content based on the active tab */}
        {activeTab === "ASSIGNED" && <AddTask />}
        {activeTab === "RECEIVED" && <TaskList /> }
        {/* {activeTab === "FOLLOW" && <div>FOLLOW Tab Content</div>} */}
      </div>
    </main>
  );
}
