import React from 'react';

const NotificationPage = () => {
  const notifications = [
    { id: 1, message: 'Cuộc hẹn khám bệnh mới đã được đặt.', date: '2025-03-02' },
    { id: 2, message: 'Hồ sơ bệnh án đã được cập nhật.', date: '2025-03-01' },
    { id: 3, message: 'Bệnh nhân đã hủy cuộc hẹn.', date: '2025-02-29' }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Thông Báo</h2>
      <div className="card p-4">
        {notifications.length > 0 ? (
          <ul className="list-group">
            {notifications.map((notification) => (
              <li key={notification.id} className="list-group-item d-flex justify-content-between align-items-center">
                {notification.message}
                <span className="badge bg-primary rounded-pill">{notification.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">Không có thông báo nào.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
