import React from 'react';


const HistoryDoctor = () => {
  const historyData = [
    { id: 1, patientName: 'Nguyễn Văn A', date: '2025-03-01', diagnosis: 'Cảm cúm', treatment: 'Thuốc kháng sinh', status: 'Đã hoàn thành' },
    { id: 2, patientName: 'Trần Thị B', date: '2025-03-02', diagnosis: 'Viêm họng', treatment: 'Thuốc kháng sinh', status: 'Chưa hoàn thành' },
    { id: 3, patientName: 'Lê Văn C', date: '2025-03-03', diagnosis: 'Sốt xuất huyết', treatment: 'Nhập viện', status: 'Đã hoàn thành' }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lịch Sử Khám</h2>
      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Tên Bệnh Nhân</th>
            <th>Ngày Khám</th>
            <th>Chẩn Đoán</th>
            <th>Phương Pháp Điều Trị</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.patientName}</td>
              <td>{record.date}</td>
              <td>{record.diagnosis}</td>
              <td>{record.treatment}</td>
              <td>
                <span className={`badge ${record.status === 'Đã hoàn thành' ? 'bg-success' : 'bg-warning'}`}>
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

export default HistoryDoctor;

