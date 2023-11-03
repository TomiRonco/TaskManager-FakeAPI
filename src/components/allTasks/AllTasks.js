import React, { useEffect, useState } from "react";

import Task from "../task/Task";
import "./AllTasks.css";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  }, []);

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
    (task) => task.taskState === true && task.taskAsigment === userName
  );

  const tasksMapped = filteredTasks.map((task) => (
    <Task
      name={task.taskName}
      description={task.taskDescription}
      date={task.taskDeliveryDate}
      state={task.taskState}
      asigment={task.taskAsigment}
      id={task.id}
      updateTask={updateTask}
    />
  ));

  return (
    <div
      className="tasksGrid"
      style={
        {
          // maxHeight: "600px",
          // maxWidth: "1200px",
          // overflow: "auto",
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "space-between",
        }
      }
    >
      {tasksMapped.length > 0 ? (
        tasksMapped
      ) : (
        <h1>
          <span class="badge bg-secondary">No posee tareas asignadas</span>
        </h1>
      )}
    </div>
  );
};

export default AllTasks;
