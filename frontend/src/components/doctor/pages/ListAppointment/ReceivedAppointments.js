import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ReceivedAppointments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]); // Tất cả cuộc hẹn
  const [acceptedAppointments, setAcceptedAppointments] = useState([]); // Chỉ chứa cuộc hẹn đã nhận
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/doctor/bookings", {
          headers: {
            Authorization: `Bearer SUwjNXVyzhC0fhrpNXEFQ8dY5RWGCulmcNfcXsj8f34ff3c4`,
          },
        });

        const allAppointments = response.data.data;
        setAppointments(allAppointments);

        // Lọc ra những cuộc hẹn đã nhận (confirmed)
        setAcceptedAppointments(allAppointments.filter((app) => app.status === "confirmed"));
      } catch (error) {
        setError("Lỗi khi tải dữ liệu");
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  // Hàm nhận bệnh (chuyển trạng thái từ "pending" -> "confirmed")
  const handleConfirmAppointment = async (appointmentId) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/doctor/bookings/${appointmentId}`,
        { status: "confirmed" },
        {
          headers: {
            Authorization: `Bearer SUwjNXVyzhC0fhrpNXEFQ8dY5RWGCulmcNfcXsj8f34ff3c4`,
          },
        }
      );

      // Cập nhật danh sách cuộc hẹn
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === appointmentId ? { ...app, status: "confirmed" } : app
        )
      );

      // Cập nhật danh sách đã nhận
      setAcceptedAppointments((prev) => [
        ...prev,
        appointments.find((app) => app.id === appointmentId),
      ]);

      alert("Bệnh nhân đã được nhận!");
    } catch (error) {
      console.error("Lỗi khi nhận bệnh:", error);
      alert("Lỗi khi nhận bệnh!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h5 className="mb-3 text-primary">Danh sách cuộc hẹn đã nhận</h5>
        {acceptedAppointments.length === 0 ? (
          <p className="text-muted">Không có cuộc hẹn nào đã nhận.</p>
        ) : (
          <Table striped bordered hover className="table-sm">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Ngày</th>
                <th>Người đặt</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {acceptedAppointments.map((app, index) => (
                <tr key={index}>
                  <td>{app.booking_time}</td>
                  <td>{app.booking_date}</td>
                  <td>{app.guest?.guest_name || "Không có tên"}</td>
                  <td>
                    <span className="badge bg-success">Confirmed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      <div className="card p-4 mt-4">
        <h5 className="mb-3 text-warning">Danh sách chờ nhận</h5>

        {appointments.filter((app) => app.status === "pending").length === 0 ? (
          <p className="text-muted">Không có cuộc hẹn nào đang chờ.</p>
        ) : (
          <Table striped bordered hover className="table-sm">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Ngày</th>
                <th>Người đặt</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {appointments
                .filter((app) => app.status === "pending")
                .map((app) => (
                  <tr key={app.id}>
                    <td>{app.booking_time}</td>
                    <td>{app.booking_date}</td>
                    <td>{app.guest?.guest_name || "Không có tên"}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleConfirmAppointment(app.id)}
                      >
                        Nhận Bệnh
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ReceivedAppointments;
