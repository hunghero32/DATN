import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLayout from "./layouts/client/ClientLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<ClientLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
