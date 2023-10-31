import React, { useState, useRef } from "react";

import "./NewTask.css";

const taskInitialValues = {
  taskName: "",
  taskDescription: "",
  taskDeliveryDate: new Date(),
  taskState: true,
  taskAsigment: [],
};
const NewTask = () => {
  const [newTask, setNewTask] = useState(taskInitialValues); // aca deberia setear al arreglo donde esten todas las tareas

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const asigmentRef = useRef(null);

  const newTaskNameHandler = (event) => {
    if (nameRef.current.value.length > 0) {
      nameRef.current.style.borderColor = "";
      nameRef.current.style.outline = "";
    }
    setNewTask({ ...newTask, taskName: event.target.value });
  };

  const newTaskDescripcionHandler = (event) => {
    if (descriptionRef.current.value.length > 0) {
      descriptionRef.current.style.borderColor = "";
      descriptionRef.current.style.outline = "";
    }
    setNewTask({ ...newTask, taskDescription: event.target.value });
  };

  const newTaskDeliveryDateHandler = (event) => {
    if (dateRef.current.value.length > 0) {
      dateRef.current.style.borderColor = "";
      dateRef.current.style.outline = "";
    }
    setNewTask({ ...newTask, taskDeliveryDate: event.target.value });
  };

  const newTaskAsigmentHandler = (event) => {
    if (asigmentRef.current.value.length > 0) {
      asigmentRef.current.style.borderColor = "";
      asigmentRef.current.style.outline = "";
    }
    setNewTask({ ...newTask, taskAsigment: event.target.value });
  };

  const addHandler = () => {
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

    if (dateRef.current.value.lentgth === 0) {
      // no se ve ningun cambio
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
  };

  return (
    <div class="form" data-bs-theme="dark">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          id="floatingName"
          placeholder="Nombre de la tarea"
          ref={nameRef}
          onChange={newTaskNameHandler}
        ></input>
        <label for="floatingName">Nombre</label>
      </div>
      <div class="form-floating mb-3">
        <textarea
          id="floatingDescription"
          class="form-control"
          placeholder="Descripcion"
          ref={descriptionRef}
          onChange={newTaskDescripcionHandler}
        ></textarea>
        <label for="floatingDescription">Descripcion</label>
      </div>
      <div class="form-floating mb-3">
        <input
          id="floatingDate"
          class="form-control"
          placeholder="Fecha de entrega"
          ref={dateRef}
          type="date"
          onChange={newTaskDeliveryDateHandler}
        ></input>
        <label for="floatingDate">Fecha entrega</label>
      </div>
      <div class="form-floating mb-3">
        <input
          id="floatingAsigment"
          class="form-control"
          placeholder="Asignar"
          ref={asigmentRef}
          onChange={newTaskAsigmentHandler}
        ></input>
        <label for="floatingAsigment">Asignacion</label>
      </div>
      <div class="button">
        <button class="btn mb-3" onClick={addHandler}>
          crear
        </button>
      </div>
    </div>
  );
};

export default NewTask;
