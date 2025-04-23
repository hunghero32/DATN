import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../ultils/api/axios";
import "remixicon/fonts/remixicon.css";

const KetQuaKham = () => {
  const { bookingId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
      api.get(`/api/client/result/${bookingId}`)
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

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <i className="ri-loader-2-line animate-spin text-blue-500 text-4xl"></i>
      <span className="ml-2 text-gray-600 text-lg">Đang tải dữ liệu...</span>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <i className="ri-error-warning-line text-red-500 text-4xl"></i>
      <span className="ml-2 text-red-500 text-lg">{error}</span>
    </div>
  );
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
      <div className="max-w-4xl mx-auto bg-white border rounded-lg shadow-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-8 pb-6 border-b">
          <h5 className="text-3xl font-bold text-blue-800 p-4 flex items-center justify-center">
            <i className="ri-file-list-3-line  mr-3"></i>
            PHIẾU KẾT QUẢ KHÁM BỆNH
          </h5>
          <div className="mt-3 flex justify-center gap-8">
            <p className="text-gray-600 flex items-center">
              <i className="ri-file-paper-2-line mr-2"></i>
              Mã phiếu: #{id}
            </p>
            <p className="text-gray-600 flex items-center">
              <i className="ri-calendar-line mr-2"></i>
              Ngày khám: {new Date(created_at).toLocaleDateString('vi-VN')}
            </p>
            <p className="text-gray-600 flex items-center">
              <i className="ri-bookmark-line mr-2"></i>
              Mã đặt lịch: #{bookingId}
            </p>
          </div>
        </div>

        {/* Patient and Doctor Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-blue-50 mt-4 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h5 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
              <i className="ri-user-heart-line mr-2"></i>
              Thông tin bệnh nhân
            </h5>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center">
                  <i className="ri-user-line mr-2"></i>Họ và tên:
                </span>
                <span className="font-medium">{guest.guest_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center">
                  <i className="ri-men-line mr-2"></i>Giới tính:
                </span>
                <span>{guest.gender === 'male' ? 'Nam' : 'Nữ'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center">
                  <i className="ri-phone-line mr-2"></i>Số điện thoại:
                </span>
                <span>{guest.phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 mt-4 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h5 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
              <i className="ri-hospital-line mr-2"></i>
              Thông tin bác sĩ
            </h5>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center">
                  <i className="ri-user-star-line mr-2"></i>Bác sĩ phụ trách:
                </span>
                <span className="font-medium">{doctor.doctor_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center">
                  <i className="ri-stethoscope-line mr-2"></i>Chuyên khoa:
                </span>
                <span>{doctor.specialty !== 'N/A' ? doctor.specialty : 'Đa khoa'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis Results */}
        <div className="space-y-6 mb-8">
          <div className="bg-blue-50 mt-4 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h5 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
              <i className="ri-mental-health-line mr-2"></i>
              Chẩn đoán
            </h5>
            <p className="text-gray-800 whitespace-pre-line">{diagnosis}</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h5 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
              <i className="ri-medicine-bottle-line mr-2"></i>
              Đơn thuốc
            </h5>
            <p className="text-gray-800 whitespace-pre-line">{prescription}</p>
          </div>

          {note && (
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
                <i className="ri-sticky-note-line mr-2"></i>
                Ghi chú
              </h3>
              <p className="text-gray-800 whitespace-pre-line">{note}</p>
            </div>
          )}
        </div>

        {/* Image Result */}
        {file && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
              <i className="ri-image-line mr-2"></i>
              Hình ảnh kết quả
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={`http://localhost:8000/storage/${file}`} 
                alt="Kết quả khám"
                className="max-w-full h-auto rounded-lg shadow-sm mx-auto hover:shadow-lg transition-shadow"
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-right mt-8 pt-4 border-t">
          <p className="text-gray-600 flex items-center justify-end">
            <i className="ri-time-line mr-2"></i>
            Cập nhật lần cuối: {new Date(updated_at).toLocaleString('vi-VN')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default KetQuaKham;
