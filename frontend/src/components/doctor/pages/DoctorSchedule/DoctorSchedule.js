import React from 'react';

const DoctorSchedule = () => {
  const scheduleData = [
    { id: 1, patientName: 'Nguyễn Văn A', date: '2025-03-10', time: '08:00 - 09:00', service: 'Khám tổng quát', status: 'Chưa khám' },
    { id: 2, patientName: 'Trần Thị B', date: '2025-03-11', time: '10:00 - 11:00', service: 'Khám tai mũi họng', status: 'Đã khám' },
    { id: 3, patientName: 'Lê Văn C', date: '2025-03-12', time: '14:00 - 15:00', service: 'Khám nội tiết', status: 'Chưa khám' }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Danh Sách Lịch Khám</h2>
      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Tên Bệnh Nhân</th>
            <th>Ngày Khám</th>
            <th>Giờ</th>
            <th>Dịch Vụ</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.patientName}</td>
              <td>{record.date}</td>
              <td>{record.time}</td>
              <td>{record.service}</td>
              <td>
                <span className={`badge ${record.status === 'Đã khám' ? 'bg-success' : 'bg-warning'}`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorSchedule;
