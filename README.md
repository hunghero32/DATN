<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Dự Án Booking

Dự án này là một hệ thống đặt chỗ được xây dựng bằng các Framework Laravel(Backend) và React(Frontend). Cho phép người dùng đặt lịch khám bệnh, quản lý lịch làm việc của bác sĩ ...

## Thành Viên Dự Án

- **LEADER**: Nguyễn Việt Hưng PH38409
- **FRONTEND**: Nguyễn Xuân Bắc PH36020
- **FRONTEND**: Nguyễn Văn Đông PH31167
- **BACKEND**: Đỗ Đức Anh PH41132
- **BACKEND**: Vy Minh Kỳ PH44180
- **BACKEND**: Nguyễn Thế Ngọc PH39083
- **BACKEND**: Cao Đăng Khoa PH38406

## Cài Đặt

1. **Clone Repository**

    ```bash
    git clone https://github.com/hunghero32/DATN.git
    cd DATN
    ```
2. **Thư Mục**
- Backend
    ```bash
    cd DATN/backend
    ```
- Frontend
    ```bash
    cd DATN/frontend
    ```
3. **Cài đặt các Phụ thuộc**

    ```bash
    composer install
    npm install
    ```

4. **Tạo File `.env`**

    ```bash
    cp .env.example .env
    ```

5. **Cấu hình Cơ sở dữ liệu**

    Chỉnh sửa file `.env` để cấu hình thông tin kết nối cơ sở dữ liệu của bạn.

6. **Tạo Khóa Ứng dụng Backend**

    ```bash
    php artisan key:generate
    ```

7. **Chạy Migrations**

    ```bash
    php artisan migrate
    ```

8. **Chạy Ứng dụng Backend**

    ```bash
    php artisan serve
    ```
9. **Chạy Ứng dụng Frontend**

    ```bash
    npm run
    ```

    Truy cập backend tại `http://localhost:8000`
    Truy cập frontend tại `http://localhost:3000`
## Cấu Trúc Dự Án

- `backend/app/Models`: Chứa các mô hình Eloquent.
- `backend/app/Http/Controllers`: Chứa các controller xử lý logic.
- `routes` : chứa các router và API.
- `resources/views`: Chứa các view được sử dụng trong ứng dụng.
- `database/migrations`: Chứa các file migration để tạo bảng cơ sở dữ liệu.
- `public`: Chứa các file static như hình ảnh, CSS, JavaScript.

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

