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
                                    <label class="form-label text-uppercase fw-semibold mb-2">Chọn tuần</label>
                                    <input type="week" name="working_week"
                                           class="form-control form-control-lg shadow-sm @error('working_week') is-invalid @enderror"
                                           required
                                           min="{{ date('Y-\WW') }}"
                                           value="{{ old('working_week', date('Y-\WW', strtotime($data->working_date))) }}">
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
                                    @php
                                        $currentDayOfWeek = date('w', strtotime($data->working_date));
                                    @endphp
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="1" id="monday"
                                            {{ $currentDayOfWeek == 1 ? 'checked' : '' }}>
                                        <label class="form-check-label" for="monday">Thứ 2</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="2" id="tuesday"
                                            {{ $currentDayOfWeek == 2 ? 'checked' : '' }}>
                                        <label class="form-check-label" for="tuesday">Thứ 3</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="3" id="wednesday"
                                            {{ $currentDayOfWeek == 3 ? 'checked' : '' }}>
                                        <label class="form-check-label" for="wednesday">Thứ 4</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="4" id="thursday"
                                            {{ $currentDayOfWeek == 4 ? 'checked' : '' }}>
                                        <label class="form-check-label" for="thursday">Thứ 5</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="5" id="friday"
                                            {{ $currentDayOfWeek == 5 ? 'checked' : '' }}>
                                        <label class="form-check-label" for="friday">Thứ 6</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="6" id="saturday"
                                            {{ $currentDayOfWeek == 6 ? 'checked' : '' }}>
                                        <label class="form-check-label" for="saturday">Thứ 7</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="working_days[]" value="0" id="sunday"
                                            {{ $currentDayOfWeek == 0 ? 'checked' : '' }}>
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
            const workingDaysCheckboxes = document.querySelectorAll('input[name="working_days[]"]');
            const timeSlots = document.querySelectorAll('input[name="time_slots[]"]');

            // Function to handle day selection
            function handleDaySelection(selectedCheckbox) {
                workingDaysCheckboxes.forEach(checkbox => {
                    if (checkbox !== selectedCheckbox) {
                        checkbox.checked = false;
                    }
                });
            }

            // Function to handle time slot selection
            function handleTimeSlotSelection(selectedSlot) {
                timeSlots.forEach(slot => {
                    if (slot !== selectedSlot) {
                        slot.checked = false;
                    }
                });
            }

            // Add click event listeners to day checkboxes
            workingDaysCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('click', function() {
                    handleDaySelection(this);
                });
            });

            // Add click event listeners to time slots
            timeSlots.forEach(slot => {
                slot.addEventListener('click', function() {
                    handleTimeSlotSelection(this);
                });
            });

            form.addEventListener('submit', function(e) {
                // Check if exactly one day is selected
                let selectedDays = 0;
                workingDaysCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) selectedDays++;
                });

                if (selectedDays !== 1) {
                    e.preventDefault();
                    alert('Vui lòng chọn một ngày trong tuần');
                    return;
                }

                // Check if exactly one time slot is selected
                let selectedTimeSlots = 0;
                timeSlots.forEach(slot => {
                    if (slot.checked) selectedTimeSlots++;
                });

                if (selectedTimeSlots !== 1) {
                    e.preventDefault();
                    alert('Vui lòng chọn một ca làm việc');
                    return;
                }
            });
        });
    </script>
@endsection
