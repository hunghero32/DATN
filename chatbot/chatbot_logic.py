import requests
import nltk
import json
import os
import base64
from nltk.tokenize import word_tokenize
from fuzzywuzzy import fuzz
import google.generativeai as genai
import sys
import io

# Đảm bảo console hỗ trợ UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Tải dữ liệu punkt cho NLTK
nltk.download('punkt', quiet=True)

# URL API của Laravel
API_URL = "http://localhost:8000/api/client/services/search"
LEARNING_FILE = 'learned_symptoms.json'


# --- SPECIALTY_MAPPING VÀ SYMPTOM_MAPPING ĐÃ ĐƯỢC CẬP NHẬT VÀ DỌN DẸP ---
specialty_mapping = {
    'nội tổng quát': [
        'sốt', 'ho', 'khó thở', 'mệt mỏi', 'chán ăn', 'sụt cân',
        'đau bụng', 'đầy hơi', 'tiêu chảy', 'táo bón', 'đau đầu',
        'chóng mặt', 'ngất xỉu', 'đau ngực', 'tức ngực', 'huyết áp cao',
        'huyết áp thấp', 'đái tháo đường', 'rối loạn mỡ máu', 'viêm gan',
        'gan nhiễm mỡ', 'viêm dạ dày', 'trào ngược dạ dày', 'loét dạ dày',
        'viêm đại tràng', 'thiếu máu', 'suy tim', 'suy thận', 'viêm phổi',
        'hen suyễn', 'viêm họng', 'viêm amidan', 'viêm xoang', 'viêm phế quản',
        'viêm bàng quang', 'nhiễm trùng tiểu', 'nổi mẩn ngứa', 'phù nề',
        'rối loạn nội tiết', 'sốt siêu vi', 'cảm cúm', 'viêm tụy',
        'rối loạn tiêu hóa', 'bệnh tuyến giáp', 'tiểu đêm', 'nấc cụt kéo dài'
    ],
    'nhi khoa': [
        'sốt', 'ho', 'khó thở', 'bú kém', 'nôn ói', 'tiêu chảy', 'phát ban',
        'quấy khóc', 'vàng da sơ sinh', 'viêm phổi', 'viêm tai giữa',
        'viêm họng', 'viêm amidan', 'viêm mũi', 'viêm phế quản', 'suy dinh dưỡng',
        'rối loạn tiêu hóa', 'viêm ruột', 'nhiễm trùng tiểu', 'co giật',
        'chậm phát triển', 'viêm da cơ địa', 'suy hô hấp', 'viêm màng não'
    ],
    'da liễu': [
        'ngứa', 'nổi mẩn đỏ', 'mụn trứng cá', 'mụn mủ', 'mụn nước',
        'vảy nến', 'viêm da cơ địa', 'viêm da tiếp xúc', 'nấm da',
        'ghẻ', 'mụn rộp', 'sẩn ngứa', 'nám da', 'tàn nhang',
        'mụn cóc', 'mụn thịt', 'mụn ruồi', 'mụn bọc', 'mụn đầu đen',
        'mụn đầu trắng', 'mụn nang', 'mụn viêm', 'mụn không viêm'
    ],
    'tim mạch': [
        'đau ngực', 'tức ngực', 'khó thở', 'hồi hộp', 'đánh trống ngực',
        'choáng váng', 'ngất xỉu', 'phù chân', 'mệt mỏi', 'huyết áp cao',
        'huyết áp thấp', 'nhịp tim không đều', 'đau thắt ngực', 'suy tim',
        'đột quỵ', 'bệnh mạch vành', 'bệnh van tim', 'rối loạn nhịp tim',
        'bệnh động mạch ngoại biên', 'bệnh tĩnh mạch ngoại biên'
    ],
    'chấn thương chỉnh hình': [
        'đau khớp', 'sưng khớp', 'cứng khớp', 'giới hạn vận động',
        'gãy xương', 'trật khớp', 'viêm khớp', 'thoái hóa khớp',
        'viêm gân', 'viêm bao hoạt dịch', 'đau lưng', 'đau cổ',
        'đau vai', 'đau đầu gối', 'đau hông', 'đau cổ tay',
        'đau mắt cá chân', 'đau gót chân', 'đau bàn chân', 'đau ngón tay'
    ],
    'tai mũi họng': [
        'viêm họng', 'viêm amidan', 'viêm mũi', 'viêm xoang',
        'viêm tai giữa', 'nghẹt mũi', 'chảy mũi', 'đau tai',
        'giảm thính lực', 'ù tai', 'viêm thanh quản', 'khàn tiếng',
        'viêm VA', 'viêm họng hạt', 'viêm mũi dị ứng', 'viêm mũi vận mạch',
        'viêm tai ngoài', 'viêm tai trong', 'viêm tai xương chũm', 'viêm tai xương đá'
    ],
    'răng hàm mặt': [
        'đau răng', 'sâu răng', 'viêm nướu', 'viêm nha chu',
        'áp xe răng', 'nứt răng', 'mòn răng', 'răng khôn mọc lệch',
        'viêm tủy răng', 'viêm quanh chóp răng', 'viêm quanh răng', 
        'viêm quanh thân răng', 'viêm quanh chân răng', 'viêm quanh cổ răng'
    ],
    'sản phụ khoa': [
        'rối loạn kinh nguyệt', 'đau bụng kinh', 'ra khí hư bất thường',
        'ngứa vùng kín', 'chảy máu âm đạo bất thường', 'viêm âm đạo',
        'viêm cổ tử cung', 'u xơ tử cung', 'u nang buồng trứng',
        'viêm nội mạc tử cung', 'viêm phần phụ', 'viêm vùng chậu',
        'thai ngoài tử cung', 'sẩy thai', 'dọa sẩy thai', 'sinh non',
        'tiền sản giật', 'sản giật', 'băng huyết sau sinh', 'nhiễm trùng hậu sản'
    ],
    'mắt': [
        'đỏ mắt', 'ngứa mắt', 'chảy nước mắt', 'mờ mắt',
        'nhìn đôi', 'nhìn mờ', 'nhìn thấy đốm đen', 'nhìn thấy tia sáng',
        'đau mắt', 'cộm mắt', 'chảy ghèn', 'viêm kết mạc',
        'viêm giác mạc', 'viêm màng bồ đào', 'viêm mí mắt',
        'viêm tuyến lệ', 'viêm tuyến Meibomian', 'viêm tuyến Zeis',
        'viêm tuyến Moll', 'viêm tuyến Harder'
    ],
    'thần kinh': [ 
        'đau đầu', 'chóng mặt', 'mất thăng bằng', 'tê bì tay chân',
        'yếu cơ', 'co giật', 'mất trí nhớ', 'rối loạn giấc ngủ',
        'trầm cảm', 'lo âu', 'rối loạn hành vi', 'rối loạn ngôn ngữ',
        'rối loạn vận động', 'rối loạn cảm giác', 'rối loạn ý thức',
        'rối loạn thị giác', 'rối loạn thính giác', 'rối loạn khứu giác',
        'rối loạn vị giác', 'rối loạn phản xạ'
    ],
    'tiêu hóa': [ 
        'đau bụng', 'đầy hơi', 'buồn nôn', 'nôn ói',
        'tiêu chảy', 'táo bón', 'ợ nóng', 'ợ chua',
        'khó tiêu', 'chán ăn', 'sụt cân', 'đầy bụng',
        'trào ngược dạ dày', 'viêm dạ dày', 'loét dạ dày',
        'viêm ruột', 'viêm đại tràng', 'viêm tụy',
        'viêm gan', 'gan nhiễm mỡ'
    ],
    'tiết niệu': [ 
        'tiểu buốt', 'tiểu rắt', 'tiểu đêm', 'tiểu nhiều lần',
        'tiểu khó', 'tiểu ra máu', 'tiểu đục', 'tiểu không tự chủ',
        'đau lưng', 'đau bụng dưới', 'sốt', 'ớn lạnh',
        'buồn nôn', 'nôn ói', 'mệt mỏi', 'chán ăn',
        'sưng phù', 'tăng huyết áp', 'thiếu máu', 'ngứa da'
    ],
    'hô hấp': [ 
        'ho', 'khó thở', 'thở khò khè', 'đau ngực',
        'sốt', 'ớn lạnh', 'mệt mỏi', 'chán ăn',
        'sụt cân', 'ho ra máu', 'ho có đờm', 'ho khan',
        'viêm họng', 'viêm phế quản', 'viêm phổi',
        'hen suyễn', 'bệnh phổi tắc nghẽn mạn tính',
        'viêm mũi dị ứng', 'viêm xoang', 'viêm thanh quản'
    ],
    'nội tiết': [ 
        'mệt mỏi', 'tăng cân', 'giảm cân', 'khát nước',
        'tiểu nhiều', 'rối loạn kinh nguyệt', 'rụng tóc',
        'da khô', 'lạnh tay chân', 'đổ mồ hôi nhiều',
        'run tay', 'nhịp tim nhanh', 'nhịp tim chậm',
        'tăng huyết áp', 'giảm huyết áp', 'rối loạn giấc ngủ',
        'trầm cảm', 'lo âu', 'giảm ham muốn', 'vô sinh'
    ],
    'y học cổ truyền': [
        'y học cổ truyền','mệt mỏi kinh niên','khó ngủ','mất ngủ','ngủ không sâu giấc','đau đầu kinh niên','chóng mặt','ù tai',
        'hồi hộp','tim đập nhanh','ra mồ hôi trộm','tay chân lạnh','nóng trong người','khô miệng','đắng miệng','chán ăn',
        'đầy bụng','khó tiêu','tiêu chảy mạn','táo bón kinh niên','đau bụng âm ỉ','đau lưng','đau mỏi vai gáy','tê bì tay chân',
        'đau khớp','cứng khớp','yếu cơ','rối loạn kinh nguyệt','đau bụng kinh','bốc hỏa','mãn kinh sớm','suy nhược cơ thể',
        'khí hư bất thường','tiểu đêm nhiều lần','tiểu khó','nhiễm lạnh','cảm mạo','ho kéo dài','đờm nhiều','khó thở',
        'dị ứng thời tiết','mẩn ngứa da','mụn nhọt','rối loạn tiêu hóa','trào ngược dạ dày','viêm họng mạn','suy giảm trí nhớ',
        'lo âu','trầm cảm nhẹ','rối loạn thần kinh thực vật','huyết áp không ổn định','suy giảm chức năng gan','suy giảm chức năng thận'
    ],
    'ung bướu': [
        'sờ thấy khối u', 'đau không rõ nguyên nhân', 'sụt cân không lý do',
        'mệt mỏi kéo dài', 'sốt kéo dài', 'chán ăn',
        'thiếu máu', 'vàng da', 'ho ra máu',
        'tiểu ra máu', 'đi ngoài ra máu', 'nôn ra máu',
        'đau xương', 'đau bụng', 'đau đầu',
        'đau ngực', 'đau lưng', 'đau khớp',
        'đau cơ', 'đau thần kinh'
    ],
    'huyết học': [
        'thiếu máu', 'chảy máu cam', 'bầm tím không rõ nguyên nhân', 'xuất huyết dưới da',
        'sốt kéo dài không rõ nguyên nhân', 'mệt mỏi mạn tính', 'xanh xao', 'da niêm nhợt nhạt',
        'giảm tiểu cầu', 'bạch cầu tăng cao', 'hạch to', 'gan lách to', 'chảy máu chân răng',
        'rối loạn đông máu', 'nhiễm trùng tái diễn', 'sút cân không rõ nguyên nhân',
        'thiếu bạch cầu', 'tiểu máu', 'chảy máu lâu cầm', 'tăng sinh tủy'
    ],
    'dinh dưỡng': [
        'suy dinh dưỡng', 'thừa cân', 'béo phì', 'thiếu vitamin', 'thiếu vi chất',
        'biếng ăn', 'chán ăn', 'sụt cân', 'mệt mỏi', 'rụng tóc', 'da khô',
        'da nổi vảy', 'rụng lông mày', 'phù dinh dưỡng', 'chậm phát triển chiều cao',
        'dễ nhiễm trùng', 'thiếu máu do thiếu sắt', 'loãng xương', 'đau xương khớp',
        'tiêu hóa kém', 'nứt môi', 'nứt da tay chân', 'vết thương lâu lành'
    ],
    'vật lý trị liệu': [ 
        'đau lưng', 'đau cổ', 'đau vai gáy', 'đau khớp', 'cứng khớp',
        'tê bì tay chân', 'yếu cơ', 'liệt nửa người', 'liệt hai chân',
        'khó đi lại', 'co cứng cơ', 'run tay chân', 'giảm vận động',
        'giảm linh hoạt', 'biến dạng khớp', 'teo cơ', 'mỏi cơ',
        'khó thở do vận động kém', 'rối loạn thăng bằng', 'khó đứng lâu',
        'di chứng sau tai biến', 'viêm gân cơ', 'đau sau chấn thương'
    ],
    'tâm thần': [ 
        'lo âu', 'trầm cảm', 'mất ngủ', 'rối loạn giấc ngủ', 'hoang tưởng',
        'ảo giác', 'buồn bã kéo dài', 'căng thẳng', 'mất tập trung', 'giảm trí nhớ',
        'hành vi bất thường', 'nói lảm nhảm', 'thay đổi cảm xúc bất thường',
        'tự làm tổn thương bản thân', 'sợ hãi vô lý', 'giảm ham muốn sống',
        'giận dữ vô cớ', 'rối loạn ăn uống', 'rối loạn cảm xúc lưỡng cực',
        'loạn thần', 'suy giảm nhận thức', 'khó giao tiếp xã hội', 'rối loạn ám ảnh cưỡng chế'
    ]
}
symptom_mapping = {
    'đau lưng': ['đau lưng', 'nhức lưng', 'lưng đau', 'lưng nhức', 'đau cột sống'],
    'đau đầu': ['đau đầu', 'nhức đầu', 'đầu đau', 'đầu nhức'],
    'đau bụng': ['đau bụng', 'nhức bụng', 'bụng đau', 'bụng nhức'],
    'đau họng': ['đau họng', 'viêm họng', 'họng đau', 'họng nhức'],
    'sốt': ['sốt', 'nóng', 'nóng người', 'sốt cao'],
    'ho': ['ho', 'khò khè', 'ho khan', 'ho có đờm'],
    'mệt': ['mệt', 'mệt mỏi', 'uể oải', 'không khỏe'],
    'chóng mặt': ['chóng mặt', 'choáng', 'váng đầu', 'quay cuồng'],
    'khó thở': ['khó thở', 'ngộp', 'thở gấp', 'tức ngực'],
    'buồn nôn': ['buồn nôn', 'nôn', 'ói', 'buồn ói'],
    'đau tay': ['đau tay', 'nhức tay', 'tay đau', 'tay nhức'],
    'đau chân': ['đau chân', 'nhức chân', 'chân đau', 'chân nhức']
}

