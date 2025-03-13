import { useState, useEffect } from "react";

const SpecialtyIntro = ({ specialty }) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">{specialty.name}</h2>
      <h3 className="text-lg font-semibold text-gray-700 mt-2">Chuyên khoa</h3>
      <p className="text-gray-600 mt-2">{specialty.description}</p>
      <img
        src={specialty.image}
        alt={specialty.name}
        className="w-full h-60 object-cover rounded-md mt-4"
      />
      <a href="#" className="text-blue-600 mt-4 inline-block hover:underline">
        Xem thêm
      </a>
    </div>
  );
};

const DoctorCard = ({ doctor }) => {
  return (
    <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg flex items-center">
      <div className="flex-shrink-0">
        <img
          src={doctor.doctor_avatar}
          alt="Bác sĩ"
          className="w-20 h-20 rounded-full object-cover"
        />
        <a href="#" className="text-red-500 text-sm mt-2 block hover:underline">
          Xem thêm
        </a>
      </div>

      <div className="ml-4 flex flex-col justify-center">
        <div className="flex items-center space-x-2">
          <span className="bg-yellow-400 text-white px-2 py-1 text-xs font-bold rounded-md">
            Yêu thích
          </span>
          <h3 className="text-blue-900 font-bold text-lg uppercase">
            {doctor.doctor_name}
          </h3>
        </div>
        <p className="text-gray-600 text-sm mt-1">{doctor.doctor_bio}</p>
        <p className="text-gray-600 text-sm">
          {doctor.exp} năm kinh nghiệm
        </p>
        <p className="text-gray-600 text-sm">Nhận khám từ 7 tuổi trở lên.</p>
        <p className="text-red-500 text-sm font-semibold mt-2">📍 Hà Nội</p>
      </div>
    </div>
  );
};

const DoctorBooking = ({ schedules }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-blue-900 mb-2">Đặt Lịch Khám</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {schedules.map((schedule) => (
          <button
            key={schedule.id}
            className={`px-3 py-2 rounded-md text-sm transition duration-200 ${
              selectedTime === schedule.time_start
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => setSelectedTime(schedule.time_start)}
          >
            {schedule.time_start} - {schedule.time_end}
          </button>
        ))}
      </div>
      <p className="text-green-600 text-lg font-bold mt-2">500.000đ</p>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition"
        disabled={!selectedTime}
      >
        {selectedTime ? `Đặt lịch (${selectedTime})` : "Chọn giờ để đặt lịch"}
      </button>
    </div>
  );
};

const ChiTietDatLich = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/client/detail-specialty-2");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  if (error) return <div>Error loading data: {error}</div>;
  if (!data) return <div>Loading...</div>;

  const { specialty, doctors } = data;
  const doctor = doctors[0]; // Assuming we have one doctor for simplicity
  const schedules = doctor.schedules;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg">
      <SpecialtyIntro specialty={specialty} />
      <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
        <DoctorCard doctor={doctor} />
        <DoctorBooking schedules={schedules} />
      </div>
    </div>
  );
};

export default ChiTietDatLich;
