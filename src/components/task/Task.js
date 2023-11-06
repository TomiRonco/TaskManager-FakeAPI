import "./Task.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import useTranslation from "../../custom/useTranslation/useTranslation";

const Task = ({
  name,
  description,
  date,
  updateTask,
  id,
  coment,
  handleComentChange: comentChangeHandler,
}) => {
  const [newComent, setNewComent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const translate = useTranslation();

  const setNewComentHandler = () => {
    if (newComent !== "") {
      comentChangeHandler(id, newComent);
      setNewComent("");
      setIsEditing(false);
    } else {
      toast.warning(translate("enter_comment"));
    }
  };

  const buttonClickHandler = () => {
    updateTask(id);
  };

  const deleteClickHandler = () => {
    comentChangeHandler(id, "");
    setIsEditing(true);
  };

  return (
    <div className="">
      <div class="card d-flex" data-bs-theme="dark">
        <h5 class="card-header d-flex justify-content-between text">
          {name}
          <button onClick={buttonClickHandler} class="btn succes">
            <FiCheck size={20} />
          </button>
        </h5>
        <div class="card-body">
          <h5 class="card-title">
            {translate("delivery")}: {date}
          </h5>
          <hr />
          <p class="card-text"> {description}</p>
          {isEditing || coment === "" ? (
            <div className="text-center">
              <input
                value={newComent}
                type="text"
                onChange={(e) => setNewComent(e.target.value)}
              />
              <button
                onClick={setNewComentHandler}
                className="btn btn-violet mt-3"
              >
                {translate("send_comment")}
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-end">
              <p className="mt-3">{coment}</p>
              <div>
                <button
                  className="btn btn-violet mb-2"
                  onClick={() => setIsEditing(true)}
                >
                  <FiEdit2 color="white" />
                </button>
                <button
                  className="btn btn-danger mb-2 mx-1"
                  onClick={deleteClickHandler}
                >
                  <FiTrash2 color="white" />
                </button>
              </div>
            </div>
          )}
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
    </div>
  );
};

export default Task;
