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
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
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
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="content-inner container-fluid pb-0" id="page_layout">
      <div>
        {/* Summary Statistics Section */}
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body text-center">
                <h6 className="text-uppercase">Total Patients Seen</h6>
                <h3 className="mb-0">{dashboardData.total_patients}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body text-center">
                <h6 className="text-uppercase">Patients This Month</h6>
                <h3 className="mb-0">{dashboardData.monthly_patients}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body text-center">
                <h6 className="text-uppercase">Total Appointments</h6>
                <h3 className="mb-0">{dashboardData.total_appointments}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body text-center">
                <h6 className="text-uppercase">Completed Appointments</h6>
                <h3 className="mb-0">{dashboardData.completed_appointments}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Statistics Section */}
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body text-center">
                <h6 className="text-uppercase">Days Off This Month</h6>
                <h3 className="mb-0">{dashboardData.days_off}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body text-center">
                <h6 className="text-uppercase">Available Slots</h6>
                <h3 className="mb-0">{dashboardData.available_slots}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Appointments by Status</h4>
              </div>
              <div className="card-body" style={{ height: "200px" }}>
                <Pie
                  data={appointmentsByStatusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Appointments by Status",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Lists Section */}
        <div className="row">
          {/* Patients by Month Chart */}
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Patients by Month</h4>
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
                      },
                      title: {
                        display: true,
                        text: "Patients Seen Each Month",
                      },
                    },
                  }}
                  style={{ height: "280px" }}
                />
              </div>
            </div>
          </div>

          {/* Patients Seen Today */}
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Patients Seen Today</h4>
              </div>
              <div className="card-body">
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="table table-striped">
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
                            No patients seen today.
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

        {/* Upcoming Appointments */}
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Upcoming Appointments</h4>
              </div>
              <div className="card-body">
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="table table-striped">
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
                            <td>{appointment.status}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No upcoming appointments.
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
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Completed Appointments</h4>
              </div>
              <div className="card-body">
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="table table-striped">
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
                            No completed appointments.
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