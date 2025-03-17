import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLayout from "./layouts/client/ClientLayout";
import DoctorLayout from './layouts/doctor/DoctorLayout';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/guest/auth/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <AuthProvider>
      <Routes>
        <Route path="*" element={<ClientLayout />} />
        <Route path="/doctor/*" element={<DoctorLayout />} />
      </Routes>
      </AuthProvider>
      <Toaster/>
    </div>
  );
}

export default App;
