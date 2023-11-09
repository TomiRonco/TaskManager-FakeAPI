import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import useTranslation from "../../custom/useTranslation/useTranslation";

import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const { handleLogin } = useContext(AuthenticationContext);

  const navigate = useNavigate();
  const translate = useTranslation();

  useEffect(() => {
    fetch("https://taskmanaggerapi.onrender.com/users", {
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
      toast.warning(translate("complete_all_fields"));
      return;
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      toast.warning(translate("wrong_email"));
      return;
    }

    if (user.password !== password) {
      toast.warning(translate("wrong_password"));
      return;
    }

    if (user.status === true) {
      fetch(`https://taskmanaggerapi.onrender.com/users/${user.id}`, {
        headers: {
          accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          const { userType } = userData;
          handleLogin(email, user.id, user.userName, userType);
          navigate("/home");
        })
        .catch((error) => {
          toast.warning(translate("error_user_type"));
        });
    } else {
      toast.warning(translate("deactivated_user"));
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
              placeholder={translate("password")}
              onChange={passwordChangeHandler}
              value={password}
            />
          </div>

          <button className="btn btn-violet" onClick={loginButtonHandler}>
            {translate("log_in")}
          </button>
          <p className="mt-2 text-white">
            {translate("not_account")}{" "}
            <Link to="/register">{translate("sign_up")}</Link>
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
