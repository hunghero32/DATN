-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th5 03, 2025 lúc 07:39 AM
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
(1, 3, 'avatars/knn9cEpWQ5WlKlKjkhJfDuh604pe5AF9Irh4jR9X.jpg', 'Bác sĩ Lê Minh', '<p>Chuyên gia nội tổng quát với hơn 10 năm kinh nghiệm.&nbsp;</p>', 4, 10, 'files/le_minh_cv.pdf', 1, 0, '2025-03-26 07:13:07', '2025-04-16 16:47:00'),
(2, 4, 'avatars/iBsr0GuGvtjYmsitndF3M1B1At8KMgYwAMNC6xMz.jpg', 'Bác sĩ Hoàng Dũng', '<p>Chuyên gia tim mạch, từng làm việc tại bệnh viện Bạch Mai.</p>', 19, 12, 'files/hoang_dung_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-05-03 04:14:14'),
(3, 5, 'avatars/S5ywDXVqRwY0BXPaWssdmcILOTvegFGHYYI4aASP.png', 'Bác sĩ Trần Văn Hùng', '<p>Chuyên gia nhi khoa, chuyên điều trị bệnh trẻ nhỏ.</p>', 5, 8, 'files/tran_hung_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-05-03 04:14:30'),
(4, 6, 'avatars/fg3jcujAweg0wm5PzC0dWCdj36lRSK7CtHYqNiSf.png', 'Bác sĩ Phạm Ngọc Anh', '<p>Chuyên gia da liễu, tư vấn điều trị các bệnh ngoài da.</p>', 6, 15, 'files/pham_anh_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-05-03 04:14:59'),
(5, 7, 'avatars/ZWFonLhPfr9zCaBaU4VWfMWxgCuN7NKbIB70wcP6.jpg', 'Bác sĩ Nguyễn Thanh Tùng', '<p>Bác sĩ nội tổng quát với nhiều năm kinh nghiệm.</p>', 4, 9, 'files/nguyen_tung_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-04-19 06:56:43'),
(6, 8, 'avatars/UBJU8r5m9JnDVJuXmw6ECt05HYmoslVkmaXziZLA.jpg', 'Bác sĩ Đỗ Thị Hòa', '<p>Chuyên gia tim mạch, có kinh nghiệm điều trị bệnh nhân cao tuổi.</p>', 7, 11, 'files/do_hoa_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-05-03 04:15:30'),
(7, 9, 'avatars/doctor_vu_minh.jpg', 'Bác sĩ Vũ Đức Minh', 'Chuyên gia nhi khoa, tư vấn và điều trị trẻ sơ sinh.', 5, 7, 'files/vu_minh_cv.pdf', 0, 1, '2025-03-23 07:13:07', '2025-04-11 13:58:12'),
(8, 10, 'avatars/Ws02e8VSKUahTvd7nhldnucmzINEb6X91dtCVkxo.jpg', 'Bác sĩ Lý Hoàng Nam', '<p>Chuyên gia nội tổng quát, tư vấn và điều trị bệnh mãn tính.</p>', 4, 13, 'files/ly_nam_cv.pdf', 1, 0, '2025-03-23 07:13:07', '2025-04-19 06:59:01');

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
(19, 3, 1, 'https://quickcare.asia/detail-service/5', '2025-05-03 02:59:13', '2025-05-03 02:59:13'),
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
(1, 5, 1, 'Xác nhận đặt lịch khám', 'Lịch khám của bạn vào ngày 2025-04-10 đã được xác nhận.', 'booking_confirmation', 1, 0, '2025-03-23 00:30:00', '2025-04-22 06:35:38'),
(2, 8, 2, 'Lịch khám đang chờ xác nhận', 'Lịch khám vào ngày 2025-04-11 của bạn đang chờ xác nhận từ bác sĩ.', 'booking_pending', 0, 0, '2025-03-23 00:31:00', '2025-03-23 00:31:00'),
(3, 1, 3, 'Kết quả khám bệnh', 'Kết quả chẩn đoán của bạn đã có. Vui lòng kiểm tra trong hệ thống.', 'result_available', 0, 0, '2025-04-12 08:30:00', '2025-04-12 08:30:00'),
(4, 6, 4, 'Xác nhận xét nghiệm máu', 'Bạn đã đăng ký xét nghiệm máu vào ngày 2025-04-13.', 'booking_confirmation', 0, 0, '2025-04-13 02:00:00', '2025-04-13 02:00:00'),
(5, 2, 5, 'Nhắc lịch khám nhi khoa', 'Lịch khám nhi khoa của con bạn sẽ diễn ra vào 2025-04-14.', 'reminder', 0, 0, '2025-04-14 03:00:00', '2025-04-14 03:00:00'),
(6, 9, 6, 'Kết quả tư vấn da liễu', 'Kết quả tư vấn da liễu của bạn đã có trên hệ thống.', 'result_available', 0, 0, '2025-04-15 08:00:00', '2025-04-15 08:00:00'),
(7, 3, 7, 'Lịch nội soi bị hủy', 'Lịch nội soi của bạn vào 2025-04-16 đã bị hủy.', 'booking_canceled', 1, 0, '2025-04-16 09:00:00', '2025-04-16 09:00:00'),
(8, 4, 8, 'Xác nhận đo điện tâm đồ', 'Bạn đã đặt lịch đo điện tâm đồ vào 2025-04-17.', 'booking_confirmation', 0, 0, '2025-04-17 02:30:00', '2025-04-17 02:30:00'),
(9, 7, 9, 'Lịch khám chờ xác nhận', 'Lịch chụp CT scan của bạn đang chờ xác nhận.', 'booking_pending', 0, 0, '2025-04-18 03:00:00', '2025-04-18 03:00:00'),
(10, 10, 10, 'Kết quả khám phụ khoa', 'Kết quả khám phụ khoa của bạn đã sẵn sàng.', 'result_available', 0, 0, '2025-04-19 04:00:00', '2025-04-19 04:00:00'),
(11, 1, 11, 'Lịch khám nội tiết', 'Lịch khám nội tiết của bạn vào 2025-04-20 đã được xác nhận.', 'booking_confirmation', 0, 0, '2025-04-20 05:00:00', '2025-04-20 05:00:00'),
(12, 5, 12, 'Kết quả siêu âm động mạch cảnh', 'Kết quả siêu âm động mạch cảnh của bạn đã có.', 'result_available', 0, 0, '2025-04-21 06:00:00', '2025-04-21 06:00:00'),
(13, 2, 13, 'Lịch xét nghiệm chức năng gan bị hủy', 'Lịch xét nghiệm của bạn vào 2025-04-22 đã bị hủy.', 'booking_canceled', 1, 0, '2025-04-22 07:00:00', '2025-04-22 07:00:00'),
(14, 6, 14, 'Kết quả xét nghiệm tiểu đường', 'Kết quả xét nghiệm tiểu đường của bạn đã có.', 'result_available', 0, 0, '2025-04-23 08:00:00', '2025-04-23 08:00:00'),
(15, 9, 15, 'Nhắc lịch khám tai - mũi - họng', 'Bạn có lịch khám tai - mũi - họng vào 2025-04-24.', 'reminder', 0, 0, '2025-04-24 09:00:00', '2025-04-24 09:00:00'),
(16, 8, 16, 'Xác nhận tư vấn dị ứng', 'Bạn đã đặt lịch tư vấn dị ứng vào 2025-04-25.', 'booking_confirmation', 0, 0, '2025-04-25 10:00:00', '2025-04-25 10:00:00'),
(17, 10, 17, 'Kết quả xét nghiệm vi khuẩn HP', 'Kết quả xét nghiệm HP của bạn đã có.', 'result_available', 0, 0, '2025-04-26 11:00:00', '2025-04-26 11:00:00'),
(18, 3, 18, 'Lịch chụp MRI bị hủy', 'Lịch chụp MRI của bạn vào 2025-04-27 đã bị hủy.', 'booking_canceled', 1, 0, '2025-04-27 12:00:00', '2025-04-27 12:00:00'),
(19, 4, 19, 'Nhắc lịch tầm soát ung thư', 'Bạn có lịch tầm soát ung thư vào 2025-04-28.', 'reminder', 0, 0, '2025-04-28 13:00:00', '2025-04-28 13:00:00'),
(20, 7, 20, 'Xác nhận tư vấn thai sản', 'Bạn đã đặt lịch tư vấn thai sản vào 2025-04-29.', 'booking_confirmation', 0, 0, '2025-04-29 14:00:00', '2025-04-29 14:00:00'),
(21, 1, NULL, 'Vaicanho', 'Hưng', 'info', 0, 0, '2025-03-27 11:33:41', '2025-03-27 11:33:41'),
(22, 3, 21, 'Lịch hẹn mới', 'Bạn có một lịch hẹn mới từ khách hàng Hưng.', 'booking', 0, 0, '2025-03-30 01:38:57', '2025-03-30 01:38:57'),
(23, 2, 21, 'Xác nhận lịch hẹn', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-03-30 01:38:57', '2025-03-30 01:38:57'),
(24, 4, 22, 'Lịch hẹn mới', 'Bạn có một lịch hẹn mới từ khách hàng Hưng.', 'booking', 0, 0, '2025-03-30 01:46:01', '2025-03-30 01:46:01'),
(25, 2, 22, 'Xác nhận lịch hẹn', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-03-30 01:46:01', '2025-03-30 01:46:01'),
(26, 3, 23, 'Lịch hẹn mới', 'Bạn có một lịch hẹn mới từ khách hàng Hưng.', 'booking', 0, 0, '2025-03-30 09:29:28', '2025-03-30 09:29:28'),
(27, 2, 23, 'Xác nhận lịch hẹn', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-03-30 09:29:28', '2025-03-30 09:29:28'),
(28, 3, 23, 'Lịch hẹn đã xác nhận', 'Lịch hẹn với Hưng đã được tự động xác nhận.', 'booking', 0, 0, '2025-03-30 10:00:00', '2025-03-30 10:00:00'),
(29, 2, 23, 'Lịch hẹn đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh đã được tự động xác nhận.', 'booking', 0, 0, '2025-03-30 10:00:00', '2025-03-30 10:00:00'),
(30, 11, 22, 'Kết quả khám đã sẵn sàng', 'Kết quả khám của bạn đã có. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 13:22:36', '2025-03-30 13:22:36'),
(31, 11, 22, 'Kết quả khám đã sẵn sàng', 'Kết quả khám của bạn đã có. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 13:25:12', '2025-03-30 13:25:12'),
(32, 4, 24, 'Lịch hẹn mới', 'Bạn có một lịch hẹn mới từ khách hàng Hưng.', 'booking', 0, 0, '2025-03-30 13:29:22', '2025-03-30 13:29:22'),
(33, 2, 24, 'Xác nhận lịch hẹn', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-03-30 13:29:22', '2025-03-30 13:29:22'),
(34, 11, 22, 'Kết quả khám đã sẵn sàng', 'Kết quả khám của bạn đã có. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 13:36:58', '2025-03-30 13:36:58'),
(35, 4, 24, 'Cập nhật trạng thái lịch khám', 'Lịch khám #24 đã được cập nhật trạng thái: Đã xác nhận', 'booking', 0, 0, '2025-03-30 13:42:53', '2025-03-30 13:42:53'),
(36, 2, 24, 'Cập nhật trạng thái lịch khám', 'Lịch khám #24 đã được cập nhật trạng thái: Đã xác nhận', 'booking', 0, 0, '2025-03-30 13:42:53', '2025-03-30 13:42:53'),
(37, 4, 24, 'Cập nhật trạng thái lịch khám', 'Lịch khám #24 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-03-30 13:45:09', '2025-03-30 13:45:09'),
(38, 2, 24, 'Cập nhật trạng thái lịch khám', 'Lịch khám #24 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-03-30 13:45:09', '2025-03-30 13:45:09'),
(39, 2, 24, 'Kết quả khám đã có', 'Kết quả khám của bạn đã sẵn sàng. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 13:45:09', '2025-03-30 13:45:09'),
(40, 11, 24, 'Kết quả khám đã sẵn sàng', 'Kết quả khám của bạn đã có. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 13:46:11', '2025-03-30 13:46:11'),
(41, 11, 24, 'Kết quả khám đã sẵn sàng', 'Kết quả khám của bạn đã có. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 13:47:09', '2025-03-30 13:47:09'),
(42, 2, 24, 'Kết quả khám đã sẵn sàng', 'Kết quả khám của bạn đã có. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 13:51:36', '2025-03-30 13:51:36'),
(43, 2, 24, 'Kết quả khám đã sẵn sàng', 'Kết quả khám của bạn đã có. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 13:54:38', '2025-03-30 13:54:38'),
(44, 2, 24, 'Kết quả khám đã sẵn sàng', 'Kết quả khám của bạn đã có. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 13:56:12', '2025-03-30 13:56:12'),
(45, 2, 24, 'Kết quả khám về  đã có', 'Lịch khám #24 về  đã có kết quả khám. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 14:01:18', '2025-03-30 14:01:18'),
(46, 2, 24, 'Kết quả khám về  đã có', 'Lịch khám #24 về Siêu Âm Tim đã có kết quả khám. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 14:03:32', '2025-03-30 14:03:32'),
(47, 2, 24, 'Kết quả khám đã có', 'Lịch khám #24 về Siêu Âm Tim đã có kết quả khám. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 14:04:50', '2025-03-30 14:04:50'),
(48, 2, 24, 'Kết quả khám Siêu Âm Tim đã có', 'Lịch khám #24 về Siêu Âm Tim đã có kết quả khám. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-03-30 14:05:15', '2025-03-30 14:05:15'),
(49, 1, 6, 'Có hóa đơn mới', 'Hóa đơn cho dịch vụ **Siêu Âm Tim** . Tổng tiền: 550.000 đ.', 'invoice', 0, 0, '2025-03-30 14:09:20', '2025-03-30 14:09:20'),
(50, 2, 6, 'Có hóa đơn mới', 'Hóa đơn cho dịch vụ **Siêu Âm Tim** . Tổng tiền: 550.000 đ.', 'invoice', 0, 0, '2025-03-30 14:09:20', '2025-03-30 14:09:20'),
(51, 31, 6, 'Có hóa đơn mới', 'Hóa đơn cho dịch vụ **Siêu Âm Tim** . Tổng tiền: 550.000 đ.', 'invoice', 0, 0, '2025-03-30 14:09:20', '2025-03-30 14:09:20'),
(52, 4, 6, 'Có hóa đơn mới', 'Hóa đơn cho dịch vụ **Siêu Âm Tim** . Tổng tiền: 550.000 đ.', 'invoice', 0, 0, '2025-03-30 14:09:20', '2025-03-30 14:09:20'),
(53, 2, 6, 'Có hóa đơn mới', 'Hóa đơn cho dịch vụ **Siêu Âm Tim** . Tổng tiền: 550.000 đ.', 'invoice', 0, 0, '2025-03-30 14:09:20', '2025-03-30 14:09:20'),
(54, 1, 6, 'Có hóa đơn mới', 'Hóa đơn cho dịch vụ **Siêu Âm Tim**\nTổng tiền: 440.000 đ\nGiảm giá: 100.000 đ\nThuế: 40.000 đ\nGhi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 14:11:33', '2025-03-30 14:11:33'),
(55, 2, 6, 'Có hóa đơn mới', 'Hóa đơn cho dịch vụ **Siêu Âm Tim**\nTổng tiền: 440.000 đ\nGiảm giá: 100.000 đ\nThuế: 40.000 đ\nGhi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 14:11:33', '2025-03-30 14:11:33'),
(56, 31, 6, 'Có hóa đơn mới', 'Hóa đơn cho dịch vụ **Siêu Âm Tim**\nTổng tiền: 440.000 đ\nGiảm giá: 100.000 đ\nThuế: 40.000 đ\nGhi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 14:11:33', '2025-03-30 14:11:33'),
(57, 4, 6, 'Có hóa đơn mới', 'Hóa đơn cho dịch vụ **Siêu Âm Tim**\nTổng tiền: 440.000 đ\nGiảm giá: 100.000 đ\nThuế: 40.000 đ\nGhi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 14:11:33', '2025-03-30 14:11:33'),
(58, 2, 6, 'Có hóa đơn mới', 'Hóa đơn cho dịch vụ **Siêu Âm Tim**\nTổng tiền: 440.000 đ\nGiảm giá: 100.000 đ\nThuế: 40.000 đ\nGhi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 14:11:33', '2025-03-30 14:11:33'),
(59, 1, 6, 'Có hóa đơn mới', '🔹 **Dịch vụ:** Siêu Âm Tim\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 400.000 đ\n🔻 Giảm giá: 100.000 đ\n📌 Thuế: 0 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 14:13:30', '2025-03-30 14:13:30'),
(60, 2, 6, 'Có hóa đơn mới', '🔹 **Dịch vụ:** Siêu Âm Tim\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 400.000 đ\n🔻 Giảm giá: 100.000 đ\n📌 Thuế: 0 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 14:13:30', '2025-03-30 14:13:30'),
(61, 31, 6, 'Có hóa đơn mới', '🔹 **Dịch vụ:** Siêu Âm Tim\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 400.000 đ\n🔻 Giảm giá: 100.000 đ\n📌 Thuế: 0 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 14:13:30', '2025-03-30 14:13:30'),
(62, 4, 6, 'Có hóa đơn mới', '🔹 **Dịch vụ:** Siêu Âm Tim\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 400.000 đ\n🔻 Giảm giá: 100.000 đ\n📌 Thuế: 0 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 14:13:30', '2025-03-30 14:13:30'),
(63, 2, 6, 'Có hóa đơn mới', '🔹 **Dịch vụ:** Siêu Âm Tim\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 400.000 đ\n🔻 Giảm giá: 100.000 đ\n📌 Thuế: 0 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 14:13:30', '2025-03-30 14:13:30'),
(64, 1, 6, 'Có hóa đơn mới', '🔹Dịch vụ: **Siêu Âm Tim**\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 500.000 đ\n🔻 Giảm giá: 0 đ\n📌 Thuế: 0 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 17:20:54', '2025-03-30 17:20:54'),
(65, 2, 6, 'Có hóa đơn mới', '🔹Dịch vụ: **Siêu Âm Tim**\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 500.000 đ\n🔻 Giảm giá: 0 đ\n📌 Thuế: 0 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 17:20:54', '2025-03-30 17:20:54'),
(66, 31, 6, 'Có hóa đơn mới', '🔹Dịch vụ: **Siêu Âm Tim**\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 500.000 đ\n🔻 Giảm giá: 0 đ\n📌 Thuế: 0 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 17:20:55', '2025-03-30 17:20:55'),
(67, 4, 6, 'Có hóa đơn mới', '🔹Dịch vụ: **Siêu Âm Tim**\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 500.000 đ\n🔻 Giảm giá: 0 đ\n📌 Thuế: 0 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 17:20:55', '2025-03-30 17:20:55'),
(68, 2, 6, 'Có hóa đơn mới', '🔹Dịch vụ: **Siêu Âm Tim**\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 500.000 đ\n🔻 Giảm giá: 0 đ\n📌 Thuế: 0 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 17:20:55', '2025-03-30 17:20:55'),
(69, 1, 6, 'Có hóa đơn mới', '🔹Dịch vụ: **Siêu Âm Tim**\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 600.000 đ\n🔻 Giảm giá: 0 đ\n📌 Thuế: 100.000 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 17:23:44', '2025-03-30 17:23:44'),
(70, 2, 6, 'Có hóa đơn mới', '🔹Dịch vụ: **Siêu Âm Tim**\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 600.000 đ\n🔻 Giảm giá: 0 đ\n📌 Thuế: 100.000 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 17:23:44', '2025-03-30 17:23:44'),
(71, 31, 6, 'Có hóa đơn mới', '🔹Dịch vụ: **Siêu Âm Tim**\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 600.000 đ\n🔻 Giảm giá: 0 đ\n📌 Thuế: 100.000 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 17:23:44', '2025-03-30 17:23:44'),
(72, 4, 6, 'Có hóa đơn mới', '🔹Dịch vụ: **Siêu Âm Tim**\n💰 Giá gốc: 500.000 đ\n💵 Tổng tiền: 600.000 đ\n🔻 Giảm giá: 0 đ\n📌 Thuế: 100.000 đ\n📝 Ghi chú: Không có ghi chú', 'invoice', 0, 0, '2025-03-30 17:23:44', '2025-03-30 17:23:44'),
(73, 4, 24, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn với Hưng vào lúc 08:00 ngày 07/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-05 18:26:00', '2025-04-05 18:26:00'),
(74, 2, 24, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng vào lúc 08:00 ngày 07/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-05 18:26:00', '2025-04-05 18:26:00'),
(75, 19, 25, 'Lịch hẹn Siêu Âm Tim bị hủy', 'Lịch hẹn của bạn vào lúc 08:00 ngày 07/04/2025 đã bị hủy do hết chỗ.', 'booking', 0, 0, '2025-04-05 18:26:00', '2025-04-05 18:26:00'),
(76, 18, 26, 'Lịch hẹn Siêu Âm Tim bị hủy', 'Lịch hẹn của bạn vào lúc 08:00 ngày 07/04/2025 đã bị hủy do hết chỗ.', 'booking', 0, 0, '2025-04-05 18:26:00', '2025-04-05 18:26:00'),
(77, 4, 25, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn với Nguyễn Văn Tâm vào lúc 08:00 ngày 07/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-05 18:27:00', '2025-04-05 18:27:00'),
(78, 19, 25, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng vào lúc 08:00 ngày 07/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-05 18:27:00', '2025-04-05 18:27:00'),
(79, 18, 26, 'Lịch hẹn Siêu Âm Tim bị hủy', 'Lịch hẹn của bạn vào lúc 08:00 ngày 07/04/2025 đã bị hủy do hết chỗ.', 'booking', 0, 0, '2025-04-05 18:27:00', '2025-04-05 18:27:00'),
(80, 4, 24, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn với Hưng vào lúc 08:00 ngày 07/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-05 18:29:00', '2025-04-05 18:29:00'),
(81, 2, 24, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng vào lúc 08:00 ngày 07/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-05 18:29:00', '2025-04-05 18:29:00'),
(82, 4, 24, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn với Hưng vào lúc 08:00 ngày 07/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-05 18:30:00', '2025-04-05 18:30:00'),
(83, 2, 24, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng vào lúc 08:00 ngày 07/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-05 18:30:00', '2025-04-05 18:30:00'),
(84, 19, 25, 'Lịch hẹn Siêu Âm Tim bị hủy', 'Lịch hẹn của bạn vào lúc 08:00 ngày 07/04/2025 đã bị hủy do hết chỗ.', 'booking', 0, 0, '2025-04-05 18:30:00', '2025-04-05 18:30:00'),
(85, 18, 26, 'Lịch hẹn Siêu Âm Tim bị hủy', 'Lịch hẹn của bạn vào lúc 08:00 ngày 07/04/2025 đã bị hủy do hết chỗ.', 'booking', 0, 0, '2025-04-05 18:30:00', '2025-04-05 18:30:00'),
(86, 4, 24, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #24 về Siêu Âm Tim vào lúc 08:00 ngày 07/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-06 00:41:50', '2025-04-06 00:41:50'),
(87, 2, 24, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #24 về Siêu Âm Tim vào lúc 08:00 ngày 07/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-06 00:41:50', '2025-04-06 00:41:50'),
(88, 2, 24, 'Kết quả khám sắp có', 'Kết quả khám của bạn về Siêu Âm Tim vào lúc 08:00 ngày 07/04/2025 sắp có, chờ xíu nhé!', 'result', 0, 0, '2025-04-06 00:41:50', '2025-04-06 00:41:50'),
(89, 2, 22, 'Kết quả khám Siêu Âm Tim đã có', 'Lịch khám mã #22 vào lúc 08:00 ngày 30/03/2025 về Siêu Âm Tim đã có kết quả khám. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-04-06 00:42:15', '2025-04-06 00:42:15'),
(90, 3, 27, 'Lịch hẹn mới về Khám Nội Tổng Quát', 'Bạn có một lịch hẹn mới về Khám Nội Tổng Quát từ bệnh nhân Hưng vào lúc 08:00 ngày 10/04/2025.', 'booking', 0, 0, '2025-04-09 13:17:50', '2025-04-09 13:17:50'),
(91, 2, 27, 'Xác nhận lịch hẹn Khám Nội Tổng Quát', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh về Khám Nội Tổng Quát vào lúc 08:00 ngày 10/04/2025 đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-04-09 13:17:50', '2025-04-09 13:17:50'),
(92, 3, 28, 'Lịch hẹn mới về Điện Tâm Đồ (ECG)', 'Bạn có một lịch hẹn mới về Điện Tâm Đồ (ECG) từ bệnh nhân Hưng vào lúc 08:30 ngày 10/04/2025.', 'booking', 0, 0, '2025-04-09 13:19:36', '2025-04-09 13:19:36'),
(93, 2, 28, 'Xác nhận lịch hẹn Điện Tâm Đồ (ECG)', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh về Điện Tâm Đồ (ECG) vào lúc 08:30 ngày 10/04/2025 đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-04-09 13:19:36', '2025-04-09 13:19:36'),
(94, 3, 29, 'Lịch hẹn mới về Khám Nội Tổng Quát', 'Bạn có một lịch hẹn mới về Khám Nội Tổng Quát từ bệnh nhân Hưng vào lúc 08:00 ngày 10/04/2025.', 'booking', 0, 0, '2025-04-09 14:24:23', '2025-04-09 14:24:23'),
(95, 2, 29, 'Xác nhận lịch hẹn Khám Nội Tổng Quát', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh về Khám Nội Tổng Quát vào lúc 08:00 ngày 10/04/2025 đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-04-09 14:24:23', '2025-04-09 14:24:23'),
(96, 3, 27, 'Lịch hẹn Khám Nội Tổng Quát đã xác nhận', 'Lịch hẹn với Hưng vào lúc 08:00 ngày 10/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-09 15:07:29', '2025-04-09 15:07:29'),
(97, 2, 27, 'Lịch hẹn Khám Nội Tổng Quát đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh vào lúc 08:00 ngày 10/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-09 15:07:29', '2025-04-09 15:07:29'),
(98, 2, 29, 'Lịch hẹn Khám Nội Tổng Quát bị hủy', 'Lịch hẹn của bạn vào lúc 08:00 ngày 10/04/2025 đã bị hủy do hết chỗ.', 'booking', 0, 0, '2025-04-09 15:07:29', '2025-04-09 15:07:29'),
(99, 3, 28, 'Lịch hẹn Điện Tâm Đồ (ECG) đã xác nhận', 'Lịch hẹn với Hưng vào lúc 08:30 ngày 10/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-09 15:07:29', '2025-04-09 15:07:29'),
(100, 2, 28, 'Lịch hẹn Điện Tâm Đồ (ECG) đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh vào lúc 08:30 ngày 10/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-09 15:07:29', '2025-04-09 15:07:29'),
(101, 3, 30, 'Lịch hẹn mới về Khám Nội Tổng Quát', 'Bạn có một lịch hẹn mới về Khám Nội Tổng Quát từ bệnh nhân Hưng vào lúc 16:30 ngày 09/04/2025.', 'booking', 0, 0, '2025-04-09 15:28:28', '2025-04-09 15:28:28'),
(102, 2, 30, 'Xác nhận lịch hẹn Khám Nội Tổng Quát', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh về Khám Nội Tổng Quát vào lúc 16:30 ngày 09/04/2025 đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-04-09 15:28:28', '2025-04-09 15:28:28'),
(103, 4, 31, 'Lịch hẹn mới về Siêu Âm Tim', 'Bạn có một lịch hẹn mới về Siêu Âm Tim từ bệnh nhân Nam vào lúc 08:00 ngày 12/04/2025.', 'booking', 0, 0, '2025-04-11 09:07:17', '2025-04-11 09:07:17'),
(104, 11, 31, 'Xác nhận lịch hẹn Siêu Âm Tim', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng về Siêu Âm Tim vào lúc 08:00 ngày 12/04/2025 đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-04-11 09:07:17', '2025-04-11 09:07:17'),
(105, 3, 32, 'Lịch hẹn mới về Điện Tâm Đồ (ECG)', 'Bạn có một lịch hẹn mới về Điện Tâm Đồ (ECG) từ bệnh nhân Ngọc vào lúc 08:00 ngày 12/04/2025.', 'booking', 0, 0, '2025-04-11 09:08:41', '2025-04-11 09:08:41'),
(106, 11, 32, 'Xác nhận lịch hẹn Điện Tâm Đồ (ECG)', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh về Điện Tâm Đồ (ECG) vào lúc 08:00 ngày 12/04/2025 đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-04-11 09:08:41', '2025-04-11 09:08:41'),
(107, 4, 31, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #31 về Siêu Âm Tim vào lúc 08:00 ngày 12/04/2025 đã được cập nhật trạng thái: Đã xác nhận', 'booking', 0, 0, '2025-04-11 10:20:57', '2025-04-11 10:20:57'),
(108, 11, 31, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #31 về Siêu Âm Tim vào lúc 08:00 ngày 12/04/2025 đã được cập nhật trạng thái: Đã xác nhận', 'booking', 0, 0, '2025-04-11 10:20:58', '2025-04-11 10:20:58'),
(109, 4, 31, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #31 về Siêu Âm Tim vào lúc 08:00 ngày 12/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-11 10:21:04', '2025-04-11 10:21:04'),
(110, 11, 31, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #31 về Siêu Âm Tim vào lúc 08:00 ngày 12/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-11 10:21:05', '2025-04-11 10:21:05'),
(111, 11, 31, 'Kết quả khám sắp có', 'Kết quả khám của bạn về Siêu Âm Tim vào lúc 08:00 ngày 12/04/2025 sắp có, chờ xíu nhé!', 'result', 0, 0, '2025-04-11 10:21:05', '2025-04-11 10:21:05'),
(112, 11, 31, 'Kết quả khám Siêu Âm Tim đã có', 'Lịch khám mã #31 vào lúc 08:00 ngày 12/04/2025 về Siêu Âm Tim đã có kết quả khám. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-04-11 10:21:41', '2025-04-11 10:21:41'),
(113, 3, 30, 'Lịch hẹn Khám Nội Tổng Quát đã xác nhận', 'Lịch hẹn với Hưng vào lúc 16:30 ngày 09/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-11 10:32:01', '2025-04-11 10:32:01'),
(114, 1, 30, 'Lịch hẹn Khám Nội Tổng Quát đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh vào lúc 16:30 ngày 09/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-11 10:32:02', '2025-04-11 10:32:02'),
(115, 3, 32, 'Lịch hẹn Điện Tâm Đồ (ECG) đã xác nhận', 'Lịch hẹn với Ngọc vào lúc 08:00 ngày 12/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-11 10:32:02', '2025-04-11 10:32:02'),
(116, 11, 32, 'Lịch hẹn Điện Tâm Đồ (ECG) đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Lê Minh vào lúc 08:00 ngày 12/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-11 10:32:02', '2025-04-11 10:32:02'),
(117, 4, 33, 'Lịch hẹn mới về Siêu Âm Tim', 'Bạn có một lịch hẹn mới về Siêu Âm Tim từ bệnh nhân Trang vào lúc 13:20 ngày 12/04/2025.', 'booking', 0, 0, '2025-04-12 06:20:07', '2025-04-12 06:20:07'),
(118, 11, 33, 'Xác nhận lịch hẹn Siêu Âm Tim', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng về Siêu Âm Tim vào lúc 13:20 ngày 12/04/2025 đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-04-12 06:20:08', '2025-04-12 06:20:08'),
(119, 4, 33, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn với Trang vào lúc 13:20 ngày 12/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-12 06:22:00', '2025-04-12 06:22:00'),
(120, 11, 33, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng vào lúc 13:20 ngày 12/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-12 06:22:01', '2025-04-12 06:22:01'),
(121, 11, 33, 'Kết quả khám Siêu Âm Tim đã có', 'Lịch khám mã #33 vào lúc 13:20 ngày 12/04/2025 về Siêu Âm Tim đã có kết quả khám. Hãy kiểm tra ngay!', 'result', 0, 0, '2025-04-12 06:32:17', '2025-04-12 06:32:17'),
(122, 4, 33, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #33 về Siêu Âm Tim vào lúc 13:20 ngày 12/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-12 06:32:33', '2025-04-12 06:32:33'),
(123, 11, 33, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #33 về Siêu Âm Tim vào lúc 13:20 ngày 12/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-12 06:32:34', '2025-04-12 06:32:34'),
(124, 11, 33, 'Kết quả khám sắp có', 'Kết quả khám của bạn về Siêu Âm Tim vào lúc 13:20 ngày 12/04/2025 sắp có, chờ xíu nhé!', 'result', 0, 0, '2025-04-12 06:32:34', '2025-04-12 06:32:34'),
(125, 11, 33, 'Kết quả khám Siêu Âm Tim đã có', 'Lịch khám mã #33 vào lúc 13:20 ngày 12/04/2025 về Siêu Âm Tim đã có kết quả khám. Hãy kiểm tra ngay!', 'result_complete', 0, 0, '2025-04-12 06:45:11', '2025-04-12 06:45:11'),
(126, 4, 33, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #33 về Siêu Âm Tim vào lúc 13:20 ngày 12/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-12 06:55:52', '2025-04-12 06:55:52'),
(127, 11, 33, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #33 về Siêu Âm Tim vào lúc 13:20 ngày 12/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-12 06:55:53', '2025-04-12 06:55:53'),
(128, 11, 33, 'Kết quả khám sắp có', 'Kết quả khám của bạn về Siêu Âm Tim vào lúc 13:20 ngày 12/04/2025 sắp có, chờ xíu nhé!', 'result', 0, 0, '2025-04-12 06:55:53', '2025-04-12 06:55:53'),
(129, 4, 34, 'Lịch hẹn mới về Siêu Âm Tim', 'Bạn có một lịch hẹn mới về Siêu Âm Tim từ bệnh nhân Đào vào lúc 14:00 ngày 12/04/2025.', 'booking', 0, 0, '2025-04-12 06:57:08', '2025-04-12 06:57:08'),
(130, 11, 34, 'Xác nhận lịch hẹn Siêu Âm Tim', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng về Siêu Âm Tim vào lúc 14:00 ngày 12/04/2025 đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-04-12 06:57:09', '2025-04-12 06:57:09'),
(131, 4, 34, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn với Đào vào lúc 14:00 ngày 12/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-12 06:59:00', '2025-04-12 06:59:00'),
(132, 11, 34, 'Lịch hẹn Siêu Âm Tim đã xác nhận', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng vào lúc 14:00 ngày 12/04/2025 đã được xác nhận.', 'booking', 0, 0, '2025-04-12 06:59:01', '2025-04-12 06:59:01'),
(133, 4, 34, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #34 về Siêu Âm Tim vào lúc 14:00 ngày 12/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-12 07:00:08', '2025-04-12 07:00:08'),
(134, 11, 34, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #34 về Siêu Âm Tim vào lúc 14:00 ngày 12/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-12 07:00:09', '2025-04-12 07:00:09'),
(135, 11, 34, 'Kết quả khám sắp có', 'Kết quả khám của bạn về Siêu Âm Tim vào lúc 14:00 ngày 12/04/2025 sắp có, chờ xíu nhé!', 'result', 0, 0, '2025-04-12 07:00:09', '2025-04-12 07:00:09'),
(136, 11, 34, 'Kết quả khám Siêu Âm Tim đã có', 'Lịch khám mã #34 vào lúc 14:00 ngày 12/04/2025 về Siêu Âm Tim đã có kết quả khám. Hãy kiểm tra ngay!', 'result_complete', 0, 0, '2025-04-12 07:00:25', '2025-04-12 07:00:25'),
(137, 1, 22, 'Kết quả khám Siêu Âm Tim đã có', 'Lịch khám mã #22 vào lúc 08:00 ngày 30/03/2025 về Siêu Âm Tim đã có kết quả khám. Hãy kiểm tra ngay!', 'result_complete', 0, 0, '2025-04-19 05:06:11', '2025-04-19 05:06:11'),
(138, 33, 21, '<p>Chào các bạn</p>', '<p>Đặt lịch thì đến khám đi đm</p>', 'noti', 0, 0, '2025-04-22 05:04:05', '2025-04-22 05:04:05'),
(139, 11, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:06', '2025-04-22 05:11:06'),
(140, 12, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:12', '2025-04-22 05:11:12'),
(141, 13, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:14', '2025-04-22 05:11:14'),
(142, 14, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:15', '2025-04-22 05:11:15'),
(143, 15, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:17', '2025-04-22 05:11:17'),
(144, 16, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:19', '2025-04-22 05:11:19'),
(145, 17, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:20', '2025-04-22 05:11:20'),
(146, 18, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:22', '2025-04-22 05:11:22'),
(147, 19, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:24', '2025-04-22 05:11:24'),
(148, 20, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:25', '2025-04-22 05:11:25'),
(149, 21, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:27', '2025-04-22 05:11:27'),
(150, 22, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:29', '2025-04-22 05:11:29'),
(151, 23, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:30', '2025-04-22 05:11:30'),
(152, 24, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:32', '2025-04-22 05:11:32'),
(153, 25, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:34', '2025-04-22 05:11:34'),
(154, 26, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:35', '2025-04-22 05:11:35'),
(155, 27, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:37', '2025-04-22 05:11:37'),
(156, 28, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:39', '2025-04-22 05:11:39'),
(157, 29, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:40', '2025-04-22 05:11:40'),
(158, 30, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:42', '2025-04-22 05:11:42'),
(159, 32, NULL, '<p>Chào các bạn</p>', '<p>Có ưu đãi đấy chuẩn bị nhận nhé</p>', 'noti', 0, 0, '2025-04-22 05:11:43', '2025-04-22 05:11:43'),
(160, 11, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:07', '2025-04-22 05:20:07'),
(161, 12, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:13', '2025-04-22 05:20:13'),
(162, 13, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:15', '2025-04-22 05:20:15'),
(163, 14, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:16', '2025-04-22 05:20:16'),
(164, 15, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:18', '2025-04-22 05:20:18'),
(165, 16, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:19', '2025-04-22 05:20:19'),
(166, 17, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:21', '2025-04-22 05:20:21'),
(167, 18, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:22', '2025-04-22 05:20:22'),
(168, 19, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:24', '2025-04-22 05:20:24'),
(169, 20, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:26', '2025-04-22 05:20:26'),
(170, 21, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:27', '2025-04-22 05:20:27'),
(171, 22, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:29', '2025-04-22 05:20:29'),
(172, 23, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:31', '2025-04-22 05:20:31'),
(173, 24, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:33', '2025-04-22 05:20:33'),
(174, 25, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:34', '2025-04-22 05:20:34'),
(175, 26, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:36', '2025-04-22 05:20:36'),
(176, 27, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:37', '2025-04-22 05:20:37'),
(177, 28, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:39', '2025-04-22 05:20:39'),
(178, 29, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:40', '2025-04-22 05:20:40'),
(179, 30, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:42', '2025-04-22 05:20:42'),
(180, 32, NULL, '<p>Hi</p>', '<p>Chào các banh</p>', 'noti', 0, 0, '2025-04-22 05:20:44', '2025-04-22 05:20:44'),
(181, 32, NULL, '<p>Ngu như con lợn</p>', '<p>Bố tên Hưng Việt Nguyễn</p>', 'noti', 0, 0, '2025-04-22 05:24:38', '2025-04-22 05:24:38'),
(182, 32, NULL, '<p>Test Noti</p>', '<p>Chào các bạn mình tên HƯng Việt Nguyễn</p>', 'noti', 0, 0, '2025-04-22 05:27:35', '2025-04-22 05:27:35'),
(183, 32, NULL, '<p>Chào các bạn</p>', '<p>Đi khám thôi đến giờ rồi</p>', 'noti', 0, 0, '2025-04-22 05:31:46', '2025-04-22 05:31:46'),
(184, 32, NULL, '<p>Hi&nbsp;</p>', '<p>Chào cậu</p>', 'noti', 0, 0, '2025-04-22 06:07:49', '2025-04-22 06:07:49'),
(185, 32, NULL, '<p>Lỗi à</p>', '<p>Sao không nhận mail</p>', 'noti', 0, 0, '2025-04-22 06:10:34', '2025-04-22 06:10:34'),
(186, 32, NULL, '<p>Test không img</p>', '<p>Test</p>', 'noti', 0, 0, '2025-04-22 06:12:05', '2025-04-22 06:12:05'),
(187, 32, NULL, '<p>Check có img</p>', '<p>Test</p>', 'noti', 0, 0, '2025-04-22 06:13:15', '2025-04-22 06:13:15'),
(188, 32, NULL, '<p>Test lần 3</p>', '<p>Dạng chuyển hướng url</p>', 'noti', 0, 0, '2025-04-22 06:19:51', '2025-04-22 06:19:51'),
(189, 32, NULL, '<p>Test lần 4</p>', '<p>Dạng chuyển hướng URL</p>', 'noti', 1, 0, '2025-04-22 06:22:56', '2025-04-22 06:23:26'),
(190, 32, NULL, '<p>Test lần 5</p>', '<p>Dạng chuyển hướng ( Lần 4 nó bị dính URL cũ của tk kia )</p>', 'noti', 1, 0, '2025-04-22 06:25:47', '2025-04-22 06:26:03'),
(191, 32, NULL, '<p>Test lần 6</p>', '<p>Dạng chuyển hướng ( Lần 4, lần 5 nó bị dính URL cũ của tk kia )</p>', 'noti', 0, 0, '2025-04-22 06:27:48', '2025-04-22 06:27:48'),
(192, 32, NULL, '<p>Test lần 7&nbsp;</p>', '<p>Lần 6 thì không gửi được mail lần 4 lần 5 thì lỗi chuyển hướng</p>', 'noti', 1, 0, '2025-04-22 06:34:20', '2025-04-22 06:34:38'),
(193, 32, NULL, '<p>Test lần 7&nbsp;</p>', '<p>Lần 6 thì không gửi được mail lần 4 lần 5 thì lỗi chuyển hướng</p>', 'noti', 0, 0, '2025-04-22 06:34:26', '2025-04-22 06:34:26'),
(194, 32, NULL, '<p>Test lần 8</p>', '<p>Lần 7 thì nó lại bị lỗi url</p>', 'booking', 1, 0, '2025-04-22 06:36:08', '2025-04-22 06:36:25'),
(195, 32, NULL, '<p>Test lần 9</p>', '<p>Lần 8 lỗi như lần 7</p>', 'noti', 1, 0, '2025-04-22 06:38:15', '2025-04-22 06:38:26'),
(196, 32, NULL, '<p>Test lần 10</p>', '<p>Đã quá mệt mỏi với 9 lần trước đó</p>', 'noti', 1, 0, '2025-04-22 06:40:29', '2025-04-22 06:40:49'),
(197, 32, NULL, '<p>Lần 11</p>', '<p>Chán vl mấy lần r</p>', 'noti', 1, 0, '2025-04-22 06:43:29', '2025-04-22 06:43:43'),
(198, 32, NULL, '<p>Lần thứ 12</p>', '<p>Cố lên sắp được rồi</p>', 'noti', 0, 0, '2025-04-22 06:45:03', '2025-04-22 06:45:03'),
(199, 32, NULL, '<p>Lần thứ 13</p>', '<p>Mong là lần này ổn</p>', 'noti', 1, 0, '2025-04-22 06:48:14', '2025-04-22 06:48:32'),
(200, 4, 35, 'Lịch hẹn mới về Siêu Âm Tim', 'Bạn có một lịch hẹn mới về Siêu Âm Tim từ bệnh nhân Tuấn Ngọc vào lúc 12:40 ngày 23/04/2025.', 'booking', 0, 0, '2025-04-23 05:13:18', '2025-04-23 05:13:18'),
(201, 11, 35, 'Xác nhận lịch hẹn Siêu Âm Tim', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng về Siêu Âm Tim vào lúc 12:40 ngày 23/04/2025 đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-04-23 05:13:25', '2025-04-23 05:13:25'),
(202, 4, 35, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #35 về Siêu Âm Tim vào lúc 12:40 ngày 23/04/2025 đã được cập nhật trạng thái: Đã xác nhận', 'booking', 0, 0, '2025-04-23 05:16:13', '2025-04-23 05:16:13'),
(203, 11, 35, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #35 về Siêu Âm Tim vào lúc 12:40 ngày 23/04/2025 đã được cập nhật trạng thái: Đã xác nhận', 'booking', 0, 0, '2025-04-23 05:16:18', '2025-04-23 05:16:18'),
(204, 4, 35, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #35 về Siêu Âm Tim vào lúc 12:00 ngày 23/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-23 05:21:40', '2025-04-23 05:21:40'),
(205, 11, 35, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #35 về Siêu Âm Tim vào lúc 12:00 ngày 23/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-23 05:21:45', '2025-04-23 05:21:45'),
(206, 11, 35, 'Kết quả khám sắp có', 'Kết quả khám của bạn về Siêu Âm Tim vào lúc 12:00 ngày 23/04/2025 sắp có, chờ xíu nhé!', 'result', 0, 0, '2025-04-23 05:21:47', '2025-04-23 05:21:47'),
(207, 4, 36, 'Lịch hẹn mới về Siêu Âm Tim', 'Bạn có một lịch hẹn mới về Siêu Âm Tim từ bệnh nhân Đông vào lúc 08:00 ngày 24/04/2025.', 'booking', 0, 0, '2025-04-23 15:30:41', '2025-04-23 15:30:41'),
(208, 11, 36, 'Xác nhận lịch hẹn Siêu Âm Tim', 'Lịch hẹn của bạn với bác sĩ Bác sĩ Hoàng Dũng về Siêu Âm Tim vào lúc 08:00 ngày 24/04/2025 đã được tạo và đang chờ xử lý.', 'booking', 0, 0, '2025-04-23 15:30:48', '2025-04-23 15:30:48'),
(209, 4, 36, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #36 về Siêu Âm Tim vào lúc 08:00 ngày 24/04/2025 đã được cập nhật trạng thái: Đã xác nhận', 'booking', 0, 0, '2025-04-23 15:31:28', '2025-04-23 15:31:28'),
(210, 11, 36, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #36 về Siêu Âm Tim vào lúc 08:00 ngày 24/04/2025 đã được cập nhật trạng thái: Đã xác nhận', 'booking', 0, 0, '2025-04-23 15:31:37', '2025-04-23 15:31:37'),
(211, 4, 36, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #36 về Siêu Âm Tim vào lúc 08:00 ngày 23/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-23 15:32:48', '2025-04-23 15:32:48'),
(212, 11, 36, 'Cập nhật trạng thái lịch khám về Siêu Âm Tim', 'Lịch khám #36 về Siêu Âm Tim vào lúc 08:00 ngày 23/04/2025 đã được cập nhật trạng thái: Đã hoàn thành', 'booking', 0, 0, '2025-04-23 15:32:53', '2025-04-23 15:32:53'),
(213, 11, 36, 'Kết quả khám sắp có', 'Kết quả khám của bạn về Siêu Âm Tim vào lúc 08:00 ngày 23/04/2025 sắp có, chờ xíu nhé!', 'result', 0, 0, '2025-04-23 15:32:55', '2025-04-23 15:32:55'),
(214, 32, NULL, '<p>Hello</p>', '<p>Chào buổi tối</p>', 'notify', 1, 0, '2025-04-23 15:50:06', '2025-04-23 15:50:57');

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
(1, 2, 3, 'tam-quan-trong-cua-suc-khoe-tim-mach', 'Tầm quan trọng của sức khỏe tim mạch', '<h3><strong>Vì sao sức khỏe tim mạch ngày càng đáng báo động?</strong></h3><p>Theo Tổ chức Y tế Thế giới (WHO), các bệnh lý tim mạch hiện là <strong>nguyên nhân gây tử vong hàng đầu trên toàn cầu</strong>, chiếm hơn 30% tổng số ca tử vong mỗi năm. Tại Việt Nam, tỷ lệ người mắc cao huyết áp, mỡ máu, xơ vữa động mạch, nhồi máu cơ tim ngày càng tăng nhanh, đặc biệt ở người trẻ tuổi do lối sống ít vận động, ăn uống không lành mạnh, stress kéo dài và thiếu quan tâm đến sức khỏe.</p><p>Điều nguy hiểm là <strong>nhiều bệnh tim mạch phát triển âm thầm</strong>, không biểu hiện triệu chứng rõ ràng cho đến khi xảy ra biến cố nghiêm trọng như đột quỵ hoặc nhồi máu cơ tim.</p><h3><strong>Tại sao bạn cần chăm sóc tim mạch ngay hôm nay?</strong></h3><p><strong>Phòng bệnh hơn chữa bệnh:</strong> Việc chủ động theo dõi sức khỏe tim mạch giúp bạn phát hiện sớm các nguy cơ và điều chỉnh kịp thời, thay vì chờ đến khi bệnh xảy ra rồi mới điều trị, tốn kém thời gian, tiền bạc và ảnh hưởng đến cuộc sống.</p><p><strong>Nâng cao chất lượng cuộc sống:</strong> Một trái tim khỏe giúp bạn làm việc hiệu quả, vận động dễ dàng, tận hưởng cuộc sống trọn vẹn và sống thọ hơn.</p><p><strong>Bảo vệ cả gia đình:</strong> Khi bạn khỏe mạnh, bạn mới có thể chăm sóc người thân tốt hơn. Đồng thời, khi bạn có kiến thức về tim mạch, bạn sẽ giúp cả gia đình hình thành lối sống lành mạnh và phòng ngừa bệnh tật hiệu quả.</p><h3><strong>Giải pháp toàn diện cho sức khỏe tim mạch</strong></h3><p>Chúng tôi hiểu rằng việc duy trì một trái tim khỏe không hề dễ dàng trong cuộc sống hiện đại. Vì vậy, chúng tôi mang đến các giải pháp hỗ trợ bạn chăm sóc tim mạch một cách khoa học và dễ dàng hơn:</p><p>🏥 <strong>Gói khám chuyên sâu tim mạch</strong> định kỳ – giúp tầm soát toàn diện, phát hiện sớm bệnh lý tiềm ẩn.</p><p>📲 <strong>Ứng dụng theo dõi huyết áp, nhịp tim, chỉ số sức khỏe</strong> – quản lý dễ dàng ngay trên điện thoại.</p><p>💡 <strong>Tư vấn y khoa cùng bác sĩ chuyên môn</strong> – giải đáp mọi lo lắng và hướng dẫn chăm sóc đúng cách.</p><p>⚙️ <strong>Thiết bị đo huyết áp, điện tim tại nhà</strong> – tiện lợi, chính xác, hỗ trợ theo dõi liên tục.</p><h3><strong>Đừng đợi đến khi trái tim lên tiếng!</strong></h3><p>Sức khỏe tim mạch là tài sản vô giá. Hãy bắt đầu bảo vệ trái tim của bạn ngay từ hôm nay – từ những thói quen nhỏ, từ sự quan tâm đúng lúc. Và nếu bạn cần người đồng hành, chúng tôi sẵn sàng cùng bạn trên hành trình đó.</p><blockquote><p>💖 <strong>Đầu tư cho tim mạch – đầu tư cho tương lai khỏe mạnh của bạn và gia đình!</strong></p></blockquote>', 'uploads/BsguxxHB446zBGjycmCgHV2Q59o3HRK4Zkrs9nbg.jpg', 125, 'published', 0, '2025-03-23 08:16:59', NULL, '2025-03-23 08:16:59', '2025-05-03 07:30:29'),
(2, 5, 4, 'cac-phuong-phap-dieu-tri-chan-thuong-chinh-hinh', 'Các phương pháp điều trị chấn thương chỉnh hình', '<p>Chấn thương chỉnh hình có thể ảnh hưởng đến chất lượng cuộc sống nếu không được điều trị đúng cách. Hiện nay, có nhiều phương pháp tiên tiến giúp phục hồi chấn thương xương khớp nhanh chóng. Hãy cùng tìm hiểu về các phương pháp này trong bài viết sau.</p>', 'uploads/WAqhNCaOAYwfP53dOZvr9LpD89O9eOSnq9G7Km6K.jpg', 89, 'published', 0, '2025-03-19 17:00:00', NULL, '2025-03-23 08:16:59', '2025-05-03 07:31:56'),
(3, 1, 5, 'dinh-duong-cho-tre-em-va-me-bau', 'Dinh dưỡng cho trẻ em và mẹ bầu', '<p>Chế độ dinh dưỡng đóng vai trò quan trọng trong sự phát triển của trẻ nhỏ cũng như sức khỏe của mẹ bầu. Việc cung cấp đầy đủ các nhóm chất dinh dưỡng giúp tăng cường sức đề kháng và phát triển toàn diện. Hãy cùng khám phá chế độ ăn uống khoa học qua bài viết này.</p>', 'uploads/LVN801O10NkBOaYU327RHZN9sbqxcpa9c6jJmre5.png', 200, 'published', 0, '2025-03-23 08:16:59', NULL, '2025-03-23 08:16:59', '2025-05-03 07:36:47'),
(4, 3, 6, 'huong-dan-cham-soc-da-mua-he', 'Hướng dẫn chăm sóc da cho mùa hè', 'Vào mùa hè, làn da dễ bị tác động bởi ánh nắng mặt trời và các yếu tố môi trường. Để duy trì làn da khỏe mạnh, bạn cần biết cách bảo vệ da, sử dụng kem chống nắng đúng cách và cấp ẩm phù hợp. Hãy tham khảo ngay những bí quyết chăm sóc da hiệu quả nhất.', NULL, 50, 'draft', 0, NULL, NULL, '2025-03-23 08:16:59', '2025-03-23 08:16:59'),
(5, 4, 7, 'phat-hien-som-benh-ung-thu', 'Cách phát hiện sớm bệnh ung thư', '<p>Phát hiện sớm ung thư giúp tăng khả năng điều trị thành công và kéo dài sự sống cho bệnh nhân. Bài viết này sẽ hướng dẫn bạn cách nhận biết các dấu hiệu của bệnh ung thư và những xét nghiệm quan trọng cần thực hiện định kỳ.</p>', 'uploads/y4y4EXR8yeguk4xLZOXY1i2AeIh49UgietrcSym7.jpg', 170, 'published', 0, '2025-03-23 08:16:59', NULL, '2025-03-23 08:16:59', '2025-05-03 07:32:08'),
(6, 6, 8, 'cac-benh-phoi-pho-bien-va-cach-phong-tranh', 'Các bệnh phổi phổ biến và cách phòng tránh', '<p>Bệnh phổi là một trong những nguyên nhân gây tử vong hàng đầu trên thế giới. Những bệnh lý phổ biến như viêm phổi, hen suyễn, bệnh phổi tắc nghẽn mãn tính có thể phòng tránh bằng cách bảo vệ hệ hô hấp và duy trì lối sống lành mạnh.</p>', 'uploads/b3MHbTwqUeTZwbj2bRFb5shTKtC2ANTS90zagvNC.jpg', 95, 'draft', 0, '2024-10-01 03:00:00', NULL, '2025-03-23 08:16:59', '2025-05-03 07:28:14'),
(7, 8, 9, 'tam-quan-trong-cua-suc-khoe-phu-nu', 'Tầm quan trọng của sức khỏe phụ nữ', '<p>Sức khỏe phụ nữ không chỉ ảnh hưởng đến bản thân họ mà còn có tác động đến gia đình và xã hội. Chăm sóc sức khỏe sinh sản, dinh dưỡng hợp lý và kiểm tra định kỳ là những yếu tố quan trọng giúp phụ nữ có một cuộc sống khỏe mạnh.</p>', 'uploads/lWdxU6bBRVN2salAaKye93JATZt48R9HpKYyJwiz.jpg', 135, 'published', 0, '2025-03-23 08:16:59', NULL, '2025-03-23 08:16:59', '2025-05-03 07:28:04'),
(8, 10, 10, 'roi-loan-than-kinh-va-cach-dieu-tri', 'Rối loạn thần kinh và cách điều trị', '<p>Các rối loạn thần kinh như mất trí nhớ, Parkinson hay trầm cảm ảnh hưởng nghiêm trọng đến chất lượng cuộc sống. Việc phát hiện sớm và điều trị kịp thời giúp cải thiện đáng kể tình trạng bệnh. Hãy cùng tìm hiểu các phương pháp điều trị mới nhất trong bài viết này.</p>', 'uploads/TbkkfapS4WbvcmxSSIwS5y7EHhHCAOCavvJgfjwr.jpg', 210, 'published', 0, '2025-03-23 08:16:59', NULL, '2025-03-23 08:16:59', '2025-05-03 07:34:20'),
(9, 1, 4, 'cac-phuong-phap-dieu-tri-chan-thuong-chinh-hinh-1', 'Các phương pháp điều trị chấn thương chỉnh hình', '<p>aaaa</p>', NULL, 0, 'draft', 0, NULL, '2025-05-03 06:18:28', '2025-04-05 18:03:59', '2025-05-03 06:18:28'),
(10, 2, 3, 'tam-quan-trong-cua-suc-khoe-tim-mach-1', 'Tầm quan trọng của sức khỏe tim mạch', '<p>Bệnh tim mạch là một trong những nguyên nhân gây tử vong hàng đầu trên thế giới. Việc duy trì một lối sống lành mạnh, chế độ ăn uống hợp lý và thường xuyên kiểm tra sức khỏe tim mạch là vô cùng quan trọng. Bài viết này sẽ giúp bạn hiểu rõ hơn về cách bảo vệ trái tim của mình.</p>', 'uploads/ql09ZLs1oYbKEjL8NtwDjS6Yg2gQupaV4oRCcgxo.jpg', 120, 'published', 0, '2025-03-23 01:16:59', NULL, '2025-03-23 01:16:59', '2025-05-03 07:35:00'),
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
(1, 1, '08:00:00', '12:00:00', '2025-03-25', 10, 1, 0, '2025-03-23 07:46:39', '2025-03-27 11:38:21'),
(2, 1, '14:00:00', '18:00:00', '2025-03-25', 8, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(5, 3, '07:30:00', '11:30:00', '2025-03-25', 15, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(6, 3, '13:30:00', '17:00:00', '2025-03-25', 10, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(7, 4, '08:00:00', '12:00:00', '2025-03-25', 10, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(8, 4, '14:00:00', '18:00:00', '2025-03-25', 8, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(9, 5, '09:00:00', '12:00:00', '2025-03-25', 10, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(10, 5, '14:30:00', '17:30:00', '2025-03-25', 8, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(11, 6, '07:30:00', '11:30:00', '2025-03-25', 15, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(12, 6, '13:30:00', '17:00:00', '2025-03-25', 10, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(13, 7, '08:00:00', '12:00:00', '2025-03-25', 10, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(14, 7, '14:00:00', '18:00:00', '2025-03-25', 8, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(15, 8, '09:00:00', '12:30:00', '2025-03-25', 12, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(16, 8, '15:00:00', '18:00:00', '2025-03-25', 10, 1, 0, '2025-03-23 07:46:39', '2025-03-23 07:46:39'),
(48, 1, '08:00:00', '09:00:00', '2025-03-27', 6, 1, 0, '2025-03-26 18:43:07', '2025-03-26 18:43:07'),
(49, 1, '09:00:00', '10:00:00', '2025-03-27', 4, 1, 0, '2025-03-26 18:43:07', '2025-03-26 18:43:07'),
(50, 1, '10:00:00', '11:00:00', '2025-03-27', 5, 1, 0, '2025-03-26 18:43:07', '2025-03-26 18:43:07'),
(55, 2, '08:00:00', '16:00:00', '2025-03-01', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(56, 2, '08:00:00', '16:00:00', '2025-03-02', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(57, 2, '08:00:00', '16:00:00', '2025-03-03', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(58, 2, '08:00:00', '16:00:00', '2025-03-04', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(59, 2, '08:00:00', '16:00:00', '2025-03-05', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(60, 2, '08:00:00', '16:00:00', '2025-03-06', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(61, 2, '08:00:00', '16:00:00', '2025-03-07', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(62, 2, '08:00:00', '16:00:00', '2025-03-08', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(63, 2, '08:00:00', '16:00:00', '2025-03-09', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(64, 2, '08:00:00', '16:00:00', '2025-03-10', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(65, 2, '08:00:00', '16:00:00', '2025-03-11', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(66, 2, '08:00:00', '16:00:00', '2025-03-12', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(67, 2, '08:00:00', '16:00:00', '2025-03-13', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(68, 2, '08:00:00', '16:00:00', '2025-03-14', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(69, 2, '08:00:00', '16:00:00', '2025-03-15', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(70, 2, '08:00:00', '16:00:00', '2025-03-16', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(71, 2, '08:00:00', '16:00:00', '2025-03-17', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(72, 2, '08:00:00', '16:00:00', '2025-03-18', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(73, 2, '08:00:00', '16:00:00', '2025-03-19', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(74, 2, '08:00:00', '16:00:00', '2025-03-20', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(75, 2, '08:00:00', '16:00:00', '2025-03-21', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(76, 2, '08:00:00', '16:00:00', '2025-03-22', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(77, 2, '08:00:00', '16:00:00', '2025-03-23', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(78, 2, '08:00:00', '16:00:00', '2025-03-24', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(79, 2, '08:00:00', '16:00:00', '2025-03-25', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(80, 2, '08:00:00', '16:00:00', '2025-03-26', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(81, 2, '08:00:00', '16:00:00', '2025-03-27', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(82, 2, '08:00:00', '16:00:00', '2025-03-28', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(83, 2, '08:00:00', '16:00:00', '2025-03-29', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(84, 2, '08:00:00', '16:00:00', '2025-03-30', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(85, 2, '08:00:00', '16:00:00', '2025-03-31', 10, 1, 0, '2025-03-27 06:22:48', '2025-03-27 06:22:48'),
(86, 2, '08:00:00', '17:00:00', '2025-04-01', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(87, 2, '08:00:00', '17:00:00', '2025-04-02', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(88, 2, '08:00:00', '17:00:00', '2025-04-03', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(89, 2, '08:00:00', '17:00:00', '2025-04-04', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(90, 2, '08:00:00', '17:00:00', '2025-04-05', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(91, 2, '08:00:00', '17:00:00', '2025-04-06', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(92, 2, '08:00:00', '17:00:00', '2025-04-07', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(93, 2, '08:00:00', '17:00:00', '2025-04-08', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(94, 2, '08:00:00', '17:00:00', '2025-04-09', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(95, 2, '08:00:00', '17:00:00', '2025-04-10', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(96, 2, '08:00:00', '17:00:00', '2025-04-11', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(97, 2, '08:00:00', '17:00:00', '2025-04-12', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(98, 2, '08:00:00', '17:00:00', '2025-04-13', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(99, 2, '08:00:00', '17:00:00', '2025-04-14', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(100, 2, '08:00:00', '17:00:00', '2025-04-15', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(101, 2, '08:00:00', '17:00:00', '2025-04-16', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(102, 2, '08:00:00', '17:00:00', '2025-04-17', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(103, 2, '08:00:00', '17:00:00', '2025-04-18', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(104, 2, '08:00:00', '17:00:00', '2025-04-19', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(105, 2, '08:00:00', '17:00:00', '2025-04-20', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(106, 2, '08:00:00', '17:00:00', '2025-04-21', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(107, 2, '08:00:00', '17:00:00', '2025-04-22', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(108, 2, '08:00:00', '23:00:00', '2025-04-23', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(109, 2, '08:00:00', '17:00:00', '2025-04-24', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(110, 2, '08:00:00', '17:00:00', '2025-04-25', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(111, 2, '08:00:00', '17:00:00', '2025-04-26', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(112, 2, '08:00:00', '17:00:00', '2025-04-27', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(113, 2, '08:00:00', '17:00:00', '2025-04-28', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(114, 2, '08:00:00', '17:00:00', '2025-04-29', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(115, 2, '08:00:00', '11:30:00', '2025-04-30', 10, 1, 0, '2025-03-27 23:59:57', '2025-03-27 23:59:57'),
(116, 1, '08:00:00', '17:00:00', '2025-04-01', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(117, 1, '08:00:00', '17:00:00', '2025-04-02', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(118, 1, '08:00:00', '17:00:00', '2025-04-03', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(119, 1, '08:00:00', '17:00:00', '2025-04-04', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(120, 1, '08:00:00', '17:00:00', '2025-04-05', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(121, 1, '08:00:00', '17:00:00', '2025-04-06', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(122, 1, '08:00:00', '17:00:00', '2025-04-07', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(123, 1, '08:00:00', '17:00:00', '2025-04-08', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(124, 1, '08:00:00', '17:00:00', '2025-04-09', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(125, 1, '08:00:00', '17:00:00', '2025-04-10', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(126, 1, '08:00:00', '17:00:00', '2025-04-11', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(127, 1, '08:00:00', '17:00:00', '2025-04-12', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(128, 1, '08:00:00', '17:00:00', '2025-04-13', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(129, 1, '08:00:00', '17:00:00', '2025-04-14', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(130, 1, '08:00:00', '17:00:00', '2025-04-15', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(131, 1, '08:00:00', '17:00:00', '2025-04-16', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(132, 1, '08:00:00', '17:00:00', '2025-04-17', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(133, 1, '08:00:00', '17:00:00', '2025-04-18', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(134, 1, '08:00:00', '17:00:00', '2025-04-19', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(135, 1, '08:00:00', '17:00:00', '2025-04-20', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(136, 1, '08:00:00', '17:00:00', '2025-04-21', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(137, 1, '08:00:00', '17:00:00', '2025-04-22', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(138, 1, '08:00:00', '17:00:00', '2025-04-23', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(139, 1, '08:00:00', '17:00:00', '2025-04-24', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(140, 1, '08:00:00', '17:00:00', '2025-04-25', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(141, 1, '08:00:00', '17:00:00', '2025-04-26', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(142, 1, '08:00:00', '17:00:00', '2025-04-27', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(143, 1, '08:00:00', '17:00:00', '2025-04-28', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(144, 1, '08:00:00', '17:00:00', '2025-04-29', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(145, 1, '08:00:00', '17:00:00', '2025-04-30', 10, 1, 0, '2025-03-28 00:01:47', '2025-03-28 00:01:47'),
(146, 3, '08:00:00', '17:00:00', '2025-04-01', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(147, 3, '08:00:00', '17:00:00', '2025-04-02', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(148, 3, '08:00:00', '17:00:00', '2025-04-03', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(149, 3, '08:00:00', '17:00:00', '2025-04-04', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(150, 3, '08:00:00', '17:00:00', '2025-04-05', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(151, 3, '08:00:00', '17:00:00', '2025-04-06', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(152, 3, '08:00:00', '17:00:00', '2025-04-07', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(153, 3, '08:00:00', '17:00:00', '2025-04-08', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(154, 3, '08:00:00', '17:00:00', '2025-04-09', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(155, 3, '08:00:00', '17:00:00', '2025-04-10', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(156, 3, '08:00:00', '17:00:00', '2025-04-11', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(157, 3, '08:00:00', '17:00:00', '2025-04-12', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(158, 3, '08:00:00', '17:00:00', '2025-04-13', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(159, 3, '08:00:00', '17:00:00', '2025-04-14', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(160, 3, '08:00:00', '17:00:00', '2025-04-15', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(161, 3, '08:00:00', '17:00:00', '2025-04-16', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(162, 3, '08:00:00', '17:00:00', '2025-04-17', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(163, 3, '08:00:00', '17:00:00', '2025-04-18', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(164, 3, '08:00:00', '17:00:00', '2025-04-19', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(165, 3, '08:00:00', '17:00:00', '2025-04-20', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(166, 3, '08:00:00', '17:00:00', '2025-04-21', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(167, 3, '08:00:00', '17:00:00', '2025-04-22', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(168, 3, '08:00:00', '17:00:00', '2025-04-23', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(169, 3, '08:00:00', '17:00:00', '2025-04-24', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(170, 3, '08:00:00', '17:00:00', '2025-04-25', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(171, 3, '08:00:00', '17:00:00', '2025-04-26', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(172, 3, '08:00:00', '17:00:00', '2025-04-27', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(173, 3, '08:00:00', '17:00:00', '2025-04-28', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(174, 3, '08:00:00', '17:00:00', '2025-04-29', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(175, 3, '08:00:00', '17:00:00', '2025-04-30', 10, 1, 0, '2025-03-28 00:03:05', '2025-03-28 00:03:05'),
(176, 4, '08:00:00', '17:00:00', '2025-04-01', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(177, 4, '08:00:00', '17:00:00', '2025-04-02', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(178, 4, '08:00:00', '17:00:00', '2025-04-03', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(179, 4, '08:00:00', '17:00:00', '2025-04-04', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(180, 4, '08:00:00', '17:00:00', '2025-04-05', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(181, 4, '08:00:00', '17:00:00', '2025-04-06', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(182, 4, '08:00:00', '17:00:00', '2025-04-07', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(183, 4, '08:00:00', '17:00:00', '2025-04-08', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(184, 4, '08:00:00', '17:00:00', '2025-04-09', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(185, 4, '08:00:00', '17:00:00', '2025-04-10', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(186, 4, '08:00:00', '17:00:00', '2025-04-11', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(187, 4, '08:00:00', '17:00:00', '2025-04-12', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(188, 4, '08:00:00', '17:00:00', '2025-04-13', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(189, 4, '08:00:00', '17:00:00', '2025-04-14', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(190, 4, '08:00:00', '17:00:00', '2025-04-15', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(191, 4, '08:00:00', '17:00:00', '2025-04-16', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(192, 4, '08:00:00', '17:00:00', '2025-04-17', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(193, 4, '08:00:00', '17:00:00', '2025-04-18', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(194, 4, '08:00:00', '17:00:00', '2025-04-19', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(195, 4, '08:00:00', '17:00:00', '2025-04-20', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(196, 4, '08:00:00', '17:00:00', '2025-04-21', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(197, 4, '08:00:00', '17:00:00', '2025-04-22', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(198, 4, '08:00:00', '17:00:00', '2025-04-23', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(199, 4, '08:00:00', '17:00:00', '2025-04-24', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(200, 4, '08:00:00', '17:00:00', '2025-04-25', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(201, 4, '08:00:00', '17:00:00', '2025-04-26', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(202, 4, '08:00:00', '17:00:00', '2025-04-27', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(203, 4, '08:00:00', '17:00:00', '2025-04-28', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(204, 4, '08:00:00', '17:00:00', '2025-04-29', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(205, 4, '08:00:00', '17:00:00', '2025-04-30', 10, 1, 0, '2025-03-28 00:03:48', '2025-03-28 00:03:48'),
(206, 5, '08:00:00', '17:00:00', '2025-04-01', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(207, 5, '08:00:00', '17:00:00', '2025-04-02', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(208, 5, '08:00:00', '17:00:00', '2025-04-03', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(209, 5, '08:00:00', '17:00:00', '2025-04-04', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(210, 5, '08:00:00', '17:00:00', '2025-04-05', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(211, 5, '08:00:00', '17:00:00', '2025-04-06', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(212, 5, '08:00:00', '17:00:00', '2025-04-07', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(213, 5, '08:00:00', '17:00:00', '2025-04-08', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(214, 5, '08:00:00', '17:00:00', '2025-04-09', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(215, 5, '08:00:00', '17:00:00', '2025-04-10', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(216, 5, '08:00:00', '17:00:00', '2025-04-11', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(217, 5, '08:00:00', '17:00:00', '2025-04-12', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(218, 5, '08:00:00', '17:00:00', '2025-04-13', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(219, 5, '08:00:00', '17:00:00', '2025-04-14', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(220, 5, '08:00:00', '17:00:00', '2025-04-15', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(221, 5, '08:00:00', '17:00:00', '2025-04-16', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(222, 5, '08:00:00', '17:00:00', '2025-04-17', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(223, 5, '08:00:00', '17:00:00', '2025-04-18', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(224, 5, '08:00:00', '17:00:00', '2025-04-19', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(225, 5, '08:00:00', '17:00:00', '2025-04-20', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(226, 5, '08:00:00', '17:00:00', '2025-04-21', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(227, 5, '08:00:00', '17:00:00', '2025-04-22', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(228, 5, '08:00:00', '17:00:00', '2025-04-23', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(229, 5, '08:00:00', '17:00:00', '2025-04-24', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(230, 5, '08:00:00', '17:00:00', '2025-04-25', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(231, 5, '08:00:00', '17:00:00', '2025-04-26', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(232, 5, '08:00:00', '17:00:00', '2025-04-27', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(233, 5, '08:00:00', '17:00:00', '2025-04-28', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(234, 5, '08:00:00', '17:00:00', '2025-04-29', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(235, 5, '08:00:00', '17:00:00', '2025-04-30', 10, 1, 0, '2025-03-28 00:04:40', '2025-03-28 00:04:40'),
(236, 7, '08:00:00', '17:00:00', '2025-04-01', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(237, 7, '08:00:00', '17:00:00', '2025-04-02', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(238, 7, '08:00:00', '17:00:00', '2025-04-03', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(239, 7, '08:00:00', '17:00:00', '2025-04-04', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(240, 7, '08:00:00', '17:00:00', '2025-04-05', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(241, 7, '08:00:00', '17:00:00', '2025-04-06', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(242, 7, '08:00:00', '17:00:00', '2025-04-07', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(243, 7, '08:00:00', '17:00:00', '2025-04-08', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(244, 7, '08:00:00', '17:00:00', '2025-04-09', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(245, 7, '08:00:00', '17:00:00', '2025-04-10', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(246, 7, '08:00:00', '17:00:00', '2025-04-11', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(247, 7, '08:00:00', '17:00:00', '2025-04-12', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(248, 7, '08:00:00', '17:00:00', '2025-04-13', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(249, 7, '08:00:00', '17:00:00', '2025-04-14', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(250, 7, '08:00:00', '17:00:00', '2025-04-15', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(251, 7, '08:00:00', '17:00:00', '2025-04-16', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(252, 7, '08:00:00', '17:00:00', '2025-04-17', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(253, 7, '08:00:00', '17:00:00', '2025-04-18', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(254, 7, '08:00:00', '17:00:00', '2025-04-19', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(255, 7, '08:00:00', '17:00:00', '2025-04-20', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(256, 7, '08:00:00', '17:00:00', '2025-04-21', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(257, 7, '08:00:00', '17:00:00', '2025-04-22', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(258, 7, '08:00:00', '17:00:00', '2025-04-23', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(259, 7, '08:00:00', '17:00:00', '2025-04-24', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(260, 7, '08:00:00', '17:00:00', '2025-04-25', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(261, 7, '08:00:00', '17:00:00', '2025-04-26', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(262, 7, '08:00:00', '17:00:00', '2025-04-27', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(263, 7, '08:00:00', '17:00:00', '2025-04-28', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(264, 7, '08:00:00', '17:00:00', '2025-04-29', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(265, 2, '08:00:00', '17:00:00', '2025-04-30', 10, 1, 0, '2025-03-28 00:13:26', '2025-03-28 00:13:26'),
(266, 8, '08:00:00', '17:00:00', '2025-04-01', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(267, 8, '08:00:00', '17:00:00', '2025-04-02', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(268, 8, '08:00:00', '17:00:00', '2025-04-03', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(269, 8, '08:00:00', '17:00:00', '2025-04-04', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(270, 8, '08:00:00', '17:00:00', '2025-04-05', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(271, 8, '08:00:00', '17:00:00', '2025-04-06', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(272, 8, '08:00:00', '17:00:00', '2025-04-07', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(273, 8, '08:00:00', '17:00:00', '2025-04-08', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(274, 8, '08:00:00', '17:00:00', '2025-04-09', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(275, 8, '08:00:00', '17:00:00', '2025-04-10', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(276, 8, '08:00:00', '17:00:00', '2025-04-11', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(277, 8, '08:00:00', '17:00:00', '2025-04-12', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(278, 8, '08:00:00', '17:00:00', '2025-04-13', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(279, 8, '08:00:00', '17:00:00', '2025-04-14', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(280, 8, '08:00:00', '17:00:00', '2025-04-15', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(281, 8, '08:00:00', '17:00:00', '2025-04-16', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(282, 8, '08:00:00', '17:00:00', '2025-04-17', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(283, 8, '08:00:00', '17:00:00', '2025-04-18', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(284, 8, '08:00:00', '17:00:00', '2025-04-19', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(285, 8, '08:00:00', '17:00:00', '2025-04-20', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(286, 8, '08:00:00', '17:00:00', '2025-04-21', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(287, 8, '08:00:00', '17:00:00', '2025-04-22', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(288, 8, '08:00:00', '17:00:00', '2025-04-23', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(289, 8, '08:00:00', '17:00:00', '2025-04-24', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(290, 8, '08:00:00', '17:00:00', '2025-04-25', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(291, 8, '08:00:00', '17:00:00', '2025-04-26', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(292, 8, '08:00:00', '17:00:00', '2025-04-27', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(293, 8, '08:00:00', '17:00:00', '2025-04-28', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(294, 8, '08:00:00', '17:00:00', '2025-04-29', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(295, 8, '08:00:00', '17:00:00', '2025-04-30', 10, 1, 0, '2025-03-28 00:14:41', '2025-03-28 00:14:41'),
(296, 6, '08:00:00', '17:00:00', '2025-04-01', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(297, 6, '08:00:00', '17:00:00', '2025-04-02', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(298, 6, '08:00:00', '17:00:00', '2025-04-03', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(299, 6, '08:00:00', '17:00:00', '2025-04-04', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(300, 6, '08:00:00', '17:00:00', '2025-04-05', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(301, 6, '08:00:00', '17:00:00', '2025-04-06', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(302, 6, '08:00:00', '17:00:00', '2025-04-07', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(303, 6, '08:00:00', '17:00:00', '2025-04-08', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(304, 6, '08:00:00', '17:00:00', '2025-04-09', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(305, 6, '08:00:00', '17:00:00', '2025-04-10', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(306, 6, '08:00:00', '17:00:00', '2025-04-11', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(307, 6, '08:00:00', '17:00:00', '2025-04-12', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(308, 6, '08:00:00', '17:00:00', '2025-04-13', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(309, 6, '08:00:00', '17:00:00', '2025-04-14', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(310, 6, '08:00:00', '17:00:00', '2025-04-15', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(311, 6, '08:00:00', '17:00:00', '2025-04-16', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(312, 6, '08:00:00', '17:00:00', '2025-04-17', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(313, 6, '08:00:00', '17:00:00', '2025-04-18', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(314, 6, '08:00:00', '17:00:00', '2025-04-19', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(315, 6, '08:00:00', '17:00:00', '2025-04-20', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(316, 6, '08:00:00', '17:00:00', '2025-04-21', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(317, 6, '08:00:00', '17:00:00', '2025-04-22', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(318, 6, '08:00:00', '17:00:00', '2025-04-23', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(319, 6, '08:00:00', '17:00:00', '2025-04-24', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(320, 6, '08:00:00', '17:00:00', '2025-04-25', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(321, 6, '08:00:00', '17:00:00', '2025-04-26', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(322, 6, '08:00:00', '17:00:00', '2025-04-27', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(323, 6, '08:00:00', '17:00:00', '2025-04-28', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(324, 6, '08:00:00', '17:00:00', '2025-04-29', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(325, 6, '08:00:00', '17:00:00', '2025-04-30', 10, 1, 0, '2025-03-28 00:16:02', '2025-03-28 00:16:02'),
(326, 1, '08:00:00', '17:00:00', '2025-05-01', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(327, 1, '08:00:00', '17:00:00', '2025-05-02', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(328, 1, '08:00:00', '17:00:00', '2025-05-03', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(329, 1, '08:00:00', '17:00:00', '2025-05-04', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(330, 1, '08:00:00', '17:00:00', '2025-05-05', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(331, 1, '08:00:00', '17:00:00', '2025-05-06', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(332, 1, '08:00:00', '17:00:00', '2025-05-07', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(333, 1, '08:00:00', '17:00:00', '2025-05-08', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(334, 1, '08:00:00', '17:00:00', '2025-05-09', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(335, 1, '08:00:00', '17:00:00', '2025-05-10', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(336, 1, '08:00:00', '17:00:00', '2025-05-11', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(337, 1, '08:00:00', '17:00:00', '2025-05-12', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(338, 1, '08:00:00', '17:00:00', '2025-05-13', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(339, 1, '08:00:00', '17:00:00', '2025-05-14', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(340, 1, '08:00:00', '17:00:00', '2025-05-15', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(341, 1, '08:00:00', '17:00:00', '2025-05-16', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(342, 1, '08:00:00', '17:00:00', '2025-05-17', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(343, 1, '08:00:00', '17:00:00', '2025-05-18', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(344, 1, '08:00:00', '17:00:00', '2025-05-19', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(345, 1, '08:00:00', '17:00:00', '2025-05-20', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(346, 1, '08:00:00', '17:00:00', '2025-05-21', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(347, 1, '08:00:00', '17:00:00', '2025-05-22', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(348, 1, '08:00:00', '17:00:00', '2025-05-23', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(349, 1, '08:00:00', '17:00:00', '2025-05-24', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(350, 1, '08:00:00', '17:00:00', '2025-05-25', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(351, 1, '08:00:00', '17:00:00', '2025-05-26', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(352, 1, '08:00:00', '17:00:00', '2025-05-27', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(353, 1, '08:00:00', '17:00:00', '2025-05-28', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(354, 1, '08:00:00', '17:00:00', '2025-05-29', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(355, 1, '08:00:00', '17:00:00', '2025-05-30', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(356, 1, '08:00:00', '17:00:00', '2025-05-31', 10, 1, 0, '2025-05-03 02:16:16', '2025-05-03 02:16:16'),
(357, 2, '08:00:00', '17:00:00', '2025-05-01', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(358, 2, '08:00:00', '17:00:00', '2025-05-02', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(359, 2, '08:00:00', '17:00:00', '2025-05-03', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(360, 2, '08:00:00', '17:00:00', '2025-05-04', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(361, 2, '08:00:00', '17:00:00', '2025-05-05', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(362, 2, '08:00:00', '17:00:00', '2025-05-06', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(363, 2, '08:00:00', '17:00:00', '2025-05-07', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(364, 2, '08:00:00', '17:00:00', '2025-05-08', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(365, 2, '08:00:00', '17:00:00', '2025-05-09', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(366, 2, '08:00:00', '17:00:00', '2025-05-10', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(367, 2, '08:00:00', '17:00:00', '2025-05-11', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(368, 2, '08:00:00', '17:00:00', '2025-05-12', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(369, 2, '08:00:00', '17:00:00', '2025-05-13', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(370, 2, '08:00:00', '17:00:00', '2025-05-14', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(371, 2, '08:00:00', '17:00:00', '2025-05-15', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(372, 2, '08:00:00', '17:00:00', '2025-05-16', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(373, 2, '08:00:00', '17:00:00', '2025-05-17', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(374, 2, '08:00:00', '17:00:00', '2025-05-18', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(375, 2, '08:00:00', '17:00:00', '2025-05-19', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(376, 2, '08:00:00', '17:00:00', '2025-05-20', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(377, 2, '08:00:00', '17:00:00', '2025-05-21', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(378, 2, '08:00:00', '17:00:00', '2025-05-22', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(379, 2, '08:00:00', '17:00:00', '2025-05-23', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(380, 2, '08:00:00', '17:00:00', '2025-05-24', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(381, 2, '08:00:00', '17:00:00', '2025-05-25', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(382, 2, '08:00:00', '17:00:00', '2025-05-26', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(383, 2, '08:00:00', '17:00:00', '2025-05-27', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(384, 2, '08:00:00', '17:00:00', '2025-05-28', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(385, 2, '08:00:00', '17:00:00', '2025-05-29', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(386, 2, '08:00:00', '17:00:00', '2025-05-30', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(387, 2, '08:00:00', '17:00:00', '2025-05-31', 10, 1, 0, '2025-05-03 02:25:20', '2025-05-03 02:25:20'),
(388, 3, '08:00:00', '17:00:00', '2025-05-01', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(389, 3, '08:00:00', '17:00:00', '2025-05-02', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(390, 3, '08:00:00', '17:00:00', '2025-05-03', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(391, 3, '08:00:00', '17:00:00', '2025-05-04', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(392, 3, '08:00:00', '17:00:00', '2025-05-05', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(393, 3, '08:00:00', '17:00:00', '2025-05-06', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(394, 3, '08:00:00', '17:00:00', '2025-05-07', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(395, 3, '08:00:00', '17:00:00', '2025-05-08', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(396, 3, '08:00:00', '17:00:00', '2025-05-09', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(397, 3, '08:00:00', '17:00:00', '2025-05-10', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(398, 3, '08:00:00', '17:00:00', '2025-05-11', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(399, 3, '08:00:00', '17:00:00', '2025-05-12', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(400, 3, '08:00:00', '17:00:00', '2025-05-13', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(401, 3, '08:00:00', '17:00:00', '2025-05-14', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(402, 3, '08:00:00', '17:00:00', '2025-05-15', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(403, 3, '08:00:00', '17:00:00', '2025-05-16', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(404, 3, '08:00:00', '17:00:00', '2025-05-17', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(405, 3, '08:00:00', '17:00:00', '2025-05-18', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(406, 3, '08:00:00', '17:00:00', '2025-05-19', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(407, 3, '08:00:00', '17:00:00', '2025-05-20', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(408, 3, '08:00:00', '17:00:00', '2025-05-21', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(409, 3, '08:00:00', '17:00:00', '2025-05-22', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(410, 3, '08:00:00', '17:00:00', '2025-05-23', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(411, 3, '08:00:00', '17:00:00', '2025-05-24', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(412, 3, '08:00:00', '17:00:00', '2025-05-25', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(413, 3, '08:00:00', '17:00:00', '2025-05-26', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(414, 3, '08:00:00', '17:00:00', '2025-05-27', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(415, 3, '08:00:00', '17:00:00', '2025-05-28', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(416, 3, '08:00:00', '17:00:00', '2025-05-29', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(417, 3, '08:00:00', '17:00:00', '2025-05-30', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(418, 3, '08:00:00', '17:00:00', '2025-05-31', 10, 1, 0, '2025-05-03 02:27:45', '2025-05-03 02:27:45'),
(419, 4, '08:00:00', '17:00:00', '2025-05-01', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(420, 4, '08:00:00', '17:00:00', '2025-05-02', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(421, 4, '08:00:00', '17:00:00', '2025-05-03', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(422, 4, '08:00:00', '17:00:00', '2025-05-04', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(423, 4, '08:00:00', '17:00:00', '2025-05-05', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(424, 4, '08:00:00', '17:00:00', '2025-05-06', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(425, 4, '08:00:00', '17:00:00', '2025-05-07', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(426, 4, '08:00:00', '17:00:00', '2025-05-08', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(427, 4, '08:00:00', '17:00:00', '2025-05-09', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(428, 4, '08:00:00', '17:00:00', '2025-05-10', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(429, 4, '08:00:00', '17:00:00', '2025-05-11', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(430, 4, '08:00:00', '17:00:00', '2025-05-12', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(431, 4, '08:00:00', '17:00:00', '2025-05-13', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(432, 4, '08:00:00', '17:00:00', '2025-05-14', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(433, 4, '08:00:00', '17:00:00', '2025-05-15', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(434, 4, '08:00:00', '17:00:00', '2025-05-16', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(435, 4, '08:00:00', '17:00:00', '2025-05-17', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(436, 4, '08:00:00', '17:00:00', '2025-05-18', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(437, 4, '08:00:00', '17:00:00', '2025-05-19', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(438, 4, '08:00:00', '17:00:00', '2025-05-20', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(439, 4, '08:00:00', '17:00:00', '2025-05-21', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(440, 4, '08:00:00', '17:00:00', '2025-05-22', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(441, 4, '08:00:00', '17:00:00', '2025-05-23', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(442, 4, '08:00:00', '17:00:00', '2025-05-24', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(443, 4, '08:00:00', '17:00:00', '2025-05-25', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(444, 4, '08:00:00', '17:00:00', '2025-05-26', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(445, 4, '08:00:00', '17:00:00', '2025-05-27', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(446, 4, '08:00:00', '17:00:00', '2025-05-28', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(447, 4, '08:00:00', '17:00:00', '2025-05-29', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(448, 4, '08:00:00', '17:00:00', '2025-05-30', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(449, 4, '08:00:00', '17:00:00', '2025-05-31', 10, 1, 0, '2025-05-03 02:28:37', '2025-05-03 02:28:37'),
(450, 5, '08:00:00', '17:00:00', '2025-05-01', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(451, 5, '08:00:00', '17:00:00', '2025-05-02', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(452, 5, '08:00:00', '17:00:00', '2025-05-03', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(453, 5, '08:00:00', '17:00:00', '2025-05-04', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(454, 5, '08:00:00', '17:00:00', '2025-05-05', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(455, 5, '08:00:00', '17:00:00', '2025-05-06', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(456, 5, '08:00:00', '17:00:00', '2025-05-07', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(457, 5, '08:00:00', '17:00:00', '2025-05-08', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(458, 5, '08:00:00', '17:00:00', '2025-05-09', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(459, 5, '08:00:00', '17:00:00', '2025-05-10', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(460, 5, '08:00:00', '17:00:00', '2025-05-11', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(461, 5, '08:00:00', '17:00:00', '2025-05-12', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(462, 5, '08:00:00', '17:00:00', '2025-05-13', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(463, 5, '08:00:00', '17:00:00', '2025-05-14', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(464, 5, '08:00:00', '17:00:00', '2025-05-15', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(465, 5, '08:00:00', '17:00:00', '2025-05-16', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(466, 5, '08:00:00', '17:00:00', '2025-05-17', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(467, 5, '08:00:00', '17:00:00', '2025-05-18', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(468, 5, '08:00:00', '17:00:00', '2025-05-19', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(469, 5, '08:00:00', '17:00:00', '2025-05-20', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(470, 5, '08:00:00', '17:00:00', '2025-05-21', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(471, 5, '08:00:00', '17:00:00', '2025-05-22', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(472, 5, '08:00:00', '17:00:00', '2025-05-23', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(473, 5, '08:00:00', '17:00:00', '2025-05-24', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(474, 5, '08:00:00', '17:00:00', '2025-05-25', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(475, 5, '08:00:00', '17:00:00', '2025-05-26', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(476, 5, '08:00:00', '17:00:00', '2025-05-27', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(477, 5, '08:00:00', '17:00:00', '2025-05-28', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(478, 5, '08:00:00', '17:00:00', '2025-05-29', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(479, 5, '08:00:00', '17:00:00', '2025-05-30', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(480, 5, '08:00:00', '17:00:00', '2025-05-31', 10, 1, 0, '2025-05-03 02:29:17', '2025-05-03 02:29:17'),
(481, 6, '08:00:00', '17:00:00', '2025-05-01', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(482, 6, '08:00:00', '17:00:00', '2025-05-02', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(483, 6, '08:00:00', '17:00:00', '2025-05-03', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(484, 6, '08:00:00', '17:00:00', '2025-05-04', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(485, 6, '08:00:00', '17:00:00', '2025-05-05', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(486, 6, '08:00:00', '17:00:00', '2025-05-06', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(487, 6, '08:00:00', '17:00:00', '2025-05-07', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(488, 6, '08:00:00', '17:00:00', '2025-05-08', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(489, 6, '08:00:00', '17:00:00', '2025-05-09', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(490, 6, '08:00:00', '17:00:00', '2025-05-10', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(491, 6, '08:00:00', '17:00:00', '2025-05-11', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(492, 6, '08:00:00', '17:00:00', '2025-05-12', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(493, 6, '08:00:00', '17:00:00', '2025-05-13', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(494, 6, '08:00:00', '17:00:00', '2025-05-14', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(495, 6, '08:00:00', '17:00:00', '2025-05-15', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(496, 6, '08:00:00', '17:00:00', '2025-05-16', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(497, 6, '08:00:00', '17:00:00', '2025-05-17', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(498, 6, '08:00:00', '17:00:00', '2025-05-18', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(499, 6, '08:00:00', '17:00:00', '2025-05-19', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(500, 6, '08:00:00', '17:00:00', '2025-05-20', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(501, 6, '08:00:00', '17:00:00', '2025-05-21', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(502, 6, '08:00:00', '17:00:00', '2025-05-22', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(503, 6, '08:00:00', '17:00:00', '2025-05-23', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(504, 6, '08:00:00', '17:00:00', '2025-05-24', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(505, 6, '08:00:00', '17:00:00', '2025-05-25', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(506, 6, '08:00:00', '17:00:00', '2025-05-26', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(507, 6, '08:00:00', '17:00:00', '2025-05-27', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(508, 6, '08:00:00', '17:00:00', '2025-05-28', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(509, 6, '08:00:00', '17:00:00', '2025-05-29', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(510, 6, '08:00:00', '17:00:00', '2025-05-30', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(511, 6, '08:00:00', '17:00:00', '2025-05-31', 10, 1, 0, '2025-05-03 02:29:52', '2025-05-03 02:29:52'),
(512, 7, '08:00:00', '17:00:00', '2025-05-01', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(513, 7, '08:00:00', '17:00:00', '2025-05-02', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(514, 7, '08:00:00', '17:00:00', '2025-05-03', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(515, 7, '08:00:00', '17:00:00', '2025-05-04', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(516, 7, '08:00:00', '17:00:00', '2025-05-05', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(517, 7, '08:00:00', '17:00:00', '2025-05-06', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(518, 7, '08:00:00', '17:00:00', '2025-05-07', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(519, 7, '08:00:00', '17:00:00', '2025-05-08', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(520, 7, '08:00:00', '17:00:00', '2025-05-09', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(521, 7, '08:00:00', '17:00:00', '2025-05-10', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(522, 7, '08:00:00', '17:00:00', '2025-05-11', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(523, 7, '08:00:00', '17:00:00', '2025-05-12', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(524, 7, '08:00:00', '17:00:00', '2025-05-13', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(525, 7, '08:00:00', '17:00:00', '2025-05-14', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(526, 7, '08:00:00', '17:00:00', '2025-05-15', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34');
INSERT INTO `schedules` (`id`, `doctor_id`, `time_start`, `time_end`, `working_date`, `max_patients`, `status`, `isDeleted`, `created_at`, `updated_at`) VALUES
(527, 7, '08:00:00', '17:00:00', '2025-05-16', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(528, 7, '08:00:00', '17:00:00', '2025-05-17', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(529, 7, '08:00:00', '17:00:00', '2025-05-18', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(530, 7, '08:00:00', '17:00:00', '2025-05-19', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(531, 7, '08:00:00', '17:00:00', '2025-05-20', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(532, 7, '08:00:00', '17:00:00', '2025-05-21', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(533, 7, '08:00:00', '17:00:00', '2025-05-22', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(534, 7, '08:00:00', '17:00:00', '2025-05-23', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(535, 7, '08:00:00', '17:00:00', '2025-05-24', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(536, 7, '08:00:00', '17:00:00', '2025-05-25', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(537, 7, '08:00:00', '17:00:00', '2025-05-26', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(538, 7, '08:00:00', '17:00:00', '2025-05-27', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(539, 7, '08:00:00', '17:00:00', '2025-05-28', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(540, 7, '08:00:00', '17:00:00', '2025-05-29', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(541, 7, '08:00:00', '17:00:00', '2025-05-30', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(542, 7, '08:00:00', '17:00:00', '2025-05-31', 10, 1, 0, '2025-05-03 02:30:34', '2025-05-03 02:30:34'),
(543, 8, '08:00:00', '17:00:00', '2025-05-01', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(544, 8, '08:00:00', '17:00:00', '2025-05-02', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(545, 8, '08:00:00', '17:00:00', '2025-05-03', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(546, 8, '08:00:00', '17:00:00', '2025-05-04', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(547, 8, '08:00:00', '17:00:00', '2025-05-05', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(548, 8, '08:00:00', '17:00:00', '2025-05-06', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(549, 8, '08:00:00', '17:00:00', '2025-05-07', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(550, 8, '08:00:00', '17:00:00', '2025-05-08', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(551, 8, '08:00:00', '17:00:00', '2025-05-09', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(552, 8, '08:00:00', '17:00:00', '2025-05-10', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(553, 8, '08:00:00', '17:00:00', '2025-05-11', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(554, 8, '08:00:00', '17:00:00', '2025-05-12', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(555, 8, '08:00:00', '17:00:00', '2025-05-13', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(556, 8, '08:00:00', '17:00:00', '2025-05-14', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(557, 8, '08:00:00', '17:00:00', '2025-05-15', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(558, 8, '08:00:00', '17:00:00', '2025-05-16', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(559, 8, '08:00:00', '17:00:00', '2025-05-17', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(560, 8, '08:00:00', '17:00:00', '2025-05-18', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(561, 8, '08:00:00', '17:00:00', '2025-05-19', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(562, 8, '08:00:00', '17:00:00', '2025-05-20', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(563, 8, '08:00:00', '17:00:00', '2025-05-21', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(564, 8, '08:00:00', '17:00:00', '2025-05-22', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(565, 8, '08:00:00', '17:00:00', '2025-05-23', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(566, 8, '08:00:00', '17:00:00', '2025-05-24', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(567, 8, '08:00:00', '17:00:00', '2025-05-25', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(568, 8, '08:00:00', '17:00:00', '2025-05-26', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(569, 8, '08:00:00', '17:00:00', '2025-05-27', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(570, 8, '08:00:00', '17:00:00', '2025-05-28', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(571, 8, '08:00:00', '17:00:00', '2025-05-29', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(572, 8, '08:00:00', '17:00:00', '2025-05-30', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29'),
(573, 8, '08:00:00', '17:00:00', '2025-05-31', 10, 1, 0, '2025-05-03 02:35:29', '2025-05-03 02:35:29');

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
(1, 1, 'Khám nội khoa', 'services/j8eKQsN4XU40pmujl8LPFXYOPGRRneoRaOdsHYyR.png', '<p>Khám tổng quát là kiểm tra sức khỏe toàn diện.</p>', 300000, 30, 1, 0, '2025-04-01 09:00:00', '2025-05-03 05:51:24'),
(2, 4, 'Siêu âm tim qua thành ngực', 'services/GRIoRboRYtDEBFuoLwQJEKMP0RrQcgv0tPNwiXq7.png', '<p>Khám chuyên khoa tim mạch.</p>', 400000, 30, 1, 0, '2025-04-02 10:00:00', '2025-05-03 06:06:01'),
(3, 2, 'Siêu âm Thai', 'services/qI5FryMEc8zd59n3PPJrYSaLNJUXY8mxMI7qrtQt.png', '<p>Khám chuyên khoa nhi.</p>', 250000, 30, 1, 0, '2025-04-03 11:00:00', '2025-05-03 06:09:37'),
(4, 3, 'Khám da liễu', 'services/wHwBDpJMIVwwJx8FJVan5re9na91eQJAlnOdHmje.png', '<p>Khám chuyên khoa da liễu.</p>', 350000, 30, 1, 0, '2025-04-04 12:00:00', '2025-05-03 06:08:29'),
(5, 5, 'Khám xương khớp', 'services/2sB5jaF5c1168o5iUjNJ3cobaGQtA6irf5xYDp6s.png', '<p>Khám chuyên khoa xương khớp.</p>', 500000, 30, 1, 0, '2025-04-05 14:00:00', '2025-05-03 06:07:54'),
(6, 4, 'Khám tim mạch', 'services/LrGsNhxHFIszIY4NmNTojM5giM1lDiIXcmCGOFZm.png', '<p>Khám chuyên khoa tim mạch.</p>', 400000, 30, 1, 0, '2025-04-06 15:00:00', '2025-05-03 06:10:28'),
(7, 2, 'Khám nhi', 'services/J5D2QqUnuuOkt3w8Grcgf1GP6bWYRSF7Bp04N6Kj.png', '<p>Khám chuyên khoa nhi.</p>', 250000, 30, 1, 0, '2025-04-07 16:00:00', '2025-05-03 06:10:00'),
(8, 1, 'Khám tổng quát', 'services/osfGy4MfgCcyLGaQ0hP8VIY2p3tC99RDHtBT8ahr.png', '<p>Khám tổng quát là kiểm tra sức khỏe toàn diện.</p>', 300000, 30, 1, 0, '2025-04-08 17:00:00', '2025-05-03 06:11:38'),
(9, 11, 'Khám tiêu hóa', 'services/tlcqX5hhVoOhJwNrBLg0YvHjteP052rkOPkMAdth.png', '<p>Khám chuyên khoa tiêu hóa.</p>', 350000, 30, 1, 0, '2025-04-09 09:00:00', '2025-05-03 05:45:59'),
(10, 12, 'Khám tiết niệu', 'services/PJOJLUAb5CB6SJqVIMdpEyRkhuVzqBesyZ1Xt4B6.png', '<p>Khám chuyên khoa tiết niệu.</p>', 400000, 30, 1, 0, '2025-04-10 10:00:00', '2025-05-03 05:35:32'),
(11, 13, 'Khám hô hấp', 'services/haKAXw1QXpedgk7rJAW4apgv18ZQjKWSKYQy4LES.png', '<p>Khám chuyên khoa hô hấp.</p>', 320000, 30, 1, 0, '2025-04-11 11:00:00', '2025-05-03 05:27:55'),
(12, 14, 'Khám nội tiết', 'services/Yd2T2MNuhBO3fyXZVLnuqImDdg4c3j8Hz1TmoJc0.png', '<p>Khám chuyên khoa nội tiết.</p>', 370000, 30, 1, 0, '2025-04-12 12:00:00', '2025-05-03 05:29:32'),
(13, 15, 'Khám y học cổ truyền', 'services/9WgWJzutwLaIp1hYcUTYM7n1iW70xeGeXUiHrtRe.png', '<p>Khám chuyên khoa y học cổ truyền.</p>', 280000, 30, 1, 0, '2025-04-13 13:00:00', '2025-05-03 05:31:03'),
(14, 16, 'Khám ung bướu', 'services/v5pJvOrMuEtgXSyzgbAhYdwx8SpAC4OmHpPKoZyd.png', '<p>Khám chuyên khoa ung bướu.</p>', 600000, 30, 1, 0, '2025-04-14 14:00:00', '2025-05-03 05:31:26'),
(15, 17, 'Khám huyết học', 'services/B60TVcxirtFJM3QVXH8h17kP31k2edRT2KKcQq6v.png', '<p>Khám chuyên khoa huyết học.</p>', 450000, 30, 1, 0, '2025-04-15 15:00:00', '2025-05-03 05:34:30'),
(16, 18, 'Khám dinh dưỡng', 'services/IhENaaEl3xiKUfhsuKVGrUOV8cs51ERR8UBTbvBe.png', '<p>Khám chuyên khoa dinh dưỡng.</p>', 200000, 30, 1, 0, '2025-04-16 16:00:00', '2025-05-03 05:32:02'),
(17, 19, 'Khám vật lý trị liệu', 'services/P6dcd3qHKLgrGG16aIPWHkF6CgOmkRi2CLlmr87f.png', '<p>Khám chuyên khoa vật lý trị liệu.</p>', 500000, 30, 1, 0, '2025-04-17 08:30:00', '2025-05-03 05:25:20'),
(18, 20, 'Khám tâm thần', 'services/sbHAcJdT6OVryIYrqe4T5QHBO18gbLU5nwKkYhba.png', '<p>Khám chuyên khoa tâm thần.</p>', 550000, 30, 1, 0, '2025-04-18 09:30:00', '2025-05-03 05:24:39'),
(19, 9, 'Khám mắt', 'services/4NYvFqd6oRqBtP3GeC16jntkDnvunChCLKweQsvt.png', '<p>Khám chuyên khoa mắt.</p>', 300000, 30, 1, 0, '2025-04-19 10:30:00', '2025-05-03 05:23:38'),
(20, 10, 'Khám thần kinh', 'services/atCgzG9oTPuHd359KpRMQlCP0FmECSpRAi8vaVT3.png', '<p>Khám chuyên khoa thần kinh.</p>', 400000, 30, 1, 0, '2025-04-20 11:30:00', '2025-05-03 05:23:15');

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
(1, 'Nội tổng quát', '<p>Chuyên khoa điều trị các bệnh lý nội khoa không cần phẫu thuật.</p>', 'incons/1o1XK4wKiDNQaf1vlRRyJJrhCd4fXo9Nlt4dKwe7.png', 'images/w9K09py5XrGFZf86nswIoVyp2jNBEIsZ1U1SbvxQ.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:24:42'),
(2, 'Nhi khoa', '<p>Chăm sóc sức khỏe cho trẻ em từ sơ sinh đến tuổi thiếu niên.</p>', 'incons/26lLeDUEjm9I8Jfglg4HNLMdel2vDKBADmwonm9J.png', 'images/gZBYOMhMoUafzAllvRdbb9kd95rx0G3Pljl5f9nI.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:25:47'),
(3, 'Da liễu', '<p>Chẩn đoán và điều trị các bệnh về da, tóc, móng.</p>', 'incons/sqoLfe1k5g66RcxfhV7FUnPuvlbZxSBAOfJKkZsM.png', 'images/Xp3KPEpXmaSoym5MFwkqFjeOMxsYgCS6Og40gQdj.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:27:15'),
(4, 'Tim mạch', '<p>Chuyên điều trị bệnh lý về tim và hệ tuần hoàn.</p>', 'incons/DZhs215zHUIyqKzeoBSHsYszVvGjZVNM5CT8H5lg.png', 'images/jW4KeXa8OInd1gkgORSJnk74NP7mEk5xng6gR039.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:29:06'),
(5, 'Chấn thương chỉnh hình', '<p>Điều trị các vấn đề về xương khớp, chấn thương.</p>', 'incons/OEaYcWVA3OG7FCap1O7IlxhDwqFSDoFnljDQ0tAA.png', 'images/TeoBrq4dOxC97RiKPjppH6jc1ARMWbDQefYKan7v.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:29:54'),
(6, 'Tai Mũi Họng', '<p>Chuyên khoa về bệnh lý của tai, mũi, họng.</p>', 'incons/S0zIrVlbSbSKqvfBVf8thrAQOYgRxZy52aTLpyUh.png', 'images/cY7xqxETRMnhrh6g3e0oAR5dccbaa3dhnyf8VSBh.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:32:57'),
(7, 'Răng Hàm Mặt', '<p>Chẩn đoán và điều trị các vấn đề răng miệng.</p>', 'incons/aHBj3wc2l44zLY7ZRDfnnMoes2OiVt4o4FpHeg5w.png', 'images/xCBnwjJpGjkM8ZDD41mPaG7eRG1NHAxvDfNr4hd6.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:33:29'),
(8, 'Sản phụ khoa', '<p>Chăm sóc sức khỏe cho phụ nữ và thai kỳ.</p>', 'incons/GnOqjnJ31eqikxum48USJhJy8LA91WayIe7hK4th.png', 'images/1FwkSwu1I3QmwVYLXHPiixSKc0HjwRdnXVW4UnQc.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:37:14'),
(9, 'Mắt', '<p>Điều trị các bệnh lý về mắt và tật khúc xạ.</p>', 'incons/ZnWVTxk6dZNsECeWMtMu6Mz29uf5efmN4GXKNNWY.png', 'images/11jb3wmMMrwmYCqYaaN7BrvkybqV9N5zeDMGGnuJ.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:37:42'),
(10, 'Thần kinh', '<p>Chẩn đoán và điều trị bệnh lý hệ thần kinh.</p>', 'incons/S3W1UIyjk7xc0ddS46LjeC9XHh6yjurAY0ni1Wal.png', 'images/Z8FjKT2pvztTLZB7XxR3zMohDOShNEAqVjAG78uC.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:43:43'),
(11, 'Tiêu hóa', '<p>Điều trị bệnh về đường tiêu hóa và gan mật.</p>', 'incons/cdmtvkPjLblKk6vyNL7nDfrNcNbG90buVkfAbUm6.png', 'images/uUJPr3aFutVVPzcVWheKNA0V35QzwZIe5BxclQO7.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:38:53'),
(12, 'Tiết niệu', '<p>Chuyên khoa điều trị các bệnh về hệ tiết niệu.</p>', 'incons/cwtn0kaPAo6PrcldBEjaqrcooGFxaEQSqfL2PKII.png', 'images/blNgr2keKdKfPXLrWxwq8Om12A51SaJhzAPHbTLT.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:39:30'),
(13, 'Hô hấp', '<p>Chuyên khoa về các bệnh lý đường hô hấp.</p>', 'incons/Grx8BTezTIv3vXnb6eCt18EL8oaIa2RhDO9VBca4.png', 'images/4xI9UPnR2Me3cjs8AH2aOjQzKXlKRhoQMVHMEba8.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:40:12'),
(14, 'Nội tiết', '<p>Điều trị các rối loạn nội tiết như tiểu đường, tuyến giáp.</p>', 'incons/bWxrSWxhsEB9tz1ohw5WNc2UVo8sVl9nViLNZ1Uz.png', 'images/gp7y9UXktwt08AOPwNzERJl1mU2aeQCFabPDa7YM.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:40:57'),
(15, 'Y học cổ truyền', '<p>Chữa bệnh bằng phương pháp Đông y.</p>', 'incons/sQwSv2n6Q8NZsxDaEq9ccITU6Jy1qq5nrFMqnQpD.png', 'images/u4eAbC8gBg5FPbJWlGbjrb9T3JWZvBZVfqvJSlBR.png', 0, '2025-03-23 07:07:41', '2025-05-03 05:09:09'),
(16, 'Ung bướu', '<p>Điều trị và phát hiện sớm các bệnh ung thư.</p>', 'incons/bmgghta3U24mJi832N7V4CNlM5xDJ4fK2Yf54jVl.png', 'images/eTba1r6o4YJNs8Ep2DDcQzfaxk1SNCnsEWiI18Qg.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:47:50'),
(17, 'Huyết học', '<p>Chuyên khoa về các bệnh lý huyết học.</p>', 'incons/ymsIoDZnxM0iUX0EBeZIYUCjR3cFQ8TCtobrdyq5.png', 'images/b4PiLefz3pBaULTgUia8lMI9jvGkhEP1Z8NJZR6o.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:48:39'),
(18, 'Dinh dưỡng', '<p>Tư vấn và điều trị các vấn đề liên quan đến dinh dưỡng.</p>', 'incons/l20msyOZRKRxmdeyE6HeQPA0Z2XkWvhixBTkl7FT.png', 'images/eP4X0ELYq4alkyOCUPxrpF0ANgBaJdtCJznFMIX0.png', 0, '2025-03-23 07:07:41', '2025-05-03 05:08:21'),
(19, 'Vật lý trị liệu', '<p>Phục hồi chức năng sau chấn thương hoặc bệnh lý.</p>', 'incons/0a0hzhTQcCHxY3dlaVdvrcq13OwJRHCXtFvEMULN.png', 'images/GQHjsMOrb7ZZe4IBoF3cPcLh3LwPmo2sE0hafkqH.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:46:43'),
(20, 'Tâm thần', '<p>Chẩn đoán và điều trị các rối loạn tâm lý và thần kinh.</p>', 'incons/uSERynLHOfax5U2W52BHql6QiMybLBvzxHJpQgV5.png', 'images/MwpAPERwoT2VOXv6PcVfLZwkiVA8VdOo4uywhpuK.png', 0, '2025-03-23 07:07:41', '2025-05-03 04:44:45');

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
(3, 'Bác sĩ Lê Minh', 'doctor@example.com', NULL, '0912345678', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$RtmKdtILX.jOyTGt8VQrhOBr0.vb8Y.OR1XbQHdDtGqtWPhMH2yA2', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(4, 'Bác sĩ Hoàng Dũng', 'test@example.com', NULL, '0987123456', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$heMusowIkkhzuCV.HLoP0.0Yswis1K8SUZo2uXlNalkyxSxALfL1W', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-03-27 02:10:00'),
(5, 'Bác sĩ Trần Văn Hùng', 'hung.tran@example.com', NULL, '0901122334', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$kHgQ2f0.UOSgORIF8L0MBOEfcQQpjjVGH9QfpPx3iS90FrXVliJ/m', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(6, 'Bác sĩ Phạm Ngọc Anh', 'anh.pham@example.com', NULL, '0933456789', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$2LrCM7CX6EWqH/r6ZKIQGeC8JCOc6sw/L5EEc6IF97TMQoC4bY0ja', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(7, 'Bác sĩ Nguyễn Thanh Tùng', 'tung.nguyen@example.com', NULL, '0923344556', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$6loN3/6XkgZ8beKS4I3QLutJDqaugUwkpZCFFGNjRBXaic1IdNldS', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(8, 'Bác sĩ Đỗ Thị Hòa', 'hoa.do@example.com', NULL, '0912456789', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$h1CYz6gdj7epyqOypE1sO.t46XLTMUsdoVVBqWaXYip8p3syQcXdG', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(9, 'Bác sĩ Vũ Đức Minh', 'minh.vu@example.com', NULL, '0978654322', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$zjD8Nqc4t6xHNGMlEUqgZe3y5o5b0LpASZBv7cMa0cCzN7UUJzbnu', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
(10, 'Bác sĩ Lý Hoàng Nam', 'nam.ly@example.com', NULL, '0902233445', NULL, NULL, '2025-03-23 07:10:51', '$2y$10$54qIFlVCE.qv6yb3mcWOOeUdzEzRRUhyM4X.V.4PefLCZAavkdhgS', 'doctor', 0, NULL, '2025-03-23 07:10:51', '2025-03-23 07:10:51'),
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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=574;

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
