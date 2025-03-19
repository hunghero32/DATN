import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const Chatbot = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState([
    { text: "Xin chào! Tôi có thể giúp gì cho bạn?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    
    setIsTyping(true);
    
    try {
      const response = await axios.get(`http://localhost:8000/api/client/services/search`, {
        params: {
          keyword: input
        }
      });

      const services = response.data.services;
      let botResponse = "";

      if (services && services.length > 0) {
        botResponse = {
          text: "Tôi tìm thấy các dịch vụ phù hợp:",
          sender: "bot",
          services: services.map(service => ({
            id: service.id,
            name: service.services_name,
            price: service.price,
            duration: service.duration
          }))
        };
      } else {
        botResponse = {
          text: "Tôi không tìm thấy thông tin nào phù hợp ?",
          sender: "bot"
        };
      }

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn.", 
        sender: "bot" 
      }]);
      console.error("Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessage = (msg, index) => {
    if (msg.services) {
      return (
        <div key={index} className="flex justify-start">
          <div className="p-4 rounded-lg text-sm max-w-[85%] shadow-md bg-white border border-gray-100">
            <div className="font-medium text-gray-700 mb-2">{msg.text}</div>
            <div className="space-y-3">
              {msg.services.map((service, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-200"
                >
                  <div className="font-medium text-gray-800 mb-2">{service.name}</div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-600 flex items-center gap-4">
                      <span className="inline-flex items-center gap-1">
                        <span>💰</span> {service.price.toLocaleString()} VND
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span>⏱️</span> {service.duration} phút
                      </span>
                    </div>
                    <Link 
                      to={`/detail-service/${service.id}`}
                      className="inline-flex items-center justify-center gap-1 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors"
                    >
                      Xem chi tiết
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
        <div className={`p-3 rounded-2xl text-sm max-w-[75%] shadow-sm ${
          msg.sender === "user" 
            ? "bg-blue-500 text-white" 
            : "bg-white border border-gray-100 text-gray-700"
        }`}>
          {msg.text}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform ease-in-out">
      {isOpen && (
        <div className="w-[400px] shadow-2xl bg-white border border-gray-200 rounded-2xl overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-1 flex justify-between items-center">
            <div>
              <h6 className="font-semibold text-lg">Trợ lý ảo</h6>
              <p className="text-xs text-blue-100">Hỗ trợ tìm kiếm dịch vụ</p>
            </div>
            <X className="cursor-pointer hover:opacity-75 w-6 h-6" onClick={toggleChat} />
          </div>
          <div className="h-[400px] p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg, index) => renderMessage(msg, index))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>

          <div className="flex items-center border-t p-4 bg-white gap-2">
            <input
              className="flex-1 border border-gray-200 rounded-full px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center justify-center"
              onClick={handleSendMessage}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button 
          className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
          onClick={toggleChat}
        >
          <MessageCircle size={22} />
          <span className="font-medium">Chat với trợ lý</span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;