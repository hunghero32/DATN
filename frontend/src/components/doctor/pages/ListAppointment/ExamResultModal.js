import React from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";

const ExamResultModal = ({
  showView,
  showEdit,
  onHideView,
  onHideEdit,
  setShowEditResultModal,
  selectedAppointment,
  diagnosis,
  setDiagnosis,
  notes,
  setNotes,
  prescription,
  setPrescription,
  file,
  setFile,
  handleUpdateExamResult,
  loading,
  error,
}) => {
  return (
    <>
      <Modal show={showView} onHide={onHideView} size="lg">
        <style>
          {`
            .modal-content {
              border-radius: 15px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }

            .modal-header {
              background-color: #f9fafb;
              border-bottom: 1px solid #e5e7eb;
            }

            .modal-title {
              font-size: 1.5rem;
              font-weight: 600;
              color: #1f2937;
            }

            .modal-body {
              padding: 2rem;
            }

            .form-label {
              font-weight: 600;
              color: #374151;
              margin-bottom: 0.5rem;
            }

            .form-control {
              border-radius: 8px;
              border: 1px solid #e0e4e8;
              background-color: #f9fafb;
              font-size: 15px;
              color: #374151;
              padding: 0.75rem;
            }

            .form-control:focus {
              border-color: #3b82f6;
              box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
            }

            .modal-footer {
              border-top: 1px solid #e5e7eb;
              padding: 1rem 2rem;
            }

            .btn {
              padding: 0.5rem 1.2rem;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 600;
              transition: all 0.3s ease;
            }

            .btn-primary {
              background-color: #3b82f6;
              border-color: #3b82f6;
            }

            .btn-primary:hover {
              background-color: #2563eb;
              border-color: #2563eb;
            }

            .btn-secondary {
              background-color: #6b7280;
              border-color: #6b7280;
            }

            .btn-secondary:hover {
              background-color: #4b5563;
              border-color: #4b5563;
            }
          `}
        </style>
        <Modal.Header closeButton>
          <Modal.Title>Kết quả khám</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : diagnosis || notes || prescription || file ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Chẩn đoán:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={diagnosis || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Đơn thuốc:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={prescription || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ghi chú:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={notes || ""}
                  readOnly
                />
              </Form.Group>
              // Trong phần Form.Group cho file upload
              <Form.Group className="mb-3">
                <Form.Label>Tệp đính kèm:</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  }}
                />
                {file && typeof file === "string" && (
                  <p>
                    Tệp hiện tại:{" "}
                    <a
                      href={`http://127.0.0.1:8000/storage/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Xem tệp
                    </a>
                  </p>
                )}
              </Form.Group>
            </Form>
          ) : (
            <p className="text-muted">Chưa có kết quả khám.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHideView}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowEditResultModal(true);
              onHideView();
            }}
          >
            {(diagnosis || notes || prescription || file) ? "Sửa" : "Thêm kết quả khám"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={onHideEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {(diagnosis || notes || prescription || file) ? "Sửa kết quả khám" : "Thêm kết quả khám"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chẩn đoán:</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={diagnosis || ""}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Đơn thuốc:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={prescription || ""}
                onChange={(e) => setPrescription(e.target.value)}
                placeholder="Nhập đơn thuốc cho bệnh nhân..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ghi chú:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes || ""}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tệp đính kèm:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file && typeof file === "string" && (
                <p>
                  Tệp hiện tại:{" "}
                  <a
                    href={`http://127.0.0.1:8000/storage/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Xem tệp
                  </a>
                </p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHideEdit}>
            Hủy
          </Button>
          <Button
            variant="success"
            onClick={handleUpdateExamResult}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Lưu"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExamResultModal;