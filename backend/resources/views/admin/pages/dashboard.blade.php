@extends('admin.index')
@section('title', 'Thống kê')
@section('content')
<div class="container-fluid">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Bảng Điều Khiển</h1>
        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i class="fas fa-download fa-sm text-white-50"></i> Tạo Báo Cáo
        </a>
    </div>

    <!-- Statistics Cards -->
    <div class="row">
        <!-- Total Appointments Card -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Tổng Lịch Hẹn</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $totalAppointments }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Upcoming Appointments Card -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Lịch Hẹn Sắp Tới</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $upcomingAppointments }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar-check fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Completed Appointments Card -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                Lịch Hẹn Đã Hoàn Thành</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $completedAppointments }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-clipboard-check fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cancelled Appointments Card -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Lịch Hẹn Đã Hủy</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $cancelledAppointments }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar-times fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Second Row of Cards -->
    <div class="row">
        <!-- Total Patients Card -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Tổng Số Người Đăng Kí</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $totalPatients }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-users fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- New Patients This Month Card -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-danger shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                Bệnh Nhân Mới (Tháng Này)</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $newPatientsThisMonth }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user-plus fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Total Doctors Card -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Tổng Số Bác Sĩ</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $totalDoctors }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user-md fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Total Departments Card -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                Tổng Số Chuyên Khoa</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $totalDepartments }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-hospital fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Top Revenue Doctor Card -->
    <!-- Top Revenue Doctors Chart -->
