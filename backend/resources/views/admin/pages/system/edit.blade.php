@extends('admin.index')
@section('title', 'Chỉnh Sửa Cấu Hình Hệ Thống')

@section('content')
    <div class="container mt-4">
        <h2 class="fw-bold text-center mb-4">Chỉnh Sửa Cấu Hình Hệ Thống</h2>

        <div class="card shadow-sm p-4">
            <div class="card-body">
                <form action="{{ route('admin.systems.update', $system->id) }}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')

                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">TÊN TRANG WEB</label>
                            <input type="text" name="site_name" class="form-control" required
                                value="{{ old('site_name', $system->site_name) }}">
                        </div>

                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">URL TRANG WEB</label>
                            <input type="url" name="site_url" class="form-control" required
                                value="{{ old('site_url', $system->site_url) }}">
                        </div>

                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">NGÔN NGỮ MẶC ĐỊNH</label>
                            <select name="default_language" class="form-control">
                                <option value="vi"
                                    {{ old('default_language', $system->default_language) == 'vi' ? 'selected' : '' }}>Tiếng
                                    Việt</option>
                                <option value="en"
                                    {{ old('default_language', $system->default_language) == 'en' ? 'selected' : '' }}>
                                    English</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">LOGO TRANG WEB</label>
                            <input type="file" name="site_logo" class="form-control">
                            @if ($system->site_logo)
                                <div class="mt-2">
                                    <img src="{{ asset('storage/' . $system->site_logo) }}" alt="Logo" width="80">
                                    <a href="{{ asset('storage/' . $system->site_logo) }}"
                                        class="btn btn-primary btn-sm">Tải
                                        về</a>
                                </div>
                            @endif
                        </div>


                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">FAVICON</label>
                            <input type="file" name="site_favicon" class="form-control">
                            @if ($system->site_favicon)
                                <div class="mt-2">
                                    <img src="{{ asset('storage/' . $system->site_favicon) }}" alt="Logo"
                                        width="80">
                                    <a href="{{ asset('storage/' . $system->site_favicon) }}"
                                        class="btn btn-primary btn-sm">Tải
                                        về</a>
                                </div>
                            @endif
                        </div>

                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">MÚI GIỜ</label>
                            <select name="timezone" class="form-control">
                                <option value="UTC+7"
                                    {{ old('timezone', $system->timezone) == 'UTC+7' ? 'selected' : '' }}>UTC+7 (Vietnam)
                                </option>
                                <option value="UTC+8"
                                    {{ old('timezone', $system->timezone) == 'UTC+8' ? 'selected' : '' }}>UTC+8 (China,
                                    Singapore)</option>
                                <!-- Thêm các múi giờ khác nếu cần -->
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">THẺ META</label>
                            <textarea name="meta_tags" class="form-control" rows="2">{{ old('meta_tags', $system->meta_tags) }}</textarea>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">MÔ TẢ</label>
                            <textarea name="site_description" class="form-control" rows="2">{{ old('site_description', $system->site_description) }}</textarea>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">MÃ THEO DÕI</label>
                            <textarea name="tracking_code" class="form-control" rows="2">{{ old('tracking_code', $system->tracking_code) }}</textarea>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">TỪ KHÓA</label>
                            <textarea name="site_keywords" class="form-control" rows="2">{{ old('site_keywords', $system->site_keywords) }}</textarea>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">ĐỊA CHỈ</label>
                            <input type="text" name="address" class="form-control"
                                value="{{ old('address', $system->address) }}">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">HOTLINE</label>
                            <input type="text" name="hotline" class="form-control"
                                value="{{ old('hotline', $system->hotline) }}">
                        </div>
                    </div>

                    <div class="text-center mt-4">
                        <button type="submit" class="btn btn-primary px-4 py-2">
                            <i class="bi bi-save"></i> Lưu Thay Đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
