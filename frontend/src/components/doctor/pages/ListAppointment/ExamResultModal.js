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
  file,
  setFile,
  handleUpdateExamResult,
  loading,
}) => {
  return (
    <>
      <Modal show={showView} onHide={onHideView} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Kết Quả Khám</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : selectedAppointment?.examResult ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Chẩn đoán:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={selectedAppointment.examResult.diagnosis || "Không có dữ liệu"}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ghi chú:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedAppointment.examResult.notes || "Không có ghi chú"}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tệp đính kèm:</Form.Label>
                {selectedAppointment.examResult.file ? (
                  <a
                    href={`http://127.0.0.1:8000/storage/${selectedAppointment.examResult.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Xem tệp
                  </a>
                ) : (
                  <p>Không có tệp đính kèm.</p>
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
            onClick={() => setShowEditResultModal(true)}
          >
            {selectedAppointment?.examResult ? "Sửa" : "Thêm Kết Quả Khám"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={onHideEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedAppointment?.examResult ? "Sửa Kết Quả Khám" : "Thêm Kết Quả Khám"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chẩn đoán:</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ghi chú:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tệp đính kèm:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
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