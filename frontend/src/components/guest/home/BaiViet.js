import React from "react";

const articles = [
  {
    title: "7 bác sĩ Tiêu hóa giỏi và uy tín ở TP.HCM (Phần 1)",
    description: "Danh sách bác sĩ Tiêu hóa giỏi và uy tín tại TP.HCM, giúp bạn tìm được bác sĩ tốt.",
    image: "https://via.placeholder.com/300x200",
    link: "#",
  },
  {
    title: "Tiêm cằm bao nhiêu tiền? Chi phí tiêm cằm tại Top địa chỉ uy tín",
    description: "Tiêm cằm bao nhiêu tiền và các địa chỉ uy tín tại TP.HCM, giúp bạn có cái nhìn rõ hơn.",
    image: "https://via.placeholder.com/300x200",
    link: "#",
  },
  {
    title: "Top 6 spa massage chuẩn Đông y uy tín, nhiều review tốt",
    description: "Khám phá top 6 spa massage chuẩn Đông y uy tín tại Hà Nội, giúp bạn thư giãn và làm đẹp.",
    image: "https://via.placeholder.com/300x200",
    link: "#",
  },
  {
    title: "Liệu trình tắm trắng giá bao nhiêu? Tham khảo chi phí tắm trắng",
    description: "Cập nhật giá tắm trắng tại các cơ sở làm đẹp uy tín, giúp bạn dễ dàng lựa chọn.",
    image: "https://via.placeholder.com/300x200",
    link: "#",
  },
  {
    title: "Lập kế hoạch bữa ăn cho người bệnh tiểu đường",
    description: "Cách lập kế hoạch bữa ăn khoa học cho người mắc bệnh tiểu đường, giúp cải thiện sức khỏe.",
    image: "https://via.placeholder.com/300x200",
    link: "#",
  },
  {
    title: "Tiêm filler mới là gì? Những điều cần biết khi tiêm filler môi",
    description: "Cập nhật những thông tin cơ bản về tiêm filler môi và các lợi ích khi sử dụng dịch vụ này.",
    image: "https://via.placeholder.com/300x200",
    link: "#",
  },
];

const ArticleList = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Danh Sách Bài Viết</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <a
                href={article.link}
                className="text-blue-600 hover:text-blue-700 transition"
              >
                Xem thêm
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
