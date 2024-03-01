import React, { useState, useEffect } from "react";
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  editTask,
  completeTask,
  uncompleteTask,
} from "@/redux/action";
// import AddTaskModal from "@/components/AddTaskModal";
import EditTaskModal from "@/components/EditTaskModal";

export default function TaskList() {
  const allTasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [displayedTasks, setDisplayedTasks] = useState(allTasks);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statistics, setStatistics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    uncompletedTasks: 0,
  });
  const [showStatistics, setShowStatistics] = useState(false);
  const [showList, setShowList] = useState(true);

  const handleDelete = (index) => {
    dispatch(deleteTask(index));
  };

  const handleEdit = (index) => {
    setSelectedTaskIndex(index);
  };

  const handleSaveEdit = (editedTask) => {
    dispatch(
      editTask(
        selectedTaskIndex,
        editedTask.title,
        editedTask.description,
        editedTask.deadline,
        editedTask.assignedTo,
        editedTask.assignedBy
      )
    );
    setSelectedTaskIndex(null);
  };

  const handleComplete = (index, completed) => {
    if (completed) {
      dispatch(uncompleteTask(index));
    } else {
      dispatch(completeTask(index));
    }
  };

  const handleFilterTasks = (status) => {
    // Lọc và cập nhật danh sách công việc hiển thị tương ứng với trạng thái và từ khóa tìm kiếm
    let filteredTasks = allTasks;

    if (status === "doing") {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    } else if (status === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    }

    if (searchTerm) {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setDisplayedTasks(filteredTasks);
  };

  const handleCreateNewTask = () => {
    setCreateTaskModalOpen(true);
  };

  const handleCloseCreateTaskModal = () => {
    setCreateTaskModalOpen(false);
  };

  const handleSaveNewTask = (newTask) => {
    // Gọi action để thêm công việc mới vào Redux store
    dispatch(addTask(newTask));

    // Đóng modal
    setCreateTaskModalOpen(false);
  };

  const calculateStatistics = () => {
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter((task) => task.completed).length;
    const uncompletedTasks = totalTasks - completedTasks;

    setStatistics({
      totalTasks,
      completedTasks,
      uncompletedTasks,
    });
  };

  const handleToggleStatistics = () => {
    setShowStatistics(!showStatistics);
    setShowList(false); // Ẩn danh sách khi hiển thị thống kê
  };

  const handleToggleList = () => {
    setShowList(!showList);
    setShowStatistics(false); // Ẩn thống kê khi hiển thị danh sách
  };

  useEffect(() => {
    setDisplayedTasks(allTasks);
  }, [allTasks]);

  useEffect(() => {
    if (showList) {
      setDisplayedTasks(allTasks);
    } else {
      calculateStatistics();
    }
  }, [allTasks, showList, searchTerm]);

  useEffect(() => {
    handleFilterTasks();
  }, [searchTerm]);

  return (
    <div className="py-2">
      <div className="flex justify-content-center justify-between">
        <div>
          <button
            onClick={() => handleFilterTasks("doing")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10"
          >
            Doing
          </button>
          <button
            onClick={() => handleFilterTasks("completed")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10"
          >
            Completed
          </button>
        </div>
        <div className="flex">
          <button
            onClick={handleCreateNewTask}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10"
          >
            Create new
          </button>
          <form>
            <label
              htmlFor="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Task"
                required
              />
            </div>
          </form>
          <button
            onClick={showList ? handleToggleStatistics : handleToggleList}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-10"
          >
            Statistical
          </button>
        </div>
      </div>
      {showStatistics && (
        <div className="mt-4">
          <p>Total tasks: {statistics.totalTasks}</p>
          <p>Completed tasks: {statistics.completedTasks}</p>
          <p>Uncompleted tasks: {statistics.uncompletedTasks}</p>
        </div>
      )}

      {showList && displayedTasks.length === 0 ? (
        <p className="text-center">The task list is empty</p>
      ) : showList ? (
        displayedTasks.map((task, index) => (
          <div
            className="row border rounded shadow p-3 mb-5 bg-white rounded my-3 p-2"
            key={index}
          >
            <div className="col-12 flex justify-between">
              <div className="col-auto flex align-items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleComplete(index, task.completed)}
                  className="mr-2"
                />
                <div
                // style={{
                //   textDecoration: task.completed ? "line-through" : "none",
                // }}
                >
                  {task && (
                    <>
                      <div className="flex grid grid-cols-3 gap-4">
                        <div
                          className="border-r pr-5 mr-8 col-span-2"
                          style={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          <h4 className="font-bold">{task.title}</h4>
                          <textarea
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            rows="4"
                            cols="50"
                            value={task.description}
                          ></textarea>
                        </div>
                        <div className="m-0 ml-[-20px] flex flex-col">
                          <div
                            style={{
                              textDecoration: task.completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            <p>
                              Assigned to:{" "}
                              {task.assignedTo
                                ? task.assignedTo.join(", ")
                                : "Not assigned"}
                            </p>
                            <p>Assigned by: {task.assignedBy}</p>
                            <i>Deadline: {task.deadline}</i>
                          </div>
                          <div className="flex items-center">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(index)}
                                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                              >
                                <FaEdit className="mr-2" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleComplete(index)}
                                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 mr-2 border border-blue-700 rounded"
                              >
                                <FaCheck className="mr-2" />
                                Complete
                              </button>
                              <button
                                onClick={() => handleDelete(index)}
                                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                              >
                                <FaTrash className="mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : null}
      {selectedTaskIndex !== null && (
        <EditTaskModal
          task={displayedTasks[selectedTaskIndex]}
          onSave={handleSaveEdit}
          onClose={() => {
            setSelectedTaskIndex(null);
            handleFilterTasks(); // Cập nhật danh sách khi đóng modal
          }}
        />
      )}
      {/* {createTaskModalOpen && (
        <AddTaskModal
          onSave={handleSaveNewTask}
          onClose={handleCloseCreateTaskModal}
        />
      )} */}
    </div>
  );
}
