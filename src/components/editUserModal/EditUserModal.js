import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

function EditUserModal({
  show,
  onHide,
  onEditUser,
  userToEdit,
  onFormChange,
  users,
  setUsers,
}) {
  if (!userToEdit) {
    return null; // Si userToEdit es nulo, no mostramos nada
  }

  const handleSaveChanges = () => {
    fetch(`http://localhost:8000/users/${userToEdit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToEdit),
    })
      .then((response) => response.json())
      .then((editedUser) => {
        // Actualiza el estado 'users' con el usuario editado
        const updatedUsers = users.map((user) =>
          user.id === editedUser.id ? editedUser : user
        );
        setUsers(updatedUsers);
        toast.success("Usuario actualizado correctamente");
      })
      .catch((error) => {
        console.error("Error al editar usuario:", error);
        toast.error("Error al editar usuario");
      });

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre de Usuario:</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={userToEdit.userName}
              onChange={(e) => onFormChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={userToEdit.email}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={userToEdit.password}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de Usuario:</Form.Label>
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
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
