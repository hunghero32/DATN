import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLayout from "./layouts/client/ClientLayout";
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import DoctorLayout from "./layouts/doctor/DoctorLayout";
=======
import DoctorLayout from "./layouts/Doctor/DoctorLayout";
>>>>>>> 59e03aa3fdc449126f5201bcc1cc2ac8b1b71814



function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<ClientLayout />} />
        <Route path="/doctor/*" element={<DoctorLayout />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
