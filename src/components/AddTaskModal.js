import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "@/redux/action";
import Select from "react-select";

export default function AddTaskModal({ onSave, onClose }) {
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    assignedTo: [],
    assignedBy: "",
  });

  const handleSave = () => {
    // Check if all required fields are filled
    if (!newTask.title || !newTask.description || !newTask.deadline) {
      // You can handle validation, for now, just return
      return;
    }

    // Call onSave with the new task object
    onSave({
      title: newTask.title,
      description: newTask.description,
      deadline: newTask.deadline,
      assignedTo: newTask.assignedTo,
      assignedBy: newTask.assignedBy,
    });

    // Optionally, you can reset the form or close the modal here
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      assignedTo: [],
      assignedBy: "",
    });

    onClose();
  };

  

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Task</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      placeholder="Enter Title..."
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description:
                    </label>
                    <textarea
                      id="description"
                      placeholder="Enter Description..."
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          description: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="deadline"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Deadline:
                    </label>
                    <input
                      type="datetime-local"
                      id="deadline"
                      value={newTask.deadline}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          deadline: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="assignedTo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Assigned to:
                    </label>
                    <Select
                      isMulti
                      id="assignedTo"
                      options={[
                        {
                          value: "Ngô Đăng Trường Sa",
                          label: "Ngô Đăng Trường Sa",
                        },
                        {
                          value: "Ngô Đăng Hoàng Sa",
                          label: "Ngô Đăng Hoàng Sa",
                        },
                      ]}
                      value={newTask.assignedTo.map((user) => ({
                        value: user,
                        label: user,
                      }))}
                      onChange={(selectedOptions) =>
                        setNewTask({
                          ...newTask,
                          assignedTo: selectedOptions.map(
                            (option) => option.value
                          ),
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="assignedBy"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Assigned by:
                    </label>
                    <input
                      type="text"
                      id="assignedBy"
                      placeholder="Enter Assigned by..."
                      value={newTask.assignedBy}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          assignedBy: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
              </form>
              <div>
                <p>Title: {newTask.title}</p>
                <p>Description: {newTask.description}</p>
                <p>Deadline: {newTask.deadline}</p>
                <p>Assigned to: {newTask.assignedTo.join(", ")}</p>
                <p>Assigned by: {newTask.assignedBy}</p>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSave}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
