import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ThongBao = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-400 to-indigo-600">
      <motion.div 
        className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div 
          initial={{ rotate: -20, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
        >
          <CheckCircle className="text-green-500 w-20 h-20 mx-auto" />
        </motion.div>

        <h2 className="text-3xl font-bold text-gray-800 mt-5">Đặt lịch thành công!</h2>
        <p className="text-gray-600 mt-2 text-lg">Chúng tôi đã nhận được thông tin của bạn.</p>

        <motion.button
          onClick={() => navigate("/")}
          className="mt-6 px-8 py-3 text-lg bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Quay về trang chủ
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ThongBao;
