import { useState } from "react";
import About from "./About";
import Appointment from "./Appointment";
import ArticleList from "./BaiViet";
import Categori from "./Categori";
import ClinicDetail from "./GioiThieuPhongKham";
import Banner from "./HomeBanner";
import Service from "./Service";
import ServiceDetail from "./ServiceDetail";
import ServiceOut from "./ServiceOut";
import Team from "./Team";
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
      <ServiceOut />
      {/* <Appointment />   // Trang đặt lịch khám  */}
      <ClinicDetail />
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
