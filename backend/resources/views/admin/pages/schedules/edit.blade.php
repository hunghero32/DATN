@extends('admin.index')

@section('title', 'Chỉnh sửa Lịch Làm Việc')

@section('content')

    <h2>Sửa Lịch Làm Việc</h2>

    <form method="POST" action="{{ route('admin.schedules.update', $schedule->id) }}">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label class="form-label">Bác sĩ</label>
            <select name="doctor_id" class="form-control" required>
                <option value="">-- Chọn Bác sĩ --</option>
                @foreach ($doctors as $doctor)
                    <option value="{{ $doctor->id }}" {{ $schedule->doctor_id == $doctor->id ? 'selected' : '' }}>
                        {{ $doctor->doctor_name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Giờ bắt đầu</label>
            <input type="time" name="time_start" class="form-control" value="{{ $schedule->time_start }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Giờ kết thúc</label>
            <input type="time" name="time_end" class="form-control" value="{{ $schedule->time_end }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Ngày làm việc</label>
            <input type="date" name="working_date" class="form-control" value="{{ $schedule->working_date }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Số bệnh nhân tối đa</label>
            <input type="number" name="max_patients" class="form-control" value="{{ $schedule->max_patients }}" required min="1">
        </div>

        <div class="mb-3">
            <label class="form-label">Trạng thái</label>
            <select name="status" class="form-control" required>
                <option value="1" {{ $schedule->status == 1 ? 'selected' : '' }}>Hoạt động</option>
                <option value="0" {{ $schedule->status == 0 ? 'selected' : '' }}>Không hoạt động</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Cập nhật</button>
        <a href="{{ route('admin.schedules.index') }}" class="btn btn-secondary">Quay lại</a>

    </form>

@endsection