def find_best_symptom_match(text, current_specialty_mapping):
    text_lower = text.lower()
    for specialty, symptoms_list in current_specialty_mapping.items():
        for symptom in symptoms_list:
            if symptom == text_lower:
                return {'symptom': symptom, 'specialty': specialty, 'score': 101}
    for main_symptom, variations in symptom_mapping.items():
        if text_lower in variations:
            for specialty, symptoms_in_specialty in current_specialty_mapping.items():
                if main_symptom in symptoms_in_specialty:
                    return {'symptom': main_symptom, 'specialty': specialty, 'score': 100}

    best_match_specialty = None
    highest_score_specialty = 0
    FUZZY_THRESHOLD_SPECIALTY = 85 
    for specialty, symptoms_list in current_specialty_mapping.items():
        for symptom in symptoms_list:
            score = fuzz.token_set_ratio(text_lower, symptom)
            if score > highest_score_specialty and score >= FUZZY_THRESHOLD_SPECIALTY:
                highest_score_specialty = score
                best_match_specialty = {'symptom': symptom, 'specialty': specialty, 'score': score}

    best_match_variation = None
    highest_score_variation = 0
    FUZZY_THRESHOLD_VARIATION = 88
    for main_symptom, variations in symptom_mapping.items():
        for variation in variations:
            score = fuzz.token_set_ratio(text_lower, variation)
            if score > highest_score_variation and score >= FUZZY_THRESHOLD_VARIATION:
                for spec, symps_in_spec in current_specialty_mapping.items():
                    if main_symptom in symps_in_spec:
                        highest_score_variation = score
                        best_match_variation = {'symptom': main_symptom, 'original_variation': variation, 'specialty': spec, 'score': score}
                        break 
    
    if best_match_specialty and best_match_variation:
        return best_match_specialty if best_match_specialty['score'] >= best_match_variation['score'] else best_match_variation
    return best_match_specialty or best_match_variation

