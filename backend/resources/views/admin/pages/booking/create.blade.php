@extends('admin.index')
@section('title', 'Tạo đặt lịch mới')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Đặt lịch /</span> Tạo mới</h4>
            <x-flash-message />

            <div class="card shadow-sm">
                <div class="card-header py-3">
                    <h5 class="mb-0">Thông tin đặt lịch</h5>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.bookings.store') }}" method="POST" id="bookingForm">
                        @csrf

                        <!-- Lựa chọn khách hàng -->
                        <div class="mb-4">
                            <div class="form-check form-check-inline mb-3">
                                <input class="form-check-input" type="radio" name="guest_option" id="existing_guest"
                                    value="existing" checked>
                                <label class="form-check-label" for="existing_guest">Chọn khách hàng có sẵn</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="guest_option" id="new_guest"
                                    value="new">
                                <label class="form-check-label" for="new_guest">Tạo khách hàng mới</label>
                            </div>

                            <!-- Chọn khách hàng có sẵn -->
                            <div id="existing_guest_section" class="mt-3">
                                <div class="form-group custom-select2">
                                    <label class="form-label fw-semibold mb-2">Chọn khách hàng <span
                                            class="text-danger">*</span></label>
                                    <div class="select2-container">
                                        <div
                                            class="select2-selection form-select form-select-lg shadow-sm @error('guest_id') is-invalid @enderror">
                                            <span class="select2-selection__rendered">Chọn khách hàng</span>
                                            <span class="select2-selection__arrow"></span>
                                        </div>
                                        <div class="select2-dropdown">
                                            <input type="text" class="select2-search form-control"
                                                placeholder="Tìm kiếm...">
                                            <ul class="select2-results"></ul>
                                        </div>
                                        <select name="guest_id" class="form-select form-select-lg hidden-select"
                                            tabindex="0">
                                            <option value="">Chọn khách hàng</option>
                                            @foreach ($guests as $id => $name)
                                                <option value="{{ $id }}"
                                                    {{ old('guest_id') == $id ? 'selected' : '' }}>
                                                    {{ $name }}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('guest_id')
                                            <div class="invalid-feedback d-block">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <!-- Tạo khách hàng mới -->
                            <div id="new_guest_section" class="mt-3" style="display: none;">
                                <input type="hidden" name="is_new_guest" value="0" id="is_new_guest">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label fw-semibold mb-2">Tên khách hàng <span
                                                class="text-danger">*</span></label>
                                        <input type="text" name="guest_name"
                                            class="form-control form-control-lg shadow-sm @error('guest_name') is-invalid @enderror"
                                            value="{{ old('guest_name') }}">
                                        @error('guest_name')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label fw-semibold mb-2">Giới tính <span
                                                class="text-danger">*</span></label>
                                        <select name="gender"
                                            class="form-select form-select-lg shadow-sm @error('gender') is-invalid @enderror">
                                            <option value="">Chọn giới tính</option>
                                            <option value="male" {{ old('gender') == 'male' ? 'selected' : '' }}>Nam
                                            </option>
                                            <option value="female" {{ old('gender') == 'female' ? 'selected' : '' }}>Nữ
                                            </option>
                                            <option value="other" {{ old('gender') == 'other' ? 'selected' : '' }}>Khác
                                            </option>
                                        </select>
                                        @error('gender')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label fw-semibold mb-2">Ngày sinh</label>
                                        <input type="date" name="birthday"
                                            class="form-control form-control-lg shadow-sm @error('birthday') is-invalid @enderror"
                                            value="{{ old('birthday') }}">
                                        @error('birthday')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label fw-semibold mb-2">Số điện thoại</label>
                                        <input type="text" name="guest_phone"
                                            class="form-control form-control-lg shadow-sm @error('guest_phone') is-invalid @enderror"
                                            value="{{ old('guest_phone') }}">
                                        @error('guest_phone')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label fw-semibold mb-2">Email</label>
                                        <input type="email" name="guest_email"
                                            class="form-control form-control-lg shadow-sm @error('guest_email') is-invalid @enderror"
                                            value="{{ old('guest_email') }}">
                                        @error('guest_email')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label fw-semibold mb-2">Địa chỉ</label>
                                        <input type="text" name="address"
                                            class="form-control form-control-lg shadow-sm @error('address') is-invalid @enderror"
                                            value="{{ old('address') }}">
                                        @error('address')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Thông tin đặt lịch -->
                        <div class="row mb-4">
                            <div class="col-md-6 mb-3">
                                <div class="form-group custom-select2">
                                    <label class="form-label fw-semibold mb-2">Chọn bác sĩ <span
                                            class="text-danger">*</span></label>
                                    <div class="select2-container">
                                        <div
                                            class="select2-selection form-select form-select-lg shadow-sm @error('doctor_id') is-invalid @enderror">
                                            <span class="select2-selection__rendered">Chọn bác sĩ</span>
                                            <span class="select2-selection__arrow"></span>
                                        </div>
                                        <div class="select2-dropdown">
                                            <input type="text" class="select2-search form-control"
                                                placeholder="Tìm kiếm...">
                                            <ul class="select2-results"></ul>
                                        </div>
                                        <select name="doctor_id" class="form-select form-select-lg hidden-select"
                                            tabindex="0">
                                            <option value="">Chọn bác sĩ</option>
                                            @foreach ($doctors as $id => $name)
                                                <option value="{{ $id }}"
                                                    {{ old('doctor_id') == $id ? 'selected' : '' }}>
                                                    {{ $name }}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('doctor_id')
                                            <div class="invalid-feedback d-block">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-group custom-select2">
                                    <label class="form-label fw-semibold mb-2">Chọn dịch vụ <span
                                            class="text-danger">*</span></label>
                                    <div class="select2-container">
                                        <div
                                            class="select2-selection form-select form-select-lg shadow-sm @error('service_id') is-invalid @enderror">
                                            <span class="select2-selection__rendered">Chọn dịch vụ</span>
                                            <span class="select2-selection__arrow"></span>
                                        </div>
                                        <div class="select2-dropdown">
                                            <input type="text" class="select2-search form-control"
                                                placeholder="Tìm kiếm...">
                                            <ul class="select2-results"></ul>
                                        </div>
                                        <select name="service_id" class="form-select form-select-lg hidden-select"
                                            tabindex="0">
                                            <option value="">Chọn dịch vụ</option>
                                            @foreach ($services as $id => $name)
                                                <option value="{{ $id }}"
                                                    {{ old('service_id') == $id ? 'selected' : '' }}>
                                                    {{ $name }}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('service_id')
                                            <div class="invalid-feedback d-block">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-semibold mb-2">Ngày hẹn <span
                                        class="text-danger">*</span></label>
                                <select name="booking_date" id="booking_date"
                                    class="form-select form-select-lg shadow-sm @error('booking_date') is-invalid @enderror">
                                    <option value="">Chọn ngày hẹn</option>
                                </select>
                                <div id="loading_dates" style="display: none;" class="mt-2">
                                    <div class="spinner-border spinner-border-sm text-primary" role="status">
                                        <span class="visually-hidden">Đang tải...</span>
                                    </div>
                                    <span class="ms-2">Đang tải ngày làm việc có sẵn...</span>
                                </div>
                                @error('booking_date')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-semibold mb-2">Giờ hẹn <span
                                        class="text-danger">*</span></label>
                                <select name="booking_time" id="booking_time"
                                    class="form-select form-select-lg shadow-sm @error('booking_time') is-invalid @enderror">
                                    <option value="">Chọn giờ hẹn</option>
                                </select>
                                <div id="loading_time_slots" style="display: none;" class="mt-2">
                                    <div class="spinner-border spinner-border-sm text-primary" role="status">
                                        <span class="visually-hidden">Đang tải...</span>
                                    </div>
                                    <span class="ms-2">Đang tải khung giờ có sẵn...</span>
                                </div>
                                @error('booking_time')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label fw-semibold mb-2">Ghi chú</label>
                                <textarea name="note" class="form-control shadow-sm @error('note') is-invalid @enderror" rows="3">{{ old('note') }}</textarea>
                                @error('note')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <div class="mt-4 d-flex gap-2">
                            <button type="submit" class="btn btn-primary btn-lg px-4">Lưu thông tin</button>
                            <a href="{{ route('admin.bookings.index') }}"
                                class="btn btn-outline-secondary btn-lg px-4">Hủy</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

