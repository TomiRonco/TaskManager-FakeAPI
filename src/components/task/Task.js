import { FiCheck } from "react-icons/fi";
import "./Task.css";

const Task = ({ name, description, date, updateTask, id }) => {
  const handleButtonClick = () => {
    updateTask(id);
  };

  return (
    <div className="">
      <div class="card d-flex" data-bs-theme="dark">
        <h5 class="card-header d-flex justify-content-between">
          {name}
          <button onClick={handleButtonClick} class="btn succes">
            <FiCheck size={20} />
          </button>
        </h5>
        <div class="card-body">
          <h5 class="card-title">Entrega {date}</h5>
          <p class="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Task;