def search_service(keyword, current_specialty_mapping):
    try:
        headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
        search_type = 'symptom'
        normalized_keyword_for_check = keyword.lower()
        if any(spec.lower() == normalized_keyword_for_check for spec in current_specialty_mapping.keys()):
            search_type = 'specialty'
        keyword_bytes = keyword.encode('utf-8')
        encoded_keyword = base64.b64encode(keyword_bytes).decode('utf-8')
        params = {'keyword': encoded_keyword, 'type': search_type}
        # print(f"Gọi API search_service với keyword='{keyword}', type='{search_type}'")
        response = requests.get(API_URL, params=params, headers=headers, timeout=10)
        response.raise_for_status() 
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        print(f"Lỗi HTTP khi gọi API search_service: {http_err}, Response: {http_err.response.text if http_err.response else 'No response text'}")
        return {'status': 'error', 'message': f'Lỗi từ server dịch vụ ({http_err.response.status_code if http_err.response else "N/A"}) cho từ khóa "{keyword}".'}
    except requests.exceptions.Timeout:
        print(f"Lỗi Request API: Timeout khi gọi search_service cho từ khóa {keyword}")
        return {'status': 'error', 'message': 'Yêu cầu đến server dịch vụ mất quá nhiều thời gian.'}
    except requests.exceptions.RequestException as e:
        print(f"Lỗi Request API search_service: {str(e)}")
        return {'status': 'error', 'message': 'Không thể kết nối đến server dịch vụ.'}
    except Exception as e: 
        print(f"Lỗi chung trong search_service: {str(e)}")
        return {'status': 'error', 'message': 'Có lỗi xảy ra khi tìm kiếm dịch vụ.'}

