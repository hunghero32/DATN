import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BaiVietHeader = () => {
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
    <div className="container mx-auto p-6 mb-4">
      <h2 className="text-3xl font-bold text-center mt-4 mb-2">Blog và Tin tức</h2>
      <p className="text-center text-gray-600 mb-8">Trang tin tức hàng đầu mang đến thông tin mới nhất, chính xác và đa chiều</p>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {articles.length > 0 && (
          <>
            <div className="md:col-span-8">
              <Link to={`/bai-viet/${articles[0].slug}/${articles[0].id}`} className="block group">
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="inline-block px-4 py-1 mb-3 text-sm text-white bg-blue-600 rounded-full">
                      {articles[0].category?.name}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{articles[0].title}</h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <span>{articles[0].user?.name}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(articles[0].created_at).toLocaleDateString('vi-VN')}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {articles[0].views}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="md:col-span-4 grid gap-6">
              {articles.slice(1, 3).map((article) => (
                <Link key={article.id} to={`/bai-viet/${article.slug}/${article.id}`} className="block group">
                  <div className="relative h-[180px] rounded-xl overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="inline-block px-3 py-1 mb-2 text-xs text-white bg-blue-600 rounded-full">
                        {article.category?.name}
                      </span>
                      <h3 className="text-sm font-semibold text-white">{article.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.slice(3).map((article) => (
          <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <Link to={`/bai-viet/${article.slug}/${article.id}`} className="block group">
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">
                    {article.category?.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(article.created_at).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{article.user?.name}</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {article.views}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaiVietHeader;
