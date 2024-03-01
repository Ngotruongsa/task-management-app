import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function EditTaskModal({ task, onSave, onClose }) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");
  const [editedAssignedTo, setEditedAssignedTo] = useState([]);
  const [editedAssignedBy, setEditedAssignedBy] = useState("");

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title || "");
      setEditedDescription(task.description || "");
      setEditedDeadline(task.deadline || "");
      setEditedAssignedTo(task.assignedTo || []);
      setEditedAssignedBy(task.assignedBy || "");
    }
  }, [task]);

  const handleSave = () => {
    onSave({
      ...task,
      title: editedTitle,
      description: editedDescription,
      deadline: editedDeadline,
      assignedTo: editedAssignedTo,
      assignedBy: editedAssignedBy,
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
              <h3 className="text-3xl font-semibold">Edit Task</h3>
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
              {task && (
                <>
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
                          name="title"
                          id="title"
                          placeholder="Enter Title..."
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
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
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Enter Description..."
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="Expired date"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Expired date:
                        </label>
                        <input
                          type="datetime-local"
                          id="Expired date"
                          value={editedDeadline}
                          onChange={(e) => setEditedDeadline(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="Assigned to"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Assigned to:
                        </label>
                        <Select
                          isMulti
                          id="Assigned to"
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
                          value={editedAssignedTo.map((user) => ({
                            value: user,
                            label: user,
                          }))}
                          onChange={(selectedOptions) =>
                            setEditedAssignedTo(
                              selectedOptions.map((option) => option.value)
                            )
                          }
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="Assigned by"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Assigned by:
                        </label>
                        <input
                          type="text"
                          name="Assigned by"
                          id="Assigned by"
                          placeholder="Enter Assigned by..."
                          value={editedAssignedBy}
                          onChange={(e) => setEditedAssignedBy(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </form>
                </>
              )}
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
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
