import React from "react";

const specialties = [
  {
    name: "Chuyên khoa Nội tổng quát",
    image: "https://picsum.photos/100/100?random=1",
  },
  {
    name: "Chuyên khoa Da liễu",
    image: "https://picsum.photos/100/100?random=2",
  },
  {
    name: "Chuyên khoa Nha khoa",
    image: "https://picsum.photos/100/100?random=3",
  },
  {
    name: "Chuyên khoa Xương",
    image: "https://picsum.photos/100/100?random=3",
  },
];

const SpecialtiesSection = () => {
  return (
    <div className="container mx-auto p-6 text-center">
        <h2 className="text-4xl font-bold text-blue-600">🏥 Danh Sách Chuyên Khoa</h2> <br/>
      <div className="flex justify-center gap-6">
        {specialties.map((specialty, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 w-72 flex items-center hover:scale-105 transition-transform"
          >
            <img
              src={specialty.image}
              alt={specialty.name}
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
       <h5 className="text-xs font-serif text-gray-700 text-left">{specialty.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtiesSection;