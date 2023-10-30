import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Register.css";
import useTranslation from "../../custom/useTranslation/useTranslation";

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [data, setData] = useState(initialValues);

  const navigate = useNavigate();

  const translate = useTranslation();

  const userNameChangeHandler = (event) => {
    setData({ ...data, userName: event.target.value });
  };

  const emailChangeHandler = (event) => {
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
            />
            <input
              className="form-control mb-3"
              type="email"
              placeholder={translate("email")}
              onChange={emailChangeHandler}
              value={data.email}
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
            />
            <p className="mt-3 text-center text-white">
              ¿Estás registrado? <Link to="/login">Iniciar sesión</Link>
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
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
