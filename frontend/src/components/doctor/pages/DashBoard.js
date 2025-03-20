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
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare data for the Patients by Month chart (Line chart)
  const patientsByMonthData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Patients Per Month",
        data: Array.from({ length: 12 }, (_, index) =>
          dashboardData.patients_by_month[index + 1] || 0
        ),
        borderColor: "rgba(52, 152, 219, 1)", // Màu xanh dương nhẹ
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Prepare data for the Appointments by Status chart (Pie chart)
  const appointmentsByStatusData = {
    labels: Object.keys(dashboardData.appointments_by_status),
    datasets: [
      {
        label: "Appointments by Status",
        data: Object.values(dashboardData.appointments_by_status),
        backgroundColor: [
          "rgba(255, 182, 193, 0.6)", // Pink for "completed"
          "rgba(135, 206, 250, 0.6)", // Light blue for "confirmed"
          "rgba(255, 215, 0, 0.6)", // Yellow for "canceled"
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
        {/* Summary Statistics Section (3 cards only) */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Total Patients Seen</h6>
                <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.total_patients}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Patients This Month</h6>
                <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.monthly_patients}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm hover-shadow" style={{ borderRadius: "10px", transition: "all 0.3s" }}>
              <div className="card-body text-center">
                <h6 className="text-uppercase text-muted mb-2">Total Appointments</h6>
                <h3 className="mb-0" style={{ color: "#3498db" }}>{dashboardData.total_appointments}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments by Status (4 cols) and Patients Seen Today (8 cols) */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
              <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                <h4 className="card-title" style={{ color: "#2c3e50" }}>Appointments by Status</h4>
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
                          font: { size: 12 }, // Giảm kích thước font để vừa với cột 4
                          color: "#2c3e50",
                        },
                      },
                      title: {
                        display: true,
                        text: "Appointments by Status",
                        font: { size: 14 }, // Giảm kích thước tiêu đề
                        color: "#2c3e50",
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
                <h4 className="card-title" style={{ color: "#2c3e50" }}>Patients Seen Today</h4>
              </div>
              <div className="card-body">
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Service</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.patients_today.length > 0 ? (
                        dashboardData.patients_today.map((patient, index) => (
                          <tr key={index}>
                            <td>{patient.guest?.guest_name || "Unknown"}</td>
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

        {/* Patients by Month (full 12 columns) */}
        <div className="row">
          <div className="col-12 mb-4">
            <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
              <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                <h4 className="card-title" style={{ color: "#2c3e50" }}>Patients by Month</h4>
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
                        display: true,
                        text: "Patients Seen Each Month",
                        font: { size: 16 },
                        color: "#2c3e50",
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

        {/* Upcoming Appointments and Completed Appointments */}
        <div className="row">
          {/* Upcoming Appointments */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
              <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                <h4 className="card-title" style={{ color: "#2c3e50" }}>Upcoming Appointments</h4>
              </div>
              <div className="card-body">
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.upcoming_appointments.length > 0 ? (
                        dashboardData.upcoming_appointments.map((appointment, index) => (
                          <tr key={index}>
                            <td>{appointment.booking_date}</td>
                            <td>{appointment.guest?.guest_name || "Unknown"}</td>
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
                                {appointment.status}
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

          {/* Completed Appointments */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
              <div className="card-header" style={{ backgroundColor: "#fff", borderBottom: "none" }}>
                <h4 className="card-title" style={{ color: "#2c3e50" }}>Completed Appointments</h4>
              </div>
              <div className="card-body">
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Service</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.completed_appointments_list.length > 0 ? (
                        dashboardData.completed_appointments_list.map((appointment, index) => (
                          <tr key={index}>
                            <td>{appointment.booking_date}</td>
                            <td>{appointment.guest?.guest_name || "Unknown"}</td>
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