import { useState } from "react";
import About from "./About";
import ArticleList from "./BaiViet";
import Categori from "./Categori";
import ClinicDetail from "./GioiThieuPhongKham";
import Banner from "./HomeBanner";
import TopSpecialties from "./TopChuyenKhoa";
import TopBookedServices from "./TopDichVu";
import { MessageCircle } from "lucide-react";
import Chatbot from "../chatbot/Chatbot";
export default function HomeMain() {
  const [isChatOpen, setChatOpen] = useState(false);
  return (
    <>
      <Banner />
      {/* <ServiceDetail/> */}
      <About />
      {/* <Service/> */}
      <TopSpecialties />
      <TopBookedServices />
      <Categori />
      {/* <Appointment />   // Trang đặt lịch khám  */}
      <ClinicDetail />    { /* Trang giới thiệu phòng khám */}
      <ArticleList />
      {/* <Team/> */}
      <Chatbot
        isOpen={isChatOpen}
        toggleChat={() => setChatOpen(!isChatOpen)}
      />

      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center space-x-2"
        onClick={() => setChatOpen(!isChatOpen)}
      >
        <MessageCircle />
        <span>Chat</span>
      </button>
    </>
  );
}
