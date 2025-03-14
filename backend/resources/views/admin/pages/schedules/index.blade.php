@extends('admin.index')

@section('title', 'Danh sách lịch làm việc')

@section('content')

    <form class="row g-2 mb-3" method="GET" action="{{ route('admin.schedules.index') }}">

        <!-- Tìm kiếm theo tên bác sĩ -->
        <div class="col-md-3">
            <input class="form-control" type="text" name="search" value="{{ request('search') }}" placeholder="Tìm theo tên bác sĩ">
        </div>

        <!-- Bộ lọc theo chuyên khoa -->
        <div class="col-md-3">
            <select class="form-control" name="specialty_id">
                <option value="">-- Chọn chuyên khoa --</option>
                @foreach($specialties as $specialty)
                    <option value="{{ $specialty->id }}" {{ request('specialty_id') == $specialty->id ? 'selected' : '' }}>
                        {{ $specialty->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <!-- Bộ lọc theo lịch làm việc -->
        <div class="col-md-3">
            <input type="date" name="working_date" class="form-control" value="{{ request('working_date') }}">
        </div>

        <!-- Nút tìm kiếm -->
        <div class="col-md-2">
            <button class="btn btn-primary" type="submit">Tìm kiếm</button>
        </div>

    </form>

    <!-- Nút thêm lịch làm việc -->
    <a href="{{ route('admin.schedules.create') }}" class="btn btn-success mb-3">Thêm mới</a>

    <!-- Bảng danh sách lịch làm việc -->
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Bác sĩ</th>
                <th>thời gian bắt đầu</th>
                <th>Thời gian kết thúc</th>
                <th>Ngày làm việc</th>
                <th>Tối đa bệnh nhân</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($schedules as $schedule)
                <tr>
                    <td>{{ $schedule->id }}</td>
                    <td>{{ $schedule->doctor->doctor_name }}</td>
                    <td>{{ $schedule->time_start }}</td>
                    <td>{{ $schedule->time_end }}</td>
                    <td>{{ $schedule->working_date }}</td>
                    <td>{{ $schedule->max_patients }}</td>
                    <td>{{ $schedule->status ? 'Hoạt động' : 'Không hoạt động' }}</td>
                    <td>
                        <a href="{{ route('admin.schedules.edit', $schedule->id) }}" class="btn btn-warning btn-sm">Sửa</a>
                        <form action="{{ route('admin.schedules.destroy', $schedule->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Bạn có chắc muốn xóa?')" class="btn btn-danger btn-sm">Xóa</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Phân trang -->
    {{ $schedules->links() }}

@endsection
