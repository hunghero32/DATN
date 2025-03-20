from chatbot_logic import chatbot_response

# Vòng lặp giao tiếp
print("Chào bạn! Tôi là chatbot sức khỏe. Bạn đang cảm thấy thế nào?")
while True:
    user_input = input("Bạn: ")
    if user_input.lower() == "thoát":
        print("Tạm biệt!")
        break
    response = chatbot_response(user_input)
    print("Chatbot: " + response)