# --- TÍCH HỢP GEMINI ---
GEMINI_API_KEY = '' # <<<<<< THAY THẾ BẰNG API KEY CỦA BẠN
gemini_model = None
safety_settings_custom = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]
try:
    if GEMINI_API_KEY and GEMINI_API_KEY != 'YOUR_API_KEY' and GEMINI_API_KEY != '':
        genai.configure(api_key=GEMINI_API_KEY)
        gemini_model = genai.GenerativeModel(
            model_name='gemini-1.5-flash-latest',
            safety_settings=safety_settings_custom,
            generation_config=genai.types.GenerationConfig(temperature=0.5) # Giảm nhiệt độ hơn nữa
        )
        print("Đã khởi tạo thành công mô hình Gemini với cài đặt an toàn và nhiệt độ thấp (0.5).")
    else:
        print("CẢNH BÁO: GEMINI_API_KEY chưa được cấu hình. Các tính năng Gemini sẽ bị vô hiệu hóa.")
except Exception as e:
    print(f"Lỗi khởi tạo Gemini: {e}. Các tính năng Gemini có thể không hoạt động.")
    gemini_model = None

def format_chat_history_for_gemini(chat_history_list):
    gemini_history = []
    if chat_history_list:
        for msg in chat_history_list[-6:]: 
            role = "user" if msg.get("sender") == "user" else "model"
            text_content = msg.get("text", "")
            if text_content:
                gemini_history.append({"role": role, "parts": [{"text": text_content}]})
    return gemini_history

def analyze_input_with_gemini(user_input, conversation_history_frontend=None):
    if not gemini_model: return {"error": "Gemini model not initialized."}
    gemini_formatted_history = format_chat_history_for_gemini(conversation_history_frontend)
    chat_session = gemini_model.start_chat(history=gemini_formatted_history)
    
    analysis_instructions = f"""
    ---
    BỐI CẢNH: Bạn là trợ lý y tế AI, đang phân tích tin nhắn CUỐI CÙNG từ người dùng.
    LỊCH SỬ TRÒ CHUYỆN (nếu có) đã được cung cấp.
    TIN NHẮN CẦN PHÂN TÍCH: "{user_input}"

    NHIỆM VỤ: Phân tích tin nhắn trên và CHỈ trả về JSON với các trường sau:
    1.  "intent": (string) Ý định chính (ví dụ: "greeting", "appointment", "location", "thanks", "symptom_report", "direct_specialty_request", "user_confirms_details", "user_requests_clarification", "unknown"). Nếu người dùng yêu cầu chuyên khoa, intent là "direct_specialty_request". Nếu người dùng đồng ý/xác nhận muốn XEM CHI TIẾT DỊCH VỤ cho một chuyên khoa bot đã gợi ý (ví dụ: "có", "cho tôi xem", "ok xem đi"), intent là "user_confirms_details".
    2.  "symptoms": (list of strings) Danh sách triệu chứng (đã chuẩn hóa, tiếng Việt) nếu có.
    3.  "target_specialty_name": (string) Tên chuyên khoa nếu intent là "direct_specialty_request". Hoặc nếu intent là "user_confirms_details", đây là tên chuyên khoa người dùng muốn xem chi tiết (suy luận từ lịch sử).
    4.  "clarification_needed_detail": (string) Nếu cần làm rõ thêm, tạo một CÂU HỎI NGẮN GỌN, tập trung (tối đa 1-2 câu). Ví dụ: "Bạn đau đầu ở vùng nào?", "Triệu chứng này kéo dài bao lâu rồi ạ?".
    5.  "is_direct_command": (boolean) True nếu là lệnh không liên quan y tế.
    ---
    JSON phân tích cho "{user_input}":
    """
    try:
        response = chat_session.send_message(analysis_instructions)
        cleaned_response_text = response.text.strip()
        if cleaned_response_text.startswith("```json"): cleaned_response_text = cleaned_response_text[7:]
        if cleaned_response_text.endswith("```"): cleaned_response_text = cleaned_response_text[:-3]
        analysis = json.loads(cleaned_response_text.strip())
        return analysis
    except Exception as e:
        print(f"Lỗi nghiêm trọng khi phân tích input với Gemini: {e}")
        raw_resp_text = response.text if 'response' in locals() and hasattr(response, 'text') else "Không có phản hồi hoặc lỗi sớm."
        return {"error": f"Lỗi xử lý phân tích: {str(e)}", "raw_response": raw_resp_text}

