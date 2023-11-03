import "./Task.css";

const Task = ({ name, description, date, updateTask, id }) => {
  const handleButtonClick = () => {
    updateTask(id);
  };

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
