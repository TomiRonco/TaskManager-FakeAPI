import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useTranslation from "../../custom/useTranslation/useTranslation";

function AddUser({ show, onHide, onAddUser, formData, onFormChange }) {
  const translate = useTranslation();

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
        <Modal.Title>{translate("add_user")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>{translate("user_name")}:</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={formData.userName}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{translate("email")}:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{translate("password")}:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{translate("user_type")}:</Form.Label>
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
          {translate("close")}
        </Button>
        <Button variant="primary" onClick={onAddUser} disabled={!isFormValid()}>
          {translate("add")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUser;
