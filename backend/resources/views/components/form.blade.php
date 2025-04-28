@extends('admin.index')
@section('title', 'Tạo mới')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <x-flash-message />
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Form /</span> Thêm thông tin bác sĩ</h4>

            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-4">
                        <h5 class="card-header">Nhập thông tin</h5>
                        <hr class="my-0" />
                        <div class="card-body">
                            <form action="{{ $action }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                @method($method)

                                <div class="row mt-3">
                                    @foreach ($fields as $field)
                                        @if ($field['type'] == 'avatar')
                                            <!-- 🟢 Giao diện Avatar -->
                                            <div class="mb-3 col-md-12">
                                                <label for="{{ $field['name'] }}" class="form-label">
                                                    {!! str_replace('*', '<span style="color: red;">*</span>', $field['label']) !!}
                                                </label>
                                                <div class="d-flex align-items-center gap-3">
                                                    <img src="{{ isset($data[$field['name']]) && Storage::exists($data[$field['name']]) ? Storage::url($data[$field['name']]) : (file_exists(public_path('admin/assets/img/avatars/1.png')) ? asset('admin/assets/img/avatars/1.png') : asset('admin/assets/img/placeholder.png')) }}"
                                                        alt="user-avatar" class="avatar-preview rounded-circle"
                                                        id="uploadedAvatar" />
                                                    <div class="button-wrapper">
                                                        <label for="{{ $field['name'] }}" class="btn btn-primary me-2 mb-4">
                                                            <i class="bx bx-upload d-block d-sm-none"></i>
                                                            <input type="file" id="{{ $field['name'] }}"
                                                                name="{{ $field['name'] }}" class="account-file-input"
                                                                onchange="previewImage(event, 'uploadedAvatar')" />
                                                        </label>
                                                        <button type="button"
                                                            class="btn btn-outline-secondary account-image-reset mb-4">
                                                            <i class="bx bx-reset d-block d-sm-none"></i>
                                                            <span class="d-none d-sm-block">Reset</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <input type="hidden" name="{{ $field['name'] }}_current"
                                                    value="{{ $data[$field['name']] ?? '' }}">
                                                @error($field['name'])
                                                    <div class="text-danger">{{ $message }}</div>
                                                @enderror
                                            </div>
                                        @elseif(in_array($field['type'], ['file', 'image']))
                                            <!-- 🔵 Giao diện hiển thị ảnh thường (chứng chỉ, tài liệu, ảnh lớn) -->
                                            <div class="mb-3 col-md-12">
                                                <label for="{{ $field['name'] }}" class="form-label">
                                                    {!! str_replace('*', '<span style="color: red;">*</span>', $field['label']) !!}
                                                </label>
                                                <div class="image-upload-container">
                                                    <div class="image-preview-wrapper">
                                                        <img src="{{ isset($data[$field['name']]) && Storage::exists($data[$field['name']]) ? Storage::url($data[$field['name']]) : (file_exists(public_path('admin/assets/img/default-image.png')) ? asset('admin/assets/img/default-image.png') : asset('admin/assets/img/placeholder.png')) }}"
                                                            alt="{{ $field['label'] }}" class="image-preview-large"
                                                            id="preview-{{ $field['name'] }}" />
                                                    </div>
                                                    <div class="upload-controls">
                                                        <label for="{{ $field['name'] }}"
                                                            class="btn btn-primary upload-btn">
                                                            <i class="bx bx-upload"></i> Chọn ảnh
                                                            <input type="file" id="{{ $field['name'] }}"
                                                                name="{{ $field['name'] }}" class="file-input"
                                                                onchange="previewImage(event, 'preview-{{ $field['name'] }}')" />
                                                        </label>
                                                        <button type="button" class="btn btn-outline-secondary reset-btn"
                                                            onclick="resetImage('preview-{{ $field['name'] }}', '{{ isset($data[$field['name']]) && Storage::exists($data[$field['name']]) ? Storage::url($data[$field['name']]) : (file_exists(public_path('admin/assets/img/default-image.png')) ? asset('admin/assets/img/default-image.png') : asset('admin/assets/img/placeholder.png')) }}')">
                                                            <i class="bx bx-reset"></i> Reset
                                                        </button>
                                                    </div>
                                                </div>
                                                <input type="hidden" name="{{ $field['name'] }}_current"
                                                    value="{{ $data[$field['name']] ?? '' }}">
                                                @error($field['name'])
                                                    <div class="text-danger">{{ $message }}</div>
                                                @enderror
                                            </div>
                                        @elseif($field['type'] == 'textarea')
                                            <!-- 🔶 CKEditor -->
                                            <div class="mb-3 col-md-12">
                                                <label for="{{ $field['name'] }}" class="form-label">
                                                    {!! str_replace('*', '<span style="color: red;">*</span>', $field['label']) !!}
                                                </label>
                                                <textarea class="form-control" id="{{ $field['name'] }}" name="{{ $field['name'] }}">
                                                        {{ old($field['name'], $data[$field['name']] ?? '') }}
                                                    </textarea>

                                                @error($field['name'])
                                                    <div class="text-danger">{{ $message }}</div>
                                                @enderror
                                            </div>
                                        @else
                                            <!-- 🔶 Input thông thường -->
                                            <div class="mb-3 col-md-6">
                                                <label for="{{ $field['name'] }}" class="form-label">
                                                    {!! str_replace('*', '<span style="color: red;">*</span>', $field['label']) !!}
                                                </label>
                                                @if ($field['type'] == 'select')
                                                    <!-- Dropdown tùy chỉnh -->
                                                    <div class="custom-select-wrapper" id="{{ $field['name'] }}-wrapper">
                                                        <div class="custom-select">
                                                            <div class="custom-select__trigger">
                                                                <span class="custom-select__display">
                                                                    {{ old($field['name'], $data[$field['name']] ?? '') ? $field['options'][old($field['name'], $data[$field['name']] ?? '')] ?? '-- Chọn một tùy chọn --' : '-- Chọn một tùy chọn --' }}
                                                                </span>
                                                                <div class="arrow"></div>
                                                            </div>
                                                            <div class="custom-options">
                                                                <input type="text" class="custom-select__search"
                                                                    placeholder="Tìm kiếm..." oninput="filterOptions(this)">
                                                                @if (empty($field['options']))
                                                                    @php
                                                                        \Log::info(
                                                                            'Options trống cho field: ' .
                                                                                $field['name'],
                                                                        );
                                                                    @endphp
                                                                    <span class="custom-option" data-value="">Không có dữ
                                                                        liệu</span>
                                                                @else
                                                                    @foreach ($field['options'] as $id => $name)
                                                                        <span
                                                                            class="custom-option {{ old($field['name'], $data[$field['name']] ?? '') == $id ? 'selected' : '' }}"
                                                                            data-value="{{ $id }}">{{ $name }}</span>
                                                                    @endforeach
                                                                @endif
                                                            </div>
                                                        </div>
                                                        <!-- Input ẩn để gửi giá trị -->
                                                        <input type="hidden" id="{{ $field['name'] }}"
                                                            name="{{ $field['name'] }}"
                                                            value="{{ old($field['name'], $data[$field['name']] ?? '') }}">
                                                    </div>
                                                @else
                                                    <input
                                                        type="{{ $field['type'] == 'number' ? 'text' : $field['type'] }}"
                                                        class="form-control {{ isset($field['is_price']) && $field['is_price'] ? 'price-input' : '' }}"
                                                        id="{{ $field['name'] }}" name="{{ $field['name'] }}"
                                                        value="{{ old($field['name'], isset($data[$field['name']]) && is_numeric($data[$field['name']]) ? (isset($field['is_price']) && $field['is_price'] ? number_format($data[$field['name']], 0, ',', '.') : $data[$field['name']]) : $data[$field['name']] ?? '') }}"
                                                        placeholder="{{ $field['placeholder'] ?? '' }}"
                                                        @if (isset($field['is_price']) && $field['is_price']) data-type="price"
                                                                                                                            data-original-value="{{ old($field['name'], $data[$field['name']] ?? '') }}"
                                                                                                                            oninput="formatNumberWithCommas(this)"
                                                                                                                            onfocus="restoreOriginalValue(this)" @endif>
                                                @endif
                                                @error($field['name'])
                                                    <div class="text-danger">{{ $message }}</div>
                                                @enderror
                                            </div>
                                        @endif
                                    @endforeach
                                </div>

                                <div class="mt-2">
                                    <button type="submit" class="btn btn-primary me-2">Lưu thay đổi</button>
                                    <button type="reset" class="btn btn-outline-secondary">Quay lại</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Thư viện cần thiết (không cần Select2) -->
    <script src="https://cdn.ckeditor.com/ckeditor5/41.1.0/classic/ckeditor.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- JavaScript để preview ảnh, khởi tạo CKEditor và xử lý dropdown tùy chỉnh -->
    <script>
        // Hàm preview ảnh khi chọn file
        function previewImage(event, targetId) {
            const reader = new FileReader();
            reader.onload = function() {
                document.getElementById(targetId).src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }

        function resetImage(targetId, defaultImage) {
            document.getElementById(targetId).src = defaultImage;
            // Reset file input
            const fileInput = document.querySelector(`#${targetId.replace('preview-', '')}`);
            if (fileInput) {
                fileInput.value = '';
            }
        }

        // Hàm bỏ dấu tiếng Việt
        function removeDiacritics(str) {
            return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D');
        }

        // Hàm lọc tùy chọn trong dropdown
        function filterOptions(input) {
            const filter = removeDiacritics(input.value.toLowerCase());
            // Tìm container của dropdown
            const customSelect = input.closest('.custom-select');
            const options = customSelect.querySelectorAll('.custom-option');
            options.forEach(option => {
                const text = removeDiacritics(option.textContent.toLowerCase());
                if (text.includes(filter)) {
                    option.style.display = 'block'

                    // Xử lý định dạng giá tiền
                    const priceInputs = document.querySelectorAll('.price-input');
                    priceInputs.forEach(input => {
                        // Format khi trang tải
                        if (input.value) {
                            const numericValue = input.dataset.originalValue;
                            input.value = formatPrice(numericValue);
                        }

                        // Xử lý khi nhập liệu
                        input.addEventListener('input', function(e) {
                            // Lấy giá trị chỉ chứa số
                            const numericValue = e.target.value.replace(/\D/g, '');

                            // Cập nhật giá trị hiển thị đã định dạng
                            if (numericValue) {
                                e.target.value = formatPrice(numericValue);
                            } else {
                                e.target.value = '';
                            }

                            // Lưu giá trị số để submit
                            e.target.dataset.originalValue = numericValue;
                        });

                        // Xử lý trước khi submit form
                        input.closest('form').addEventListener('submit', function() {
                            // Đặt lại giá trị thành số trước khi gửi form
                            input.value = input.dataset.originalValue;
                        });
                    });

                    // Hàm định dạng giá tiền
                    function formatPrice(value) {
                        return new Intl.NumberFormat('vi-VN').format(value);
                    };
                } else {
                    option.style.display = 'none';
                }
            });
        }

        // Hàm định dạng số với dấu phân cách hàng nghìn
        function formatNumberWithCommas(input) {
            // Lấy giá trị và loại bỏ tất cả ký tự không phải số
            let value = input.value.replace(/\D/g, '');

            // Lưu giá trị gốc vào thuộc tính data để sử dụng khi submit form
            input.setAttribute('data-original-value', value);

            // Nếu có giá trị, định dạng với dấu chấm phân cách hàng nghìn
            if (value) {
                input.value = Number(value).toLocaleString('vi-VN').replace(/,/g, '.');
            }
        }

        // Khôi phục giá trị gốc khi focus vào input
        function restoreOriginalValue(input) {
            if (input.getAttribute('data-original-value')) {
                input.value = input.getAttribute('data-original-value');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Format all price inputs on page load
            document.querySelectorAll('input[data-type="price"]').forEach(input => {
                formatNumberWithCommas(input);
            });

            // Xử lý form submit để chuyển đổi giá trị định dạng về số nguyên
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    // Xử lý tất cả input giá
                    const priceInputs = this.querySelectorAll('input[data-type="price"]');
                    if (priceInputs.length > 0) {
                        priceInputs.forEach(input => {
                            // Sử dụng giá trị gốc đã lưu trong data-original-value
                            if (input.getAttribute('data-original-value')) {
                                input.value = input.getAttribute('data-original-value');
                            } else {
                                // Nếu không có data-original-value, loại bỏ tất cả dấu chấm
                                input.value = input.value.replace(/\./g, '');
                            }
                        });
                    }
                });
            });

            // Khởi tạo CKEditor cho tất cả textarea có type='textarea'
            @foreach ($fields as $field)
                @if ($field['type'] === 'textarea')
                    ClassicEditor
                        .create(document.querySelector('#{{ $field['name'] }}'))
                        .then(editor => {})
                        .catch(error => {
                            console.error('Lỗi khi khởi tạo CKEditor cho {{ $field['name'] }}:', error);
                        });
                @endif
            @endforeach

            // Xử lý dropdown tùy chỉnh
            const customSelects = document.querySelectorAll('.custom-select');
            customSelects.forEach(select => {
                const trigger = select.querySelector('.custom-select__trigger');
                const options = select.querySelectorAll('.custom-option');
                const display = select.querySelector('.custom-select__display');
                const hiddenInput = select.closest('.custom-select-wrapper').querySelector(
                    'input[type="hidden"]');

                // Mở/đóng dropdown khi click vào trigger
                trigger.addEventListener('click', () => {
                    select.classList.toggle('open');
                });

                // Xử lý khi chọn một tùy chọn
                options.forEach(option => {
                    option.addEventListener('click', () => {
                        const value = option.getAttribute('data-value');
                        const text = option.textContent;

                        // Cập nhật giá trị hiển thị
                        display.textContent = text;
                        hiddenInput.value = value;

                        // Đánh dấu tùy chọn được chọn
                        options.forEach(opt => opt.classList.remove('selected'));
                        option.classList.add('selected');

                        // Đóng dropdown
                        select.classList.remove('open');
                    });
                });

                // Đóng dropdown khi click bên ngoài
                document.addEventListener('click', (e) => {
                    if (!select.contains(e.target)) {
                        select.classList.remove('open');
                    }
                });
            });
        });
    </script>

    <!-- 🖌️ CSS để căn chỉnh ảnh và giao diện đẹp hơn -->
    <style>
        .avatar-preview {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 50%;
            border: 3px solid #ccc;
            transition: all 0.3s;
        }

        .avatar-preview:hover {
            border-color: #007bff;
        }

        .image-upload-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            border: 2px dashed #e0e0e0;
            padding: 30px;
            border-radius: 12px;
            background-color: #f8f9fa;
            transition: all 0.3s ease;
        }

        .image-upload-container:hover {
            border-color: #696cff;
            background-color: #f0f7ff;
        }

        .image-preview-wrapper {
            width: 100%;
            max-width: 600px;
            height: 400px;
            background-color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .image-preview-large {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 4px;
            transition: transform 0.3s ease;
        }

        .image-preview-large:hover {
            transform: scale(1.02);
        }

        .upload-controls {
            display: flex;
            gap: 10px;
            justify-content: center;
        }

        .upload-btn {
            position: relative;
            overflow: hidden;
            padding: 8px 20px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        }

        .upload-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(105, 108, 255, 0.4);
        }

        .upload-btn i {
            font-size: 1.2rem;
        }

        .file-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .reset-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        }

        .reset-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .reset-btn i {
            font-size: 1.2rem;
        }

        /* CSS cho dropdown tùy chỉnh */
        .custom-select-wrapper {
            position: relative;
            width: 100%;
        }

        .custom-select {
            position: relative;
            display: block;
            width: 100%;
        }

        .custom-select__trigger {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 12px;
            background: #fff;
            border: 1px solid #d9dee3;
            border-radius: 4px;
            cursor: pointer;
            height: 38px;
        }

        .custom-select__display {
            color: #333;
        }

        .arrow {
            border: solid #696cff;
            border-width: 0 2px 2px 0;
            display: inline-block;
            padding: 3px;
            transform: rotate(45deg);
            transition: transform 0.3s ease;
        }

        .custom-select.open .arrow {
            transform: rotate(-135deg);
        }

        .custom-options {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            border: 1px solid #d9dee3;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-height: 200px;
            overflow-y: auto;
            display: none;
            z-index: 1000;
        }

        .custom-select.open .custom-options {
            display: block;
        }

        .custom-select__search {
            width: 100%;
            padding: 8px;
            border: none;
            border-bottom: 1px solid #d9dee3;
            outline: none;
            box-sizing: border-box;
        }

        .custom-option {
            display: block;
            padding: 8px 12px;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .custom-option:hover {
            background: #f0f7ff;
        }

        .custom-option.selected {
            background: #696cff;
            color: #fff;
        }
    </style>
@endsection
