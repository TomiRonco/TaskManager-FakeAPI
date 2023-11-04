import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddUser({ show, onHide, onAddUser, formData, onFormChange }) {
  const isFormValid = () => {
    return (
      formData.userName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== ""
    );
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre de Usuario:</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={formData.userName}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de Usuario:</Form.Label>
            <Form.Control
              as="select"
              name="userType"
              value={formData.userType}
              onChange={onFormChange}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onAddUser} disabled={!isFormValid()}>
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUser;
