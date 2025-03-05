import React from "react";

// Dữ liệu phòng khám
const clinicData = {
  name: "Phòng Khám Đa Khoa Quốc Tế",
  address: "123 Đường Lê Văn Sỹ, Quận 3, TP.HCM",
  phone: "028-1234-5678",
  email: "info@phongkhamquocte.com",
  image: "https://via.placeholder.com/600x350",
  description:
    "Phòng Khám Đa Khoa Quốc Tế cung cấp dịch vụ chăm sóc sức khỏe chất lượng cao với đội ngũ bác sĩ chuyên môn hàng đầu.",
  services: [
    "Khám Nội tổng quát",
    "Khám Nha khoa",
    "Khám Da liễu",
    "Khám Sản - Phụ khoa",
  ],
  reasons: [
    "Đội ngũ bác sĩ chuyên môn cao, giàu kinh nghiệm.",
    "Trang thiết bị y tế hiện đại, tiên tiến.",
    "Dịch vụ chăm sóc khách hàng tận tình.",
    "Đặt lịch khám dễ dàng, nhanh chóng.",
  ],
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.469903499783!2d106.6799833145897!3d10.77659999232185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3f3cdb0b23%3A0xf3b2a84ea0e6a7ed!2zMTIzIMSQLiBMw6ogVsSDbiBT4bq_LCBQcC5RdS4gMywgVGjDoG5oIFBIw6ogTUluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1616573620015!5m2!1sen!2s",
};

// Danh sách đội ngũ bác sĩ
const doctors = [
  { name: "TS. Nguyễn Văn A", specialty: "Nội tổng quát", avatar: "https://picsum.photos/100?random=1" },
  { name: "BS. Trần Thị B", specialty: "Nha khoa", avatar: "https://picsum.photos/100?random=2" },
  { name: "PGS. Lê Văn C", specialty: "Da liễu", avatar: "https://picsum.photos/100?random=3" },
  { name: "TS. Phạm Minh D", specialty: "Sản - Phụ khoa", avatar: "https://picsum.photos/100?random=4" },
];

const ClinicDetail = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Tiêu đề */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{clinicData.name}</h1>
        <p className="text-lg text-gray-500">{clinicData.description}</p>
      </div>

      {/* Hình ảnh phòng khám */}
      <div className="text-center mb-8">
        <img src={clinicData.image} alt="Phòng khám" className="mx-auto rounded-lg shadow-lg w-full max-w-3xl" />
      </div>

      {/* Thông tin liên hệ */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📍 Thông tin liên hệ</h2>
        <p className="text-gray-600"><strong>Địa chỉ:</strong> {clinicData.address}</p>
        <p className="text-gray-600"><strong>Điện thoại:</strong> {clinicData.phone}</p>
        <p className="text-gray-600"><strong>Email:</strong> {clinicData.email}</p>
      </div>

      {/* Danh sách dịch vụ */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">💉 Dịch vụ chính</h2>
        <ul className="list-disc list-inside text-gray-600">
          {clinicData.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      {/* Đội ngũ bác sĩ */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">👨‍⚕️ Đội ngũ bác sĩ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <img src={doctor.avatar} alt={doctor.name} className="w-24 h-24 rounded-full mb-3 border-2 border-gray-300" />
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              <p className="text-gray-500">{doctor.specialty}</p>
              <div className="flex gap-3 mt-3">
                <a href="#" className="text-blue-500 text-xl"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-blue-500 text-xl"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-blue-500 text-xl"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lý do chọn phòng khám */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">✅ Lý do nên chọn chúng tôi</h2>
        <ul className="list-disc list-inside text-gray-600">
          {clinicData.reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>

      {/* Google Maps */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🗺️ Vị trí trên bản đồ</h2>
        <iframe
          src={clinicData.googleMapsEmbed}
          width="100%"
          height="300"
          className="rounded-lg shadow-md"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ClinicDetail;
