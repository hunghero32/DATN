import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLayout from "./layouts/client/ClientLayout";
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorLayout from "./layouts/doctor/DoctorLayout";



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
