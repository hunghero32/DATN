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
    <div className="container mx-auto p-6 mb-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 mt-4 mb-6">Danh Sách Bài Viết</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {articles.map((article) => (
 <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition duration-300">
 <Link to={`/bai-viet/${article.slug}/${article.id}`} className="flex flex-col h-full">
   
   {/* Ảnh bài viết */}
   <div className="h-48 w-full overflow-hidden">
     <img
       src={article.image || "https://via.placeholder.com/400x300?text=No+Image"}
       alt={article.title}
       className="w-full h-full object-cover object-center"
     />
   </div>

   {/* Nội dung */}
   <div className="p-4 flex flex-col flex-1">
     <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
       {article.title}
     </h3>
     <div
       className="text-gray-600 text-sm flex-1 mb-4 line-clamp-3"
       dangerouslySetInnerHTML={{ __html: article.content || "Không có mô tả" }}
     />
     <span className="text-blue-600 hover:text-blue-700 transition mt-auto">
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