@section('scripts')
    <script>
        $(document).ready(function() {
            // Initialize Select2 for all dropdowns
            initializeSelect2();

            // Handle guest option toggle (existing vs new guest)
            $('input[name="guest_option"]').change(function() {
                if ($(this).val() === 'existing') {
                    $('#existing_guest_section').show();
                    $('#new_guest_section').hide();
                    $('#is_new_guest').val(0);
                } else {
                    $('#existing_guest_section').hide();
                    $('#new_guest_section').show();
                    $('#is_new_guest').val(1);
                }
            });

            // Reset dependent selects (service, date, time)
            function resetDependentSelects() {
                const serviceSelect = $('select[name="service_id"]');
                const dateSelect = $('#booking_date');
                const timeSelect = $('#booking_time');

                serviceSelect.empty().append('<option value="">Chọn dịch vụ</option>');
                dateSelect.empty().append('<option value="">Chọn ngày hẹn</option>');
                timeSelect.empty().append('<option value="">Chọn giờ hẹn</option>');

                updateSelect2(serviceSelect);
            }

            // Load services for a selected doctor
            function loadServices(doctorId) {
                const serviceSelect = $('select[name="service_id"]');
                serviceSelect.empty().append('<option value="">Chọn dịch vụ</option>');
                serviceSelect.siblings('.select2-container').find('.select2-selection__rendered').text('Đang tải dịch vụ...');

                $.ajax({
                    url: "{{ route('admin.bookings.get-services-by-doctor') }}",
                    type: "GET",
                    data: { doctor_id: doctorId },
                    dataType: 'json',
                    success: function(data) {
                        if (data && Object.keys(data).length > 0) {
                            $.each(data, function(key, value) {
                                serviceSelect.append(`<option value="${key}">${value}</option>`);
                            });
                        }
                        updateSelect2(serviceSelect);
                    },
                    error: function() {
                        serviceSelect.siblings('.select2-container').find('.select2-selection__rendered').text('Chọn dịch vụ');
                    }
                });
            }

            // Load working dates for a selected doctor
            function loadWorkingDates(doctorId) {
                const dateSelect = $('#booking_date');
                dateSelect.empty().append('<option value="">Chọn ngày hẹn</option>');
                $('#loading_dates').show();

                $.ajax({
                    url: "{{ route('admin.bookings.get-working-dates') }}",
                    type: "GET",
                    data: { doctor_id: doctorId },
                    dataType: 'json',
                    success: function(data) {
                        $('#loading_dates').hide();
                        if (data && data.length > 0) {
                            // Sử dụng Set để loại bỏ các ngày trùng lặp
                            const uniqueDates = [...new Set(data)];

                            $.each(uniqueDates, function(index, date) {
                                const formattedDate = new Date(date);
                                const day = formattedDate.getDate().toString().padStart(2, '0');
                                const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
                                const year = formattedDate.getFullYear();
                                const displayDate = `${day}/${month}/${year}`;
                                dateSelect.append(`<option value="${date}">${displayDate}</option>`);
                            });
                        } else {
                            dateSelect.append('<option value="" disabled>Không có ngày làm việc</option>');
                        }
                    },
                    error: function() {
                        $('#loading_dates').hide();
                        dateSelect.append('<option value="" disabled>Lỗi khi tải ngày làm việc</option>');
                    }
                });
            }

            // Load available time slots
            function loadAvailableTimeSlots(doctorId, serviceId, bookingDate) {
                const timeSelect = $('#booking_time');
                timeSelect.empty().append('<option value="">Chọn giờ hẹn</option>');
                $('#loading_time_slots').show();

                $.ajax({
                    url: "{{ route('admin.bookings.get-available-time-slots') }}",
                    type: "GET",
                    data: {
                        doctor_id: doctorId,
                        service_id: serviceId,
                        date: bookingDate
                    },
                    dataType: 'json',
                    success: function(response) {
                        $('#loading_time_slots').hide();
                        if (response.success && response.time_slots && response.time_slots.length > 0) {
                            const serviceDuration = $('select[name="service_id"] option:selected').data('duration') || 30;
                            const today = new Date();
                            const todayString = today.toISOString().split('T')[0];
                            const isToday = bookingDate === todayString;

                            function generateTimeSlots(schedule) {
                                const slots = [];
                                let startTime = new Date(`1970-01-01T${schedule.time_start}`);
                                const endTime = new Date(`1970-01-01T${schedule.time_end}`);
                                const duration = serviceDuration;

                                while (startTime < endTime) {
                                    const slotEnd = new Date(startTime.getTime() + duration * 60000);
                                    if (slotEnd > endTime) break;

                                    if (isToday) {
                                        const slotTime = new Date();
                                        slotTime.setHours(startTime.getHours(), startTime.getMinutes());
                                        if (slotTime < today) {
                                            startTime.setMinutes(startTime.getMinutes() + duration);
                                            continue;
                                        }
                                    }

                                    const timeStartStr = startTime.toTimeString().slice(0, 5);
                                    const timeEndStr = slotEnd.toTimeString().slice(0, 5);
                                    slots.push({
                                        value: timeStartStr,
                                        label: `${timeStartStr} - ${timeEndStr}`
                                    });
                                    startTime.setMinutes(startTime.getMinutes() + duration);
                                }
                                return slots;
                            }

                            let allTimeSlots = [];
                            response.time_slots.forEach(function(schedule) {
                                const slots = generateTimeSlots(schedule);
                                allTimeSlots = allTimeSlots.concat(slots);
                            });

                            if (allTimeSlots.length > 0) {
                                allTimeSlots.forEach(function(slot) {
                                    timeSelect.append(`<option value="${slot.value}">${slot.label}</option>`);
                                });
                            } else {
                                timeSelect.append('<option value="" disabled>Không có khung giờ trống</option>');
                            }
                        } else {
                            timeSelect.append('<option value="" disabled>Không có khung giờ trống</option>');
                        }
                    },
                    error: function(xhr) {
                        $('#loading_time_slots').hide();
                        console.error('Lỗi khi tải khung giờ:', xhr);
                        timeSelect.append('<option value="" disabled>Lỗi khi tải khung giờ</option>');
                    }
                });
            }

            // Handle doctor selection
            $('select[name="doctor_id"]').change(function() {
                const doctorId = $(this).val();
                resetDependentSelects(); // Reset service, date, and time selects
                if (doctorId) {
                    loadServices(doctorId);
                    loadWorkingDates(doctorId);
                }
            });

            // Handle service selection
            $('select[name="service_id"]').change(function() {
                const serviceId = $(this).val();
                const doctorId = $('select[name="doctor_id"]').val();
                const bookingDate = $('#booking_date').val();


                // Không reset ngày và không load lại ngày làm việc
            });

            // Handle date selection
            $('#booking_date').change(function() {
                const bookingDate = $(this).val();
                const doctorId = $('select[name="doctor_id"]').val();
                const serviceId = $('select[name="service_id"]').val();

                // Reset time select
                $('#booking_time').empty().append('<option value="">Chọn giờ hẹn</option>');

                if (doctorId && serviceId && bookingDate) {
                    loadAvailableTimeSlots(doctorId, serviceId, bookingDate);
                }
            });

            // Initialize Select2 for dropdowns
            function initializeSelect2() {
                $('.custom-select2').each(function() {
                    const container = $(this);
                    const select = container.find('.hidden-select');
                    const selection = container.find('.select2-selection');
                    const dropdown = container.find('.select2-dropdown');
                    const search = container.find('.select2-search');
                    const results = container.find('.select2-results');

                    function updateSelection() {
                        const selectedOption = select.find('option:selected');
                        const text = selectedOption.text();
                        selection.find('.select2-selection__rendered').text(
                            selectedOption.val() ? text : 'Chọn'
                        );
                    }

                    function updateResults(query = '') {
                        results.empty();
                        select.find('option').each(function() {
                            const option = $(this);
                            const text = option.text();
                            if (text.toLowerCase().includes(query.toLowerCase())) {
                                const item = $('<li class="select2-results__option"></li>')
                                    .text(text)
                                    .attr('data-value', option.val())
                                    .addClass(option.is(':selected') ? 'select2-results__option--selected' : '');
                                results.append(item);
                            }
                        });
                    }

                    selection.on('click', function() {
                        dropdown.toggle();
                        if (dropdown.is(':visible')) {
                            updateResults();
                            search.focus();
                        }
                    });

                    search.on('input', function() {
                        updateResults($(this).val());
                    });

                    results.on('click', '.select2-results__option', function() {
                        const value = $(this).data('value');
                        select.val(value).trigger('change');
                        dropdown.hide();
                        updateSelection();
                    });

                    $(document).on('click', function(e) {
                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                            dropdown.hide();
                        }
                    });

                    updateSelection();
                });
            }

            // Update Select2 for dynamic options
            function updateSelect2(selectElement) {
                const container = selectElement.closest('.custom-select2');
                const selection = container.find('.select2-selection');
                const results = container.find('.select2-results');

                results.empty();
                selectElement.find('option').each(function() {
                    if ($(this).val()) {
                        const item = $('<li class="select2-results__option"></li>')
                            .text($(this).text())
                            .attr('data-value', $(this).val());
                        results.append(item);
                    }
                });

                results.on('click', '.select2-results__option', function() {
                    const value = $(this).data('value');
                    selectElement.val(value).trigger('change');
                    selection.find('.select2-selection__rendered').text($(this).text());
                    container.find('.select2-dropdown').hide();
                });

                const selectedOption = selectElement.find('option:selected');
                selection.find('.select2-selection__rendered').text(
                    selectedOption.val() ? selectedOption.text() : 'Chọn'
                );
            }
        });
    </script>
