import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const MedicalRecordModal = ({
  show,
  onHide,
  showForm,
  setShowForm,
  medicalRecord,
  results,
  error,
  medicalForm,
  setMedicalForm,
  handleSaveMedicalRecord,
  loading,
}) => {
  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
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
              max-height: 70vh;
              overflow-y: auto;
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

            .record-section {
              background-color: #fff;
              border: 1px solid #e5e7eb;
              border-radius: 10px;
              padding: 1.5rem;
            }

            .record-section h6 {
              font-size: 1.25rem;
              font-weight: 600;
              color: #1f2937;
              margin-bottom: 1rem;
            }
          `}
        </style>
        <Modal.Header closeButton>
          <Modal.Title>Hồ sơ bệnh án</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          {medicalRecord ? (
            <div className="mb-4 record-section">
              <h6 className="text-primary">
                Hồ sơ bệnh án (Cập nhật: {medicalRecord.updated_at})
              </h6>
              <Form>
                <div className="grid grid-cols-2 gap-4">
                  <Form.Group>
                    <Form.Label>BHYT:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.BHYT || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tình trạng y tế:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.medical_condition || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Thuốc:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.medications || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Dị ứng:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.allergies || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tiền sử gia đình:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.family_history || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phương pháp điều trị:</Form.Label>
                    <Form.Control
                      type="text"
                      value={medicalRecord.treatment || "Không có dữ liệu"}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="col-span-2">
                    <Form.Label>Ghi chú y tế:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={medicalRecord.note || "Không có ghi chú"}
                      readOnly
                    />
                  </Form.Group>
                </div>
              </Form>
            </div>
          ) : (
            <p className="text-muted">Chưa có hồ sơ y tế.</p>
          )}

          {results.length > 0 && (
            <div className="mt-4">
              <h6 className="text-primary">Kết quả khám</h6>
              {results.map((result, index) => (
                <div key={index} className="mb-4 record-section">
                  <h6 className="text-info">
                    Kết quả #{index + 1} (Ngày: {result.updated_at})
                  </h6>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Chẩn đoán:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={result.diagnosis || "Không có dữ liệu"}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phương pháp điều trị:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={result.treatment || "Không có dữ liệu"}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Ghi chú:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={result.note || "Không có ghi chú"}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Bác sĩ:</Form.Label>
                      <Form.Control
                        type="text"
                        value={result.doctor?.doctor_name || "Không xác định"}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Dịch vụ:</Form.Label>
                      <Form.Control
                        type="text"
                        value={result.booking?.service?.services_name || "Không xác định"}
                        readOnly
                      />
                    </Form.Group>
                  </Form>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            {medicalRecord ? "Chỉnh sửa hồ sơ" : "Điền hồ sơ bệnh án"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {medicalRecord ? "Chỉnh sửa hồ sơ bệnh án" : "Điền hồ sơ bệnh án"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="grid grid-cols-2 gap-4">
              <Form.Group>
                <Form.Label>BHYT:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.BHYT}
                  onChange={(e) =>
                    setMedicalForm({ ...medicalForm, BHYT: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tình trạng y tế:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.medical_condition}
                  onChange={(e) =>
                    setMedicalForm({
                      ...medicalForm,
                      medical_condition: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Thuốc:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.medications}
                  onChange={(e) =>
                    setMedicalForm({ ...medicalForm, medications: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Dị ứng:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.allergies}
                  onChange={(e) =>
                    setMedicalForm({ ...medicalForm, allergies: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tiền sử gia đình:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.family_history}
                  onChange={(e) =>
                    setMedicalForm({
                      ...medicalForm,
                      family_history: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phương pháp điều trị:</Form.Label>
                <Form.Control
                  type="text"
                  value={medicalForm.treatment}
                  onChange={(e) =>
                    setMedicalForm({ ...medicalForm, treatment: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="col-span-2">
                <Form.Label>Ghi chú y tế:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={medicalForm.note}
                  onChange={(e) =>
                    setMedicalForm({ ...medicalForm, note: e.target.value })
                  }
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Hủy
          </Button>
          <Button
            variant="success"
            onClick={handleSaveMedicalRecord}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MedicalRecordModal;