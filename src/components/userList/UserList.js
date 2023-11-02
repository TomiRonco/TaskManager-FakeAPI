// UserList.js
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/users", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((usersData) => {
        console.log("Datos de usuarios recuperados:", usersData);
        setUsers(usersData);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteUserHandler = (id) => {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast.success("alert_delete_user");
        } else {
          toast.error("alert_delete_user_error");
          throw new Error("alert_delete_user_error");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Password</th>
            <th>Tipo de usuario</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.userType}</td>
              {user.userType === "SuperAdmin" ? (
                <td>
                  <div className="button-container">
                    <button
                      id="tacho"
                      className={`button ${isHovered ? "hovered" : ""}`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <span onClick={() => deleteUserHandler(user.id)}>🗑️</span>
                    </button>
                    {isHovered && <div className="hover-text">Eliminar</div>}
                  </div>
                </td>
              ) : (
                <td>Usuario no autorizado</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