def generate_natural_response_with_gemini(user_input_for_context, context_data, conversation_history_frontend=None):
    if not gemini_model: return {"status": "error", "type": "gemini_error", "message": "Gemini model not initialized."}
    gemini_formatted_history = format_chat_history_for_gemini(conversation_history_frontend)
    
    if user_input_for_context and \
       (not gemini_formatted_history or \
        not (gemini_formatted_history[-1].get("role") == "user" and \
             any(part.get("text") == user_input_for_context for part in gemini_formatted_history[-1].get("parts",[])))):
        gemini_formatted_history.append({"role": "user", "parts": [{"text": user_input_for_context}]})
        if len(gemini_formatted_history) > 7:
             gemini_formatted_history = gemini_formatted_history[-7:]

    chat_session = gemini_model.start_chat(history=gemini_formatted_history)
    
    response_type_suggestion = context_data.get("type", "natural_language")
    link_to_include = context_data.get("link")
    address_to_include = context_data.get("address")
    context_type = context_data.get("type")

    generation_instructions = "Bạn là trợ lý y tế AI. Hãy trả lời bằng tiếng Việt thân thiện, đồng cảm, NGẮN GỌN, đi thẳng vào vấn đề (1-2 câu nếu có thể). "

    if context_type == "greeting_natural":
        generation_instructions += "Chào người dùng và hỏi bạn có thể giúp gì (ví dụ: 'Chào bạn! Mình giúp gì được cho bạn?')."
    elif context_type == "appointment_natural":
        generation_instructions += f"Người dùng muốn đặt lịch. Hướng dẫn họ đặt lịch qua link: {link_to_include} (ví dụ: 'Bạn có thể đặt lịch trực tuyến tại đây: {link_to_include}')."
    elif context_type == "location_natural":
        generation_instructions += f"Cung cấp địa chỉ: {address_to_include} (ví dụ: 'Địa chỉ phòng khám: {address_to_include}.')."
    elif context_type == "thanks_natural":
        generation_instructions += "Đáp lại lời cảm ơn (ví dụ: 'Rất vui được giúp bạn!')."
    elif context_type == "clarification_natural":
        clarification_question = context_data.get("message_detail", "Bạn nói rõ hơn được không?")
        generation_instructions += f"Đặt câu hỏi này để làm rõ: \"{clarification_question}\"."
    
    elif context_type == "present_single_specialty_and_ask":
        specialty_name = context_data.get("specialty_name", "Chuyên khoa liên quan")
        symptom_ctx = context_data.get("symptom_context", "tình trạng của bạn")
        services_preview = context_data.get("services_preview_message", "") # Để trống nếu không muốn preview
        generation_instructions += (
            f"Với {symptom_ctx}, chuyên khoa **{specialty_name}** có thể phù hợp. {services_preview} "
            f"Bạn có muốn xem các dịch vụ của khoa này không?" # Câu hỏi trực tiếp hơn
        )
    elif context_type == "list_specific_services":
        specialty_name = context_data.get("specialty_name", "chuyên khoa")
        services_text = context_data.get("services_list_text", "một số dịch vụ.")
        additional_info = context_data.get("additional_services_info", "")
        generation_instructions += (
            f"Đây là một số dịch vụ của khoa **{specialty_name}**:\n{services_text}{additional_info}\n"
            f"Bạn có thể xem chi tiết hơn trên thẻ hiển thị (nếu có) hoặc chat với nhân viên để được hỗ trợ đặt lịch nhé."
        ) # Bỏ link đặt lịch chung nếu đã hiển thị dịch vụ
    elif context_type == "ask_user_to_select_from_multiple_specialties":
        specialty_options_str = ", ".join(context_data.get("specialty_options", []))
        symptom_ctx = context_data.get("symptom_context", "tình trạng của bạn")
        generation_instructions += (
            f"Với {symptom_ctx}, có một vài chuyên khoa liên quan: **{specialty_options_str}**. "
            f"Bạn quan tâm nhất đến chuyên khoa nào, hay muốn mô tả thêm triệu chứng?"
        )
    elif context_type == "symptom_query_no_results_natural":
        symptoms_mentioned_str = ", ".join(context_data.get("symptoms_mentioned", ["triệu chứng của bạn"]))
        generation_instructions += (
            f"Tôi chưa tìm thấy chuyên khoa cho \"{symptoms_mentioned_str}\". "
            f"Bạn vui lòng mô tả kỹ hơn, hoặc chat với nhân viên để được tư vấn trực tiếp nhé."
        )
    elif context_type == "fallback_natural" or context_type == "clarification_needed_general":
        user_original_query = context_data.get("message_detail", user_input_for_context)
        generation_instructions += (
            f"Tôi chưa hiểu rõ \"{user_original_query}\". Bạn có thể mô tả lại hoặc cung cấp thêm chi tiết triệu chứng được không? "
            f"Hoặc bạn có thể chat trực tiếp với nhân viên để được hỗ trợ."
        )
    elif context_type == "direct_command_unsupported":
        generation_instructions += "Yêu cầu này không thuộc phạm vi hỗ trợ y tế của tôi. Tôi có thể giúp tìm thông tin triệu chứng, chuyên khoa hoặc đặt lịch khám."
    else: 
        generation_instructions += f"Tôi nhận được yêu cầu \"{user_input_for_context}\". Bạn có thể nói rõ hơn về vấn đề sức khỏe bạn đang gặp không?"
        response_type_suggestion = "clarification_needed_general"

    try:
        response = chat_session.send_message(generation_instructions)
        generated_text = response.text.strip()
        if not response.candidates or not generated_text:
            block_reason = response.prompt_feedback.block_reason if response.prompt_feedback else "Không rõ"
            print(f"Phản hồi bị chặn/rỗng từ Gemini. Lý do: {block_reason}")
            generated_text = "Xin lỗi, tôi không thể phản hồi yêu cầu này. Bạn thử lại hoặc hỏi khác được không?"
            response_type_suggestion = "blocked_or_empty_response"

        return_data = {"status": "success", "type": response_type_suggestion, "message": generated_text}
        # CHỈ đính kèm link nếu type cụ thể yêu cầu và link đó là link Đặt Lịch Chung
        if link_to_include and response_type_suggestion in ["appointment_natural", "fallback_natural", "clarification_needed_general", "symptom_query_no_results_natural"]:
             # Không tự động thêm link cho "present_single_specialty_and_ask" và "list_specific_services"
             # vì những trường hợp này link nên được bot chủ động đề cập trong message nếu cần.
             # Hoặc frontend sẽ có nút "Chat với nhân viên" riêng.
            if response_type_suggestion != "present_single_specialty_and_ask" and response_type_suggestion != "list_specific_services":
                 return_data["link"] = link_to_include 
        
        if context_type in ["present_single_specialty_and_ask", "list_specific_services", "ask_user_to_select_from_multiple_specialties"] :
            if context_data.get("services_info"): # services_info là list các dịch vụ/bác sĩ
                return_data["specialties"] = context_data.get("services_info")
            elif context_data.get("raw_api_data_for_selection"): # Dùng cho ask_user_to_select_from_multiple_specialties
                 return_data["specialties"] = context_data.get("raw_api_data_for_selection")
        return return_data
    except Exception as e:
        print(f"Lỗi nghiêm trọng khi tạo phản hồi với Gemini: {e}")
        error_message = f"Xin lỗi, tôi đang gặp sự cố khi tạo phản hồi ({type(e).__name__})."
        if hasattr(e, 'args') and e.args: error_message += f" Chi tiết: {e.args[0]}"
        elif hasattr(e, 'message'): error_message += f" Chi tiết: {e.message}"
        return {"status": "error", "type": "gemini_error", "message": error_message}

