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
      {/* <About /> */}
      {/* <Service/> */}
      <TopSpecialties />
      <TopBookedServices />
      <div className="flex justify-center my-8 container mx-auto mt-2 mb-2 px-4">
        <iframe 
          width="100%" 
          height="600" 
          src="https://www.youtube.com/embed/7JHVlnoWx3Y?si=p8hIOOgA86ouRfZY" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen
        ></iframe>
      </div>
      <ClinicDetail />    { /* Trang giới thiệu phòng khám */}
      <ArticleList />
      {/* <Team/> */}
      <Chatbot
        isOpen={isChatOpen}
        toggleChat={() => setChatOpen(!isChatOpen)}
      />

      {/* <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center space-x-2"
        onClick={() => setChatOpen(!isChatOpen)}
      >
        <MessageCircle />
        <span>Chat</span>
      </button> */}
    </>
  );
}
