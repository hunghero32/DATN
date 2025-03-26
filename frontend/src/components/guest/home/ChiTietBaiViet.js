import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../ultils/api/axios";

const ChiTietBaiViet = () => {
  const { slug } = useParams();  // ✅ Lấy slug từ URL
    console.log("Slug:", slug); // Kiểm tr
  const { id  } = useParams(); // Lấy id từ URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/api/client/detail-post/${slug}`);
        if (response.data) {
          setArticle(response.data);
        } else {
          setError("Bài viết không tồn tại.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        setError("Không thể tải bài viết. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">{article.title}</h1>
      <img src={article.image || "https://via.placeholder.com/800x400"} alt={article.title} className="w-full h-auto mb-6 rounded-lg shadow-lg" />
      <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }}></div>
    </div>
  );
};

export default ChiTietBaiViet;
