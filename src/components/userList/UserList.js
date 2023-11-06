import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

import AddUser from "../addUser/AddUser";
import EditUserModal from "../editUserModal/EditUserModal";
import useTranslation from "../../custom/useTranslation/useTranslation";

function UserList() {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const authenticatedUserId = user ? user.id : null;
  const authenticatedUserType = user ? user.userType : null;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const translate = useTranslation();

  // Definimos el estado inicial del formulario
  const initialFormData = {
    userName: "",
    email: "",
    password: "",
    userType: "Admin",
    status: true,
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetch("http://localhost:8000/users", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((usersData) => {
        const filteredUsers = usersData.filter(
          (user) => user.id !== authenticatedUserId
        );
        setUsers(filteredUsers);
      })
      .catch((error) => console.log(error));
  }, [authenticatedUserId]);

  const desactivateUserHandler = (userId, userType) => {
    if (authenticatedUserType === "superAdmin") {
      fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: false }),
      })
        .then((response) => response.json())
        .then(() => {
          const updatedUsers = users.filter((user) => user.id !== userId);
          setUsers(updatedUsers);
          toast.success(translate("deleted_user"));
        })
        .catch((error) => console.log(error));
    } else {
      toast.warning(translate("not_permissions_deleted"));
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddUser = () => {
    const isExistingUserName = users.some(
      (existingUser) => existingUser.userName === formData.userName
    );

    const isExistingEmail = users.some(
      (existingUser) => existingUser.email === formData.email
    );

    const userType = formData.userType === "Admin" ? "Admin" : "user";

    if (isExistingUserName) {
      toast.error(translate("Username_in_use"));
    } else if (isExistingEmail) {
      toast.error(translate("Email_in_use"));
    } else {
      const updatedFormData = {
        ...formData,
        userType,
      };

      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      })
        .then((response) => response.json())
        .then((newUser) => {
          setUsers([...users, newUser]);
          toast.success(translate("successsfully_added"));
          // Restablece editingUser a null para evitar la edición accidental
          setEditingUser(null);
        })
        .catch((error) => {
          console.error(translate("error_adding"), error);
          toast.error(translate("error_adding"));
        });

      setIsAddUserModalOpen(false);
    }
  };

  const handleEditUser = (user) => {
    if (user) {
      setEditingUser(user);
      setIsEditModalOpen(true);
    }
  };

  return (
    <div className="w-100 text-center">
      <button
        className="btn btn-violet mb-3"
        onClick={() => {
          setFormData(initialFormData);
          setIsAddUserModalOpen(true);
        }}
      >
        {translate("add_user")}
      </button>
      <table className="table table-dark text-center rounded">
        <thead>
          <tr>
            <th>ID</th>
            <th>{translate("user_name")}</th>
            <th>{translate("email")}</th>
            <th>{translate("password")}</th>
            <th>{translate("user_type")}</th>
            <th>{translate("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.id !== authenticatedUserId
                  ? user.id
                  : translate("authenticated")}
              </td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.userType}</td>
              <td>
                <button className="btn" onClick={() => handleEditUser(user)}>
                  <FiEdit2 color="white" />
                </button>
                <button
                  className="btn"
                  onClick={() => desactivateUserHandler(user.id, user.userType)}
                >
                  <MdDelete color="white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <AddUser
        show={isAddUserModalOpen}
        onHide={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
        formData={formData}
        onFormChange={handleFormChange}
      />
      <EditUserModal
        show={isEditModalOpen}
        onHide={() => setIsEditModalOpen(false)}
        onEditUser={handleEditUser}
        userToEdit={editingUser}
        onFormChange={handleFormChange}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}

export default UserList;
