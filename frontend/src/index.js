import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Thêm dòng này
import "react-datepicker/dist/react-datepicker.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const queryclient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    {/* Đặt ToastContainer bên ngoài các Provider */}
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeButton
      rtl={false}
      style={{ top: '0' }}
    />
    
    <QueryClientProvider client={queryclient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </>
);
