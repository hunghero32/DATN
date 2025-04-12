import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/Doctor/Calendar.css";
import ClientLayout from "./layouts/client/ClientLayout";
import DoctorLayout from './layouts/doctor/DoctorLayout';
import { AuthProvider } from "./components/guest/auth/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import OAuthSuccess from './components/guest/auth/OAuthSuccess';
import ProtectedRoute from "./components/guest/auth/ProtectedRoute";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<ClientLayout />} />
          <Route element={<ProtectedRoute requiredRole="doctor" />}>
            <Route path="/doctor/*" element={<DoctorLayout />} />
          </Route>
          <Route path="/auth/oauth-success" element={<OAuthSuccess />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
