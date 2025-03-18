import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

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
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform ease-in-out">
      {isOpen && (
        <div className="w-96 shadow-2xl bg-white border border-gray-200 rounded-2xl overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-4 flex justify-between items-center">
            <h6 className="font-semibold text-lg">Trợ lý ảo</h6>
            <X className="cursor-pointer hover:opacity-75" onClick={toggleChat} />
          </div>
          <div className="h-72 p-4 overflow-y-auto bg-gray-50 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-lg text-sm max-w-[75%] shadow-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-gray-500 text-sm italic animate-pulse">Đang nhập...</div>
            )}
          </div>

          <div className="flex items-center border-t p-3 bg-white">
            <input
              className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
            />
            <button
              className="ml-3 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              onClick={handleSendMessage}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button 
          className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
          onClick={toggleChat}
        >
          <MessageCircle />
          <span className="text-sm font-medium">Chat</span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;