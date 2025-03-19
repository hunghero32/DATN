import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLayout from "./layouts/client/ClientLayout";
import DoctorLayout from './layouts/doctor/DoctorLayout';
import { AuthProvider } from "./components/guest/auth/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      {/* ToastContainer được đặt ngoài cùng để không ảnh hưởng đến layout , fix loi giao dien bi khoang trong tren top   */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <AuthProvider>
        <Routes>
          <Route path="*" element={<ClientLayout />} />
          <Route path="/doctor/*" element={<DoctorLayout />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
