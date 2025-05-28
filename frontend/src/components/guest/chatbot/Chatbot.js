import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, Calendar } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const Chatbot = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState([
    { text: "Xin chào! Bạn đang cảm thấy thế nào? Hãy mô tả triệu chứng của bạn.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hotline, setHotline] = useState("");
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const pythonResponse = await axios.post('http://localhost:5000/chat', {
        message: input
      }, {
        timeout: 15000, // Tăng thời gian chờ cho các phản hồi từ Gemini
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedResponse = typeof pythonResponse.data === 'string' 
        ? JSON.parse(pythonResponse.data) 
        : pythonResponse.data;
      
      // Khởi tạo đối tượng tin nhắn bot với giá trị mặc định
      let botResponseMessage = {
        text: "Xin lỗi, tôi không hiểu yêu cầu của bạn hoặc có lỗi xảy ra.", // Tin nhắn mặc định
        sender: "bot",
        isAppointment: false,
        link: undefined,
        specialties: undefined
      };

      // Ưu tiên message từ parsedResponse nếu có
      if (parsedResponse && parsedResponse.message) {
        botResponseMessage.text = parsedResponse.message;
      }

      if (parsedResponse && parsedResponse.status === 'success') {
        const responseType = parsedResponse.type;

        // Xử lý các loại phản hồi có thể chứa link và cần hiển thị nút đặt lịch
        // Bao gồm cả các type mới từ Gemini và các type cũ
        if (
            responseType === 'appointment_natural' ||
            responseType === 'no_results_natural' || 
            responseType === 'fallback_natural' ||
            responseType === 'clarification_needed_general' || // Các type này có thể kèm link hỗ trợ/đặt lịch
            responseType === 'appointment' || // type cũ
            responseType === 'no_specialty' || // type cũ
            responseType === 'appointment_legacy' ||
            responseType === 'no_info_fallback_legacy'
        ) {
            if (parsedResponse.link) {
                botResponseMessage.isAppointment = true;
                botResponseMessage.link = parsedResponse.link;
            }
        }

        // Xử lý dữ liệu chuyên khoa
        let specialtiesData = null;
        if (parsedResponse.specialties && parsedResponse.specialties.length > 0) {
            // Trường hợp API trả về trực tiếp danh sách chuyên khoa (có thể là từ logic cũ hoặc API search_service)
            specialtiesData = parsedResponse.specialties;
            // Nếu message hiện tại không phù hợp làm lời dẫn cho danh sách chuyên khoa, sử dụng lời dẫn mặc định
            if (botResponseMessage.text === "Xin lỗi, tôi không hiểu yêu cầu của bạn hoặc có lỗi xảy ra." || 
                !parsedResponse.message) { // Nếu python không trả message cụ thể cho list specialty
                 botResponseMessage.text = "Dựa vào triệu chứng của bạn, tôi đề xuất các chuyên khoa sau:";
            }
        } else if (parsedResponse.api_data && parsedResponse.api_data.specialties && parsedResponse.api_data.specialties.length > 0) {
            // Trường hợp API được gói trong api_data (nếu bạn cấu trúc backend Python theo cách này)
            specialtiesData = parsedResponse.api_data.specialties;
            if (parsedResponse.leading_message) { // Ưu tiên lời dẫn từ Gemini nếu có
                botResponseMessage.text = parsedResponse.leading_message;
            } else if (botResponseMessage.text === "Xin lỗi, tôi không hiểu yêu cầu của bạn hoặc có lỗi xảy ra.") {
                botResponseMessage.text = "Dựa vào triệu chứng của bạn, tôi đề xuất các chuyên khoa sau:";
            }
        }
        // Thêm cả trường hợp `parsedResponse.data` chứa specialties (nếu API Laravel trả về trong thuộc tính 'data')
        else if (parsedResponse.data && Array.isArray(parsedResponse.data) && parsedResponse.data.length > 0) {
            // Kiểm tra xem các phần tử có vẻ là chuyên khoa không (có id, name)
            if (parsedResponse.data.every(item => item && item.id && item.name)) {
                specialtiesData = parsedResponse.data;
                 if (botResponseMessage.text === "Xin lỗi, tôi không hiểu yêu cầu của bạn hoặc có lỗi xảy ra." || !parsedResponse.message) {
                    botResponseMessage.text = "Dựa vào triệu chứng của bạn, tôi đề xuất các chuyên khoa sau:";
                }
            }
        }


        if (specialtiesData) {
            botResponseMessage.specialties = specialtiesData.map(specialty => ({
                id: specialty.id,
                name: specialty.name,
                image: specialty.image || 'default-specialty-image.png', // Cung cấp ảnh mặc định nếu cần
                  description: specialty.description 
                    ? specialty.description.length > 60 
                        ? specialty.description.substring(0, 60) + '...' 
                        : specialty.description
                    : "Không có mô tả chi tiết."
            }));
            // Nếu có chuyên khoa, thường không cần nút "Đặt lịch ngay" chung cho tin nhắn này nữa,
            // vì mỗi chuyên khoa có link "Xem chi tiết".
            // Tuy nhiên, nếu `parsedResponse.link` vẫn được gửi từ backend cho một hành động chung,
            // `isAppointment` vẫn có thể được giữ. Hiện tại, renderMessage hiển thị cả hai nếu có.
        }
        
        // Đối với các type như greeting_natural, location_natural, thanks_natural, clarification_natural,
        // message đã được set ở trên từ parsedResponse.message.
        // Không cần thêm logic đặc biệt trừ khi chúng cũng có link (đã xử lý ở khối `isAppointment`).

      } else if (parsedResponse && parsedResponse.message) {
        // Trường hợp status không phải 'success' nhưng vẫn có message từ Python (ví dụ: lỗi do Gemini báo)
        // botResponseMessage.text đã được set ở trên.
      }
      // Nếu không có gì ở trên được xử lý, botResponseMessage sẽ giữ nguyên giá trị mặc định ban đầu.

      setMessages(prevMessages => [...prevMessages, botResponseMessage]);

    } catch (error) {
      console.error("Error sending/receiving message:", error);
      let errorMessageText = "Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn.";
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          errorMessageText = "Yêu cầu của bạn mất quá nhiều thời gian để xử lý. Vui lòng thử lại sau.";
      } else if (error.response) {
          errorMessageText = `Xin lỗi, máy chủ gặp sự cố (Mã lỗi: ${error.response.status}). Vui lòng thử lại sau.`;
      } else if (error.request) {
          errorMessageText = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.";
      }
      setMessages(prevMessages => [...prevMessages, { 
        text: errorMessageText, 
        sender: "bot" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Hàm renderMessage không thay đổi, giữ nguyên như bạn đã cung cấp
  const renderMessage = (msg, index) => {
    // Appointment message (with or without link)
    if (msg.isAppointment) {
      return (
        <div key={index} className="flex justify-start">
          <div className="p-4 rounded-lg text-sm max-w-[85%] shadow-md bg-white border border-gray-100 mb-3">
            <div className="font-medium text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></div>
            {msg.link && (
              <a
                href={msg.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Đặt lịch ngay
              </a>
            )}
          </div>
        </div>
      );
    }

    if (msg.specialties) {
      return (
        <div key={index} className="flex justify-start">
          <div className="p-4 rounded-lg text-sm max-w-[85%] shadow-md bg-white border border-gray-100 mb-3">
            <div className="font-medium text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></div>
            <div className="space-y-3 mt-2"> {/* Thêm mt-2 cho khoảng cách */}
              {msg.specialties.map((specialty, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-200"
                >
                  <div className="flex flex-col gap-2">
                    {specialty.image && specialty.image !== 'default-specialty-image.png' && ( // Chỉ hiển thị nếu có ảnh và không phải ảnh mặc định (tùy bạn)
                         <img
                            src={specialty.image}
                            alt={specialty.name}
                            className="w-full h-auto object-cover rounded-lg mb-2 max-h-40" // Giới hạn chiều cao ảnh
                        />
                    )}
                    <div className="font-semibold text-gray-800 text-base">{specialty.name}</div> {/* Tăng kích thước font */}
                    {specialty.description && specialty.description !== "Không có mô tả chi tiết." && (
                         <div 
                            className="text-sm text-gray-600"
                            dangerouslySetInnerHTML={{ __html: specialty.description.replace(/\n/g, '<br />') }}
                         />
                    )}
                    <Link 
                      to={`/detail-specialty/${specialty.id}`} 
                      className="mt-1 inline-flex items-center justify-center gap-1 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs font-medium transition-colors self-start" // text-xs, self-start
                    >
                      Xem chi tiết
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"> {/* Điều chỉnh kích thước icon */}
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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

    // Tin nhắn văn bản thông thường (của user hoặc bot)
    return (
      <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
        <div className={`p-3 rounded-2xl text-sm max-w-[75%] shadow-sm mb-3 ${
          msg.sender === "user" 
            ? "bg-blue-500 text-white" 
            : "bg-white border border-gray-100 text-gray-700"
        }`}
        dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} // Cho phép xuống dòng bằng \n
        >
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchHotline = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/system');
        // Giả sử API trả về { data: { hotline: "..." } } hoặc { hotline: "..." }
        const hotlineData = response.data.data?.hotline || response.data.hotline;
        if (hotlineData) {
            setHotline(hotlineData);
        }
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
          <div className="h-[400px] p-4 overflow-y-auto bg-gray-50 space-y-1"> {/* Giảm space-y */}
            {messages.map((msg, index) => renderMessage(msg, index))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-sm pl-2 pt-2"> {/* Căn lề typing indicator */}
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            )}
            <div ref={messagesEndRef} /> 
          </div>

          <div className="flex items-center border-t p-3 bg-white gap-2"> {/* Giảm padding */}
            <input
              className="flex-1 border border-gray-200 rounded-full px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" // Điều chỉnh padding input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mô tả triệu chứng của bạn..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center justify-center"
              onClick={handleSendMessage}
              disabled={isTyping || !input.trim()} // Vô hiệu hóa nút gửi khi đang typing hoặc input rỗng
            >
              <Send size={18} /> {/* Giảm kích thước icon */}
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="flex flex-col gap-3 items-center">
          {hotline && ( // Chỉ hiển thị nút gọi nếu có hotline
             <a
                href={`tel:${hotline}`}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full shadow-lg hover:scale-105 transition-transform w-[140px]"
            >
                <Phone size={20} />
                <span className="font-medium">Gọi điện</span>
            </a>
          )}
          <button 
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-lg hover:scale-105 transition-transform w-[140px]"
            style={{ borderRadius: "999px" }} // Đảm bảo bo tròn tuyệt đối
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