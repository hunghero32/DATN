import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // State to hold the API data
  const [dashboardData, setDashboardData] = useState({
    total_patients: 0,
    monthly_patients: 0,
    total_appointments: 0,
    completed_appointments: 0,
    days_off: 0,
    available_slots: 0,
    appointments_by_status: {},
    patients_by_month: {},
    appointments_by_day: {},
    patients_today: [],
    upcoming_appointments: [],
    completed_appointments_list: [],
  });

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/doctor/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bảng điều khiển:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare data for the Patients by Month chart (Line chart)
  const patientsByMonthData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Số bệnh nhân mỗi tháng",
        data: Array.from({ length: 12 }, (_, index) =>
          dashboardData.patients_by_month[index + 1] || 0
        ),
        borderColor: "rgba(52, 152, 219, 1)",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Prepare data for the Appointments by Status chart (Pie chart)
  const appointmentsByStatusData = {
    labels: ["Đã hoàn thành", "Đã xác nhận", "Đã hủy"],
    datasets: [
      {
        label: "Trạng thái lịch hẹn",
        data: [
          dashboardData.appointments_by_status?.completed || 0,
          dashboardData.appointments_by_status?.confirmed || 0,
          dashboardData.appointments_by_status?.canceled || 0,
        ],
        backgroundColor: [
          "rgba(255, 182, 193, 0.6)",
          "rgba(135, 206, 250, 0.6)",
          "rgba(255, 215, 0, 0.6)",
        ],
        borderColor: [
          "rgba(255, 182, 193, 1)",
          "rgba(135, 206, 250, 1)",
          "rgba(255, 215, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="content-inner container-fluid pb-0" id="page_layout" style={{ backgroundColor: "#f0f4f8", padding: "20px" }}>
      <div>
        {/* Thống kê tổng quan */}
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Tổng số bệnh nhân</h6>
                <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.total_patients}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Bệnh nhân tháng này</h6>
                <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.monthly_patients}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Tổng số lịch hẹn</h6>
                <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.total_appointments}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Lịch hẹn đã hoàn thành</h6>
                <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.completed_appointments}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Thống kê phụ */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Ngày nghỉ trong tháng</h6>
                <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.days_off}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Số khung giờ trống</h6>
                <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.available_slots}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Lịch hẹn hôm nay</h6>
                <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.patients_today.length}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ trạng thái lịch hẹn và Bệnh nhân hôm nay */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
              <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                <h4 className="card-title" style={{ color: "#2c3e50" }}>Trạng thái lịch hẹn</h4>
              </div>
              <div className="card-body" style={{ height: "250px" }}>
                <Pie
                  data={appointmentsByStatusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          font: { size: 12 },
                          color: "#2c3e50",
                        },
                      },
                      title: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8 mb-4">
            <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
              <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                <h4 className="card-title" style={{ color: "#2c3e50" }}>Bệnh nhân hôm nay</h4>
              </div>
              <div className="card-body">
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Dịch vụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.patients_today.length > 0 ? (
                        dashboardData.patients_today.map((patient, index) => (
                          <tr key={index}>
                            <td>{patient.guest?.guest_name || "Chưa xác định"}</td>
                            <td>{patient.guest?.guest_phone || "N/A"}</td>
                            <td>{patient.guest?.guest_email || "N/A"}</td>
                            <td>{patient.service?.services_name || "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            Không có bệnh nhân trong ngày hôm nay
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ bệnh nhân theo tháng */}
        <div className="row">
          <div className="col-12 mb-4">
            <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
              <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                <h4 className="card-title" style={{ color: "#2c3e50" }}>Bệnh nhân theo tháng</h4>
              </div>
              <div className="card-body">
                <Line
                  data={patientsByMonthData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          font: { size: 14 },
                          color: "#2c3e50",
                        },
                      },
                      title: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        ticks: { color: "#2c3e50" },
                        grid: { display: false },
                      },
                      y: {
                        ticks: { color: "#2c3e50" },
                        grid: { color: "rgba(0, 0, 0, 0.05)" },
                      },
                    },
                  }}
                  style={{ height: "300px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lịch hẹn sắp tới và Lịch hẹn đã hoàn thành */}
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
              <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                <h4 className="card-title" style={{ color: "#2c3e50" }}>Lịch hẹn sắp tới</h4>
              </div>
              <div className="card-body">
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Ngày</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Dịch vụ</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.upcoming_appointments.length > 0 ? (
                        dashboardData.upcoming_appointments.map((appointment, index) => (
                          <tr key={index}>
                            <td>{appointment.booking_date}</td>
                            <td>{appointment.guest?.guest_name || "Chưa xác định"}</td>
                            <td>{appointment.guest?.guest_phone || "N/A"}</td>
                            <td>{appointment.service?.services_name || "N/A"}</td>
                            <td>
                              <span
                                className={`badge ${
                                  appointment.status === "confirmed"
                                    ? "bg-success"
                                    : appointment.status === "canceled"
                                    ? "bg-danger"
                                    : "bg-warning"
                                }`}
                              >
                                {appointment.status === "confirmed" ? "Đã xác nhận" : 
                                 appointment.status === "canceled" ? "Đã hủy" : "Chờ xác nhận"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            Không có lịch hẹn sắp tới
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
              <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                <h4 className="card-title" style={{ color: "#2c3e50" }}>Lịch hẹn đã hoàn thành</h4>
              </div>
              <div className="card-body">
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Ngày</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Dịch vụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.completed_appointments_list.length > 0 ? (
                        dashboardData.completed_appointments_list.map((appointment, index) => (
                          <tr key={index}>
                            <td>{appointment.booking_date}</td>
                            <td>{appointment.guest?.guest_name || "Chưa xác định"}</td>
                            <td>{appointment.guest?.guest_phone || "N/A"}</td>
                            <td>{appointment.service?.services_name || "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            Không có lịch hẹn đã hoàn thành
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;