import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskListContext = createContext();

export const TaskListContextProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem("tasks")) || [];
  const [editItem, setEditItem] = useState(null);
  const [tasks, setTasks] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    setTasks([...tasks, { title, id: uuidv4() }]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearList = () => {
    setTasks([]);
  };

  const findItem = (id) => {
    setEditItem(tasks.find((task) => task.id === id));
  };

  const editTask = (title, id) => {
    const newTask = tasks.map((task) =>
      task.id === id ? { title, id } : task
    );
    setTasks(newTask);
    setEditItem(null);
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        removeTask,
        clearList,
        editItem,
        findItem,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
};
