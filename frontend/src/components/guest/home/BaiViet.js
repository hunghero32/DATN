import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BaiViet = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/client/home");
        console.log('API Response:', response.data); 
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

  if (loading) return <p className="text-center text-gray-500 text-xl py-8">Đang tải bài viết...</p>;
  if (error) return <p className="text-center text-red-500 text-xl py-8">{error}</p>;
  if (!articles.length) return <p className="text-center text-gray-500 text-xl py-8">Không có bài viết nào.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Danh Sách Bài Viết</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link 
            to={`/bai-viet/${article.slug}/${article.id}`}
              className="block h-full"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={article.image || "https://via.placeholder.com/300x200"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {article.title}
                </h3>
                <div
                  className="text-gray-600 mb-4 line-clamp-3 prose"
                  dangerouslySetInnerHTML={{ 
                    __html: article.content || "Không có mô tả" 
                  }}
                />
                <span className="text-blue-600 hover:text-blue-700 transition inline-block">
                  Xem thêm
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaiViet;
