import React from "react";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";

import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const passwordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  const toggleLogin = () => {
    if (userName === "" || password === "") {
      alert("Por favor, completá todos los campos.");
    } else {
      alert("¡Inicio de sesión exitoso!");

      setUserName("");
      setPassword("");
    }
  };

  return (
    <div class="container-fluid text-center custom-container">
      <div class="row align-items-center">
        <div class="col-9">Fondo</div>
        <div class="col-3 custom-col bg-primary">
          <form>
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              onChange={userNameHandler}
              value={userName}
            />
            <div className="d-flex">
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={passwordHandler}
                value={password}
              />
              <button
                className="btn btn-warning"
                type="button"
                onClick={passwordVisibilityToggle}
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
            <p className="login-signup m-auto">
              ¿No estás registrado? <a href="/">Sign Up</a>
            </p>
            <button
              type="button"
              className="btn btn-warning"
              onClick={toggleLogin}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