def chatbot_response(user_input, conversation_history_frontend=None):
    if conversation_history_frontend is None: conversation_history_frontend = []
    
    context_for_generation = {
        "link": "http://localhost:3000/chat-support", # Link đặt lịch chung/chat với nhân viên
        "address": "59 P. Trần Phú, Điện Biên, Ba Đình, TP. Hà Nội."
    }

    if not gemini_model:
        return json.dumps({'status': 'error', 'type': 'gemini_unavailable', 
                           'message': 'Xin lỗi, trợ lý AI hiện không khả dụng. Bạn có thể liên hệ hotline hoặc thử lại sau.', 
                           'link': context_for_generation["link"]}, ensure_ascii=False)

    gemini_analysis = analyze_input_with_gemini(user_input, conversation_history_frontend)
    # print(f"Phân tích Gemini: {json.dumps(gemini_analysis, ensure_ascii=False, indent=2)}")

    if gemini_analysis.get("error"):
        print(f"Lỗi phân tích Gemini: {gemini_analysis.get('error')}")
        context_for_generation["type"] = "fallback_natural"
        context_for_generation["message_detail"] = f"Lỗi phân tích: '{user_input}'. {gemini_analysis.get('raw_response','')}"
        return json.dumps(generate_natural_response_with_gemini(user_input, context_for_generation, conversation_history_frontend), ensure_ascii=False)

    intent = gemini_analysis.get("intent", "unknown")
    symptoms = gemini_analysis.get("symptoms", [])
    clarification_detail = gemini_analysis.get("clarification_needed_detail")
    is_direct_command = gemini_analysis.get("is_direct_command", False)
    target_specialty_from_analysis = gemini_analysis.get("target_specialty_name")
    
    action_taken = False # Cờ theo dõi nếu một nhánh logic chính đã xử lý

    if is_direct_command:
        context_for_generation["type"] = "direct_command_unsupported"
        action_taken = True
    elif intent in ["greeting", "appointment", "location", "thanks"]:
        context_for_generation["type"] = f"{intent}_natural"
        action_taken = True
    
    elif intent == "user_confirms_details" and target_specialty_from_analysis:
        action_taken = True
        print(f"Người dùng xác nhận xem chi tiết cho chuyên khoa: {target_specialty_from_analysis}")
        api_result = search_service(target_specialty_from_analysis, specialty_mapping)
        api_data = api_result.get('data') or api_result.get('specialties')
        if api_result.get('status') != 'error' and api_data:
            context_for_generation["type"] = "list_specific_services"
            context_for_generation["specialty_name"] = target_specialty_from_analysis
            context_for_generation["services_info"] = api_data
            context_for_generation["services_list_text"] = "\n".join([f"- {s.get('name', 'Dịch vụ')}" for s in api_data[:3]])
            context_for_generation["additional_services_info"] = "... và nhiều hơn." if len(api_data) > 3 else ""
        else:
            context_for_generation["type"] = "symptom_query_no_results_natural" # Fallback nếu không lấy được data
            context_for_generation["symptoms_mentioned"] = [f"dịch vụ cho khoa '{target_specialty_from_analysis}'"]
            
    elif intent == "direct_specialty_request" and target_specialty_from_analysis:
        action_taken = True
        api_result = search_service(target_specialty_from_analysis, specialty_mapping)
        api_data = api_result.get('data') or api_result.get('specialties')
        if api_result.get('status') != 'error' and api_data:
            context_for_generation["type"] = "present_single_specialty_and_ask"
            context_for_generation["specialty_name"] = target_specialty_from_analysis
            context_for_generation["services_info"] = api_data
            context_for_generation["symptom_context"] = f"yêu cầu về khoa {target_specialty_from_analysis}"
            num_s = len(api_data); context_for_generation["services_preview_message"] = f"Có dịch vụ '{api_data[0].get('name')}'." if num_s == 1 else f"Có một số dịch vụ như '{api_data[0].get('name')}'..." if num_s > 1 else ""
        else:
            context_for_generation["type"] = "symptom_query_no_results_natural"
            context_for_generation["symptoms_mentioned"] = [f"thông tin cho '{target_specialty_from_analysis}'"]
            
    elif symptoms or intent in ["symptom_report", "follow_up_clarification"]:
        action_taken = True
        if symptoms:
            best_match = None
            for symp in symptoms:
                match = find_best_symptom_match(symp, specialty_mapping)
                if match and (best_match is None or match.get('score',0) > best_match.get('score',0)):
                    best_match = match
            
            if best_match and best_match.get('specialty'):
                target_spec = best_match['specialty']
                api_res = search_service(target_spec, specialty_mapping)
                api_d = api_res.get('data') or api_res.get('specialties')
                if api_res.get('status') != 'error' and api_d:
                    context_for_generation["type"] = "present_single_specialty_and_ask"
                    context_for_generation["specialty_name"] = target_spec
                    context_for_generation["services_info"] = api_d
                    context_for_generation["symptom_context"] = f"triệu chứng ({', '.join(symptoms)})"
                    num_s = len(api_d); context_for_generation["services_preview_message"] = f"Có dịch vụ '{api_d[0].get('name')}'." if num_s == 1 else f"Có một số dịch vụ như '{api_d[0].get('name')}'..." if num_s > 1 else ""
                else:
                    context_for_generation["type"] = "symptom_query_no_results_natural"
                    context_for_generation["symptoms_mentioned"] = symptoms
            else: # Không khớp mapping, thử tìm API với triệu chứng đầu tiên.
                api_res_raw = search_service(symptoms[0], specialty_mapping)
                api_d_raw = api_res_raw.get('data') or api_res_raw.get('specialties')
                if api_res_raw.get('status') != 'error' and api_d_raw and isinstance(api_d_raw, list):
                    # Nếu API trả về list các chuyên khoa tiềm năng
                    potential_specialties = [item.get("name") for item in api_d_raw if item.get("name") and item.get("name").lower() in [k.lower() for k in specialty_mapping.keys()]]
                    if 1 < len(potential_specialties) <= 3:
                        context_for_generation["type"] = "ask_user_to_select_from_multiple_specialties"
                        context_for_generation["specialty_options"] = list(set(potential_specialties)) # Loại bỏ trùng lặp
                        context_for_generation["symptom_context"] = f"triệu chứng '{symptoms[0]}'"
                        context_for_generation["raw_api_data_for_selection"] = api_d_raw # Gửi kèm để FE có thể dùng ID
                    elif len(potential_specialties) == 1: # Tìm thấy 1 chuyên khoa qua raw search
                        context_for_generation["type"] = "present_single_specialty_and_ask"
                        context_for_generation["specialty_name"] = potential_specialties[0]
                        # Cần lọc services_info cho chuyên khoa này từ api_d_raw
                        # Giả định rằng api_d_raw lúc này chứa các dịch vụ của chuyên khoa đó, hoặc chính chuyên khoa đó là 1 item
                        # Điều này phụ thuộc vào API của bạn. Tạm thời lấy toàn bộ api_d_raw.
                        context_for_generation["services_info"] = api_d_raw
                        context_for_generation["symptom_context"] = f"triệu chứng '{symptoms[0]}'"
                        num_s_raw = len(api_d_raw); context_for_generation["services_preview_message"] = f"Có '{api_d_raw[0].get('name')}'." if num_s_raw == 1 else f"Có một số gợi ý như '{api_d_raw[0].get('name')}'..." if num_s_raw > 1 else ""
                    else: # Quá nhiều hoặc không có chuyên khoa rõ ràng từ raw search
                        context_for_generation["type"] = "symptom_query_no_results_natural"
                        context_for_generation["symptoms_mentioned"] = symptoms
                else: # Raw search cũng lỗi hoặc không có data
                    context_for_generation["type"] = "symptom_query_no_results_natural"
                    context_for_generation["symptoms_mentioned"] = symptoms
        elif clarification_detail: # Không có symptoms mới, nhưng Gemini vẫn muốn làm rõ
             context_for_generation["type"] = "clarification_natural"
             context_for_generation["message_detail"] = clarification_detail
        # else: Không có symptoms, không có clarification -> sẽ rơi vào fallback nếu action_taken vẫn false
             
    elif clarification_detail: # Gemini yêu cầu làm rõ, và không rơi vào các nhánh trên
        context_for_generation["type"] = "clarification_natural"
        context_for_generation["message_detail"] = clarification_detail
        action_taken = True
        
    if not action_taken:
        context_for_generation["type"] = "fallback_natural"
        context_for_generation["message_detail"] = user_input
    
    return json.dumps(generate_natural_response_with_gemini(user_input, context_for_generation, conversation_history_frontend), ensure_ascii=False)

