<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Dự Án Booking

Dự án này là một hệ thống đặt chỗ trực tuyến được xây dựng bằng các công nghệ:
- **Backend**: Laravel - PHP Framework mạnh mẽ để xây dựng hệ thống API và xử lý nghiệp vụ backend.
- **Frontend**: React - Thư viện JavaScript hiện đại giúp tạo giao diện người dùng động và mượt mà.

Hệ thống hỗ trợ các chức năng chính như:
- Đặt lịch khám bệnh.
- Quản lý lịch làm việc của bác sĩ.
- Quản lý bệnh nhân và hồ sơ y tế.
- Tích hợp thanh toán trực tuyến.
- Gửi thông báo và nhắc nhở lịch hẹn.

## Thành Viên Dự Án

- **LEADER**: Nguyễn Việt Hưng PH38409
- **FRONTEND**: Nguyễn Xuân Bắc PH36020
- **FRONTEND**: Nguyễn Văn Đông PH31167
- **BACKEND**: Đỗ Đức Anh PH41132
- **BACKEND**: Vy Minh Kỳ PH44180
- **BACKEND**: Nguyễn Thế Ngọc PH39083
- **BACKEND**: Cao Đăng Khoa PH38406

## Cài Đặt

### 1. Clone Repository
```bash
git clone https://github.com/hunghero32/DATN.git
cd DATN
```

### 2. Cấu trúc thư mục
- **Backend** (Laravel): `DATN/backend`
- **Frontend** (React): `DATN/frontend`

### 3. Cài đặt Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```
Cấu hình file `.env` cho database và các thông tin cần thiết.

Chạy migration để tạo bảng dữ liệu:
```bash
php artisan migrate --seed
```

Khởi chạy Laravel:
```bash
php artisan serve
```
Mặc định backend chạy tại: `http://localhost:8000`

Khởi chạy Cron Auto:
```bash
php artisan schedule:work
```

### 4. Cài đặt Frontend (React)
```bash
cd frontend
npm install
npm start
```
Mặc định frontend chạy tại: `http://localhost:3000`

Nếu muốn build dự án:
```bash
npm run build
```

## Cấu Trúc Dự Án

### **Backend (Laravel)**
- `app/Models/`: Chứa các mô hình Eloquent ORM.
- `app/Http/Controllers/`: Chứa các controller xử lý logic backend.
- `routes/api.php`: Chứa các API endpoint.
- `database/migrations/`: Chứa các file migration để quản lý cấu trúc database.
- `public/`: Chứa các tài nguyên tĩnh (CSS, JS, hình ảnh...).
- `storage/logs/`: Chứa file log hệ thống.
- `config/`: Chứa các file cấu hình của Laravel.

### **Frontend (React)**
- `src/components/`: Chứa các component tái sử dụng.
- `src/pages/`: Chứa các trang chính của ứng dụng.
- `src/routes/`: Cấu hình route sử dụng React Router.
- `src/services/`: Chứa các API call giao tiếp với backend.
- `src/redux/`: Chứa các file quản lý trạng thái ứng dụng với Redux (nếu có).

## Đóng Góp
Nếu bạn muốn đóng góp vào dự án này, vui lòng làm theo các bước sau:
1. Fork repository này.
2. Tạo một nhánh mới (`git checkout -b feature-branch`).
3. Thực hiện các thay đổi và commit (`git commit -am 'Add new feature'`).
4. Đẩy nhánh lên (`git push origin feature-branch`).
5. Tạo một Pull Request.

## Liên Hệ
Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email: [hung87800@gmail.com](mailto:hung87800@gmail.com).

## Giấy phép
Dự án này được cấp phép theo [Giấy phép MIT](LICENSE).
