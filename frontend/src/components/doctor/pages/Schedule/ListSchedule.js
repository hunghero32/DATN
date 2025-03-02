import React from 'react'

const ListSchedule = () => {
    return (
        <div>
            <div className="container mt-5">
                <h2 className="text-center text-primary mb-4">Lịch Làm Việc Bác Sĩ</h2>
                <div className="card shadow">
                    <div className="card-header bg-primary text-white text-center">
                        <h4>Quản lý lịch làm việc</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Ngày Làm Việc</label>
                                <input type="date" className="form-control" id="date" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startTime" className="form-label">Giờ Bắt Đầu</label>
                                <input type="time" className="form-control" id="startTime" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endTime" className="form-label">Giờ Kết Thúc</label>
                                <input type="time" className="form-control" id="endTime" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="maxPatients" className="form-label">Số Lượng Bệnh Nhân Tối Đa</label>
                                <input type="number" className="form-control" id="maxPatients" required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Lưu Lịch Làm Việc</button>
                        </form>
                    </div>
                </div>
                <div className="mt-5">
                    <h4 className="text-center mb-3">Danh Sách Lịch Làm Việc</h4>
                    <table className="table table-striped table-bordered">
                        <thead className="bg-primary text-white text-center">
                            <tr>
                                <th>Ngày Làm Việc</th>
                                <th>Giờ Bắt Đầu</th>
                                <th>Giờ Kết Thúc</th>
                                <th>Số Lượng Tối Đa</th>
                                <th>Trạng Thái</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr>
                                <td>2025-03-05</td>
                                <td>08:00</td>
                                <td>12:00</td>
                                <td>10</td>
                                <td><span className="badge bg-success">Hoạt Động</span></td>
                                <td>
                                    <button className="btn btn-warning btn-sm">Chỉnh Sửa</button>
                                    <button className="btn btn-danger btn-sm">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListSchedule