import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [typeUserSelected, setTypeUserSelected] = useState("Todos");
  const [usersFiltered, setUsersFiltered] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/users", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((usersData) => {
        setUsers(usersData);
        setUsersFiltered(usersData);
        console.log(usersData);
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
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsersFiltered(updatedUsers);
        } else {
          toast.error("alert_delete_user_error");
          throw new Error("alert_delete_user_error");
        }
      })
      .catch((error) => console.error(error));
  };

  const createUserHandler = () => {
    navigate("/createUser");
  };

  return <div>ManageUser</div>;
};

export default ManageUser;