# --- Main để test (ví dụ) ---
if __name__ == '__main__':
    print("Bắt đầu kiểm tra chatbot (phiên bản tối ưu sự ngắn gọn và tập trung hơn)...\n")
    if GEMINI_API_KEY == 'YOUR_API_KEY' or not GEMINI_API_KEY :
        print("!!! CẢNH BÁO: Vui lòng thay thế 'YOUR_API_KEY' bằng API Key Gemini của bạn !!!\n")

    print("\n--- Chế độ tương tác (mô phỏng frontend gửi lịch sử) ---")
    
    test_scripts = {
        "Kịch bản 1: Triệu chứng rõ ràng -> Gợi ý 1 chuyên khoa & hỏi": [
            {"user": "Chào bạn"},
            {"user": "Tôi bị đau đầu vùng thái dương và mờ mắt mấy ngày nay"},
        ],
        "Kịch bản 2: Triệu chứng mơ hồ -> Làm rõ -> Gợi ý 1 chuyên khoa": [
            {"user": "Chào em"},
            {"user": "Dạo này tôi mệt trong người"},
            {"user": "Kiểu không có sức, hay buồn ngủ"},
        ],
        "Kịch bản 3: Yêu cầu chuyên khoa trực tiếp": [
            {"user": "Tôi muốn khám dinh dưỡng"},
        ],
        "Kịch bản 4: Triệu chứng có thể ra nhiều chuyên khoa (test ask_user_to_select)": [
            {"user": "Tôi bị đau bụng và sốt"}, # Đau bụng + sốt có thể nhiều nguyên nhân
        ],
        "Kịch bản 5: Người dùng xác nhận xem dịch vụ (test user_confirms_details)": [
            {"user": "Tôi bị đau lưng"},
            # Bot (giả định): "Dựa trên đau lưng, chuyên khoa Chấn thương chỉnh hình có thể phù hợp... Bạn có muốn xem các dịch vụ...?"
            # Tin nhắn tiếp theo này mô phỏng người dùng đồng ý. `analyze_input_with_gemini` cần bắt được intent "user_confirms_details"
            # và `target_specialty_name` là "Chấn thương chỉnh hình" (Gemini suy luận từ lịch sử).
            {"user": "cho tôi xem dịch vụ của khoa đó"},
        ]
    }

    for script_name, interactions in test_scripts.items():
        print(f"\n\n--- BẮT ĐẦU {script_name.upper()} ---")
        current_simulated_history = []
        for i, interaction_data in enumerate(interactions):
            user_inp = interaction_data["user"]
            print(f"\n--- {script_name} - Lượt {i+1} ---")
            print(f"Người dùng: {user_inp}")
            history_to_send = list(current_simulated_history)
            response_json_str = chatbot_response(user_inp, history_to_send)
            try:
                response_data = json.loads(response_json_str)
                print(f"Bot: {json.dumps(response_data, ensure_ascii=False, indent=2)}")
                current_simulated_history.append({"sender": "user", "text": user_inp})
                if response_data and response_data.get("message"):
                    current_simulated_history.append({
                        "sender": "bot", 
                        "text": response_data["message"],
                        "type": response_data.get("type"), 
                        "specialties_offered": response_data.get("specialties") 
                    })
                if len(current_simulated_history) > 6: 
                    current_simulated_history = current_simulated_history[-6:]
            except Exception as ex:
                print(f"Bot (lỗi): {str(ex)}\nJSON rå: {response_json_str}")
            print("-" * 50)
        print(f"--- KẾT THÚC {script_name.upper()} ---\n")

    print("\n--- Chế độ nhập tự do (gõ 'quit' để thoát) ---")
    simulated_history_manual = []
    while True:
        user_message = input("Bạn: ")
        if user_message.lower() == 'quit': break
        bot_reply_json_str = chatbot_response(user_message, simulated_history_manual)
        try:
            bot_reply_data = json.loads(bot_reply_json_str)
            print(f"Chatbot: {json.dumps(bot_reply_data, ensure_ascii=False, indent=2)}")
            simulated_history_manual.append({"sender": "user", "text": user_message})
            if bot_reply_data and bot_reply_data.get("message"):
                 simulated_history_manual.append({
                     "sender": "bot", 
                     "text": bot_reply_data["message"],
                     "type": bot_reply_data.get("type"),
                     "specialties_offered": bot_reply_data.get("specialties")
                 })
            if len(simulated_history_manual) > 6:
                simulated_history_manual = simulated_history_manual[-6:]
        except Exception as ex:
            print(f"Chatbot (lỗi xử lý): {str(ex)}\nJSON rå: {bot_reply_json_str}")