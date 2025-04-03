import requests
import nltk
import json
import os
import base64
from nltk.tokenize import word_tokenize
from fuzzywuzzy import fuzz

# Đảm bảo console hỗ trợ UTF-8 (tránh lỗi UnicodeEncodeError)
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Tải dữ liệu punkt cho NLTK
nltk.download('punkt', quiet=True)

# URL API của Laravel
API_URL = "http://localhost:8000/api/client/services/search"

# File để lưu trữ các triệu chứng đã học
LEARNING_FILE = 'learned_symptoms.json'

# Load hoặc tạo file learned symptoms
def load_learned_symptoms():
    if os.path.exists(LEARNING_FILE):
        with open(LEARNING_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

# Lưu learned symptoms
def save_learned_symptoms(learned_data):
    with open(LEARNING_FILE, 'w', encoding='utf-8') as f:
        json.dump(learned_data, f, ensure_ascii=False, indent=2)

learned_symptoms = load_learned_symptoms()

# Symptom mapping với các biến thể
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

# Specialty mapping
specialty_mapping = {
    'cơ xương khớp': ['đau lưng', 'đau khớp', 'đau cổ', 'đau vai', 'thoái hóa', 'viêm khớp', 
                      'đau xương', 'đau cột sống', 'đau tay', 'đau chân', 'đau khớp gối'],
    'tiêu hóa': ['đau bụng', 'buồn nôn', 'khó tiêu', 'trào ngược', 'đau dạ dày', 'nôn', 'ói'],
    'tai mũi họng': ['đau họng', 'viêm họng', 'ho', 'sổ mũi', 'nghẹt mũi', 'khó thở'],
    'thần kinh': ['đau đầu', 'chóng mặt', 'hoa mắt', 'mất ngủ', 'đau nửa đầu', 'váng đầu']
}

def find_best_symptom_match(text):
    text = text.lower()
    
    # Kiểm tra khớp chính xác trước
    for specialty, symptoms in specialty_mapping.items():
        for symptom in symptoms:
            if symptom in text:
                return {'symptom': symptom, 'specialty': specialty}
    
    # Dùng fuzzy matching nếu không khớp chính xác
    best_match = None
    best_score = 0
    for specialty, symptoms in specialty_mapping.items():
        for symptom in symptoms:
            score = fuzz.token_set_ratio(text, symptom)
            if score > best_score and score > 80:  # Ngưỡng 80 để nhạy hơn
                best_score = score
                best_match = {'symptom': symptom, 'specialty': specialty}
    
    return best_match

def search_service(keyword):
    try:
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        # Mã hóa keyword sang base64
        keyword_bytes = keyword.encode('utf-8')
        encoded_keyword = base64.b64encode(keyword_bytes).decode('utf-8')
        
        params = {'keyword': encoded_keyword, 'type': 'symptom'}
        
        response = requests.get(API_URL, params=params, headers=headers)
        
        if response.status_code != 200:
            print(f"API Error: Status {response.status_code}, Response: {response.text}")
            return {
                'status': 'error',
                'message': 'Không thể kết nối với server Laravel.'
            }
            
        data = response.json()
        return data
        
    except requests.exceptions.RequestException as e:
        print(f"API Request Error: {str(e)}")
        return {
            'status': 'error',
            'message': 'Không thể kết nối với server Laravel.'
        }
    except Exception as e:
        print(f"General Error in search_service: {str(e)}")
        return {
            'status': 'error',
            'message': 'Có lỗi xảy ra khi xử lý yêu cầu.'
        }

def chatbot_response(user_input):
    try:
        user_input = user_input.lower()
        tokens = word_tokenize(user_input)
        
        stop_words = ['tôi', 'bị', 'là', 'có', 'và', 'rất', 'cảm', 'thấy', 'đang', 'quá', 'căng', 'dịch', 'vụ']
        filtered_text = ' '.join([t for t in tokens if t not in stop_words])
        
        if not filtered_text:
            return json.dumps({
                'status': 'error',
                'message': 'Vui lòng mô tả rõ hơn về triệu chứng của bạn'
            })
        
        match_result = find_best_symptom_match(filtered_text)
        
        if match_result:
            print(f"Phát hiện triệu chứng: {match_result['symptom']} -> Chuyên khoa: {match_result['specialty']}")
            result = search_service(match_result['specialty'])
            return json.dumps(result)
        
        # Fallback: Dùng fuzzy matching với symptom_mapping nếu không khớp trực tiếp
        for main_symptom, variations in symptom_mapping.items():
            for variation in variations:
                if fuzz.token_set_ratio(filtered_text, variation) > 80:
                    # Tìm chuyên khoa tương ứng
                    for specialty, symptoms in specialty_mapping.items():
                        if main_symptom in symptoms:
                            print(f"Fuzzy match - Triệu chứng: {main_symptom} -> Chuyên khoa: {specialty}")
                            result = search_service(specialty)
                            return json.dumps(result)
        
        # Nếu vẫn không khớp, gửi filtered_text làm từ khóa cuối cùng
        print(f"No match found, searching with filtered text: {filtered_text}")
        result = search_service(filtered_text)
        return json.dumps(result)

    except Exception as e:
        print(f"Error in chatbot_response: {str(e)}")
        return json.dumps({
            'status': 'error',
            'message': f'Có lỗi xảy ra: {str(e)}'
        })