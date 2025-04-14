@extends('admin.index')
@section('title', 'Tạo mới')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <x-flash-message />
            <div class="card shadow-sm">
                <div class="card-header py-3">
                    <h5 class="mb-0">Tạo lịch khám bệnh</h5>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.schedule.store') }}" method="POST" id="scheduleForm">
                        @csrf
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label text-uppercase fw-semibold mb-2">Chọn bác sĩ</label>
                                    <select name="doctor_id" class="form-select form-select-lg shadow-sm @error('doctor_id') is-invalid @enderror" required>
                                        <option value="">Chọn bác sĩ</option>
                                        @foreach($doctors as $doctor)
                                            <option value="{{ $doctor->id }}" {{ old('doctor_id') == $doctor->id ? 'selected' : '' }}>
                                                {{ $doctor->doctor_name }}
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
                                    <label class="form-label text-uppercase fw-semibold mb-2">Chọn tuần</label>
                                    <input type="week" name="working_week"
                                           class="form-control form-control-lg shadow-sm @error('working_week') is-invalid @enderror"
                                           required
                                           min="{{ date('Y-\WW', strtotime('+2 days')) }}"
                                           value="{{ old('working_week') }}">
                                    @error('working_week')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-12">
                                <label class="form-label text-uppercase fw-semibold mb-3">Chọn ngày trong tuần</label>
                                <div class="d-flex flex-wrap gap-3 mb-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="1" id="monday">
                                        <label class="form-check-label" for="monday">Thứ 2</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="2" id="tuesday">
                                        <label class="form-check-label" for="tuesday">Thứ 3</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="3" id="wednesday">
                                        <label class="form-check-label" for="wednesday">Thứ 4</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="4" id="thursday">
                                        <label class="form-check-label" for="thursday">Thứ 5</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="5" id="friday">
                                        <label class="form-check-label" for="friday">Thứ 6</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="6" id="saturday">
                                        <label class="form-check-label" for="saturday">Thứ 7</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="0" id="sunday">
                                        <label class="form-check-label" for="sunday">Chủ nhật</label>
                                    </div>
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
                                            <input type="checkbox" class="btn-check" name="time_slots[]" id="morning" value="07:00,11:00">
                                            <label class="btn btn-outline-warning" for="morning">7:00-11:00</label>
                                        </div>
                                    </div>

                                    <!-- Afternoon Shift -->
                                    <div class="shift-container">
                                        <h6 class="mb-3">Ca chiều (13:00 - 17:00)</h6>
                                        <div class="time-slot-container">
                                            <input type="checkbox" class="btn-check" name="time_slots[]" id="afternoon" value="13:00,17:00">
                                            <label class="btn btn-outline-warning" for="afternoon">13:00-17:00</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 d-flex gap-2">
                            <button type="submit" class="btn btn-primary btn-lg px-4">Lưu thông tin</button>
                            <button type="button" class="btn btn-outline-secondary btn-lg px-4">Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <style>
        .card {
            border: none;
            border-radius: 0.75rem;
        }
        .card-header {
            background-color: transparent;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .form-control, .form-select {
            border-radius: 0.5rem;
            border: 1px solid #e0e0e0;
            padding: 0.625rem 1rem;
        }
        .form-control:focus, .form-select:focus {
            border-color: #696cff;
            box-shadow: 0 0 0 0.25rem rgba(105, 108, 255, 0.1);
        }
        .time-slot-container {
            background: #fff;
            border-radius: 0.5rem;
            padding: 0.5rem;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
            min-width: 150px;
        }
        .btn-outline-warning {
            background-color: #fff;
            border-color: #ffc107;
            color: #ffc107;
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            width: 100%;
            transition: all 0.2s ease;
        }
        .btn-outline-warning:hover,
        .btn-check:checked + .btn-outline-warning {
            background-color: #ffc107 !important;
            border-color: #ffc107 !important;
            color: #000 !important;
            transform: translateY(-1px);
        }
        .form-label {
            color: #566a7f;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
        }
        input[type="number"] {
            border-radius: 0.375rem;
        }
        .btn {
            font-weight: 500;
            letter-spacing: 0.3px;
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('scheduleForm');
            const timeSlots = document.querySelectorAll('input[name="time_slots[]"]');

            form.addEventListener('submit', function(e) {
                let isTimeSlotSelected = false;

                timeSlots.forEach(slot => {
                    if (slot.checked) {
                        isTimeSlotSelected = true;
                    }
                });

                if (!isTimeSlotSelected) {
                    alert('Vui lòng chọn ít nhất một khung giờ');
                    e.preventDefault();
                    return;
                }
            });
        });
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('scheduleForm');
            const timeSlots = document.querySelectorAll('input[name="time_slots[]"]');

            form.addEventListener('submit', function(e) {
                let isTimeSlotSelected = false;

                timeSlots.forEach(slot => {
                    if (slot.checked) {
                        isTimeSlotSelected = true;
                    }
                });

                if (!isTimeSlotSelected) {
                    alert('Vui lòng chọn ít nhất một khung giờ');
                    e.preventDefault();
                    return;
                }
            });
        });
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('scheduleForm');

            form.addEventListener('submit', function(e) {
                const selectedShifts = document.querySelectorAll('input[name="time_slots[]"]:checked');

                if (selectedShifts.length === 0) {
                    alert('Vui lòng chọn ít nhất một ca làm việc');
                    e.preventDefault();
                    return;
                }
            });
        });
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('scheduleForm');
            const timeSlots = document.querySelectorAll('input[name="time_slots[]"]');

            form.addEventListener('submit', function(e) {
                let isTimeSlotSelected = false;

                timeSlots.forEach(slot => {
                    if (slot.checked) {
                        isTimeSlotSelected = true;
                    }
                });

                if (!isTimeSlotSelected) {
                    alert('Vui lòng chọn ít nhất một khung giờ');
                    e.preventDefault();
                    return;
                }
            });
        });
    </script>
    <style>
        .is-invalid {
            border-color: #dc3545 !important;
            padding-right: calc(1.5em + 0.75rem) !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e") !important;
            background-repeat: no-repeat !important;
            background-position: right calc(0.375em + 0.1875rem) center !important;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem) !important;
        }
        .invalid-feedback {
            display: block;
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875em;
            color: #dc3545;
        }
        .shift-container {
            background: #f8f9fa;
            border-radius: 0.75rem;
            padding: 1rem;
            min-width: 200px;
        }
        .shift-container h6 {
            color: #566a7f;
            font-weight: 600;
        }
    </style>
@endsection

