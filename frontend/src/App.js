import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLayout from "./layouts/client/ClientLayout";
import DoctorLayout from './layouts/doctor/DoctorLayout';
import { Toaster } from "react-hot-toast";



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
