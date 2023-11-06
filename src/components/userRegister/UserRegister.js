import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import useTranslation from "../../custom/useTranslation/useTranslation";

import "./UserRegister.css";

const UserRegister = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const { handleLogin } = useContext(AuthenticationContext);

  const navigate = useNavigate();
  const translate = useTranslation();

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
        toast.warning(translate("Username_in_use"));
      } else if (isEmailTaken) {
        toast.warning(translate("Email_in_use"));
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
              return response.json();
            } else {
              toast.error(translate("Error_registering_user"));
              throw new Error(translate("Error_registering_user"));
            }
          })
          .then((userData) => {
            const { id, userType } = userData;

            handleLogin(email, id, userName, userType);
            navigate("/home");
          })
          .catch((error) => toast.error(error.message));
      }
    } else {
      toast.warning(translate("complete_all_fields"));
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
              placeholder={translate("user_name")}
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
              placeholder={translate("password")}
              onChange={passwordChangeHandler}
              value={password}
            />
          </div>

          <button className="btn btn-violet" onClick={userRegisterHandler}>
            Crear cuenta
          </button>
          <p className="mt-2 text-white">
            {translate("have_account")}{" "}
            <Link to="/login">{translate("log_in")}</Link>
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
