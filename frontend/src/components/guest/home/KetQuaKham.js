import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../ultils/api/axios";

const KetQuaKham = () => {
  const { bookingId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/api/results/${bookingId}`)
      .then((response) => {
        if (response.data) {
          setResult(response.data);
        } else {
          setError("Không tìm thấy kết quả khám.");
        }
      })
      .catch(() => setError("Lỗi khi lấy dữ liệu"))
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const { diagnosis, prescription, note, doctor, guest, booking, id } = result;

  return (
    <div className="max-w-4xl mx-auto mt-4 mb-4 bg-white border shadow-lg rounded-xl p-8 mt-10 text-sm font-sans text-gray-700">
      {/* I. Header */}
      <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-900">KẾT QUẢ KHÁM BỆNH</h1>
        <p className="text-gray-500 italic">Ngày khám: {new Date(booking.booking_date).toLocaleDateString()}</p>
        <p className="text-xs text-gray-400">Mã kết quả: #{id} - Trạng thái: <span className="text-green-600 font-medium">Đã hoàn thành</span></p>
      </div>

      {/* II. Thông tin bệnh nhân */}
      <div className="mb-6">
        <h2 className="font-semibold text-base text-gray-800 mb-2">1. Thông tin bệnh nhân</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>Họ tên:</strong> {guest.guest_name}</p>
          <p><strong>Giới tính:</strong> {guest.gender === "female" ? "Nữ" : "Nam"}</p>
          <p><strong>Ngày sinh:</strong> {new Date(guest.birthday).toLocaleDateString()}</p>
          <p><strong>SĐT:</strong> {guest.guest_phone}</p>
          <p><strong>Email:</strong> {guest.guest_email}</p>
          <p><strong>Địa chỉ:</strong> {guest.address?.street}, {guest.address?.city}</p>
        </div>
      </div>

      {/* III. Thông tin bác sĩ */}
      <div className="mb-6">
        <h2 className="font-semibold text-base text-gray-800 mb-2">2. Bác sĩ phụ trách</h2>
        <div className="flex items-center gap-4">
          <img
            src={`/${doctor.doctor_avatar}`}
            alt={doctor.doctor_name}
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div className="text-sm">
            <p><strong>{doctor.doctor_name}</strong></p>
            <p>{doctor.doctor_bio}</p>
            <p><strong>Kinh nghiệm:</strong> {doctor.exp} năm</p>
          </div>
        </div>
      </div>

      {/* IV. Kết quả khám bệnh */}
      <div className="mb-6">
        <h2 className="font-semibold text-base text-gray-800 mb-2">3. Kết quả khám</h2>
        <div className="border rounded-md p-4 bg-gray-50 space-y-2 text-sm">
          <p><strong>Chẩn đoán:</strong> {diagnosis}</p>
          <p><strong>Toa thuốc:</strong> {prescription}</p>
          <p><strong>Ghi chú bác sĩ:</strong> {note}</p>
        </div>
      </div>

      {/* V. Lịch hẹn khám */}
      <div>
        <h2 className="font-semibold text-base text-gray-800 mb-2">4. Thông tin lịch hẹn</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>Ngày khám:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
          <p><strong>Giờ khám:</strong> {booking.booking_time}</p>
          <p className="col-span-2"><strong>Ghi chú:</strong> {booking.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default KetQuaKham;
