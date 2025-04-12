import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, User, Bot } from "lucide-react"; // Thêm icons từ lucide-react

const ChatSupport = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      text: "Xin chào Harry Pham đến với hệ thống chat hỗ trợ DoctorCare. Bạn cần hỗ trợ gì không ạ?",
      time: "09:01 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null); // Thêm ref để tự động scroll

  // Tự động scroll đến tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "user",
          text: newMessage,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg rounded-l-2xl flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <select className="w-full p-2.5 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all">
            <option>Toàn bộ trò chuyện</option>
          </select>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 hover:bg-gray-50 cursor-pointer flex items-center border-b border-gray-100 transition-colors">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center relative">
              <img
                src="/images/support-avatar.png"
                alt="Support"
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://ui-avatars.com/api/?name=Support&background=0D8ABC&color=fff";
                }}
              />
              <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white" />
            </div>
            <div className="ml-3 flex-1">
              <div className="font-semibold text-gray-800">Hỗ trợ khách hàng</div>
              <div className="text-sm text-gray-500 truncate">
                Xin chào Harry Pham đến với h...
              </div>
            </div>
            <div className="text-xs text-gray-400">09:01 AM</div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col ml-2 h-full">
        {/* Chat Header */}
        <div className="px-6 py-3 bg-white shadow-sm rounded-t-2xl flex items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 relative">
              <img
                src="/images/support-avatar.png"
                alt="Support"
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://ui-avatars.com/api/?name=Support&background=0D8ABC&color=fff";
                }}
              />
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute bottom-0 right-0 border border-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Hỗ trợ khách hàng
              </h2>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                Đang hoạt động
              </span>
            </div>
          </div>
        </div>

        {/* Messages Container - Fixed Height */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ minHeight: 0 }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } space-x-2`}
            >
              {message.sender !== "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-500" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                } shadow-sm`}
              >
                <p className="text-[15px] leading-relaxed">{message.text}</p>
                <span
                  className={`text-xs ${
                    message.sender === "user" ? "text-blue-200" : "text-gray-400"
                  } block text-right mt-1`}
                >
                  {message.time}
                </span>
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-500" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Fixed at Bottom */}
        <div className="p-4 bg-white shadow-sm rounded-b-2xl">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <button
              type="submit"
              className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center"
              disabled={!newMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;