@endsection

<style>
    /* CSS cho Select2 tùy chỉnh */
    .custom-select2 {
        position: relative;
    }

    .hidden-select {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }

    .select2-container {
        position: relative;
        width: 100%;
        z-index: unset !important;
    }

    .select2-selection {
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .select2-selection__arrow {
        display: inline-block;
        width: 12px;
        height: 12px;
        position: relative;
    }

    .select2-selection__arrow:after {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        border-right: 2px solid #666;
        border-bottom: 2px solid #666;
        transform: rotate(45deg);
    }

    .select2-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 0.5rem;
        margin-top: 5px;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        display: none;
        overflow: hidden;
    }

    .select2-dropdown.open {
        display: block;
    }

    .select2-search {
        padding: 8px;
        border-bottom: 1px solid #eee;
    }

    .select2-results {
        max-height: 200px;
        overflow-y: auto;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .select2-results__option {
        padding: 8px 12px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .select2-results__option:hover {
        background-color: #f5f5f5;
    }

    .select2-results__option.selected {
        background-color: #e6f7ff;
        color: #1890ff;
    }

    .select2-results__message {
        color: #999;
        font-style: italic;
    }

    .card {
        border: none;
        border-radius: 0.75rem;
    }

    .card-header {
        background-color: transparent;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .form-control,
    .form-select {
        border-radius: 0.5rem;
        border: 1px solid #e0e0e0;
        padding: 0.625rem 1rem;
    }

    .form-control:focus,
    .form-select:focus {
        border-color: #696cff;
        box-shadow: 0 0 0 0.25rem rgba(105, 108, 255, 0.1);
    }
</style>
@endsection
