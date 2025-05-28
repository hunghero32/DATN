import { useState, useEffect } from "react";
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
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/api/system")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data); // Debug log
        if (!data.site_video) {
          setError("No video URL provided");
          return;
        }
        const videoId = extractYoutubeId(data.site_video);
        if (videoId) {
          setVideoUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`);
        } else {
          setError("Invalid YouTube URL");
        }
      })
      .catch((error) => {
        console.error("Error fetching video URL:", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Banner />
      {/* <ServiceDetail/> */}
      {/* <About /> */}
      {/* <Service/> */}
      <TopSpecialties />
      <TopBookedServices />
      <div className="flex justify-center my-8 container mx-auto mt-2 mb-2 px-4">
        {isLoading ? (
          <div className="text-center">Loading video...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : videoUrl ? (
          <iframe 
            width="100%" 
            height="600" 
            src={videoUrl}
            title="Clinic Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        ) : null}
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
