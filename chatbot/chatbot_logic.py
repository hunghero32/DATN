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
API_URL = "https://quickcare.asia/api/client/services/search"

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
    'vật lý trị liệu': [
        'đau lưng', 'đau khớp', 'đau cổ', 'đau vai', 'thoái hóa', 'viêm khớp', 
        'đau xương', 'đau cột sống', 'đau tay', 'đau chân', 'đau khớp gối',
        'gãy xương', 'viêm cột sống', 'loãng xương', 'teo cơ', 'đau thần kinh tọa',
        'đau gót chân', 'đau khuỷu tay', 'chấn thương thể thao', 'bong gân',
        'thoát vị đĩa đệm', 'cong vẹo cột sống', 'viêm bao hoạt dịch', 'trật khớp',
        'đau hông', 'đau cơ', 'cứng khớp buổi sáng', 'viêm gân', 'hội chứng ống cổ tay',
        'đau khớp háng', 'chân không đều', 'đau bàn chân', 'đau mắt cá chân'
    ],
    'tiêu hóa': [
        'đau bụng', 'buồn nôn', 'khó tiêu', 'trào ngược', 'đau dạ dày', 'nôn', 'ói',
        'đầy hơi', 'táo bón', 'tiêu chảy', 'đại tiện ra máu', 'ợ nóng', 'viêm dạ dày',
        'loét dạ dày', 'viêm ruột', 'ruột kích thích', 'rối loạn tiêu hóa', 'khó nuốt',
        'đau vùng gan', 'sỏi mật', 'viêm gan', 'vàng da', 'chán ăn', 'đau thượng vị',
        'viêm đại tràng', 'trĩ', 'nứt kẽ hậu môn', 'đau quanh rốn', 'sình bụng',
        'hội chứng Dumping', 'viêm túi mật', 'ăn không tiêu', 'đau ruột thừa'
    ],
    'tai mũi họng': [
        'đau họng', 'viêm họng', 'ho', 'sổ mũi', 'nghẹt mũi', 'khó thở',
        'viêm xoang', 'viêm amidan', 'viêm tai giữa', 'ù tai', 'mất tiếng',
        'ngứa họng', 'dị ứng mũi', 'chảy máu cam', 'ngứa tai', 'ngáy khi ngủ',
        'đau tai', 'nghe kém', 'viêm tai ngoài', 'chảy mủ tai', 'viêm họng hạt',
        'hôi miệng', 'viêm mũi dị ứng', 'polyp mũi', 'khàn tiếng', 'đau đầu do xoang',
        'mất khứu giác', 'nuốt đau', 'ngứa mũi', 'viêm thanh quản'
    ],
    'thần kinh': [
        'đau đầu', 'chóng mặt', 'hoa mắt', 'mất ngủ', 'đau nửa đầu', 'váng đầu',
        'co giật', 'tê tay chân', 'run tay', 'rối loạn giấc ngủ', 'lo âu',
        'rối loạn trí nhớ', 'mất thăng bằng', 'rối loạn tiền đình', 'mất tập trung',
        'trầm cảm', 'mệt mỏi kéo dài', 'stress', 'đột quỵ', 'đau dây thần kinh',
        'liệt mặt', 'động kinh', 'hội chứng Parkinson', 'rối loạn vận động', 'mộng du',
        'ngủ ngáy', 'hội chứng chân không yên', 'suy nhược thần kinh', 'đau cổ gáy'
    ],
    'hô hấp': [
        'ho khan', 'ho có đờm', 'khó thở', 'thở khò khè', 'viêm phổi', 'viêm phế quản',
        'hen suyễn', 'ho ra máu', 'đau ngực khi thở', 'suy hô hấp', 'ngứa họng',
        'thở nhanh', 'viêm thanh quản', 'tràn dịch màng phổi', 'lao phổi', 'tắc nghẽn phổi',
        'viêm tiểu phế quản', 'khó thở khi nằm', 'ngưng thở khi ngủ', 'đau phổi',
        'viêm màng phổi', 'xơ phổi', 'ho lâu ngày', 'thở nông'
    ],
    'da liễu': [
        'ngứa da', 'nổi mẩn đỏ', 'mụn', 'viêm da', 'nấm da', 'mụn nước', 'rôm sảy',
        'rụng tóc', 'mụn trứng cá', 'mụn cóc', 'viêm nang lông', 'chàm', 'bệnh vẩy nến',
        'da bong tróc', 'da khô', 'sạm da', 'da nổi mụn ngứa', 'dị ứng da', 'mề đay',
        'zona thần kinh', 'nám da', 'tàn nhang', 'mụn đầu đen', 'lở loét da', 'áp xe da',
        'da dầu', 'hắc lào', 'ghẻ', 'lang ben', 'viêm da cơ địa', 'sẹo lồi'
    ],
    'tim mạch': [
        'đau ngực', 'hồi hộp', 'đánh trống ngực', 'cao huyết áp', 'huyết áp thấp',
        'khó thở khi gắng sức', 'phù chân', 'tim đập nhanh', 'mệt khi leo cầu thang',
        'đau thắt ngực', 'choáng váng khi đứng dậy', 'ngất xỉu', 'tim đập không đều',
        'suy tim', 'rối loạn nhịp tim', 'hở van tim', 'tắc mạch vành', 'xơ vữa động mạch',
        'đau lan vai trái', 'mạch yếu', 'chân lạnh', 'đau tim khi nghỉ', 'tăng lipid máu'
    ],
    'nội tiết': [
        'mệt mỏi', 'tăng cân', 'giảm cân không rõ lý do', 'rối loạn kinh nguyệt',
        'đổ mồ hôi nhiều', 'run tay chân', 'khát nước nhiều', 'tiểu đêm', 'rụng tóc',
        'thay đổi tâm trạng', 'da khô', 'bướu cổ', 'đái tháo đường', 'rối loạn hormone',
        'suy giáp', 'cường giáp', 'tiểu nhiều', 'đói liên tục', 'suy tuyến thượng thận',
        'tê bì chân tay', 'hội chứng Cushing', 'vô sinh', 'loãng xương do nội tiết',
        'dậy thì sớm', 'mãn kinh sớm', 'suy tuyến yên', 'tăng prolactin', 'bệnh Basedow',
        'khô miệng', 'tuyến giáp phì đại', 'hội chứng buồng trứng đa nang', 'suy sinh dục'
    ],
    'nhi khoa': [
        'sốt', 'ho', 'sổ mũi', 'tiêu chảy', 'táo bón', 'nôn trớ', 'chán ăn',
        'phát ban', 'khóc đêm', 'đau bụng', 'viêm phổi', 'hen suyễn', 'viêm tai giữa',
        'chậm phát triển', 'co giật do sốt', 'vàng da sơ sinh', 'rối loạn tiêu hóa',
        'dị ứng sữa', 'sốt xuất huyết', 'viêm màng não', 'bệnh tay chân miệng',
        'đái dầm', 'chậm nói', 'tăng động giảm chú ý', 'còi xương', 'suy dinh dưỡng'
    ],
    'mắt': [
        'mờ mắt', 'nhìn đôi', 'đau mắt', 'chảy nước mắt', 'ngứa mắt', 'khô mắt',
        'đỏ mắt', 'cộm mắt', 'giảm thị lực', 'chói sáng', 'đục thủy tinh thể',
        'tăng nhãn áp', 'viêm kết mạc', 'lác mắt', 'mộng thịt', 'viêm bờ mi',
        'quáng gà', 'thoái hóa điểm vàng', 'bong võng mạc', 'nháy mắt liên tục',
        'mắt lé', 'nhìn thấy ruồi bay', 'viêm giác mạc', 'sụp mí mắt'
    ],
    'sản phụ khoa': [
        'đau bụng dưới', 'rối loạn kinh nguyệt', 'rong kinh', 'đau khi hành kinh',
        'khí hư bất thường', 'ngứa vùng kín', 'đau khi quan hệ', 'vô kinh',
        'u nang buồng trứng', 'u xơ tử cung', 'sa tử cung', 'viêm âm đạo',
        'thai ngoài tử cung', 'sảy thai', 'hiếm muộn', 'đau vú', 'tiết sữa bất thường',
        'viêm cổ tử cung', 'tắc tia sữa', 'kinh nguyệt không đều', 'mãn kinh',
        'chửa trứng', 'nhiễm trùng sau sinh', 'tăng huyết áp thai kỳ', 'tiền sản giật'
    ],
    'tiết niệu': [
        'tiểu buốt', 'tiểu rắt', 'tiểu đêm', 'tiểu máu', 'đau vùng thận',
        'sỏi thận', 'viêm bàng quang', 'tiểu không kiểm soát', 'hẹp niệu đạo',
        'viêm niệu đạo', 'sỏi niệu quản', 'đau lưng dưới', 'nước tiểu đục',
        'bí tiểu', 'viêm tuyến tiền liệt', 'phì đại tuyến tiền liệt', 'ung thư bàng quang',
        'đau vùng bẹn', 'nhiễm trùng đường tiết niệu', 'túi thừa bàng quang', 'suy thận'
    ],
    'huyết học': [
        'thiếu máu', 'mệt mỏi', 'da xanh xao', 'chóng mặt', 'xuất huyết dưới da',
        'chảy máu kéo dài', 'sốt không rõ nguyên nhân', 'nổi hạch', 'đau xương',
        'thiếu máu hồng cầu liềm', 'bệnh bạch cầu', 'suy tủy', 'rối loạn đông máu',
        'tăng bạch cầu', 'giảm tiểu cầu', 'hội chứng myelodysplastic', 'đông máu bất thường',
        'thiếu máu tán huyết', 'bệnh thalassemia', 'sưng hạch bạch huyết', 'sốt tái phát'
    ],
    'tâm thần học': [
        'lo âu', 'trầm cảm', 'mất ngủ', 'stress', 'rối loạn cảm xúc', 'hoang tưởng',
        'ảo giác', 'sợ hãi vô lý', 'nghiện chất', 'rối loạn ăn uống', 'tự kỷ',
        'tăng động giảm chú ý', 'rối loạn nhân cách', 'suy nghĩ tiêu cực', 'hành vi bất thường',
        'mộng du', 'ám ảnh cưỡng chế', 'rối loạn lưỡng cực', 'tự làm hại bản thân',
        'mất kiểm soát cảm xúc', 'rối loạn tâm thần sau sinh', 'nghiện game', 'sợ xã hội'
    ],
    'răng hàm mặt': [
        'đau răng', 'sâu răng', 'ê buốt răng', 'chảy máu chân răng', 'hôi miệng',
        'viêm nướu', 'viêm lợi', 'răng lung lay', 'mất răng', 'răng mẻ', 'răng xỉn màu',
        'răng lệch lạc', 'sưng lợi', 'áp xe răng', 'viêm tủy răng', 'đau hàm',
        'khớp thái dương hàm kêu lục cục', 'răng nhạy cảm với nóng lạnh', 'tụt lợi',
        'mảng bám răng', 'cao răng', 'nứt răng', 'răng khôn mọc lệch', 'viêm quanh răng',
        'sưng má do răng', 'đau khi nhai', 'hơi thở có mùi', 'răng giả lỏng',
        'viêm niêm mạc miệng', 'loét miệng', 'nấm miệng', 'chấn thương răng'
    ],
    'siêu âm thai': [
        'kiểm tra thai', 'theo dõi thai kỳ', 'đau bụng khi mang thai', 'ra máu khi mang thai',
        'thai chậm phát triển', 'đa ối', 'thiếu ối', 'thai ngoài tử cung', 'dọa sảy thai',
        'kiểm tra dị tật thai', 'tim thai yếu', 'thai lưu', 'vỡ ối sớm', 'ngôi thai ngược',
        'rau bong non', 'rau tiền đạo', 'kiểm tra giới tính thai', 'đo độ mờ da gáy',
        'siêu âm 4D', 'kiểm tra nước ối', 'đau vùng chậu khi mang thai', 'chuyển dạ giả',
        'kiểm tra trọng lượng thai', 'đo chiều dài cổ tử cung', 'theo dõi nhịp tim thai'
    ],
    'bệnh viêm gan': [
        'vàng da', 'vàng mắt', 'mệt mỏi', 'chán ăn', 'đau vùng gan', 'nước tiểu sẫm màu',
        'phân nhạt màu', 'buồn nôn', 'nôn', 'sốt nhẹ', 'đau bụng trên', 'viêm gan A',
        'viêm gan B', 'viêm gan C', 'xơ gan', 'gan to', 'lá lách to', 'đau khớp do viêm gan',
        'ngứa da do gan', 'suy gan', 'tăng men gan', 'viêm gan mạn', 'viêm gan tự miễn',
        'sỏi mật do viêm gan', 'ung thư gan', 'viêm gan do rượu', 'viêm gan do thuốc'
    ],
    'cột sống': [
        'đau cột sống', 'đau lưng dưới', 'đau cổ', 'thoát vị đĩa đệm', 'cong vẹo cột sống',
        'đau thần kinh tọa', 'thoái hóa cột sống', 'viêm cột sống dính khớp', 'gù lưng',
        'đau lưng khi cúi', 'đau lan xuống chân', 'tê bì chân tay', 'cứng cổ', 'đau giữa lưng',
        'chấn thương cột sống', 'trượt đốt sống', 'hẹp ống sống', 'đau lưng khi đứng lâu',
        'đau lưng khi ngồi lâu', 'gãy xương cột sống', 'viêm khớp cùng chậu', 'đau vùng thắt lưng',
        'đau do lệch cột sống', 'đau lưng mãn tính', 'rối loạn tư thế'
    ],
    'nội khoa': [
        'sốt không rõ nguyên nhân', 'mệt mỏi kéo dài', 'đau ngực', 'khó thở', 'tăng huyết áp',
        'huyết áp thấp', 'đau bụng không rõ lý do', 'giảm cân bất thường', 'tăng cân bất thường',
        'suy nhược cơ thể', 'đau đầu mãn tính', 'chóng mặt', 'tiêu chảy kéo dài', 'táo bón lâu ngày',
        'đầy hơi', 'chán ăn', 'sốt kéo dài', 'Đau khớp không rõ nguyên nhân', 'phù toàn thân',
        'da xanh xao', 'tim đập nhanh', 'rối loạn tiêu hóa không rõ lý do', 'mất ngủ kéo dài',
        'nhiễm trùng tái phát', 'suy giảm miễn dịch', 'bệnh mãn tính không xác định'
    ],
    'truyền nhiễm': [
        'sốt cao', 'phát ban', 'ho kéo dài', 'sốt xuất huyết', 'viêm màng não', 'lao phổi',
        'sốt rét', 'bệnh tay chân miệng', 'sởi', 'thủy đậu', 'quai bị', 'viêm gan truyền nhiễm',
        'nhiễm trùng huyết', 'bệnh do vi khuẩn', 'bệnh do virus', 'sốt do ký sinh trùng',
        'tiêu chảy cấp', 'nhiễm HIV', 'bệnh lậu', 'giang mai', 'nhiễm trùng da lan rộng',
        'sốt lâu ngày', 'viêm phổi do virus', 'bệnh zona', 'nhiễm trùng đường ruột', 'bệnh leptospirosis'
    ],
    'chuyên khoa vú': [
        'đau vú', 'sưng vú', 'khối u ở vú', 'tiết dịch núm vú', 'nổi hạch nách',
        'đau tứcđổi màu da vú', 'viêm vú', 'u nang vú', 'u xơ vú', 'ung thư vú',
        'tắc tia sữa', 'áp xe vú', 'đau khi cho con bú', 'núm vú thụt vào', 'vú to bất thường',
        'đau vú khi hành kinh', 'sưng đỏ vú', 'khối u lành tính ở vú', 'viêm tuyến vú',
        'nứt đầu vú', 'rối loạn hormone vú', 'vú phụ', 'đau lan từ vú đến nách'
    ],
    'ung bướu': [
        'khối u không rõ nguyên nhân', 'giảm cân bất thường', 'mệt mỏi kéo dài', 'sốt không rõ lý do',
        'đau xương', 'nổi hạch bất thường', 'ho ra máu', 'tiêu chảy ra máu', 'đại tiện ra máu',
        'ung thư phổi', 'ung thư gan', 'ung thư vú', 'ung thư đại tràng', 'ung thư dạ dày',
        'ung thư cổ tử cung', 'ung thư tuyến giáp', 'ung thư máu', 'ung thư xương', 'ung thư da',
        'đau bụng không rõ lý do', 'chán ăn', 'sờ thấy khối u', 'vết loét lâu lành', 'chảy máu bất thường'
    ],
    'tiểu đường - nội tiết': [
        'khát nước nhiều', 'tiểu nhiều', 'đói liên tục', 'mệt mỏi', 'tê bì chân tay',
        'đái tháo đường type 1', 'đái tháo đường type 2', 'hạ đường huyết', 'tăng đường huyết',
        'vết thương lâu lành', 'nhiễm trùng tái phát', 'giảm cân không rõ lý do', 'mờ mắt do tiểu đường',
        'tổn thương thần kinh do tiểu đường', 'bệnh thận do tiểu đường', 'tăng ceton máu',
        'rối loạn lipid máu', 'biến chứng tim mạch do tiểu đường', 'bàn chân tiểu đường',
        'đái tháo đường thai kỳ', 'khô miệng', 'da khô do tiểu đường', 'tăng đường huyết mãn tính'
    ]

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
        
        # Greeting detection
        greeting_keywords = ['xin chào', 'chào', 'hello', 'hi', 'chào bạn', 'chào bác sĩ']
        if any(greet in user_input for greet in greeting_keywords):
            return json.dumps({
                'status': 'success',
                'type': 'greeting',
                'message': 'Xin chào! Tôi là trợ lý sức khỏe của bạn. Bạn đang cảm thấy thế nào? Hãy mô tả triệu chứng hoặc câu hỏi của bạn để tôi có thể hỗ trợ nhé!'
            })

        # Check for appointment-related queries first
        appointment_keywords = [
            'đặt lịch', 'đặt khám', 'hẹn khám', 'lịch khám', 'đăng ký khám',
            'làm sao để đặt', 'cách đặt', 'quy trình đặt', 'muốn đặt', 'như thế nào để đặt',
            'thủ tục đặt', 'hướng dẫn đặt', 'đăng ký như thế nào', 'đặt khám như nào',
            'đặt lịch ra sao', 'đặt khám thế nào', 'quy trình khám', 'cần hỗ trợ đặt lịch', 'hỗ trợ đặt lịch'
        ]
        if any(keyword in user_input for keyword in appointment_keywords):
            return json.dumps({
                'status': 'success',
                'type': 'appointment',
                'message': 'Bạn muốn đặt lịch khám? Vui lòng nhấn vào nút bên dưới để được hỗ trợ đặt lịch trực tuyến.',
                'link': 'https://quickcare.asia/chat-support'
            })

        # Check for location-related queries first
        location_keywords = ['ở đâu', 'địa chỉ', 'địa điểm', 'phòng khám', 'bệnh viện', 'chỗ nào']
        if any(keyword in user_input for keyword in location_keywords):
            return json.dumps({
                'status': 'success',
                'type': 'location',
                'message': 'Các cơ sở y tế của chúng tôi đều tọa lạc tại : 59 P. Trần Phú, Điện Biên, Ba Đình, TP. Hà Nội. '
            })
        
        stop_words = ['tôi', 'bị', 'là', 'có', 'và', 'rất', 'cảm', 'thấy', 'đang', 'quá', 'căng', 'dịch', 'vụ']
        filtered_text = ' '.join([t for t in tokens if t not in stop_words])
        
        if not filtered_text:
            return json.dumps({
                'status': 'error',
                'message': 'Vui lòng mô tả rõ hơn về triệu chứng của bạn'
            })
        
        match_result = find_best_symptom_match(filtered_text)
        
        if match_result and isinstance(match_result, dict) and match_result.get('type') == 'location':
            return json.dumps({
                'status': 'success',
                'message': match_result['message'],
                'type': 'location'
            })
        
        # Continue with symptom matching if not a location query
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
        # Nếu không có chuyên khoa phù hợp
        if (
            isinstance(result, dict)
            and (
                (result.get('specialties') is not None and len(result.get('specialties', [])) == 0)
                or (result.get('status') == 'error')
            )
        ):
            return json.dumps({
                'status': 'success',
                'type': 'no_specialty',
                'message': 'Tôi không tìm thấy chuyên khoa nào phù hợp với triệu chứng của bạn. Bạn có thể nhấn vào nút bên dưới để được hỗ trợ trực tuyến.',
                'link': 'https://quickcare.asia/chat-support'
            })
        return json.dumps(result)

    except Exception as e:
        print(f"Error in chatbot_response: {str(e)}")
        return json.dumps({
            'status': 'error',
            'message': f'Có lỗi xảy ra: {str(e)}'
        })