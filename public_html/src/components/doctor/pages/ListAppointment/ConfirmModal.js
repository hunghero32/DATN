import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const ConfirmModal = ({ show, onHide, title, message, onConfirm, loading }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="success" onClick={onConfirm} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Xác nhận"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;