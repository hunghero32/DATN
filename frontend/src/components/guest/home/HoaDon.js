import React, { useEffect, useState } from "react";
import { XCircle, Printer } from "lucide-react";
import api from "../../../ultils/api/axios";

const HoaDon = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get(`/api/client/invoice`);

        if (!response.data.status || !response.data.data) {
          setError("Không có hóa đơn nào");
          return;
        }

        setInvoices(response.data.data);
      } catch (error) {
        console.error("Lỗi API:", error);
        setError("Lỗi khi tải hóa đơn.");
      } finally {
        setLoading(false); // Đảm bảo khi dữ liệu đã tải xong thì set loading là false
      }
    };

    fetchInvoices();
  }, []);

  const handlePrint = (invoice) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Hóa Đơn</title></head><body>');
    printWindow.document.write(`
      <h3>Mã Hóa Đơn: ${invoice.id}</h3>
      <p><strong>Ngày Tạo:</strong> ${new Date(invoice.created_at).toLocaleString('vi-VN')}</p>
      <p><strong>Tổng Tiền:</strong> ${formatCurrency(invoice.total_amount)}</p>
      <p><strong>Giảm Giá:</strong> ${formatCurrency(invoice.discount)}</p>
      <p><strong>Thuế:</strong> ${formatCurrency(invoice.tax)}</p>
      <p><strong>Thành Tiền:</strong> ${formatCurrency(invoice.total_amount - invoice.discount + invoice.tax)}</p>
    `);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Danh Sách Hóa Đơn Khám Bệnh
      </h2>

      {error ? (
        <div className="text-center text-red-500 text-lg font-semibold">
          <XCircle className="w-10 h-10 mx-auto mb-2" />
          {error}
        </div>
      ) : loading ? (
        <div className="text-center text-gray-500 text-lg font-semibold">
          Đang tải dữ liệu...
        </div>
      ) : invoices.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
              <h3 className="text-xl font-bold">Mã Hóa Đơn: {invoice.id}</h3>
              <p><strong>Ngày Tạo:</strong> {new Date(invoice.created_at).toLocaleString('vi-VN')}</p>
              <p><strong>Tổng Tiền:</strong> {formatCurrency(invoice.total_amount)}</p>
              <p><strong>Giảm Giá:</strong> {formatCurrency(invoice.discount)}</p>
              <p><strong>Thuế:</strong> {formatCurrency(invoice.tax)}</p>
              <p><strong>Thành Tiền:</strong> {formatCurrency(invoice.total_amount - invoice.discount + invoice.tax)}</p>

              {invoice.details.length > 0 && (
                <>
                  <h4 className="text-lg font-bold mt-4">Thông Tin Khách Hàng</h4>
                  <p><strong>Tên:</strong> {invoice.details[0]?.guest?.guest_name || "N/A"}</p>
                  <p><strong>SĐT:</strong> {invoice.details[0]?.guest?.phone || "N/A"}</p>

                  <h4 className="text-lg font-bold mt-4">Thông Tin Bác Sĩ</h4>
                  <p><strong>Bác Sĩ:</strong> {invoice.details[0]?.doctor?.doctor_name || "N/A"}</p>
                  <p><strong>Kinh Nghiệm:</strong> {invoice.details[0]?.doctor?.exp || "N/A"} năm</p>

                  <p><strong>Trạng Thái:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${invoice.details[0]?.booking_status === "completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}>
                      {invoice.details[0]?.booking_status === "completed" ? "Hoàn thành" : "Chờ xử lý"}
                    </span>
                  </p>
                </>
              )}

              <button 
                onClick={() => handlePrint(invoice)}
                className="mt-4 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                <Printer className="w-5 h-5 mr-2" />
                In Hóa Đơn
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg font-semibold">
          Không có hóa đơn nào để hiển thị.
        </div>
      )}
    </div>
  );
};

export default HoaDon;
