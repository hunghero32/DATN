import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../components/doctor/Header";
import Dashboard from "../../components/doctor/pages/DashBoard";
import SideBar from "../../components/doctor/SideBar";
import { useEffect, useState } from "react";
import ListSchedule from "../../components/doctor/pages/Schedule/ListSchedule";
import DoctorProfile from "../../components/doctor/pages/DoctorProfile/DoctorProfile";
import UserProfile from "../../components/doctor/pages/UserProfile/UserProfile";
import Appointment from "../../components/doctor/pages/ListAppointment/Appointment";
import DoctorServices from "../../components/doctor/pages/Services/DoctorServices";
import Results from "../../components/doctor/pages/Results/Results";
import Posts from "../../components/doctor/pages/Post/Posts";
import { ToastContainer } from 'react-toastify';

import { useAuth } from "../../components/guest/auth/AuthContext";

const DoctorLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="loading-screen d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app-container">
      <style>
        {`
          .main-content {
            padding-top: 60px; /* Matches the header height to prevent overlap */
            min-height: calc(100vh - 60px); /* Ensure content takes up remaining height */
          }
          .app-container {
            display: flex;
            flex-direction: column;
            height: 100vh; /* Full viewport height */
          }
        `}
      </style>
      <ToastContainer position="top-right" autoClose={3000} />
      <SideBar />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/doctor-services"
            element={<DoctorServices show={showModal} onCloseModal={() => setShowModal(false)} />}
          />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/schedule" element={<ListSchedule />} />
          <Route path="/results" element={<Results />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<DoctorProfile />} />
          <Route path="/profile/edit" element={<DoctorProfile isEditing={true} />} />
          <Route path="/profileUser" element={<UserProfile />} />
        </Routes>
      </main>
    </div>
  );
};

export default DoctorLayout;