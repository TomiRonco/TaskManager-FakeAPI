import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Register.css";

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [data, setData] = useState(initialValues);

  const navigate = useNavigate();

  const userNameChangeHandler = (event) => {
    setData({ ...data, userName: event.target.value });
  };

  const emailChangeHandler = (event) => {
    setData({ ...data, email: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setData({ ...data, password: event.target.value });
  };

  const signUpHandler = async () => {
    if (!data.userName || !data.password || !data.email) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        toast.success("Usuario registrado correctamente");
        navigate("/home");
      } else {
        const result = await response.json();
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error en el registro");
    }
  };

  return (
    <div className="container-fluid custom-container-register">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="m-auto w-25 text-center">
          <form className="custom-form">
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Nombre de usuario"
              onChange={userNameChangeHandler}
              value={data.userName}
            />
            <input
              className="form-control mb-3"
              type="email"
              placeholder="Correo Electrónico"
              onChange={emailChangeHandler}
              value={data.email}
            />
            <input
              className="form-control mb-3"
              type="password"
              placeholder="Contraseña"
              onChange={passwordChangeHandler}
              value={data.password}
            />
            <p className="mt-3 text-center text-white">
              ¿Estás registrado? <Link to="/login">Iniciar sesión</Link>
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={signUpHandler}
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
