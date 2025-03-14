@extends('admin.index')

@section('title', 'Thêm Lịch Làm Việc')

@section('content')

    <h2>Thêm Lịch Làm Việc</h2>

    <form method="POST" action="{{ route('admin.schedules.store') }}">
        @csrf

        <div class="mb-3">
            <label class="form-label">Bác sĩ</label>
            <select name="doctor_id" class="form-control" required>
                <option value="">-- Chọn Bác sĩ --</option>
                @foreach ($doctors as $doctor)
                    <option value="{{ $doctor->id }}">{{ $doctor->doctor_name }}</option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Giờ bắt đầu</label>
            <input type="time" name="time_start" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Giờ kết thúc</label>
            <input type="time" name="time_end" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Ngày làm việc</label>
            <input type="date" name="working_date" class="form-control" required>
        </div>
        
        <div class="mb-3">
            <label class="form-label">Số bệnh nhân tối đa</label>
            <input type="number" name="max_patients" class="form-control" required min="1">
        </div>

        <div class="mb-3">
            <label class="form-label">Trạng thái</label>
            <select name="status" class="form-control" required>
                <option value="1">Hoạt động</option>
                <option value="0">Không hoạt động</option>
            </select>
        </div>

        <button type="submit" class="btn btn-success">Thêm mới</button>
        <a href="{{ route('admin.schedules.index') }}" class="btn btn-secondary">Quay lại</a>

    </form>

@endsection
