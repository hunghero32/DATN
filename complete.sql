-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th5 10, 2025 lúc 05:26 AM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 8.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `datn`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint UNSIGNED NOT NULL,
  `doctor_id` bigint UNSIGNED DEFAULT NULL,
  `service_id` bigint UNSIGNED NOT NULL,
  `guest_id` bigint UNSIGNED NOT NULL,
  `doctor_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_price` decimal(15,0) NOT NULL,
  `booking_date` date NOT NULL,
  `booking_time` time NOT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','confirmed','completed','canceled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `bookings`
--

INSERT INTO `bookings` (`id`, `doctor_id`, `service_id`, `guest_id`, `doctor_name`, `service_name`, `service_price`, `booking_date`, `booking_time`, `notes`, `status`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 11, 'Bác sĩ Lê Minh', 'Khám tổng quát', 300000, '2025-04-01', '08:00:00', 'Khám sức khỏe định kỳ', 'confirmed', 0, '2025-04-01 07:00:00', '2025-04-01 07:30:00'),
(2, 2, 2, 12, 'Bác sĩ Hoàng Dũng', 'Khám tim mạch', 400000, '2025-04-02', '09:00:00', 'Đau ngực nhẹ', 'completed', 0, '2025-04-02 08:00:00', '2025-04-02 09:30:00'),
(3, 3, 3, 13, 'Bác sĩ Trần Văn Hùng', 'Khám nhi', 250000, '2025-04-03', '10:00:00', 'Sốt nhẹ', 'pending', 0, '2025-04-03 09:00:00', '2025-04-03 09:30:00'),
(4, 4, 4, 14, 'Bác sĩ Phạm Ngọc Anh', 'Khám da liễu', 350000, '2025-04-04', '11:00:00', 'Nổi mẩn đỏ', 'confirmed', 0, '2025-04-04 10:00:00', '2025-04-04 10:30:00'),
(5, 5, 5, 15, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám xương khớp', 500000, '2025-04-05', '13:00:00', 'Đau đầu gối', 'completed', 0, '2025-04-05 12:00:00', '2025-04-05 13:30:00'),
(6, 6, 6, 16, 'Bác sĩ Đỗ Thị Hòa', 'Khám tim mạch', 400000, '2025-04-06', '14:00:00', 'Khó thở', 'pending', 0, '2025-04-06 13:00:00', '2025-04-06 13:30:00'),
(7, 7, 7, 17, 'Bác sĩ Vũ Đức Minh', 'Khám nhi', 250000, '2025-04-07', '15:00:00', 'Ho kéo dài', 'canceled', 0, '2025-04-07 14:00:00', '2025-04-07 14:30:00'),
(8, 8, 8, 18, 'Bác sĩ Lý Hoàng Nam', 'Khám tổng quát', 300000, '2025-04-08', '16:00:00', 'Khám sức khỏe', 'confirmed', 0, '2025-04-08 15:00:00', '2025-04-08 15:30:00'),
(9, 1, 9, 19, 'Bác sĩ Lê Minh', 'Khám tiêu hóa', 350000, '2025-04-09', '08:30:00', 'Đau bụng', 'completed', 0, '2025-04-09 07:30:00', '2025-04-09 08:00:00'),
(10, 2, 10, 20, 'Bác sĩ Hoàng Dũng', 'Khám tiết niệu', 400000, '2025-04-10', '09:30:00', 'Tiểu buốt', 'pending', 0, '2025-04-10 08:30:00', '2025-04-10 09:00:00'),
(11, 3, 11, 11, 'Bác sĩ Trần Văn Hùng', 'Khám hô hấp', 320000, '2025-04-11', '10:30:00', 'Khó thở nhẹ', 'confirmed', 0, '2025-04-11 09:30:00', '2025-04-11 10:00:00'),
(12, 4, 12, 12, 'Bác sĩ Phạm Ngọc Anh', 'Khám nội tiết', 370000, '2025-04-12', '11:30:00', 'Mệt mỏi', 'completed', 0, '2025-04-12 10:30:00', '2025-04-12 11:00:00'),
(13, 5, 13, 13, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám y học cổ truyền', 280000, '2025-04-13', '13:30:00', 'Đau lưng', 'pending', 0, '2025-04-13 12:30:00', '2025-04-13 13:00:00'),
(14, 6, 14, 14, 'Bác sĩ Đỗ Thị Hòa', 'Khám ung bướu', 600000, '2025-04-14', '14:30:00', 'Khối u nhỏ', 'confirmed', 0, '2025-04-14 13:30:00', '2025-04-14 14:00:00'),
(15, 7, 15, 15, 'Bác sĩ Vũ Đức Minh', 'Khám huyết học', 450000, '2025-04-15', '15:30:00', 'Thiếu máu', 'completed', 0, '2025-04-15 14:30:00', '2025-04-15 15:00:00'),
(16, 8, 16, 16, 'Bác sĩ Lý Hoàng Nam', 'Khám dinh dưỡng', 200000, '2025-04-16', '16:30:00', 'Tư vấn ăn uống', 'pending', 0, '2025-04-16 15:30:00', '2025-04-16 16:00:00'),
(17, 1, 17, 17, 'Bác sĩ Lê Minh', 'Khám vật lý trị liệu', 500000, '2025-04-17', '08:45:00', 'Phục hồi chức năng', 'confirmed', 0, '2025-04-17 07:45:00', '2025-04-17 08:15:00'),
(18, 2, 18, 18, 'Bác sĩ Hoàng Dũng', 'Khám tâm thần', 550000, '2025-04-18', '09:45:00', 'Mất ngủ', 'completed', 0, '2025-04-18 08:45:00', '2025-04-18 09:15:00'),
(19, 3, 19, 19, 'Bác sĩ Trần Văn Hùng', 'Khám mắt', 300000, '2025-04-19', '10:45:00', 'Mờ mắt', 'pending', 0, '2025-04-19 09:45:00', '2025-04-19 10:15:00'),
(20, 4, 20, 20, 'Bác sĩ Phạm Ngọc Anh', 'Khám thần kinh', 400000, '2025-04-20', '11:45:00', 'Đau đầu', 'confirmed', 0, '2025-04-20 10:45:00', '2025-04-20 11:15:00'),
(21, 5, 1, 11, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám tổng quát', 300000, '2025-04-21', '13:45:00', 'Khám sức khỏe', 'completed', 0, '2025-04-21 12:45:00', '2025-04-21 13:15:00'),
(22, 6, 2, 12, 'Bác sĩ Đỗ Thị Hòa', 'Khám tim mạch', 400000, '2025-04-22', '14:45:00', 'Đau ngực', 'pending', 0, '2025-04-22 13:45:00', '2025-04-22 14:15:00'),
(23, 7, 3, 13, 'Bác sĩ Vũ Đức Minh', 'Khám nhi', 250000, '2025-04-23', '15:45:00', 'Sốt', 'canceled', 0, '2025-04-23 14:45:00', '2025-04-23 15:15:00'),
(24, 8, 4, 14, 'Bác sĩ Lý Hoàng Nam', 'Khám da liễu', 350000, '2025-04-24', '16:45:00', 'Nổi mẩn', 'confirmed', 0, '2025-04-24 15:45:00', '2025-04-24 16:15:00'),
(25, 1, 5, 15, 'Bác sĩ Lê Minh', 'Khám xương khớp', 500000, '2025-04-25', '08:15:00', 'Đau vai', 'completed', 0, '2025-04-25 07:15:00', '2025-04-25 07:45:00'),
(26, 2, 6, 16, 'Bác sĩ Hoàng Dũng', 'Khám tim mạch', 400000, '2025-04-26', '09:15:00', 'Khó thở', 'pending', 0, '2025-04-26 08:15:00', '2025-04-26 08:45:00'),
(27, 3, 7, 17, 'Bác sĩ Trần Văn Hùng', 'Khám nhi', 250000, '2025-04-27', '10:15:00', 'Ho', 'confirmed', 0, '2025-04-27 09:15:00', '2025-04-27 09:45:00'),
(28, 4, 8, 18, 'Bác sĩ Phạm Ngọc Anh', 'Khám tổng quát', 300000, '2025-04-28', '11:15:00', 'Khám sức khỏe', 'completed', 0, '2025-04-28 10:15:00', '2025-04-28 10:45:00'),
(29, 5, 9, 19, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám tiêu hóa', 350000, '2025-04-29', '13:15:00', 'Đau bụng', 'pending', 0, '2025-04-29 12:15:00', '2025-04-29 12:45:00'),
(30, 6, 10, 20, 'Bác sĩ Đỗ Thị Hòa', 'Khám tiết niệu', 400000, '2025-04-30', '14:15:00', 'Tiểu buốt', 'confirmed', 0, '2025-04-30 13:15:00', '2025-04-30 13:45:00'),
(31, 7, 11, 11, 'Bác sĩ Vũ Đức Minh', 'Khám hô hấp', 320000, '2025-05-01', '15:15:00', 'Khó thở', 'completed', 0, '2025-05-01 14:15:00', '2025-05-01 14:45:00'),
(32, 8, 12, 12, 'Bác sĩ Lý Hoàng Nam', 'Khám nội tiết', 370000, '2025-05-02', '16:15:00', 'Mệt mỏi', 'pending', 0, '2025-05-02 15:15:00', '2025-05-02 15:45:00'),
(33, 1, 13, 13, 'Bác sĩ Lê Minh', 'Khám y học cổ truyền', 280000, '2025-05-03', '08:30:00', 'Đau lưng', 'confirmed', 0, '2025-05-03 07:30:00', '2025-05-03 08:00:00'),
(34, 2, 14, 14, 'Bác sĩ Hoàng Dũng', 'Khám ung bướu', 600000, '2025-05-04', '09:30:00', 'Khối u nhỏ', 'completed', 0, '2025-05-04 08:30:00', '2025-05-04 09:00:00'),
(35, 3, 15, 15, 'Bác sĩ Trần Văn Hùng', 'Khám huyết học', 450000, '2025-05-05', '10:30:00', 'Thiếu máu', 'pending', 0, '2025-05-05 09:30:00', '2025-05-05 10:00:00'),
(36, 4, 16, 16, 'Bác sĩ Phạm Ngọc Anh', 'Khám dinh dưỡng', 200000, '2025-05-06', '11:30:00', 'Tư vấn ăn uống', 'confirmed', 0, '2025-05-06 10:30:00', '2025-05-06 11:00:00'),
(37, 5, 17, 17, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám vật lý trị liệu', 500000, '2025-05-07', '13:30:00', 'Phục hồi chức năng', 'completed', 0, '2025-05-07 12:30:00', '2025-05-07 13:00:00'),
(38, 6, 18, 18, 'Bác sĩ Đỗ Thị Hòa', 'Khám tâm thần', 550000, '2025-05-08', '14:30:00', 'Mất ngủ', 'pending', 0, '2025-05-08 13:30:00', '2025-05-08 14:00:00'),
(39, 7, 19, 19, 'Bác sĩ Vũ Đức Minh', 'Khám mắt', 300000, '2025-05-09', '15:30:00', 'Mờ mắt', 'confirmed', 0, '2025-05-09 14:30:00', '2025-05-09 15:00:00'),
(40, 8, 20, 20, 'Bác sĩ Lý Hoàng Nam', 'Khám thần kinh', 400000, '2025-05-10', '16:30:00', 'Đau đầu', 'completed', 0, '2025-05-10 15:30:00', '2025-05-10 16:00:00'),
(41, 1, 1, 11, 'Bác sĩ Lê Minh', 'Khám tổng quát', 300000, '2025-05-11', '08:00:00', 'Khám sức khỏe định kỳ', 'confirmed', 0, '2025-05-11 07:00:00', '2025-05-11 07:30:00'),
(42, 2, 2, 12, 'Bác sĩ Hoàng Dũng', 'Khám tim mạch', 400000, '2025-05-12', '09:00:00', 'Đau ngực nhẹ', 'completed', 0, '2025-05-12 08:00:00', '2025-05-12 09:30:00'),
(43, 3, 3, 13, 'Bác sĩ Trần Văn Hùng', 'Khám nhi', 250000, '2025-05-13', '10:00:00', 'Sốt nhẹ', 'pending', 0, '2025-05-13 09:00:00', '2025-05-13 09:30:00'),
(44, 4, 4, 14, 'Bác sĩ Phạm Ngọc Anh', 'Khám da liễu', 350000, '2025-05-14', '11:00:00', 'Nổi mẩn đỏ', 'confirmed', 0, '2025-05-14 10:00:00', '2025-05-14 10:30:00'),
(45, 5, 5, 15, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám xương khớp', 500000, '2025-05-15', '13:00:00', 'Đau đầu gối', 'completed', 0, '2025-05-15 12:00:00', '2025-05-15 13:30:00'),
(46, 6, 6, 16, 'Bác sĩ Đỗ Thị Hòa', 'Khám tim mạch', 400000, '2025-05-16', '14:00:00', 'Khó thở', 'pending', 0, '2025-05-16 13:00:00', '2025-05-16 13:30:00'),
(47, 7, 7, 17, 'Bác sĩ Vũ Đức Minh', 'Khám nhi', 250000, '2025-05-17', '15:00:00', 'Ho kéo dài', 'canceled', 0, '2025-05-17 14:00:00', '2025-05-17 14:30:00'),
(48, 8, 8, 18, 'Bác sĩ Lý Hoàng Nam', 'Khám tổng quát', 300000, '2025-05-18', '16:00:00', 'Khám sức khỏe', 'confirmed', 0, '2025-05-18 15:00:00', '2025-05-18 15:30:00'),
(49, 1, 9, 19, 'Bác sĩ Lê Minh', 'Khám tiêu hóa', 350000, '2025-05-19', '08:30:00', 'Đau bụng', 'completed', 0, '2025-05-19 07:30:00', '2025-05-19 08:00:00'),
(50, 2, 10, 20, 'Bác sĩ Hoàng Dũng', 'Khám tiết niệu', 400000, '2025-05-20', '09:30:00', 'Tiểu buốt', 'pending', 0, '2025-05-20 08:30:00', '2025-05-20 09:00:00'),
(51, 3, 11, 11, 'Bác sĩ Trần Văn Hùng', 'Khám hô hấp', 320000, '2025-05-21', '10:30:00', 'Khó thở nhẹ', 'confirmed', 0, '2025-05-21 09:30:00', '2025-05-21 10:00:00'),
(52, 4, 12, 12, 'Bác sĩ Phạm Ngọc Anh', 'Khám nội tiết', 370000, '2025-05-22', '11:30:00', 'Mệt mỏi', 'completed', 0, '2025-05-22 10:30:00', '2025-05-22 11:00:00'),
(53, 5, 13, 13, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám y học cổ truyền', 280000, '2025-05-23', '13:30:00', 'Đau lưng', 'pending', 0, '2025-05-23 12:30:00', '2025-05-23 13:00:00'),
(54, 6, 14, 14, 'Bác sĩ Đỗ Thị Hòa', 'Khám ung bướu', 600000, '2025-05-24', '14:30:00', 'Khối u nhỏ', 'confirmed', 0, '2025-05-24 13:30:00', '2025-05-24 14:00:00'),
(55, 7, 15, 15, 'Bác sĩ Vũ Đức Minh', 'Khám huyết học', 450000, '2025-05-25', '15:30:00', 'Thiếu máu', 'completed', 0, '2025-05-25 14:30:00', '2025-05-25 15:00:00'),
(56, 8, 16, 16, 'Bác sĩ Lý Hoàng Nam', 'Khám dinh dưỡng', 200000, '2025-05-26', '16:30:00', 'Tư vấn ăn uống', 'pending', 0, '2025-05-26 15:30:00', '2025-05-26 16:00:00'),
(57, 1, 17, 17, 'Bác sĩ Lê Minh', 'Khám vật lý trị liệu', 500000, '2025-05-27', '08:45:00', 'Phục hồi chức năng', 'confirmed', 0, '2025-05-27 07:45:00', '2025-05-27 08:15:00'),
(58, 2, 18, 18, 'Bác sĩ Hoàng Dũng', 'Khám tâm thần', 550000, '2025-05-28', '09:45:00', 'Mất ngủ', 'completed', 0, '2025-05-28 08:45:00', '2025-05-28 09:15:00'),
(59, 3, 19, 19, 'Bác sĩ Trần Văn Hùng', 'Khám mắt', 300000, '2025-05-29', '10:45:00', 'Mờ mắt', 'pending', 0, '2025-05-29 09:45:00', '2025-05-29 10:15:00'),
(60, 4, 20, 20, 'Bác sĩ Phạm Ngọc Anh', 'Khám thần kinh', 400000, '2025-05-30', '11:45:00', 'Đau đầu', 'confirmed', 0, '2025-05-30 10:45:00', '2025-05-30 11:15:00'),
(61, 5, 1, 11, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám tổng quát', 300000, '2025-06-01', '13:45:00', 'Khám sức khỏe', 'completed', 0, '2025-06-01 12:45:00', '2025-06-01 13:15:00'),
(62, 6, 2, 12, 'Bác sĩ Đỗ Thị Hòa', 'Khám tim mạch', 400000, '2025-06-02', '14:45:00', 'Đau ngực', 'pending', 0, '2025-06-02 13:45:00', '2025-06-02 14:15:00'),
(63, 7, 3, 13, 'Bác sĩ Vũ Đức Minh', 'Khám nhi', 250000, '2025-06-03', '15:45:00', 'Sốt', 'canceled', 0, '2025-06-03 14:45:00', '2025-06-03 15:15:00'),
(64, 8, 4, 14, 'Bác sĩ Lý Hoàng Nam', 'Khám da liễu', 350000, '2025-06-04', '16:45:00', 'Nổi mẩn', 'confirmed', 0, '2025-06-04 15:45:00', '2025-06-04 16:15:00'),
(65, 1, 5, 15, 'Bác sĩ Lê Minh', 'Khám xương khớp', 500000, '2025-06-05', '08:15:00', 'Đau vai', 'completed', 0, '2025-06-05 07:15:00', '2025-06-05 07:45:00'),
(66, 2, 6, 16, 'Bác sĩ Hoàng Dũng', 'Khám tim mạch', 400000, '2025-06-06', '09:15:00', 'Khó thở', 'pending', 0, '2025-06-06 08:15:00', '2025-06-06 08:45:00'),
(67, 3, 7, 17, 'Bác sĩ Trần Văn Hùng', 'Khám nhi', 250000, '2025-06-07', '10:15:00', 'Ho', 'confirmed', 0, '2025-06-07 09:15:00', '2025-06-07 09:45:00'),
(68, 4, 8, 18, 'Bác sĩ Phạm Ngọc Anh', 'Khám tổng quát', 300000, '2025-06-08', '11:15:00', 'Khám sức khỏe', 'completed', 0, '2025-06-08 10:15:00', '2025-06-08 10:45:00'),
(69, 5, 9, 19, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám tiêu hóa', 350000, '2025-06-09', '13:15:00', 'Đau bụng', 'pending', 0, '2025-06-09 12:15:00', '2025-06-09 12:45:00'),
(70, 6, 10, 20, 'Bác sĩ Đỗ Thị Hòa', 'Khám tiết niệu', 400000, '2025-06-10', '14:15:00', 'Tiểu buốt', 'confirmed', 0, '2025-06-10 13:15:00', '2025-06-10 13:45:00'),
(71, 7, 11, 11, 'Bác sĩ Vũ Đức Minh', 'Khám hô hấp', 320000, '2025-06-11', '15:15:00', 'Khó thở', 'completed', 0, '2025-06-11 14:15:00', '2025-06-11 14:45:00'),
(72, 8, 12, 12, 'Bác sĩ Lý Hoàng Nam', 'Khám nội tiết', 370000, '2025-06-12', '16:15:00', 'Mệt mỏi', 'pending', 0, '2025-06-12 15:15:00', '2025-06-12 15:45:00'),
(73, 1, 13, 13, 'Bác sĩ Lê Minh', 'Khám y học cổ truyền', 280000, '2025-06-13', '08:30:00', 'Đau lưng', 'confirmed', 0, '2025-06-13 07:30:00', '2025-06-13 08:00:00'),
(74, 2, 14, 14, 'Bác sĩ Hoàng Dũng', 'Khám ung bướu', 600000, '2025-06-14', '09:30:00', 'Khối u nhỏ', 'completed', 0, '2025-06-14 08:30:00', '2025-06-14 09:00:00'),
(75, 3, 15, 15, 'Bác sĩ Trần Văn Hùng', 'Khám huyết học', 450000, '2025-06-15', '10:30:00', 'Thiếu máu', 'pending', 0, '2025-06-15 09:30:00', '2025-06-15 10:00:00'),
(76, 4, 16, 16, 'Bác sĩ Phạm Ngọc Anh', 'Khám dinh dưỡng', 200000, '2025-06-16', '11:30:00', 'Tư vấn ăn uống', 'confirmed', 0, '2025-06-16 10:30:00', '2025-06-16 11:00:00'),
(77, 5, 17, 17, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám vật lý trị liệu', 500000, '2025-06-17', '13:30:00', 'Phục hồi chức năng', 'completed', 0, '2025-06-17 12:30:00', '2025-06-17 13:00:00'),
(78, 6, 18, 18, 'Bác sĩ Đỗ Thị Hòa', 'Khám tâm thần', 550000, '2025-06-18', '14:30:00', 'Mất ngủ', 'pending', 0, '2025-06-18 13:30:00', '2025-06-18 14:00:00'),
(79, 7, 19, 19, 'Bác sĩ Vũ Đức Minh', 'Khám mắt', 300000, '2025-06-19', '15:30:00', 'Mờ mắt', 'confirmed', 0, '2025-06-19 14:30:00', '2025-06-19 15:00:00'),
(80, 8, 20, 20, 'Bác sĩ Lý Hoàng Nam', 'Khám thần kinh', 400000, '2025-06-20', '16:30:00', 'Đau đầu', 'completed', 0, '2025-06-20 15:30:00', '2025-06-20 16:00:00'),
(81, 1, 1, 11, 'Bác sĩ Lê Minh', 'Khám tổng quát', 300000, '2025-06-21', '08:00:00', 'Khám sức khỏe định kỳ', 'confirmed', 0, '2025-06-21 07:00:00', '2025-06-21 07:30:00'),
(82, 2, 2, 12, 'Bác sĩ Hoàng Dũng', 'Khám tim mạch', 400000, '2025-06-22', '09:00:00', 'Đau ngực nhẹ', 'completed', 0, '2025-06-22 08:00:00', '2025-06-22 09:30:00'),
(83, 3, 3, 13, 'Bác sĩ Trần Văn Hùng', 'Khám nhi', 250000, '2025-06-23', '10:00:00', 'Sốt nhẹ', 'pending', 0, '2025-06-23 09:00:00', '2025-06-23 09:30:00'),
(84, 4, 4, 14, 'Bác sĩ Phạm Ngọc Anh', 'Khám da liễu', 350000, '2025-06-24', '11:00:00', 'Nổi mẩn đỏ', 'confirmed', 0, '2025-06-24 10:00:00', '2025-06-24 10:30:00'),
(85, 5, 5, 15, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám xương khớp', 500000, '2025-06-25', '13:00:00', 'Đau đầu gối', 'completed', 0, '2025-06-25 12:00:00', '2025-06-25 13:30:00'),
(86, 6, 6, 16, 'Bác sĩ Đỗ Thị Hòa', 'Khám tim mạch', 400000, '2025-06-26', '14:00:00', 'Khó thở', 'pending', 0, '2025-06-26 13:00:00', '2025-06-26 13:30:00'),
(87, 7, 7, 17, 'Bác sĩ Vũ Đức Minh', 'Khám nhi', 250000, '2025-06-27', '15:00:00', 'Ho kéo dài', 'canceled', 0, '2025-06-27 14:00:00', '2025-06-27 14:30:00'),
(88, 8, 8, 18, 'Bác sĩ Lý Hoàng Nam', 'Khám tổng quát', 300000, '2025-06-28', '16:00:00', 'Khám sức khỏe', 'confirmed', 0, '2025-06-28 15:00:00', '2025-06-28 15:30:00'),
(89, 1, 9, 19, 'Bác sĩ Lê Minh', 'Khám tiêu hóa', 350000, '2025-06-29', '08:30:00', 'Đau bụng', 'completed', 0, '2025-06-29 07:30:00', '2025-06-29 08:00:00'),
(90, 2, 10, 20, 'Bác sĩ Hoàng Dũng', 'Khám tiết niệu', 400000, '2025-06-30', '09:30:00', 'Tiểu buốt', 'pending', 0, '2025-06-30 08:30:00', '2025-06-30 09:00:00'),
(91, 3, 11, 11, 'Bác sĩ Trần Văn Hùng', 'Khám hô hấp', 320000, '2025-07-01', '10:30:00', 'Khó thở nhẹ', 'confirmed', 0, '2025-07-01 09:30:00', '2025-07-01 10:00:00'),
(92, 4, 12, 12, 'Bác sĩ Phạm Ngọc Anh', 'Khám nội tiết', 370000, '2025-07-02', '11:30:00', 'Mệt mỏi', 'completed', 0, '2025-07-02 10:30:00', '2025-07-02 11:00:00'),
(93, 5, 13, 13, 'Bác sĩ Nguyễn Thanh Tùng', 'Khám y học cổ truyền', 280000, '2025-07-03', '13:30:00', 'Đau lưng', 'pending', 0, '2025-07-03 12:30:00', '2025-07-03 13:00:00'),
(94, 6, 14, 14, 'Bác sĩ Đỗ Thị Hòa', 'Khám ung bướu', 600000, '2025-07-04', '14:30:00', 'Khối u nhỏ', 'confirmed', 0, '2025-07-04 13:30:00', '2025-07-04 14:00:00'),
(95, 7, 15, 15, 'Bác sĩ Vũ Đức Minh', 'Khám huyết học', 450000, '2025-07-05', '15:30:00', 'Thiếu máu', 'completed', 0, '2025-07-05 14:30:00', '2025-07-05 15:00:00'),
(96, 8, 16, 16, 'Bác sĩ Lý Hoàng Nam', 'Khám dinh dưỡng', 200000, '2025-07-06', '16:30:00', 'Tư vấn ăn uống', 'pending', 0, '2025-07-06 15:30:00', '2025-07-06 16:00:00'),
(97, 1, 17, 17, 'Bác sĩ Lê Minh', 'Khám vật lý trị liệu', 500000, '2025-07-07', '08:45:00', 'Phục hồi chức năng', 'confirmed', 0, '2025-07-07 07:45:00', '2025-07-07 08:15:00'),
(98, 2, 18, 18, 'Bác sĩ Hoàng Dũng', 'Khám tâm thần', 550000, '2025-07-08', '09:45:00', 'Mất ngủ', 'completed', 0, '2025-07-08 08:45:00', '2025-07-08 09:15:00'),
(99, 3, 19, 19, 'Bác sĩ Trần Văn Hùng', 'Khám mắt', 300000, '2025-07-09', '10:45:00', 'Mờ mắt', 'pending', 0, '2025-07-09 09:45:00', '2025-07-09 10:15:00'),
(100, 4, 20, 20, 'Bác sĩ Phạm Ngọc Anh', 'Khám thần kinh', 400000, '2025-07-10', '11:45:00', 'Đau đầu', 'confirmed', 0, '2025-07-10 10:45:00', '2025-07-10 11:15:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `name`, `description`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Tin tức', 'Các tin tức mới nhất về y tế', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(2, NULL, 'Sức khỏe', 'Chuyên mục sức khỏe', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(3, NULL, 'Dinh dưỡng', 'Chuyên mục dinh dưỡng', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(4, NULL, 'Bệnh học', 'Chuyên mục bệnh học', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(5, NULL, 'Tư vấn', 'Chuyên mục tư vấn', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(6, 1, 'Tin nổi bật', 'Tin tức nổi bật', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(7, 2, 'Sức khỏe trẻ em', 'Chăm sóc sức khỏe trẻ em', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(8, 2, 'Sức khỏe người lớn', 'Chăm sóc sức khỏe người lớn', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(9, 3, 'Dinh dưỡng cho bé', 'Dinh dưỡng cho trẻ nhỏ', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(10, 3, 'Dinh dưỡng người lớn', 'Dinh dưỡng cho người lớn', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(11, 4, 'Bệnh truyền nhiễm', 'Các bệnh truyền nhiễm', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(12, 4, 'Bệnh mãn tính', 'Các bệnh mãn tính', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(13, 5, 'Tư vấn dinh dưỡng', 'Tư vấn về dinh dưỡng', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(14, 5, 'Tư vấn sức khỏe', 'Tư vấn về sức khỏe', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(15, 1, 'Tin khuyến mãi', 'Tin tức khuyến mãi', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(16, NULL, 'Khuyến mãi', 'Chuyên mục khuyến mãi', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(17, 16, 'Giảm giá dịch vụ', 'Thông tin giảm giá', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(18, 16, 'Ưu đãi khách hàng', 'Ưu đãi cho khách hàng', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(19, NULL, 'Cẩm nang', 'Cẩm nang sức khỏe', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(20, 19, 'Cẩm nang trẻ em', 'Cẩm nang cho trẻ em', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(21, 19, 'Cẩm nang người lớn', 'Cẩm nang cho người lớn', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(22, NULL, 'Sự kiện', 'Sự kiện y tế', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(23, 22, 'Hội thảo', 'Hội thảo chuyên đề', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(24, 22, 'Triển lãm', 'Triển lãm y tế', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(25, NULL, 'Tuyển dụng', 'Thông tin tuyển dụng', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(26, 25, 'Tuyển dụng bác sĩ', 'Tuyển dụng bác sĩ', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(27, 25, 'Tuyển dụng nhân viên', 'Tuyển dụng nhân viên', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(28, NULL, 'Đào tạo', 'Đào tạo chuyên môn', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(29, 28, 'Đào tạo bác sĩ', 'Đào tạo bác sĩ', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41'),
(30, 28, 'Đào tạo nhân viên', 'Đào tạo nhân viên', 0, '2025-03-23 07:07:41', '2025-03-23 07:07:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint UNSIGNED NOT NULL,
  `guest_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `conversations`
--

INSERT INTO `conversations` (`id`, `guest_id`, `created_at`, `updated_at`) VALUES
(1, 11, '2025-04-17 12:15:58', '2025-04-17 12:15:58'),
(2, 12, '2025-05-03 02:45:02', '2025-05-03 02:45:02'),
(3, 13, '2025-05-03 02:47:13', '2025-05-03 02:47:13'),
(4, 14, '2025-05-03 03:00:42', '2025-05-03 03:00:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doctors`
--

CREATE TABLE `doctors` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `doctor_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doctor_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `doctor_bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `specialty_id` bigint UNSIGNED NOT NULL,
  `exp` int DEFAULT NULL,
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approve` tinyint(1) NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `doctors`
--

INSERT INTO `doctors` (`id`, `user_id`, `doctor_avatar`, `doctor_name`, `doctor_bio`, `specialty_id`, `exp`, `file`, `approve`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 3, 'avatars/knn9cEpWQ5WlKlKjkhJfDuh604pe5AF9Irh4jR9X.jpg', 'PGS. TS. BSCK II. TTƯT Lê Minh', '<p>&nbsp;</p><ul><li>Bác sĩ có 35 năm kinh nghiệm về vực Cột sống, thần kinh, cơ xương khớp</li><li>Phó chủ tịch hội Phẫu thuật cột sống Việt Nam</li><li>Bác sĩ nhận khám từ 7 tuổi trở lên</li></ul><h3><strong>Nhận khám và điều trị&nbsp;</strong></h3><ul><li>Các bệnh lý về cột sống</li><li>Các bệnh lý liên quan đến thần kinh</li><li>Các bệnh lý liên quan đến cơ xương khớp</li></ul><h3><strong>Quá trình công tác&nbsp;</strong></h3><ul><li>Bộ môn Khoa Phẫu thuật thần kinh, Bệnh viện Quân y 103, Học viện Quân Y</li><li>Nguyên Chủ nhiệm Bộ môn kiêm Chủ nhiệm Khoa</li></ul><h3><strong>Quá trình đào tạo</strong></h3><ul><li>Bác sĩ Chuyên khoa cấp II, Học viện Quân y (2010 - 2011)</li><li>Tiến sỹ Y khoa, Hệ chính qui, Học viện Quân y (1996 - 2000)</li><li>Cao học Phẫu thuật thần kinh, Hệ chính qui, Học viện Quân y (1993 - 1995)&nbsp;</li><li>Bác sĩ Đa khoa, Hệ chính qui, Học viện Quân y (1982 - 1988)</li><li>Đào tạo về vi phẫu thần kinh tại Fujita Health University Hospital, Nhật Bản. Tham dự nhiều khóa tập huấn kỹ thuật và các hội nghị quốc tế chuyên ngành tại các nước Mỹ, Pháp, Đức, Áo, Hàn Quốc, Singapore, Thái Lan, Philipine,…</li></ul><h3><strong>Thành viên các Hội khoa học, tổ chức chuyên môn</strong></h3><ul><li>Phó chủ tịch hội Phẫu thuật Cột sống Việt Nam</li><li>Ủy viên Ban chấp hành hội Phẫu thuật thần kinh Việt Nam</li></ul><h3><strong>Giải thưởng</strong></h3><ul><li>Được tặng danh hiệu Thầy thuốc ưu tú (02/2014)</li><li>Được công nhận đạt chuẩn chức danh Phó giáo sư (10/2011)</li></ul>', 5, 35, 'files/le_minh_cv.pdf', 1, 0, '2025-03-26 07:13:07', '2025-05-09 04:26:28'),
(2, 4, 'avatars/iBsr0GuGvtjYmsitndF3M1B1At8KMgYwAMNC6xMz.jpg', 'TTUT. BSCKII Hoàng Dũng', '<p>&nbsp;</p><ul><li>Trưởng khoa Nội Cơ Xương Khớp, Bệnh viện Nhân dân Gia Định</li><li>Nhiều năm kinh nghiệm trong khám và điều trị bệnh lý về Nội Cơ xương khớp</li><li>Bác sĩ nhận khám cho bệnh nhân từ 16 tuổi trở lên</li></ul><h3><strong>Khám và điều trị</strong></h3><p>Bác sĩ khám và điều trị các mặt bệnh:</p><ul><li>Viêm khớp, thoái hóa khớp: đau khớp, gai trong khớp,...</li><li>Đau gót chân, gai gót chân</li><li>Gai cột sống, thoái hóa cột sống: đau lưng cấp, mãn tính</li><li>Hội chứng ống cổ tay, đau thần kinh tọa: tê tay, tê chân,...</li><li>Viêm gân: ngón tay không co giãn được</li><li>Viêm khớp dạng thấp</li><li>Viêm cột sống dính khớp</li><li>Lupus khớp</li><li>Loãng xương</li><li>Gout</li><li>U hoạch dịch quanh khớp</li><li>Dãn tĩnh mạch chân</li><li>Viêm khớp vẩy nến</li></ul><h3><strong>Quá trình công tác</strong></h3><ul><li>Trưởng khoa Nội Cơ Xương Khớp, Bệnh viện Nhân dân Gia Định (nay)&nbsp;</li><li>Phó Trưởng khoa Hô hấp - Cơ xương khớp, Bệnh viện Nhân dân Gia Định (2010 - 2018)</li><li>Bác sĩ khoa Hồi sức Nội,&nbsp;Bệnh viện Nhân dân Gia Định (2006 - 2009)</li></ul><h3><strong>Quá trình đào tạo</strong></h3><ul><li>Tốt nghiệp Bác sĩ chuyên khoa II, chuyên ngành Nội khoa, Đại học Y Hà Nội (2020)</li><li>Tốt nghiệp Thạc sĩ chuyên ngành Nội Tổng quát, Đại học Y khoa Phạm Ngọc Thạch (2014)</li><li>Tốt nghiệp Bác sĩ đa khoa, Đại học Y Dược TP.HCM (2006)</li><li>Chứng chỉ Sơ bộ Cơ xương khớp, Bệnh viện Chợ Rẫy (2014)</li><li>Tu nghiệp chuyên môn tại các nước&nbsp;Hà Lan, Úc, Bồ Đào Nha, Dubai,...</li></ul><h3><strong>Sách và các công trình nghiên cứu, báo cáo khoa học</strong></h3><ul><li>Tỷ lệ và đặc điểm của hội chứng chuyển hóa trên bệnh nhân gút, Tạp chí y học TP Hồ Chi Minh (2020)</li><li>Tăng acid uric không triệu chứng, Tạp chí y học TP Hồ Chí Minh (2019)</li><li>Đánh giá kết quả điều trị của Tocillizumab (Actemra) ở bệnh nhân viêm khớp dạng thấp, Tạp chí y học TP Hồ Chí Minh (2018)</li><li>Tiến bộ liệu pháp sinh học trong bệnh khớp học, Tạp chí y học TP Hồ Chí Minh (2016)</li></ul><h3><strong>Giải thưởng</strong></h3><ul><li>Danh hiệu Thầy thuốc Ưu tú</li><li>Bằng khen của Thủ tướng Chính phủ có thành tích xuất sắc trong công tác từ năm 2019 đến năm 2023, góp phần vào sự nghiệp xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc</li></ul>', 19, 12, 'files/hoang_dung_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-05-09 04:27:56'),
(3, 5, 'avatars/S5ywDXVqRwY0BXPaWssdmcILOTvegFGHYYI4aASP.png', 'Thạc sĩ, Bác sĩ Trần Văn Hùng', '<p>&nbsp;</p><ul><li>Hơn 40 năm kinh nghiệm thăm khám và điều trị bệnh lý về Cơ - Xương - Khớp</li><li>Nguyên Trưởng Bộ môn Chấn thương chỉnh hình, Đại học Y Dược TP.HCM</li><li>Từng công tác nhiều năm tại khoa Cơ xương khớp, Bệnh viện Đại học Y dược TP.HCM</li></ul><h3><strong>Khám và điều trị</strong></h3><p>Bác sĩ khám và điều trị các bệnh về Chấn thương chỉnh hình - Cơ xương khớp:</p><ul><li>Các bệnh về xương khớp: thoái hóa khớp gối, thoái hóa khớp háng,...</li><li>Phẫu thuật vẹo cột sống</li><li>Phẫu thuật thẩm mỹ ngón tay</li><li>Phẫu thuật bàn chân</li><li>Phẫu thuật kết hợp xương</li><li>Bó bột</li><li>Nẹp cánh bàn tay</li><li>Áo nẹp lưng cao</li><li>Đai vai chi trên</li><li>Tiêm khớp</li><li>Lấy nước dịch khớp...</li></ul><h3><strong>Quá trình công tác</strong></h3><ul><li>Hiện là&nbsp;Bác sĩ khoa Chấn thương chỉnh hình, Bệnh viện Quốc tế City</li><li>Bác sĩ khoa Cơ xương khớp, Bệnh viện Đại học Y dược TP.HCM (1984 - 2003)</li><li>Công tác và giữ chức vụ Trưởng Bộ môn Chấn thương chỉnh hình, Đại học Y Dược TP.HCM (1984 - 2003)</li></ul><h3><strong>Quá trình đào tạo</strong></h3><ul><li>Tốt nghiệp Bác sĩ đa khoa, Đại học Y dược TP.HCM (1980)</li><li>Tốt nghiệp Thạc sĩ,&nbsp;Đại học Y dược TP.HCM (1997)</li></ul>', 5, 40, 'files/tran_hung_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-05-09 04:28:34'),
(4, 6, 'avatars/fg3jcujAweg0wm5PzC0dWCdj36lRSK7CtHYqNiSf.png', 'Bác sĩ Phạm Ngọc Anh', '<p>&nbsp;</p><ul><li>Bác sĩ chuyên khoa Nội soi Tiêu hoá</li><li>Đang công tác Bệnh viện Đa khoa Hà Nội</li></ul><h3><strong>Quá trình đào tạo</strong></h3><ul><li>Tốt nghiệp Bác sĩ Đa khoa, Bệnh viện 103 (2019)</li><li>Tốt nghiệp Bác sĩ Đa khoa, Học viện Quân Y (2018)</li></ul><h2><strong>Khám và điều trị&nbsp;</strong></h2><h3><strong>Khám và điều trị các bệnh lý dạ dày</strong></h3><ul><li>Gắp dị vật đường tiêu hóa</li><li>Đau dạ dày</li><li>Chảy máu dạ dày</li><li>Đau thượng vị</li><li>Viêm dạ dày</li><li>Loét dạ dày tá tràng</li><li>Nhiễm Helicobacter pylori dạ dày (HP)</li><li>Trào ngược dạ dày thực quản (Gerd)</li><li>Polyp dạ dày</li><li>Chảy máu dạ dày</li><li>Viêm dạ dày ruột Virus</li><li>Viêm ruột thừa</li><li>Polyp dạ dày</li><li>Ung thư dạ dày</li><li>Táo bón, khó nuốt, khó tiêu, ợ nóng, ợ chua</li></ul><h3><strong>Bệnh lý đại tràng, trực tràng, hậu môn</strong></h3><ul><li>Hội chứng ruột kích thích (viêm đại tràng co thắt)</li><li>Viêm đại tràng</li><li>Viêm đại tràng màng giả</li><li>Viêm loét đại tràng</li><li>Bệnh trĩ, trĩ chảy máu, rò hậu môn</li><li>Rò hậu môn, ngứa hậu môn</li><li>Nứt kẽ hậu môn, đại tiện ra máu, đại tiện khó</li><li>Áp xe hậu môn</li><li>Đi ngoài ra máu</li></ul>', 11, 5, 'files/pham_anh_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-05-08 21:40:48'),
(5, 7, 'avatars/ZWFonLhPfr9zCaBaU4VWfMWxgCuN7NKbIB70wcP6.jpg', 'BSCKI Nguyễn Thanh Tùng', '<p>&nbsp;</p><ul><li>Bác sĩ có 10 năm kinh nghiệm trong khám và điều trị bệnh lý Nội Tim mạch - Tim mạch can thiệp</li><li>Từng là bác sĩ Tim mạch Bệnh viện Đa khoa Tâm Anh Hồ Chí Minh</li></ul><h3><strong>Nhận khám và điều trị</strong></h3><ul><li>Khám và điều trị bệnh lý Nội Tim mạch&nbsp;</li><li>Tim mạch can thiệp&nbsp;</li></ul><h3><strong>Quá trình công tác</strong></h3><ul><li>Bệnh viện Đa khoa Tâm Anh thành phố Hồ Chí Minh (02/2022 - 08/2024)</li><li>Bác sĩ khoa Tim mạch, Can thiệp mạch máu Bệnh viện Quốc tế City (10/2024 - nay)</li></ul><h3><strong>Quá trình đào tạo</strong></h3><ul><li>Bác sĩ chuyên khoa 1 Nội trú, Nội tổng quát, Đại học Y Khoa Phạm Ngọc Thạch (2018 – 2021)</li><li>Bác sĩ Đa khoa Đại học Y Khoa Phạm Ngọc Thạch (2012 - 2018)</li></ul><h3><strong>Chứng chỉ trong nước hoặc nước ngoài</strong></h3><ul><li>Thông tim can thiệp cơ bản, Viện Tim thành phố Hồ Chí Minh (05/2024 - 05/2025)</li><li>Điện tâm đồ từ cơ bản đến nâng cao, Đại học Y khoa Phạm Ngọc Thạch (2021)</li><li>Siêu âm tim từ cơ bản đến nâng cao,&nbsp;Đại học Y khoa Phạm Ngọc Thạch (2021)</li><li>Siêu âm thực hành tổng quát,&nbsp;Đại học Y khoa Phạm Ngọc Thạch (2020)</li><li>Chứng chỉ siêu âm tổng quát,&nbsp;Đại học Y khoa Phạm Ngọc Thạch (2020)&nbsp;</li></ul>', 4, 10, 'files/nguyen_tung_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-05-08 21:41:52'),
(6, 8, 'avatars/UBJU8r5m9JnDVJuXmw6ECt05HYmoslVkmaXziZLA.jpg', 'Bác sĩ Đỗ Thị Hòa', '<h2><strong>Bác sĩ Đỗ Thị Hòa</strong></h2><ul><li>Hơn 10 năm cống hiến trong lĩnh vực răng sứ thẩm mỹ</li><li>Từ tu nghiệp, học tập chuyên sâu về lĩnh vực phục hình tại Cuba</li><li>Từng công tác tại Bệnh viện Răng Hàm Mặt</li><li>Chuyên gia về: Nha khoa Tổng quát và Bọc răng sứ</li></ul><h2><strong>Khám và điều trị</strong></h2><ul><li>Chuyên phục hình răng sứ thẩm mỹ theo xu hướng bảo tồn răng thật tối đa</li><li>Nha khoa tổng quát</li><li>Nhổ răng khôn</li><li>Nha khoa trẻ em</li><li>Điều trị tủy răng</li><li>Trồng răng giả phục hình mất răng</li></ul><h3><strong>Quá trình công tác</strong></h3><ul><li>Từng công tác tại: Bệnh viện răng hàm mặt – Bệnh Viện Thẩm mỹ, Trung tâm Phòng khám đa khoa, Bệnh viện đa khoa tại Hà Nội và TP. Hồ Chí Minh</li></ul><h3><strong>Quá trình đào tạo</strong></h3><ul><li>Tốt nghiệp chính quy Bác sĩ chuyên khoa Răng Hàm Mặt Đại học Y Khoa Lahabana Cuba</li><li>Tốt nghiệp chính quy Bác sĩ phục hình răng Trường Đại Học Y Khoa Sancti Spiritus Cuba</li><li>Tham gia nhiều khóa học nâng cao về chuyên môn phục hình răng, nha khoa thẩm mỹ tại các cơ sở đầu ngành tổ chức</li></ul>', 7, 10, 'files/do_hoa_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-05-09 04:10:04'),
(7, 9, 'avatars/doctor_vu_minh.jpg', 'Bác sĩ Vũ Đức Minh', 'Chuyên gia nhi khoa, tư vấn và điều trị trẻ sơ sinh.', 5, 7, 'files/vu_minh_cv.pdf', 0, 1, '2025-03-23 07:13:07', '2025-04-11 13:58:12'),
(8, 10, 'avatars/Ws02e8VSKUahTvd7nhldnucmzINEb6X91dtCVkxo.jpg', 'BSCKI Lý Hoàng Nam', '<h2><strong>BSCKI Lý Hoàng Nam</strong></h2><ul><li>Gần 10 năm kinh nghiệm trong khám và điều trị Tim mạch - Tim mạch Can thiệp</li><li>Từng là bác sĩ Tim mạch Bệnh viện Tâm Anh, Bệnh viện Tỉnh Quảng Trị</li></ul><h2><strong>Nhận khám và điều trị&nbsp;</strong></h2><ul><li>Điều trị các bệnh lý về nội tim mạch</li><li>Tim mạch can thiệp</li></ul><h3><strong>Quá trình công tác</strong></h3><ul><li>Bác sĩ khoa Tim mạch, Can thiệp mạch máu Bệnh viện Quốc tế City (10/2024 - nay)</li><li>Bác sĩ Tim mạch can thiệp Bệnh viện Đa khoa Tâm Anh (2023 - 09/2024)</li><li>Bệnh viện Đa khoa tỉnh Quảng Trị Bác sĩ Nội tim mạch - Tim mạch can thiệp (2017 - 2023)</li></ul><h3><strong>Quá trình đào tạo</strong></h3><ul><li>Bác sĩ Chuyên khoa I Nội tổng quát, Đại học Y Khoa Phạm Ngọc Thạch (2020 - 2022)</li><li>Bác sĩ Đa khoa Đại học Y Dược Huế Y (2011 - 2017)</li></ul><h3><strong>Chứng chỉ trong nước hoặc nước ngoài&nbsp;</strong></h3><ul><li>Complex PCI (Khoá can thiệp mạch vành phức tạp),&nbsp;Tan Tock Seng Hospital, Singapore (2024)</li><li>Lớp siêu âm tim cơ bản, Bệnh viện Thống Nhất (2022)</li><li>Lớp Kỹ năng đọc điện tâm đồ, Đại học Y Khoa Phạm Ngọc Thạch (2021)</li><li>Tập huấn sử dụng máy thở, Bệnh viện Trung ương Huế (2017)</li><li>Tim mạch can thiệp (Can thiệp mạch vành, mạch ngoại biên, đặt bóng đối xung động mạch chủ), Bệnh viện Đại học Y dược TP. HCM (01/2021-10/2022)</li><li>EndoMasters Course (Khoá can thiệp mạch máu ngoại biên),&nbsp;Singapore – Abbott centre (2019)</li><li>Phân suất dự trữ lưu lượng động mạch vành (FFR), Viện Tim Hà Nội (2019)</li><li>Applications of intravascular ultrasound (IVUS) in coronary intervention (Ứng dụng IVUS trong can thiệp), Viện tim mạch học Quốc Gia (2018)</li><li>Endovascular Training Course (Khoá can thiệp đặt stent graft động mạch chủ),&nbsp;Department of Surgery Prince of Songkla University, Thailand (2018)</li><li>Tập huấn lập trình máy tạo nhịp tim, Đại học Y dược Huế (2017)</li><li>Basic Pacemaker Impant Skills course (Khoá đặt máy tạo nhịp tim vĩnh viễn), Viện tim Hà Nội (2017)</li><li>Cập nhật kỹ thuật Tim mạch can thiệp, Bệnh viện Trung ương Huế (2017)</li></ul>', 4, 10, 'files/ly_nam_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-05-09 04:10:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doctor_service`
--

CREATE TABLE `doctor_service` (
  `id` bigint UNSIGNED NOT NULL,
  `doctor_id` bigint UNSIGNED NOT NULL,
  `service_id` bigint UNSIGNED NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `doctor_service`
--

INSERT INTO `doctor_service` (`id`, `doctor_id`, `service_id`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(2, 1, 8, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(3, 2, 2, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(4, 2, 12, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(5, 3, 5, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(6, 3, 15, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(7, 4, 6, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(8, 5, 1, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(9, 6, 2, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(10, 7, 5, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(11, 8, 1, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(12, 8, 13, 0, '2025-03-23 07:38:47', '2025-03-23 07:38:47'),
(13, 2, 1, 0, '2025-04-09 14:37:36', '2025-04-09 14:37:36'),
(14, 1, 11, 0, '2025-04-23 15:43:28', '2025-04-23 15:43:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doctor_specialties`
--

CREATE TABLE `doctor_specialties` (
  `id` bigint UNSIGNED NOT NULL,
  `doctor_id` bigint UNSIGNED DEFAULT NULL,
  `specialty_id` bigint UNSIGNED NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `doctor_specialties`
--

INSERT INTO `doctor_specialties` (`id`, `doctor_id`, `specialty_id`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 0, '2025-03-23 07:38:04', '2025-03-23 07:38:04'),
(2, 2, 4, 0, '2025-03-23 07:38:04', '2025-03-23 07:38:04'),
(3, 3, 5, 0, '2025-03-23 07:38:04', '2025-03-23 07:38:04'),
(4, 4, 3, 0, '2025-03-23 07:38:04', '2025-03-23 07:38:04'),
(5, 5, 1, 0, '2025-03-23 07:38:04', '2025-03-23 07:38:04'),
(6, 6, 4, 0, '2025-03-23 07:38:04', '2025-03-23 07:38:04'),
(7, 7, 5, 0, '2025-03-23 07:38:04', '2025-03-23 07:38:04'),
(8, 8, 1, 0, '2025-03-23 07:38:04', '2025-03-23 07:38:04');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedback`
--

CREATE TABLE `feedback` (
  `id` bigint UNSIGNED NOT NULL,
  `guest_id` bigint UNSIGNED NOT NULL,
  `doctor_id` bigint UNSIGNED DEFAULT NULL,
  `service_id` bigint UNSIGNED DEFAULT NULL,
  `rating` tinyint UNSIGNED NOT NULL,
  `comments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `feedback`
--

INSERT INTO `feedback` (`id`, `guest_id`, `doctor_id`, `service_id`, `rating`, `comments`, `status`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 5, 5, 'Bác sĩ rất tận tình, giải thích rõ ràng!', 'approved', 0, '2025-03-23 08:18:40', '2025-03-23 08:18:40'),
(2, 2, 4, NULL, 4, 'Dịch vụ tốt, nhưng thời gian chờ hơi lâu.', 'approved', 0, '2025-03-23 08:18:40', '2025-03-23 08:18:40'),
(3, 3, NULL, 7, 3, 'Chất lượng dịch vụ ổn nhưng giá hơi cao.', 'pending', 0, '2025-03-23 08:18:40', '2025-03-23 08:18:40'),
(4, 4, 6, NULL, 1, 'Bác sĩ không nhiệt tình, tôi không hài lòng.', 'rejected', 0, '2025-03-23 08:18:40', '2025-03-23 08:18:40'),
(5, 5, 2, 3, 5, 'Dịch vụ rất tốt, nhân viên hỗ trợ chu đáo!', 'approved', 0, '2025-03-23 08:18:40', '2025-03-23 08:18:40'),
(6, 6, 5, 4, 2, 'Chưa hài lòng về quy trình phục vụ.', 'pending', 0, '2025-03-23 08:18:40', '2025-03-23 08:18:40'),
(7, 7, 7, 8, 4, 'Khá ổn, bác sĩ tư vấn nhiệt tình.', 'approved', 0, '2025-03-23 08:18:40', '2025-03-23 08:18:40'),
(8, 8, NULL, 2, 5, 'Dịch vụ nhanh chóng, đáng tin cậy.', 'approved', 0, '2025-03-23 08:18:40', '2025-03-23 08:18:40'),
(9, 9, 3, 6, 3, 'Bác sĩ tư vấn hơi sơ sài.', 'pending', 0, '2025-03-23 08:18:40', '2025-03-23 08:18:40'),
(10, 10, 8, NULL, 4, 'Ổn nhưng còn có thể cải thiện.', 'approved', 0, '2025-03-23 08:18:40', '2025-03-23 08:18:40'),
(11, 1, NULL, 2, 5, 'Hihi', 'pending', 0, '2025-04-23 04:33:33', '2025-04-23 04:33:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `guests`
--

CREATE TABLE `guests` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `guest_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('male','female','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `guest_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guest_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `guests`
--

INSERT INTO `guests` (`id`, `user_id`, `guest_name`, `gender`, `birthday`, `guest_phone`, `guest_email`, `address`, `file`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 11, 'Nguyễn Thị Mai', 'female', '1995-06-15', '0967891234', 'mai.nguyen@example.com', NULL, NULL, 0, '2025-03-23 07:13:49', '2025-03-23 07:13:49'),
(2, 12, 'Phạm Văn Hoàng', 'male', '1988-11-20', '0934567890', 'hoang.pham@example.com', NULL, 'files/hoang_cmnd.pdf', 0, '2025-03-23 07:13:49', '2025-03-23 07:13:49'),
(3, 13, 'Lê Thị Hạnh', 'female', '1992-08-05', '0925678901', 'hanh.le@example.com', NULL, NULL, 0, '2025-03-23 07:13:49', '2025-03-23 07:13:49'),
(4, 14, 'Trần Quốc Toàn', 'male', '1985-02-14', '0916789012', 'toan.tran@example.com', NULL, 'files/toan_bhyt.pdf', 0, '2025-03-23 07:13:49', '2025-03-23 07:13:49'),
(5, 15, 'Vũ Ngọc Bích', 'female', '1997-03-30', '0987890123', 'bich.vu@example.com', NULL, NULL, 0, '2025-03-23 07:13:49', '2025-03-23 07:13:49'),
(6, 16, 'Đỗ Văn Hải', 'male', '1989-07-25', '0978901234', 'hai.do@example.com', NULL, NULL, 0, '2025-03-23 07:13:49', '2025-03-23 07:13:49'),
(7, 17, 'Lý Minh Quang', 'male', '1993-04-10', '0901122334', 'quang.ly@example.com', NULL, 'files/quang_cmnd.pdf', 0, '2025-03-23 07:13:49', '2025-03-23 07:13:49'),
(8, 18, 'Hoàng Thanh Lan', 'female', '1990-12-01', '0961234567', 'lan.hoang@example.com', NULL, NULL, 0, '2025-03-23 07:13:49', '2025-03-23 07:13:49'),
(9, 19, 'Nguyễn Văn Tâm', 'male', '1987-09-18', '0942345678', 'tam.nguyen@example.com', NULL, NULL, 0, '2025-03-23 07:13:49', '2025-03-23 07:13:49'),
(10, 20, 'Phạm Thị Thủy', 'female', '1991-05-23', '0923456789', 'thuy.pham@example.com', NULL, 'files/thuy_bhyt.pdf', 0, '2025-03-23 07:13:49', '2025-03-23 07:13:49'),
(11, 1, 'Hưng', 'male', '2003-02-22', 'Hưng', 'hung87800@gmail.com', NULL, NULL, 0, '2025-03-30 01:38:57', '2025-04-11 05:18:51'),
(12, 1, 'Hưng', 'male', '2003-02-22', 'Hưng', 'hung87800@gmail.com', NULL, NULL, 0, '2025-03-30 01:38:57', '2025-04-11 05:18:51'),
(13, 11, 'Nam', 'male', '2000-02-22', '0238272392', 'namlon@gmail.com', NULL, NULL, 0, '2025-04-11 09:07:17', '2025-04-11 09:07:17'),
(14, 11, 'Ngọc', 'female', '2007-07-02', '0238271392', 'ngocvuto@gmail.com', NULL, NULL, 0, '2025-04-11 09:08:41', '2025-04-11 09:08:41'),
(15, 11, 'Ngọc', 'female', '2007-07-02', '0238271392', 'ngocvuto@gmail.com', NULL, NULL, 0, '2025-04-11 09:08:41', '2025-04-11 09:08:41'),
(16, 11, 'Ngọc', 'female', '2007-07-02', '0238271392', 'ngocvuto@gmail.com', NULL, NULL, 0, '2025-04-11 09:08:41', '2025-04-11 09:08:41'),
(17, 11, 'Trang', 'male', '2000-02-22', '0238272392', 'trangvuto@gmail.com', NULL, NULL, 0, '2025-04-12 06:20:07', '2025-04-12 06:20:07'),
(18, 11, 'Đào', 'female', '2000-02-22', '028239821', 'dao@gmail.com', NULL, NULL, 0, '2025-04-12 06:57:08', '2025-04-12 06:57:08'),
(19, 11, 'Tuấn Ngọc', 'male', '2000-02-02', '0934567233', 'tuanngoc@gmail.com', NULL, NULL, 0, '2025-04-23 05:13:18', '2025-04-23 05:13:18'),
(20, 11, 'Đông', 'male', '2007-01-23', '0123456789', 'dong@gmail.com', NULL, NULL, 0, '2025-04-23 15:30:41', '2025-04-23 15:30:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint UNSIGNED NOT NULL,
  `total_amount` decimal(15,0) NOT NULL,
  `discount` decimal(15,0) NOT NULL DEFAULT '0',
  `tax` decimal(15,0) NOT NULL DEFAULT '0',
  `status` enum('unpaid','paid','pending','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unpaid',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `invoices`
--

INSERT INTO `invoices` (`id`, `total_amount`, `discount`, `tax`, `status`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 300000, 0, 0, 'paid', 0, '2025-04-01 09:00:00', '2025-04-01 09:00:00'),
(2, 400000, 20000, 0, 'paid', 0, '2025-04-02 10:00:00', '2025-04-02 10:00:00'),
(3, 250000, 0, 0, 'unpaid', 0, '2025-04-03 11:00:00', '2025-04-03 11:00:00'),
(4, 350000, 0, 0, 'paid', 0, '2025-04-04 12:00:00', '2025-04-04 12:00:00'),
(5, 500000, 50000, 0, 'pending', 0, '2025-04-05 14:00:00', '2025-04-05 14:00:00'),
(6, 400000, 0, 0, 'paid', 0, '2025-04-06 15:00:00', '2025-04-06 15:00:00'),
(7, 250000, 0, 0, 'paid', 0, '2025-04-07 16:00:00', '2025-04-07 16:00:00'),
(8, 300000, 0, 0, 'paid', 0, '2025-04-08 17:00:00', '2025-04-08 17:00:00'),
(9, 350000, 0, 0, 'paid', 0, '2025-04-09 09:00:00', '2025-04-09 09:00:00'),
(10, 400000, 0, 0, 'paid', 0, '2025-04-10 10:00:00', '2025-04-10 10:00:00'),
(11, 320000, 0, 0, 'paid', 0, '2025-04-11 11:00:00', '2025-04-11 11:00:00'),
(12, 370000, 0, 0, 'paid', 0, '2025-04-12 12:00:00', '2025-04-12 12:00:00'),
(13, 280000, 0, 0, 'paid', 0, '2025-04-13 13:00:00', '2025-04-13 13:00:00'),
(14, 600000, 0, 0, 'paid', 0, '2025-04-14 14:00:00', '2025-04-14 14:00:00'),
(15, 450000, 0, 0, 'paid', 0, '2025-04-15 15:00:00', '2025-04-15 15:00:00'),
(16, 200000, 0, 0, 'paid', 0, '2025-04-16 16:00:00', '2025-04-16 16:00:00'),
(17, 500000, 0, 0, 'paid', 0, '2025-04-17 08:30:00', '2025-04-17 08:30:00'),
(18, 550000, 0, 0, 'paid', 0, '2025-04-18 09:30:00', '2025-04-18 09:30:00'),
(19, 300000, 0, 0, 'paid', 0, '2025-04-19 10:30:00', '2025-04-19 10:30:00'),
(20, 400000, 0, 0, 'paid', 0, '2025-04-20 11:30:00', '2025-04-20 11:30:00'),
(21, 300000, 0, 0, 'paid', 0, '2025-04-21 13:00:00', '2025-04-21 13:00:00'),
(22, 400000, 0, 0, 'paid', 0, '2025-04-22 14:00:00', '2025-04-22 14:00:00'),
(23, 250000, 0, 0, 'paid', 0, '2025-04-23 15:00:00', '2025-04-23 15:00:00'),
(24, 350000, 0, 0, 'paid', 0, '2025-04-24 16:00:00', '2025-04-24 16:00:00'),
(25, 500000, 0, 0, 'paid', 0, '2025-04-25 08:00:00', '2025-04-25 08:00:00'),
(26, 400000, 0, 0, 'paid', 0, '2025-04-26 09:00:00', '2025-04-26 09:00:00'),
(27, 250000, 0, 0, 'paid', 0, '2025-04-27 10:00:00', '2025-04-27 10:00:00'),
(28, 300000, 0, 0, 'paid', 0, '2025-04-28 11:00:00', '2025-04-28 11:00:00'),
(29, 350000, 0, 0, 'paid', 0, '2025-04-29 13:00:00', '2025-04-29 13:00:00'),
(30, 400000, 0, 0, 'paid', 0, '2025-04-30 14:00:00', '2025-04-30 14:00:00'),
(31, 320000, 0, 0, 'paid', 0, '2025-05-01 15:00:00', '2025-05-01 15:00:00'),
(32, 370000, 0, 0, 'paid', 0, '2025-05-02 16:00:00', '2025-05-02 16:00:00'),
(33, 280000, 0, 0, 'paid', 0, '2025-05-03 08:00:00', '2025-05-03 08:00:00'),
(34, 600000, 0, 0, 'paid', 0, '2025-05-04 09:00:00', '2025-05-04 09:00:00'),
(35, 450000, 0, 0, 'paid', 0, '2025-05-05 10:00:00', '2025-05-05 10:00:00'),
(36, 200000, 0, 0, 'paid', 0, '2025-05-06 11:00:00', '2025-05-06 11:00:00'),
(37, 500000, 0, 0, 'paid', 0, '2025-05-07 13:00:00', '2025-05-07 13:00:00'),
(38, 550000, 0, 0, 'paid', 0, '2025-05-08 14:00:00', '2025-05-08 14:00:00'),
(39, 300000, 0, 0, 'paid', 0, '2025-05-09 15:00:00', '2025-05-09 15:00:00'),
(40, 400000, 0, 0, 'paid', 0, '2025-05-10 16:00:00', '2025-05-10 16:00:00'),
(41, 300000, 0, 0, 'paid', 0, '2025-05-11 08:00:00', '2025-05-11 08:00:00'),
(42, 400000, 0, 0, 'paid', 0, '2025-05-12 09:00:00', '2025-05-12 09:00:00'),
(43, 250000, 0, 0, 'paid', 0, '2025-05-13 10:00:00', '2025-05-13 10:00:00'),
(44, 350000, 0, 0, 'paid', 0, '2025-05-14 11:00:00', '2025-05-14 11:00:00'),
(45, 500000, 0, 0, 'paid', 0, '2025-05-15 13:00:00', '2025-05-15 13:00:00'),
(46, 400000, 0, 0, 'paid', 0, '2025-05-16 14:00:00', '2025-05-16 14:00:00'),
(47, 250000, 0, 0, 'paid', 0, '2025-05-17 15:00:00', '2025-05-17 15:00:00'),
(48, 300000, 0, 0, 'paid', 0, '2025-05-18 16:00:00', '2025-05-18 16:00:00'),
(49, 350000, 0, 0, 'paid', 0, '2025-05-19 08:00:00', '2025-05-19 08:00:00'),
(50, 400000, 0, 0, 'paid', 0, '2025-05-20 09:00:00', '2025-05-20 09:00:00'),
(51, 320000, 0, 0, 'paid', 0, '2025-05-21 10:00:00', '2025-05-21 10:00:00'),
(52, 370000, 0, 0, 'paid', 0, '2025-05-22 11:00:00', '2025-05-22 11:00:00'),
(53, 280000, 0, 0, 'paid', 0, '2025-05-23 13:00:00', '2025-05-23 13:00:00'),
(54, 600000, 0, 0, 'paid', 0, '2025-05-24 14:00:00', '2025-05-24 14:00:00'),
(55, 450000, 0, 0, 'paid', 0, '2025-05-25 15:00:00', '2025-05-25 15:00:00'),
(56, 200000, 0, 0, 'paid', 0, '2025-05-26 16:00:00', '2025-05-26 16:00:00'),
(57, 500000, 0, 0, 'paid', 0, '2025-05-27 08:00:00', '2025-05-27 08:00:00'),
(58, 550000, 0, 0, 'paid', 0, '2025-05-28 09:00:00', '2025-05-28 09:00:00'),
(59, 300000, 0, 0, 'paid', 0, '2025-05-29 10:00:00', '2025-05-29 10:00:00'),
(60, 400000, 0, 0, 'paid', 0, '2025-05-30 11:00:00', '2025-05-30 11:00:00'),
(61, 300000, 0, 0, 'paid', 0, '2025-06-01 13:00:00', '2025-06-01 13:00:00'),
(62, 400000, 0, 0, 'paid', 0, '2025-06-02 14:00:00', '2025-06-02 14:00:00'),
(63, 250000, 0, 0, 'paid', 0, '2025-06-03 15:00:00', '2025-06-03 15:00:00'),
(64, 350000, 0, 0, 'paid', 0, '2025-06-04 16:00:00', '2025-06-04 16:00:00'),
(65, 500000, 0, 0, 'paid', 0, '2025-06-05 08:00:00', '2025-06-05 08:00:00'),
(66, 400000, 0, 0, 'paid', 0, '2025-06-06 09:00:00', '2025-06-06 09:00:00'),
(67, 250000, 0, 0, 'paid', 0, '2025-06-07 10:00:00', '2025-06-07 10:00:00'),
(68, 300000, 0, 0, 'paid', 0, '2025-06-08 11:00:00', '2025-06-08 11:00:00'),
(69, 350000, 0, 0, 'paid', 0, '2025-06-09 13:00:00', '2025-06-09 13:00:00'),
(70, 400000, 0, 0, 'paid', 0, '2025-06-10 14:00:00', '2025-06-10 14:00:00'),
(71, 320000, 0, 0, 'paid', 0, '2025-06-11 15:00:00', '2025-06-11 15:00:00'),
(72, 370000, 0, 0, 'paid', 0, '2025-06-12 16:00:00', '2025-06-12 16:00:00'),
(73, 280000, 0, 0, 'paid', 0, '2025-06-13 08:00:00', '2025-06-13 08:00:00'),
(74, 600000, 0, 0, 'paid', 0, '2025-06-14 09:00:00', '2025-06-14 09:00:00'),
(75, 450000, 0, 0, 'paid', 0, '2025-06-15 10:00:00', '2025-06-15 10:00:00'),
(76, 200000, 0, 0, 'paid', 0, '2025-06-16 11:00:00', '2025-06-16 11:00:00'),
(77, 500000, 0, 0, 'paid', 0, '2025-06-17 13:00:00', '2025-06-17 13:00:00'),
(78, 550000, 0, 0, 'paid', 0, '2025-06-18 14:00:00', '2025-06-18 14:00:00'),
(79, 300000, 0, 0, 'paid', 0, '2025-06-19 15:00:00', '2025-06-19 15:00:00'),
(80, 400000, 0, 0, 'paid', 0, '2025-06-20 16:00:00', '2025-06-20 16:00:00'),
(81, 300000, 0, 0, 'paid', 0, '2025-06-21 08:00:00', '2025-06-21 08:00:00'),
(82, 400000, 0, 0, 'paid', 0, '2025-06-22 09:00:00', '2025-06-22 09:00:00'),
(83, 250000, 0, 0, 'paid', 0, '2025-06-23 10:00:00', '2025-06-23 10:00:00'),
(84, 350000, 0, 0, 'paid', 0, '2025-06-24 11:00:00', '2025-06-24 11:00:00'),
(85, 500000, 0, 0, 'paid', 0, '2025-06-25 13:00:00', '2025-06-25 13:00:00'),
(86, 400000, 0, 0, 'paid', 0, '2025-06-26 14:00:00', '2025-06-26 14:00:00'),
(87, 250000, 0, 0, 'paid', 0, '2025-06-27 15:00:00', '2025-06-27 15:00:00'),
(88, 300000, 0, 0, 'paid', 0, '2025-06-28 16:00:00', '2025-06-28 16:00:00'),
(89, 350000, 0, 0, 'paid', 0, '2025-06-29 08:00:00', '2025-06-29 08:00:00'),
(90, 400000, 0, 0, 'paid', 0, '2025-06-30 09:00:00', '2025-06-30 09:00:00'),
(91, 320000, 0, 0, 'paid', 0, '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
(92, 370000, 0, 0, 'paid', 0, '2025-07-02 11:00:00', '2025-07-02 11:00:00'),
(93, 280000, 0, 0, 'paid', 0, '2025-07-03 13:00:00', '2025-07-03 13:00:00'),
(94, 600000, 0, 0, 'paid', 0, '2025-07-04 14:00:00', '2025-07-04 14:00:00'),
(95, 450000, 0, 0, 'paid', 0, '2025-07-05 15:00:00', '2025-07-05 15:00:00'),
(96, 200000, 0, 0, 'paid', 0, '2025-07-06 16:00:00', '2025-07-06 16:00:00'),
(97, 500000, 0, 0, 'paid', 0, '2025-07-07 08:00:00', '2025-07-07 08:00:00'),
(98, 550000, 0, 0, 'paid', 0, '2025-07-08 09:00:00', '2025-07-08 09:00:00'),
(99, 300000, 0, 0, 'paid', 0, '2025-07-09 10:00:00', '2025-07-09 10:00:00'),
(100, 400000, 0, 0, 'paid', 0, '2025-07-10 11:00:00', '2025-07-10 11:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoice_details`
--

CREATE TABLE `invoice_details` (
  `id` bigint UNSIGNED NOT NULL,
  `invoice_id` bigint UNSIGNED NOT NULL,
  `booking_id` bigint UNSIGNED NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `invoice_details`
--

INSERT INTO `invoice_details` (`id`, `invoice_id`, `booking_id`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 0, '2025-04-01 09:00:00', '2025-04-01 09:00:00'),
(2, 2, 2, 0, '2025-04-02 10:00:00', '2025-04-02 10:00:00'),
(3, 3, 3, 0, '2025-04-03 11:00:00', '2025-04-03 11:00:00'),
(4, 4, 4, 0, '2025-04-04 12:00:00', '2025-04-04 12:00:00'),
(5, 5, 5, 0, '2025-04-05 14:00:00', '2025-04-05 14:00:00'),
(6, 6, 6, 0, '2025-04-06 15:00:00', '2025-04-06 15:00:00'),
(7, 7, 7, 0, '2025-04-07 16:00:00', '2025-04-07 16:00:00'),
(8, 8, 8, 0, '2025-04-08 17:00:00', '2025-04-08 17:00:00'),
(9, 9, 9, 0, '2025-04-09 09:00:00', '2025-04-09 09:00:00'),
(10, 10, 10, 0, '2025-04-10 10:00:00', '2025-04-10 10:00:00'),
(11, 11, 11, 0, '2025-04-11 11:00:00', '2025-04-11 11:00:00'),
(12, 12, 12, 0, '2025-04-12 12:00:00', '2025-04-12 12:00:00'),
(13, 13, 13, 0, '2025-04-13 13:00:00', '2025-04-13 13:00:00'),
(14, 14, 14, 0, '2025-04-14 14:00:00', '2025-04-14 14:00:00'),
(15, 15, 15, 0, '2025-04-15 15:00:00', '2025-04-15 15:00:00'),
(16, 16, 16, 0, '2025-04-16 16:00:00', '2025-04-16 16:00:00'),
(17, 17, 17, 0, '2025-04-17 08:30:00', '2025-04-17 08:30:00'),
(18, 18, 18, 0, '2025-04-18 09:30:00', '2025-04-18 09:30:00'),
(19, 19, 19, 0, '2025-04-19 10:30:00', '2025-04-19 10:30:00'),
(20, 20, 20, 0, '2025-04-20 11:30:00', '2025-04-20 11:30:00'),
(21, 21, 21, 0, '2025-04-21 13:00:00', '2025-04-21 13:00:00'),
(22, 22, 22, 0, '2025-04-22 14:00:00', '2025-04-22 14:00:00'),
(23, 23, 23, 0, '2025-04-23 15:00:00', '2025-04-23 15:00:00'),
(24, 24, 24, 0, '2025-04-24 16:00:00', '2025-04-24 16:00:00'),
(25, 25, 25, 0, '2025-04-25 08:00:00', '2025-04-25 08:00:00'),
(26, 26, 26, 0, '2025-04-26 09:00:00', '2025-04-26 09:00:00'),
(27, 27, 27, 0, '2025-04-27 10:00:00', '2025-04-27 10:00:00'),
(28, 28, 28, 0, '2025-04-28 11:00:00', '2025-04-28 11:00:00'),
(29, 29, 29, 0, '2025-04-29 13:00:00', '2025-04-29 13:00:00'),
(30, 30, 30, 0, '2025-04-30 14:00:00', '2025-04-30 14:00:00'),
(31, 31, 31, 0, '2025-05-01 15:00:00', '2025-05-01 15:00:00'),
(32, 32, 32, 0, '2025-05-02 16:00:00', '2025-05-02 16:00:00'),
(33, 33, 33, 0, '2025-05-03 08:00:00', '2025-05-03 08:00:00'),
(34, 34, 34, 0, '2025-05-04 09:00:00', '2025-05-04 09:00:00'),
(35, 35, 35, 0, '2025-05-05 10:00:00', '2025-05-05 10:00:00'),
(36, 36, 36, 0, '2025-05-06 11:00:00', '2025-05-06 11:00:00'),
(37, 37, 37, 0, '2025-05-07 13:00:00', '2025-05-07 13:00:00'),
(38, 38, 38, 0, '2025-05-08 14:00:00', '2025-05-08 14:00:00'),
(39, 39, 39, 0, '2025-05-09 15:00:00', '2025-05-09 15:00:00'),
(40, 40, 40, 0, '2025-05-10 16:00:00', '2025-05-10 16:00:00'),
(41, 41, 41, 0, '2025-05-11 08:00:00', '2025-05-11 08:00:00'),
(42, 42, 42, 0, '2025-05-12 09:00:00', '2025-05-12 09:00:00'),
(43, 43, 43, 0, '2025-05-13 10:00:00', '2025-05-13 10:00:00'),
(44, 44, 44, 0, '2025-05-14 11:00:00', '2025-05-14 11:00:00'),
(45, 45, 45, 0, '2025-05-15 13:00:00', '2025-05-15 13:00:00'),
(46, 46, 46, 0, '2025-05-16 14:00:00', '2025-05-16 14:00:00'),
(47, 47, 47, 0, '2025-05-17 15:00:00', '2025-05-17 15:00:00'),
(48, 48, 48, 0, '2025-05-18 16:00:00', '2025-05-18 16:00:00'),
(49, 49, 49, 0, '2025-05-19 08:00:00', '2025-05-19 08:00:00'),
(50, 50, 50, 0, '2025-05-20 09:00:00', '2025-05-20 09:00:00'),
(51, 51, 51, 0, '2025-05-21 10:00:00', '2025-05-21 10:00:00'),
(52, 52, 52, 0, '2025-05-22 11:00:00', '2025-05-22 11:00:00'),
(53, 53, 53, 0, '2025-05-23 13:00:00', '2025-05-23 13:00:00'),
(54, 54, 54, 0, '2025-05-24 14:00:00', '2025-05-24 14:00:00'),
(55, 55, 55, 0, '2025-05-25 15:00:00', '2025-05-25 15:00:00'),
(56, 56, 56, 0, '2025-05-26 16:00:00', '2025-05-26 16:00:00'),
(57, 57, 57, 0, '2025-05-27 08:00:00', '2025-05-27 08:00:00'),
(58, 58, 58, 0, '2025-05-28 09:00:00', '2025-05-28 09:00:00'),
(59, 59, 59, 0, '2025-05-29 10:00:00', '2025-05-29 10:00:00'),
(60, 60, 60, 0, '2025-05-30 11:00:00', '2025-05-30 11:00:00'),
(61, 61, 61, 0, '2025-06-01 13:00:00', '2025-06-01 13:00:00'),
(62, 62, 62, 0, '2025-06-02 14:00:00', '2025-06-02 14:00:00'),
(63, 63, 63, 0, '2025-06-03 15:00:00', '2025-06-03 15:00:00'),
(64, 64, 64, 0, '2025-06-04 16:00:00', '2025-06-04 16:00:00'),
(65, 65, 65, 0, '2025-06-05 08:00:00', '2025-06-05 08:00:00'),
(66, 66, 66, 0, '2025-06-06 09:00:00', '2025-06-06 09:00:00'),
(67, 67, 67, 0, '2025-06-07 10:00:00', '2025-06-07 10:00:00'),
(68, 68, 68, 0, '2025-06-08 11:00:00', '2025-06-08 11:00:00'),
(69, 69, 69, 0, '2025-06-09 13:00:00', '2025-06-09 13:00:00'),
(70, 70, 70, 0, '2025-06-10 14:00:00', '2025-06-10 14:00:00'),
(71, 71, 71, 0, '2025-06-11 15:00:00', '2025-06-11 15:00:00'),
(72, 72, 72, 0, '2025-06-12 16:00:00', '2025-06-12 16:00:00'),
(73, 73, 73, 0, '2025-06-13 08:00:00', '2025-06-13 08:00:00'),
(74, 74, 74, 0, '2025-06-14 09:00:00', '2025-06-14 09:00:00'),
(75, 75, 75, 0, '2025-06-15 10:00:00', '2025-06-15 10:00:00'),
(76, 76, 76, 0, '2025-06-16 11:00:00', '2025-06-16 11:00:00'),
(77, 77, 77, 0, '2025-06-17 13:00:00', '2025-06-17 13:00:00'),
(78, 78, 78, 0, '2025-06-18 14:00:00', '2025-06-18 14:00:00'),
(79, 79, 79, 0, '2025-06-19 15:00:00', '2025-06-19 15:00:00'),
(80, 80, 80, 0, '2025-06-20 16:00:00', '2025-06-20 16:00:00'),
(81, 81, 81, 0, '2025-06-21 08:00:00', '2025-06-21 08:00:00'),
(82, 82, 82, 0, '2025-06-22 09:00:00', '2025-06-22 09:00:00'),
(83, 83, 83, 0, '2025-06-23 10:00:00', '2025-06-23 10:00:00'),
(84, 84, 84, 0, '2025-06-24 11:00:00', '2025-06-24 11:00:00'),
(85, 85, 85, 0, '2025-06-25 13:00:00', '2025-06-25 13:00:00'),
(86, 86, 86, 0, '2025-06-26 14:00:00', '2025-06-26 14:00:00'),
(87, 87, 87, 0, '2025-06-27 15:00:00', '2025-06-27 15:00:00'),
(88, 88, 88, 0, '2025-06-28 16:00:00', '2025-06-28 16:00:00'),
(89, 89, 89, 0, '2025-06-29 08:00:00', '2025-06-29 08:00:00'),
(90, 90, 90, 0, '2025-06-30 09:00:00', '2025-06-30 09:00:00'),
(91, 91, 91, 0, '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
(92, 92, 92, 0, '2025-07-02 11:00:00', '2025-07-02 11:00:00'),
(93, 93, 93, 0, '2025-07-03 13:00:00', '2025-07-03 13:00:00'),
(94, 94, 94, 0, '2025-07-04 14:00:00', '2025-07-04 14:00:00'),
(95, 95, 95, 0, '2025-07-05 15:00:00', '2025-07-05 15:00:00'),
(96, 96, 96, 0, '2025-07-06 16:00:00', '2025-07-06 16:00:00'),
(97, 97, 97, 0, '2025-07-07 08:00:00', '2025-07-07 08:00:00'),
(98, 98, 98, 0, '2025-07-08 09:00:00', '2025-07-08 09:00:00'),
(99, 99, 99, 0, '2025-07-09 10:00:00', '2025-07-09 10:00:00'),
(100, 100, 100, 0, '2025-07-10 11:00:00', '2025-07-10 11:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `medical_records`
--

CREATE TABLE `medical_records` (
  `id` bigint UNSIGNED NOT NULL,
  `guest_id` bigint UNSIGNED NOT NULL,
  `BHYT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medical_condition` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `medications` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `allergies` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `family_history` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `treatment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `medical_records`
--

INSERT INTO `medical_records` (`id`, `guest_id`, `BHYT`, `medical_condition`, `medications`, `allergies`, `family_history`, `treatment`, `note`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'BHYT123456', 'Viêm dạ dày mãn tính', 'Omeprazole, Sucralfate', 'Không có', 'Tiền sử đau dạ dày từ mẹ', 'Sử dụng thuốc giảm tiết axit, theo dõi chế độ ăn', 'Cần kiểm tra lại sau 6 tháng', 0, '2025-03-23 07:14:37', '2025-03-23 07:14:37'),
(2, 2, NULL, 'Tăng huyết áp', 'Amlodipine, Enalapril', 'Dị ứng Penicillin', 'Bố có tiền sử cao huyết áp', 'Dùng thuốc kiểm soát huyết áp, theo dõi định kỳ', 'Huyết áp chưa ổn định, cần tái khám sau 1 tháng', 0, '2025-03-23 07:14:37', '2025-03-23 07:14:37'),
(3, 3, 'BHYT789012', 'Tiểu đường tuýp 2', 'Metformin', 'Không có', 'Ông nội có tiểu đường', 'Kiểm soát đường huyết bằng thuốc và chế độ ăn', 'Đường huyết tương đối ổn định', 0, '2025-03-23 07:14:37', '2025-03-23 07:14:37'),
(4, 4, NULL, 'Dị ứng thời tiết', 'Thuốc kháng histamin', 'Phấn hoa, lông mèo', 'Không có', 'Tránh tiếp xúc với tác nhân gây dị ứng', 'Đã cải thiện, tiếp tục theo dõi', 0, '2025-03-23 07:14:37', '2025-03-23 07:14:37'),
(5, 5, 'BHYT456789', 'Viêm phổi', 'Amoxicillin, Paracetamol', 'Không có', 'Không có', 'Dùng kháng sinh 7 ngày, nghỉ ngơi', 'Đã hồi phục nhưng cần tăng cường sức đề kháng', 0, '2025-03-23 07:14:37', '2025-03-23 07:14:37'),
(6, 6, NULL, 'Thoái hóa khớp gối', 'Glucosamine, Paracetamol', 'Không có', 'Bố bị thoái hóa khớp', 'Tập vật lý trị liệu, dùng thuốc giảm đau', 'Đề xuất điều trị kéo dài', 0, '2025-03-23 07:14:37', '2025-03-23 07:14:37'),
(7, 7, 'BHYT567890', 'Viêm gan B', 'Tenofovir', 'Không có', 'Không có', 'Uống thuốc theo chỉ định, theo dõi men gan', 'Men gan giảm, tiếp tục theo dõi 3 tháng/lần', 0, '2025-03-23 07:14:37', '2025-03-23 07:14:37'),
(8, 8, NULL, 'Hen suyễn', 'Salbutamol, Corticosteroid', 'Khói bụi, phấn hoa', 'Bố mẹ không có bệnh này', 'Dùng thuốc cắt cơn, tránh tác nhân kích thích', 'Cơn hen ổn định, tiếp tục dùng thuốc định kỳ', 0, '2025-03-23 07:14:37', '2025-03-23 07:14:37'),
(9, 9, 'BHYT678901', 'Đau thắt ngực', 'Nitroglycerin', 'Dị ứng Aspirin', 'Bố có tiền sử bệnh tim', 'Dùng thuốc giãn mạch, kiểm soát cholesterol', 'Cần kiểm tra ECG định kỳ', 0, '2025-03-23 07:14:37', '2025-03-23 07:14:37'),
(10, 10, NULL, 'Suy nhược cơ thể', 'Vitamin tổng hợp', 'Không có', 'Không có', 'Bổ sung dinh dưỡng, tập luyện thể thao', 'Cần tăng cường nghỉ ngơi', 0, '2025-03-23 07:14:37', '2025-03-23 07:14:37'),
(11, 11, 'BHYT001', 'Khám sức khỏe định kỳ, bình thường', 'Không cần thuốc', NULL, NULL, NULL, 'Không vấn đề sức khỏe', 0, '2025-04-01 08:30:00', '2025-04-01 09:00:00'),
(12, 12, 'BHYT002', 'Đau ngực nhẹ', 'Aspirin 81mg', NULL, NULL, NULL, 'Theo dõi huyết áp tại nhà', 0, '2025-04-02 09:30:00', '2025-04-02 10:00:00'),
(13, 13, 'BHYT003', 'Sốt nhẹ, cảm cúm', 'Paracetamol 500mg', NULL, NULL, NULL, 'Uống nhiều nước, nghỉ ngơi', 0, '2025-04-03 10:30:00', '2025-04-03 11:00:00'),
(14, 14, 'BHYT004', 'Nổi mẩn đỏ, viêm da dị ứng', 'Thuốc bôi ngoài da', NULL, NULL, NULL, 'Tránh tiếp xúc dị nguyên', 0, '2025-04-04 11:30:00', '2025-04-04 12:00:00'),
(15, 15, 'BHYT005', 'Đau đầu gối, viêm khớp nhẹ', 'Glucosamin', NULL, NULL, NULL, 'Tập vật lý trị liệu', 0, '2025-04-05 13:30:00', '2025-04-05 14:00:00'),
(16, 16, 'BHYT006', 'Khó thở, tăng huyết áp', 'Thuốc hạ áp', NULL, NULL, NULL, 'Ăn nhạt, theo dõi huyết áp', 0, '2025-04-06 14:30:00', '2025-04-06 15:00:00'),
(17, 17, 'BHYT007', 'Ho kéo dài, viêm phế quản', 'Kháng sinh', NULL, NULL, NULL, 'Uống nhiều nước, nghỉ ngơi', 0, '2025-04-07 15:30:00', '2025-04-07 16:00:00'),
(18, 18, 'BHYT008', 'Khám sức khỏe tổng quát', NULL, NULL, NULL, NULL, 'Sức khỏe tốt', 0, '2025-04-08 16:30:00', '2025-04-08 17:00:00'),
(19, 19, 'BHYT009', 'Đau bụng, rối loạn tiêu hóa', 'Men tiêu hóa', NULL, NULL, NULL, 'Ăn chín uống sôi', 0, '2025-04-09 08:30:00', '2025-04-09 09:00:00'),
(20, 20, 'BHYT010', 'Tiểu buốt, viêm tiết niệu', 'Kháng sinh', NULL, NULL, NULL, 'Uống nhiều nước', 0, '2025-04-10 09:30:00', '2025-04-10 10:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `id` bigint UNSIGNED NOT NULL,
  `conversation_id` bigint UNSIGNED NOT NULL,
  `sender_id` bigint UNSIGNED NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 11, 'chào', '2025-04-23 04:40:16', '2025-04-23 04:40:16'),
(2, 1, 11, 'chào', '2025-04-23 04:40:19', '2025-04-23 04:40:19'),
(3, 1, 11, 'xin chào', '2025-04-23 14:27:56', '2025-04-23 14:27:56'),
(4, 1, 11, 'xin chào', '2025-04-23 14:27:59', '2025-04-23 14:27:59'),
(5, 1, 1, 'chào bạn', '2025-04-23 14:28:29', '2025-04-23 14:28:29'),
(6, 1, 11, 'Hi', '2025-04-23 15:54:26', '2025-04-23 15:54:26'),
(7, 1, 1, 'Chào bạn', '2025-04-23 15:54:34', '2025-04-23 15:54:34'),
(8, 2, 12, 'Em chào anh ạ em bị đau dạ dày', '2025-05-03 02:45:46', '2025-05-03 02:45:46'),
(9, 2, 12, 'Em chào anh ạ em bị đau dạ dày', '2025-05-03 02:45:49', '2025-05-03 02:45:49'),
(10, 2, 12, 'Anh ơi', '2025-05-03 02:45:58', '2025-05-03 02:45:58'),
(11, 3, 13, 'Em chào admin ạ', '2025-05-03 02:47:29', '2025-05-03 02:47:29'),
(12, 2, 1, 'Dạ triệu chứng của mình bị như nào vậy ạ', '2025-05-03 02:48:20', '2025-05-03 02:48:20'),
(13, 3, 1, 'Dạ chị đang cần hỗ trợ gì vậy ạ', '2025-05-03 02:48:53', '2025-05-03 02:48:53'),
(14, 2, 12, 'Em bị đầy hơi buồn nôn với ợ chua anh ạ', '2025-05-03 02:50:57', '2025-05-03 02:50:57'),
(15, 1, 11, 'Bác sĩ đang nhắn với em đúng không ạ', '2025-05-03 02:51:27', '2025-05-03 02:51:27'),
(16, 1, 1, 'Dạ không ạ em là nhân viên tư vấn thôi ạ', '2025-05-03 02:55:10', '2025-05-03 02:55:10'),
(17, 3, 13, 'Lưng em bị đau mấy ngày hôm nay rồi ạ chân tay mềm nhũn thì nên khám ở khoa nào ạ', '2025-05-03 02:57:24', '2025-05-03 02:57:24'),
(18, 3, 1, 'Vậy thì chị nên khám ở khoa xương khớp ạ', '2025-05-03 02:59:07', '2025-05-03 02:59:07'),
(19, 3, 1, 'http://localhost:3000/detail-service/5', '2025-05-03 02:59:13', '2025-05-03 02:59:13'),
(20, 3, 13, 'Dạ dạ em cảm ơn ạ', '2025-05-03 02:59:36', '2025-05-03 02:59:36'),
(21, 4, 14, 'Em cần hỗ trợ với ạ', '2025-05-03 03:03:11', '2025-05-03 03:03:11'),
(22, 4, 1, 'Dạ anh gặp phải vấn đề gì vậy ạ', '2025-05-03 03:38:00', '2025-05-03 03:38:00'),
(23, 4, 14, 'Mấy hôm nay em bị tức ngực khó thở ạ', '2025-05-03 03:38:20', '2025-05-03 03:38:20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_01_16_011124_create_systems_table', 1),
(6, '2025_01_16_012413_create_specialties_table', 1),
(7, '2025_01_16_012424_create_categories_table', 1),
(8, '2025_01_16_020329_create_doctors_table', 1),
(9, '2025_01_16_042729_create_guests_table', 1),
(10, '2025_01_16_043000_create_medical_records_table', 1),
(11, '2025_01_16_043317_create_services_table', 1),
(12, '2025_01_16_044430_create_bookings_table', 1),
(13, '2025_01_16_044558_create_results_table', 1),
(14, '2025_01_16_044951_create_notifications_table', 1),
(15, '2025_01_16_072043_create_doctor_specialties_table', 1),
(16, '2025_01_16_072252_create_schedules_table', 1),
(17, '2025_01_16_074259_create_invoices_table', 1),
(18, '2025_01_16_074715_create_invoice_details_table', 1),
(19, '2025_01_16_075219_create_posts_table', 1),
(20, '2025_01_16_075549_create_feedback_table', 1),
(21, '2025_02_20_155952_add_is_deleted_to_doctors_table', 1),
(22, '2025_02_27_141131_add_is_deleted_to_bookings_table', 1),
(23, '2025_02_28_151420_add_is_deleted_to_services_table', 1),
(24, '2025_03_08_134224_add_image_to_services_table', 1),
(25, '2025_03_08_161835_add_is_deleted_to_specialties', 1),
(26, '2025_03_08_164050_add_is_deleted_to_categories', 1),
(27, '2025_03_10_070935_add_is_deleted_to_schedules', 1),
(28, '2025_03_10_093219_add_is_deleted_to_doctor_specialties', 1),
(29, '2025_03_10_093604_add_is_deleted_to_feedback', 1),
(30, '2025_03_10_093752_add_is_deleted_to_guests', 1),
(31, '2025_03_10_093858_add_is_deleted_to_invoices', 1),
(32, '2025_03_10_094302_add_is_deleted_to_invoice_details', 1),
(33, '2025_03_10_094435_add_is_deleted_to_medical_records', 1),
(34, '2025_03_10_094922_add_is_deleted_to_notifications', 1),
(35, '2025_03_10_095039_add_is_deleted_to_posts', 1),
(36, '2025_03_10_095220_add_is_deleted_to_results', 1),
(37, '2025_03_10_095603_add_is_deleted_to_systems', 1),
(38, '2025_03_10_095714_add_is_deleted_to_users', 1),
(39, '2025_03_11_142031_alter_guests_table_make_user_id_nullable', 1),
(40, '2025_03_11_163540_create_doctor_service_table', 1),
(41, '2025_03_17_093730_add_is_deleted_to_doctor_service_table', 1),
(42, '2025_03_27_084452_add_image_to_posts_table', 2),
(43, '2025_03_30_063904_add_firebase_token_to_users_table', 3),
(44, '2025_04_05_231047_remove_category_id_from_services_table', 4),
(45, '2025_04_06_224937_change_address_column_in_guests_table', 4),
(46, '2025_04_13_203905_create_conversations_table', 5),
(47, '2025_04_13_203906_create_messages_table', 5),
(48, '2025_04_14_232303_update_role_column_in_users_table', 6),
(49, '2025_04_15_002919_add_site_video_to_systems_table', 6),
(50, '2025_04_16_145853_add_status_to_invoices_table', 7),
(51, '2025_04_19_205432_add_service_info_to_bookings_table', 8),
(52, '2025_04_22_121720_create_jobs_table', 9);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `booking_id` bigint UNSIGNED DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `booking_id`, `title`, `content`, `type`, `is_read`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:08', '2025-05-09 05:43:08'),
(2, 2, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:10', '2025-05-09 05:43:10'),
(3, 31, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:10', '2025-05-09 05:43:10'),
(4, 3, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:12', '2025-05-09 05:43:12'),
(5, 4, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:23', '2025-05-09 05:43:23'),
(6, 5, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:25', '2025-05-09 05:43:25'),
(7, 6, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:27', '2025-05-09 05:43:27'),
(8, 7, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:28', '2025-05-09 05:43:28'),
(9, 8, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:30', '2025-05-09 05:43:30'),
(10, 9, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:31', '2025-05-09 05:43:31'),
(11, 10, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:33', '2025-05-09 05:43:33'),
(12, 33, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:36', '2025-05-09 05:43:36'),
(13, 11, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:38', '2025-05-09 05:43:38'),
(14, 12, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:43', '2025-05-09 05:43:43'),
(15, 13, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:45', '2025-05-09 05:43:45'),
(16, 14, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:46', '2025-05-09 05:43:46'),
(17, 15, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:48', '2025-05-09 05:43:48'),
(18, 16, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:50', '2025-05-09 05:43:50'),
(19, 17, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:51', '2025-05-09 05:43:51'),
(20, 18, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:53', '2025-05-09 05:43:53'),
(21, 19, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:54', '2025-05-09 05:43:54'),
(22, 20, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:56', '2025-05-09 05:43:56'),
(23, 21, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:57', '2025-05-09 05:43:57'),
(24, 22, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:43:59', '2025-05-09 05:43:59'),
(25, 23, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:44:01', '2025-05-09 05:44:01'),
(26, 24, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:44:02', '2025-05-09 05:44:02'),
(27, 25, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:44:04', '2025-05-09 05:44:04'),
(28, 26, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:44:06', '2025-05-09 05:44:06'),
(29, 27, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:44:08', '2025-05-09 05:44:08'),
(30, 28, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:44:09', '2025-05-09 05:44:09'),
(31, 29, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:44:11', '2025-05-09 05:44:11'),
(32, 30, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:44:12', '2025-05-09 05:44:12'),
(33, 32, NULL, '<p>Xin chào</p>', '<p>Chào mừng đến với Quick Care</p>', 'notify', 0, 0, '2025-05-09 05:44:14', '2025-05-09 05:44:14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('hung87800@gmail.com', '$2y$10$a/XJ8/wOpuO2O9YelxlRdO9UIIrQ8FrUqvKj1Vj.g8yvzf9RsrXdi', '2025-03-31 05:20:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 4, 'auth_token', 'a4a54737715ff7652c33f7e9c47ca208ff83da62d3eff0ee566e7454f4098e1c', '[\"*\"]', '2025-03-23 01:32:39', NULL, '2025-03-23 01:31:02', '2025-03-23 01:32:39'),
(2, 'App\\Models\\User', 4, 'auth_token', '2394e81cf6215e96cdb1cc45ad2b617a124b2b03d716984b3e5b77fbaa90db9a', '[\"*\"]', NULL, NULL, '2025-03-23 18:47:28', '2025-03-23 18:47:28'),
(3, 'App\\Models\\User', 4, 'auth_token', 'd52b0c5edfa13f6b2ff7fb5b278cb8b739428099d6ac450b7a2607c05a82fe13', '[\"*\"]', '2025-03-24 01:05:18', NULL, '2025-03-23 18:47:29', '2025-03-24 01:05:18'),
(4, 'App\\Models\\User', 4, 'auth_token', '4850678fecb3824af0a8d78594a80fdb04807b0e709d8e7aaf3f9d0032d1680d', '[\"*\"]', '2025-04-22 16:54:35', NULL, '2025-03-24 00:35:48', '2025-04-22 16:54:35'),
(5, 'App\\Models\\User', 4, 'auth_token', '87044e440d778316e3915cd65d99cb378faf9b1db7b5f32f1f8b795ec654d2ba', '[\"*\"]', '2025-03-31 01:32:02', NULL, '2025-03-26 07:37:11', '2025-03-31 01:32:02'),
(6, 'App\\Models\\User', 4, 'auth_token', '0eef9b24a100ccd96c06a06fb115e42a5b306a69e04fa85ab3cdd61e7cfbcf9c', '[\"*\"]', '2025-03-27 23:59:56', NULL, '2025-03-26 07:48:27', '2025-03-27 23:59:56'),
(7, 'App\\Models\\User', 11, 'auth_token', '0c6a86867abd4b4e84e5641f84ff5f2fc265f2cee7b2b90270ef176d06caaa3d', '[\"*\"]', NULL, NULL, '2025-03-26 07:51:33', '2025-03-26 07:51:33'),
(8, 'App\\Models\\User', 3, 'auth_token', '9bc8bd4ecf1be5d754a61078cc3179b5db55cdc14682f4c5ea88a4fa0fe786c9', '[\"*\"]', '2025-03-28 00:01:47', NULL, '2025-03-28 00:01:32', '2025-03-28 00:01:47'),
(9, 'App\\Models\\User', 5, 'auth_token', '409140e341f451e7624cf26a4772b856ecd0c13c44e4e6debf3f34878b666280', '[\"*\"]', '2025-03-28 00:03:05', NULL, '2025-03-28 00:02:52', '2025-03-28 00:03:05'),
(10, 'App\\Models\\User', 6, 'auth_token', 'd5416e76553b146e17b7ff4613098fa74b82da603ae483e07ea5f71537ea8a74', '[\"*\"]', '2025-03-28 00:03:48', NULL, '2025-03-28 00:03:36', '2025-03-28 00:03:48'),
(11, 'App\\Models\\User', 7, 'auth_token', '2f6d8b20b1113e86503fd2d4b34e042b89b45d9326a1ec4584cbddce58cc7eea', '[\"*\"]', '2025-03-28 00:04:40', NULL, '2025-03-28 00:04:21', '2025-03-28 00:04:40'),
(12, 'App\\Models\\User', 9, 'auth_token', '6df3b27c19067a9a6dd7ab3ff43f05094d109199da6da01bb6ba9467dec96300', '[\"*\"]', '2025-03-28 00:13:26', NULL, '2025-03-28 00:13:17', '2025-03-28 00:13:26'),
(13, 'App\\Models\\User', 10, 'auth_token', '66a5b701162b270124510ac068c141af0edc355a4a5cba39ca8124652c471bd8', '[\"*\"]', '2025-03-28 00:14:41', NULL, '2025-03-28 00:14:16', '2025-03-28 00:14:41'),
(14, 'App\\Models\\User', 8, 'auth_token', 'f5dd9f210e8570631d543d4b7f3b93862647ae2ab6b48addcbbe5c446ac31d45', '[\"*\"]', '2025-03-28 00:16:02', NULL, '2025-03-28 00:15:48', '2025-03-28 00:16:02'),
(15, 'App\\Models\\User', 4, 'auth_token', 'dc0f878fa7934a02e114e549e9c11092602910fe29e03adad738065eab9cfa7f', '[\"*\"]', NULL, NULL, '2025-03-28 00:16:20', '2025-03-28 00:16:20'),
(16, 'App\\Models\\User', 11, 'auth_token', 'f4e6993b29717fda10469f3fcabb3673273f24c2b931e835619ed1b3d481cd70', '[\"*\"]', NULL, NULL, '2025-03-30 01:27:17', '2025-03-30 01:27:17'),
(17, 'App\\Models\\User', 11, 'auth_token', '2796088f72fabaac095d1f77720f16f7f4d629193e808d103564aae9d3695dad', '[\"*\"]', NULL, NULL, '2025-03-30 09:27:18', '2025-03-30 09:27:18'),
(18, 'App\\Models\\User', 11, 'auth_token', '16ddd9856b78e7e66306149af273a05013b19a6ae50aa79bb92502365b1c64aa', '[\"*\"]', NULL, NULL, '2025-03-30 13:28:35', '2025-03-30 13:28:35'),
(19, 'App\\Models\\User', 4, 'auth_token', 'e9452d8a51b7d483ced49c4801a95c4bea5223d69b2b3dd64fc09e6fcfe4a8a3', '[\"*\"]', '2025-04-09 15:09:19', NULL, '2025-04-05 16:32:45', '2025-04-09 15:09:19'),
(20, 'App\\Models\\User', 4, 'auth_token', 'fed355ae08829ef305c013b2338b42cf0d97549125049a82de713f8ba3d9e313', '[\"*\"]', '2025-04-09 15:20:35', NULL, '2025-04-09 15:20:23', '2025-04-09 15:20:35'),
(21, 'App\\Models\\User', 32, 'authToken', '11126199b487a31416934d92e5d0f7bc40cc8c2de6ed3f6a610e7faca8d3dfbc', '[\"*\"]', '2025-04-09 15:24:24', NULL, '2025-04-09 15:21:07', '2025-04-09 15:24:24'),
(22, 'App\\Models\\User', 4, 'auth_token', 'a20bbb84332a8bdceb1b633755f0ceb5625e1283400cdbfc8404183c54a3d646', '[\"*\"]', '2025-04-11 07:44:49', NULL, '2025-04-11 07:42:06', '2025-04-11 07:44:49'),
(23, 'App\\Models\\User', 4, 'auth_token', '7932a25a346a6762bc0da17a6717ba54ccdd8340fc7fe53eda3cfd7262b38586', '[\"*\"]', NULL, NULL, '2025-04-11 07:59:09', '2025-04-11 07:59:09'),
(24, 'App\\Models\\User', 4, 'auth_token', '2b8df55efe0763ce34416f6353e2ac6c35a4833113ecc4ba4d3d5421ab3f4bbe', '[\"*\"]', '2025-04-11 17:01:57', NULL, '2025-04-11 07:59:10', '2025-04-11 17:01:57'),
(25, 'App\\Models\\User', 11, 'auth_token', '049b58af2c0ee6a8aab16c263c050b4b4db562a11080797ed3c9a648c57ce4e9', '[\"*\"]', '2025-05-03 07:38:58', NULL, '2025-04-11 09:06:06', '2025-05-03 07:38:58'),
(26, 'App\\Models\\User', 4, 'auth_token', '8702a7730ba7f000eb8fb95d7a550e27f04e556ab3426eb520656a779ae8d248', '[\"*\"]', '2025-04-19 06:08:55', NULL, '2025-04-12 04:53:24', '2025-04-19 06:08:55'),
(27, 'App\\Models\\User', 11, 'auth_token', 'b7af5c05d0385a7d34ad5d07127fb9a52e79093d5e953551d1fd0fc10b11ffff', '[\"*\"]', '2025-04-22 01:54:26', NULL, '2025-04-19 06:11:45', '2025-04-22 01:54:26'),
(28, 'App\\Models\\User', 4, 'auth_token', '802d83fae9eb79ef5b5b94e5a087c7ae00c2f1167de7a18e07484c6eb1dec52d', '[\"*\"]', '2025-05-03 02:14:14', NULL, '2025-04-22 01:56:21', '2025-05-03 02:14:14'),
(29, 'App\\Models\\User', 11, 'auth_token', 'f403ecc1fa95b193c3a3b237d48a98befd160bb726ac2ff2fbc096f5c0b38537', '[\"*\"]', '2025-04-23 13:15:35', NULL, '2025-04-22 16:55:36', '2025-04-23 13:15:35'),
(30, 'App\\Models\\User', 1, 'auth_token', '81fafd9adfaa9f12a782597fe90d9b9b406a91f6a2ec2dd15ae3d6f413355a5a', '[\"*\"]', '2025-05-03 03:38:21', NULL, '2025-04-23 14:28:17', '2025-05-03 03:38:21'),
(31, 'App\\Models\\User', 3, 'auth_token', 'd6b64f9196b8cb92cea4eaa348e33ed9b1998091ef687b99147ec4707355eda1', '[\"*\"]', '2025-05-03 02:16:19', NULL, '2025-05-03 02:14:37', '2025-05-03 02:16:19'),
(32, 'App\\Models\\User', 4, 'auth_token', 'c40a0ff6cd98d0f211e318d539af6c02de8d039c441080a2c03b178290f7056d', '[\"*\"]', '2025-05-03 02:25:20', NULL, '2025-05-03 02:16:54', '2025-05-03 02:25:20'),
(33, 'App\\Models\\User', 5, 'auth_token', '24232cec7ed24d1998bc9214642a26bd7207f887d742f6cae646eab411bf8019', '[\"*\"]', '2025-05-03 02:27:46', NULL, '2025-05-03 02:27:19', '2025-05-03 02:27:46'),
(34, 'App\\Models\\User', 6, 'auth_token', '98d4c8aab4fb8a499737daedea24f342b67fad0f23f32cb2dda803c06c9e6493', '[\"*\"]', '2025-05-03 02:28:37', NULL, '2025-05-03 02:28:13', '2025-05-03 02:28:37'),
(35, 'App\\Models\\User', 7, 'auth_token', 'a17072f7b2b5825fc0be5fd3cc26e9547ece25266d297960c4c437c25b75e0c1', '[\"*\"]', '2025-05-03 02:29:18', NULL, '2025-05-03 02:29:01', '2025-05-03 02:29:18'),
(36, 'App\\Models\\User', 8, 'auth_token', '41a8930a3d99edac48d6543d130dddbe6a2ce8c111ecba642c736c10a602221f', '[\"*\"]', '2025-05-03 02:29:53', NULL, '2025-05-03 02:29:40', '2025-05-03 02:29:53'),
(37, 'App\\Models\\User', 9, 'auth_token', 'e2971e3da98a7221036601b3b2fe1c0276438992baafe1dae3e01d6fc81b343e', '[\"*\"]', '2025-05-03 02:30:35', NULL, '2025-05-03 02:30:19', '2025-05-03 02:30:35'),
(38, 'App\\Models\\User', 10, 'auth_token', '34258cf28753bede3103625970f490044944c3175f3e0176b4c42f8e57053ca1', '[\"*\"]', '2025-05-03 02:35:29', NULL, '2025-05-03 02:35:15', '2025-05-03 02:35:29'),
(39, 'App\\Models\\User', 4, 'auth_token', '3cdf7203ad28b4aed7177ad039cc1ae8ee0b176ba8febff52d6b7e54bf018491', '[\"*\"]', '2025-05-03 02:35:51', NULL, '2025-05-03 02:35:48', '2025-05-03 02:35:51'),
(40, 'App\\Models\\User', 12, 'auth_token', '60e54137b18438e3b85773d6e1078d6caf84dbea3245e418aa7a227550c33d11', '[\"*\"]', '2025-05-03 02:50:58', NULL, '2025-05-03 02:44:56', '2025-05-03 02:50:58'),
(41, 'App\\Models\\User', 13, 'auth_token', '4f621715f0e482cd8409a7d22cb31759e7ab8f9b4348fb1895a76975c9c5117d', '[\"*\"]', '2025-05-03 02:59:38', NULL, '2025-05-03 02:47:05', '2025-05-03 02:59:38'),
(42, 'App\\Models\\User', 14, 'auth_token', '0db1d22bcfe75490f76b40f98663422f07447a54ff4e795bd494cea5bb06c1b7', '[\"*\"]', '2025-05-03 03:38:21', NULL, '2025-05-03 03:00:29', '2025-05-03 03:38:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `status` enum('draft','published','archived') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `category_id`, `user_id`, `slug`, `title`, `content`, `image`, `views`, `status`, `isDeleted`, `published_at`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 2, 3, 'tam-quan-trong-cua-suc-khoe-tim-mach', 'Tầm quan trọng của sức khỏe tim mạch', '<h3><strong>Vì sao sức khỏe tim mạch ngày càng đáng báo động?</strong></h3><p>Theo Tổ chức Y tế Thế giới (WHO), các bệnh lý tim mạch hiện là <strong>nguyên nhân gây tử vong hàng đầu trên toàn cầu</strong>, chiếm hơn 30% tổng số ca tử vong mỗi năm. Tại Việt Nam, tỷ lệ người mắc cao huyết áp, mỡ máu, xơ vữa động mạch, nhồi máu cơ tim ngày càng tăng nhanh, đặc biệt ở người trẻ tuổi do lối sống ít vận động, ăn uống không lành mạnh, stress kéo dài và thiếu quan tâm đến sức khỏe.</p><p>Điều nguy hiểm là <strong>nhiều bệnh tim mạch phát triển âm thầm</strong>, không biểu hiện triệu chứng rõ ràng cho đến khi xảy ra biến cố nghiêm trọng như đột quỵ hoặc nhồi máu cơ tim.</p><h3><strong>Tại sao bạn cần chăm sóc tim mạch ngay hôm nay?</strong></h3><p><strong>Phòng bệnh hơn chữa bệnh:</strong> Việc chủ động theo dõi sức khỏe tim mạch giúp bạn phát hiện sớm các nguy cơ và điều chỉnh kịp thời, thay vì chờ đến khi bệnh xảy ra rồi mới điều trị, tốn kém thời gian, tiền bạc và ảnh hưởng đến cuộc sống.</p><p><strong>Nâng cao chất lượng cuộc sống:</strong> Một trái tim khỏe giúp bạn làm việc hiệu quả, vận động dễ dàng, tận hưởng cuộc sống trọn vẹn và sống thọ hơn.</p><p><strong>Bảo vệ cả gia đình:</strong> Khi bạn khỏe mạnh, bạn mới có thể chăm sóc người thân tốt hơn. Đồng thời, khi bạn có kiến thức về tim mạch, bạn sẽ giúp cả gia đình hình thành lối sống lành mạnh và phòng ngừa bệnh tật hiệu quả.</p><h3><strong>Giải pháp toàn diện cho sức khỏe tim mạch</strong></h3><p>Chúng tôi hiểu rằng việc duy trì một trái tim khỏe không hề dễ dàng trong cuộc sống hiện đại. Vì vậy, chúng tôi mang đến các giải pháp hỗ trợ bạn chăm sóc tim mạch một cách khoa học và dễ dàng hơn:</p><p>🏥 <strong>Gói khám chuyên sâu tim mạch</strong> định kỳ – giúp tầm soát toàn diện, phát hiện sớm bệnh lý tiềm ẩn.</p><p>📲 <strong>Ứng dụng theo dõi huyết áp, nhịp tim, chỉ số sức khỏe</strong> – quản lý dễ dàng ngay trên điện thoại.</p><p>💡 <strong>Tư vấn y khoa cùng bác sĩ chuyên môn</strong> – giải đáp mọi lo lắng và hướng dẫn chăm sóc đúng cách.</p><p>⚙️ <strong>Thiết bị đo huyết áp, điện tim tại nhà</strong> – tiện lợi, chính xác, hỗ trợ theo dõi liên tục.</p><h3><strong>Đừng đợi đến khi trái tim lên tiếng!</strong></h3><p>Sức khỏe tim mạch là tài sản vô giá. Hãy bắt đầu bảo vệ trái tim của bạn ngay từ hôm nay – từ những thói quen nhỏ, từ sự quan tâm đúng lúc. Và nếu bạn cần người đồng hành, chúng tôi sẵn sàng cùng bạn trên hành trình đó.</p><blockquote><p>💖 <strong>Đầu tư cho tim mạch – đầu tư cho tương lai khỏe mạnh của bạn và gia đình!</strong></p></blockquote>', 'uploads/BsguxxHB446zBGjycmCgHV2Q59o3HRK4Zkrs9nbg.jpg', 126, 'published', 0, '2025-03-23 08:16:59', NULL, '2025-03-23 08:16:59', '2025-05-09 15:31:05'),
(2, 5, 4, 'cac-phuong-phap-dieu-tri-chan-thuong-chinh-hinh', 'Các phương pháp điều trị chấn thương chỉnh hình', '<p>Chấn thương chỉnh hình có thể ảnh hưởng đến chất lượng cuộc sống nếu không được điều trị đúng cách. Hiện nay, có nhiều phương pháp tiên tiến giúp phục hồi chấn thương xương khớp nhanh chóng. Hãy cùng tìm hiểu về các phương pháp này trong bài viết sau.</p>', 'uploads/WAqhNCaOAYwfP53dOZvr9LpD89O9eOSnq9G7Km6K.jpg', 89, 'published', 0, '2025-03-19 17:00:00', NULL, '2025-03-23 08:16:59', '2025-05-03 07:31:56'),
(3, 1, 5, 'dinh-duong-cho-tre-em-va-me-bau', 'Dinh dưỡng cho trẻ em và mẹ bầu', '<p>Chế độ dinh dưỡng đóng vai trò quan trọng trong sự phát triển của trẻ nhỏ cũng như sức khỏe của mẹ bầu. Việc cung cấp đầy đủ các nhóm chất dinh dưỡng giúp tăng cường sức đề kháng và phát triển toàn diện. Hãy cùng khám phá chế độ ăn uống khoa học qua bài viết này.</p>', 'uploads/LVN801O10NkBOaYU327RHZN9sbqxcpa9c6jJmre5.png', 200, 'published', 0, '2025-03-23 08:16:59', NULL, '2025-03-23 08:16:59', '2025-05-03 07:36:47'),
(4, 3, 6, 'huong-dan-cham-soc-da-mua-he', 'Hướng dẫn chăm sóc da cho mùa hè', 'Vào mùa hè, làn da dễ bị tác động bởi ánh nắng mặt trời và các yếu tố môi trường. Để duy trì làn da khỏe mạnh, bạn cần biết cách bảo vệ da, sử dụng kem chống nắng đúng cách và cấp ẩm phù hợp. Hãy tham khảo ngay những bí quyết chăm sóc da hiệu quả nhất.', NULL, 50, 'draft', 0, NULL, NULL, '2025-03-23 08:16:59', '2025-03-23 08:16:59'),
(5, 4, 7, 'phat-hien-som-benh-ung-thu', 'Cách phát hiện sớm bệnh ung thư', '<p>Phát hiện sớm ung thư giúp tăng khả năng điều trị thành công và kéo dài sự sống cho bệnh nhân. Bài viết này sẽ hướng dẫn bạn cách nhận biết các dấu hiệu của bệnh ung thư và những xét nghiệm quan trọng cần thực hiện định kỳ.</p>', 'uploads/y4y4EXR8yeguk4xLZOXY1i2AeIh49UgietrcSym7.jpg', 170, 'published', 0, '2025-03-23 08:16:59', NULL, '2025-03-23 08:16:59', '2025-05-03 07:32:08'),
(6, 6, 8, 'cac-benh-phoi-pho-bien-va-cach-phong-tranh', 'Các bệnh phổi phổ biến và cách phòng tránh', '<p>Bệnh phổi là một trong những nguyên nhân gây tử vong hàng đầu trên thế giới. Những bệnh lý phổ biến như viêm phổi, hen suyễn, bệnh phổi tắc nghẽn mãn tính có thể phòng tránh bằng cách bảo vệ hệ hô hấp và duy trì lối sống lành mạnh.</p>', 'uploads/b3MHbTwqUeTZwbj2bRFb5shTKtC2ANTS90zagvNC.jpg', 95, 'draft', 0, '2024-10-01 03:00:00', NULL, '2025-03-23 08:16:59', '2025-05-03 07:28:14'),
(7, 8, 9, 'tam-quan-trong-cua-suc-khoe-phu-nu', 'Tầm quan trọng của sức khỏe phụ nữ', '<p>Sức khỏe phụ nữ không chỉ ảnh hưởng đến bản thân họ mà còn có tác động đến gia đình và xã hội. Chăm sóc sức khỏe sinh sản, dinh dưỡng hợp lý và kiểm tra định kỳ là những yếu tố quan trọng giúp phụ nữ có một cuộc sống khỏe mạnh.</p>', 'uploads/lWdxU6bBRVN2salAaKye93JATZt48R9HpKYyJwiz.jpg', 135, 'published', 0, '2025-03-23 08:16:59', NULL, '2025-03-23 08:16:59', '2025-05-03 07:28:04'),
(8, 10, 10, 'roi-loan-than-kinh-va-cach-dieu-tri', 'Rối loạn thần kinh và cách điều trị', '<p>Các rối loạn thần kinh như mất trí nhớ, Parkinson hay trầm cảm ảnh hưởng nghiêm trọng đến chất lượng cuộc sống. Việc phát hiện sớm và điều trị kịp thời giúp cải thiện đáng kể tình trạng bệnh. Hãy cùng tìm hiểu các phương pháp điều trị mới nhất trong bài viết này.</p>', 'uploads/TbkkfapS4WbvcmxSSIwS5y7EHhHCAOCavvJgfjwr.jpg', 210, 'published', 0, '2025-03-23 08:16:59', NULL, '2025-03-23 08:16:59', '2025-05-03 07:34:20'),
(9, 1, 4, 'cac-phuong-phap-dieu-tri-chan-thuong-chinh-hinh-1', 'Các phương pháp điều trị chấn thương chỉnh hình', '<p>aaaa</p>', NULL, 0, 'draft', 0, NULL, '2025-05-03 06:18:28', '2025-04-05 18:03:59', '2025-05-03 06:18:28'),
(10, 2, 3, 'tam-quan-trong-cua-suc-khoe-tim-mach-1', 'Tầm quan trọng của sức khỏe tim mạch', '<p>Bệnh tim mạch là một trong những nguyên nhân gây tử vong hàng đầu trên thế giới. Việc duy trì một lối sống lành mạnh, chế độ ăn uống hợp lý và thường xuyên kiểm tra sức khỏe tim mạch là vô cùng quan trọng. Bài viết này sẽ giúp bạn hiểu rõ hơn về cách bảo vệ trái tim của mình.</p>', 'uploads/ql09ZLs1oYbKEjL8NtwDjS6Yg2gQupaV4oRCcgxo.jpg', 121, 'published', 0, '2025-03-23 01:16:59', NULL, '2025-03-23 01:16:59', '2025-05-09 15:31:22'),
(11, 5, 4, 'cac-phuong-phap-dieu-tri-chan-thuong-chinh-hinh-5', 'Các phương pháp điều trị chấn thương chỉnh hình', '<p>Chấn thương chỉnh hình có thể ảnh hưởng đến chất lượng cuộc sống nếu không được điều trị đúng cách. Hiện nay, có nhiều phương pháp tiên tiến giúp phục hồi chấn thương xương khớp nhanh chóng. Hãy cùng tìm hiểu về các phương pháp này trong bài viết sau.</p>', 'uploads/JBkjeLreEOGWOQY5690R7Mn9NRoSzCUuASL7S6Zo.jpg', 88, 'published', 0, '2025-03-19 10:00:00', NULL, '2025-03-23 01:16:59', '2025-05-03 07:35:24'),
(12, 1, 5, 'dinh-duong-cho-tre-em-va-me-bau-1', 'Dinh dưỡng cho trẻ em và mẹ bầu', '<p>Chế độ dinh dưỡng đóng vai trò quan trọng trong sự phát triển của trẻ nhỏ cũng như sức khỏe của mẹ bầu. Việc cung cấp đầy đủ các nhóm chất dinh dưỡng giúp tăng cường sức đề kháng và phát triển toàn diện. Hãy cùng khám phá chế độ ăn uống khoa học qua bài viết này.</p>', 'uploads/pgLFzxtlxMzMstSxPmGpLi9Vssxd3tbAycYH4Xyt.png', 200, 'published', 0, '2025-03-23 01:16:59', NULL, '2025-03-23 01:16:59', '2025-05-03 07:36:05'),
(13, 3, 6, 'huong-dan-cham-soc-da-mua-he-1', 'Hướng dẫn chăm sóc da cho mùa hè', '<p>Vào mùa hè, làn da dễ bị tác động bởi ánh nắng mặt trời và các yếu tố môi trường. Để duy trì làn da khỏe mạnh, bạn cần biết cách bảo vệ da, sử dụng kem chống nắng đúng cách và cấp ẩm phù hợp. Hãy tham khảo ngay những bí quyết chăm sóc da hiệu quả nhất.</p>', 'uploads/VPrqOOUrUtQyhPhYrjDe2RtsOEM8lyDW8iVwjbXn.jpg', 50, 'draft', 0, NULL, NULL, '2025-03-23 01:16:59', '2025-05-03 07:33:16'),
(14, 4, 7, 'phat-hien-som-benh-ung-thu-1', 'Cách phát hiện sớm bệnh ung thư', '<p>Phát hiện sớm ung thư giúp tăng khả năng điều trị thành công và kéo dài sự sống cho bệnh nhân. Bài viết này sẽ hướng dẫn bạn cách nhận biết các dấu hiệu của bệnh ung thư và những xét nghiệm quan trọng cần thực hiện định kỳ.</p>', 'uploads/Y9GfbNVw1nLcomtKqPyp9YMMG9mI0YEUmGsgGqw3.jpg', 170, 'published', 0, '2025-03-23 01:16:59', NULL, '2025-03-23 01:16:59', '2025-05-03 07:32:38'),
(15, 6, 8, 'cac-benh-phoi-pho-bien-va-cach-phong-tranh-1', 'Các bệnh phổi phổ biến và cách phòng tránh', '<p>Bệnh phổi là một trong những nguyên nhân gây tử vong hàng đầu trên thế giới. Những bệnh lý phổ biến như viêm phổi, hen suyễn, bệnh phổi tắc nghẽn mãn tính có thể phòng tránh bằng cách bảo vệ hệ hô hấp và duy trì lối sống lành mạnh.</p>', 'uploads/j7bz0vVn2wIYS7KsiuGplDvx7Kk545LF1aaDiKCT.jpg', 95, 'draft', 0, '2024-09-30 20:00:00', NULL, '2025-03-23 01:16:59', '2025-05-03 06:57:02'),
(16, 8, 9, 'tam-quan-trong-cua-suc-khoe-phu-nu-1', 'Tầm quan trọng của sức khỏe phụ nữ', '<p>Sức khỏe phụ nữ không chỉ ảnh hưởng đến bản thân họ mà còn có tác động đến gia đình và xã hội. Chăm sóc sức khỏe sinh sản, dinh dưỡng hợp lý và kiểm tra định kỳ là những yếu tố quan trọng giúp phụ nữ có một cuộc sống khỏe mạnh.</p>', 'uploads/WtIix4vEyh0hgsTZimYFzkbIVLCxbs19jPd9ES5f.jpg', 135, 'published', 0, '2025-03-23 01:16:59', NULL, '2025-03-23 01:16:59', '2025-05-03 06:20:21'),
(17, 10, 10, 'roi-loan-than-kinh-va-cach-dieu-tri-1', 'Rối loạn thần kinh và cách điều trị', '<p>Các rối loạn thần kinh như mất trí nhớ, Parkinson hay trầm cảm ảnh hưởng nghiêm trọng đến chất lượng cuộc sống. Việc phát hiện sớm và điều trị kịp thời giúp cải thiện đáng kể tình trạng bệnh. Hãy cùng tìm hiểu các phương pháp điều trị mới nhất trong bài viết này.</p>', 'uploads/Np5x3lcRppNHUTMG087ecJn53L4XdYD12MVHbE8K.png', 211, 'published', 0, '2025-03-23 01:16:59', NULL, '2025-03-23 01:16:59', '2025-05-03 07:30:19'),
(18, 1, 4, 'cac-phuong-phap-dieu-tri-chan-thuong-chinh-hinh-2', 'Các phương pháp điều trị chấn thương chỉnh hình', '<p>aaaa</p>', 'uploads/WN0oY2EbXKbX29FWo2jCoNu1A1TQO8EECDkbqIhK.jpg', 0, 'draft', 0, NULL, NULL, '2025-04-05 11:03:59', '2025-05-03 07:30:03'),
(19, 1, 4, 'cac-phuong-phap-dieu-tri-chan-thuong-chinh-hinh-3', 'Các phương pháp điều trị chấn thương chỉnh hình', '<p>aaaa</p>', 'uploads/XXbPKkHhcsgg7wRwJTmA1WO7ftx1U1fZYLBh8a8N.jpg', 0, 'draft', 0, NULL, NULL, '2025-04-05 11:03:59', '2025-05-03 07:29:55'),
(20, 1, 4, 'cac-phuong-phap-dieu-tri-chan-thuong-chinh-hinh-4', 'Các phương pháp điều trị chấn thương chỉnh hình', '<p>aaaa</p>', 'uploads/9vk6zMk1ChhQp9PfeM13Ykp75GQSENLj1zQVo1BV.jpg', 0, 'draft', 0, NULL, NULL, '2025-04-05 11:03:59', '2025-05-03 07:29:46'),
(21, 1, 1, 'chao-buoi-toi', 'Chao buoi toi', '<p>Chào tất cả mọi người&nbsp;</p>', 'uploads/VylenmVcJNX3FFyOYGFtLp27ZWgIhtPjaYfJlXXX.jpg', 2, 'published', 0, '2025-04-23 15:52:12', '2025-05-03 06:13:19', '2025-04-23 15:52:12', '2025-05-03 06:13:19');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `results`
--

CREATE TABLE `results` (
  `id` bigint UNSIGNED NOT NULL,
  `booking_id` bigint UNSIGNED NOT NULL,
  `doctor_id` bigint UNSIGNED NOT NULL,
  `guest_id` bigint UNSIGNED NOT NULL,
  `diagnosis` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `prescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `results`
--

INSERT INTO `results` (`id`, `booking_id`, `doctor_id`, `guest_id`, `diagnosis`, `prescription`, `note`, `file`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 11, 'Khám sức khỏe định kỳ, bình thường', 'Không cần thuốc', 'Không vấn đề sức khỏe', NULL, 0, '2025-04-01 08:30:00', '2025-04-01 09:00:00'),
(2, 2, 2, 12, 'Đau ngực nhẹ', 'Aspirin 81mg', 'Theo dõi huyết áp tại nhà', NULL, 0, '2025-04-02 09:30:00', '2025-04-02 10:00:00'),
(3, 3, 3, 13, 'Sốt nhẹ, cảm cúm', 'Paracetamol 500mg', 'Uống nhiều nước, nghỉ ngơi', NULL, 0, '2025-04-03 10:30:00', '2025-04-03 11:00:00'),
(4, 4, 4, 14, 'Nổi mẩn đỏ, viêm da dị ứng', 'Thuốc bôi ngoài da', 'Tránh tiếp xúc dị nguyên', NULL, 0, '2025-04-04 11:30:00', '2025-04-04 12:00:00'),
(5, 5, 5, 15, 'Đau đầu gối, viêm khớp nhẹ', 'Glucosamin', 'Tập vật lý trị liệu', NULL, 0, '2025-04-05 13:30:00', '2025-04-05 14:00:00'),
(6, 6, 6, 16, 'Khó thở, tăng huyết áp', 'Thuốc hạ áp', 'Ăn nhạt, theo dõi huyết áp', NULL, 0, '2025-04-06 14:30:00', '2025-04-06 15:00:00'),
(7, 7, 7, 17, 'Ho kéo dài, viêm phế quản', 'Kháng sinh', 'Uống nhiều nước, nghỉ ngơi', NULL, 0, '2025-04-07 15:30:00', '2025-04-07 16:00:00'),
(8, 8, 8, 18, 'Khám sức khỏe tổng quát', 'Không', 'Sức khỏe tốt', NULL, 0, '2025-04-08 16:30:00', '2025-04-08 17:00:00'),
(9, 9, 1, 19, 'Đau bụng, rối loạn tiêu hóa', 'Men tiêu hóa', 'Ăn chín uống sôi', NULL, 0, '2025-04-09 08:30:00', '2025-04-09 09:00:00'),
(10, 10, 2, 20, 'Tiểu buốt, viêm tiết niệu', 'Kháng sinh', 'Uống nhiều nước', NULL, 0, '2025-04-10 09:30:00', '2025-04-10 10:00:00'),
(11, 11, 3, 11, 'Khó thở nhẹ, viêm hô hấp', 'Thuốc xịt mũi', 'Tránh bụi, giữ ấm', NULL, 0, '2025-04-11 10:30:00', '2025-04-11 11:00:00'),
(12, 12, 4, 12, 'Mệt mỏi, rối loạn nội tiết', 'Bổ sung vitamin', 'Tái khám sau 1 tháng', NULL, 0, '2025-04-12 11:30:00', '2025-04-12 12:00:00'),
(13, 13, 5, 13, 'Đau lưng, thoái hóa nhẹ', 'Paracetamol', 'Tập thể dục nhẹ', NULL, 0, '2025-04-13 13:30:00', '2025-04-13 14:00:00'),
(14, 14, 6, 14, 'Khối u nhỏ, cần theo dõi', 'Không', 'Tái khám định kỳ', NULL, 0, '2025-04-14 14:30:00', '2025-04-14 15:00:00'),
(15, 15, 7, 15, 'Thiếu máu nhẹ', 'Bổ sung sắt', 'Ăn nhiều rau xanh', NULL, 0, '2025-04-15 15:30:00', '2025-04-15 16:00:00'),
(16, 16, 8, 16, 'Tư vấn ăn uống, dinh dưỡng', 'Không', 'Ăn đa dạng thực phẩm', NULL, 0, '2025-04-16 16:30:00', '2025-04-16 17:00:00'),
(17, 17, 1, 17, 'Phục hồi chức năng sau chấn thương', 'Tập vật lý trị liệu', 'Tái khám sau 2 tuần', NULL, 0, '2025-04-17 08:45:00', '2025-04-17 09:15:00'),
(18, 18, 2, 18, 'Mất ngủ, stress nhẹ', 'Thảo dược an thần', 'Tập thư giãn', NULL, 0, '2025-04-18 09:45:00', '2025-04-18 10:15:00'),
(19, 19, 3, 19, 'Mờ mắt, cận thị', 'Đeo kính', 'Hạn chế dùng thiết bị điện tử', NULL, 0, '2025-04-19 10:45:00', '2025-04-19 11:15:00'),
(20, 20, 4, 20, 'Đau đầu, căng thẳng', 'Paracetamol', 'Ngủ đủ giấc', NULL, 0, '2025-04-20 11:45:00', '2025-04-20 12:15:00'),
(21, 21, 5, 11, 'Khám sức khỏe định kỳ', 'Không', 'Sức khỏe ổn định', NULL, 0, '2025-04-21 13:45:00', '2025-04-21 14:15:00'),
(22, 22, 6, 12, 'Đau ngực, tăng huyết áp', 'Thuốc hạ áp', 'Theo dõi huyết áp', NULL, 0, '2025-04-22 14:45:00', '2025-04-22 15:15:00'),
(23, 23, 7, 13, 'Sốt, viêm họng', 'Paracetamol', 'Uống nhiều nước', NULL, 0, '2025-04-23 15:45:00', '2025-04-23 16:15:00'),
(24, 24, 8, 14, 'Nổi mẩn, dị ứng nhẹ', 'Thuốc bôi', 'Tránh tiếp xúc hóa chất', NULL, 0, '2025-04-24 16:45:00', '2025-04-24 17:15:00'),
(25, 25, 1, 15, 'Đau vai, viêm cơ', 'Thuốc giảm đau', 'Tập vận động nhẹ', NULL, 0, '2025-04-25 08:15:00', '2025-04-25 08:45:00'),
(26, 26, 2, 16, 'Khó thở, tim mạch', 'Thuốc giãn mạch', 'Theo dõi sát', NULL, 0, '2025-04-26 09:15:00', '2025-04-26 09:45:00'),
(27, 27, 3, 17, 'Ho, viêm phế quản', 'Kháng sinh', 'Nghỉ ngơi', NULL, 0, '2025-04-27 10:15:00', '2025-04-27 10:45:00'),
(28, 28, 4, 18, 'Khám sức khỏe tổng quát', 'Không', 'Bình thường', NULL, 0, '2025-04-28 11:15:00', '2025-04-28 11:45:00'),
(29, 29, 5, 19, 'Đau bụng, rối loạn tiêu hóa', 'Men tiêu hóa', 'Ăn chín uống sôi', NULL, 0, '2025-04-29 13:15:00', '2025-04-29 13:45:00'),
(30, 30, 6, 20, 'Tiểu buốt, viêm tiết niệu', 'Kháng sinh', 'Uống nhiều nước', NULL, 0, '2025-04-30 14:15:00', '2025-04-30 14:45:00'),
(31, 31, 7, 11, 'Khó thở, viêm phổi nhẹ', 'Kháng sinh', 'Giữ ấm, nghỉ ngơi', NULL, 0, '2025-05-01 15:15:00', '2025-05-01 15:45:00'),
(32, 32, 8, 12, 'Mệt mỏi, thiếu vitamin', 'Bổ sung vitamin', 'Ăn uống đủ chất', NULL, 0, '2025-05-02 16:15:00', '2025-05-02 16:45:00'),
(33, 33, 1, 13, 'Đau lưng, thoái hóa nhẹ', 'Paracetamol', 'Tập thể dục nhẹ', NULL, 0, '2025-05-03 08:30:00', '2025-05-03 09:00:00'),
(34, 34, 2, 14, 'Khối u nhỏ, theo dõi', 'Không', 'Tái khám định kỳ', NULL, 0, '2025-05-04 09:30:00', '2025-05-04 10:00:00'),
(35, 35, 3, 15, 'Thiếu máu nhẹ', 'Bổ sung sắt', 'Ăn nhiều rau xanh', NULL, 0, '2025-05-05 10:30:00', '2025-05-05 11:00:00'),
(36, 36, 4, 16, 'Tư vấn dinh dưỡng', 'Không', 'Ăn đa dạng thực phẩm', NULL, 0, '2025-05-06 11:30:00', '2025-05-06 12:00:00'),
(37, 37, 5, 17, 'Phục hồi chức năng', 'Tập vật lý trị liệu', 'Tái khám sau 2 tuần', NULL, 0, '2025-05-07 13:30:00', '2025-05-07 14:00:00'),
(38, 38, 6, 18, 'Mất ngủ, stress nhẹ', 'Thảo dược an thần', 'Tập thư giãn', NULL, 0, '2025-05-08 14:30:00', '2025-05-08 15:00:00'),
(39, 39, 7, 19, 'Mờ mắt, cận thị', 'Đeo kính', 'Hạn chế dùng thiết bị điện tử', NULL, 0, '2025-05-09 15:30:00', '2025-05-09 16:00:00'),
(40, 40, 8, 20, 'Đau đầu, căng thẳng', 'Paracetamol', 'Ngủ đủ giấc', NULL, 0, '2025-05-10 16:30:00', '2025-05-10 17:00:00'),
(41, 41, 1, 11, 'Khám sức khỏe định kỳ', 'Không', 'Sức khỏe ổn định', NULL, 0, '2025-05-11 08:00:00', '2025-05-11 08:30:00'),
(42, 42, 2, 12, 'Đau ngực nhẹ', 'Aspirin 81mg', 'Theo dõi huyết áp tại nhà', NULL, 0, '2025-05-12 09:00:00', '2025-05-12 09:30:00'),
(43, 43, 3, 13, 'Sốt nhẹ, cảm cúm', 'Paracetamol 500mg', 'Uống nhiều nước, nghỉ ngơi', NULL, 0, '2025-05-13 10:00:00', '2025-05-13 10:30:00'),
(44, 44, 4, 14, 'Nổi mẩn đỏ, viêm da dị ứng', 'Thuốc bôi ngoài da', 'Tránh tiếp xúc dị nguyên', NULL, 0, '2025-05-14 11:00:00', '2025-05-14 11:30:00'),
(45, 45, 5, 15, 'Đau đầu gối, viêm khớp nhẹ', 'Glucosamin', 'Tập vật lý trị liệu', NULL, 0, '2025-05-15 13:00:00', '2025-05-15 13:30:00'),
(46, 46, 6, 16, 'Khó thở, tăng huyết áp', 'Thuốc hạ áp', 'Ăn nhạt, theo dõi huyết áp', NULL, 0, '2025-05-16 14:00:00', '2025-05-16 14:30:00'),
(47, 47, 7, 17, 'Ho kéo dài, viêm phế quản', 'Kháng sinh', 'Uống nhiều nước, nghỉ ngơi', NULL, 0, '2025-05-17 15:00:00', '2025-05-17 15:30:00'),
(48, 48, 8, 18, 'Khám sức khỏe tổng quát', 'Không', 'Sức khỏe tốt', NULL, 0, '2025-05-18 16:00:00', '2025-05-18 16:30:00'),
(49, 49, 1, 19, 'Đau bụng, rối loạn tiêu hóa', 'Men tiêu hóa', 'Ăn chín uống sôi', NULL, 0, '2025-05-19 08:30:00', '2025-05-19 09:00:00'),
(50, 50, 2, 20, 'Tiểu buốt, viêm tiết niệu', 'Kháng sinh', 'Uống nhiều nước', NULL, 0, '2025-05-20 09:30:00', '2025-05-20 10:00:00'),
(51, 51, 3, 11, 'Khó thở nhẹ, viêm hô hấp', 'Thuốc xịt mũi', 'Tránh bụi, giữ ấm', NULL, 0, '2025-05-21 10:30:00', '2025-05-21 11:00:00'),
(52, 52, 4, 12, 'Mệt mỏi, rối loạn nội tiết', 'Bổ sung vitamin', 'Tái khám sau 1 tháng', NULL, 0, '2025-05-22 11:30:00', '2025-05-22 12:00:00'),
(53, 53, 5, 13, 'Đau lưng, thoái hóa nhẹ', 'Paracetamol', 'Tập thể dục nhẹ', NULL, 0, '2025-05-23 13:30:00', '2025-05-23 14:00:00'),
(54, 54, 6, 14, 'Khối u nhỏ, cần theo dõi', 'Không', 'Tái khám định kỳ', NULL, 0, '2025-05-24 14:30:00', '2025-05-24 15:00:00'),
(55, 55, 7, 15, 'Thiếu máu nhẹ', 'Bổ sung sắt', 'Ăn nhiều rau xanh', NULL, 0, '2025-05-25 15:30:00', '2025-05-25 16:00:00'),
(56, 56, 8, 16, 'Tư vấn ăn uống, dinh dưỡng', 'Không', 'Ăn đa dạng thực phẩm', NULL, 0, '2025-05-26 16:30:00', '2025-05-26 17:00:00'),
(57, 57, 1, 17, 'Phục hồi chức năng sau chấn thương', 'Tập vật lý trị liệu', 'Tái khám sau 2 tuần', NULL, 0, '2025-05-27 08:45:00', '2025-05-27 09:15:00'),
(58, 58, 2, 18, 'Mất ngủ, stress nhẹ', 'Thảo dược an thần', 'Tập thư giãn', NULL, 0, '2025-05-28 09:45:00', '2025-05-28 10:15:00'),
(59, 59, 3, 19, 'Mờ mắt, cận thị', 'Đeo kính', 'Hạn chế dùng thiết bị điện tử', NULL, 0, '2025-05-29 10:45:00', '2025-05-29 11:15:00'),
(60, 60, 4, 20, 'Đau đầu, căng thẳng', 'Paracetamol', 'Ngủ đủ giấc', NULL, 0, '2025-05-30 11:45:00', '2025-05-30 12:15:00'),
(61, 61, 5, 11, 'Khám sức khỏe định kỳ', 'Không', 'Sức khỏe ổn định', NULL, 0, '2025-06-01 13:45:00', '2025-06-01 14:15:00'),
(62, 62, 6, 12, 'Đau ngực, tăng huyết áp', 'Thuốc hạ áp', 'Theo dõi huyết áp', NULL, 0, '2025-06-02 14:45:00', '2025-06-02 15:15:00'),
(63, 63, 7, 13, 'Sốt, viêm họng', 'Paracetamol', 'Uống nhiều nước', NULL, 0, '2025-06-03 15:45:00', '2025-06-03 16:15:00'),
(64, 64, 8, 14, 'Nổi mẩn, dị ứng nhẹ', 'Thuốc bôi', 'Tránh tiếp xúc hóa chất', NULL, 0, '2025-06-04 16:45:00', '2025-06-04 17:15:00'),
(65, 65, 1, 15, 'Đau vai, viêm cơ', 'Thuốc giảm đau', 'Tập vận động nhẹ', NULL, 0, '2025-06-05 08:15:00', '2025-06-05 08:45:00'),
(66, 66, 2, 16, 'Khó thở, tim mạch', 'Thuốc giãn mạch', 'Theo dõi sát', NULL, 0, '2025-06-06 09:15:00', '2025-06-06 09:45:00'),
(67, 67, 3, 17, 'Ho, viêm phế quản', 'Kháng sinh', 'Nghỉ ngơi', NULL, 0, '2025-06-07 10:15:00', '2025-06-07 10:45:00'),
(68, 68, 4, 18, 'Khám sức khỏe tổng quát', 'Không', 'Bình thường', NULL, 0, '2025-06-08 11:15:00', '2025-06-08 11:45:00'),
(69, 69, 5, 19, 'Đau bụng, rối loạn tiêu hóa', 'Men tiêu hóa', 'Ăn chín uống sôi', NULL, 0, '2025-06-09 13:15:00', '2025-06-09 13:45:00'),
(70, 70, 6, 20, 'Tiểu buốt, viêm tiết niệu', 'Kháng sinh', 'Uống nhiều nước', NULL, 0, '2025-06-10 14:15:00', '2025-06-10 14:45:00'),
(71, 71, 7, 11, 'Khó thở, viêm phổi nhẹ', 'Kháng sinh', 'Giữ ấm, nghỉ ngơi', NULL, 0, '2025-06-11 15:15:00', '2025-06-11 15:45:00'),
(72, 72, 8, 12, 'Mệt mỏi, thiếu vitamin', 'Bổ sung vitamin', 'Ăn uống đủ chất', NULL, 0, '2025-06-12 16:15:00', '2025-06-12 16:45:00'),
(73, 73, 1, 13, 'Đau lưng, thoái hóa nhẹ', 'Paracetamol', 'Tập thể dục nhẹ', NULL, 0, '2025-06-13 08:30:00', '2025-06-13 09:00:00'),
(74, 74, 2, 14, 'Khối u nhỏ, theo dõi', 'Không', 'Tái khám định kỳ', NULL, 0, '2025-06-14 09:30:00', '2025-06-14 10:00:00'),
(75, 75, 3, 15, 'Thiếu máu nhẹ', 'Bổ sung sắt', 'Ăn nhiều rau xanh', NULL, 0, '2025-06-15 10:30:00', '2025-06-15 11:00:00'),
(76, 76, 4, 16, 'Tư vấn dinh dưỡng', 'Không', 'Ăn đa dạng thực phẩm', NULL, 0, '2025-06-16 11:30:00', '2025-06-16 12:00:00'),
(77, 77, 5, 17, 'Phục hồi chức năng', 'Tập vật lý trị liệu', 'Tái khám sau 2 tuần', NULL, 0, '2025-06-17 13:30:00', '2025-06-17 14:00:00'),
(78, 78, 6, 18, 'Mất ngủ, stress nhẹ', 'Thảo dược an thần', 'Tập thư giãn', NULL, 0, '2025-06-18 14:30:00', '2025-06-18 15:00:00'),
(79, 79, 7, 19, 'Mờ mắt, cận thị', 'Đeo kính', 'Hạn chế dùng thiết bị điện tử', NULL, 0, '2025-06-19 15:30:00', '2025-06-19 16:00:00'),
(80, 80, 8, 20, 'Đau đầu, căng thẳng', 'Paracetamol', 'Ngủ đủ giấc', NULL, 0, '2025-06-20 16:30:00', '2025-06-20 17:00:00'),
(81, 81, 1, 11, 'Khám sức khỏe định kỳ', 'Không', 'Sức khỏe ổn định', NULL, 0, '2025-06-21 08:00:00', '2025-06-21 08:30:00'),
(82, 82, 2, 12, 'Đau ngực nhẹ', 'Aspirin 81mg', 'Theo dõi huyết áp tại nhà', NULL, 0, '2025-06-22 09:00:00', '2025-06-22 09:30:00'),
(83, 83, 3, 13, 'Sốt nhẹ, cảm cúm', 'Paracetamol 500mg', 'Uống nhiều nước, nghỉ ngơi', NULL, 0, '2025-06-23 10:00:00', '2025-06-23 10:30:00'),
(84, 84, 4, 14, 'Nổi mẩn đỏ, viêm da dị ứng', 'Thuốc bôi ngoài da', 'Tránh tiếp xúc dị nguyên', NULL, 0, '2025-06-24 11:00:00', '2025-06-24 11:30:00'),
(85, 85, 5, 15, 'Đau đầu gối, viêm khớp nhẹ', 'Glucosamin', 'Tập vật lý trị liệu', NULL, 0, '2025-06-25 13:00:00', '2025-06-25 13:30:00'),
(86, 86, 6, 16, 'Khó thở, tăng huyết áp', 'Thuốc hạ áp', 'Ăn nhạt, theo dõi huyết áp', NULL, 0, '2025-06-26 14:00:00', '2025-06-26 14:30:00'),
(87, 87, 7, 17, 'Ho kéo dài, viêm phế quản', 'Kháng sinh', 'Uống nhiều nước, nghỉ ngơi', NULL, 0, '2025-06-27 15:00:00', '2025-06-27 15:30:00'),
(88, 88, 8, 18, 'Khám sức khỏe tổng quát', 'Không', 'Sức khỏe tốt', NULL, 0, '2025-06-28 16:00:00', '2025-06-28 16:30:00'),
(89, 89, 1, 19, 'Đau bụng, rối loạn tiêu hóa', 'Men tiêu hóa', 'Ăn chín uống sôi', NULL, 0, '2025-06-29 08:30:00', '2025-06-29 09:00:00'),
(90, 90, 2, 20, 'Tiểu buốt, viêm tiết niệu', 'Kháng sinh', 'Uống nhiều nước', NULL, 0, '2025-06-30 09:30:00', '2025-06-30 10:00:00'),
(91, 91, 3, 11, 'Khó thở nhẹ, viêm hô hấp', 'Thuốc xịt mũi', 'Tránh bụi, giữ ấm', NULL, 0, '2025-07-01 10:30:00', '2025-07-01 11:00:00'),
(92, 92, 4, 12, 'Mệt mỏi, rối loạn nội tiết', 'Bổ sung vitamin', 'Tái khám sau 1 tháng', NULL, 0, '2025-07-02 11:30:00', '2025-07-02 12:00:00'),
(93, 93, 5, 13, 'Đau lưng, thoái hóa nhẹ', 'Paracetamol', 'Tập thể dục nhẹ', NULL, 0, '2025-07-03 13:30:00', '2025-07-03 14:00:00'),
(94, 94, 6, 14, 'Khối u nhỏ, cần theo dõi', 'Không', 'Tái khám định kỳ', NULL, 0, '2025-07-04 14:30:00', '2025-07-04 15:00:00'),
(95, 95, 7, 15, 'Thiếu máu nhẹ', 'Bổ sung sắt', 'Ăn nhiều rau xanh', NULL, 0, '2025-07-05 15:30:00', '2025-07-05 16:00:00'),
(96, 96, 8, 16, 'Tư vấn ăn uống, dinh dưỡng', 'Không', 'Ăn đa dạng thực phẩm', NULL, 0, '2025-07-06 16:30:00', '2025-07-06 17:00:00'),
(97, 97, 1, 17, 'Phục hồi chức năng sau chấn thương', 'Tập vật lý trị liệu', 'Tái khám sau 2 tuần', NULL, 0, '2025-07-07 08:45:00', '2025-07-07 09:15:00'),
(98, 98, 2, 18, 'Mất ngủ, stress nhẹ', 'Thảo dược an thần', 'Tập thư giãn', NULL, 0, '2025-07-08 09:45:00', '2025-07-08 10:15:00'),
(99, 99, 3, 19, 'Mờ mắt, cận thị', 'Đeo kính', 'Hạn chế dùng thiết bị điện tử', NULL, 0, '2025-07-09 10:45:00', '2025-07-09 11:15:00'),
(100, 100, 4, 20, 'Đau đầu, căng thẳng', 'Paracetamol', 'Ngủ đủ giấc', NULL, 0, '2025-07-10 11:45:00', '2025-07-10 12:15:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedules`
--

CREATE TABLE `schedules` (
  `id` bigint UNSIGNED NOT NULL,
  `doctor_id` bigint UNSIGNED NOT NULL,
  `time_start` time NOT NULL,
  `time_end` time NOT NULL,
  `working_date` date NOT NULL,
  `max_patients` int UNSIGNED DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `schedules`
--

INSERT INTO `schedules` (`id`, `doctor_id`, `time_start`, `time_end`, `working_date`, `max_patients`, `status`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 1, '07:00:00', '11:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:13:01', '2025-05-09 04:13:01'),
(2, 1, '07:00:00', '11:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:13:01', '2025-05-09 04:13:01'),
(3, 1, '07:00:00', '11:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:13:01', '2025-05-09 04:13:01'),
(4, 1, '07:00:00', '11:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:13:01', '2025-05-09 04:13:01'),
(5, 1, '07:00:00', '11:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:13:01', '2025-05-09 04:13:01'),
(6, 1, '07:00:00', '11:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:13:01', '2025-05-09 04:13:01'),
(7, 1, '13:00:00', '17:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:13:23', '2025-05-09 04:13:23'),
(8, 1, '13:00:00', '17:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:13:23', '2025-05-09 04:13:23'),
(9, 1, '13:00:00', '17:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:13:23', '2025-05-09 04:13:23'),
(10, 1, '13:00:00', '17:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:13:23', '2025-05-09 04:13:23'),
(11, 1, '13:00:00', '17:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:13:23', '2025-05-09 04:13:23'),
(12, 1, '13:00:00', '17:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:13:23', '2025-05-09 04:13:23'),
(13, 2, '07:00:00', '11:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:14:45', '2025-05-09 04:14:45'),
(14, 2, '07:00:00', '11:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:14:45', '2025-05-09 04:14:45'),
(15, 2, '07:00:00', '11:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:14:45', '2025-05-09 04:14:45'),
(16, 2, '07:00:00', '11:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:14:45', '2025-05-09 04:14:45'),
(17, 2, '07:00:00', '11:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:14:45', '2025-05-09 04:14:45'),
(18, 2, '07:00:00', '11:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:14:45', '2025-05-09 04:14:45'),
(19, 2, '13:00:00', '17:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:16:35', '2025-05-09 04:16:35'),
(20, 2, '13:00:00', '17:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:16:35', '2025-05-09 04:16:35'),
(21, 2, '13:00:00', '17:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:16:35', '2025-05-09 04:16:35'),
(22, 2, '13:00:00', '17:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:16:35', '2025-05-09 04:16:35'),
(23, 2, '13:00:00', '17:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:16:35', '2025-05-09 04:16:35'),
(24, 2, '13:00:00', '17:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:16:35', '2025-05-09 04:16:35'),
(25, 3, '07:00:00', '11:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:16:45', '2025-05-09 04:16:45'),
(26, 3, '07:00:00', '11:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:16:45', '2025-05-09 04:16:45'),
(27, 3, '07:00:00', '11:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:16:45', '2025-05-09 04:16:45'),
(28, 3, '07:00:00', '11:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:16:45', '2025-05-09 04:16:45'),
(29, 3, '07:00:00', '11:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:16:45', '2025-05-09 04:16:45'),
(30, 3, '07:00:00', '11:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:16:45', '2025-05-09 04:16:45'),
(31, 3, '13:00:00', '17:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:16:48', '2025-05-09 04:16:48'),
(32, 3, '13:00:00', '17:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:16:48', '2025-05-09 04:16:48'),
(33, 3, '13:00:00', '17:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:16:48', '2025-05-09 04:16:48'),
(34, 3, '13:00:00', '17:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:16:48', '2025-05-09 04:16:48'),
(35, 3, '13:00:00', '17:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:16:48', '2025-05-09 04:16:48'),
(36, 3, '13:00:00', '17:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:16:48', '2025-05-09 04:16:48'),
(37, 4, '07:00:00', '11:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:17:09', '2025-05-09 04:17:09'),
(38, 4, '07:00:00', '11:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:17:09', '2025-05-09 04:17:09'),
(39, 4, '07:00:00', '11:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:17:09', '2025-05-09 04:17:09'),
(40, 4, '07:00:00', '11:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:17:09', '2025-05-09 04:17:09'),
(41, 4, '07:00:00', '11:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:17:09', '2025-05-09 04:17:09'),
(42, 4, '07:00:00', '11:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:17:09', '2025-05-09 04:17:09'),
(43, 4, '13:00:00', '17:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:17:11', '2025-05-09 04:17:11'),
(44, 4, '13:00:00', '17:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:17:11', '2025-05-09 04:17:11'),
(45, 4, '13:00:00', '17:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:17:11', '2025-05-09 04:17:11'),
(46, 4, '13:00:00', '17:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:17:11', '2025-05-09 04:17:11'),
(47, 4, '13:00:00', '17:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:17:11', '2025-05-09 04:17:11'),
(48, 4, '13:00:00', '17:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:17:11', '2025-05-09 04:17:11'),
(49, 5, '07:00:00', '11:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:17:16', '2025-05-09 04:17:16'),
(50, 5, '07:00:00', '11:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:17:16', '2025-05-09 04:17:16'),
(51, 5, '07:00:00', '11:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:17:16', '2025-05-09 04:17:16'),
(52, 5, '07:00:00', '11:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:17:16', '2025-05-09 04:17:16'),
(53, 5, '07:00:00', '11:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:17:16', '2025-05-09 04:17:16'),
(54, 5, '07:00:00', '11:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:17:16', '2025-05-09 04:17:16'),
(55, 5, '13:00:00', '17:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:17:18', '2025-05-09 04:17:18'),
(56, 5, '13:00:00', '17:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:17:18', '2025-05-09 04:17:18'),
(57, 5, '13:00:00', '17:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:17:18', '2025-05-09 04:17:18'),
(58, 5, '13:00:00', '17:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:17:18', '2025-05-09 04:17:18'),
(59, 5, '13:00:00', '17:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:17:18', '2025-05-09 04:17:18'),
(60, 5, '13:00:00', '17:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:17:18', '2025-05-09 04:17:18'),
(61, 6, '07:00:00', '11:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:17:22', '2025-05-09 04:17:22'),
(62, 6, '07:00:00', '11:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:17:22', '2025-05-09 04:17:22'),
(63, 6, '07:00:00', '11:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:17:22', '2025-05-09 04:17:22'),
(64, 6, '07:00:00', '11:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:17:22', '2025-05-09 04:17:22'),
(65, 6, '07:00:00', '11:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:17:22', '2025-05-09 04:17:22'),
(66, 6, '07:00:00', '11:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:17:23', '2025-05-09 04:17:23'),
(67, 6, '13:00:00', '17:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:17:24', '2025-05-09 04:17:24'),
(68, 6, '13:00:00', '17:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:17:24', '2025-05-09 04:17:24'),
(69, 6, '13:00:00', '17:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:17:24', '2025-05-09 04:17:24'),
(70, 6, '13:00:00', '17:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:17:24', '2025-05-09 04:17:24'),
(71, 6, '13:00:00', '17:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:17:24', '2025-05-09 04:17:24'),
(72, 6, '13:00:00', '17:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:17:24', '2025-05-09 04:17:24'),
(73, 8, '07:00:00', '11:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:17:28', '2025-05-09 04:17:28'),
(74, 8, '07:00:00', '11:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:17:28', '2025-05-09 04:17:28'),
(75, 8, '07:00:00', '11:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:17:28', '2025-05-09 04:17:28'),
(76, 8, '07:00:00', '11:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:17:28', '2025-05-09 04:17:28'),
(77, 8, '07:00:00', '11:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:17:28', '2025-05-09 04:17:28'),
(78, 8, '07:00:00', '11:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:17:28', '2025-05-09 04:17:28'),
(79, 8, '13:00:00', '17:00:00', '2025-05-12', NULL, 1, 0, '2025-05-09 04:17:30', '2025-05-09 04:17:30'),
(80, 8, '13:00:00', '17:00:00', '2025-05-13', NULL, 1, 0, '2025-05-09 04:17:30', '2025-05-09 04:17:30'),
(81, 8, '13:00:00', '17:00:00', '2025-05-14', NULL, 1, 0, '2025-05-09 04:17:30', '2025-05-09 04:17:30'),
(82, 8, '13:00:00', '17:00:00', '2025-05-15', NULL, 1, 0, '2025-05-09 04:17:30', '2025-05-09 04:17:30'),
(83, 8, '13:00:00', '17:00:00', '2025-05-16', NULL, 1, 0, '2025-05-09 04:17:30', '2025-05-09 04:17:30'),
(84, 8, '13:00:00', '17:00:00', '2025-05-17', NULL, 1, 0, '2025-05-09 04:17:30', '2025-05-09 04:17:30'),
(85, 1, '07:00:00', '11:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:18:01', '2025-05-09 04:18:01'),
(86, 1, '07:00:00', '11:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:18:01', '2025-05-09 04:18:01'),
(87, 1, '07:00:00', '11:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:18:01', '2025-05-09 04:18:01'),
(88, 1, '07:00:00', '11:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:18:01', '2025-05-09 04:18:01'),
(89, 1, '07:00:00', '11:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:18:01', '2025-05-09 04:18:01'),
(90, 1, '07:00:00', '11:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:18:01', '2025-05-09 04:18:01'),
(91, 1, '13:00:00', '17:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:18:03', '2025-05-09 04:18:03'),
(92, 1, '13:00:00', '17:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:18:03', '2025-05-09 04:18:03'),
(93, 1, '13:00:00', '17:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:18:03', '2025-05-09 04:18:03'),
(94, 1, '13:00:00', '17:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:18:03', '2025-05-09 04:18:03'),
(95, 1, '13:00:00', '17:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:18:03', '2025-05-09 04:18:03'),
(96, 1, '13:00:00', '17:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:18:03', '2025-05-09 04:18:03'),
(97, 2, '07:00:00', '11:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:20:49', '2025-05-09 04:20:49'),
(98, 2, '07:00:00', '11:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:20:49', '2025-05-09 04:20:49'),
(99, 2, '07:00:00', '11:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:20:49', '2025-05-09 04:20:49'),
(100, 2, '07:00:00', '11:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:20:49', '2025-05-09 04:20:49'),
(101, 2, '07:00:00', '11:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:20:49', '2025-05-09 04:20:49'),
(102, 2, '07:00:00', '11:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:20:49', '2025-05-09 04:20:49'),
(103, 2, '13:00:00', '17:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:20:51', '2025-05-09 04:20:51'),
(104, 2, '13:00:00', '17:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:20:51', '2025-05-09 04:20:51'),
(105, 2, '13:00:00', '17:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:20:51', '2025-05-09 04:20:51'),
(106, 2, '13:00:00', '17:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:20:51', '2025-05-09 04:20:51'),
(107, 2, '13:00:00', '17:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:20:51', '2025-05-09 04:20:51'),
(108, 2, '13:00:00', '17:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:20:51', '2025-05-09 04:20:51'),
(109, 3, '07:00:00', '11:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:20:55', '2025-05-09 04:20:55'),
(110, 3, '07:00:00', '11:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:20:55', '2025-05-09 04:20:55'),
(111, 3, '07:00:00', '11:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:20:55', '2025-05-09 04:20:55'),
(112, 3, '07:00:00', '11:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:20:55', '2025-05-09 04:20:55'),
(113, 3, '07:00:00', '11:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:20:55', '2025-05-09 04:20:55'),
(114, 3, '07:00:00', '11:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:20:55', '2025-05-09 04:20:55'),
(115, 3, '13:00:00', '17:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:20:57', '2025-05-09 04:20:57'),
(116, 3, '13:00:00', '17:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:20:57', '2025-05-09 04:20:57'),
(117, 3, '13:00:00', '17:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:20:57', '2025-05-09 04:20:57'),
(118, 3, '13:00:00', '17:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:20:57', '2025-05-09 04:20:57'),
(119, 3, '13:00:00', '17:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:20:57', '2025-05-09 04:20:57'),
(120, 3, '13:00:00', '17:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:20:57', '2025-05-09 04:20:57'),
(121, 4, '07:00:00', '11:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:21:00', '2025-05-09 04:21:00'),
(122, 4, '07:00:00', '11:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:21:00', '2025-05-09 04:21:00'),
(123, 4, '07:00:00', '11:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:21:00', '2025-05-09 04:21:00'),
(124, 4, '07:00:00', '11:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:21:00', '2025-05-09 04:21:00'),
(125, 4, '07:00:00', '11:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:21:00', '2025-05-09 04:21:00'),
(126, 4, '07:00:00', '11:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:21:00', '2025-05-09 04:21:00'),
(127, 4, '13:00:00', '17:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:21:03', '2025-05-09 04:21:03'),
(128, 4, '13:00:00', '17:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:21:03', '2025-05-09 04:21:03'),
(129, 4, '13:00:00', '17:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:21:03', '2025-05-09 04:21:03'),
(130, 4, '13:00:00', '17:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:21:03', '2025-05-09 04:21:03'),
(131, 4, '13:00:00', '17:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:21:03', '2025-05-09 04:21:03'),
(132, 4, '13:00:00', '17:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:21:03', '2025-05-09 04:21:03'),
(133, 5, '07:00:00', '11:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:21:06', '2025-05-09 04:21:06'),
(134, 5, '07:00:00', '11:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:21:06', '2025-05-09 04:21:06'),
(135, 5, '07:00:00', '11:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:21:06', '2025-05-09 04:21:06'),
(136, 5, '07:00:00', '11:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:21:06', '2025-05-09 04:21:06'),
(137, 5, '07:00:00', '11:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:21:06', '2025-05-09 04:21:06'),
(138, 5, '07:00:00', '11:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:21:06', '2025-05-09 04:21:06'),
(139, 5, '13:00:00', '17:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:21:08', '2025-05-09 04:21:08'),
(140, 5, '13:00:00', '17:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:21:08', '2025-05-09 04:21:08'),
(141, 5, '13:00:00', '17:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:21:08', '2025-05-09 04:21:08'),
(142, 5, '13:00:00', '17:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:21:08', '2025-05-09 04:21:08'),
(143, 5, '13:00:00', '17:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:21:08', '2025-05-09 04:21:08'),
(144, 5, '13:00:00', '17:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:21:08', '2025-05-09 04:21:08'),
(145, 6, '07:00:00', '11:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:21:12', '2025-05-09 04:21:12'),
(146, 6, '07:00:00', '11:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:21:12', '2025-05-09 04:21:12'),
(147, 6, '07:00:00', '11:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:21:12', '2025-05-09 04:21:12'),
(148, 6, '07:00:00', '11:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:21:13', '2025-05-09 04:21:13'),
(149, 6, '07:00:00', '11:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:21:13', '2025-05-09 04:21:13'),
(150, 6, '07:00:00', '11:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:21:13', '2025-05-09 04:21:13'),
(151, 6, '13:00:00', '17:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:21:14', '2025-05-09 04:21:14'),
(152, 6, '13:00:00', '17:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:21:14', '2025-05-09 04:21:14'),
(153, 6, '13:00:00', '17:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:21:14', '2025-05-09 04:21:14'),
(154, 6, '13:00:00', '17:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:21:14', '2025-05-09 04:21:14'),
(155, 6, '13:00:00', '17:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:21:14', '2025-05-09 04:21:14'),
(156, 6, '13:00:00', '17:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:21:14', '2025-05-09 04:21:14'),
(157, 8, '07:00:00', '11:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:21:17', '2025-05-09 04:21:17'),
(158, 8, '07:00:00', '11:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:21:17', '2025-05-09 04:21:17'),
(159, 8, '07:00:00', '11:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:21:17', '2025-05-09 04:21:17'),
(160, 8, '07:00:00', '11:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:21:17', '2025-05-09 04:21:17'),
(161, 8, '07:00:00', '11:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:21:17', '2025-05-09 04:21:17'),
(162, 8, '07:00:00', '11:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:21:17', '2025-05-09 04:21:17'),
(163, 8, '13:00:00', '17:00:00', '2025-05-19', NULL, 1, 0, '2025-05-09 04:21:18', '2025-05-09 04:21:18'),
(164, 8, '13:00:00', '17:00:00', '2025-05-20', NULL, 1, 0, '2025-05-09 04:21:18', '2025-05-09 04:21:18'),
(165, 8, '13:00:00', '17:00:00', '2025-05-21', NULL, 1, 0, '2025-05-09 04:21:18', '2025-05-09 04:21:18'),
(166, 8, '13:00:00', '17:00:00', '2025-05-22', NULL, 1, 0, '2025-05-09 04:21:18', '2025-05-09 04:21:18'),
(167, 8, '13:00:00', '17:00:00', '2025-05-23', NULL, 1, 0, '2025-05-09 04:21:18', '2025-05-09 04:21:18'),
(168, 8, '13:00:00', '17:00:00', '2025-05-24', NULL, 1, 0, '2025-05-09 04:21:18', '2025-05-09 04:21:18'),
(169, 1, '07:00:00', '11:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:01', '2025-05-09 05:37:01'),
(170, 1, '07:00:00', '11:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:01', '2025-05-09 05:37:01'),
(171, 1, '07:00:00', '11:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:01', '2025-05-09 05:37:01'),
(172, 1, '07:00:00', '11:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:01', '2025-05-09 05:37:01'),
(173, 1, '07:00:00', '11:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:01', '2025-05-09 05:37:01'),
(174, 1, '07:00:00', '11:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:01', '2025-05-09 05:37:01'),
(175, 1, '13:00:00', '17:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:04', '2025-05-09 05:37:04'),
(176, 1, '13:00:00', '17:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:04', '2025-05-09 05:37:04'),
(177, 1, '13:00:00', '17:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:04', '2025-05-09 05:37:04'),
(178, 1, '13:00:00', '17:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:04', '2025-05-09 05:37:04'),
(179, 1, '13:00:00', '17:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:04', '2025-05-09 05:37:04'),
(180, 1, '13:00:00', '17:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:04', '2025-05-09 05:37:04'),
(181, 2, '07:00:00', '11:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:06', '2025-05-09 05:37:06'),
(182, 2, '07:00:00', '11:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:06', '2025-05-09 05:37:06'),
(183, 2, '07:00:00', '11:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:06', '2025-05-09 05:37:06'),
(184, 2, '07:00:00', '11:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:06', '2025-05-09 05:37:06'),
(185, 2, '07:00:00', '11:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:06', '2025-05-09 05:37:06'),
(186, 2, '07:00:00', '11:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:07', '2025-05-09 05:37:07'),
(187, 2, '13:00:00', '17:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:09', '2025-05-09 05:37:09'),
(188, 2, '13:00:00', '17:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:09', '2025-05-09 05:37:09'),
(189, 2, '13:00:00', '17:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:09', '2025-05-09 05:37:09'),
(190, 2, '13:00:00', '17:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:09', '2025-05-09 05:37:09'),
(191, 2, '13:00:00', '17:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:09', '2025-05-09 05:37:09'),
(192, 2, '13:00:00', '17:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:09', '2025-05-09 05:37:09'),
(193, 3, '07:00:00', '11:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:12', '2025-05-09 05:37:12'),
(194, 3, '07:00:00', '11:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:12', '2025-05-09 05:37:12'),
(195, 3, '07:00:00', '11:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:12', '2025-05-09 05:37:12'),
(196, 3, '07:00:00', '11:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:12', '2025-05-09 05:37:12'),
(197, 3, '07:00:00', '11:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:12', '2025-05-09 05:37:12'),
(198, 3, '07:00:00', '11:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:12', '2025-05-09 05:37:12'),
(199, 3, '13:00:00', '17:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:14', '2025-05-09 05:37:14'),
(200, 3, '13:00:00', '17:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:14', '2025-05-09 05:37:14'),
(201, 3, '13:00:00', '17:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:14', '2025-05-09 05:37:14'),
(202, 3, '13:00:00', '17:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:14', '2025-05-09 05:37:14'),
(203, 3, '13:00:00', '17:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:14', '2025-05-09 05:37:14'),
(204, 3, '13:00:00', '17:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:14', '2025-05-09 05:37:14'),
(205, 4, '07:00:00', '11:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:17', '2025-05-09 05:37:17'),
(206, 4, '07:00:00', '11:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:17', '2025-05-09 05:37:17'),
(207, 4, '07:00:00', '11:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:17', '2025-05-09 05:37:17'),
(208, 4, '07:00:00', '11:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:17', '2025-05-09 05:37:17'),
(209, 4, '07:00:00', '11:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:17', '2025-05-09 05:37:17'),
(210, 4, '07:00:00', '11:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:17', '2025-05-09 05:37:17'),
(211, 4, '13:00:00', '17:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:18', '2025-05-09 05:37:18'),
(212, 4, '13:00:00', '17:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:18', '2025-05-09 05:37:18'),
(213, 4, '13:00:00', '17:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:18', '2025-05-09 05:37:18'),
(214, 4, '13:00:00', '17:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:18', '2025-05-09 05:37:18'),
(215, 4, '13:00:00', '17:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:18', '2025-05-09 05:37:18'),
(216, 4, '13:00:00', '17:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:18', '2025-05-09 05:37:18'),
(217, 5, '07:00:00', '11:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:23', '2025-05-09 05:37:23'),
(218, 5, '07:00:00', '11:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:23', '2025-05-09 05:37:23'),
(219, 5, '07:00:00', '11:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:23', '2025-05-09 05:37:23'),
(220, 5, '07:00:00', '11:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:23', '2025-05-09 05:37:23'),
(221, 5, '07:00:00', '11:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:23', '2025-05-09 05:37:23'),
(222, 5, '07:00:00', '11:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:23', '2025-05-09 05:37:23'),
(223, 5, '13:00:00', '17:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:26', '2025-05-09 05:37:26'),
(224, 5, '13:00:00', '17:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:26', '2025-05-09 05:37:26'),
(225, 5, '13:00:00', '17:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:26', '2025-05-09 05:37:26'),
(226, 5, '13:00:00', '17:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:26', '2025-05-09 05:37:26'),
(227, 5, '13:00:00', '17:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:26', '2025-05-09 05:37:26'),
(228, 5, '13:00:00', '17:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:26', '2025-05-09 05:37:26'),
(229, 6, '07:00:00', '11:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:29', '2025-05-09 05:37:29'),
(230, 6, '07:00:00', '11:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:29', '2025-05-09 05:37:29'),
(231, 6, '07:00:00', '11:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:29', '2025-05-09 05:37:29'),
(232, 6, '07:00:00', '11:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:29', '2025-05-09 05:37:29'),
(233, 6, '07:00:00', '11:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:29', '2025-05-09 05:37:29'),
(234, 6, '07:00:00', '11:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:29', '2025-05-09 05:37:29'),
(235, 6, '13:00:00', '17:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:31', '2025-05-09 05:37:31'),
(236, 6, '13:00:00', '17:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:31', '2025-05-09 05:37:31'),
(237, 6, '13:00:00', '17:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:31', '2025-05-09 05:37:31'),
(238, 6, '13:00:00', '17:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:31', '2025-05-09 05:37:31'),
(239, 6, '13:00:00', '17:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:31', '2025-05-09 05:37:31'),
(240, 6, '13:00:00', '17:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:31', '2025-05-09 05:37:31'),
(241, 8, '07:00:00', '11:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:34', '2025-05-09 05:37:34'),
(242, 8, '07:00:00', '11:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:34', '2025-05-09 05:37:34'),
(243, 8, '07:00:00', '11:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:34', '2025-05-09 05:37:34'),
(244, 8, '07:00:00', '11:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:34', '2025-05-09 05:37:34'),
(245, 8, '07:00:00', '11:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:34', '2025-05-09 05:37:34'),
(246, 8, '07:00:00', '11:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:34', '2025-05-09 05:37:34'),
(247, 8, '13:00:00', '17:00:00', '2025-05-26', NULL, 1, 0, '2025-05-09 05:37:36', '2025-05-09 05:37:36'),
(248, 8, '13:00:00', '17:00:00', '2025-05-27', NULL, 1, 0, '2025-05-09 05:37:36', '2025-05-09 05:37:36'),
(249, 8, '13:00:00', '17:00:00', '2025-05-28', NULL, 1, 0, '2025-05-09 05:37:36', '2025-05-09 05:37:36'),
(250, 8, '13:00:00', '17:00:00', '2025-05-29', NULL, 1, 0, '2025-05-09 05:37:36', '2025-05-09 05:37:36'),
(251, 8, '13:00:00', '17:00:00', '2025-05-30', NULL, 1, 0, '2025-05-09 05:37:36', '2025-05-09 05:37:36'),
(252, 8, '13:00:00', '17:00:00', '2025-05-31', NULL, 1, 0, '2025-05-09 05:37:36', '2025-05-09 05:37:36'),
(253, 1, '07:00:00', '11:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:13', '2025-05-09 05:40:13'),
(254, 1, '07:00:00', '11:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:13', '2025-05-09 05:40:13'),
(255, 1, '07:00:00', '11:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:13', '2025-05-09 05:40:13'),
(256, 1, '07:00:00', '11:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:13', '2025-05-09 05:40:13'),
(257, 1, '07:00:00', '11:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:13', '2025-05-09 05:40:13'),
(258, 1, '07:00:00', '11:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:13', '2025-05-09 05:40:13'),
(259, 1, '13:00:00', '17:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:14', '2025-05-09 05:40:14'),
(260, 1, '13:00:00', '17:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:14', '2025-05-09 05:40:14'),
(261, 1, '13:00:00', '17:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:14', '2025-05-09 05:40:14'),
(262, 1, '13:00:00', '17:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:14', '2025-05-09 05:40:14'),
(263, 1, '13:00:00', '17:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:14', '2025-05-09 05:40:14'),
(264, 1, '13:00:00', '17:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:14', '2025-05-09 05:40:14'),
(265, 2, '07:00:00', '11:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:18', '2025-05-09 05:40:18'),
(266, 2, '07:00:00', '11:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:18', '2025-05-09 05:40:18'),
(267, 2, '07:00:00', '11:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:18', '2025-05-09 05:40:18'),
(268, 2, '07:00:00', '11:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:18', '2025-05-09 05:40:18'),
(269, 2, '07:00:00', '11:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:18', '2025-05-09 05:40:18'),
(270, 2, '07:00:00', '11:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:18', '2025-05-09 05:40:18'),
(271, 2, '13:00:00', '17:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:19', '2025-05-09 05:40:19'),
(272, 2, '13:00:00', '17:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:19', '2025-05-09 05:40:19'),
(273, 2, '13:00:00', '17:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:19', '2025-05-09 05:40:19'),
(274, 2, '13:00:00', '17:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:19', '2025-05-09 05:40:19'),
(275, 2, '13:00:00', '17:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:19', '2025-05-09 05:40:19'),
(276, 2, '13:00:00', '17:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:19', '2025-05-09 05:40:19'),
(277, 3, '07:00:00', '11:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:22', '2025-05-09 05:40:22'),
(278, 3, '07:00:00', '11:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:22', '2025-05-09 05:40:22'),
(279, 3, '07:00:00', '11:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:22', '2025-05-09 05:40:22'),
(280, 3, '07:00:00', '11:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:22', '2025-05-09 05:40:22'),
(281, 3, '07:00:00', '11:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:22', '2025-05-09 05:40:22'),
(282, 3, '07:00:00', '11:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:22', '2025-05-09 05:40:22'),
(283, 3, '13:00:00', '17:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:23', '2025-05-09 05:40:23'),
(284, 3, '13:00:00', '17:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:23', '2025-05-09 05:40:23'),
(285, 3, '13:00:00', '17:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:23', '2025-05-09 05:40:23'),
(286, 3, '13:00:00', '17:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:23', '2025-05-09 05:40:23'),
(287, 3, '13:00:00', '17:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:23', '2025-05-09 05:40:23'),
(288, 3, '13:00:00', '17:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:23', '2025-05-09 05:40:23'),
(289, 4, '07:00:00', '11:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:26', '2025-05-09 05:40:26'),
(290, 4, '07:00:00', '11:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:27', '2025-05-09 05:40:27'),
(291, 4, '07:00:00', '11:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:28', '2025-05-09 05:40:28'),
(292, 4, '07:00:00', '11:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:28', '2025-05-09 05:40:28'),
(293, 4, '07:00:00', '11:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:28', '2025-05-09 05:40:28'),
(294, 4, '07:00:00', '11:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:28', '2025-05-09 05:40:28'),
(295, 4, '13:00:00', '17:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:29', '2025-05-09 05:40:29'),
(296, 4, '13:00:00', '17:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:29', '2025-05-09 05:40:29'),
(297, 4, '13:00:00', '17:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:29', '2025-05-09 05:40:29'),
(298, 4, '13:00:00', '17:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:30', '2025-05-09 05:40:30'),
(299, 4, '13:00:00', '17:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:30', '2025-05-09 05:40:30'),
(300, 4, '13:00:00', '17:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:30', '2025-05-09 05:40:30'),
(301, 5, '07:00:00', '11:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:31', '2025-05-09 05:40:31'),
(302, 5, '07:00:00', '11:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(303, 5, '07:00:00', '11:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(304, 5, '07:00:00', '11:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(305, 5, '07:00:00', '11:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(306, 5, '07:00:00', '11:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(307, 5, '13:00:00', '17:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(308, 5, '13:00:00', '17:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(309, 5, '13:00:00', '17:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(310, 5, '13:00:00', '17:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(311, 5, '13:00:00', '17:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(312, 5, '13:00:00', '17:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:32', '2025-05-09 05:40:32'),
(313, 6, '07:00:00', '11:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:36', '2025-05-09 05:40:36'),
(314, 6, '07:00:00', '11:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:36', '2025-05-09 05:40:36'),
(315, 6, '07:00:00', '11:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:36', '2025-05-09 05:40:36'),
(316, 6, '07:00:00', '11:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:36', '2025-05-09 05:40:36'),
(317, 6, '07:00:00', '11:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:36', '2025-05-09 05:40:36'),
(318, 6, '07:00:00', '11:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:37', '2025-05-09 05:40:37'),
(319, 6, '13:00:00', '17:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:40:57', '2025-05-09 05:40:57'),
(320, 6, '13:00:00', '17:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:40:57', '2025-05-09 05:40:57'),
(321, 6, '13:00:00', '17:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:40:57', '2025-05-09 05:40:57'),
(322, 6, '13:00:00', '17:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:40:57', '2025-05-09 05:40:57'),
(323, 6, '13:00:00', '17:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:40:57', '2025-05-09 05:40:57'),
(324, 6, '13:00:00', '17:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:40:57', '2025-05-09 05:40:57'),
(325, 8, '07:00:00', '11:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:41:04', '2025-05-09 05:41:04'),
(326, 8, '07:00:00', '11:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:41:04', '2025-05-09 05:41:04'),
(327, 8, '07:00:00', '11:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:41:04', '2025-05-09 05:41:04'),
(328, 8, '07:00:00', '11:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:41:04', '2025-05-09 05:41:04'),
(329, 8, '07:00:00', '11:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:41:04', '2025-05-09 05:41:04'),
(330, 8, '07:00:00', '11:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:41:04', '2025-05-09 05:41:04'),
(331, 8, '13:00:00', '17:00:00', '2025-06-02', NULL, 1, 0, '2025-05-09 05:41:05', '2025-05-09 05:41:05'),
(332, 8, '13:00:00', '17:00:00', '2025-06-03', NULL, 1, 0, '2025-05-09 05:41:05', '2025-05-09 05:41:05'),
(333, 8, '13:00:00', '17:00:00', '2025-06-04', NULL, 1, 0, '2025-05-09 05:41:05', '2025-05-09 05:41:05'),
(334, 8, '13:00:00', '17:00:00', '2025-06-05', NULL, 1, 0, '2025-05-09 05:41:05', '2025-05-09 05:41:05'),
(335, 8, '13:00:00', '17:00:00', '2025-06-06', NULL, 1, 0, '2025-05-09 05:41:05', '2025-05-09 05:41:05'),
(336, 8, '13:00:00', '17:00:00', '2025-06-07', NULL, 1, 0, '2025-05-09 05:41:05', '2025-05-09 05:41:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `services`
--

CREATE TABLE `services` (
  `id` bigint UNSIGNED NOT NULL,
  `specialty_id` bigint UNSIGNED NOT NULL,
  `services_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `price` decimal(15,0) NOT NULL,
  `duration` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `services`
--

INSERT INTO `services` (`id`, `specialty_id`, `services_name`, `image`, `description`, `price`, `duration`, `status`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Khám nội khoa', 'services/j8eKQsN4XU40pmujl8LPFXYOPGRRneoRaOdsHYyR.png', '<p><strong>Khám Nội Khoa Tổng Quát&nbsp;</strong></p><p><strong>Hỏi Bệnh Sử:</strong> Lý do khám, tiền sử (bản thân, gia đình, dị ứng, thói quen, thuốc), triệu chứng hiện tại (toàn thân, tim mạch, hô hấp, tiêu hóa, tiết niệu, nội tiết, thần kinh, cơ xương khớp, huyết học, dị ứng).</p><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Toàn trạng:</strong> Ý thức, thể trạng, dấu hiệu sinh tồn (mạch, nhiệt độ, huyết áp, nhịp thở, BMI).</li><li><strong>Da, niêm mạc.</strong></li><li><strong>Đầu mặt cổ:</strong> Mắt, tai mũi họng, tuyến giáp, hạch.</li><li><strong>Ngực:</strong> Tim (nghe), phổi (nghe).</li><li><strong>Bụng:</strong> Nhìn, nghe, sờ.</li></ul><p><strong>Kết Luận</strong></p>', 300000, 30, 1, 0, '2025-04-01 09:00:00', '2025-05-10 04:28:05'),
(2, 4, 'Siêu âm tim qua thành ngực', 'services/GRIoRboRYtDEBFuoLwQJEKMP0RrQcgv0tPNwiXq7.png', '<p><strong>Siêu âm tim qua thành ngực (Transthoracic Echocardiography - TTE)</strong></p><p><strong>Các mặt cắt cơ bản thường sử dụng:</strong></p><ul><li><strong>Cạnh ức trục dọc (Parasternal Long Axis - PLAX):</strong> Cung cấp hình ảnh về thất trái, thất phải, van hai lá, van động mạch chủ, nhĩ trái và động mạch chủ lên.</li><li><strong>Cạnh ức trục ngắn (Parasternal Short Axis - PSAX):</strong> Hiển thị hình ảnh cắt ngang của tim ở các mức độ khác nhau (van động mạch chủ, van hai lá, cơ nhú).</li><li><strong>Mỏm tim bốn buồng (Apical 4 Chamber - A4C):</strong> Thấy rõ cả bốn buồng tim, van hai lá, van ba lá, vách liên thất và vách liên nhĩ.</li><li><strong>Mỏm tim hai buồng (Apical 2 Chamber - A2C):</strong> Tập trung vào thất trái, nhĩ trái và van hai lá.</li><li><strong>Mỏm tim ba buồng (Apical 3 Chamber - A3C):</strong> Tương tự PLAX nhưng nhìn từ mỏm tim.</li><li><strong>Dưới sườn (Subcostal):</strong> Thường dùng khi cửa sổ siêu âm qua thành ngực kém, giúp quan sát bốn buồng tim và tĩnh mạch chủ dưới.</li><li><strong>Trên hõm ức (Suprasternal Notch):</strong> Quan sát cung động mạch chủ và các nhánh của nó.</li></ul><p><strong>Các thông số và bệnh lý:</strong></p><ul><li><strong>Kích thước các buồng tim:</strong> Phát hiện tình trạng giãn buồng tim.</li><li><strong>Chức năng tâm thu thất trái:</strong> Phân suất tống máu (Ejection Fraction - EF), vận động vùng thành tim.</li><li><strong>Chức năng tâm trương thất trái:</strong> Các chỉ số như E/A, E/e\'.</li><li><strong>Bệnh van tim:</strong> Hẹp van (diện tích van, gradient áp lực), hở van (mức độ hở, dòng hở).</li><li><strong>Áp lực động mạch phổi:</strong> Ước tính dựa trên vận tốc dòng hở van ba lá.</li><li><strong>Bệnh màng ngoài tim:</strong> Tràn dịch màng ngoài tim (số lượng, vị trí), dày màng ngoài tim.</li><li><strong>Bệnh tim bẩm sinh:</strong> Phát hiện các bất thường về cấu trúc tim (ví dụ: thông liên thất, thông liên nhĩ).</li><li><strong>Khối u trong tim, huyết khối.</strong></li><li><strong>Viêm nội tâm mạc:</strong> Phát hiện sùi van tim (vegetations).</li><li><strong>Bệnh cơ tim:</strong> Phì đại, giãn nở, hạn chế.</li><li><strong>Đánh giá ảnh hưởng của các bệnh lý toàn thân lên tim.</strong></li></ul><p><strong>Kết Luận</strong></p>', 400000, 30, 1, 0, '2025-04-02 10:00:00', '2025-05-10 05:16:37'),
(3, 2, 'Siêu âm Thai', 'services/qI5FryMEc8zd59n3PPJrYSaLNJUXY8mxMI7qrtQt.png', '<p><strong>Siêu âm Thai (Obstetrical Ultrasound)</strong></p><p><strong>Các phương pháp siêu âm thai:</strong></p><ul><li><strong>Siêu âm qua bụng (Transabdominal Ultrasound):</strong> Đây là phương pháp phổ biến nhất, thường được thực hiện sau tuần thai thứ 6-8 khi thai nhi đủ lớn để quan sát qua thành bụng. Gel siêu âm được bôi lên bụng người mẹ, và đầu dò được di chuyển trên bề mặt bụng để thu hình ảnh.</li><li><strong>Siêu âm đầu dò âm đạo (Transvaginal Ultrasound):</strong> Đầu dò nhỏ, được bao phủ bởi một lớp bảo vệ vô trùng và bôi trơn, được đưa nhẹ nhàng vào âm đạo. Phương pháp này thường được sử dụng trong giai đoạn sớm của thai kỳ (trước tuần thai thứ 12) để có hình ảnh rõ nét hơn về phôi thai, túi thai và các cấu trúc vùng chậu.</li></ul><p><strong>Các thông số và bệnh lý có thể đánh giá:</strong></p><ul><li><strong>Xác định tuổi thai và ngày dự sinh:</strong> Dựa trên kích thước của túi thai và chiều dài đầu mông (CRL) trong tam cá nguyệt đầu tiên.</li><li><strong>Đánh giá số lượng thai:</strong> Thai đơn, thai đôi, hoặc đa thai.</li><li><strong>Xác định vị trí thai:</strong> Trong tử cung hay ngoài tử cung (chửa ngoài tử cung).</li><li><strong>Đánh giá tim thai:</strong> Phát hiện hoạt động tim thai và nhịp tim thai.</li><li><strong>Đánh giá sự phát triển của thai nhi:</strong> Đo đạc các chỉ số sinh trắc học như đường kính lưỡng đỉnh (BPD), chiều dài đầu mông (CRL), chu vi đầu (HC), chu vi bụng (AC), chiều dài xương đùi (FL) để ước tính cân nặng thai và theo dõi sự phát triển theo tuổi thai.</li><li><strong>Đánh giá hình thái học thai nhi:</strong> Phát hiện các bất thường về cấu trúc và hình thái của các cơ quan và hệ thống của thai nhi (ví dụ: não, tim, cột sống, chi, nội tạng).</li><li><strong>Đánh giá vị trí và tình trạng nhau thai:</strong> Vị trí bám (mặt trước, mặt sau, đáy tử cung), tình trạng bánh nhau (độ trưởng thành), phát hiện các bất thường như nhau tiền đạo, bong non.</li><li><strong>Đánh giá lượng nước ối:</strong> Đánh giá chỉ số nước ối (AFI) hoặc khoang ối lớn nhất (MPV) để phát hiện thiểu ối hoặc đa ối.</li><li><strong>Đánh giá chiều dài kênh cổ tử cung:</strong> Đo chiều dài cổ tử cung để đánh giá nguy cơ sinh non.</li><li><strong>Hỗ trợ các thủ thuật xâm lấn:</strong> Hướng dẫn chọc ối, sinh thiết gai rau.</li><li><strong>Đánh giá Doppler:</strong> Đo lưu lượng máu trong các mạch máu của mẹ và thai nhi (ví dụ: động mạch rốn, động mạch não giữa) để đánh giá tình trạng sức khỏe của thai nhi và phát hiện các dấu hiệu suy thai.</li></ul><p><strong>Kết luận</strong></p>', 900000, 30, 1, 0, '2025-04-03 11:00:00', '2025-05-10 05:19:37'),
(4, 3, 'Khám da liễu tổng quát', 'services/wHwBDpJMIVwwJx8FJVan5re9na91eQJAlnOdHmje.png', '<p><strong>Khám Da Liễu</strong></p><p><strong>Hỏi Bệnh Sử:</strong></p><ul><li><strong>Triệu chứng da:</strong> Vị trí, thời gian, hình thái (ban, sẩn, mụn, vảy, loét...), kích thước, số lượng, màu sắc, tính chất (ngứa, đau...). Yếu tố tăng giảm.</li><li><strong>Triệu chứng toàn thân kèm theo.</strong></li><li><strong>Tiền sử:</strong> Bệnh da bản thân/gia đình, dị ứng, thuốc, bệnh nội khoa.</li><li><strong>Thói quen:</strong> Vệ sinh, mỹ phẩm, tiếp xúc hóa chất/nắng, ăn uống, stress.</li></ul><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Toàn trạng.</strong></li><li><strong>Khám da toàn thân:</strong> Mô tả chi tiết tổn thương (vị trí, số lượng, kích thước, hình thái, màu sắc, bờ, phân bố, sờ nắn).</li><li><strong>Khám tóc, móng.</strong></li><li><strong>Khám hạch vùng (nếu cần).</strong></li><li><strong>Nghiệm pháp đặc biệt (tùy trường hợp).</strong></li></ul><p><strong>Kết Luận</strong></p>', 550000, 30, 1, 0, '2025-04-04 12:00:00', '2025-05-10 05:21:54'),
(5, 5, 'Khám xương khớp', 'services/2sB5jaF5c1168o5iUjNJ3cobaGQtA6irf5xYDp6s.png', '<p><strong>Khám Xương Khớp</strong></p><p><strong>Hỏi Bệnh Sử:</strong></p><ul><li><strong>Triệu chứng:</strong> Đau khớp (vị trí, thời gian, tính chất, mức độ, yếu tố tăng giảm), sưng, cứng khớp (buổi sáng), hạn chế vận động, tiếng lạo xạo, yếu cơ, đau lưng/cổ, triệu chứng toàn thân kèm theo.</li><li><strong>Tiền sử:</strong> Bệnh xương khớp bản thân/gia đình, chấn thương, bệnh nội khoa, dị ứng, thuốc.</li><li><strong>Thói quen:</strong> Nghề nghiệp, vận động, ăn uống, hút thuốc/rượu.</li></ul><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Toàn trạng, dáng đi.</strong></li><li><strong>Khám khớp:</strong> Nhìn (sưng, đỏ, biến dạng), sờ (nhiệt độ, tràn dịch, điểm đau, lạo xạo), vận động (tầm vận động), vững chắc.</li><li><strong>Khám cột sống:</strong> Nhìn (tư thế), sờ (điểm đau, co cứng), vận động (tầm vận động), nghiệm pháp đặc biệt (Lasègue, Schober...).</li><li><strong>Khám cơ:</strong> Nhìn (teo), sờ (sức cơ, đau).</li><li><strong>Khám dấu hiệu ngoài khớp (da, mắt, niêm mạc...).</strong></li></ul><p><strong>Xét Nghiệm :</strong>&nbsp;</p><ul><li>Máu</li><li>Dịch khớp</li><li>X-quang</li><li>CT scan</li><li>Đo mật độ xương</li></ul><p><strong>Kết Luận</strong></p>', 500000, 30, 1, 0, '2025-04-05 14:00:00', '2025-05-10 05:23:58'),
(6, 4, 'Khám tim mạch cơ bản', 'services/LrGsNhxHFIszIY4NmNTojM5giM1lDiIXcmCGOFZm.png', '<p><strong>Khám Tim Mạch Cơ Bản&nbsp;</strong></p><p><strong>Hỏi Bệnh Sử:</strong> Đau ngực, khó thở, đánh trống ngực, phù, ho, chóng mặt/ngất, mệt mỏi, tím tái (nếu có). Tiền sử bệnh tim mạch/gia đình, thuốc, thói quen (hút thuốc, rượu, ăn uống, vận động), bệnh nền (đái tháo đường, mỡ máu, thận...).</p><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Toàn trạng:</strong> Dấu hiệu sinh tồn (mạch, huyết áp), phù, màu da.</li><li><strong>Cổ:</strong> Tĩnh mạch cổ nổi, tiếng thổi động mạch cảnh.</li><li><strong>Ngực:</strong> Nhìn (mỏm tim), sờ (mỏm tim, rung miu), nghe tim (tần số, nhịp, tiếng tim, tiếng thổi).</li><li><strong>Bụng:</strong> Gan to (nếu có).</li><li><strong>Mạch máu ngoại biên:</strong> Bắt mạch, nhiệt độ chi, màu sắc chi, phù.</li></ul><p><strong>Kết Luận</strong></p>', 400000, 30, 1, 0, '2025-04-06 15:00:00', '2025-05-10 04:25:37'),
(7, 2, 'Khám nhi cơ bản', 'services/J5D2QqUnuuOkt3w8Grcgf1GP6bWYRSF7Bp04N6Kj.png', '<p><strong>Khám Nhi Cơ Bản&nbsp;</strong></p><p><strong>Hỏi Bệnh Sử:</strong> Tuổi, lý do khám, tiền sử (sản khoa, phát triển, dinh dưỡng, bệnh tật, tiêm chủng), tiền sử gia đình, bệnh sử hiện tại (sốt, ho, khó thở, nôn/trớ, tiêu chảy/táo bón, bú/ăn kém, quấy khóc, thay đổi da, vàng da, co giật...).</p><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Toàn trạng:</strong> Tỉnh, cử động, dấu hiệu sinh tồn (mạch, nhiệt độ, nhịp thở, huyết áp), cân nặng/chiều cao/vòng đầu (theo tuổi).</li><li><strong>Da, niêm mạc, dấu hiệu mất nước.</strong></li><li><strong>Đầu mặt cổ:</strong> Thóp (trẻ nhỏ), mắt, tai mũi họng, hạch.</li><li><strong>Ngực:</strong> Tim (nghe), phổi (nghe), vú (trẻ lớn/dậy thì - nếu cần).</li><li><strong>Bụng:</strong> Nhìn, nghe, sờ (gan, lách).</li><li><strong>Tiết niệu - sinh dục (nếu cần).</strong></li><li><strong>Thần kinh (phản xạ sơ sinh, trương lực cơ, dấu hiệu màng não - nếu cần).</strong></li><li><strong>Cơ xương khớp (nếu cần).</strong></li><li><strong>Đánh giá phát triển (nếu cần).</strong></li></ul><p><strong>Kết Luận</strong></p>', 750000, 30, 1, 0, '2025-04-07 16:00:00', '2025-05-10 04:05:48'),
(8, 1, 'Khám tổng quát', 'services/osfGy4MfgCcyLGaQ0hP8VIY2p3tC99RDHtBT8ahr.png', '<p><strong>Khám Tổng Quát</strong></p><p><strong>Hỏi Bệnh Sử:</strong> Lý do khám, tiền sử bản thân/gia đình, dị ứng, thói quen, sản phụ khoa (nữ), phát triển (trẻ), triệu chứng hiện tại.</p><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Toàn trạng:</strong> Tỉnh táo, thể trạng, dấu hiệu sinh tồn (mạch, nhiệt độ, huyết áp, nhịp thở, BMI).</li><li><strong>Da, niêm mạc, lông, tóc, móng.</strong></li><li><strong>Đầu mặt cổ:</strong> Mắt, tai mũi họng, tuyến giáp, hạch.</li><li><strong>Ngực:</strong> Tim (nghe), phổi (nghe), vú (nữ - sờ).</li><li><strong>Bụng:</strong> Nhìn, nghe, sờ.</li><li><strong>Tiết niệu - sinh dục (nếu cần).</strong></li><li><strong>Thần kinh (nếu cần).</strong></li><li><strong>Cơ xương khớp (nếu cần).</strong></li><li><strong>Hạch ngoại biên.</strong></li></ul><p><strong>Kết Luận</strong></p>', 500000, 30, 1, 0, '2025-04-08 17:00:00', '2025-05-10 03:56:47'),
(9, 11, 'Khám tiêu hóa', 'services/tlcqX5hhVoOhJwNrBLg0YvHjteP052rkOPkMAdth.png', '<p><strong>Khám Tiêu Hóa</strong></p><p><strong>Hỏi Bệnh Sử:</strong></p><ul><li><strong>Triệu chứng:</strong> Đau bụng (vị trí, tính chất, liên quan bữa ăn/đại tiện), rối loạn tiêu hóa (buồn nôn, nôn, ợ hơi/chua, đầy bụng), thay đổi khẩu vị/cân nặng, thay đổi đại tiện (táo, lỏng, máu, đen, bạc màu), vàng da/mắt, ngứa, chướng bụng, khó nuốt, ợ nóng.</li><li><strong>Tiền sử:</strong> Bệnh tiêu hóa bản thân/gia đình, thủ thuật/phẫu thuật, thuốc, thói quen ăn uống/sinh hoạt.</li></ul><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Tổng trạng:</strong> Dấu hiệu sinh tồn, vàng da, phù, sao mạch, lòng bàn tay son.</li><li><strong>Bụng:</strong> Nhìn (hình dạng, tuần hoàn bàng hệ), nghe (nhu động ruột), gõ (đục/vang, kích thước gan/lách), sờ (nông - trương lực, điểm đau; sâu - tạng, u).</li><li><strong>Hậu môn - trực tràng:</strong> Nhìn (trĩ, nứt), thăm trực tràng (trương lực, u, máu, phân).</li></ul><p><strong>Xét Nghiệm :</strong></p><ul><li><strong>Máu:</strong> CBC, sinh hóa (gan, thận, điện giải, đường, amylase/lipase, CRP/ESR).</li><li><strong>Nước tiểu:</strong> TPTN.</li><li><strong>Phân:</strong> Soi tươi (ký sinh trùng), FOBT, nuôi cấy, calprotectin.</li><li><strong>HP test.</strong></li></ul><p><strong>Chẩn Đoán Hình Ảnh :</strong></p><ul><li>Siêu âm ổ bụng.</li><li>X-quang bụng không chuẩn bị.</li><li>Chụp dạ dày/đại tràng có thuốc cản quang.</li><li>CT/MRI ổ bụng.</li><li>Nội soi tiêu hóa (EGD, colonoscopy, ERCP, viên nang).</li></ul><p><strong>Kết Luận</strong></p>', 1200000, 60, 1, 0, '2025-04-09 09:00:00', '2025-05-10 03:54:11'),
(10, 12, 'Khám tiết niệu', 'services/PJOJLUAb5CB6SJqVIMdpEyRkhuVzqBesyZ1Xt4B6.png', '<p><strong>Khám Tiết Niệu</strong></p><p><strong>Hỏi Bệnh Sử:</strong></p><ul><li><strong>Triệu chứng:</strong> Tiểu (khó, buốt, rắt, gấp, đêm, không tự chủ, bí, tia yếu, máu, đục, màu lạ), đau (hông lưng, lan, quặn thận, trên xương mu), sốt, phù, mệt mỏi, buồn nôn.</li><li><strong>Tiền sử:</strong> Bệnh tiết niệu bản thân/gia đình, thủ thuật/phẫu thuật, thuốc, thói quen tiểu tiện/uống nước, bệnh nền (đái tháo đường, tăng huyết áp, gout).</li></ul><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Tổng trạng:</strong> Dấu hiệu sinh tồn, phù, da niêm mạc.</li><li><strong>Bụng:</strong> Nhìn, nghe, sờ (thận, niệu quản, bàng quang), gõ (bàng quang).</li><li><strong>Lưng:</strong> Vỗ hông lưng (rung thận).</li><li><strong>Bộ phận sinh dục ngoài (nam/nữ).</strong></li><li><strong>Thăm trực tràng (nam - tuyến tiền liệt).</strong></li></ul><p><strong>Xét Nghiệm :</strong></p><ul><li><strong>Nước tiểu:</strong> TPTN, cặn Addis, nuôi cấy.</li><li><strong>Máu:</strong> Ure, creatinin, eGFR, điện giải đồ, CBC.</li></ul><p><strong>Chẩn Đoán Hình Ảnh :</strong></p><ul><li>Siêu âm hệ tiết niệu.</li><li>X-quang bụng không chuẩn bị (KUB).</li><li>UIV.</li><li>CT scan/MRI hệ tiết niệu.</li><li>Xạ hình thận.</li></ul><p><strong>Kết Luận</strong></p>', 800000, 30, 1, 0, '2025-04-10 10:00:00', '2025-05-10 03:51:30'),
(11, 13, 'Khám hô hấp', 'services/haKAXw1QXpedgk7rJAW4apgv18ZQjKWSKYQy4LES.png', '<p><strong>Hỏi Bệnh Sử:</strong></p><ul><li><strong>Triệu chứng:</strong> Ho (đờm, máu), khó thở, đau ngực, khò khè, khàn tiếng, sốt, mệt mỏi, sụt cân.</li><li><strong>Tiền sử:</strong> Bệnh hô hấp bản thân/gia đình, dị ứng, hút thuốc, nghề nghiệp, tiêm phòng.</li></ul><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Tổng trạng:</strong> Dấu hiệu khó thở (cánh mũi phập phồng, co kéo), tím tái, ngón tay dùi trống.</li><li><strong>Lồng ngực:</strong><ul><li><strong>Nhìn:</strong> Hình dạng, di động.</li><li><strong>Sờ:</strong> Rung thanh, điểm đau.</li><li><strong>Gõ:</strong> Âm gõ, ranh giới phổi.</li><li><strong>Nghe:</strong> Rì rào phế nang, ran (nổ, rít, ngáy), cọ màng phổi, giảm/mất rì rào, tiếng thổi ống.</li></ul></li></ul><p><strong>Xét Nghiệm :</strong></p><ul><li>X-quang phổi.</li><li>Tổng phân tích tế bào máu.</li><li>Khí máu động mạch.</li><li>Đo chức năng hô hấp.</li><li>Xét nghiệm đờm (soi, nhuộm, nuôi cấy, AFB, tế bào học).</li><li>Pulse oximetry.</li></ul><p><strong>Xét Nghiệm Chuyên Sâu :</strong></p><ul><li>CT scan lồng ngực.</li><li>Nội soi phế quản (+ BAL, sinh thiết).</li><li>Sinh thiết phổi.</li><li>Chọc hút/xét nghiệm dịch màng phổi.</li><li>Test da lao/IGRA.</li></ul><p><strong>Kết Luận&nbsp;</strong></p>', 800000, 30, 1, 0, '2025-04-11 11:00:00', '2025-05-10 03:45:03'),
(12, 14, 'Khám nội tiết', 'services/Yd2T2MNuhBO3fyXZVLnuqImDdg4c3j8Hz1TmoJc0.png', '<p><strong>Khám Nội Tiết</strong></p><p><strong>Hỏi Bệnh Sử:</strong></p><ul><li><strong>Triệu chứng:</strong> Thay đổi cân nặng, mệt mỏi, da/tóc, nhiệt độ, nhịp tim, khát/tiểu nhiều, thị lực, tâm trạng, kinh nguyệt (nữ), sinh sản, sờ thấy tuyến to...</li><li><strong>Tiền sử:</strong> Bệnh nội tiết bản thân/gia đình, thuốc, phẫu thuật.</li><li><strong>Thói quen, bệnh nền (tự miễn).</strong></li></ul><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Tổng trạng:</strong> BMI.</li><li><strong>Da/niêm mạc:</strong> Màu sắc, độ ẩm, lông tóc, dấu hiệu đặc trưng.</li><li><strong>Tuyến giáp:</strong> Kích thước, nhân.</li><li><strong>Mắt:</strong> Lồi mắt, cử động.</li><li><strong>Tim mạch:</strong> Mạch, huyết áp.</li><li><strong>Bụng:</strong> Gan, lách.</li><li><strong>Thần kinh:</strong> Phản xạ, sức cơ.</li><li><strong>Dấu hiệu đặc trưng khác (Cushing, to đầu chi...).</strong></li></ul><p><strong>Xét Nghiệm :</strong></p><ul><li>Chức năng tuyến giáp (TSH, FT3, FT4...).</li><li>Đường huyết (đói, HbA1c...).</li><li>Chức năng thượng thận (Cortisol, ACTH...).</li><li>Chức năng tuyến yên (Prolactin, GH, LH, FSH...).</li><li>Canxi, phospho, PTH.</li><li>Hormone sinh dục.</li><li>Tự kháng thể (nếu nghi ngờ tự miễn).</li><li>Tổng phân tích máu, sinh hóa, nước tiểu.</li></ul><p><strong>Chẩn Đoán Hình Ảnh :</strong></p><ul><li>Siêu âm tuyến giáp/bụng.</li><li>X-quang.</li><li>CT/MRI (sọ não, thượng thận...).</li><li>Xạ hình tuyến giáp.</li><li>Đo mật độ xương.</li></ul><p><strong>Kết Luận</strong></p>', 1700000, 60, 1, 0, '2025-04-12 12:00:00', '2025-05-10 03:42:11'),
(13, 15, 'Khám y học cổ truyền', 'services/9WgWJzutwLaIp1hYcUTYM7n1iW70xeGeXUiHrtRe.png', '<p><strong>Khám Y Học Cổ Truyền</strong></p><p><strong>Hỏi Bệnh Sử :</strong></p><ul><li><strong>Triệu chứng:</strong><ul><li><strong>Vọng:</strong> Thần sắc, hình thể, da, lưỡi (màu sắc, rêu), đại tiểu tiện.</li><li><strong>Văn:</strong> Tiếng nói, tiếng thở, ho.</li><li><strong>Vấn:</strong> Hàn nhiệt, hãn, đầu thân, ngực bụng, ăn uống, ngủ nghỉ, tinh thần, sinh dục.</li></ul></li><li><strong>Tiền sử:</strong> Bệnh YHCT, dùng thuốc/điều trị YHCT, thói quen, môi trường.</li><li><strong>Tiền sử gia đình.</strong></li></ul><p><strong>Khám Thực Thể :</strong></p><ul><li><strong>Thiết:</strong><ul><li><strong>Mạch:</strong> Vị trí, tần số, hình thái (mô tả các bộ mạch).</li><li><strong>Sờ:</strong> Da, bụng, các vùng khác (nhiệt độ, độ ẩm, điểm đau...).</li></ul></li><li><strong>Nghe:</strong> Tiếng tim, tiếng thở (kết hợp Văn Chẩn).</li></ul><p><strong>Biện Chứng Luận Trị:</strong></p><ul><li>Bát cương (âm dương, biểu lý, hàn nhiệt, hư thực).</li><li>Tạng phủ.</li><li>Khí huyết tân dịch.</li><li>Lục dâm.</li></ul><p><strong>Chẩn Đoán :</strong></p><ul><li>Tên bệnh YHCT.</li><li>Biện pháp biện chứng chính.</li><li>Tóm tắt hội chứng.</li></ul><p><strong>Kế Hoạch Điều Trị (YHCT):</strong></p>', 980000, 30, 1, 0, '2025-04-13 13:00:00', '2025-05-10 03:39:37'),
(14, 16, 'Khám ung bướu', 'services/v5pJvOrMuEtgXSyzgbAhYdwx8SpAC4OmHpPKoZyd.png', '<p><strong>Khám Ung Bướu&nbsp;</strong></p><p><strong>Hỏi Bệnh Sử :</strong></p><ul><li>Triệu chứng nghi ngờ: sụt cân, mệt mỏi kéo dài, đau nhức xương, sốt không rõ nguyên nhân, khối u bất thường, thay đổi da/nốt ruồi, chảy máu bất thường...</li><li>Tiền sử ung thư bản thân/gia đình.</li><li>Yếu tố nguy cơ: hút thuốc, uống rượu, tiếp xúc hóa chất/tia xạ...</li></ul><p><strong>Khám Thực Thể :</strong></p><ul><li>Tổng trạng: đánh giá suy mòn.</li><li>Khám da, niêm mạc, hạch bạch huyết (kích thước, mật độ, di động).</li><li>Khám các cơ quan để phát hiện khối u hoặc dấu hiệu bất thường.</li><li>Khám kỹ vùng nghi ngờ (mô tả chi tiết khối u).</li></ul><p><strong>Xét Nghiệm :</strong></p><ul><li>Dấu ấn ung thư.</li><li>Chẩn đoán hình ảnh (X-quang, siêu âm, CT, MRI, PET/CT).</li><li>Sinh thiết (kim nhỏ, kim lõi, hở, nội soi).</li><li>Tế bào học.</li><li>Nội soi.</li><li>Xét nghiệm di truyền (trong một số trường hợp).</li></ul><p><strong>Kết Luận và Kế Hoạch Tiếp Theo:</strong></p>', 1500000, 60, 1, 0, '2025-04-14 14:00:00', '2025-05-10 03:36:32'),
(15, 17, 'Khám huyết học', 'services/B60TVcxirtFJM3QVXH8h17kP31k2edRT2KKcQq6v.png', '<p><strong>Khám Huyết Học Cơ Bản:</strong></p><p><strong>Hỏi Bệnh Sử Huyết Học:</strong></p><ul><li>Triệu chứng hiện tại (mệt mỏi, xanh xao, chảy máu, bầm tím, sốt, sụt cân, nổi hạch...).</li><li>Tiền sử các bệnh lý huyết học bản thân và gia đình (thiếu máu, rối loạn đông máu, ung thư máu...).</li><li>Tiền sử truyền máu, các phản ứng truyền máu (nếu có).</li><li>Tiền sử sử dụng thuốc (đặc biệt là các thuốc ảnh hưởng đến máu).</li><li>Tiền sử tiếp xúc với hóa chất, tia xạ.</li><li>Các bệnh lý nền khác (nếu có).</li></ul><p><strong>Khám Thực Thể:</strong></p><ul><li><strong>Tổng trạng:</strong> Đánh giá mức độ xanh xao, vàng da (nếu có).</li><li><strong>Da và niêm mạc:</strong> Tìm các dấu hiệu chảy máu (chấm xuất huyết, mảng bầm tím), nhợt nhạt.</li><li><strong>Hạch bạch huyết:</strong> Sờ nắn các hạch ngoại biên (cổ, nách, bẹn) để đánh giá kích thước, mật độ, di động, đau.</li><li><strong>Lách và gan:</strong> Sờ nắn bụng để đánh giá kích thước lách và gan (gan lách to có thể gợi ý bệnh lý huyết học).</li><li><strong>Tim mạch:</strong> Nghe tim phổi để phát hiện các dấu hiệu liên quan đến thiếu máu (tim nhanh, thổi tâm thu).</li></ul><p><strong>Xét Nghiệm Huyết Học Cơ Bản:</strong></p><ul><li><strong>Tổng phân tích tế bào máu (CBC):</strong> Đếm số lượng các tế bào máu (hồng cầu, bạch cầu, tiểu cầu), đo các chỉ số hồng cầu (MCV, MCH, MCHC), hematocrit, hemoglobin.</li><li><strong>Công thức bạch cầu (Differential count):</strong> Xác định tỷ lệ phần trăm của các loại bạch cầu khác nhau (neutrophil, lymphocyte, monocyte, eosinophil, basophil).</li><li><strong>Đánh giá hình thái tế bào máu trên lam máu ngoại vi:</strong> Quan sát hình dạng và kích thước của các tế bào máu dưới kính hiển vi để phát hiện các bất thường.</li></ul><p><strong>Các Xét Nghiệm Đông Cầm Máu Cơ Bản (khi có chỉ định):</strong></p><ul><li><strong>Thời gian máu chảy (Bleeding time).</strong></li><li><strong>Thời gian máu đông (Clotting time).</strong></li><li><strong>Thời gian Prothrombin (PT) và tỷ lệ chuẩn hóa quốc tế (INR).</strong></li><li><strong>Thời gian Thromboplastin từng phần hoạt hóa (aPTT).</strong></li><li><strong>Định lượng Fibrinogen.</strong></li></ul><p><strong>Các Xét Nghiệm Sàng Lọc Bệnh Lý Tan Máu (khi có chỉ định):</strong></p><ul><li><strong>Định lượng Bilirubin toàn phần và trực tiếp.</strong></li><li><strong>Xét nghiệm Coombs trực tiếp và gián tiếp.</strong></li><li><strong>Định lượng LDH.</strong></li><li><strong>Haptoglobin.</strong></li></ul><p><strong>Các Xét Nghiệm Sàng Lọc Thiếu Máu Thiếu Sắt (khi có chỉ định):</strong></p><ul><li><strong>Định lượng Sắt huyết thanh.</strong></li><li><strong>Định lượng Ferritin.</strong></li><li><strong>Khả năng liên kết sắt toàn phần (TIBC).</strong></li><li>Lấy mẫu tế bào tủy xương để đánh giá sự sinh sản và phát triển của các tế bào máu, thường được chỉ định khi nghi ngờ các bệnh lý về tủy xương hoặc ung thư máu.</li></ul><p><strong>Kết Luận và Kế Hoạch Tiếp Theo:</strong></p>', 1450000, 30, 1, 0, '2025-04-15 15:00:00', '2025-05-10 03:23:45'),
(16, 18, 'Khám dinh dưỡng', 'services/IhENaaEl3xiKUfhsuKVGrUOV8cs51ERR8UBTbvBe.png', '<p><strong>Khám Dinh Dưỡng Cơ Bản:</strong></p><p><strong>Hỏi Bệnh Sử Dinh Dưỡng:</strong></p><ul><li>Thói quen ăn uống hàng ngày (số bữa, thời gian, loại thực phẩm, cách chế biến).</li><li>Số lượng và tần suất tiêu thụ các nhóm thực phẩm chính (tinh bột, đạm, béo, rau củ, trái cây).</li><li>Tiền sử thay đổi cân nặng không chủ ý.</li><li>Các triệu chứng liên quan đến tiêu hóa (khó tiêu, đầy bụng...).</li><li>Các bệnh lý nền và thuốc đang sử dụng có ảnh hưởng đến dinh dưỡng.</li><li>Tiền sử dị ứng hoặc không dung nạp thực phẩm.</li><li>Chế độ ăn kiêng (nếu có) và lý do.</li><li>Mức độ hoạt động thể chất hàng ngày.</li><li>Thông tin về kinh tế, xã hội ảnh hưởng đến khả năng tiếp cận thực phẩm.</li></ul><p><strong>Đánh Giá Nhân Trắc Học:</strong></p><ul><li><strong>Cân nặng:</strong> Đo cân nặng hiện tại.</li><li><strong>Chiều cao:</strong> Đo chiều cao hiện tại.</li><li><strong>Tính chỉ số khối cơ thể (BMI):</strong> Phân loại thừa cân, béo phì, suy dinh dưỡng.</li><li><strong>Đo vòng eo:</strong> Đánh giá mỡ bụng và nguy cơ bệnh chuyển hóa.</li><li><strong>Đo bề dày lớp mỡ dưới da (Skinfold thickness - khi cần):</strong> Ước tính lượng mỡ cơ thể.</li><li><strong>Đo chu vi vòng cánh tay, vòng bắp chân (khi cần):</strong> Đánh giá khối lượng cơ.</li></ul><p><strong>Đánh Giá Lâm Sàng:</strong></p><ul><li>Khám các dấu hiệu thiếu hụt dinh dưỡng trên da, tóc, móng, mắt, miệng.</li><li>Đánh giá tình trạng răng miệng.</li><li>Khám tuyến giáp (liên quan đến chuyển hóa).</li></ul><p><strong>Đánh Giá Chế Độ Ăn (chi tiết hơn):</strong></p><ul><li><strong>Hỏi tiền sử ăn uống 24 giờ:</strong> Nhớ lại chi tiết tất cả thực phẩm và đồ uống đã tiêu thụ trong 24 giờ qua.</li><li><strong>Bảng tần suất thực phẩm (Food Frequency Questionnaire - FFQ):</strong> Đánh giá tần suất tiêu thụ các loại thực phẩm trong một khoảng thời gian nhất định.</li><li><strong>Nhật ký ăn uống (Food Diary):</strong> Ghi lại chi tiết tất cả thực phẩm và đồ uống tiêu thụ trong vài ngày liên tiếp.</li></ul><p><strong>Xét Nghiệm Sinh Hóa (khi cần):</strong></p><ul><li>Xét nghiệm máu: Đường huyết, mỡ máu, protein, albumin, vitamin, khoáng chất, các dấu ấn viêm...</li><li>Xét nghiệm nước tiểu: Đánh giá chức năng thận, đường niệu...</li></ul><p><strong>Đánh Giá Kiến Thức và Thái Độ về Dinh Dưỡng và Mức Độ Hoạt Động Thể Chất:</strong></p><ul><li>Hỏi về loại hình, tần suất, thời gian và cường độ hoạt động thể chất.</li><li>Đánh giá hiểu biết của người bệnh về dinh dưỡng và thực hành ăn uống lành mạnh.</li></ul><p><strong>Kết Luận và Kế Hoạch Dinh Dưỡng:</strong></p>', 400000, 30, 1, 0, '2025-04-16 16:00:00', '2025-05-10 02:49:37'),
(17, 19, 'Khám vật lý trị liệu', 'services/P6dcd3qHKLgrGG16aIPWHkF6CgOmkRi2CLlmr87f.png', '<p><strong>Khám Vật Lý Trị Liệu Cơ Bản:</strong></p><p><strong>Hỏi Bệnh Sử:</strong></p><ul><li>Lý do đến khám, triệu chứng hiện tại (thời gian, diễn tiến, mức độ).</li><li>Tiền sử chấn thương, phẫu thuật, bệnh lý cơ xương khớp, thần kinh.</li><li>Mức độ hoạt động hàng ngày, nghề nghiệp, thói quen vận động.</li><li>Các phương pháp điều trị đã áp dụng.</li><li>Mục tiêu điều trị của người bệnh.</li></ul><p><strong>Quan Sát và Đánh Giá:</strong></p><ul><li><strong>Tư thế:</strong> Quan sát dáng đứng, dáng đi.</li><li><strong>Dáng đi:</strong> Đánh giá các bất thường khi di chuyển.</li><li><strong>Hình dáng bên ngoài:</strong> Sưng, bầm tím, biến dạng.</li></ul><p><strong>Khám Vận Động:</strong></p><ul><li><strong>Tầm vận động (ROM):</strong> Đo góc độ cử động của các khớp.</li><li><strong>Sức mạnh cơ:</strong> Đánh giá khả năng kháng lực của các nhóm cơ.</li><li><strong>Trương lực cơ:</strong> Đánh giá độ co cứng hoặc mềm nhão của cơ.</li><li><strong>Khả năng phối hợp:</strong> Đánh giá sự phối hợp giữa các cử động.</li><li><strong>Khả năng thăng bằng:</strong> Đánh giá khả năng giữ thăng bằng tĩnh và động.</li></ul><p><strong>Khám Cảm Giác, Phản Xạ và Chức năng (liên quan):</strong></p><ul><li>Đánh giá sơ bộ cảm giác nông (xúc giác, đau) nếu có liên quan đến vấn đề vận động.</li><li>Đánh giá phản xạ gân xương nếu có nghi ngờ tổn thương thần kinh ảnh hưởng đến vận động.</li><li>Thực hiện các nghiệm pháp chuyên biệt để đánh giá các cấu trúc cụ thể (ví dụ: nghiệm pháp Lachman cho dây chằng chéo trước gối, nghiệm pháp Hawkins-Kennedy cho hội chứng chèn ép vai).</li><li>Đánh giá khả năng thực hiện các hoạt động chức năng hàng ngày (ví dụ: đi lại, đứng lên ngồi xuống, cầm nắm).</li><li>Sử dụng các thang điểm chức năng chuẩn hóa (nếu cần).</li></ul><p><strong>Kết Luận và Kế Hoạch Điều Trị:</strong></p>', 2500000, 60, 1, 0, '2025-04-17 08:30:00', '2025-05-10 02:46:29'),
(18, 20, 'Khám tâm thần', 'services/sbHAcJdT6OVryIYrqe4T5QHBO18gbLU5nwKkYhba.png', '<p><strong>Khám Tâm Thần Cơ Bản:</strong></p><p><strong>Hỏi Bệnh Sử:</strong></p><ul><li>Triệu chứng hiện tại (thời gian, diễn tiến, ảnh hưởng).</li><li>Tiền sử bệnh tâm thần bản thân và gia đình.</li><li>Tiền sử bệnh lý cơ thể, chấn thương, chất gây nghiện.</li><li>Tiền sử học tập, làm việc, các mối quan hệ xã hội.</li><li>Các sự kiện stress, sang chấn tâm lý.</li></ul><p><strong>Khám Thực Thể Tâm Thần:</strong></p><ul><li><strong>Ý thức:</strong> Tỉnh táo, định hướng.</li><li><strong>Diện mạo, thái độ:</strong> Vẻ ngoài, cách cư xử.</li><li><strong>Lời nói:</strong> Tốc độ, âm lượng, nội dung.</li><li><strong>Cảm xúc:</strong> Biểu hiện cảm xúc (tươi vui, buồn bã, lo âu...), tính phù hợp.</li><li><strong>Tư duy:</strong> Nội dung (ám ảnh, hoang tưởng...), hình thức (liên kết, mạch lạc).</li><li><strong>Tri giác:</strong> Ảo giác (thị giác, thính giác...).</li><li><strong>Trí tuệ:</strong> Chú ý, trí nhớ, khả năng tập trung, giải quyết vấn đề (đánh giá sơ bộ).</li><li><strong>Insight:</strong> Nhận thức về bệnh tật.</li><li><strong>Hành vi:</strong> Bất thường (kích động, rụt rè...).</li><li><strong>Ý tưởng tự sát/gây hại:</strong> Đánh giá nguy cơ.</li></ul><p><strong>Các Test Tâm Lý:</strong></p><ul><li>Các trắc nghiệm sàng lọc (lo âu, trầm cảm...).</li><li>Các test đánh giá nhận thức, nhân cách chuyên sâu hơn.</li><li>Loại trừ các nguyên nhân thực thể gây ra triệu chứng tâm thần.</li></ul><p><strong>Chẩn đoán và Kế hoạch Điều trị:</strong></p>', 550000, 30, 1, 0, '2025-04-18 09:30:00', '2025-05-10 02:32:26'),
(19, 9, 'Khám mắt', 'services/4NYvFqd6oRqBtP3GeC16jntkDnvunChCLKweQsvt.png', '<p><strong>Khám mắt cơ bản:</strong></p><p><strong>Hỏi bệnh sử:</strong> Triệu chứng, tiền sử bệnh mắt và toàn thân, thuốc dùng, tiền sử gia đình.</p><p><strong>Khám thực thể:</strong></p><ul><li><strong>Thị lực:</strong> Đo khả năng nhìn rõ.</li><li><strong>Thị trường:</strong> Kiểm tra vùng nhìn.</li><li><strong>Vận nhãn:</strong> Đánh giá cử động mắt.</li><li><strong>Đồng tử, phản xạ ánh sáng:</strong> Kiểm tra kích thước và phản ứng đồng tử.</li><li><strong>Soi đèn khe:</strong> Quan sát cấu trúc trước mắt.</li><li><strong>Đo nhãn áp:</strong> Đo áp lực mắt.</li><li><strong>Soi đáy mắt:</strong> Quan sát võng mạc, đĩa thị.</li></ul><p><strong>Chụp chiếu,Xét nghiệm cơ bản:</strong>&nbsp;</p><ul><li>Chụp ảnh đáy mắt OCT</li><li>Siêu âm mắt</li><li>Nhuộm huỳnh quang giác mạc</li><li>Test Schirmer (khi cần).</li></ul><p><strong>Kết luận và kế hoạch:</strong> Chẩn đoán, đơn kính, điều trị, xét nghiệm thêm (nếu cần), hẹn tái khám.</p>', 3000000, 60, 1, 0, '2025-04-19 10:30:00', '2025-05-10 02:46:44'),
(20, 10, 'Khám thần kinh', 'services/atCgzG9oTPuHd359KpRMQlCP0FmECSpRAi8vaVT3.png', '<p><strong>Quy trình khám thần kinh bao gồm</strong></p><p><strong>Khám Thực Thể Thần Kinh:</strong></p><ul><li><strong>Ý thức và tinh thần:</strong> Mức độ tỉnh táo, định hướng, nhận thức, cảm xúc, hành vi.</li><li><strong>Các dây thần kinh sọ (12 đôi):</strong> Chức năng của từng dây thần kinh liên quan đến khứu giác, thị giác, vận động mắt, cảm giác mặt, vận động cơ mặt, thính giác, thăng bằng, vị giác, nuốt, giọng nói, vận động cổ và vai, vận động lưỡi.</li><li><strong>Vận động:</strong> Quan sát cơ bắp, đánh giá trương lực cơ, sức mạnh cơ và tầm vận động.</li><li><strong>Cảm giác:</strong> Kiểm tra cảm giác nông (xúc giác, đau, nhiệt độ), cảm giác sâu (rung, vị thế) và cảm giác vỏ não.</li><li><strong>Phản xạ:</strong> Đánh giá phản xạ gân xương và phản xạ da (bao gồm dấu Babinski).</li><li><strong>Phối hợp và thăng bằng:</strong> Thực hiện các nghiệm pháp như ngón tay chỉ mũi, gót chân - cẳng chân, Romberg và quan sát dáng đi.</li></ul><p><strong>Chụp chiếu cơ bản :</strong></p><ul><li><strong>Chụp cắt lớp vi tính (CT scan) não</strong></li><li><strong>Điện cơ đồ (EMG) và đo tốc độ dẫn truyền thần kinh (NCV)</strong></li><li><strong>Xét nghiệm dịch não tủy (Lumbar Puncture - Chọc dò tủy sống)</strong></li><li><strong>Xét nghiệm máu và nước tiểu</strong></li></ul>', 1800000, 60, 1, 0, '2025-04-20 11:30:00', '2025-05-10 02:47:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `specialties`
--

CREATE TABLE `specialties` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `specialties`
--

INSERT INTO `specialties` (`id`, `name`, `description`, `icon`, `image`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 'Nội tổng quát', '<p><strong>Xét nghiệm tổng quát</strong></p><p>Xét nghiệm tổng quát&nbsp; thường được chỉ định trong khám chữa bệnh vì nó giúp phát hiện nhiều bệnh lý (đặc biệt ở giai đoạn tiền lâm sàng).&nbsp; Việc chủ động xét nghiệm tổng quát giúp bạn kiểm soát tình trạng sức khỏe, phòng ngừa và điều trị các bệnh lý từ sớm. Không&nbsp; cần chờ tới các đợt khám sức khỏe định kỳ, bạn có thể tự đặt 1 lịch xét nghiệm tổng quát với chi phí phù hợp và không tốn nhiều thời gian để kiểm tra tình trạng sức khỏe cơ thể.</p><ol><li>Ai là người cần làm xét nghiệm tổng quát?</li><li>Tất cả mọi người (người già, người trưởng thành, trẻ em) đều nên đi xét nghiệm tổng quát định 6-12 tháng/ năm.</li><li>Danh mục Xét nghiệm tổng quát</li></ol><p>Xét nghiệm tổng quát bao gồm nhiều loại xét nghiệm như:</p><ul><li>Tổng phân tích tế bào máu</li><li>Xét nghiệm nước tiểu</li><li>Kiểm tra chức năng của gan, thận</li><li>Đánh giá tình trạng chuyển hóa lipid</li><li>Phát hiện bệnh tiểu đường</li></ul>', 'incons/1o1XK4wKiDNQaf1vlRRyJJrhCd4fXo9Nlt4dKwe7.png', 'images/w9K09py5XrGFZf86nswIoVyp2jNBEIsZ1U1SbvxQ.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:35:05'),
(2, 'Nhi khoa', '<p>Danh sách bác sĩ chuyên khoa Nhi giỏi:</p><ul><li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn tại Hà Nội</li><li>Các giảng viên đã và đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội</li><li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như: Bệnh viện Nhi Trung ương, Khoa Nhi - Bệnh viện Bạch Mai.</li></ul><p><strong>Khám và điều trị</strong></p><ul><li>Bệnh lý sơ sinh</li><li>Bệnh tiêu hóa</li><li>Bệnh tuần hoàn</li><li>Bệnh hô hấp</li><li>Bệnh huyết học</li><li>Bệnh thận Tiết niệu</li><li>Bệnh thần kinh</li><li>Bệnh ngoài da</li><li>Bệnh xương khớp</li></ul>', 'incons/26lLeDUEjm9I8Jfglg4HNLMdel2vDKBADmwonm9J.png', 'images/gZBYOMhMoUafzAllvRdbb9kd95rx0G3Pljl5f9nI.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:33:57'),
(3, 'Da liễu', '<p><strong>Bác sĩ Chuyên khoa Da liễu</strong></p><p>Quick care cung cấp thông tin và lịch khám của các bác sĩ chuyên khoa da liễu giỏi tại Hà Nội.</p><p>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn tại Hà Nội như: Bệnh viện Da liễu Trung ương, Bệnh viện Da liễu Hà Nội</p><p><strong>Khám và điều trị</strong></p><ul><li>Bệnh vẩy nến,&nbsp;Da khô, Ngứa da</li><li>Rám tàn nhang</li><li>Mụn cóc sinh dục</li><li>Nấm cơ thể,&nbsp;Nấm da đầu</li><li>Nấm móng tay, móng chân</li><li>Rụng tóc, hói đầu</li><li>Viêm da dị ứng,&nbsp;Viêm da tiếp xúc,&nbsp;Viêm da tiết bã</li><li>Viêm nang lông</li><li>Xơ cứng bì</li><li>Zona thần kinh</li></ul>', 'incons/sqoLfe1k5g66RcxfhV7FUnPuvlbZxSBAOfJKkZsM.png', 'images/Xp3KPEpXmaSoym5MFwkqFjeOMxsYgCS6Og40gQdj.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:36:24'),
(4, 'Tim mạch', '<p><strong>Bác sĩ tim mạch giỏi</strong></p><p>Danh dách các bác sĩ tim mạch uy tín đầu ngành tại Việt Nam:</p><ul><li>Các chuyên gia được đào tạo bài bản về chuyên ngành Tim mạch tại các trường đại học trong nước và quốc tế.</li><li>Các giáo sư, phó giáo sư nghiên cứu và giảng dạy tại Đại học Y Hà Nội</li><li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Viện Tim Mạch Quốc Gia, Bệnh viện Bạch Mai, Bệnh viện Việt Đức, Bệnh Viện E, Bệnh Viện Tim Hà Nội</li><li>Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Tim Mạch Việt Nam</li><li>Đạt danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...</li></ul><p><strong>Khám tư vấn tim mạch</strong></p><ul><li>Khó thở, Đau ngực, đau tim</li><li>Tăng huyết áp, hạ huyết áp</li><li>Rối loạn mỡ máu, cao huyết áp, chóng mặt</li><li>Bệnh van tim (Hẹp hở van tim),&nbsp;Hẹp động mạch chủ</li><li>Cảm giác hồi hộp, tim đập nhanh &nbsp; &nbsp;</li><li>Tim bẩm sinh, có tiền sử bệnh tim to,&nbsp;tiền sử tai biến &nbsp; &nbsp;</li><li>Đã đặt stent tim,&nbsp;nong động mạch vành</li><li>Giãn tĩnh mạch chân</li></ul>', 'incons/DZhs215zHUIyqKzeoBSHsYszVvGjZVNM5CT8H5lg.png', 'images/jW4KeXa8OInd1gkgORSJnk74NP7mEk5xng6gR039.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:37:25'),
(5, 'Chấn thương chỉnh hình', '<p><strong>Chuyên khoa Chấn thương chỉnh hình&nbsp;</strong></p><p>tập trung vào việc điều trị các tổn thương và bệnh lý liên quan đến hệ thống cơ xương khớp</p><p><strong>Các loại chấn thương:</strong></p><ul><li>Gãy xương (xương kín, xương hở, các loại gãy đặc biệt)</li><li>Trật khớp (trật khớp vai, khớp háng, khớp gối...)</li><li>Bong gân và giãn dây chằng</li><li>Chấn thương cơ và gân</li><li>Chấn thương thể thao</li></ul>', 'incons/OEaYcWVA3OG7FCap1O7IlxhDwqFSDoFnljDQ0tAA.png', 'images/TeoBrq4dOxC97RiKPjppH6jc1ARMWbDQefYKan7v.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:42:06'),
(6, 'Tai Mũi Họng', '<p><strong>Danh sách các bác sĩ uy tín đầu ngành tại Việt Nam:</strong></p><ul><li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên ngành Tai Mũi Họng tại Hà Nội</li><li>Các giáo sư, phó giáo sư là giảng viên Đại học Y khoa Hà Nội</li><li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Bệnh viện Bạch Mai, Bệnh Viện Tai Mũi Họng Trung ương, Bệnh viện Quân Y 108...</li><li>Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ cao cấp,...</li></ul><p><strong>Các bệnh Tai Mũi Họng</strong></p><ul><li>Ù tai, đau tai, chảy máu tai</li><li>Thủng màng nhĩ, điếc đột ngột</li><li>Viêm tai giữa</li><li>Amidan, V.A</li><li>Viêm xoang</li><li>Nghẹt mũi</li><li>Hay bị chảy máu cam</li><li>Đau cổ họng, khó nuốt</li><li>Ho kéo dài</li><li>Ngủ ngáy</li></ul>', 'incons/S0zIrVlbSbSKqvfBVf8thrAQOYgRxZy52aTLpyUh.png', 'images/cY7xqxETRMnhrh6g3e0oAR5dccbaa3dhnyf8VSBh.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:43:01'),
(7, 'Răng Hàm Mặt', '<p><strong>Danh sách&nbsp; bác sĩ Nha khoa uy tín tại Việt Nam:</strong></p><ul><li>Các chuyên gia có quá trình đào tạo bài bản, nhiều năm kinh nghiệm và khám, điều trị các bệnh lý nha khoa và răng thẩm mỹ tại Hà Nội.</li><li>Các bác sĩ đã hoặc đang công tác tại các bệnh viện, phòng khám nha khoa uy tín, với các trang thiết bị hiện đại.</li></ul><p><strong>Khám tư vấn, điều trị các bệnh lý về răng, làm răng thẩm mỹ</strong></p><ul><li>Nhổ răng</li><li>Hàn răng</li><li>Điều trị tủy</li><li>Điều trị Viêm nha chu</li><li>Bọc răng sứ</li><li>Làm răng giả</li><li>Dán sứ Veneer</li><li>Niềng răng (nắn chỉnh răng)</li></ul>', 'incons/aHBj3wc2l44zLY7ZRDfnnMoes2OiVt4o4FpHeg5w.png', 'images/xCBnwjJpGjkM8ZDD41mPaG7eRG1NHAxvDfNr4hd6.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:44:45'),
(8, 'Sản phụ khoa', '<p><strong>Bác sĩ Sản phụ khoa</strong></p><p>Quick Care cung cấp thông tin và lịch khám của các bác sĩ chuyên khoa sản giỏi tại Hà Nội.</p><ul><li>&nbsp;Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên ngành Sản phụ khoa tại Hà Nội</li><li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn tại Hà Nội&nbsp;như: Bệnh viện Phụ sản Trung ương, Bệnh viện Phụ sản Hà Nội, Khoa Sản - Bệnh viện Bạch Mai.</li></ul><p><strong>Khám và điều trị</strong></p><ul><li>Rối loạn kinh nguyệt, chậm kinh, đau bụng kinh&nbsp; &nbsp;</li><li>Tắc hai vòi trứng, Đa nang buồng trứng, Chụp vòi trứng,&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</li><li>Khám hiếm muộn, vô sinh &nbsp; &nbsp;</li><li>Khám Phụ Khoa &nbsp;&nbsp;&nbsp;</li><li>Khám thai sản &nbsp;&nbsp;&nbsp;</li><li>Khám tiền hôn nhân, Tiền sinh &nbsp; &nbsp;</li><li>Kiểm tra phụ khoa &nbsp; &nbsp;</li><li>Loạn dưỡng vú &nbsp;&nbsp;&nbsp;</li><li>Rong kinh kéo dài &nbsp; &nbsp;</li><li>Siêu âm thai định kỳ &nbsp;&nbsp;&nbsp;</li><li>Thai lưu</li><li>U xơ tử cung,&nbsp;Viêm lộ tuyến</li></ul>', 'incons/GnOqjnJ31eqikxum48USJhJy8LA91WayIe7hK4th.png', 'images/1FwkSwu1I3QmwVYLXHPiixSKc0HjwRdnXVW4UnQc.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:46:08'),
(9, 'Mắt', '<p><strong>Bác sĩ Chuyên khoa Mắt</strong></p><p>Hệ thống Quick Care cung cấp thông tin và lịch khám của các bác sĩ uy tín đầu ngành tại Việt Nam.</p><ul><li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên khoa Mắt tại Hà Nội.</li><li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Bệnh viện Mắt Trung ương, Viện Y học Hàng không - Không quân, Bệnh viện Mắt Quốc tế DND...<br>&nbsp;</li><li>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp,...</li></ul><p><strong>Các bệnh về mắt</strong></p><ul><li>Tật khúc xạ</li><li>Cận thị</li><li>Nhược thị</li><li>Viễn thị</li><li>Lão thị</li><li>Loạn thị</li></ul><p><strong>Các rối loạn về mắt</strong></p><ul><li>Hội chứng khô mắt</li><li>Rối loạn ở hốc mắt</li><li>Rối loạn tuyến lệ</li><li>Tăng nhãn áp</li></ul><p><strong>Các bệnh lí khác về mắt</strong></p><ul><li>Lác mắt</li><li>Viêm giác mạc</li><li>Đục thủy tinh thể</li><li>Dịch kính võng mạc</li><li>Bong võng mạc</li><li>Bệnh thoái hóa hoàng điểm tuổi già</li></ul>', 'incons/ZnWVTxk6dZNsECeWMtMu6Mz29uf5efmN4GXKNNWY.png', 'images/11jb3wmMMrwmYCqYaaN7BrvkybqV9N5zeDMGGnuJ.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:46:55'),
(10, 'Thần kinh', '<p><strong>Bác sĩ Thần kinh giỏi</strong></p><p>Danh sách các giáo sư, bác sĩ chuyên khoa Thần kinh giỏi:</p><ul><li>Các giáo sư, bác sĩ uy tín đầu ngành chuyên khoa Thần kinh đã và đang công tác tại các bệnh viện lớn như: Bệnh viện Bạch Mai, Bệnh viện Việt Đức, Bệnh viện 108, Bệnh viện Đại học Y Hà Nội, Bệnh viện 103.</li><li>Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hội Thần kinh Việt Nam, Hội Phẫu thuật Thần kinh…</li><li>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp.</li></ul><p><strong>Khám bệnh chuyên khoa Thần kinh</strong></p><ul><li>Bại Não &nbsp;&nbsp;</li><li>Đau đầu, chóng mặt, buồn nôn&nbsp; &nbsp;</li><li>Bệnh Pakison, bệnh tiền đình &nbsp; &nbsp;</li><li>Bị co cơ, căng dây thần kinh &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</li><li>Động kinh, có những cơn vãng ý thức &nbsp; &nbsp;</li><li>Bị tê bì nửa mặt, chèn dây thần kinh</li><li>Bồn chồn, lo lắng, hồi hộp, chân tay run &nbsp; &nbsp;</li><li>Có dấu hiệu tăng động &nbsp; &nbsp;&nbsp;</li><li>Co rút cổ, đau đầu với mặt,&nbsp;chân tay, vã mồ hôi&nbsp; &nbsp;</li><li>Chấn thương đầu, dây thần kinh</li></ul>', 'incons/S3W1UIyjk7xc0ddS46LjeC9XHh6yjurAY0ni1Wal.png', 'images/Z8FjKT2pvztTLZB7XxR3zMohDOShNEAqVjAG78uC.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:48:20'),
(11, 'Tiêu hóa', '<p><strong>Bác sĩ Chuyên khoa Tiêu hóa</strong></p><p>Danh sách các bác sĩ Tiêu hóa uy tín đầu ngành tại Việt Nam:</p><ul><li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên ngành Tiêu hóa tại Hà Nội</li><li>Các giáo sư, phó giáo sư là giảng viên Đại học Y khoa Hà Nội</li><li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Bệnh viện Bạch Mai, Bệnh Viện Việt Đức, Bệnh Viện Nhi Trung ương, Bệnh viện Y học Cổ truyền Việt Nam...</li><li>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp,...</li></ul><p><strong>Tư vấn, khám và điều trị các Bệnh Tiêu hóa</strong></p><ul><li>Ăn uống kém, không ngon</li><li>Rối loạn tiêu hóa, táo bón, trĩ</li><li>Nhiễm vi khuẩn HP (Helicobacter pylori)</li><li>Nội soi dạ dày, đại tràng, tiêu hóa</li><li>Buồn nôn, chướng bụng, đầy bụng ợ chua, đầy hơi</li><li>Co thắt thực quản,&nbsp;Hội chứng ruột kích thích</li><li>Đau bụng,&nbsp;dạ dày, đại tràng, thượng vị</li><li>Viêm đại tràng, dạ dày,&nbsp;tá tràng</li><li>Ung thư dạ dày, U nang tuyến tụy</li><li>Bệnh lý về gan, mật</li></ul>', 'incons/cdmtvkPjLblKk6vyNL7nDfrNcNbG90buVkfAbUm6.png', 'images/uUJPr3aFutVVPzcVWheKNA0V35QzwZIe5BxclQO7.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:49:14'),
(12, 'Tiết niệu', '<p><strong>Bác sĩ Thận - Tiết niệu giỏi</strong></p><ul><li>Hệ thống Quick Care cung cấp thông tin và lịch khám của các bác sĩ uy tín đầu ngành tại Việt Nam.</li><li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên ngành Thận - Tiết niệu tại Hà Nội.</li><li>Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội.</li><li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Bệnh viện Bạch Mai, Bệnh viện Việt Đức,...</li><li>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp,...</li></ul><p><strong>Bệnh về Thận - Tiết niệu</strong></p><ul><li>Các bệnh về tiền liệt tuyến, phì đại tiền liệt tuyến, đi tiểu ra máu</li><li>Thận đa nang&nbsp;</li><li>Ung thư tuyến tiền liệt</li><li>Viêm bàng quang&nbsp;</li><li>Tiểu không tự chủ&nbsp;</li><li>Ung thư bàng quang&nbsp;</li><li>Sỏi bàng quang</li><li>Sỏi thận</li><li>Viêm đài bể thận&nbsp;</li><li>U nang thận&nbsp;</li><li>Áp xe quanh thận&nbsp;</li><li>Vôi hóa tuyến tiền liệt</li></ul>', 'incons/cwtn0kaPAo6PrcldBEjaqrcooGFxaEQSqfL2PKII.png', 'images/blNgr2keKdKfPXLrWxwq8Om12A51SaJhzAPHbTLT.png', 0, '2025-03-23 07:07:41', '2025-05-09 15:50:03'),
(13, 'Hô hấp', '<p><strong>Danh sách các bác sĩ chuyên khoa Hô hấp giỏi:</strong></p><ul><li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện, phòng khám lớn&nbsp; như: Bệnh viện Đại học Y dược, Phòng khám Phổi Sài Gòn, Bệnh viện Phổi Trung ương,...</li><li>Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hội Phổi Việt Nam, Hội Hô Hấp Việt Nam...</li></ul><p><strong>Khám và điều trị</strong></p><ul><li>Lao</li><li>Lao kháng thuốc</li><li>Hen</li><li>COPD</li><li>Các bệnh Phổi nghề nghiệp<br>&nbsp;</li><li>Các bệnh hô hấp</li></ul>', 'incons/Grx8BTezTIv3vXnb6eCt18EL8oaIa2RhDO9VBca4.png', 'images/4xI9UPnR2Me3cjs8AH2aOjQzKXlKRhoQMVHMEba8.png', 0, '2025-03-23 07:07:41', '2025-05-10 01:53:56'),
(14, 'Nội tiết', '<p><strong>Bác sĩ Nội tiết</strong></p><p>Danh sách bác sĩ chuyên khoa Nội tiết giỏi:</p><ul><li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn tại Hà Nội&nbsp;như: Bệnh viện Bạch Mai, Bệnh viện Quân Y 103, Bệnh viện Nội tiết Trung ương, Bệnh viện Đại học Y Hà Nội.</li><li>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp.</li></ul><p><strong>Tư vấn, khám và điều trị</strong></p><ul><li>Bướu cổ</li><li>Cường cận giáp</li><li>Đái tháo đường</li><li>Suy giáp,&nbsp;Cường giáp</li><li>Suy tuyến yên,U tuyến yên</li><li>Tăng đường huyết bệnh tiểu đường</li><li>Tiền tiểu đường</li><li>Tiểu đường</li><li>Tiểu đường tuýp 1, 2</li><li>Ung thư tuyến giáp</li></ul>', 'incons/bWxrSWxhsEB9tz1ohw5WNc2UVo8sVl9nViLNZ1Uz.png', 'images/gp7y9UXktwt08AOPwNzERJl1mU2aeQCFabPDa7YM.png', 0, '2025-03-23 07:07:41', '2025-05-10 01:54:46'),
(15, 'Y học cổ truyền', '<p><strong>Bác sĩ Y học Cổ truyền giỏi</strong></p><p>Danh sách các bác sĩ Y học Cổ truyền uy tín đầu ngành tại Việt Nam:</p><ul><li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên khoa Y học Cổ truyền</li><li>Các bác sĩ đã, đang công tác tại chuyên Khoa Y học Cổ truyền - Bệnh viện Y học Cổ truyền Trung ương, Bệnh viện Bạch Mai, Thanh Nhàn..</li><li>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp,..</li></ul><p><strong>Tư vấn, khám và điều trị các vấn đề:</strong></p><ul><li>Bệnh lý thần kinh: đau đầu, mất ngủ, suy nhược thần kinh...</li><li>Bệnh lý cơ xương khớp: đau mỏi tay chân, thoái hóa khớp, viêm khớp...</li><li>Bệnh lý tim mạch: Tăng huyết áp, huyết áp thấp, đau thắt ngực...</li><li>Bệnh lý đường tiêu hóa: đau bụng, rối loạn chức năng tiêu hóa...</li></ul>', 'incons/sQwSv2n6Q8NZsxDaEq9ccITU6Jy1qq5nrFMqnQpD.png', 'images/u4eAbC8gBg5FPbJWlGbjrb9T3JWZvBZVfqvJSlBR.png', 0, '2025-03-23 07:07:41', '2025-05-10 01:55:52'),
(16, 'Ung bướu', '<p><strong>Bác sĩ Ung bướu giỏi</strong></p><p>Danh sách các bác sĩ uy tín đầu ngành Ung bướu tại Việt Nam:</p><ul><li>Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm</li><li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Ung bướu - Bệnh viện K, Bệnh viện Hữu nghị Việt Đức, Bệnh viện Ung bướu Hưng Việt,...</li></ul><p>Bệnh Ung bướu</p><ul><li>Ung thư gan</li><li>Ung thư phổi</li><li>Ung thư tụy</li><li>Ung thư dạ dày, đại tràng</li><li>Ung thư vú</li><li>Ung thư tuyến giáp</li></ul>', 'incons/bmgghta3U24mJi832N7V4CNlM5xDJ4fK2Yf54jVl.png', 'images/eTba1r6o4YJNs8Ep2DDcQzfaxk1SNCnsEWiI18Qg.png', 0, '2025-03-23 07:07:41', '2025-05-10 01:56:28'),
(17, 'Huyết học', '<p><strong>Danh sách các bác sĩ Huyết học uy tín đầu ngành tại Việt Nam:</strong></p><p>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên ngành Huyết học tại Hà Nội và các tỉnh thành khác.</p><p>Các giáo sư, phó giáo sư là giảng viên các trường đại học y khoa trên cả nước.</p><p>Các bác sĩ đã và đang công tác tại các bệnh viện hàng đầu như Bệnh viện Huyết học - Truyền máu Trung ương, Bệnh viện Bạch Mai, Bệnh viện Chợ Rẫy, Bệnh viện Đại học Y Dược TP.HCM, Bệnh viện Nhi Trung ương, các bệnh viện đa khoa và chuyên khoa có khoa Huyết học.</p><p>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp,...</p><p><strong>Tư vấn, khám và điều trị các Bệnh Huyết học:</strong></p><p><strong>Các bệnh lý về máu:</strong></p><ul><li>Thiếu máu các loại (thiếu máu do thiếu sắt, thiếu vitamin B12, tan máu,...)</li><li>Các bệnh lý tăng sinh tủy (đa hồng cầu, tăng tiểu cầu nguyên phát, lơ-xê-mi kinh dòng tủy,...)</li><li>Các rối loạn sinh tủy (hội chứng rối loạn sinh tủy)</li><li>Bệnh bạch cầu cấp và mạn tính (lơ-xê-mi cấp dòng lympho, lơ-xê-mi cấp dòng tủy, lơ-xê-mi kinh dòng lympho,...)</li><li>U lympho Hodgkin và không Hodgkin</li><li>Đa u tủy xương</li><li>Các rối loạn về chức năng bạch cầu và tiểu cầu</li></ul><p><strong>Các bệnh lý về đông cầm máu:</strong></p><ul><li>Rối loạn đông máu di truyền (hemophilia, bệnh von Willebrand)</li><li>Rối loạn đông máu mắc phải (đông máu nội mạch lan tỏa, huyết khối,...)</li><li>Các bệnh lý gây tăng đông máu</li></ul><p><strong>Các vấn đề liên quan đến truyền máu:</strong></p><ul><li>Tư vấn và chỉ định truyền máu và các chế phẩm máu</li><li>Theo dõi và xử trí các phản ứng truyền máu</li></ul><p><strong>Ghép tế bào gốc tạo máu:</strong></p><ul><li>Đánh giá và theo dõi bệnh nhân trước, trong và sau ghép tế bào gốc tạo máu (ghép tủy xương)</li></ul>', 'incons/ymsIoDZnxM0iUX0EBeZIYUCjR3cFQ8TCtobrdyq5.png', 'images/b4PiLefz3pBaULTgUia8lMI9jvGkhEP1Z8NJZR6o.png', 0, '2025-03-23 07:07:41', '2025-05-10 02:12:32'),
(18, 'Dinh dưỡng', '<p><strong>Danh sách các Chuyên gia Dinh dưỡng uy tín đầu ngành tại Việt Nam:</strong></p><p>Các chuyên gia có quá trình đào tạo bài bản về Dinh dưỡng và Khoa học Thực phẩm tại các trường đại học uy tín trong và ngoài nước.</p><p>Các giảng viên, nhà nghiên cứu tại các trường đại học y khoa, viện dinh dưỡng và các trung tâm nghiên cứu về dinh dưỡng.</p><p>Các chuyên gia dinh dưỡng đang công tác tại các bệnh viện lớn (Bệnh viện Bạch Mai, Bệnh viện Chợ Rẫy, Bệnh viện Đại học Y Dược TP.HCM, Bệnh viện Nhi Trung ương...), các trung tâm dinh dưỡng, phòng khám tư vấn dinh dưỡng và các tổ chức y tế cộng đồng.</p><p>Nhiều chuyên gia đạt được các chứng chỉ chuyên môn và có đóng góp quan trọng trong lĩnh vực dinh dưỡng tại Việt Nam.</p><p><strong>Tư vấn và xây dựng chế độ dinh dưỡng cho các đối tượng:</strong></p><p><strong>Các vấn đề về tiêu hóa:</strong></p><ul><li>Tư vấn dinh dưỡng cho người ăn uống kém, không ngon miệng.</li><li>Hỗ trợ điều chỉnh chế độ ăn cho người rối loạn tiêu hóa, táo bón, trĩ.</li><li>Xây dựng chế độ ăn phù hợp cho người nhiễm vi khuẩn HP (Helicobacter pylori).</li><li>Tư vấn dinh dưỡng trước và sau nội soi tiêu hóa.</li><li>Hỗ trợ giảm các triệu chứng buồn nôn, chướng bụng, đầy bụng ợ chua, đầy hơi thông qua chế độ ăn.</li><li>Tư vấn dinh dưỡng cho người mắc co thắt thực quản, hội chứng ruột kích thích.</li><li>Xây dựng chế độ ăn giảm đau cho người đau bụng, dạ dày, đại tràng, thượng vị.</li><li>Tư vấn dinh dưỡng cho người viêm đại tràng, dạ dày, tá tràng.</li><li>Hỗ trợ dinh dưỡng cho bệnh nhân ung thư dạ dày, u nang tuyến tụy.</li><li>Tư vấn chế độ ăn cho các bệnh lý về gan, mật.</li></ul><p><strong>Các đối tượng đặc biệt:</strong></p><ul><li>Tư vấn dinh dưỡng cho trẻ em, phụ nữ mang thai và cho con bú.</li><li>Xây dựng chế độ ăn cho người cao tuổi.</li><li>Tư vấn dinh dưỡng cho vận động viên và người tập luyện thể thao.</li><li>Hỗ trợ dinh dưỡng cho người có nhu cầu giảm cân hoặc tăng cân.</li></ul><p><strong>Các bệnh lý mạn tính:</strong></p><ul><li>Tư vấn dinh dưỡng cho người mắc bệnh tim mạch, tiểu đường, huyết áp cao, mỡ máu cao.</li><li>Xây dựng chế độ ăn cho người có bệnh thận, gout, loãng xương...</li></ul><p><strong>Tư vấn và giáo dục dinh dưỡng cộng đồng:</strong></p><ul><li>Cung cấp kiến thức về dinh dưỡng hợp lý và lối sống lành mạnh cho cộng đồng.</li><li>Tham gia xây dựng các chương trình dinh dưỡng quốc gia.</li></ul>', 'incons/l20msyOZRKRxmdeyE6HeQPA0Z2XkWvhixBTkl7FT.png', 'images/eP4X0ELYq4alkyOCUPxrpF0ANgBaJdtCJznFMIX0.png', 0, '2025-03-23 07:07:41', '2025-05-10 02:13:54'),
(19, 'Vật lý trị liệu', '<p><strong>Chuyên gia Vật lý trị liệu</strong></p><p><strong>Danh sách các Chuyên gia Vật lý trị liệu uy tín đầu ngành tại Việt Nam:</strong></p><p>Các chuyên gia có quá trình đào tạo bài bản về Vật lý trị liệu và Phục hồi chức năng tại các trường đại học y khoa và các cơ sở đào tạo chuyên nghiệp trong và ngoài nước.</p><p>Các giảng viên, nhà nghiên cứu tại các trường đại học y khoa, các bệnh viện và trung tâm phục hồi chức năng.</p><p>Các chuyên gia vật lý trị liệu đang công tác tại các bệnh viện lớn (Bệnh viện Bạch Mai, Bệnh viện Chợ Rẫy, Bệnh viện Đại học Y Dược TP.HCM, Bệnh viện Nhi Trung ương, Bệnh viện Phục hồi chức năng...), các trung tâm phục hồi chức năng, phòng khám vật lý trị liệu tư nhân và các tổ chức y tế cộng đồng.</p><p>Nhiều chuyên gia đạt được các chứng chỉ chuyên môn về các kỹ thuật vật lý trị liệu chuyên sâu và có đóng góp quan trọng trong lĩnh vực phục hồi chức năng tại Việt Nam.</p><p><strong>Tư vấn và thực hiện các phương pháp Vật lý trị liệu cho các tình trạng:</strong></p><p><strong>Các vấn đề về tiêu hóa (hỗ trợ):</strong></p><ul><li>Hướng dẫn các bài tập giúp cải thiện nhu động ruột cho người táo bón.</li><li>Áp dụng các kỹ thuật xoa bóp vùng bụng để giảm chướng bụng, đầy hơi.</li><li>Tư vấn các bài tập phục hồi chức năng sau phẫu thuật tiêu hóa.</li></ul><p><strong>Các vấn đề cơ xương khớp và vận động:</strong></p><ul><li>Phục hồi chức năng sau chấn thương (gãy xương, trật khớp, bong gân,...)</li><li>Điều trị các bệnh lý cơ xương khớp (thoái hóa khớp, viêm khớp, đau lưng, đau cổ,...)</li><li>Cải thiện tầm vận động và sức mạnh cơ bắp.</li><li>Hướng dẫn các bài tập cho người rối loạn tư thế.</li><li>Phục hồi chức năng sau phẫu thuật chỉnh hình.</li></ul><p><strong>Các bệnh lý thần kinh:</strong></p><ul><li>Phục hồi chức năng cho người sau đột quỵ.</li><li>Cải thiện vận động cho người mắc các bệnh lý thần kinh trung ương và ngoại biên.</li></ul><p><strong>Các bệnh lý hô hấp:</strong></p><ul><li>Hướng dẫn các bài tập thở và kỹ thuật làm sạch đường thở.</li><li>Phục hồi chức năng hô hấp cho người mắc các bệnh phổi mạn tính.</li></ul><p><strong>Các đối tượng đặc biệt:</strong></p><ul><li>Vật lý trị liệu cho trẻ em có các vấn đề về vận động và phát triển.</li><li>Phục hồi chức năng cho phụ nữ mang thai và sau sinh.</li><li>Vật lý trị liệu cho người cao tuổi để duy trì chức năng vận động và phòng ngừa té ngã.</li><li>Phục hồi chức năng cho vận động viên sau chấn thương và để nâng cao hiệu suất.</li></ul><p>Các chuyên gia vật lý trị liệu sử dụng nhiều kỹ thuật và phương pháp khác nhau như:</p><ul><li><strong>Các bài tập vận động trị liệu:</strong> Bài tập chủ động, bài tập thụ động, bài tập tăng cường sức mạnh, bài tập kéo giãn.</li><li><strong>Các tác nhân vật lý:</strong> Nhiệt trị liệu (nóng, lạnh), điện trị liệu, siêu âm trị liệu, laser trị liệu, sóng ngắn.</li><li><strong>Kỹ thuật nắn chỉnh khớp và mô mềm (manual therapy).</strong></li><li><strong>Hướng dẫn sử dụng các dụng cụ hỗ trợ vận động.</strong></li><li><strong>Giáo dục bệnh nhân về các bài tập tự thực hiện và cách phòng ngừa tái phát.</strong></li></ul>', 'incons/0a0hzhTQcCHxY3dlaVdvrcq13OwJRHCXtFvEMULN.png', 'images/GQHjsMOrb7ZZe4IBoF3cPcLh3LwPmo2sE0hafkqH.png', 0, '2025-03-23 07:07:41', '2025-05-10 02:15:02'),
(20, 'Tâm thần', '<p><strong>Danh sách các giáo sư, bác sĩ chuyên khoa Sức khỏe tâm thần giỏi:</strong></p><ul><li>Các giáo sư, bác sĩ uy tín đầu ngành chuyên khoa Sức khỏe tâm thần đã và đang công tác tại các bệnh viện lớn như: Bệnh viện Tâm thần Trung ương, Bệnh viện Chợ Rẫy, Bệnh viện Lão khoa...</li><li>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp.</li></ul><p><strong>Bác sĩ khám -Tư vấn - Điều trị</strong></p><ul><li>Mất ngủ, Rối loạn giấc ngủ</li><li>Trầm cảm, Căng thẳng, stress</li><li>Tâm thần phân liệt, Bệnh hoang tưởng</li><li>Rối loạn cảm xúc , Rối loạn căng thẳng sau chấn thương tâm lý&nbsp;</li><li>Rối loạn lo âu, Rối loạn lưỡng cực, Rối loạn nhân cách</li><li>Tư vấn và tạo điều kiện cho bệnh nhân tái thích ứng xã hội</li></ul><p><strong>Một số triệu chứng, biểu hiện</strong></p><ul><li>Ảo giác, Hoang tưởng, Nói cười một mình</li><li>Bi quan, Bồn chồn, Buồn rầu, Hoảng hốt</li><li>Khó tập trung tâm trí, Nhầm lẫn tư duy</li><li>Lo âu, Lo lắng</li><li>Rối loạn giấc ngủ</li><li>Sợ hãi, Sợ một mình, Sợ nơi đông người</li><li>Xa lánh mọi người, Ý nghĩ kì lạ&nbsp;</li></ul>', 'incons/uSERynLHOfax5U2W52BHql6QiMybLBvzxHJpQgV5.png', 'images/MwpAPERwoT2VOXv6PcVfLZwkiVA8VdOo4uywhpuK.png', 0, '2025-03-23 07:07:41', '2025-05-10 02:10:23');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `systems`
--

CREATE TABLE `systems` (
  `id` bigint UNSIGNED NOT NULL,
  `site_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `site_keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_favicon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_video` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_tags` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `default_language` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `timezone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'UTC',
  `tracking_code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hotline` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `banner` json DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `systems`
--

INSERT INTO `systems` (`id`, `site_name`, `site_description`, `site_keywords`, `site_logo`, `site_favicon`, `site_url`, `site_video`, `meta_tags`, `default_language`, `timezone`, `tracking_code`, `address`, `hotline`, `banner`, `isDeleted`, `created_at`, `updated_at`) VALUES
(1, 'Quick Care', 'Phòng khám Quick Care - Chăm sóc sức khỏe nhanh chóng và tiện lợi.', 'phòng khám, chăm sóc sức khỏe, khám bệnh nhanh, dịch vụ y tế', 'logos/mYxrGa8QxhUlwa1WhpqQ7purZtuogeZIvoqPgfDa.jpg', 'favicons/PboJ0TUDLyC6H22C6Y6jW80vflo1VwHhNn1l2O7V.jpg', 'https://quickcare.vn', 'https://youtu.be/COT2dguybbk?si=cj5wdpc8BUr1fLu7', 'quick care, khám bệnh, sức khỏe, y tế', 'vi', 'UTC+7', '2', '59 P. Trần Phú, Điện Biên, Ba Đình, TP. Hà Nội', '0363627444', '[{\"title\": \"Sức khỏe và hạnh phúc\", \"image_url\": \"banner_images/buevSn15H0PrRvVyCzExCHv7hE8D4s4V9n5huNhl.jpg\"}]', 0, '2025-03-23 08:40:08', '2025-05-03 06:16:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `firebase_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','doctor','guest','cashier','consultant') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'guest',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `firebase_token`, `phone`, `social_id`, `social_provider`, `email_verified_at`, `password`, `role`, `isDeleted`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Nguyễn Văn An', 'admin@example.com', NULL, '0987654321', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$kgv9TlV83nqJzdmmt49Iy.DsgXclxGMZ7wNrFdma1SIeKGXW1TaMy', 'admin', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(2, 'Trần Thị Bích', 'bich.tran@example.com', NULL, '0978654321', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'admin', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(3, 'PGS. TS. BSCK II. TTƯT Lê Minh', 'doctor@example.com', NULL, '0912345678', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$RtmKdtILX.jOyTGt8VQrhOBr0.vb8Y.OR1XbQHdDtGqtWPhMH2yA2', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-05-09 04:00:23'),
(4, 'TTUT. BSCKII Hoàng Dũng', 'test@example.com', NULL, '0987123456', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$heMusowIkkhzuCV.HLoP0.0Yswis1K8SUZo2uXlNalkyxSxALfL1W', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-05-09 04:01:24'),
(5, 'Thạc sĩ, Bác sĩ Trần Văn Hùng', 'hung.tran@example.com', NULL, '0901122334', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$kHgQ2f0.UOSgORIF8L0MBOEfcQQpjjVGH9QfpPx3iS90FrXVliJ/m', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-05-09 04:05:30'),
(6, 'Bác sĩ Phạm Ngọc Anh', 'anh.pham@example.com', NULL, '0933456789', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$2LrCM7CX6EWqH/r6ZKIQGeC8JCOc6sw/L5EEc6IF97TMQoC4bY0ja', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(7, 'BSCKI Nguyễn Thanh Tùng', 'tung.nguyen@example.com', NULL, '0923344556', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$6loN3/6XkgZ8beKS4I3QLutJDqaugUwkpZCFFGNjRBXaic1IdNldS', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-05-09 04:09:12'),
(8, 'Bác sĩ Đỗ Thị Hòa', 'hoa.do@example.com', NULL, '0912456789', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$h1CYz6gdj7epyqOypE1sO.t46XLTMUsdoVVBqWaXYip8p3syQcXdG', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-05-09 04:10:04'),
(9, 'Bác sĩ Vũ Đức Minh', 'minh.vu@example.com', NULL, '0978654322', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$zjD8Nqc4t6xHNGMlEUqgZe3y5o5b0LpASZBv7cMa0cCzN7UUJzbnu', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(10, 'BSCKI Lý Hoàng Nam', 'nam.ly@example.com', NULL, '0902233445', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$54qIFlVCE.qv6yb3mcWOOeUdzEzRRUhyM4X.V.4PefLCZAavkdhgS', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-05-09 04:10:56'),
(11, 'Nguyễn Thị Mai', 'guest@example.com', NULL, '0967891234', '123456789', 'facebook', '2025-03-23 07:10:51', '$2y$10$Gg8.cU2oMDSP6C2iGhqlSueRr4LFEYM9WsNvjWJEhfg2BiAvKV3bi', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(12, 'Phạm Văn Hoàng', 'hoang.pham@example.com', NULL, '0934567890', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$HHkoqQfvnSoYDUyHQzo9jOxEZD5VDLVKbFZciN4Bpw1oDZWJJxW7i', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(13, 'Lê Thị Hạnh', 'hanh.le@example.com', NULL, '0925678901', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$FTrNw27dNGbZnbD4gfypnOIXpfK7Jj7ivu43kZEZNx2mjeeH1rJPO', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(14, 'Trần Quốc Toàn', 'toan.tran@example.com', NULL, '0916789012', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$POQ61QZSq/WJTvGqs11P8OE7akcQrOK74ILTGxUwWWpjlrwEfGtAy', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(15, 'Vũ Ngọc Bích', 'bich.vu@example.com', NULL, '0987890123', '234567890', 'google', '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(16, 'Đỗ Văn Hải', 'hai.do@example.com', NULL, '0978901234', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(17, 'Lý Minh Quang', 'quang.ly@example.com', NULL, '0901122334', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(18, 'Hoàng Thanh Lan', 'lan.hoang@example.com', NULL, '0961234567', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(19, 'Nguyễn Văn Tâm', 'tam.nguyen@example.com', NULL, '0942345678', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(20, 'Phạm Thị Thủy', 'thuy.pham@example.com', NULL, '0923456789', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(21, 'Lê Văn Hưng', 'hung.le@example.com', NULL, '0981234567', '345678901', 'zalo', '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(22, 'Trần Bảo Ngọc', 'ngoc.tran@example.com', NULL, '0972345678', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(23, 'Vũ Hồng Sơn', 'son.vu@example.com', NULL, '0963456789', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(24, 'Đỗ Thu Hà', 'ha.do@example.com', NULL, '0954567890', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(25, 'Nguyễn Văn Quý', 'quy.nguyen@example.com', NULL, '0945678901', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(26, 'Phạm Thanh Hà', 'ha.pham@example.com', NULL, '0936789012', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(27, 'Lý Minh Đức', 'duc.ly@example.com', NULL, '0927890123', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(28, 'Hoàng Thị Hằng', 'hang.hoang@example.com', NULL, '0918901234', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(29, 'Nguyễn Ngọc Thanh', 'thanh.nguyen@example.com', NULL, '0989012345', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(30, 'Phạm Văn Đạt', 'dat.pham@example.com', NULL, '0970123456', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$abcdefghijk', 'guest', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(31, 'Nguyễn Việt Hưng', 'hung87800@gmail.com', NULL, '0375343852', NULL, NULL, NULL, '$2y$10$aJ2T1NQ2fYIjEKGwNlhT2.gyOeif3dMYBmQIQM0nT/rhMJHdigxp6', 'admin', 0, NULL, '2025-03-27 11:35:47', '2025-03-27 11:35:47'),
(32, 'Live Tiktok', 'livetiktok0002@gmail.com', NULL, NULL, NULL, NULL, NULL, '$2y$10$gqS7qxtJo01KTNm3hIE8VeIwjTcPe2eFdoDqa09Vk6dT4GL9teCZe', 'guest', 0, 'uSK8Gm1tqQnVQCKtCcnOJE8x9ymH5dBVPB0xIUGKsTMARKeYL1rAKg55lhAP', '2025-03-31 05:23:31', '2025-03-31 05:25:09'),
(33, 'Nguyễn Việt Hưng', 'hung123@gmail.com', NULL, '0987612345', NULL, NULL, NULL, '$2y$10$LquIAInWtJTCNHA/Lu95RO.onWJxW2M/66JOPJXlb/xS2FSJeDXFi', 'doctor', 0, NULL, '2025-04-09 14:30:54', '2025-04-09 14:30:54');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookings_doctor_id_foreign` (`doctor_id`),
  ADD KEY `bookings_service_id_foreign` (`service_id`),
  ADD KEY `bookings_guest_id_foreign` (`guest_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`);

--
-- Chỉ mục cho bảng `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversations_guest_id_foreign` (`guest_id`);

--
-- Chỉ mục cho bảng `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctors_user_id_foreign` (`user_id`),
  ADD KEY `doctors_specialty_id_foreign` (`specialty_id`);

--
-- Chỉ mục cho bảng `doctor_service`
--
ALTER TABLE `doctor_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_service_doctor_id_foreign` (`doctor_id`),
  ADD KEY `doctor_service_service_id_foreign` (`service_id`);

--
-- Chỉ mục cho bảng `doctor_specialties`
--
ALTER TABLE `doctor_specialties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_specialties_doctor_id_foreign` (`doctor_id`),
  ADD KEY `doctor_specialties_specialty_id_foreign` (`specialty_id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feedback_guest_id_foreign` (`guest_id`),
  ADD KEY `feedback_doctor_id_foreign` (`doctor_id`),
  ADD KEY `feedback_service_id_foreign` (`service_id`);

--
-- Chỉ mục cho bảng `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guests_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_details_invoice_id_foreign` (`invoice_id`),
  ADD KEY `invoice_details_booking_id_foreign` (`booking_id`);

--
-- Chỉ mục cho bảng `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Chỉ mục cho bảng `medical_records`
--
ALTER TABLE `medical_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medical_records_guest_id_foreign` (`guest_id`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_conversation_id_foreign` (`conversation_id`),
  ADD KEY `messages_sender_id_foreign` (`sender_id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`),
  ADD KEY `notifications_booking_id_foreign` (`booking_id`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `posts_slug_unique` (`slug`),
  ADD KEY `posts_category_id_foreign` (`category_id`),
  ADD KEY `posts_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `results_booking_id_foreign` (`booking_id`),
  ADD KEY `results_doctor_id_foreign` (`doctor_id`),
  ADD KEY `results_guest_id_foreign` (`guest_id`);

--
-- Chỉ mục cho bảng `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedules_doctor_id_foreign` (`doctor_id`);

--
-- Chỉ mục cho bảng `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_specialty_id_foreign` (`specialty_id`);

--
-- Chỉ mục cho bảng `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `systems`
--
ALTER TABLE `systems`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `doctor_service`
--
ALTER TABLE `doctor_service`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `doctor_specialties`
--
ALTER TABLE `doctor_specialties`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `guests`
--
ALTER TABLE `guests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT cho bảng `invoice_details`
--
ALTER TABLE `invoice_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT cho bảng `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `medical_records`
--
ALTER TABLE `medical_records`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `results`
--
ALTER TABLE `results`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT cho bảng `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=337;

--
-- AUTO_INCREMENT cho bảng `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `specialties`
--
ALTER TABLE `specialties`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `systems`
--
ALTER TABLE `systems`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_guest_id_foreign` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `conversations_guest_id_foreign` FOREIGN KEY (`guest_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_specialty_id_foreign` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `doctors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `doctor_service`
--
ALTER TABLE `doctor_service`
  ADD CONSTRAINT `doctor_service_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `doctor_service_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `doctor_specialties`
--
ALTER TABLE `doctor_specialties`
  ADD CONSTRAINT `doctor_specialties_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `doctor_specialties_specialty_id_foreign` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `feedback_guest_id_foreign` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `feedback_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `guests`
--
ALTER TABLE `guests`
  ADD CONSTRAINT `guests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD CONSTRAINT `invoice_details_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoice_details_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `medical_records`
--
ALTER TABLE `medical_records`
  ADD CONSTRAINT `medical_records_guest_id_foreign` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_conversation_id_foreign` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `results_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `results_guest_id_foreign` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_doctor_id_foreign` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_specialty_id_foreign` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
