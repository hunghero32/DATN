@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <h1 class="mb-4">Chỉnh Sửa Cấu Hình Hệ Thống</h1>

    <!-- Hiển thị thông báo thành công -->
    @if(session('success'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif

    <form action="{{ route('system.update', $system->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="row">
            <!-- Cột 1: Tên Web, URL và ảnh -->
            <div class="col-md-4">
                <!-- Tên Trang Web -->
                <div class="mb-3">
                    <label for="site_name" class="form-label">Tên Trang Web</label>
                    <input type="text" id="site_name" name="site_name" class="form-control @error('site_name') is-invalid @enderror" value="{{ old('site_name', $system->site_name) }}">
                    @error('site_name')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <!-- Logo Trang Web -->
                <div class="mb-3">
                    <label for="site_logo" class="form-label">Logo Trang Web</label>
                    <input type="file" id="site_logo" name="site_logo" class="form-control @error('site_logo') is-invalid @enderror">
                    @error('site_logo')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror

                    @if ($system->site_logo)
                    <div class="d-flex align-items-center mt-2">
                        <a href="{{ asset( 'storage/'.$system->site_logo) }}" target="_blank">
                            <img src="{{ asset( 'storage/'.$system->site_logo) }}" alt="Logo" class="rounded border" width="100" height="100" style="object-fit: contain;">
                        </a>
                        <a href="{{ asset( 'storage/'.$system->site_logo) }}" download class="btn btn-sm btn-primary ms-3">Tải về</a>
                    </div>
                    @endif
                </div>
                <div class="mb-3">
                    <label for="site_favicon" class="form-label">Favicon</label>
                    <input type="file" id="site_favicon" name="site_favicon" class="form-control @error('site_favicon') is-invalid @enderror">
                    @error('site_favicon')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror

                    @if ($system->site_favicon)
                    <div class="d-flex align-items-center mt-2">
                        <a href="{{ asset( 'storage/'.$system->site_favicon) }}" target="_blank">
                            <img src="{{ asset( 'storage/'.$system->site_favicon) }}" alt="Favicon" class="rounded border" width="50" height="50" style="object-fit: contain;">
                        </a>
                        <a href="{{ asset( 'storage/'.$system->site_favicon) }}" download class="btn btn-sm btn-primary ms-3">Tải về</a>
                    </div>
                    @endif
                </div>
            </div>

            <!-- Cột 2: Mô tả, Meta Tags -->
            <div class="col-md-4">
                <!-- URL Trang Web -->
                <div class="mb-3">
                    <label for="site_url" class="form-label">URL Trang Web</label>
                    <input type="url" id="site_url" name="site_url" class="form-control @error('site_url') is-invalid @enderror" value="{{ old('site_url', $system->site_url) }}">
                    @error('site_url')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                
                <!-- Ngôn Ngữ Mặc Định -->
                <div class="mb-3">
                    <label for="default_language" class="form-label">Ngôn Ngữ Mặc Định</label>
                    <select id="default_language" name="default_language" class="form-control @error('default_language') is-invalid @enderror">
                        <option value="vi" {{ old('default_language', $system->default_language) == 'vi' ? 'selected' : '' }}>Tiếng Việt</option>
                        <option value="en" {{ old('default_language', $system->default_language) == 'en' ? 'selected' : '' }}>English</option>
                    </select>
                    @error('default_language')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Múi Giờ -->
                <div class="mb-3">
                    <label for="timezone" class="form-label">Múi Giờ</label>
                    <select id="timezone" name="timezone" class="form-control @error('timezone') is-invalid @enderror">
                        <option value="Asia/Ho_Chi_Minh" {{ old('timezone', $system->timezone) == 'Asia/Ho_Chi_Minh' ? 'selected' : '' }}>Asia/Ho_Chi_Minh</option>
                        <option value="America/New_York" {{ old('timezone', $system->timezone) == 'America/New_York' ? 'selected' : '' }}>America/New_York</option>
                        <option value="UTC" {{ old('timezone', $system->timezone) == 'UTC' ? 'selected' : '' }}>UTC</option>
                    </select>
                    @error('timezone')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <!-- Thẻ Meta -->
                <div class="mb-3">
                    <label for="meta_tags" class="form-label">Thẻ Meta</label>
                    <textarea id="meta_tags" name="meta_tags" rows="4" class="form-control @error('meta_tags') is-invalid @enderror">{{ old('meta_tags', $system->meta_tags) }}</textarea>
                    @error('meta_tags')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <!-- Cột 3: Thông tin công ty -->
            <div class="col-md-4">
                <!-- Địa Chỉ Công Ty -->
                <div class="mb-3">
                    <label for="company_address" class="form-label">Địa Chỉ Công Ty</label>
                    <input type="text" id="company_address" name="company_address" class="form-control @error('company_address') is-invalid @enderror" value="{{ old('company_address', $system->company_address) }}">
                    @error('company_address')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Số Điện Thoại Công Ty -->
                <div class="mb-3">
                    <label for="company_phone" class="form-label">Số Điện Thoại Công Ty</label>
                    <input type="text" id="company_phone" name="company_phone" class="form-control @error('company_phone') is-invalid @enderror" value="{{ old('company_phone', $system->company_phone) }}">
                    @error('company_phone')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <!-- Email Công Ty -->
                <div class="mb-3">
                    <label for="company_email" class="form-label">Email Công Ty</label>
                    <input type="email" id="company_email" name="company_email" class="form-control @error('company_email') is-invalid @enderror" value="{{ old('company_email', $system->company_email) }}">
                    @error('company_email')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <!-- Mô Tả -->
                <div class="mb-3">
                    <label for="site_description" class="form-label">Mô Tả</label>
                    <textarea id="site_description" name="site_description" rows="4" class="form-control @error('site_description') is-invalid @enderror">{{ old('site_description', $system->site_description) }}</textarea>
                    @error('site_description')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>
        </div>

        <!-- Nút Lưu -->
        <button type="submit" class="btn btn-primary mt-4">Lưu Thay Đổi</button>
    </form>
</div>
@endsection