<div class="row">
    <div class="col-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Doanh Thu Bác Sĩ ({{ date('Y') }})</h6>
                <div class="dropdown no-arrow">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                        aria-labelledby="dropdownMenuLink">
                        <div class="dropdown-header">Tùy Chọn Xuất:</div>
                        <a class="dropdown-item" href="#"><i class="fas fa-file-csv fa-sm fa-fw mr-2 text-gray-400"></i>CSV</a>
                        <a class="dropdown-item" href="#"><i class="fas fa-file-pdf fa-sm fa-fw mr-2 text-gray-400"></i>PDF</a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                @if(isset($topRevenueDoctors) && $topRevenueDoctors->isNotEmpty())
                    <div class="chart-container" style="position: relative; height:400px;">
                        <canvas id="allDoctorsRevenueChart"></canvas>
                    </div>
                @else
                    <div class="text-center py-4">
                        <i class="fas fa-user-md fa-4x text-gray-300 mb-3"></i>
                        <p class="text-muted">Chưa có dữ liệu doanh thu bác sĩ trong năm {{ date('Y') }}</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>

    <!-- Charts Row -->
    <div class="row">
        <!-- Monthly Appointments Chart -->
        <div class="col-xl-8 col-lg-7">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Lịch Hẹn Theo Tháng ({{ date('Y') }})</h6>
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">Tùy Chọn Xuất:</div>
                            <a class="dropdown-item" href="#"><i class="fas fa-file-csv fa-sm fa-fw mr-2 text-gray-400"></i>CSV</a>
                            <a class="dropdown-item" href="#"><i class="fas fa-file-pdf fa-sm fa-fw mr-2 text-gray-400"></i>PDF</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-area">
                        <canvas id="appointmentsMonthlyChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Appointments by Status Chart -->
        <div class="col-xl-4 col-lg-5">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Lịch Hẹn Theo Trạng Thái</h6>
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">Tùy Chọn Xuất:</div>
                            <a class="dropdown-item" href="#"><i class="fas fa-file-csv fa-sm fa-fw mr-2 text-gray-400"></i>CSV</a>
                            <a class="dropdown-item" href="#"><i class="fas fa-file-pdf fa-sm fa-fw mr-2 text-gray-400"></i>PDF</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-pie pt-4 pb-2">
                        <canvas id="appointmentsByStatusChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Third Row - Specialty and Top Doctors -->
    <div class="row">
        <!-- Appointments by Department Chart -->
        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Lịch Hẹn Theo Chuyên Khoa</h6>
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">Tùy Chọn Xuất:</div>
                            <a class="dropdown-item" href="#"><i class="fas fa-file-csv fa-sm fa-fw mr-2 text-gray-400"></i>CSV</a>
                            <a class="dropdown-item" href="#"><i class="fas fa-file-pdf fa-sm fa-fw mr-2 text-gray-400"></i>PDF</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-pie pt-4 pb-2">
                        <canvas id="appointmentsByDepartmentChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Top Doctors -->
        <div class="col-xl-6 col-lg-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Bác Sĩ Hàng Đầu</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Tên Bác Sĩ</th>
                                    <th>Số Lịch Hẹn</th>
                                    <th>Tiến Độ</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($topDoctors as $doctor)
                                <tr>
                                    <td>{{ $doctor->doctor_name }}</td>
                                    <td>{{ $doctor->appointment_count }}</td>
                                    <td>
                                        <div class="progress progress-sm mr-2">
                                            @php
                                                $percentage = $totalAppointments > 0 ? ($doctor->appointment_count / $totalAppointments) * 100 : 0;
                                                $color = 'primary';
                                                if ($percentage > 75) $color = 'success';
                                                elseif ($percentage > 50) $color = 'info';
                                                elseif ($percentage > 25) $color = 'warning';
                                                else $color = 'danger';
                                            @endphp
                                            <div class="progress-bar bg-{{ $color }}" role="progressbar"
                                                style="width: {{ $percentage }}%"
                                                aria-valuenow="{{ $percentage }}" aria-valuemin="0"
                                                aria-valuemax="100"></div>
                                        </div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Appointments Table -->
    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Lịch Hẹn Gần Đây</h6>
            <a href="#" class="btn btn-sm btn-primary shadow-sm">
                <i class="fas fa-eye fa-sm text-white-50"></i> Xem Tất Cả
            </a>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Bệnh Nhân</th>
                            <th>Bác Sĩ</th>
                            <th>Ngày</th>
                            <th>Giờ</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($recentAppointments as $appointment)
                        <tr>
                            <td>{{ $appointment->id }}</td>
                            <td>{{ $appointment->patient_name ?? 'N/A' }}</td>
                            <td>{{ $appointment->doctor_name ?? 'N/A' }}</td>
                            <td>{{ $appointment->appointment_date }}</td>
                            <td>{{ $appointment->appointment_time }}</td>
                            <td>
                                @if($appointment->status == 'confirmed')
                                    <span class="badge badge-success">Đã Xác Nhận</span>
                                @elseif($appointment->status == 'pending')
                                    <span class="badge badge-warning">Đang Chờ</span>
                                @elseif($appointment->status == 'completed')
                                    <span class="badge badge-info">Đã Hoàn Thành</span>
                                @elseif($appointment->status == 'cancelled')
                                    <span class="badge badge-danger">Đã Hủy</span>
                                @else
                                    <span class="badge badge-secondary">{{ $appointment->status }}</span>
                                @endif
                            </td>
                            <td>
                                <div class="btn-group">
                                    <a href="#" class="btn btn-sm btn-primary">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="#" class="btn btn-sm btn-info">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection


    <!-- Chart.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>

    <script>
        // Add immediate console log to verify script loading
        console.log('Script section started');

        // Wrap in try-catch to catch potential errors
        try {
            document.addEventListener('DOMContentLoaded', function() {
                console.log('Dashboard page loaded.');

                // Doctor Revenue Chart
                const doctorNames = @json($topRevenueDoctors->pluck('doctor_name'));
                const revenues = @json($topRevenueDoctors->pluck('total_revenue'));

                console.log('Doctor Names:', doctorNames);
                console.log('Revenues:', revenues);

                const revenueChartCanvas = document.getElementById('allDoctorsRevenueChart');
                if (!revenueChartCanvas) {
                    console.error('Canvas element "allDoctorsRevenueChart" not found!');
                } else if (doctorNames.length === 0 || revenues.length === 0) {
                    console.warn('No data available for Doctor Revenue Chart.');
                } else {
                    new Chart(revenueChartCanvas, {
                        type: 'bar',
                        data: {
                            labels: doctorNames,
                            datasets: [{
                                label: 'Tổng Doanh Thu (VNĐ)',
                                data: revenues,
                                backgroundColor: 'rgba(78, 115, 223, 0.5)',
                                borderColor: 'rgba(78, 115, 223, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function(value) {
                                            return value.toLocaleString('vi-VN') + ' VNĐ';
                                        }
                                    }
                                }
                            }
                        }
                    });
                }

                // Monthly Appointments Chart
                const monthlyAppointments = @json(array_values($appointmentsByMonth));
                console.log('Monthly Appointments:', monthlyAppointments);

                const monthlyChartCanvas = document.getElementById('appointmentsMonthlyChart');
                if (!monthlyChartCanvas) {
                    console.error('Canvas element "appointmentsMonthlyChart" not found!');
                } else {
                    new Chart(monthlyChartCanvas, {
                        type: 'line',
                        data: {
                            labels: ['Th.1', 'Th.2', 'Th.3', 'Th.4', 'Th.5', 'Th.6', 'Th.7', 'Th.8', 'Th.9', 'Th.10', 'Th.11', 'Th.12'],
                            datasets: [{
                                label: 'Số lịch hẹn',
                                data: monthlyAppointments,
                                borderColor: 'rgba(78, 115, 223, 1)',
                                backgroundColor: 'rgba(78, 115, 223, 0.1)',
                                fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    });
                }

                // Status Chart
                const statusChart = new Chart(
                    document.getElementById('appointmentsByStatusChart'),
                    {
                        type: 'doughnut',
                        data: {
                            labels: ['Đang chờ', 'Đã xác nhận', 'Đã hoàn thành', 'Đã hủy'],
                            datasets: [{
                                data: [
                                    @json($statusStats['pending']),
                                    @json($statusStats['confirmed']),
                                    @json($statusStats['completed']),
                                    @json($statusStats['cancelled'])
                                ],
                                backgroundColor: [
                                    '#f6c23e',
                                    '#36b9cc',
                                    '#1cc88a',
                                    '#e74a3b'
                                ]
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    }
                );
            });
        } catch (error) {
            console.error('Error in dashboard initialization:', error);
        }
    </script>


