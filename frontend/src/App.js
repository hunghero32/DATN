import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLayout from "./layouts/client/ClientLayout";
import DoctorLayout from './layouts/doctor/DoctorLayout';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/guest/auth/AuthContext";



function App() {
  return (
    <div>
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
