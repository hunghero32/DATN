import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLayout from "./layouts/client/ClientLayout";
import DoctorLayout from './layouts/doctor/DoctorLayout';
import { AuthProvider } from "./components/guest/auth/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div>
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
