import React, { useEffect, useState } from "react";

import Task from "../task/Task";
import "./AllTasks.css";
import useTranslation from "../../custom/useTranslation/useTranslation";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  let user = localStorage.getItem("user");

  const translate = useTranslation();

  user = JSON.parse(user);

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleComentChange = async (id, newComent) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, taskComent: newComent };
      const response = await fetch(
        `http://localhost:8000/tasks/${taskToUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      } else {
        console.error("Error:", response.statusText);
      }
    }
  };

  const updateTask = async (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, taskState: false };
      const response = await fetch(
        `http://localhost:8000/tasks/${taskToUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      } else {
        console.error("Error:", response.statusText);
      }
    }
  };
  const filteredTasks = tasks.filter(
    (task) => task.taskState === true && task.taskAsigment === user.username
  );

  const tasksMapped = filteredTasks.map((task) => (
    <Task
      name={task.taskName}
      description={task.taskDescription}
      date={task.taskDeliveryDate}
      state={task.taskState}
      asigment={task.taskAsigment}
      id={task.id}
      coment={task.taskComent}
      updateTask={updateTask}
      handleComentChange={handleComentChange}
    />
  ));

  return (
    <div className="tasksGrid">
      {tasksMapped.length > 0 ? (
        tasksMapped
      ) : (
        <h1>
          <span className="badge bg-secondary">
            {translate("")}
            {user.username}
            <p>{translate("You_have_no_assigned_tasks")}</p>
          </span>
        </h1>
      )}
    </div>
  );
};

export default AllTasks;
