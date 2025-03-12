# Booking API Documentation

## 1. Lấy danh sách đặt lịch
### Endpoint
```
GET /api/bookings
```
### Mô tả
Trả về danh sách các đặt lịch, có thể tìm kiếm và lọc theo nhiều tiêu chí.

### Tham số yêu cầu
| Tên       | Kiểu dữ liệu | Mô tả |
|-----------|-------------|------|
| search    | string      | Tìm kiếm theo tên, số điện thoại, email của khách hàng |
| gender    | string      | Lọc theo giới tính (`male`, `female`, `other`) |
| age       | integer     | Lọc theo độ tuổi của khách hàng |
| specialty | string      | Lọc theo chuyên khoa của dịch vụ |
| status    | string      | Lọc theo trạng thái (`confirmed`, `completed` - chỉ áp dụng cho bác sĩ) |
| page      | integer     | Số trang hiện tại (phân trang, mặc định 10 bản ghi/trang) |

### Scope tìm kiếm và lọc dữ liệu
#### 1. Tìm kiếm theo khách hàng (Tên, SĐT, Email)
- **searchGuest($search)**: Tìm kiếm các đặt lịch có khách hàng có tên, số điện thoại hoặc email chứa `$search`.

#### 2. Lọc theo giới tính khách hàng
- **filterGender($gender)**: Lọc các đặt lịch theo giới tính khách hàng (`male`, `female`, `other`).

#### 3. Lọc theo độ tuổi khách hàng
- **filterAge($age)**: Lọc các đặt lịch có khách hàng có tuổi đúng bằng `$age`.

#### 4. Lọc theo chuyên khoa dịch vụ
- **filterSpecialty($specialty)**: Lọc các đặt lịch có dịch vụ thuộc chuyên khoa chứa `$specialty`.

#### 5. Lọc danh sách bệnh nhân theo trạng thái
- **filterDoctorConfirmed()**: Lọc danh sách bệnh nhân đã được bác sĩ xác nhận (`status = confirmed`).
- **filterDoctorCompleted()**: Lọc danh sách bệnh nhân đã hoàn thành khám bệnh (`status = completed`).

### Response
#### Thành công (200 OK)
```json
{
    "data": [
        {
            "id": 1,
            "doctor": { "id": 5, "name": "Dr. John Doe" },
            "service": { "id": 10, "name": "Khám tổng quát" },
            "guest": { "id": 20, "name": "Nguyễn Văn A", "phone": "0123456789", "email": "a@example.com" },
            "booking_date": "2025-03-10",
            "booking_time": "14:00",
            "status": "confirmed"
        }
    ]
}
```
#### Không tìm thấy kết quả phù hợp (200 OK)
```json
{
    "message": "Không tìm thấy thông tin đặt lịch phù hợp.",
    "data": []
}
```

---

## 2. Cập nhật đặt lịch
### Endpoint
```
PUT /api/bookings/{bookings}
```
### Mô tả
Cập nhật thông tin đặt lịch, bao gồm thay đổi trạng thái hoặc ghi chú.

### Dữ liệu yêu cầu (JSON Body)
| Tên        | Kiểu dữ liệu | Bắt buộc | Mô tả |
|------------|-------------|----------|------|
| doctor_id  | integer     | Không    | ID của bác sĩ (chỉ áp dụng nếu cập nhật trạng thái `confirmed`) |
| service_id | integer     | Không    | ID dịch vụ |
| guest_id   | integer     | Không    | ID khách hàng |
| booking_date | date      | Không    | Ngày đặt lịch |
| booking_time | time      | Không    | Giờ đặt lịch |
| notes      | string      | Không    | Ghi chú |
| status     | string      | Không    | Trạng thái đặt lịch (`pending`, `confirmed`, `completed`) |

### Response
#### Thành công (200 OK)
```json
{
    "booking": {
        "id": 1,
        "doctor_id": 5,
        "service_id": 10,
        "guest_id": 20,
        "booking_date": "2025-03-10",
        "booking_time": "14:00",
        "status": "confirmed"
    },
    "message": "Bác sĩ nhận lịch thành công."
}
```

#### Lỗi xác thực (403 Forbidden)
```json
{
    "message": "Bạn không có quyền cập nhật đặt lịch này."
}
```

