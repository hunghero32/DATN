import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";

import axios from "axios";
import { Link } from "react-router-dom";

const Chatbot = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState([
    { text: "Xin chào! Bạn đang cảm thấy thế nào? Hãy mô tả triệu chứng của bạn.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hotline, setHotline] = useState("");
  
  // Add ref for message container
  const messagesEndRef = useRef(null);

  // Add scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Add useEffect to scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // In the handleSendMessage function, update the response handling:
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const pythonResponse = await axios.post('http://localhost:5000/chat', {
        message: input
      }, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedResponse = typeof pythonResponse.data === 'string' 
        ? JSON.parse(pythonResponse.data) 
        : pythonResponse.data;
      
      if (parsedResponse.status === 'success') {
        // Handle location response
        if (parsedResponse.type === 'location') {
          setMessages(prev => [...prev, {
            text: parsedResponse.message,
            sender: "bot"
          }]);
          setIsTyping(false);
          return;
        }

        // Handle specialty response
        if (parsedResponse.specialties && parsedResponse.specialties.length > 0) {
          setMessages(prev => [...prev, {
            text: "Dựa vào triệu chứng của bạn, tôi đề xuất các chuyên khoa sau:",
            sender: "bot",
            specialties: parsedResponse.specialties.map(specialty => ({
              id: specialty.id,
              name: specialty.name,
              image: specialty.image,
              description: specialty.description || "Không có mô tả chi tiết."
            }))
          }]);
        } else {
          setMessages(prev => [...prev, {
            text: "Tôi không tìm thấy chuyên khoa nào phù hợp với triệu chứng của bạn.",
            sender: "bot"
          }]);
        }
      } else {
        setMessages(prev => [...prev, { 
          text: parsedResponse.message || "Xin lỗi, tôi không hiểu yêu cầu của bạn.", 
          sender: "bot" 
        }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        text: "Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn.", 
        sender: "bot" 
      }]);
    } finally {
      setIsTyping(false);
    }
};

  const renderMessage = (msg, index) => {
    if (msg.specialties) {
      return (
        <div key={index} className="flex justify-start">
          <div className="p-4 rounded-lg text-sm max-w-[85%] shadow-md bg-white border border-gray-100 mb-3">
            <div className="font-medium text-gray-700 mb-2">{msg.text}</div>
            <div className="space-y-3">
              {msg.specialties.map((specialty, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-200"
                >
                  <div className="font-medium text-gray-800 mb-2">{specialty.name}</div>
                  <div className="flex flex-col gap-2">
                    <img
                      src={specialty.image}
                      alt={specialty.name}
                      className="w-16 h-16 object-cover rounded-lg mb-2"
                    />
                    <div className="text-sm text-gray-600">
                      {specialty.description}
                    </div>
                    <Link 
                      to={`/detail-specialty/${specialty.id}`} // Điều chỉnh đường dẫn theo cấu trúc của bạn
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
        <div className={`p-3 rounded-2xl text-sm max-w-[75%] shadow-sm mb-3 ${
          msg.sender === "user" 
            ? "bg-blue-500 text-white" 
            : "bg-white border border-gray-100 text-gray-700"
        }`}>
          {msg.text}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchHotline = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/system');
        setHotline(response.data.hotline);
      } catch (error) {
        console.error("Error fetching hotline:", error);
      }
    };
    fetchHotline();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform ease-in-out">
      {isOpen && (
        <div className="w-[400px] shadow-2xl bg-white border border-gray-200 rounded-2xl overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-1 flex justify-between items-center">
            <div>
              <h6 className="font-semibold text-lg">Trợ lý sức khỏe</h6>
              <p className="text-xs text-blue-100">Hỗ trợ tìm kiếm chuyên khoa</p>
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
            <div ref={messagesEndRef} /> {/* Add this line */}
          </div>

          <div className="flex items-center border-t p-4 bg-white gap-2">
            <input
              className="flex-1 border border-gray-200 rounded-full px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mô tả triệu chứng của bạn..."
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
        <div className="flex flex-col gap-3 items-center">
          <a
            href={`tel:${hotline}`}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full shadow-lg hover:scale-105 transition-transform w-[140px]"
          >
            <Phone size={20} />
            <span className="font-medium">Gọi điện</span>
          </a>
          <button 
  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full !rounded-full shadow-lg hover:scale-105 transition-transform w-[140px]"
  style={{ borderRadius: "999px !important" }}
  onClick={toggleChat}
>
  <MessageCircle size={20} />
  <span className="font-medium">Nhắn tin</span>
</button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;