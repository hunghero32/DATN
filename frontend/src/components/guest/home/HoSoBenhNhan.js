import React from "react";

const patientData = {
  id: "123456",
  name: "Nguyễn Văn A",
  gender: "Nam",
  address: "123 Đường Lê Lai, Quận 1, TP.HCM",
  notes: "Bệnh nhân có tiền sử cao huyết áp.",
  phone: "0123456789",
  email: "nguyenvana@gmail.com",
  avatar: "https://via.placeholder.com/150", 
  pdfFile: "/path/to/file.pdf",
};

const PatientProfile = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Hồ Sơ Bệnh Nhân</h1>
        <p className="text-lg text-gray-500">Thông tin chi tiết về bệnh nhân và hồ sơ y tế.</p>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col md:flex-row mb-6">
        <div className="flex-none mb-6 md:mb-0 md:w-1/4">
          <img
            src={patientData.avatar}
            alt={patientData.name}
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-300"
          />
        </div>

        <div className="md:ml-6 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">{patientData.name}</h2>
          <div className="space-y-3 mt-4">
            <p className="text-gray-600"><strong>ID:</strong> {patientData.id}</p>
            <p className="text-gray-600"><strong>Giới tính:</strong> {patientData.gender}</p>
            <p className="text-gray-600"><strong>Địa chỉ:</strong> {patientData.address}</p>
            <p className="text-gray-600"><strong>Số điện thoại:</strong> {patientData.phone}</p>
            <p className="text-gray-600"><strong>Email:</strong> {patientData.email}</p>
            <p className="text-gray-600"><strong>Ghi chú:</strong> {patientData.notes}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a
          href={patientData.pdfFile}
          className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tải hồ sơ PDF
        </a>
      </div>
    </div>
  );
};

export default PatientProfile;
