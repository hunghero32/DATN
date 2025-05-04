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
                                <div class="form-group custom-select2">
                                    <label class="form-label text-uppercase fw-semibold mb-2">Chọn bác sĩ <span class="text-danger">*</span></label>
                                    <div class="select2-container">
                                        <div class="select2-selection form-select form-select-lg shadow-sm @error('doctor_id') is-invalid @enderror">
                                            <span class="select2-selection__rendered">Chọn bác sĩ</span>
                                            <span class="select2-selection__arrow"></span>
                                        </div>
                                        <select name="doctor_id" class="form-select form-select-lg hidden-select" required>
                                            <option value="">Chọn bác sĩ</option>
                                            @foreach($doctors as $id => $name)
                                                <option value="{{ $id }}" {{ $data->doctor_id == $id ? 'selected' : '' }}>
                                                    {{ $name }}
                                                </option>
                                            @endforeach
                                        </select>
                                        <div class="select2-dropdown">
                                            <input type="text" class="select2-search" placeholder="Tìm kiếm bác sĩ...">
                                            <ul class="select2-results">
                                                <!-- Options will be populated by JavaScript -->
                                            </ul>
                                        </div>
                                    </div>
                                    @error('doctor_id')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label text-uppercase fw-semibold mb-2">Chọn tuần <span class="text-danger">*</span></label>
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
                                <label class="form-label text-uppercase fw-semibold mb-3">Chọn ngày trong tuần <span class="text-danger">*</span></label>
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
                                <label class="form-label text-uppercase fw-semibold mb-3">Chọn ca làm việc <span class="text-danger">*</span></label>
                                <div class="d-flex flex-wrap gap-3">
                                    <!-- Morning Shift -->
                                    <div class="shift-container">
                                        <h6 class="mb-3">Ca sáng (7:00 - 11:00)</h6>
                                        <div class="time-slot-container">
                                            <input type="checkbox" class="btn-check time-slot" name="time_slots[]" id="morning" value="07:00,11:00"
                                                {{ ($data->time_start === '07:00:00' && $data->time_end === '11:00:00') ? 'checked' : '' }}>
                                            <label class="btn btn-outline-warning" for="morning">7:00-11:00</label>
                                        </div>
                                    </div>

                                    <!-- Afternoon Shift -->
                                    <div class="shift-container">
                                        <h6 class="mb-3">Ca chiều (13:00 - 17:00)</h6>
                                        <div class="time-slot-container">
                                            <input type="checkbox" class="btn-check time-slot" name="time_slots[]" id="afternoon" value="13:00,17:00"
                                                {{ ($data->time_start === '13:00:00' && $data->time_end === '17:00:00') ? 'checked' : '' }}>
                                            <label class="btn btn-outline-warning" for="afternoon">13:00-17:00</label>
                                        </div>
                                    </div>

                                    <!-- Custom Shift -->
                                    <div class="shift-container">
                                        <h6 class="mb-3">Ca tùy chỉnh</h6>
                                        <div class="time-slot-container">
                                            <div class="d-flex gap-2">
                                                <select id="custom_start" class="form-control form-control-sm" name="custom_start">
                                                    <option value="">Giờ bắt đầu</option>
                                                    @for ($hour = 7; $hour <= 17; $hour++)
                                                        <option value="{{ str_pad($hour, 2, '0', STR_PAD_LEFT) }}:00"
                                                            {{ ($data->time_start === str_pad($hour, 2, '0', STR_PAD_LEFT) . ':00:00' && !in_array($data->time_start . ',' . $data->time_end, ['07:00:00,11:00:00', '13:00:00,17:00:00'])) ? 'selected' : '' }}>
                                                            {{ str_pad($hour, 2, '0', STR_PAD_LEFT) }}:00
                                                        </option>
                                                    @endfor
                                                </select>
                                                <select id="custom_end" class="form-control form-control-sm" name="custom_end">
                                                    <option value="">Giờ kết thúc</option>
                                                    @for ($hour = 7; $hour <= 17; $hour++)
                                                        <option value="{{ str_pad($hour, 2, '0', STR_PAD_LEFT) }}:00"
                                                            {{ ($data->time_end === str_pad($hour, 2, '0', STR_PAD_LEFT) . ':00:00' && !in_array($data->time_start . ',' . $data->time_end, ['07:00:00,11:00:00', '13:00:00,17:00:00'])) ? 'selected' : '' }}>
                                                            {{ str_pad($hour, 2, '0', STR_PAD_LEFT) }}:00
                                                        </option>
                                                    @endfor
                                                </select>
                                            </div>
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
        .custom-select2 {
            position: relative;
        }
        .select2-container {
            position: relative;
            width: 100%;
        }
        .select2-selection {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 0.5rem;
            padding: 0.625rem 1rem;
        }
        .select2-selection:hover {
            border-color: #696cff;
        }
        .select2-selection__rendered {
            flex-grow: 1;
            color: #333;
        }
        .select2-selection__arrow {
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #566a7f;
        }
        .select2-dropdown {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 0.5rem;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            z-index: 1000;
            margin-top: 0.25rem;
        }
        .select2-dropdown.open {
            display: block;
        }
        .select2-search {
            width: 100%;
            padding: 0.5rem;
            border: none;
            border-bottom: 1px solid #e0e0e0;
            outline: none;
            border-radius: 0.5rem 0.5rem 0 0;
        }
        .select2-results {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: 200px;
            overflow-y: auto;
        }
        .select2-results li {
            padding: 0.5rem 1rem;
            cursor: pointer;
            transition: background 0.2s;
        }
        .select2-results li:hover {
            background: #f8f9fa;
        }
        .select2-results li.selected {
            background: #696cff;
            color: #fff;
        }
        .hidden-select {
            display: none;
        }
    </style>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('scheduleForm');
            const workingDaysCheckboxes = document.querySelectorAll('input[name="working_days[]"]');
            const timeSlotCheckboxes = document.querySelectorAll('input.time-slot[name="time_slots[]"]');
            const customStart = document.getElementById('custom_start');
            const customEnd = document.getElementById('custom_end');

            // Hidden input to store custom time slot
            const hiddenCustomTimeSlot = document.createElement('input');
            hiddenCustomTimeSlot.type = 'hidden';
            hiddenCustomTimeSlot.name = 'time_slots[]';
            form.appendChild(hiddenCustomTimeSlot);

            function clearErrorMessages() {
                const errorElements = document.querySelectorAll('.error-message');
                errorElements.forEach(element => element.remove());
            }

            function displayError(id, message) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message invalid-feedback d-block';
                errorDiv.id = id;
                errorDiv.textContent = message;

                let container;
                switch(id) {
                    case 'working-days-error':
                        container = document.querySelector('.d-flex.flex-wrap.gap-3.mb-4').parentElement;
                        break;
                    case 'time-slots-error':
                        container = document.querySelector('.d-flex.flex-wrap.gap-3').parentElement;
                        break;
                    case 'custom-time-error':
                        container = document.querySelector('.time-slot-container .d-flex.gap-2').parentElement;
                        break;
                }

                if (container) {
                    container.appendChild(errorDiv);
                }
            }

            // Update hidden input for custom time slot
            function updateCustomTimeSlot() {
                if (customStart.value && customEnd.value) {
                    hiddenCustomTimeSlot.value = `${customStart.value},${customEnd.value}`;
                } else {
                    hiddenCustomTimeSlot.value = '';
                }
            }

            // Clear other days when one is selected
            function handleDaySelection(selectedCheckbox) {
                workingDaysCheckboxes.forEach(checkbox => {
                    if (checkbox !== selectedCheckbox) {
                        checkbox.checked = false;
                    }
                });
            }

            // Clear other time slots when one is selected
            function handleTimeSlotSelection(selectedCheckbox) {
                timeSlotCheckboxes.forEach(checkbox => {
                    if (checkbox !== selectedCheckbox) {
                        checkbox.checked = false;
                    }
                });
                // Clear custom time inputs if a predefined slot is selected
                if (selectedCheckbox) {
                    customStart.value = '';
                    customEnd.value = '';
                    updateCustomTimeSlot();
                }
            }

            // Clear predefined slots when custom time is selected
            function handleCustomTimeSelection() {
                if (customStart.value || customEnd.value) {
                    timeSlotCheckboxes.forEach(checkbox => {
                        checkbox.checked = false;
                    });
                }
                updateCustomTimeSlot();
            }

            // Validate custom time slot
            function validateCustomTimeSlot() {
                if (customStart.value && customEnd.value) {
                    const startTime = new Date(`1970-01-01T${customStart.value}:00`);
                    const endTime = new Date(`1970-01-01T${customEnd.value}:00`);
                    if (endTime <= startTime) {
                        displayError('custom-time-error', 'Giờ kết thúc phải sau giờ bắt đầu');
                        return false;
                    }
                    if (startTime < new Date(`1970-01-01T07:00:00`) || endTime > new Date(`1970-01-01T17:00:00`)) {
                        displayError('custom-time-error', 'Thời gian làm việc phải nằm trong khoảng 7:00 - 17:00');
                        return false;
                    }
                    if ((startTime < new Date(`1970-01-01T11:00:00`) && endTime > new Date(`1970-01-01T13:00:00`)) ||
                        (startTime >= new Date(`1970-01-01T11:00:00`) && startTime < new Date(`1970-01-01T13:00:00`)) ||
                        (endTime > new Date(`1970-01-01T11:00:00`) && endTime <= new Date(`1970-01-01T13:00:00`))) {
                        displayError('custom-time-error', 'Không thể đặt lịch trong khoảng thời gian nghỉ trưa (11:00-13:00)');
                        return false;
                    }
                    return true;
                }
                return customStart.value === '' && customEnd.value === '';
            }

            // Event listeners for working days checkboxes
            workingDaysCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        handleDaySelection(checkbox);
                    }
                });
            });

            // Event listeners for time slot checkboxes
            timeSlotCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        handleTimeSlotSelection(checkbox);
                    }
                });
            });

            // Event listeners for custom time inputs
            customStart.addEventListener('change', handleCustomTimeSelection);
            customEnd.addEventListener('change', handleCustomTimeSelection);

            // Form submit validation
            form.addEventListener('submit', function(e) {
                clearErrorMessages();
                let hasError = false;

                // Validate working days
                let selectedDays = 0;
                workingDaysCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) selectedDays++;
                });

                if (selectedDays === 0) {
                    e.preventDefault();
                    displayError('working-days-error', 'Vui lòng chọn ít nhất một ngày trong tuần');
                    hasError = true;
                }

                // Validate time slots
                let hasValidTimeSlot = false;
                timeSlotCheckboxes.forEach(slot => {
                    if (slot.checked) hasValidTimeSlot = true;
                });

                // Check custom time slot
                if (customStart.value || customEnd.value) {
                    if (!customStart.value || !customEnd.value) {
                        e.preventDefault();
                        displayError('custom-time-error', 'Vui lòng chọn cả giờ bắt đầu và giờ kết thúc cho ca tùy chỉnh');
                        hasError = true;
                    } else if (validateCustomTimeSlot()) {
                        hasValidTimeSlot = true;
                    } else {
                        e.preventDefault();
                        hasError = true;
                    }
                }

                if (!hasValidTimeSlot && !hasError) {
                    e.preventDefault();
                    displayError('time-slots-error', 'Vui lòng chọn ít nhất một ca làm việc hoặc nhập ca tùy chỉnh hợp lệ');
                }
            });

            // Initialize custom time slot
            updateCustomTimeSlot();

            // Initialize select2
            const customSelect = document.querySelector('.custom-select2');
            const selectElement = customSelect.querySelector('select');
            const selection = customSelect.querySelector('.select2-selection');
            const rendered = customSelect.querySelector('.select2-selection__rendered');
            const dropdown = customSelect.querySelector('.select2-dropdown');
            const searchInput = customSelect.querySelector('.select2-search');
            const results = customSelect.querySelector('.select2-results');

            // Set initial selected value
            if (selectElement.value) {
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                rendered.textContent = selectedOption.text;
            }

            // Toggle dropdown
            selection.addEventListener('click', () => {
                dropdown.classList.toggle('open');
                if (dropdown.classList.contains('open')) {
                    searchInput.focus();
                    populateResults();
                }
            });

            // Populate results
            function populateResults(filter = '') {
                results.innerHTML = '';
                Array.from(selectElement.options).forEach(option => {
                    if (option.text.toLowerCase().includes(filter.toLowerCase())) {
                        const li = document.createElement('li');
                        li.textContent = option.text;
                        li.dataset.value = option.value;
                        if (option.value === selectElement.value) {
                            li.classList.add('selected');
                        }
                        results.appendChild(li);
                    }
                });
            }

            // Handle search
            searchInput.addEventListener('input', (e) => {
                populateResults(e.target.value);
            });

            // Handle option selection
            results.addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    const value = e.target.dataset.value;
                    const text = e.target.textContent;
                    selectElement.value = value;
                    rendered.textContent = text;
                    dropdown.classList.remove('open');
                    searchInput.value = '';
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!customSelect.contains(e.target)) {
                    dropdown.classList.remove('open');
                    searchInput.value = '';
                }
            });

            // Initial population of results
            populateResults();
        });
    </script>
@endsection
