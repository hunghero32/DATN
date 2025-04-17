@extends('admin.index')
@section('title', 'Thống kê')
@section('content')
    <div class="container-fluid">
        <!-- Filter Form -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Lọc Dữ Liệu</h6>
            </div>
            <div class="card-body">
                <form method="GET" action="{{ route('admin.dashboard') }}">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="filter_type">Khoảng Thời Gian</label>
                                <select name="filter_type" id="filter_type" class="form-control" onchange="toggleCustomDateFields()">
                                    <option value="day" {{ $filterType === 'day' ? 'selected' : '' }}>Hôm Nay</option>
                                    <option value="week" {{ $filterType === 'week' ? 'selected' : '' }}>Tuần Này</option>
                                    <option value="month" {{ $filterType === 'month' ? 'selected' : '' }}>Tháng Này</option>
                                    <option value="year" {{ $filterType === 'year' ? 'selected' : '' }}>Năm Này</option>
                                    <option value="custom" {{ $filterType === 'custom' ? 'selected' : '' }}>Tùy Chỉnh</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3" id="start_date_field" style="display: {{ $filterType === 'custom' ? 'block' : 'none' }};">
                            <div class="form-group">
                                <label for="start_date">Từ Ngày</label>
                                <input type="date" name="start_date" id="start_date" class="form-control" value="{{ $customStartDate }}">
                            </div>
                        </div>
                        <div class="col-md-3" id="end_date_field" style="display: {{ $filterType === 'custom' ? 'block' : 'none' }};">
                            <div class="form-group">
                                <label for="end_date">Đến Ngày</label>
                                <input type="date" name="end_date" id="end_date" class="form-control" value="{{ $customEndDate }}">
                            </div>
                        </div>
                        <div class="col-md-3 align-self-end">
                            <button type="submit" class="btn btn-primary">Lọc</button>
                        </div>
                    </div>
                </form>
            </div>
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

            <!-- New Patients Card -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-danger shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                    Bệnh Nhân Mới</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $newPatients }}</div>
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

        <!-- Top Revenue Doctors Chart -->
        <div class="row">
            <div class="col-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Doanh Thu Bác Sĩ</h6>
                        <div class="dropdown no-arrow">
                            <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                aria-labelledby="dropdownMenuLink">
                                <div class="dropdown-header">Tùy Chọn Xuất:</div>
                                <a class="dropdown-item" href="#"><i
                                        class="fas fa-file-csv fa-sm fa-fw mr-2 text-gray-400"></i>CSV</a>
                                <a class="dropdown-item" href="#"><i
                                        class="fas fa-file-pdf fa-sm fa-fw mr-2 text-gray-400"></i>PDF</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        @if (isset($topRevenueDoctors) && $topRevenueDoctors->isNotEmpty())
                            <div class="chart-container" style="position: relative; height:400px;">
                                <canvas id="doctorsRevenueChart"></canvas>
                            </div>
                        @else
                            <div class="text-center py-4">
                                <i class="fas fa-user-md fa-4x text-gray-300 mb-3"></i>
                                <p class="text-muted">Chưa có dữ liệu doanh thu bác sĩ</p>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="row">
            <!-- Appointments Chart -->
            <div class="col-xl-8 col-lg-7">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Lịch Hẹn</h6>
                        <div class="dropdown no-arrow">
                            <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                aria-labelledby="dropdownMenuLink">
                                <div class="dropdown-header">Tùy Chọn Xuất:</div>
                                <a class="dropdown-item" href="#"><i
                                        class="fas fa-file-csv fa-sm fa-fw mr-2 text-gray-400"></i>CSV</a>
                                <a class="dropdown-item" href="#"><i
                                        class="fas fa-file-pdf fa-sm fa-fw mr-2 text-gray-400"></i>PDF</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart-area">
                            <canvas id="appointmentsChart"></canvas>
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
                                <a class="dropdown-item" href="#"><i
                                        class="fas fa-file-csv fa-sm fa-fw mr-2 text-gray-400"></i>CSV</a>
                                <a class="dropdown-item" href="#"><i
                                        class="fas fa-file-pdf fa-sm fa-fw mr-2 text-gray-400"></i>PDF</a>
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

        <!-- Appointments by Department Chart -->
        <div class="row">
            <div class="col-12">
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
                                <a class="dropdown-item" href="#"><i
                                        class="fas fa-file-csv fa-sm fa-fw mr-2 text-gray-400"></i>CSV</a>
                                <a class="dropdown-item" href="#"><i
                                        class="fas fa-file-pdf fa-sm fa-fw mr-2 text-gray-400"></i>PDF</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart-container" style="position: relative; height:400px;">
                            <canvas id="appointmentsByDepartmentChart"></canvas>
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
                            @foreach ($recentAppointments as $appointment)
                                <tr>
                                    <td>{{ $appointment->id }}</td>
                                    <td>{{ $appointment->patient_name ?? 'N/A' }}</td>
                                    <td>{{ $appointment->doctor_name ?? 'N/A' }}</td>
                                    <td>{{ \Carbon\Carbon::parse($appointment->appointment_date)->format('d/m/Y') }}</td>
                                    <td>{{ \Carbon\Carbon::parse($appointment->appointment_time)->format('H:i') }}</td>
                                    <td>
                                        @switch($appointment->status)
                                            @case('confirmed')
                                                <span>Đã Xác Nhận</span>
                                                @break
                                            @case('pending')
                                                <span>Đang Chờ</span>
                                                @break
                                            @case('completed')
                                                <span>Đã Hoàn Thành</span>
                                                @break
                                            @case('cancelled')
                                                <span>Đã Hủy</span>
                                                @break
                                            @default
                                                <span>{{ $appointment->status }}</span>
                                        @endswitch
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

    <!-- Chart.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>

    <script>
        // Toggle custom date fields based on filter type
        function toggleCustomDateFields() {
            const filterType = document.getElementById('filter_type').value;
            const startDateField = document.getElementById('start_date_field');
            const endDateField = document.getElementById('end_date_field');
            if (filterType === 'custom') {
                startDateField.style.display = 'block';
                endDateField.style.display = 'block';
            } else {
                startDateField.style.display = 'none';
                endDateField.style.display = 'none';
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            console.log('Dashboard page loaded.');

            const filterType = @json($filterType);

            // Labels for charts based on filter type
            let appointmentLabels = [];
            if (filterType === 'day') {
                appointmentLabels = Array.from({length: 24}, (_, i) => `${i}:00`);
            } else if (filterType === 'week') {
                appointmentLabels = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
            } else if (filterType === 'month') {
                const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                appointmentLabels = Array.from({length: daysInMonth}, (_, i) => `Ngày ${i + 1}`);
            } else {
                appointmentLabels = ['Th.1', 'Th.2', 'Th.3', 'Th.4', 'Th.5', 'Th.6',
                                    'Th.7', 'Th.8', 'Th.9', 'Th.10', 'Th.11', 'Th.12'];
            }

            // Appointments Chart
            const appointmentsData = @json(array_values($appointmentsByPeriod));
            const appointmentsChartCanvas = document.getElementById('appointmentsChart');
            if (!appointmentsChartCanvas) {
                console.error('Canvas element "appointmentsChart" not found!');
            } else {
                new Chart(appointmentsChartCanvas, {
                    type: 'line',
                    data: {
                        labels: appointmentLabels,
                        datasets: [{
                            label: 'Số lịch hẹn',
                            data: appointmentsData,
                            borderColor: 'rgba(78, 115, 223, 1)',
                            backgroundColor: 'rgba(78, 115, 223, 0.1)',
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Số Lịch Hẹn'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: filterType === 'day' ? 'Giờ' : filterType === 'week' ? 'Ngày' : filterType === 'month' ? 'Ngày' : 'Tháng'
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Lịch Hẹn Theo ' + (filterType === 'day' ? 'Giờ' : filterType === 'week' ? 'Ngày' : filterType === 'month' ? 'Ngày' : 'Tháng')
                            }
                        }
                    }
                });
            }

            // Status Chart
            const statusChartCanvas = document.getElementById('appointmentsByStatusChart');
            if (!statusChartCanvas) {
                console.error('Canvas element "appointmentsByStatusChart" not found!');
            } else {
                new Chart(statusChartCanvas, {
                    type: 'doughnut',
                    data: {
                        labels: ['Đang chờ', 'Đã xác nhận', 'Đã hoàn thành', 'Đã hủy'],
                        datasets: [{
                            data: [
                                @json($statusStats['pending']),
                                @json($statusStats['confirmed']),
                                @json($statusStats['completed']),
                                @json($statusStats['canceled'])
                            ],
                            backgroundColor: ['#f6c23e', '#36b9cc', '#1cc88a', '#e74a3b']
                        }]
                    },
                    options: {
                        producers: true,
                        maintainAspectRatio: false
                    }
                });
            }

            // Appointments By Department Chart
            const departmentData = @json($appointmentsByDepartment);
            const departmentLabels = departmentData.map(item => item.department);
            const departmentCounts = departmentData.map(item => item.count);

            const departmentChartCanvas = document.getElementById('appointmentsByDepartmentChart');
            if (!departmentChartCanvas) {
                console.error('Canvas element "appointmentsByDepartmentChart" not found!');
            } else if (departmentData.length === 0) {
                console.warn('No data available for Department Appointments Chart.');
            } else {
                new Chart(departmentChartCanvas, {
                    type: 'bar',
                    data: {
                        labels: departmentLabels,
                        datasets: [{
                            label: 'Số lịch hẹn',
                            data: departmentCounts,
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
                                title: {
                                    display: true,
                                    text: 'Số Lịch Hẹn'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Chuyên Khoa'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: 'Lịch Hẹn Theo Chuyên Khoa'
                            }
                        }
                    }
                });
            }

            // Top Revenue Doctors Chart
            const revenueData = @json($topRevenueDoctors);
            const doctorNames = revenueData.map(item => item.doctor_name);
            const revenues = revenueData.map(item => item.total_revenue);

            const revenueChartCanvas = document.getElementById('doctorsRevenueChart');
            if (!revenueChartCanvas) {
                console.error('Canvas element "doctorsRevenueChart" not found!');
            } else if (revenueData.length === 0) {
                console.warn('No data available for Doctor Revenue Chart.');
            } else {
                new Chart(revenueChartCanvas, {
                    type: 'bar',
                    data: {
                        labels: doctorNames,
                        datasets: [{
                            label: 'Doanh thu',
                            data: revenues,
                            backgroundColor: 'rgba(28, 200, 138, 0.5)',
                            borderColor: 'rgba(28, 200, 138, 1)',
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
                                },
                                title: {
                                    display: true,
                                    text: 'Doanh Thu'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Bác Sĩ'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: 'Doanh Thu Bác Sĩ'
                            }
                        }
                    }
                });
            }
        });
    </script>
@endsection
