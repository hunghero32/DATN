import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../ultils/api/axios";

const BaiViet = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get("/api/client/home");
        if (response.data && response.data.posts) {
          setArticles(response.data.posts);
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

  if (loading) return <p className="text-center text-gray-500">Đang tải bài viết...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!articles.length) return <p className="text-center text-gray-500">Không có bài viết nào.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Danh Sách Bài Viết</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <Link to={`/chitietbaiviet/${article.slug}-${article.id}`} className="block">
              <img
                src={article.image || "https://via.placeholder.com/300x200"}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: article.content || "Không có mô tả" }}
                ></p>
                <Link
                  to={`/chitietbaiviet/${article.id}`}
                  className="text-blue-600 hover:text-blue-700 transition"
                >
                  Xem thêm
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaiViet;
