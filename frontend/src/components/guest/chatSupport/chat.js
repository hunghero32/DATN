import { useState, useRef, useEffect } from "react";
import axios from "axios";
import pusher from "../../../services/pusher"; // Import Pusher
import { Send, User, Bot } from "lucide-react";

const ChatSupport = () => {
  const [user, setUser] = useState(null); // Lưu thông tin user
  const [conversations, setConversations] = useState([]); // Danh sách cuộc trò chuyện (cho admin)
  const [selectedConversation, setSelectedConversation] = useState(null); // Cuộc trò chuyện đang chọn
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      text: "Xin chào đến với hệ thống chat hỗ trợ DoctorCare. Bạn cần hỗ trợ gì không ạ?",
      time: "09:01 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Lấy thông tin user và conversation khi mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userResponse = await axios.get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);

        if (userResponse.data.role === "guest") {
          const convResponse = await axios.post(
            "http://localhost:8000/api/start-conversation",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setSelectedConversation(convResponse.data);
        } else if (userResponse.data.role === "admin") {
          const convResponse = await axios.get("http://localhost:8000/api/conversations", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setConversations(convResponse.data);
          if (convResponse.data.length > 0) {
            setSelectedConversation(convResponse.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // Lấy tin nhắn khi chọn conversation
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const response = await axios.get(
            `http://localhost:8000/api/conversations/${selectedConversation.id}/messages`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setMessages(
            response.data.map((msg) => ({
              id: msg.id,
              sender: msg.sender.role === "admin" ? "support" : "user",
              text: msg.content,
              time: new Date(msg.created_at).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }))
          );
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedConversation]);

  // Đăng ký Pusher để nhận tin nhắn thời gian thực
  useEffect(() => {
    if (selectedConversation) {
      const channel = pusher.subscribe(`conversation.${selectedConversation.id}`);
      channel.bind("App\\Events\\MessageSent", (data) => {
        setMessages((prev) => [
          ...prev,
          {
            id: data.id,
            sender: data.sender_role === "admin" ? "support" : "user",
            text: data.content,
            time: data.time,
          },
        ]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [selectedConversation]);

  // Tự động scroll đến tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const token = localStorage.getItem("authToken");
    console.log("Token being sent:", token);

    try {
      await axios.post(
        "http://localhost:8000/api/messages",
        {
          conversation_id: selectedConversation.id,
          content: newMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
      alert("Không thể gửi tin nhắn: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg rounded-l-2xl flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <select
            className="w-full p-2.5 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            onChange={(e) => {
              const convId = e.target.value;
              const conv = conversations.find((c) => c.id === parseInt(convId));
              setSelectedConversation(conv);
            }}
          >
            <option value="">Toàn bộ trò chuyện</option>
            {user?.role === "admin" &&
              conversations.map((conv) => (
                <option key={conv.id} value={conv.id}>
                  {conv.guest.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex-1 overflow-y-auto">
          {user?.role === "admin" ? (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className="p-4 hover:bg-gray-50 cursor-pointer flex items-center border-b border-gray-100 transition-colors"
                onClick={() => setSelectedConversation(conv)}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center relative">
                  <img
                    src="/images/support-avatar.png"
                    alt="Support"
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${conv.guest.name}&background=0D8ABC&color=fff`;
                    }}
                  />
                  <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-semibold text-gray-800">{conv.guest.name}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {conv.messages?.[0]?.content || "Chưa có tin nhắn"}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {conv.messages?.[0]?.created_at
                    ? new Date(conv.messages[0].created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </div>
              </div>
            ))
          ) : (
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
                  Xin chào đến với h...
                </div>
              </div>
              <div className="text-xs text-gray-400">09:01 AM</div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="px-6 py-3 bg-white shadow-sm rounded-t-2xl flex items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 relative">
              <img
                src={
                  user?.role === "admin" && selectedConversation?.guest
                    ? `https://ui-avatars.com/api/?name=${selectedConversation.guest.name}&background=0D8ABC&color=fff`
                    : "/images/support-avatar.png"
                }
                alt={user?.role === "admin" ? selectedConversation?.guest?.name : "Support"}
                className="w-8 h-8 rounded-full"
              />
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute bottom-0 right-0 border border-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.role === "admin" ? selectedConversation?.guest?.name : "Hỗ trợ khách hàng"}
              </h2>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                Đang hoạt động
              </span>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col">
          <div className="flex-1"></div> {/* Spacer to push messages to the bottom */}
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end ${
                  (user?.role === "admin" && message.sender === "support") ||
                  (user?.role === "guest" && message.sender === "user")
                    ? "justify-end"
                    : "justify-start"
                } space-x-2`}
              >
                {((user?.role === "admin" && message.sender !== "support") ||
                  (user?.role === "guest" && message.sender !== "user")) && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                    {user?.role === "admin" ? (
                      <img
                        src={`https://ui-avatars.com/api/?name=${selectedConversation?.guest?.name || "Guest"}&background=0D8ABC&color=fff`}
                        alt="Guest"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <Bot className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    (user?.role === "admin" && message.sender === "support") ||
                    (user?.role === "guest" && message.sender === "user")
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  } shadow-sm`}
                >
                  <p className="text-[15px] leading-relaxed">{message.text}</p>
                  <span
                    className={`text-xs ${
                      (user?.role === "admin" && message.sender === "support") ||
                      (user?.role === "guest" && message.sender === "user")
                        ? "text-blue-200"
                        : "text-gray-400"
                    } block text-right mt-1`}
                  >
                    {message.time}
                  </span>
                </div>
                {((user?.role === "admin" && message.sender === "support") ||
                  (user?.role === "guest" && message.sender === "user")) && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
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
              disabled={!selectedConversation}
            />
            <button
              type="submit"
              className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center"
              disabled={!newMessage.trim() || !selectedConversation}
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