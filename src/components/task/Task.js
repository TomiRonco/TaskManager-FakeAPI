import React, { useEffect, useState } from "react";

import "./Task.css";

const Task = ({ name, description, date, state, asigment, updateTask, id }) => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);

  const handleButtonClick = () => {
    updateTask(id);
  };

  if (!state || asigment !== userName) {
    return null;
  }
  return (
    <div className="">
      <div class="card d-flex" data-bs-theme="dark">
        <h5 class="card-header">{name}</h5>
        <div class="card-body">
          <h5 class="card-title">Entrega {date}</h5>
          <p class="card-text">{description}</p>
          <button onClick={handleButtonClick} class="btn">
            Completada
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
