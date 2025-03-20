@extends('admin.index')
@section('title', 'Thêm Cấu Hình Website')

@section('content')
<div class="container mt-4">
    <h4 class="fw-bold">
        <span class="text-muted fw-light">Quản lý hệ thống /</span> Thêm Cấu Hình Website
    </h4>

    <div class="card shadow-sm">
        <div class="card-body">
            <form action="{{ route('admin.systems.store') }}" method="POST" enctype="multipart/form-data">
                @csrf

                <!-- Tên Website -->
                <div class="mb-3">
                    <label for="site_name" class="form-label fw-bold">Tên Website</label>
                    <input type="text" name="site_name" id="site_name" class="form-control" required
                        placeholder="Nhập tên website" value="{{ old('site_name') }}">
                    @error('site_name') <small class="text-danger">{{ $message }}</small> @enderror
                </div>

                <!-- Mô tả -->
                <div class="mb-3">
                    <label for="site_description" class="form-label fw-bold">Mô tả</label>
                    <textarea name="site_description" id="site_description" class="form-control" rows="3" placeholder="Nhập mô tả">{{ old('site_description') }}</textarea>
                    @error('site_description') <small class="text-danger">{{ $message }}</small> @enderror
                </div>

                <!-- Từ khóa -->
                <div class="mb-3">
                    <label for="site_keywords" class="form-label fw-bold">Từ khoá</label>
                    <input type="text" name="site_keywords" id="site_keywords" class="form-control"
                        placeholder="Nhập từ khóa, cách nhau bởi dấu phẩy" value="{{ old('site_keywords') }}">
                    @error('site_keywords') <small class="text-danger">{{ $message }}</small> @enderror
                </div>

                <!-- Logo -->
                <div class="mb-3">
                    <label for="site_logo" class="form-label fw-bold">Logo</label>
                    <input type="file" name="site_logo" id="site_logo" class="form-control">
                    @error('site_logo') <small class="text-danger">{{ $message }}</small> @enderror
                </div>

                <!-- Favicon -->
                <div class="mb-3">
                    <label for="site_favicon" class="form-label fw-bold">Favicon</label>
                    <input type="file" name="site_favicon" id="site_favicon" class="form-control">
                    @error('site_favicon') <small class="text-danger">{{ $message }}</small> @enderror
                </div>

                <!-- URL -->
                <div class="mb-3">
                    <label for="site_url" class="form-label fw-bold">URL</label>
                    <input type="url" name="site_url" id="site_url" class="form-control"
                        placeholder="Nhập URL website" value="{{ old('site_url') }}">
                    @error('site_url') <small class="text-danger">{{ $message }}</small> @enderror
                </div>

                <!-- Meta Tags -->
                <div class="mb-3">
                    <label for="meta_tags" class="form-label fw-bold">Meta Tags</label>
                    <input type="text" name="meta_tags" id="meta_tags" class="form-control"
                        placeholder="Nhập Meta Tags" value="{{ old('meta_tags') }}">
                    @error('meta_tags') <small class="text-danger">{{ $message }}</small> @enderror
                </div>

                <!-- Ngôn ngữ mặc định -->
                <div class="mb-3">
                    <label for="default_language" class="form-label fw-bold">Ngôn ngữ mặc định</label>
                    <select name="default_language" id="default_language" class="form-select">
                        <option value="vi" {{ old('default_language') == 'vi' ? 'selected' : '' }}>Tiếng Việt</option>
                        <option value="en" {{ old('default_language') == 'en' ? 'selected' : '' }}>English</option>
                    </select>
                    @error('default_language') <small class="text-danger">{{ $message }}</small> @enderror
                </div>

                <!-- Múi giờ -->
                <div class="mb-3">
                    <label for="timezone" class="form-label fw-bold">Múi giờ</label>
                    <select name="timezone" id="timezone" class="form-select">
                        <option value="Asia/Ho_Chi_Minh" {{ old('timezone') == 'Asia/Ho_Chi_Minh' ? 'selected' : '' }}>Asia/Ho_Chi_Minh</option>
                        <option value="UTC" {{ old('timezone') == 'UTC' ? 'selected' : '' }}>UTC</option>
                    </select>
                    @error('timezone') <small class="text-danger">{{ $message }}</small> @enderror
                </div>

                <!-- Tracking Code -->
                <div class="mb-3">
                    <label for="tracking_code" class="form-label fw-bold">Tracking Code</label>
                    <textarea name="tracking_code" id="tracking_code" class="form-control" rows="2"
                        placeholder="Nhập tracking code">{{ old('tracking_code') }}</textarea>
                    @error('tracking_code') <small class="text-danger">{{ $message }}</small> @enderror
                </div>




              

                <div class="text-end">
                    <a href="{{ route('admin.systems.index') }}" class="btn btn-secondary">
                        <i class="bi bi-arrow-left"></i> Hủy
                    </a>
                    <button type="submit" class="btn btn-primary">
                        <i class="bi bi-save"></i> Lưu cấu hình
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
