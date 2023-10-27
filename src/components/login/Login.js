import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import "./Login.css";

import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../service/authenticationContext/authentication.context";

const initialValues = {
  email: "",
  password: "",
  showPassword: false,
};

const Login = () => {
  const [data, setData] = useState(initialValues);

  const { handleLogin } = useContext(AuthenticationContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    if (emailRef.current.value.length > 0) {
      emailRef.current.style.borderColor = "";
      emailRef.current.style.outline = "";
    }
    setData({ ...data, email: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setData({ ...data, password: event.target.value });
  };

  const passwordVisibilityToogle = () => {
    setData({ ...data, showPassword: !data.showPassword });
  };

  const signInHandler = () => {
    if (emailRef.current.value.length === 0) {
      emailRef.current.focus();
      emailRef.current.style.borderColor = "red";
      emailRef.current.style.outline = "none";
      alert("Correo electrónico vacío");
      return;
    }
    if (data.password.length === 0) {
      passwordRef.current.focus();
      passwordRef.current.style.borderColor = "red";
      passwordRef.current.style.outline = "none";
      alert("Contraseña vacía");
      return;
    }
    handleLogin(data.email);
    navigate("/home");
  };

  return (
    <div className="container-fluid custom-container-login">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="m-auto w-25 text-center">
          <form className="custom-form">
            <input
              className="form-control"
              type="email"
              placeholder="Correo Electrónico"
              onChange={emailChangeHandler}
              value={data.email}
              ref={emailRef}
            />
            <div className="d-flex mt-3">
              <input
                className="form-control"
                type={data.showPassword ? "text" : "password"}
                placeholder="Contraseña"
                onChange={passwordChangeHandler}
                value={data.password}
                ref={passwordRef}
              />
              <button
                className="btn btn-light"
                type="button"
                onClick={passwordVisibilityToogle}
              >
                {data.showPassword ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>
            <p className="mt-3 text-center text-white">
              ¿No estás registrado? <Link to="/register">Registrarse</Link>
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={signInHandler}
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
