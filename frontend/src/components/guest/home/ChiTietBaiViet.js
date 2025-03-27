import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ChiTietBaiViet = () => {
    const { slug, id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug || !id) {
            setError("Thiếu slug hoặc id trong URL");
            return;
        }

        axios.get(`http://localhost:8000/api/client/detail-post/${slug}-${id}`)
            .then(response => {
                console.log('API Response:', response.data);
                setPost(response.data);
            })
            .catch(error => {
                setError(error.response?.data?.message || "Không thể tải bài viết. Vui lòng thử lại.");
                console.error("Lỗi API:", error);
            });
    }, [slug, id]);

    if (error) return (
        <div className="container mx-auto p-6">
            <p className="text-red-500 text-center text-xl">{error}</p>
        </div>
    );
    
    if (!post) return (
        <div className="container mx-auto p-6">
            <p className="text-gray-500 text-center text-xl">Đang tải...</p>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {post.image && (
                    <div className="w-full h-96 relative">
                        <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                        {post.category && (
                            <span>Danh mục: {post.category.name}</span>
                        )}
                        {post.created_at && (
                            <span>Ngày đăng: {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                        )}
                        <span>Lượt xem: {post.views}</span>
                    </div>
                    {post.user && (
                        <div className="mb-6">
                            <p className="text-gray-700">Tác giả: {post.user.name}</p>
                        </div>
                    )}
                    <div 
                        className="prose max-w-none prose-lg prose-blue"
                        dangerouslySetInnerHTML={{ 
                            __html: post.content || 'Không có nội dung' 
                        }}
                    />
                </div>
            </article>
        </div>
    );
};

export default ChiTietBaiViet;
