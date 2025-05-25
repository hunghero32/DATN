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

  // if (loading) return <p className="text-center text-gray-500 text-xl py-8">Đang tải bài viết...</p>;
  if (error) return <p className="text-center text-red-500 text-xl py-8">{error}</p>;
  // if (!articles.length) return <p className="text-center text-gray-500 text-xl py-8">Không có bài viết nào.</p>;

  return (
    <div className="container mx-auto p-6 mb-4">
      <h2 className="text-3xl font-bold text-center mb-2">Blog và Tin tức</h2>
      <p className="text-center text-gray-600 mb-8">Trang tin tức hàng đầu mang đến thông tin mới nhất, chính xác và đa chiều, được biên tập bởi đội ngũ giàu kinh nghiệm</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300">
            <Link to={`/bai-viet/${article.slug}/${article.id}`} className="block">
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-blue-100 rounded-lg px-3 py-1">
                    <span className="text-sm text-blue-600">{article.category?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(article.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-3 line-clamp-2 hover:text-blue-600">
                  {article.title}
                </h3>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {article.user?.name}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {article.views}
                  </div>
                </div>

                <div
                  className="text-gray-600 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaiViet;
