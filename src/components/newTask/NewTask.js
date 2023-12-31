import React, { useState, useEffect, useRef } from "react";

import "./NewTask.css";
import { ToastContainer, toast } from "react-toastify";
import useTranslation from "../../custom/useTranslation/useTranslation";

const NewTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeliveryDate, setTaskDeliveryDate] = useState("");
  const [taskAsigment, setTaskAsigment] = useState("");
  const [tasks, setTasks] = useState([]);
  const [nextTaskId, setNextTaskId] = useState(1);
  const [users, setUsers] = useState([]);
  const [taskComent, setTaskComent] = useState();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const asigmentRef = useRef(null);

  const translate = useTranslation();

  const newTaskNameHandler = (event) => {
    if (nameRef.current.value.length > 0) {
      nameRef.current.style.borderColor = "";
      nameRef.current.style.outline = "";
    }
    setTaskName(event.target.value);
    setTaskComent("");
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
    fetch("https://taskmanaggerapi.onrender.com/tasks", {
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
    fetch("https://taskmanaggerapi.onrender.com/users", {
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
      toast.warning(translate("complete_all_fields"));
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
        taskComent,
        creatorName: userNameFromLocalStorage,
      };

      fetch("https://taskmanaggerapi.onrender.com/tasks", {
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
          setTaskComent("");
          toast.success(translate("task_created"));
        })
        .catch((error) => console.log(error));
    }
  };

  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const userNameFromLocalStorage = userFromLocalStorage.username;

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
        <label htmlFor="floatingName">{translate("name")}</label>
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
        <label htmlFor="floatingDescription">{translate("description")}</label>
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
        <label htmlFor="floatingDate">{translate("deliver_date")}</label>
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
          <option value="" disabled>
            Seleccionar usuario
          </option>
          {users.map(
            (user) =>
              user.userName !== userNameFromLocalStorage && (
                <option key={user.id} value={user.userName}>
                  {user.userName}
                </option>
              )
          )}
        </select>
        <label htmlFor="floatingAsigment">{translate("assign")}:</label>
      </div>

      <div className="button">
        <button className="btn btn-violet mb-3" onClick={addTaskHandler}>
          {translate("create")}
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
