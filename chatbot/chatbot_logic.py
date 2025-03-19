import requests
import nltk
import json
import os
from nltk.tokenize import word_tokenize
from fuzzywuzzy import fuzz
from difflib import get_close_matches
from cryptography.fernet import Fernet
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

nltk.download('punkt')

# URL API của Laravel
API_URL = "http://localhost:8000/api/client/services/search"

# File to store learned symptoms
LEARNING_FILE = 'learned_symptoms.json'

# Load or create learned symptoms
def load_learned_symptoms():
    if os.path.exists(LEARNING_FILE):
        with open(LEARNING_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

# Save learned symptoms
def save_learned_symptoms(learned_data):
    with open(LEARNING_FILE, 'w', encoding='utf-8') as f:
        json.dump(learned_data, f, ensure_ascii=False, indent=2)

# Initialize learned data
learned_symptoms = load_learned_symptoms()

# Expanded symptom dictionary with variations
symptom_mapping = {
    'đau': ['đau', 'nhức', 'buốt', 'đớn'],
    'sốt': ['sốt', 'nóng', 'nóng người'],
    'ho': ['ho', 'khò khè', 'ho khan'],
    'mệt': ['mệt', 'mệt mỏi', 'uể oải', 'không khỏe'],
    'chóng mặt': ['chóng mặt', 'choáng', 'váng đầu', 'quay cuồng'],
    'khó thở': ['khó thở', 'ngộp', 'thở gấp'],
    'buồn nôn': ['buồn nôn', 'nôn', 'ói'],
}

def learn_new_symptom(user_input, service_name):
    """Learn new symptom-service associations"""
    if service_name and user_input:
        learned_symptoms[user_input.lower()] = service_name
        save_learned_symptoms(learned_symptoms)
        print(f"Learned: '{user_input}' -> '{service_name}'")

# Update symptom mapping with compound symptoms
# First, remove the duplicate symptom_mapping and keep only the compound version
symptom_mapping = {
    'đau đầu': ['đau đầu', 'nhức đầu', 'đầu đau', 'đầu nhức'],
    'đau lưng': ['đau lưng', 'nhức lưng', 'lưng đau', 'lưng nhức'],
    'đau bụng': ['đau bụng', 'nhức bụng', 'bụng đau', 'bụng nhức'],
    'đau răng': ['đau răng', 'nhức răng', 'răng đau', 'răng nhức'],
    'đau họng': ['đau họng', 'viêm họng', 'họng đau', 'họng nhức'],
    'sốt': ['sốt', 'nóng', 'nóng người', 'sốt cao'],
    'ho': ['ho', 'khò khè', 'ho khan', 'ho có đờm'],
    'mệt': ['mệt', 'mệt mỏi', 'uể oải', 'không khỏe'],
    'chóng mặt': ['chóng mặt', 'choáng', 'váng đầu', 'quay cuồng'],
    'khó thở': ['khó thở', 'ngộp', 'thở gấp', 'tức ngực'],
    'buồn nôn': ['buồn nôn', 'nôn', 'ói', 'buồn ói']
}

def find_best_symptom_match(text):
    # First check for exact matches in compound symptoms
    for main_symptom, variations in symptom_mapping.items():
        # Check if the entire text matches any variation
        if text in variations or any(v in text for v in variations):
            return main_symptom
            
    # If no exact match, try fuzzy matching
    best_match = None
    best_score = 0
    
    for main_symptom, variations in symptom_mapping.items():
        for variation in variations:
            # Use token_set_ratio for better partial matching
            score = fuzz.token_set_ratio(text, variation)
            if score > best_score and score > 85:  # Increased threshold for better accuracy
                best_score = score
                best_match = main_symptom
                
    return best_match

def chatbot_response(user_input):
    user_input = user_input.lower()
    
    # Remove stop words first
    tokens = word_tokenize(user_input)
    stop_words = ['tôi', 'bị', 'là', 'có', 'và', 'rất', 'cảm', 'thấy', 'đang', 'quá']
    filtered_text = ' '.join([t for t in tokens if t not in stop_words])
    
    # Try to find matching symptom
    best_match = find_best_symptom_match(filtered_text)
    
    if best_match:
        print(f"Phát hiện triệu chứng: {best_match}")  # Debug
        response = search_service(best_match)
        
        # Learn new variations if service is found
        if "Tôi tìm thấy các dịch vụ phù hợp" in response:
            learn_new_symptom(filtered_text, best_match)
        
        return response
    
    # If no match found, use the filtered text
    return search_service(filtered_text)

# Encryption key setup
SECRET_KEY = "your-secret-key-here"  # Must match Laravel's key
salt = b'your-salt-here'  # Must match Laravel's salt

def generate_key():
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
    )
    key = base64.urlsafe_b64encode(kdf.derive(SECRET_KEY.encode()))
    return Fernet(key)

