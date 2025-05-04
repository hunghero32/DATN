import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const SuccessBooking = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <motion.div 
        className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Biểu tượng thành công */}
        <motion.div 
          initial={{ rotate: -20, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
        >
          <CheckCircle className="text-green-500 w-20 h-20 mx-auto" />
        </motion.div>

        {/* Tiêu đề */}
        <h2 className="text-3xl font-bold text-gray-800 mt-5">Đặt lịch thành công!</h2>
        <p className="text-gray-600 mt-2 text-lg">Lịch hẹn của bạn đã được xác nhận.</p>

        {/* Lưu ý */}
        <p className="text-gray-500 mt-4 text-sm italic">
          Lịch hẹn của quý khách đã chuyển sang cơ sở y tế. Vui lòng không đặt lịch qua kênh khác để tránh trùng lịch.
        </p>

        {/* Nút điều hướng */}
        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            onClick={() => navigate("/")}
            className="px-6 py-3 text-lg bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Quay về trang chủ
          </motion.button>

          <motion.button
            onClick={() => navigate("/lichhen")}
            className="px-6 py-3 text-lg bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Xem lịch đã đặt
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessBooking;
