import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const { handleLogin } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/users", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => console.log(error));
  }, []);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginButtonHandler = (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.warning("Por favor, complete todos los campos");
      return;
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      toast.warning("Correo electrónico incorrecto");
      return;
    }

    if (user.password !== password) {
      toast.warning("Contraseña incorrecta");
      return;
    }

    if (user.status === true) {
      localStorage.setItem("userName", user.userName);
      handleLogin(email);
      navigate("/home");
    } else {
      toast.warning("Usuario desactivado");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center custom-login">
      <div className="card p-5 text-center custom-card">
        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control no-border"
              placeholder="Email"
              onChange={emailChangeHandler}
              value={email}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control no-border"
              placeholder="Contraseña"
              onChange={passwordChangeHandler}
              value={password}
            />
          </div>

          <button className="btn btn-violet" onClick={loginButtonHandler}>
            Iniciar sesión
          </button>
          <p className="mt-2 text-white">
            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </form>
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
}

export default Login;
