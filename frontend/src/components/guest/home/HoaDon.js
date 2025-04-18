import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InvoicePage = () => {
  const { booking_id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/client/invoice/${booking_id}`)
      .then((response) => {
        if (response.data.status) {
          setInvoice(response.data.data[0]);
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => setError("Lỗi khi lấy thông tin hóa đơn."))
      .finally(() => setLoading(false));
  }, [booking_id]);

  const handlePayment = async (method) => {
    if (method === "Momo" && invoice) {
      setPaymentLoading(true);
      try {
        const amount = Math.round(invoice.total_amount.toLocaleString());
        const paymentData = {
          booking_id: invoice.booking_id,
          amount: amount,
          order_info: `Thanh toán hóa đơn #${invoice.id}`,
          return_url: window.location.origin + window.location.pathname,
        };

        const response = await axios.post(
          'http://localhost:8000/api/client/momo-payment',
          paymentData
        );

        if (response.data && response.data.payUrl) {
          window.location.href = response.data.payUrl;
        } else {
          setError("Không thể khởi tạo thanh toán MoMo");
        }
      } catch (err) {
        setError("Lỗi khi thực hiện thanh toán MoMo: " + (err.response?.data?.message || err.message));
      } finally {
        setPaymentLoading(false);
      }
    } else {
      console.log(`Thanh toán bằng ${method}`);
      // Handle other payment methods if needed
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow">
            <div className="flex flex-col items-center">
              <i className="ri-loader-2-line animate-spin text-blue-500 text-4xl mb-3"></i>
              <span className="text-gray-600 text-lg font-medium">Đang tải hóa đơn...</span>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <i className="ri-error-warning-line text-5xl text-red-500"></i>
            </div>
            <p className="mt-2 text-red-600 text-lg font-medium">{error}</p>
            <button 
              onClick={() => window.history.back()}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Quay lại
            </button>
          </div>
        ) : invoice ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Formal Invoice Paper - Now with reduced width */}
            <div className="bg-white rounded-lg shadow overflow-hidden lg:w-2/3">
              <div className="border-4 border-red-500 m-4 p-6 rounded-sm">
                {/* Company Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="mr-4">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        VP
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 uppercase">Phòng khám nha khoa</h2>
                      <p className="text-sm text-gray-600">Mã số thuế: 0106830643-195</p>
                      <p className="text-sm text-gray-600">Địa chỉ: 285 Đội Cấn, Ba Đình, Hà Nội</p>
                      <p className="text-sm text-gray-600">Điện thoại: 0979499653</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block border border-gray-200 rounded px-3 py-1 mb-2">
                      <p className="text-sm text-gray-600">Mẫu số: 01GTKT0002</p>
                    </div>
                    <p className="text-sm text-gray-600">Ký hiệu: AB20E</p>
                    <p className="text-sm text-gray-600">Số: {invoice.id.toString().padStart(7, '0')}</p>
                  </div>
                </div>

                {/* Invoice Title */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold uppercase text-gray-800">Hóa đơn dịch vụ khám bệnh</h1>
                  <p className="text-sm text-gray-600 italic">(Bản thể hiện của hóa đơn điện tử)</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Ngày {new Date(invoice.created_at).getDate()} tháng {new Date(invoice.created_at).getMonth() + 1} năm {new Date(invoice.created_at).getFullYear()}
                  </p>
                </div>

                {/* Customer Info with Payment Info at top right */}
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Họ tên người mua hàng: </span>
                        {invoice.details[0]?.guest?.guest_name || ""}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Tên đơn vị: </span>
                        Khách hàng cá nhân
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Địa chỉ: </span>
                        {invoice.details[0]?.guest?.address || ""}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Số điện thoại: </span>
                        {invoice.details[0]?.guest?.phone || ""}
                      </p>
                    </div>
                    <div>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Số hóa đơn:</span>
                          <span className="text-sm font-bold">{invoice.id.toString().padStart(7, '0')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Tổng tiền thanh toán:</span>
                          <span className="text-sm font-bold text-blue-600">{invoice.total_amount.toLocaleString()} VNĐ</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-medium text-gray-700">Hạn thanh toán:</span>
                          <span className="text-sm text-yellow-600 flex items-center">
                            <i className="ri-information-line mr-1 text-yellow-500"></i>
                            Không có hạn
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="w-24 h-24 border border-gray-300 flex items-center justify-center">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=invoice-id-${invoice.id}`}
                            alt="QR Code" 
                            className="w-20 h-20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rest of the invoice content remains the same */}
                <div className="mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">STT</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">Tên dịch vụ</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">Đơn vị tính</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">Số lượng</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">Đơn giá</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.details.map((detail, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2 text-sm">{index + 1}</td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">{detail.service_name}</td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">Lần</td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">1</td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">{detail.price ? detail.price.toLocaleString('vi-VN') : '0'} VNĐ</td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">{detail.price ? detail.price.toLocaleString('vi-VN') : '0'} VNĐ</td>
                        </tr>
                      ))}
                     
                      <tr>
                        <td colSpan="5" className="border border-gray-300 px-4 py-2 text-sm font-medium text-right">Thuế suất GTGT:</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm font-medium">{invoice.tax.toLocaleString('vi-VN')} %</td>
                      </tr>
                      <tr>
                        <td colSpan="5" className="border border-gray-300 px-4 py-2 text-sm font-medium text-right">Giảm giá:</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm font-medium">{invoice.discount.toLocaleString('vi-VN')} VNĐ</td>
                      </tr>
                      <tr>
                        <td colSpan="5" className="border border-gray-300 px-4 py-2 text-sm font-medium text-right">Tổng tiền thanh toán:</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm font-medium">{invoice.total_amount.toLocaleString('vi-VN')} VNĐ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Amount in words */}
                <div className="mb-8">
                  <p className="text-sm">
                    <span className="font-medium">Số tiền viết bằng chữ: </span>
                    <span className="italic">
                      {numberToVietnameseWords(invoice.total_amount)}
                    </span>
                  </p>
                </div>

                {/* Signatures - Updated to horizontal layout */}
                <div className="mb-4">
                  <div className="flex justify-between">
                    <div className="text-center">
                      <p className="font-medium text-sm">Người mua hàng</p>
                      <p className="text-xs text-gray-500">(Ký, ghi rõ họ, tên)</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm">Người bán hàng</p>
                      <p className="text-xs text-gray-500">(Ký, ghi rõ họ, tên)</p>
                    </div>
                  </div>
                  
                  <div className="h-32 relative">
                    <div className="absolute right-0 bottom-0">
                      <div className="border border-green-500 rounded p-2 inline-block">
                        <p className="text-xs text-green-600 font-medium">Signature Valid</p>
                        <p className="text-xs text-green-600">Ký bởi: PHÒNG KHÁM NHA KHOA</p>
                        <p className="text-xs text-green-600">Ký ngày: {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section - Now positioned to the right */}
            <div className="bg-white rounded-lg shadow p-6 lg:w-1/3 h-fit sticky top-8">
              <div className="flex flex-col justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Hóa đơn chưa thanh toán</h2>
                <div className="bg-yellow-50 px-4 py-2 rounded-lg flex items-center border border-yellow-200">
                  <i className="ri-information-line mr-2 text-yellow-500"></i>
                  <span className="text-yellow-700 font-medium">Hạn thanh toán: Không có hạn</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col justify-between mb-6">
                  <div className="mb-4">
                    <p className="text-gray-600 mb-1">Số hóa đơn: {invoice.id.toString().padStart(7, '0')}</p>
                    <p className="text-gray-600">Tổng tiền thanh toán: <span className="font-bold text-blue-600">{invoice.total_amount.toLocaleString()} VNĐ</span></p>
                  </div>
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition duration-300 flex items-center justify-center"
                    onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                  >
                    <i className="ri-secure-payment-line mr-2"></i>
                    Thanh toán ngay
                  </button>
                </div>

                {showPaymentOptions && (
                  <div className="mt-6 space-y-4 animate-fade-in">
                    <p className="text-gray-600 font-medium mb-4">Chọn phương thức thanh toán:</p>
                    
                    <button
                      onClick={() => handlePayment("Momo")}
                      disabled={paymentLoading}
                      className={`w-full bg-white border border-gray-200 hover:bg-pink-50 text-gray-800 py-4 rounded-lg font-medium flex items-center justify-between px-6 transition duration-300 shadow-sm hover:shadow ${
                        paymentLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">MoMo</div>
                        <span>Thanh toán qua MoMo</span>
                      </div>
                      <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all">
                    <i className="ri-download-line mr-2"></i> Tải hóa đơn
                  </button>
                  <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all">
                    <i className="ri-share-line mr-2"></i> Chuyển thành chứng từ giấy
                  </button>
                  <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all">
                    <i className="ri-file-list-3-line mr-2"></i> Xem chứng thư số người bán
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-damage-line text-4xl text-gray-400"></i>
            </div>
            <p className="mt-2 text-gray-500 font-medium">Không tìm thấy hóa đơn</p>
            <button 
              onClick={() => window.history.back()}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Quay lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePage;

// Add this function at the top of the file, after the imports
const numberToVietnameseWords = (number) => {
  const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  const positions = ["", "nghìn", "triệu", "tỷ"];

  if (number === 0) return "không";

  const convertGroup = (n) => {
    let str = "";
    const hundreds = Math.floor(n / 100);
    const tens = Math.floor((n % 100) / 10);
    const ones = n % 10;

    if (hundreds > 0) {
      str += units[hundreds] + " trăm ";
    }

    if (tens > 0) {
      if (tens === 1) {
        str += "mười ";
      } else {
        str += units[tens] + " mươi ";
      }
    }

    if (ones > 0) {
      if (tens === 0 && hundreds !== 0) {
        str += "lẻ ";
      }
      if (ones === 1 && tens > 1) {
        str += "mốt ";
      } else if (ones === 5 && tens > 0) {
        str += "lăm ";
      } else {
        str += units[ones] + " ";
      }
    }

    return str;
  };

  let result = "";
  let count = 0;
  
  while (number > 0) {
    const group = number % 1000;
    if (group !== 0) {
      result = convertGroup(group) + positions[count] + " " + result;
    }
    number = Math.floor(number / 1000);
    count++;
  }

  return result.trim() + " đồng";
};