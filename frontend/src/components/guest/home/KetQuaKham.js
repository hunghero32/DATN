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
    api
      .get(`/api/client/result/${bookingId}`)
      .then((response) => {
        if (response.data && response.data.data && response.data.data.length > 0) {
          setResult(response.data.data[0]);
          console.log("dddddddddddddddddddddddd", response.data.data[0]);
        } else {
          setError("Không tìm thấy kết quả khám.");
        }
      })
      .catch(() => setError("Lỗi khi lấy dữ liệu"))
      .finally(() => setLoading(false));
  }, [bookingId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="ri-loader-2-line animate-spin text-blue-500 text-4xl"></i>
        <span className="ml-2 text-gray-600 text-lg">Đang tải dữ liệu...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="ri-error-warning-line text-red-500 text-4xl"></i>
        <span className="ml-2 text-red-500 text-lg">{error}</span>
      </div>
    );

  if (!result) return <p className="text-center mt-10 text-red-500">Không có dữ liệu</p>;

  const {
    id,
    diagnosis,
    prescription,
    note,
    doctor,
    guest,
    created_at,
    updated_at,
    file
  } = result;

  // Parse the prescription JSON string into an array
  let prescriptionList = [];
  try {
    prescriptionList =
      typeof prescription === "string" && prescription.trim()
        ? JSON.parse(prescription)
        : [];
  } catch (e) {
    console.error("Error parsing prescription:", e);
    prescriptionList = [];
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mb-4 mt-4">
      <div className="max-w-4xl mx-auto bg-white border rounded-lg shadow-lg p-8 print:p-4 print:shadow-none print:border-0 print:bg-white">
        <style>
          {`
            @page {
              size: A4;
              margin: 10mm; /* Reduced margin to maximize printable area */
            }
            @media print {
              body {
                background: none;
                margin: 0;
                width: 100%;
              }
              /* Hide sidebar or any overlapping elements */
              .sidebar, .fixed-header, .header-spacer {
                display: none !important;
              }
              .container {
                box-shadow: none;
                border: none;
                width: 190mm; /* Adjusted to fit within A4 with 10mm margins */
                min-height: 277mm; /* Adjusted for A4 with 10mm margins */
                padding: 0;
                margin: 0 auto;
                position: relative;
                top: 0;
                left: 0;
                font-family: 'Times New Roman', serif;
                font-size: 12px; /* Reduced font size for better fit */
                line-height: 1.4;
                color: #000;
              }
              .header {
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px solid #000;
                page-break-inside: avoid;
              }
              .header h5 {
                font-size: 18px;
                color: #000;
              }
              .header .meta {
                font-size: 10px;
                gap: 10px;
              }
              .section-grid {
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                margin-bottom: 10px;
                page-break-inside: avoid;
              }
              .section {
                background: none !important;
                border: none !important;
                padding: 8px 0 !important;
                margin-bottom: 10px;
                page-break-inside: avoid;
              }
              .section h5, .section h3 {
                font-size: 14px;
                color: #000;
                margin-bottom: 6px;
                border-bottom: 1px solid #000;
                padding-bottom: 2px;
              }
              .section p {
                font-size: 12px;
                color: #000;
              }
              .info-grid {
                gap: 4px;
              }
              .info-item {
                grid-template-columns: 80px 1fr;
                font-size: 12px;
                margin-bottom: 3px;
              }
              .info-item span:first-child {
                color: #000;
              }
              .info-item span:last-child {
                color: #000;
              }
              .prescription-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 6px;
                font-size: 12px;
                page-break-inside: auto;
              }
              .prescription-table th,
              .prescription-table td {
                border: 1px solid #000;
                padding: 4px;
                text-align: left;
                background: none !important;
                color: #000;
              }
              .prescription-table th {
                font-weight: bold;
              }
              .prescription-table tr {
                page-break-inside: avoid;
                page-break-after: auto;
              }
              .image-section {
                margin-bottom: 10px;
                page-break-inside: avoid;
              }
              .image-section img {
                max-width: 100%;
                max-height: 120mm; /* Constrain image height for A4 */
                height: auto;
                border: none;
                border-radius: 0;
              }
              .footer {
                margin-top: 15px;
                padding-top: 8px;
                border-top: 1px solid #000;
                font-size: 10px;
                page-break-inside: avoid;
              }
              .print-button {
                display: none;
              }
              .hover\\:shadow-md, .hover\\:shadow-lg {
                box-shadow: none !important;
              }
              * {
                -webkit-print-color-adjust: exact;
              }
            }
            .container {
              font-family: 'Arial', sans-serif;
              color: #333;
              line-height: 1.6;
              box-sizing: border-box;
              width: 100%;
            }
            .print-button {
              background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
              color: white;
              border: none;
              padding: 10px 20px;
              font-size: 16px;
              font-weight: 600;
              border-radius: 6px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 6px;
              transition: all 0.3s ease;
              margin: 20px auto;
            }
            .print-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
            }
          `}
        </style>

        <div className="container">
          {/* Header Section */}
          <div className="header text-center mb-8 pb-6 border-b">
            <h5 className="text-3xl font-bold text-blue-800 p-4 flex items-center justify-center">
              <i className="ri-file-list-3-line mr-3"></i>
              PHIẾU KẾT QUẢ KHÁM BỆNH
            </h5>
            <div className="meta mt-3 flex justify-center gap-8">
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
          <div className="section-grid grid md:grid-cols-2 gap-8 mb-8">
            <div className="section bg-blue-50 mt-4 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h5 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
                <i className="ri-user-heart-line mr-2"></i>
                Thông tin bệnh nhân
              </h5>
              <div className="info-grid space-y-4">
                <div className="info-item flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <i className="ri-user-line mr-2"></i>Họ và tên:
                  </span>
                  <span className="font-medium">{guest.guest_name}</span>
                </div>
                <div className="info-item flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <i className="ri-men-line mr-2"></i>Giới tính:
                  </span>
                  <span>{guest.gender === 'male' ? 'Nam' : 'Nữ'}</span>
                </div>
                <div className="info-item flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <i className="ri-phone-line mr-2"></i>Số điện thoại:
                  </span>
                  <span>{guest.phone}</span>
                </div>
              </div>
            </div>

            <div className="section bg-blue-50 mt-4 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h5 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
                <i className="ri-hospital-line mr-2"></i>
                Thông tin bác sĩ
              </h5>
              <div className="info-grid space-y-4">
                <div className="info-item flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <i className="ri-user-star-line mr-2"></i>Bác sĩ phụ trách:
                  </span>
                  <span className="font-medium">{doctor.doctor_name}</span>
                </div>
                <div className="info-item flex justify-between items-center">
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
            <div className="section bg-blue-50 mt-4 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h5 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
                <i className="ri-mental-health-line mr-2"></i>
                Chẩn đoán
              </h5>
              <p className="text-gray-800 whitespace-pre-line">{diagnosis}</p>
            </div>

            <div className="section bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h5 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
                <i className="ri-medicine-bottle-line mr-2"></i>
                Đơn thuốc
              </h5>
              {prescriptionList.length > 0 ? (
                <table className="prescription-table w-full border-collapse mt-2">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-blue-300 p-2 text-left text-blue-700">Tên Thuốc</th>
                      <th className="border border-blue-300 p-2 text-left text-blue-700">Số lượng</th>
                      <th className="border border-blue-300 p-2 text-left text-blue-700">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionList.map((item, index) => (
                      <tr key={index} className="bg-white hover:bg-blue-50 transition-colors">
                        <td className="border border-blue-300 p-2">{item.medicine || "N/A"}</td>
                        <td className="border border-blue-300 p-2">{item.quantity || "N/A"}</td>
                        <td className="border border-blue-300 p-2">{item.note || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-800 whitespace-pre-line">Không có đơn thuốc</p>
              )}
            </div>

            {note && (
              <div className="section bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
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
            <div className="image-section mb-8">
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
          <div className="footer text-right mt-8 pt-4 border-t">
            <p className="text-gray-600 flex items-center justify-end">
              <i className="ri-time-line mr-2"></i>
              Cập nhật lần cuối: {new Date(updated_at).toLocaleString('vi-VN')}
            </p>
          </div>

          {/* Print Button */}
          <button className="print-button" onClick={handlePrint}>
            <i className="ri-printer-line"></i> In Phiếu
          </button>
        </div>
      </div>
    </div>
  );
};

export default KetQuaKham;