cipher_suite = generate_key()

def encrypt_data(data):
    return cipher_suite.encrypt(data.encode()).decode()

def decrypt_data(encrypted_data):
    return cipher_suite.decrypt(encrypted_data.encode()).decode()

def search_service(keyword):
    try:
        # Encrypt the keyword before sending
        encrypted_keyword = encrypt_data(keyword)
        
        # Set up headers and parameters
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        params = {'keyword': encrypted_keyword}
        
        # Make the request
        response = requests.get(API_URL, params=params, headers=headers)
        print(f"Đã gửi yêu cầu tới: {response.url}")  # Debug URL
        print(f"Trạng thái HTTP: {response.status_code}")  # Debug trạng thái
        
        if response.status_code == 200:
            # Decrypt the response data if it's encrypted
            encrypted_data = response.json().get('encrypted_data')
            if encrypted_data:
                decrypted_data = decrypt_data(encrypted_data)
                data = json.loads(decrypted_data)
            else:
                data = response.json()
                
            services = data.get('services', [])
            if services:
                result = "Tôi tìm thấy các dịch vụ phù hợp:\n"
                for service in services:
                    result += f"- {service['services_name']} (Giá: {service['price']} VND, Thời gian: {service['duration']} phút)\n"
                return result
            else:
                return "Không tìm thấy dịch vụ nào phù hợp với từ khóa này."
        else:
            return f"Lỗi từ server: {response.status_code} - {response.text}"
    except Exception as e:
        return f"Có lỗi khi kết nối đến API: {str(e)}"

# Hàm xử lý câu hỏi của người dùng
# Update the symptom_keywords list
symptom_keywords = ['đau', 'bị', 'sốt', 'ho', 'mệt', 'nóng', 'lạnh', 'nhức', 'buồn', 'chóng', 'khó']

# Update the chatbot_response function
def chatbot_response(user_input):
    user_input = user_input.lower()
    tokens = word_tokenize(user_input)
    
    # Remove stop words
    stop_words = ['tôi', 'bị', 'là', 'có', 'và', 'rất', 'cảm', 'thấy']
    filtered_tokens = [t for t in tokens if t not in stop_words]
    
    if not filtered_tokens:
        return "Vui lòng mô tả rõ hơn về triệu chứng của bạn"
    
    # Try to find matching symptom
    keyword = " ".join(filtered_tokens)
    best_match = find_best_symptom_match(keyword)
    
    if best_match:
        response = search_service(best_match)
        
        # If service found, learn the association
        if "Tôi tìm thấy các dịch vụ phù hợp" in response:
            learn_new_symptom(keyword, best_match)
        
        return response
    
    # If no match found, try the original input
    return search_service(keyword)

# Vòng lặp giao tiếp
print("Chào bạn! Tôi là chatbot sức khỏe. Bạn đang cảm thấy thế nào?")
while True:
    try:
        user_input = input("Bạn: ")
        if user_input.lower() == "thoát":
            print("Tạm biệt!")
            break
        response = chatbot_response(user_input)
        print("Chatbot: " + response)
    except KeyboardInterrupt:
        print("\nTạm biệt!")
        break
    except Exception as e:
        print(f"Chatbot: Có lỗi xảy ra: {str(e)}")