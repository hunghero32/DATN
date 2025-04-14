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
      .get(`/api/client/result/${bookingId}`)
      .then((response) => {
        if (response.data && response.data.data && response.data.data.length > 0) {
          setResult(response.data.data[0]);
          console.log("dddddddddddddddddddddddd" ,response.data.data[0]);
        } else {
          setError("Không tìm thấy kết quả khám.");
        }
      })
      .catch(() => setError("Lỗi khi lấy dữ liệu"))
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!result) return <p className="text-center mt-10 text-red-500">Không có dữ liệu</p>;

  // Destructure the properties from result
  const { 
    id, 
    diagnosis, 
    prescription, 
    note, 
    doctor,
    guest,
    created_at,
    updated_at,  // Add this line
    file
  } = result;

  return (
    <div className="min-h-screen bg-gray-50 py-8 mb-4 mt-4">
      <div className="max-w-4xl mx-auto bg-white border rounded-lg shadow-md p-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6 pb-4 border-b">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">PHIẾU KẾT QUẢ KHÁM BỆNH</h1>
            <p className="text-gray-600 mt-2">Mã phiếu: #{id}</p>
            <p className="text-gray-600">Ngày khám: {new Date(created_at).toLocaleDateString('vi-VN')}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Mã đặt lịch: #{bookingId}</p>
          </div>
        </div>

        {/* Patient and Doctor Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Thông tin bệnh nhân</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Họ và tên:</span>
                <span className="font-medium">{guest.guest_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giới tính:</span>
                <span>{guest.gender === 'male' ? 'Nam' : 'Nữ'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Số điện thoại:</span>
                <span>{guest.phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Thông tin bác sĩ</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Bác sĩ phụ trách:</span>
                <span className="font-medium">{doctor.doctor_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chuyên khoa:</span>
                <span>{doctor.specialty !== 'N/A' ? doctor.specialty : 'Đa khoa'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis Results */}
        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">Chẩn đoán</h3>
            <p className="text-gray-800">{diagnosis}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">Đơn thuốc</h3>
            <p className="text-gray-800">{prescription}</p>
          </div>

          {note && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Ghi chú</h3>
              <p className="text-gray-800">{note}</p>
            </div>
          )}
        </div>

        {/* Image Result */}
        {file && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Hình ảnh kết quả</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <img 
                src={`http://localhost:8000/storage/${file}`} 
                alt="Kết quả khám"
                className="max-w-full h-auto rounded-lg shadow-sm mx-auto"
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-right mt-8 pt-4 border-t">
          <p className="text-gray-600">Ngày cập nhật: {new Date(updated_at).toLocaleString('vi-VN')}</p>
        </div>
      </div>
    </div>
);
}
export default KetQuaKham;
