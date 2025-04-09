import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ChiTietBaiViet = () => {
    const { slug, id } = useParams();
    console.log("🧭 useParams:", { slug, id });
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const url = `http://localhost:8000/api/client/bai-viet/${slug}/${id}`;
                const response = await axios.get(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
    
                console.log('Dữ liệu từ API:', response.data);  // Log dữ liệu API
    
                if (response.data) {
                    setPost(response.data);
                } else {
                    throw new Error('Không nhận được dữ liệu từ API');
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                setError('Không thể tải bài viết. Vui lòng thử lại.');
            }
        };
    
        if (slug && id) {
            fetchPost();
        }
    }, [slug, id]);
    

    // Hiển thị lỗi
    if (error) return (
        <div className="container mx-auto p-6">
            <p className="text-red-500 text-center text-xl">{error}</p>
        </div>
    );

    // Đang tải
    if (!post) return (
        <div className="container mx-auto p-6">
            <p className="text-gray-500 text-center text-xl">Đang tải...</p>
        </div>
    );

    // Hiển thị bài viết
    return (
        <div className="container mx-auto p-6 mt-4 mb-4">
            <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Ảnh đại diện */}
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

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                        {post.category?.name && (
                            <span>Danh mục: {post.category.name}</span>
                        )}
                        {post.created_at && (
                            <span>
                                Ngày đăng: {new Date(post.created_at).toLocaleDateString('vi-VN')}
                            </span>
                        )}
                        <span>Lượt xem: {post.views}</span>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-700">
                            Tác giả: {post.user?.name || "Không rõ"}
                        </p>
                    </div>

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
