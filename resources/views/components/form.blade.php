@extends('admin.index')
@section('title', 'Tạo mới')
@section('content')
<div class="content-wrapper">
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Settings /</span> Thêm thông tin bác sĩ</h4>

        <div class="row">
            <div class="col-md-12">
                <div class="card mb-4">
                    <h5 class="card-header">Profile Details</h5>

                    <!-- Account -->
                    <hr class="my-0" />
                    <div class="card-body">
                        <form action="{{ $action }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            @method($method)

                            <div class="row mt-3">
                                @foreach($fields as $field)
                                    @if($field['type'] == 'image')
                                        <div class="mb-3 col-md-12">
                                            <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                            <div class="d-flex align-items-start align-items-sm-center gap-4">
                                                <img src="{{ isset($data[$field['name']]) ? Storage::url($data[$field['name']]) : asset('admin/assets/img/avatars/1.png') }}"
                                                    alt="user-avatar" class="d-block rounded" height="100" width="100" id="uploadedAvatar" />
                                                <div class="button-wrapper">
                                                    <label for="{{ $field['name'] }}" class="btn btn-primary me-2 mb-4">
                                                        <i class="bx bx-upload d-block d-sm-none"></i>
                                                        <input type="file" id="{{ $field['name'] }}" name="{{ $field['name'] }}" class="account-file-input"/>
                                                    </label>
                                                    <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                                                        <i class="bx bx-reset d-block d-sm-none"></i>
                                                        <span class="d-none d-sm-block">Reset</span>
                                                    </button>
                                                </div>
                                            </div>
                                            @error($field['name'])
                                                <div class="text-danger">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    @else
                                        <div class="mb-3 col-md-6">
                                            <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                            @if($field['type'] == 'select')
                                                <select id="{{ $field['name'] }}" name="{{ $field['name'] }}" class="select2 form-select">
                                                    @foreach($field['options'] as $option)
                                                        <option value="{{ $option }}" {{ old($field['name']) == $option ? 'selected' : '' }}>
                                                            {{ $option }}
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
@endsection
