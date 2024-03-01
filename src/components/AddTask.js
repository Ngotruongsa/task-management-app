"use client";

import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { addTask } from "@/redux/action";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [assignedBy, setAssignedBy] = useState("");
  const dispatch = useDispatch();

  const userOptions = [
    { value: "Ngô Đăng Trường Sa", label: "Ngô Đăng Trường Sa" },
    { value: "Ngô Đăng Hoàng Sa", label: "Ngô Đăng Hoàng Sa" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(title, description, deadline, assignedTo, assignedBy));
    setTitle("");
    setDescription("");
    setDeadline("");
    setAssignedTo([]);
    setAssignedBy("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6">
        <div className="mb-0.5">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            placeholder="Enter Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="Expired date">Expired date</label>
          <input
            type="datetime-local"
            id="Expired date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="Assigned to">Assigned to</label>
          <Select
            id="Assigned to"
            options={userOptions}
            value={userOptions.filter((option) =>
              assignedTo.includes(option.value)
            )}
            isMulti
            onChange={(selectedOptions) =>
              setAssignedTo(selectedOptions.map((option) => option.value))
            }
          />
        </div>
        <div>
          <label htmlFor="Assigned by">Assigned by</label>
          <input
            type="text"
            id="Assigned by"
            placeholder="Enter Assigned by..."
            value={assignedBy}
            onChange={(e) => setAssignedBy(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
