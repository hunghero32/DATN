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
                                @foreach($fields as $field)
                                    @if($field['type'] == 'avatar')
                                        <!-- 🟢 Giao diện Avatar -->
                                        <div class="mb-3 col-md-12">
                                            <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                            <div class="d-flex align-items-center gap-3">
                                                <img src="{{ isset($data[$field['name']]) ? Storage::url($data[$field['name']]) : asset('admin/assets/img/avatars/1.png') }}"
                                                    alt="user-avatar" class="avatar-preview rounded-circle" id="uploadedAvatar" />
                                                <div class="button-wrapper">
                                                    <label for="{{ $field['name'] }}" class="btn btn-primary me-2 mb-4">
                                                        <i class="bx bx-upload d-block d-sm-none"></i>
                                                        <input type="file" id="{{ $field['name'] }}" name="{{ $field['name'] }}" class="account-file-input"
                                                               onchange="previewImage(event, 'uploadedAvatar')"/>
                                                    </label>
                                                    <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                                                        <i class="bx bx-reset d-block d-sm-none"></i>
                                                        <span class="d-none d-sm-block">Reset</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <input type="hidden" name="{{ $field['name'] }}_current" value="{{ $data[$field['name']] ?? '' }}">
                                            @error($field['name'])
                                                <div class="text-danger">{{ $message }}</div>
                                            @enderror
                                        </div>

                                    @elseif(in_array($field['type'], ['file', 'image']))
                                        <!-- 🔵 Giao diện hiển thị ảnh thường (chứng chỉ, tài liệu, ảnh lớn) -->
                                        <div class="mb-3 col-md-12">
                                            <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                            <div class="image-upload-container">
                                                <img src="{{ isset($data[$field['name']]) ? Storage::url($data[$field['name']]) : asset('admin/assets/img/default-image.png') }}"
                                                    alt="{{ $field['label'] }}" class="image-preview-large" id="preview-{{ $field['name'] }}" />
                                                <input type="file" id="{{ $field['name'] }}" name="{{ $field['name'] }}" class="form-control"
                                                       onchange="previewImage(event, 'preview-{{ $field['name'] }}')"/>
                                            </div>
                                            <input type="hidden" name="{{ $field['name'] }}_current" value="{{ $data[$field['name']] ?? '' }}">
                                            @error($field['name'])
                                                <div class="text-danger">{{ $message }}</div>
                                            @enderror
                                        </div>

                                    @else
                                        <!-- 🔶 Input thông thường -->
                                        <div class="mb-3 col-md-6">
                                            <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                            @if($field['type'] == 'select')
                                                <select id="{{ $field['name'] }}" name="{{ $field['name'] }}" class="select2 form-select">
                                                    @foreach($field['options'] as $id => $name)
                                                        <option value="{{ $id }}" {{ (old($field['name'], $data[$field['name']] ?? '') == $id) ? 'selected' : '' }}>
                                                            {{ $name }}
                                                        </option>
                                                    @endforeach
                                                </select>
                                            @else
                                                <input type="{{ $field['type'] }}" class="form-control" id="{{ $field['name'] }}" name="{{ $field['name'] }}"
                                                       value="{{ old($field['name'], $data[$field['name']] ?? '') }}" placeholder="{{ $field['placeholder'] ?? '' }}">
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

<!-- 🛠️ JavaScript để preview ảnh -->
<script>
    function previewImage(event, targetId) {
        const reader = new FileReader();
        reader.onload = function () {
            document.getElementById(targetId).src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
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
        gap: 10px;
        border: 1px dashed #ccc;
        padding: 10px;
        border-radius: 8px;
        text-align: center;
    }
    .image-preview-large {
        width: 500px;
        height: 400px;
        object-fit: contain;
        border-radius: 8px;
        border: 2px solid #ddd;
        background-color: #f8f9fa;
        padding: 5px;
    }
</style>

@endsection
