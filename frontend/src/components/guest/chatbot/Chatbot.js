import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState([
    { text: "Xin chào! Tôi có thể giúp gì cho bạn?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Tôi đang xử lý yêu cầu của bạn...", sender: "bot" }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 transition-all duration-300 transform ease-in-out z-50">
      {isOpen && (
        <div className="w-80 shadow-xl bg-white border rounded-2xl overflow-hidden animate-fadeIn">
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <h6 className="font-semibold text-sm">Trợ lý ảo</h6>
            <X className="cursor-pointer hover:text-gray-300" onClick={toggleChat} />
          </div>
          <div className="h-60 p-4 overflow-y-auto bg-gray-100">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-lg text-sm max-w-[70%] ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-gray-500 text-sm italic">Đang nhập...</div>
            )}
          </div>

          <div className="flex items-center border-t p-2 bg-white">
            <input
              className="flex-1 border rounded-full px-3 py-2 outline-none text-sm focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition text-sm"
              onClick={handleSendMessage}
            >
              Gửi
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button 
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={toggleChat}
        >
          <MessageCircle />
          <span>Chat</span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
