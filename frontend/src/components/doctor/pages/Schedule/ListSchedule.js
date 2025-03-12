import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import AddSchedule from "./AddSchedule";

const ListSchedule = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [schedules, setSchedules] = useState([]);  // Lưu danh sách lịch làm việc
    const [loading, setLoading] = useState(true);  // Trạng thái loading
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem("user")) || null; // Lấy user từ localStorage

    useEffect(() => {
        const fetchSchedules = async () => {
            if (!user) return; // Nếu chưa đăng nhập thì không gọi API
    
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:8000/api/schedules");
                console.log("Raw API Response:", response.data); // Kiểm tra dữ liệu API trả về
    
                if (Array.isArray(response.data)) {
                    setSchedules(response.data); // Nếu là mảng thì set
                } else {
                    setSchedules([]); // Nếu không phải mảng thì gán mảng rỗng
                }
            } catch (err) {
                setError("Lỗi khi tải dữ liệu!");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchSchedules();
    }, []);
    

    const userSchedules = useMemo(() => {
        return user ? schedules.filter((s) => s.doctor_id === user.id) : [];
    }, [schedules, user]);

    const toggleModal = () => setIsOpen(!isOpen);

    if (!user) {
        return <div className="text-center mt-5 text-danger">Bạn cần đăng nhập để xem lịch làm việc.</div>;
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Lịch Làm Việc Bác Sĩ</h2>
                <button className="btn btn-primary" onClick={toggleModal}>
                    Thêm Lịch Làm Việc
                </button>
            </div>

            {isOpen && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thêm Lịch Làm Việc</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <AddSchedule modal={toggleModal} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="bg-primary text-white text-center">
                        <tr>
                            <th>Ngày Làm Việc</th>
                            <th>Số Bệnh Nhân Tối Đa</th>
                            <th>Giờ Bắt Đầu</th>
                            <th>Giờ Kết Thúc</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {loading ? (
                            <tr><td colSpan="5">Đang tải dữ liệu...</td></tr>
                        ) : error ? (
                            <tr><td colSpan="5" className="text-danger">{error}</td></tr>
                        ) : userSchedules.length > 0 ? (
                            userSchedules.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.working_date}</td>
                                    <td>{s.max_patients}</td>
                                    <td>{s.time_start}</td>
                                    <td>{s.time_end}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2">Sửa</button>
                                        <button className="btn btn-danger btn-sm">Xóa</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">Không có lịch làm việc nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListSchedule;
