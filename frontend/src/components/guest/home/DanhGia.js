import React, { useEffect, useState } from "react";
import api from "../../../ultils/api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusColor = {
  approved: "text-green-600",
  pending: "text-yellow-500",
  rejected: "text-red-500",
};

export default function DanhGia() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchFeedbacks(currentPage);
  }, [currentPage]);

  const fetchFeedbacks = async (page) => {
    try {
      const res = await api.get(`/api/feedbacks?page=${page}`);
      const activeFeedbacks = res.data.data.filter((fb) => fb.isDeleted !== 1);
      setFeedbacks(activeFeedbacks);
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        next_page_url: res.data.next_page_url,
        prev_page_url: res.data.prev_page_url,
      });
    } catch (error) {
      toast.error("Không thể tải danh sách đánh giá.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này không?")) {
      try {
        const res = await api.delete(`/api/client/feedbacks/${id}`);
        if (res.data.status) {
          toast.success("Xóa feedback thành công!");
          await fetchFeedbacks(currentPage);
        } else {
          toast.error(res.data.message || "Xóa không thành công.");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi xóa đánh giá.");
        console.error("Delete error:", error);
      }
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ToastContainer position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Đánh giá từ khách hàng</h2>

      {feedbacks.map((fb) => (
        <div
          key={fb.id}
          className="border rounded-xl p-4 mb-4 shadow-sm bg-white"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < fb.rating ? "⭐" : "☆"}</span>
              ))}
            </div>
            <span className={`${statusColor[fb.status]} text-sm font-semibold`}>
              {fb.status === "approved"
                ? "Đã duyệt"
                // : fb.status === "pending"
                // ? "Chờ duyệt"
                : "Đã duyệt"}
            </span>
          </div>
          <p className="text-gray-700 italic">"{fb.comments}"</p>
          <button
            className="text-red-600 text-sm mt-2 underline"
            onClick={() => handleDelete(fb.id)}
          >
            Xóa
          </button>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={!pagination.prev_page_url}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &laquo; Trước
        </button>
        {Array.from({ length: pagination.last_page }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={!pagination.next_page_url}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Sau &raquo;
        </button>
      </div>
    </div>
  );
}
