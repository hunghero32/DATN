import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../ultils/api/axios";

const ChiTietBaiViet = () => {
  const { slug, id } = useParams(); // Lấy slug và id từ URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/client/detail-post/${id}`);
        if (response.data && response.data.post) {
          setPost(response.data.post);
        } else {
          setError("Không tìm thấy bài viết.");
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
        setError("Không thể tải bài viết. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, id]);

  if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!post) return <p className="text-center text-gray-500">Không có dữ liệu bài viết.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">{post.title}</h1>
      <p className="text-gray-500 mb-2">
        {post.published_at ? new Date(post.published_at).toLocaleDateString("vi-VN") : "Không rõ ngày đăng"}
      </p>
      <img
        src={post.image || "https://via.placeholder.com/800x400"}
        alt={post.title}
        className="w-full h-96 object-cover rounded-lg shadow-md my-4"
      />
      <div className="text-gray-700 leading-relaxed">
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        ) : (
          <p>Không có nội dung.</p>
        )}
      </div>
    </div>
  );
};

export default ChiTietBaiViet;
