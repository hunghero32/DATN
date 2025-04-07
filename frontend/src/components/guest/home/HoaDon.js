import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InvoicePage = () => {
  const { booking_id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Gọi API để lấy hóa đơn theo booking_id
    axios.get(`http://localhost:8000/api/client/invoice/${booking_id}`)
      .then((response) => {
        if (response.data.status) {
          setInvoice(response.data.data[0]); // Vì dữ liệu trả về là một mảng, ta lấy phần tử đầu tiên
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => setError("Lỗi khi lấy thông tin hóa đơn."))
      .finally(() => setLoading(false));
  }, [booking_id]);

  return (
    <div className="container mx-auto mt-4 mb-4 p-6">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <i className="ri-loader-2-line animate-spin text-blue-500 text-4xl"></i>
          <span className="ml-2 text-gray-600 text-lg">Đang tải...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg font-semibold">
          <i className="ri-error-warning-line text-4xl"></i>
          {error}
        </div>
      ) : invoice ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section - Invoice Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Hóa Đơn #{invoice.id}</h2>
              <div className="text-sm text-gray-500">
                {new Date(invoice.created_at).toLocaleDateString()}
              </div>
            </div>
            
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tổng số tiền:</span>
                <span className="font-semibold text-lg">{invoice.total_amount.toLocaleString()} VNĐ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Giảm giá:</span>
                <span className="text-green-600">-{invoice.discount.toLocaleString()} VNĐ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Thuế:</span>
                <span>{invoice.tax.toLocaleString()} VNĐ</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Tổng cộng:</span>
                  <span className="font-bold text-xl text-blue-600">
                    {(invoice.total_amount - invoice.discount + invoice.tax).toLocaleString()} VNĐ
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center">
              <i className="ri-bank-card-line mr-2"></i>
              Thanh toán ngay
            </button>
          </div>

          {/* Right Section - Booking Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Chi Tiết Lịch Hẹn</h3>
            {invoice.details.map((detail) => (
              <div key={detail.id} className="mb-6 last:mb-0 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={detail.doctor.image}
                    alt={detail.doctor.doctor_name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{detail.doctor.doctor_name}</h4>
                    <p className="text-blue-600">{detail.doctor.specialty_name}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-gray-700">
                  <p className="flex items-center">
                    <i className="ri-user-line mr-2"></i>
                    <strong className="mr-2">Khách hàng:</strong> {detail.guest.guest_name}
                  </p>
                  <p className="flex items-center">
                    <i className="ri-phone-line mr-2"></i>
                    <strong className="mr-2">Điện thoại:</strong> {detail.guest.phone}
                  </p>
                  <p className="flex items-center">
                    <i className="ri-mail-line mr-2"></i>
                    <strong className="mr-2">Email:</strong> {detail.guest.email}
                  </p>
                  <p className="flex items-center">
                    <i className="ri-calendar-check-line mr-2"></i>
                    <strong className="mr-2">Trạng thái:</strong>
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {detail.booking_status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">Không tìm thấy hóa đơn.</div>
      )}
    </div>
  );
};

export default InvoicePage;
