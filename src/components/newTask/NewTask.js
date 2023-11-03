import React, { useState, useEffect, useRef } from "react";

import "./NewTask.css";
import { ToastContainer, toast } from "react-toastify";

const NewTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeliveryDate, setTaskDeliveryDate] = useState("");
  const [taskAsigment, setTaskAsigment] = useState("");
  const [tasks, setTasks] = useState([]);
  const [nextTaskId, setNextTaskId] = useState(1);
  const [users, setUsers] = useState([]);

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const asigmentRef = useRef(null);

  const newTaskNameHandler = (event) => {
    if (nameRef.current.value.length > 0) {
      nameRef.current.style.borderColor = "";
      nameRef.current.style.outline = "";
    }
    setTaskName(event.target.value);
  };

  const newTaskDescripcionHandler = (event) => {
    if (descriptionRef.current.value.length > 0) {
      descriptionRef.current.style.borderColor = "";
      descriptionRef.current.style.outline = "";
    }
    setTaskDescription(event.target.value);
  };

  const newTaskDeliveryDateHandler = (event) => {
    if (dateRef.current.value.length > 0) {
      dateRef.current.style.borderColor = "";
      dateRef.current.style.outline = "";
    }
    setTaskDeliveryDate(event.target.value);
  };

  const newTaskAsigmentHandler = (event) => {
    if (asigmentRef.current.value.length > 0) {
      asigmentRef.current.style.borderColor = "";
      asigmentRef.current.style.outline = "";
    }
    setTaskAsigment(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:8000/tasks", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((taskData) => {
        setTasks(taskData);
        if (taskData.length > 0) {
          const maxId = Math.max(...taskData.map((task) => task.id));
          setNextTaskId(maxId + 1);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/users", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        setUsers(userData);
      })
      .catch((error) => console.log(error));
  }, []);

  const addTaskHandler = () => {
    if (
      taskName === "" ||
      taskDescription === "" ||
      taskDeliveryDate === "" ||
      taskAsigment === ""
    ) {
      toast.warning("Completa todos los campos");
      if (nameRef.current.value.length === 0) {
        nameRef.current.style.borderColor = "#96242F";
        nameRef.current.style.outline = "none";
      } else {
        nameRef.current.style.borderColor = "grey";
        nameRef.current.style.outline = "none";
      }

      if (descriptionRef.current.value.length === 0) {
        descriptionRef.current.style.borderColor = "#96242F";
        descriptionRef.current.style.outline = "none";
      } else {
        descriptionRef.current.style.borderColor = "grey";
        descriptionRef.current.style.outline = "none";
      }

      if (dateRef.current.value.length === 0) {
        dateRef.current.focus();
        dateRef.current.style.borderColor = "#96242F";
        dateRef.current.style.outline = "none";
      } else {
        dateRef.current.style.borderColor = "grey";
        dateRef.current.style.outline = "none";
      }

      if (asigmentRef.current.value.length === 0) {
        asigmentRef.current.style.borderColor = "#96242F";
        asigmentRef.current.style.outline = "none";
      } else {
        asigmentRef.current.style.borderColor = "grey";
        asigmentRef.current.style.outline = "none";
      }
    } else {
      const newTask = {
        id: nextTaskId,
        taskName,
        taskDescription,
        taskDeliveryDate,
        taskState: true,
        taskAsigment,
      };

      fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          if (response.ok) return response.json();
          else {
            throw new Error("The response had some errors");
          }
        })
        .then(() => {
          const newTaskArray = [newTask, ...tasks];
          setTasks(newTaskArray);
          setTaskName("");
          setTaskDescription("");
          setTaskDeliveryDate("");
          setTaskAsigment("");
          setNextTaskId(nextTaskId + 1);
          toast.success("Tarea creada exitosamente");
        })
        .catch((error) => console.log(error));
    }
  };
  const userIdFromLocalStorage = localStorage.getItem("id");
  return (
    <div className="form" data-bs-theme="dark">
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="floatingName"
          placeholder="Nombre de la tarea"
          onChange={newTaskNameHandler}
          value={taskName}
          ref={nameRef}
        ></input>
        <label htmlFor="floatingName">Nombre</label>
      </div>
      <div className="form-floating mb-3">
        <textarea
          id="floatingDescription"
          className="form-control"
          placeholder="Descripcion"
          onChange={newTaskDescripcionHandler}
          value={taskDescription}
          ref={descriptionRef}
        ></textarea>
        <label htmlFor="floatingDescription">Descripcion</label>
      </div>
      <div className="form-floating mb-3">
        <input
          id="floatingDate"
          className="form-control"
          placeholder="Fecha de entrega"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          onChange={newTaskDeliveryDateHandler}
          value={taskDeliveryDate}
          ref={dateRef}
        ></input>
        <label htmlFor="floatingDate">Fecha entrega</label>
      </div>
      <div className="form-floating mb-3">
        <select
          id="floatingAsigment"
          className="form-control"
          placeholder="Asignar"
          onChange={newTaskAsigmentHandler}
          value={taskAsigment}
          ref={asigmentRef}
        >
          {users.map(
            (user) =>
              user.id !== parseInt(userIdFromLocalStorage, 10) && (
                <option key={user.id} value={user.userName}>
                  {user.userName}
                </option>
              )
          )}
        </select>
        <label htmlFor="floatingAsigment">Asignar a:</label>
      </div>
      <div className="button">
        <button className="btn mb-3" onClick={addTaskHandler}>
          crear
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        progressStyle={{ background: "violet" }}
      />
    </div>
  );
};

export default NewTask;
