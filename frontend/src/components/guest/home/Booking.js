import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const servicesData = [
  {
    id: 1,
    title: "Khám Chuyên khoa",
    description: "Khám các bệnh lý chuyên khoa.",
    doctors: [
      {
        name: "Bác sĩ Chuyên khoa I Trần Thị Mỹ Nga",
        avatar: "https://picsum.photos/80", 
        workingHours: "08:00 - 17:00 (Thứ 2 - Thứ 6)",
        price: "500,000 VND",
        address: "Bệnh viện Y Dược TP.HCM",
        schedule: ["08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00"],
      },
      {
        name: "Bác sĩ Chuyên khoa II Nguyễn Minh Tâm",
        avatar: "https://picsum.photos/80", 
        workingHours: "09:00 - 17:00 (Thứ 2 - Thứ 6)",
        price: "550,000 VND",
        address: "Bệnh viện Đa Khoa Hòa Bình",
        schedule: ["10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00"],
      },
    ],
  },
  {
    id: 2,
    title: "Khám tổng quát",
    description: "Khám sức khỏe tổng quát định kỳ.",
    doctors: [
      {
        name: "Bác sĩ Chuyên khoa I Nguyễn Minh Tâm",
        avatar: "https://picsum.photos/80", 
        workingHours: "08:00 - 17:00 (Thứ 2 - Thứ 6)",
        price: "300,000 VND",
        address: "Bệnh viện Đa Khoa Hòa Bình",
        schedule: ["08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30"],
      },
    ],
  },
];

const Booking = () => {
  const { serviceId } = useParams(); // Lấy ID dịch vụ từ URL
  const [service, setService] = useState(null);

  useEffect(() => {
    const selectedService = servicesData.find((service) => service.id === parseInt(serviceId));
    setService(selectedService);
  }, [serviceId]);

  if (!service) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center">{service.title}</h2>
      <p className="text-center text-gray-600 mb-6">{service.description}</p>

      {service.doctors.map((doctor, index) => (
        <div key={index} className="flex justify-between items-center mb-8 p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">Giờ làm việc: {doctor.workingHours}</p>
              <p className="text-gray-600">Giá khám: {doctor.price}</p>
              <p className="text-gray-600">Địa chỉ khám: {doctor.address}</p>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold mb-2">Chọn lịch khám</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {doctor.schedule.map((time, idx) => (
                <button
                  key={idx}
                  className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition">
        Đặt lịch khám
      </button>
    </div>
  );
};

export default Booking;
