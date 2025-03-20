import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../ultils/api/axios";

const ChiTietBaiViet = () => {
  const { slug, id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await api.get(`/api/client/detail-post/${slug}-${id}`);
        console.log("API Response:", response); // Debug response

        if (response.data && Object.keys(response.data).length > 0) {
          setArticle(response.data);
        } else {
          setError("Không có dữ liệu bài viết.");
        }
      } catch (error) {
        console.error("Chi tiết lỗi:", error.response || error);
        setError(
          error.response?.data?.message || 
          "Không thể tải chi tiết bài viết. Vui lòng thử lại."
        );
      } finally {
        setLoading(false);
      }
    };
  
    if (slug && id) {
      fetchArticleDetail();
    } else {
      setError("URL không hợp lệ");
      setLoading(false);
    }
  }, [slug, id]);

  // Add debug output
  useEffect(() => {
    console.log("Current article state:", article);
  }, [article]);

  if (loading) return <p className="text-center text-gray-500">Đang tải chi tiết bài viết...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!article) return <p className="text-center text-gray-500">Không có bài viết này.</p>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {article.category?.name || "Chưa phân loại"}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>

        <div className="flex items-center text-gray-600 mb-6">
          <div className="mr-6">
            <span className="font-medium">Tác giả:</span> {article.user?.name || "Không rõ"}
          </div>
          <div>
            <span className="font-medium">Ngày đăng:</span> {formatDate(article.published_at)}
          </div>
        </div>

        <div className="prose max-w-none text-gray-700">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{article.views || 0} lượt xem</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiTietBaiViet;
