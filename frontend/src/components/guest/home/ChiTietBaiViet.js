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
        <div className="container mx-auto p-6 mt-16 mb-8">
            <article className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>
                    
                    <div className="flex items-center gap-6 text-gray-600 mb-4">
                        {post.category?.name && (
                            <span className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                </svg>
                                {post.category.name}
                            </span>
                        )}
                        {post.published_at && (
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                {new Date(post.published_at).toLocaleDateString('vi-VN')}
                            </span>
                        )}
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            {post.views} lượt xem
                        </span>
                    </div>
                </div>

                {/* Featured Image */}
                {post.image && (
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-lg w-[800px] h-[400px] mx-auto relative group">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                )}

                {/* Author Info */}
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                                {post.user?.name.charAt(0)}
                            </div>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {post.user?.name}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>{post.user?.role === 'doctor' ? 'Bác sĩ' : 'Tác giả'}</span>
                                {post.user?.phone && (
                                    <span>• {post.user.phone}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="prose max-w-none prose-lg prose-blue prose-img:rounded-xl prose-headings:text-gray-900">
                    <div
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
