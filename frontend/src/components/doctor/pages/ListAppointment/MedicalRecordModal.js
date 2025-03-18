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
        <Modal.Header closeButton>
          <Modal.Title>Hồ Sơ Bệnh Án</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {error && <p className="text-danger">{error}</p>}
          {medicalRecord ? (
            <div className="mb-4 p-3 border rounded">
              <h6 className="text-primary">
                Hồ Sơ Bệnh Án (Cập nhật: {medicalRecord.updated_at})
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

          {/* Hiển thị danh sách kết quả khám */}
          {results.length > 0 && (
            <div className="mt-4">
              <h6 className="text-primary">Kết Quả Khám</h6>
              {results.map((result, index) => (
                <div key={index} className="mb-4 p-3 border rounded">
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
                        value={result.notes || "Không có ghi chú"}
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
            {medicalRecord ? "Chỉnh Sửa Hồ Sơ" : "Điền Hồ Sơ Bệnh Án"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {medicalRecord ? "Chỉnh Sửa Hồ Sơ Bệnh Án" : "Điền Hồ Sơ Bệnh Án"}
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