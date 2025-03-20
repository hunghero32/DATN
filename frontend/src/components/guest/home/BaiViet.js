import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../ultils/api/axios";

const BaiViet = () => {
  const [articles, setArticles] = useState([]); // State để lưu danh sách bài viết
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const navigate = useNavigate();  // Sử dụng useNavigate để chuyển hướng đến chi tiết bài viết

  // Gọi API để lấy bài viết
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get("/api/client/home");
        if (response.data && response.data.posts) {
          setArticles(response.data.posts);  // Lưu danh sách bài viết vào state
        } else {
          setError("Không có bài viết nào.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bài viết:", error);
        setError("Không thể tải bài viết. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Nếu đang tải, hiển thị loading
  if (loading) return <p className="text-center text-gray-500">Đang tải bài viết...</p>;

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Nếu không có bài viết, hiển thị thông báo
  if (!articles || articles.length === 0) return <p className="text-center text-gray-500">Không có bài viết nào.</p>;

  // Chuyển hướng đến trang chi tiết bài viết
  const handleArticleClick = (slug, id) => {
    const url = `/chitietbaiviet/${slug}-${id}`;
    console.log("Navigating to:", url);  // Kiểm tra URL
    navigate(url);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Danh Sách Bài Viết
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
  <div
    key={article.id}
    className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
    onClick={() => handleArticleClick(article.slug, article.id)}  // Truyền cả slug và id
  >
    <img
      src={article.image || "https://via.placeholder.com/300x200"}
      alt={article.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
      <p className="text-gray-600 mb-4">{article.content || article.description || "Không có mô tả"}</p>
      <a
        href="#"
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

export default BaiViet;
