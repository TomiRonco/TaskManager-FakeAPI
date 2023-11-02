import React, { useEffect, useState } from "react";

import Task from "../task/Task";
import "./AllTasks.css";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const tasksMapped = tasks.map((task) => (
    <Task
      name={task.taskName}
      description={task.taskDescription}
      date={task.taskDeliveryDate}
      state={task.taskState}
      asigment={task.taskAsigment}
      class=""
    />
  ));

  return (
    <div className="tasksGrid"
    style={{
      // maxHeight: "600px",
      // maxWidth: "1200px",
      // overflow: "auto",
      // display: "flex",
      // flexDirection: "row",
      // justifyContent: "space-between",
    }}
    >
      {tasksMapped.length > 0 ? tasksMapped : <h3>No posee tareas</h3>}
    </div>
  );
};

export default AllTasks;
