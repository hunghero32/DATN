import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedules } from "../../../../features/slices/scheduleSlice";
import AddSchedule from "./AddSchedule";

/**
 * Hiển thị danh sách lịch làm việc bác sĩ, bao gồm:
 * + Danh sách lịch làm việc
 * + Nút thêm lịch làm việc
 * + Modal thêm lịch làm việc
 * 
 * @returns 
 */
const ListSchedule = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { schedules } = useSelector((state) => state.schedule);


    useEffect(() => {
        dispatch(fetchSchedules());
    }, [dispatch]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Lịch Làm Việc Bác Sĩ</h2>
                <button className="btn btn-primary" onClick={toggleModal}>Thêm Lịch Làm Việc</button>
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
                            <th>ID Bác Sĩ</th>
                            <th>Ngày Làm Việc</th>
                            <th>Số Bệnh Nhân Tối Đa</th>
                            <th>Tên Bác Sĩ</th>
                            <th>Giờ Bắt Đầu</th>
                            <th>Giờ Kết Thúc</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {schedules.data?.length > 0 ? schedules.data.map((s) => (
                            <tr key={s.id}>
                                <td>{s.doctor_id}</td>
                                <td>{s.working_date}</td>
                                <td>{s.max_patients}</td>
                                <td>{s.doctor_name}</td>
                                <td>{s.time_start}</td>
                                <td>{s.time_end}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2">Sửa</button>
                                    <button className="btn btn-danger btn-sm">Xóa</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" className="text-center">Không có lịch làm việc nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListSchedule;
