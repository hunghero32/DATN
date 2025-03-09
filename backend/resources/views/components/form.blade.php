@extends('admin.index')
@section('title', 'Tạo mới')
@section('content')

    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Form /</span> Thêm thông tin bác sĩ</h4>

            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-4">
                        <h5 class="card-header">Profile Details</h5>
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
                                                    <img src="{{ isset($data[$field['name']]) ? Storage::url($data[$field['name']]) : asset('admin/assets/img/avatars/1.png') }}"
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
                                                        <img src="{{ isset($data[$field['name']]) ? Storage::url($data[$field['name']]) : asset('admin/assets/img/default-image.png') }}"
                                                            alt="{{ $field['label'] }}" class="image-preview-large"
                                                            id="preview-{{ $field['name'] }}" />
                                                    </div>
                                                    <div class="upload-controls">
                                                        <label for="{{ $field['name'] }}" class="btn btn-primary upload-btn">
                                                            <i class="bx bx-upload"></i> Chọn ảnh
                                                            <input type="file" id="{{ $field['name'] }}"
                                                                name="{{ $field['name'] }}" class="file-input"
                                                                onchange="previewImage(event, 'preview-{{ $field['name'] }}')" />
                                                        </label>
                                                        <button type="button" class="btn btn-outline-secondary reset-btn"
                                                            onclick="resetImage('preview-{{ $field['name'] }}', '{{ isset($data[$field['name']]) ? Storage::url($data[$field['name']]) : asset('admin/assets/img/default-image.png') }}')">
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
                                                    <select id="{{ $field['name'] }}" name="{{ $field['name'] }}"
                                                        class="select2 form-select">
                                                        @foreach ($field['options'] as $id => $name)
                                                            <option value="{{ $id }}"
                                                                {{ old($field['name'], $data[$field['name']] ?? '') == $id ? 'selected' : '' }}>
                                                                {{ $name }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                @else
                                                    <input type="{{ $field['type'] }}" class="form-control"
                                                        id="{{ $field['name'] }}" name="{{ $field['name'] }}"
                                                        value="{{ old($field['name'], $data[$field['name']] ?? '') }}"
                                                        placeholder="{{ $field['placeholder'] ?? '' }}">
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


    <script src="https://cdn.ckeditor.com/ckeditor5/41.1.0/classic/ckeditor.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- JavaScript để preview ảnh và khởi tạo CKEditor -->
    <script>
        // Hàm preview ảnh khi chọn file
        function previewImage(event, targetId) {
            const reader = new FileReader();
            reader.onload = function() {
                document.getElementById(targetId).src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }

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

        document.addEventListener('DOMContentLoaded', function() {
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
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
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
    </style>

@endsection
