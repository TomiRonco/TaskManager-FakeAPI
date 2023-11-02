import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

import "./UserRegister.css";

const UserRegister = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const { handleLogin } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

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

  const userRegisterHandler = (event) => {
    event.preventDefault();

    if (userName && email && password) {
      const isUsernameTaken = users.some((user) => user.userName === userName);
      const isEmailTaken = users.some((user) => user.email === email);

      if (isUsernameTaken) {
        toast.warning("Nombre de usuario en uso");
      } else if (isEmailTaken) {
        toast.warning("Correo electrónico en uso");
      } else {
        const newUser = {
          userName,
          email,
          password,
          userType: "user",
          status: true,
        };

        fetch("http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((response) => {
            if (response.ok) {
              handleLogin(email);
              navigate("/home");
            } else {
              toast.error("Error al registrar el usuario");
            }
          })
          .catch((error) => toast.error(error.message));
      }
    } else {
      toast.warning("Por favor, complete todos los campos");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center custom-login">
      <div className="card p-5 text-center custom-card">
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control no-border"
              placeholder="Nombre de usuario"
              onChange={userNameChangeHandler}
              value={userName}
            />
          </div>
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

          <button className="btn btn-violet" onClick={userRegisterHandler}>
            Crear cuenta
          </button>
          <p className="mt-2 text-white">
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
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
};

export default UserRegister;
