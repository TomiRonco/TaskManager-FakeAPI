import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [isSigningIn, setIsSigningIn] = useState(false);

  const { handleLogin } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setData({ ...data, email: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setData({ ...data, password: event.target.value });
  };

  const passwordVisibilityToggle = () => {
    setData({ ...data, showPassword: !data.showPassword });
  };

  const signInHandler = () => {
    if (!data.email || !data.password) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    setIsSigningIn(true); // Establecer el estado de inicio de sesión a verdadero al hacer clic en el botón
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.status === 200) {
          const responseData = await response.json();
          if (responseData.status === true) {
            handleLogin(data.email);
            navigate("/home");
          } else {
            toast.error("Usuario desactivo");
          }
        }
      } catch (error) {
        toast.error("Error al iniciar sesión");
      } finally {
        setIsSigningIn(false);
      }
    };

    if (isSigningIn && data.email && data.password) {
      fetchData();
    }
  }, [data, handleLogin, navigate, isSigningIn]);

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
            />
            <div className="d-flex mt-3">
              <input
                className="form-control"
                type={data.showPassword ? "text" : "password"}
                placeholder="Contraseña"
                onChange={passwordChangeHandler}
                value={data.password}
              />
              <button
                className="btn btn-light"
                type="button"
                onClick={passwordVisibilityToggle}
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
