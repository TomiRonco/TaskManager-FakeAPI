import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import useTranslation from "../../custom/useTranslation/useTranslation";

function EditUserModal({
  show,
  onHide,
  onEditUser,
  userToEdit,
  onFormChange,
  users,
  setUsers,
}) {
  const translate = useTranslation();

  if (!userToEdit) {
    return null;
  }

  const handleSaveChanges = () => {
    fetch(`https://taskmanaggerapi.onrender.com/users/${userToEdit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToEdit),
    })
      .then((response) => response.json())
      .then((editedUser) => {
        const updatedUsers = users.map((user) =>
          user.id === editedUser.id ? editedUser : user
        );
        setUsers(updatedUsers);
        toast.success(translate("Successfully_updated_user"));
      })
      .catch((error) => {
        toast.error("Error al editar usuario:");
      });

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{translate("user_edit")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>{translate("user_name")}</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={userToEdit.userName}
              onChange={(e) => onFormChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{translate("email")}</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={userToEdit.email}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{translate("password")}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={userToEdit.password}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{translate("user_type")}</Form.Label>
            <Form.Control
              as="select"
              name="userType"
              value={userToEdit.userType}
              onChange={onFormChange}
            >
              <option value="Admin">Admin</option>
              <option value="user">User</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {translate("close")}
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          {translate("save_change")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
