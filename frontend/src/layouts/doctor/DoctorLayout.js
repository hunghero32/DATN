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
import Invoices from "../../components/doctor/pages/Invoices/Invoices";
import Posts from "../../components/doctor/pages/Post/Posts";
import { ToastContainer } from 'react-toastify';
import TestExamResult from "../../components/doctor/pages/ListAppointment/TestExamResult";

const DoctorLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app-container">
      <ToastContainer />
      <SideBar />
      <Header user={user} />
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
          <Route path="/invoices" element={<Invoices />} />   
          <Route path="/posts" element={<Posts />} />  
          <Route path="/profile" element={<DoctorProfile />} />
          <Route path="/profile/edit" element={<DoctorProfile isEditing={true} />} />
          <Route path="/profileUser" element={<UserProfile />} />
          <Route path="/test-exam-result" element={<TestExamResult />} />
        </Routes>
      </main>
    </div>
  );
};

export default DoctorLayout;
