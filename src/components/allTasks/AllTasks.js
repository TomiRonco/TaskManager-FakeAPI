import React, { useEffect, useState } from "react";

import Task from "../task/Task";
import "./AllTasks.css";
import useTranslation from "../../custom/useTranslation/useTranslation";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const translate = useTranslation();

  useEffect(() => {
    fetch("https://taskmanaggerapi.onrender.com/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleComentChange = async (id, newComent) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, taskComent: newComent };
      const response = await fetch(
        `https://taskmanaggerapi.onrender.com/tasks/${taskToUpdate.id}`,
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
        `https://taskmanaggerapi.onrender.com/tasks/${taskToUpdate.id}`,
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

  let filteredTasks;

  if (user.userType === "Admin") {
    filteredTasks = tasks.filter((task) => task.creatorName === user.username);
  } else if (user.userType === "superAdmin") {
    filteredTasks = tasks;
  } else {
    filteredTasks = tasks.filter(
      (task) => task.taskState === true && task.taskAsigment === user.username
    );
  }

  const tasksMapped = filteredTasks.map((task) => (
    <Task
      key={task.id}
      name={task.taskName}
      description={task.taskDescription}
      date={task.taskDeliveryDate}
      state={task.taskState}
      asigment={task.taskAsigment}
      assignedUser={task.taskAsigment}
      id={task.id}
      coment={task.taskComent}
      updateTask={updateTask}
      handleComentChange={handleComentChange}
      userType={user.userType}
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
