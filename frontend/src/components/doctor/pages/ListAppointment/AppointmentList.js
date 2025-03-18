import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";

const AppointmentList = ({
  filteredAppointments,
  statusFilter,
  loading,
  error,
  handleShowDetail,
  handleAcceptAppointment,
  handleCompleteAppointment,
  handleDeleteAppointment,
  handleShowMedicalRecord,
  handleShowExamResult,
}) => {
  const renderTable = (appointments, title, status) => (
    <div className="card p-4 mb-4">
      <h5 className="mb-3 text-primary">{title}</h5>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-muted">
          Không có cuộc hẹn nào{" "}
          {status === "pending" ? "đang chờ xác nhận" : status === "confirmed" ? "đã nhận" : "đã khám xong"}.
        </p>
      ) : (
        <Table striped bordered hover className="table-sm">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Ngày</th>
              <th>Nguồn đặt</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app, index) => (
              <tr key={index}>
                <td>{app.booking_time}</td>
                <td>{app.booking_date}</td>
                <td>{app.guest?.guest_name || "Không có tên"}</td>
                <td>
                  <span
                    className={`badge bg-${
                      status === "pending" ? "warning" : status === "confirmed" ? "success" : "info"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleShowDetail(app)}>
                    Detail
                  </Button>
                  {status === "pending" && (
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleAcceptAppointment(app)}
                    >
                      Nhận Bệnh
                    </Button>
                  )}
                  {status === "confirmed" && (
                    <>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => handleShowMedicalRecord(app)}
                      >
                        Xem Hồ Sơ Bệnh Án
                      </Button>
                      <Button
                        variant="success"
                        className="me-2"
                        onClick={() => handleCompleteAppointment(app)}
                      >
                        Hoàn Thành
                      </Button>
                    </>
                  )}
                  {status === "completed" && (
                    <>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => handleShowMedicalRecord(app)}
                      >
                        Xem Hồ Sơ Bệnh Án
                      </Button>
                      <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => handleShowExamResult(app)}
                      >
                        Xem Kết Quả Khám
                      </Button>
                    </>
                  )}
                  <Button variant="danger" onClick={() => handleDeleteAppointment(app)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );

  return (
    <>
      {renderTable(filteredAppointments.pending, "Danh sách chờ duyệt", "pending")}
      {statusFilter === "confirmed" &&
        renderTable(filteredAppointments.confirmed, "Danh sách đã nhận", "confirmed")}
      {statusFilter === "completed" &&
        renderTable(filteredAppointments.completed, "Danh sách đã khám xong", "completed")}
    </>
  );
};

export default AppointmentList;