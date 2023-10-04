import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Validations from "../validations/Validations";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const phoneHandler = (event) => {
    setPhone(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  
  const toggleRegister = () => {
    <Validations name={name} lastName={lastName} email= {email} password={password} confirmPassword={confirmPassword} userName={userName} phone={phone} />
  }

  return (
    <div class="container-fluid text-center custom-container">
      <div class="row align-items-center">
        <div class="col-9">Fondo</div>
        <div class="col-3 bg-dark custom-col">
          <form class>
            <div class="row gap-2">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nombre"
                  onChange={nameHandler}
                  value={name}
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Apellido"
                  onChange={lastNameHandler}
                  value={lastName}
                />
              </div>
              <div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="E-Mail"
                  onChange={emailHandler}
                  value={email}
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Usuario"
                  onChange={userNameHandler}
                  value={userName}
                />
              </div>
              <div class="col">
                <input
                  type="phone"
                  class="form-control"
                  placeholder="Telefono"
                  onChange={phoneHandler}
                  value={phone}
                />
              </div>
              <div>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Contraseña"
                  onChange={passwordHandler}
                  value={password}
                />
              </div>
              <div>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirmar contraseña"
                  onChange={confirmPasswordHandler}
                  value={confirmPassword}
                />
              </div>

              <p>
                ¿Ya posees cuenta? <a href="/">Iniciar Sesión</a>
              </p>

              <button
                type="button"
                class="btn btn-primary"
                onClick={toggleRegister}
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
