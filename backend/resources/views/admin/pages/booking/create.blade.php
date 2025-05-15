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
                                    <!-- Các ngày làm việc sẽ được cập nhật động bằng JavaScript -->
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
                                    <!-- Các khung giờ sẽ được cập nhật động bằng JavaScript -->
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
            // Xử lý chọn khách hàng mới hoặc có sẵn
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

            // Xử lý khi chọn bác sĩ
            $('select[name="doctor_id"]').change(function() {
                var doctorId = $(this).val();
                selectedDoctor = doctorId; // Cập nhật biến theo dõi bác sĩ đã chọn

                if (doctorId) {
                    var serviceSelect = $('select[name="service_id"]');
                    serviceSelect.empty().append('<option value="">Chọn dịch vụ</option>');

                    // Cập nhật text hiển thị trong Select2
                    serviceSelect.siblings('.select2-container').find('.select2-selection__rendered').text(
                        'Đang tải dịch vụ...');

                    // Lấy dịch vụ của bác sĩ
                    $.ajax({
                        url: "{{ route('admin.bookings.get-services-by-doctor') }}",
                        type: "GET",
                        data: {
                            doctor_id: doctorId
                        },
                        dataType: 'json',
                        success: function(data) {
                            if (data && Object.keys(data).length > 0) {
                                $.each(data, function(key, value) {
                                    serviceSelect.append('<option value="' + key +
                                        '">' + value + '</option>');
                                });
                            }

                            // Cập nhật Select2 sau khi thêm options mới
                            updateSelect2(serviceSelect);
                        }
                    });

                    // Lấy ngày làm việc của bác sĩ
                    var dateSelect = $('#booking_date');
                    dateSelect.empty().append('<option value="">Chọn ngày hẹn</option>');
                    $('#loading_dates').show();

                    $.ajax({
                        url: "{{ route('admin.bookings.get-working-dates') }}",
                        type: "GET",
                        data: {
                            doctor_id: doctorId
                        },
                        dataType: 'json',
                        success: function(data) {
                            $('#loading_dates').hide();

                            if (data && data.length > 0) {
                                $.each(data, function(index, date) {
                                    var formattedDate = new Date(date);
                                    var day = formattedDate.getDate().toString()
                                        .padStart(2, '0');
                                    var month = (formattedDate.getMonth() + 1)
                                        .toString().padStart(2, '0');
                                    var year = formattedDate.getFullYear();

                                    var displayDate = day + '/' + month + '/' + year;
                                    dateSelect.append('<option value="' + date + '">' +
                                        displayDate + '</option>');
                                });
                            } else {
                                dateSelect.append(
                                    '<option value="" disabled>Không có ngày làm việc</option>'
                                );
                            }
                        },
                        error: function() {
                            $('#loading_dates').hide();
                            dateSelect.append(
                                '<option value="" disabled>Lỗi khi tải ngày làm việc</option>'
                            );
                        }
                    });
                }
            });

            // Xử lý khi chọn ngày hẹn
            $('#booking_date').change(function() {
                var selectedDate = $(this).val();
                var doctorId = $('select[name="doctor_id"]').val();
                var serviceId = $('select[name="service_id"]').val();

                if (selectedDate && doctorId && serviceId) {
                    var timeSelect = $('#booking_time');
                    timeSelect.empty().append('<option value="">Chọn giờ hẹn</option>');
                    $('#loading_time_slots').show();

                    $.ajax({
                        url: "{{ route('admin.bookings.get-available-time-slots') }}",
                        type: "GET",
                        data: {
                            doctor_id: doctorId,
                            date: selectedDate
                        },
                        dataType: 'json',
                        success: function(response) {
                            $('#loading_time_slots').hide();

                            if (response.success && response.time_slots && response.time_slots
                                .length > 0) {
                                var serviceDuration = $(
                                    'select[name="service_id"] option:selected').data(
                                    'duration') || 30;
                                var today = new Date();
                                var todayString = today.toISOString().split('T')[0];
                                var isToday = selectedDate === todayString;

                                function generateTimeSlots(schedule) {
                                    var slots = [];
                                    var startTime = new Date(
                                        `1970-01-01T${schedule.time_start}`);
                                    var endTime = new Date(`1970-01-01T${schedule.time_end}`);
                                    var duration = serviceDuration;

                                    while (startTime < endTime) {
                                        var slotEnd = new Date(startTime.getTime() + duration *
                                            60000);
                                        if (slotEnd > endTime) break;

                                        if (isToday) {
                                            var slotTime = new Date();
                                            slotTime.setHours(startTime.getHours(), startTime
                                                .getMinutes());
                                            if (slotTime < today) {
                                                startTime.setMinutes(startTime.getMinutes() +
                                                    duration);
                                                continue;
                                            }
                                        }

                                        var timeStartStr = startTime.toTimeString().slice(0, 5);
                                        var timeEndStr = slotEnd.toTimeString().slice(0, 5);
                                        slots.push({
                                            id: `${schedule.id}-${timeStartStr}`, // Keep ID for reference if needed
                                            time_start: timeStartStr,
                                            time_end: timeEndStr,
                                            value: timeStartStr // Use time_start as the option value
                                        });
                                        startTime.setMinutes(startTime.getMinutes() + duration);
                                    }
                                    return slots;
                                }

                                var allTimeSlots = [];
                                response.time_slots.forEach(function(schedule) {
                                    var slots = generateTimeSlots(schedule);
                                    allTimeSlots = allTimeSlots.concat(slots);
                                });

                                if (allTimeSlots.length > 0) {
                                    allTimeSlots.forEach(function(slot) {
                                        timeSelect.append(
                                            `<option value="${slot.value}">${slot.time_start} - ${slot.time_end}</option>`
                                        );
                                    });
                                } else {
                                    timeSelect.append(
                                        '<option value="" disabled>Không có khung giờ trống</option>'
                                        );
                                }
                            } else {
                                timeSelect.append(
                                    '<option value="" disabled>Không có khung giờ trống</option>'
                                    );
                            }
                        },
                        error: function(xhr) {
                            $('#loading_time_slots').hide();
                            console.error('Lỗi khi tải khung giờ:', xhr);
                            timeSelect.append(
                                '<option value="" disabled>Lỗi khi tải khung giờ</option>');
                        }
                    });
                } else {
                    $('#booking_time').empty().append('<option value="">Chọn giờ hẹn</option>');
                }
            });

            // Các xử lý khác
            // Khởi tạo Select2 cho các dropdown
            initializeSelect2();

            // Biến để theo dõi trạng thái chọn
            let selectedDoctor = $('select[name="doctor_id"]').val() || '';
            let selectedService = $('select[name="service_id"]').val() || '';
            let selectedDate = $('input[name="booking_date"]').val() || '';


            // Hàm cập nhật Select2 cho dịch vụ
            function updateSelect2Services() {
                var serviceSelect = $('select[name="service_id"]');
                var serviceResults = $('.select2-results');
                serviceResults.empty();

                serviceSelect.find('option').each(function() {
                    if ($(this).val()) {
                        var resultItem = $('<li class="select2-results__option" role="option"></li>');
                        resultItem.attr('data-value', $(this).val());
                        resultItem.text($(this).text());
                        serviceResults.append(resultItem);
                    }
                });

                // Xử lý sự kiện click cho các option mới
                $('.select2-results__option').click(function() {
                    var value = $(this).data('value');
                    var text = $(this).text();

                    serviceSelect.val(value);
                    $('.select2-selection__rendered').text(text);
                    $('.select2-dropdown').hide();
                });
            }

            // Xử lý khi chọn dịch vụ
            $('select[name="service_id"]').on('change', function() {
                selectedService = $(this).val();
                checkAndLoadTimeSlots();
            });

            // Xử lý khi chọn ngày
            $('input[name="booking_date"]').on('change', function() {
                selectedDate = $(this).val();
                checkAndLoadTimeSlots();
            });

            // Hàm kiểm tra và tải khung giờ nếu đã chọn đủ thông tin
            function checkAndLoadTimeSlots() {
                // Reset dropdown giờ hẹn
                $('#booking_time').empty().append('<option value="">Chọn giờ hẹn</option>');

                // Chỉ tải khung giờ khi đã chọn đủ bác sĩ, dịch vụ và ngày
                if (selectedDoctor && selectedService && selectedDate) {
                    loadAvailableTimeSlots(selectedDoctor, selectedService, selectedDate);
                }
            }

            // Hàm tải khung giờ có sẵn
            function loadAvailableTimeSlots(doctorId, serviceId, bookingDate) {
                console.log("Bắt đầu tải khung giờ...", {
                    doctorId,
                    serviceId,
                    bookingDate
                });
                $('#loading_time_slots').show();

                $.ajax({
                    url: "{{ route('admin.bookings.doctor-time-slots') }}",
                    type: "GET",
                    data: {
                        doctor_id: doctorId,
                        service_id: serviceId,
                        booking_date: bookingDate
                    },
                    success: function(response) {
                        console.log("AJAX Success11111:", response); // ✅ In kết quả
                        $('#loading_time_slots').hide();

                        if (response.success) {
                            const timeSlots = response.time_slots;
                            if (timeSlots.length > 0) {
                                timeSlots.forEach(function(slot) {
                                    $('#booking_time').append(
                                        `<option value="${slot.value}">${slot.label}</option>`
                                    );
                                });
                            } else {
                                $('#booking_time').append(
                                    '<option value="" disabled>Không có khung giờ trống</option>'
                                );
                            }
                        } else {
                            alert(response.message);
                        }
                    },
                    error: function(xhr, status, error) {
                        $('#loading_time_slots').hide();

                        console.error("AJAX Error:", {
                            status: xhr.status,
                            statusText: xhr.statusText,
                            responseText: xhr.responseText,
                            error: error
                        });

                        alert("Có lỗi xảy ra khi tải khung giờ. Vui lòng thử lại sau.");
                    }
                });

            }

            // Hàm khởi tạo Select2
            function initializeSelect2() {
                // Khởi tạo Select2 cho các dropdown
                $('.custom-select2').each(function() {
                    const container = $(this);
                    const select = container.find('.hidden-select');
                    const selection = container.find('.select2-selection');
                    const dropdown = container.find('.select2-dropdown');
                    const search = container.find('.select2-search');
                    const results = container.find('.select2-results');

                    // Hiển thị giá trị đã chọn
                    function updateSelection() {
                        const selectedOption = select.find('option:selected');
                        const text = selectedOption.text();
                        selection.find('.select2-selection__rendered').text(
                            selectedOption.val() ? text : selection.find('.select2-selection__rendered')
                            .attr('data-placeholder') || 'Chọn'
                        );
                    }

                    // Cập nhật danh sách kết quả
                    function updateResults(query = '') {
                        results.empty();
                        select.find('option').each(function() {
                            const option = $(this);
                            const text = option.text();

                            if (text.toLowerCase().includes(query.toLowerCase())) {
                                const item = $('<li class="select2-results__option"></li>')
                                    .text(text)
                                    .attr('data-value', option.val())
                                    .addClass(option.is(':selected') ?
                                        'select2-results__option--selected' : '');

                                results.append(item);
                            }
                        });
                    }

                    // Xử lý khi click vào selection
                    selection.on('click', function() {
                        dropdown.toggle();
                        if (dropdown.is(':visible')) {
                            updateResults();
                            search.focus();
                        }
                    });

                    // Xử lý tìm kiếm
                    search.on('input', function() {
                        updateResults($(this).val());
                    });

                    // Xử lý khi chọn một option
                    results.on('click', '.select2-results__option', function() {
                        const value = $(this).data('value');
                        select.val(value).trigger('change');
                        dropdown.hide();
                        updateSelection();
                    });

                    // Đóng dropdown khi click ra ngoài
                    $(document).on('click', function(e) {
                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                            dropdown.hide();
                        }
                    });

                    // Khởi tạo ban đầu
                    updateSelection();
                });
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
