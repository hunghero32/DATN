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
                                <div class="form-group custom-select2">
                                    <label class="form-label text-uppercase fw-semibold mb-2">Chọn bác sĩ <span class="text-danger">*</span></label>
                                    <div class="select2-container">
                                        <div class="select2-selection form-select form-select-lg shadow-sm @error('doctor_id') is-invalid @enderror">
                                            <span class="select2-selection__rendered">Chọn bác sĩ</span>
                                            <span class="select2-selection__arrow"></span>
                                        </div>
                                        <div class="select2-dropdown">
                                            <input type="text" class="select2-search form-control" placeholder="Tìm kiếm...">
                                            <ul class="select2-results"></ul>
                                        </div>
                                        <select name="doctor_id" class="form-select form-select-lg hidden-select" tabindex="0">
                                            <option value="">Chọn bác sĩ</option>
                                            @foreach($doctors as $doctor)
                                                <option value="{{ $doctor->id }}" {{ old('doctor_id') == $doctor->id ? 'selected' : '' }}>
                                                    {{ $doctor->doctor_name }}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('doctor_id')
                                            <div class="invalid-feedback d-block">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label text-uppercase fw-semibold mb-2">Chọn tuần <span class="text-danger">*</span></label>
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
                                <label class="form-label text-uppercase fw-semibold mb-3">Chọn ngày trong tuần <span class="text-danger">*</span></label>
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
                                <label class="form-label text-uppercase fw-semibold mb-3">Chọn ca làm việc <span class="text-danger">*</span></label>
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

                                    <!-- Custom Shift -->
                                    <div class="shift-container">
                                        <h6 class="mb-3">Ca tùy chỉnh</h6>
                                        <div class="time-slot-container">
                                            <div class="d-flex gap-2">
                                                <select id="custom_start" class="form-control form-control-sm" name="custom_start">
                                                    <option value="">Giờ bắt đầu</option>
                                                    @for ($hour = 7; $hour <= 17; $hour++)
                                                        <option value="{{ str_pad($hour, 2, '0', STR_PAD_LEFT) }}:00">
                                                            {{ str_pad($hour, 2, '0', STR_PAD_LEFT) }}:00
                                                        </option>
                                                    @endfor
                                                </select>
                                                <select id="custom_end" class="form-control form-control-sm" name="custom_end">
                                                    <option value="">Giờ kết thúc</option>
                                                    @for ($hour = 7; $hour <= 17; $hour++)
                                                        <option value="{{ str_pad($hour, 2, '0', STR_PAD_LEFT) }}:00">
                                                            {{ str_pad($hour, 2, '0', STR_PAD_LEFT) }}:00
                                                        </option>
                                                    @endfor
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Add error container here -->
                                <div id="time-slots-error-container" class="mt-2"></div>
                            </div>
                        </div>

                        <div class="mt-4 d-flex gap-2">
                            <button type="submit" class="btn btn-primary btn-lg px-4">Lưu thông tin</button>
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
            display: none;
            width: 100%;
            margin-top: 0.5rem;
            color: #dc3545;
            font-size: 0.875em;
        }
        .invalid-feedback.d-block {
            display: block;
        }
        .is-invalid {
            border-color: #dc3545 !important;
        }
        .is-invalid ~ .invalid-feedback {
            display: block;
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
        } .error-message {
            display: block;
            width: 100%;
            margin-top: 0.5rem;
            color: #dc3545;
            font-size: 0.875em;
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize custom select2-like functionality
            const customSelects = document.querySelectorAll('.custom-select2');
            customSelects.forEach(select => {
                const selectElement = select.querySelector('select');
                const selection = select.querySelector('.select2-selection');
                const rendered = select.querySelector('.select2-selection__rendered');
                const dropdown = select.querySelector('.select2-dropdown');
                const searchInput = select.querySelector('.select2-search');
                const results = select.querySelector('.select2-results');

                const options = Array.from(selectElement.options).slice(1);
                const updateOptions = (filter = '') => {
                    results.innerHTML = '';
                    options.forEach(option => {
                        if (option.text.toLowerCase().includes(filter.toLowerCase())) {
                            const li = document.createElement('li');
                            li.textContent = option.text;
                            li.dataset.value = option.value;
                            if (option.selected) {
                                li.classList.add('selected');
                                rendered.textContent = option.text;
                            }
                            results.appendChild(li);
                        }
                    });
                };
                updateOptions();

                // Update the click event handler for the selection
                selection.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    const allDropdowns = document.querySelectorAll('.select2-dropdown');
                    allDropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('open');
                        }
                    });
                    dropdown.classList.toggle('open');
                    if (dropdown.classList.contains('open')) {
                        searchInput.focus();
                    }
                });

                // Update the click event handler for results
                results.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    if (e.target.tagName === 'LI') {
                        const value = e.target.dataset.value;
                        selectElement.value = value;
                        rendered.textContent = e.target.textContent;
                        results.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
                        e.target.classList.add('selected');
                        dropdown.classList.remove('open');
                        searchInput.value = '';
                        updateOptions();

                        // Remove error state if exists
                        selection.classList.remove('is-invalid');
                        const errorMessage = select.querySelector('.invalid-feedback');
                        if (errorMessage) {
                            errorMessage.remove();
                        }
                    }
                });

                // Update document click handler
                document.addEventListener('click', (e) => {
                    if (!select.contains(e.target)) {
                        dropdown.classList.remove('open');
                        searchInput.value = '';
                        updateOptions();
                    }
                });
            });

            // Form validation and selection logic
            const form = document.getElementById('scheduleForm');
            const workingDaysCheckboxes = document.querySelectorAll('input[name="working_days[]"]');
            const timeSlots = document.querySelectorAll('input[name="time_slots[]"]');
            const customStart = document.getElementById('custom_start');
            const customEnd = document.getElementById('custom_end');

            // Function to handle time slot selection
            function handleTimeSlotSelection(selectedSlot) {
                timeSlots.forEach(slot => {
                    if (slot !== selectedSlot) {
                        slot.checked = false;
                    }
                });
                customStart.value = '';
                customEnd.value = '';
            }

            // Add click event listeners to time slots
            timeSlots.forEach(slot => {
                slot.addEventListener('click', function() {
                    handleTimeSlotSelection(this);
                });
            });

            // Handle custom time slot input
            function processCustomTimeSlots() {
                const startTime = customStart.value;
                const endTime = customEnd.value;

                if (startTime && endTime) {
                    const startHour = parseInt(startTime.split(':')[0]);
                    const endHour = parseInt(endTime.split(':')[0]);

                    // Basic validation
                    if (startHour >= endHour) {
                        alert('Giờ kết thúc phải lớn hơn giờ bắt đầu');
                        return false;
                    }

                    // Check if time is within valid range (7:00-17:00)
                    if (startHour < 7 || endHour > 17) {
                        alert('Vui lòng chọn khoảng thời gian hợp lệ (7:00-17:00)');
                        return false;
                    }

                    // Check if time slot crosses break time (11:00-13:00)
                    if ((startHour < 11 && endHour > 13) ||
                        (startHour >= 11 && startHour < 13) ||
                        (endHour > 11 && endHour <= 13)) {
                        alert('Không thể đặt lịch trong khoảng thời gian nghỉ trưa (11:00-13:00)');
                        return false;
                    }

                    // Create and append hidden input for custom time slot
                    let customSlotInput = document.getElementById('custom_time_slot');
                    if (!customSlotInput) {
                        customSlotInput = document.createElement('input');
                        customSlotInput.type = 'hidden';
                        customSlotInput.name = 'time_slots[]';
                        customSlotInput.id = 'custom_time_slot';
                        form.appendChild(customSlotInput);
                    }
                    customSlotInput.value = `${startTime},${endTime}`;
                    return true;
                }
                return false;
            }

            form.addEventListener('submit', function(e) {
                // Clear previous error messages
                clearErrorMessages();
                let hasError = false;

                // Check if at least one day is selected
                let selectedDays = 0;
                workingDaysCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) selectedDays++;
                });

                if (selectedDays === 0) {
                    e.preventDefault();
                    displayError('working-days-error', 'Vui lòng chọn ít nhất một ngày trong tuần');
                    hasError = true;
                }

                // Check time slots
                let hasValidTimeSlot = false;

                // Check predefined time slots
                timeSlots.forEach(slot => {
                    if (slot.checked) hasValidTimeSlot = true;
                });

                // Check custom time slot
                if (customStart.value || customEnd.value) {
                    if (!customStart.value || !customEnd.value) {
                        e.preventDefault();
                        displayError('custom-time-error', 'Vui lòng chọn cả giờ bắt đầu và giờ kết thúc cho ca tùy chỉnh');
                        hasError = true;
                    } else {
                        hasValidTimeSlot = processCustomTimeSlots();
                    }
                }

                if (!hasValidTimeSlot && !hasError) {
                    e.preventDefault();
                    displayError('time-slots-error', 'Vui lòng chọn ít nhất một ca làm việc hoặc nhập ca tùy chỉnh hợp lệ');
                }
            });

            // Add these helper functions
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
                        container = document.querySelector('.d-flex.flex-wrap.gap-3.mb-4');
                        break;
                    case 'time-slots-error':
                    case 'custom-time-error':
                        container = document.getElementById('time-slots-error-container');
                        break;
                }

                if (container) {
                    container.appendChild(errorDiv);
                }
            }

            // Clear predefined checkboxes when custom inputs are used
            customStart.addEventListener('change', () => {
                timeSlots.forEach(slot => slot.checked = false);
            });
            customEnd.addEventListener('change', () => {
                timeSlots.forEach(slot => slot.checked = false);
            });
        });
    </script>
@endsection
