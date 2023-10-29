import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./Register.css";
import useTranslation from "../../custom/useTranslation/useTranslation";

const initialValues = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [data, setData] = useState(initialValues);

  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const translate = useTranslation();

  const userNameChangeHandler = (event) => {
    if (userNameRef.current.value.length > 0) {
      userNameRef.current.style.borderColor = "";
      userNameRef.current.style.outline = "";
    }
    setData({ ...data, userName: event.target.value });
  };

  const emailChangeHandler = (event) => {
    if (emailRef.current.value.length > 0) {
      emailRef.current.style.borderColor = "";
      emailRef.current.style.outline = "";
    }
    setData({ ...data, email: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    if (passwordRef.current.value.length > 0) {
      passwordRef.current.style.borderColor = "";
      passwordRef.current.style.outline = "";
    }
    setData({ ...data, password: event.target.value });
  };

  const confirmPasswordChangeHandler = (event) => {
    if (confirmPasswordRef.current.value.length > 0) {
      confirmPasswordRef.current.style.borderColor = "";
      confirmPasswordRef.current.style.outline = "";
    }
    setData({ ...data, confirmPassword: event.target.value });
  };

  const signUpHandler = () => {
    if (userNameRef.current.value.length === 0) {
      userNameRef.current.focus();
      userNameRef.current.style.borderColor = "red";
      userNameRef.current.style.outline = "none";
      alert("Nombre de usuario vacío");
      return;
    }
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
    if (data.confirmPassword.length === 0) {
      confirmPasswordRef.current.focus();
      confirmPasswordRef.current.style.borderColor = "red";
      confirmPasswordRef.current.style.outline = "none";
      alert("Contraseña vacía");
      return;
    }
  };

  return (
    <div
      className="container-fluid custom-container-register"
      data-bs-theme="dark"
    >
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="m-auto w-25 text-center">
          <form className="custom-form">
            <input
              className="form-control mb-3"
              type="text"
              placeholder={translate("user_name")}
              onChange={userNameChangeHandler}
              value={data.userName}
              ref={userNameRef}
            />
            <input
              className="form-control mb-3"
              type="email"
              placeholder={translate("email")}
              onChange={emailChangeHandler}
              value={data.email}
              ref={emailRef}
            />
            <input
              className="form-control mb-3"
              type="password"
              placeholder={translate("password")}
              onChange={passwordChangeHandler}
              value={data.password}
              ref={passwordRef}
            />
            <input
              className="form-control mb-3"
              type="password"
              placeholder={translate("confirm_password")}
              onChange={confirmPasswordChangeHandler}
              value={data.confirmPassword}
              ref={confirmPasswordRef}
            />
            <p className="mt-3 text-center text-white">
              {translate("login?")}{" "}
              <Link to="/login">{translate("login")}</Link>
            </p>
            <button
              type="button"
              className="btn "
              onClick={signUpHandler}
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
