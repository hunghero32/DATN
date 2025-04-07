@extends('admin.index')
@section('title', 'Chỉnh sửa lịch làm việc')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <x-flash-message />
            <div class="card shadow-sm">
                <div class="card-header py-3">
                    <h5 class="mb-0">Chỉnh sửa lịch làm việc</h5>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.schedule.update', $data->id) }}" method="POST" id="scheduleForm">
                        @csrf
                        @method('PUT')
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label text-uppercase fw-semibold mb-2">Chọn bác sĩ</label>
                                    <select name="doctor_id" class="form-select form-select-lg shadow-sm @error('doctor_id') is-invalid @enderror" required>
                                        <option value="">Chọn bác sĩ</option>
                                        @foreach($doctors as $id => $name)
                                            <option value="{{ $id }}" {{ $data->doctor_id == $id ? 'selected' : '' }}>
                                                {{ $name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('doctor_id')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label text-uppercase fw-semibold mb-2">Ngày làm việc</label>
                                    <input type="date" name="working_date"
                                           class="form-control form-control-lg shadow-sm @error('working_date') is-invalid @enderror"
                                           required
                                           min="{{ date('Y-m-d') }}"
                                           value="{{ old('working_date', date('Y-m-d', strtotime($data->working_date))) }}">
                                    @error('working_date')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>


                        <div class="row mb-4">
                            <div class="col-12">
                                <label class="form-label text-uppercase fw-semibold mb-3">Chọn ca làm việc</label>
                                <div class="d-flex flex-wrap gap-3">
                                    <!-- Morning Shift -->
                                    <div class="shift-container">
                                        <h6 class="mb-3">Ca sáng (7:00 - 11:00)</h6>
                                        <div class="time-slot-container">
                                            <input type="checkbox" class="btn-check" name="time_slots[]" id="morning" value="07:00,11:00"
                                                {{ ($data->time_start === '07:00:00' && $data->time_end === '11:00:00') ? 'checked' : '' }}>
                                            <label class="btn btn-outline-warning" for="morning">7:00-11:00</label>
                                        </div>
                                    </div>

                                    <!-- Afternoon Shift -->
                                    <div class="shift-container">
                                        <h6 class="mb-3">Ca chiều (13:00 - 17:00)</h6>
                                        <div class="time-slot-container">
                                            <input type="checkbox" class="btn-check" name="time_slots[]" id="afternoon" value="13:00,17:00"
                                                {{ ($data->time_start === '13:00:00' && $data->time_end === '17:00:00') ? 'checked' : '' }}>
                                            <label class="btn btn-outline-warning" for="afternoon">13:00-17:00</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label text-uppercase fw-semibold mb-2">Trạng thái</label>
                                    <select name="status" class="form-select form-select-lg shadow-sm @error('status') is-invalid @enderror">
                                        <option value="1" {{ $data->status == 1 ? 'selected' : '' }}>Hoạt động</option>
                                        <option value="0" {{ $data->status == 0 ? 'selected' : '' }}>Không hoạt động</option>
                                    </select>
                                    @error('status')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 d-flex gap-2">
                            <button type="submit" class="btn btn-primary btn-lg px-4">Cập nhật</button>
                            <a href="{{ route('admin.schedule.index') }}" class="btn btn-outline-secondary btn-lg px-4">Hủy</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('scheduleForm');

            form.addEventListener('submit', function(e) {
                const timeStart = document.querySelector('input[name="time_start"]').value;
                const timeEnd = document.querySelector('input[name="time_end"]').value;
                const workingDate = document.querySelector('input[name="working_date"]').value;
                const maxPatients = document.querySelector('input[name="max_patients"]').value;

                if (timeStart >= timeEnd) {
                    e.preventDefault();
                    alert('Giờ kết thúc phải sau giờ bắt đầu');
                    return;
                }

                if (workingDate < '{{ date('Y-m-d') }}') {
                    e.preventDefault();
                    alert('Ngày làm việc không thể là ngày trong quá khứ');
                    return;
                }

                if (maxPatients < 1 || maxPatients > 100) {
                    e.preventDefault();
                    alert('Số lượng bệnh nhân phải từ 1 đến 100');
                    return;
                }
            });
        });
    </script>
@endsection
