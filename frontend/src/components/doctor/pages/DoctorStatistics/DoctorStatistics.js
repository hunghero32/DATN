import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const DoctorStatistics = () => {
  const data = {
    labels: ['Khám tổng quát', 'Khám tai mũi họng', 'Khám nội tiết'],
    datasets: [
      {
        label: 'Số lượng bệnh nhân',
        data: [30, 20, 15],
        backgroundColor: ['#007bff', '#28a745', '#dc3545'],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống Kê Số Lượng Bệnh Nhân Theo Dịch Vụ',
      },
    },
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Thống Kê Bệnh Nhân</h2>
      <div className="card p-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DoctorStatistics;
