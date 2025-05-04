@extends('admin.index')

@section('title', 'Cập nhật Banner')

@section('content')
<div class="container py-4">
    <h2 class="mb-4">Cập nhật Banner</h2>

    @if(session('success'))
    <div class="alert alert-success mb-4">{{ session('success') }}</div>
    @endif

    <form action="{{ route('admin.systems.updateBanner') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div id="banners-container">
            @foreach($banners ?? [] as $index => $banner)
            <div class="card mb-3" id="banner-{{ $index }}">
                <div class="card-body">
                    <h5 class="card-title">Banner {{ $index + 1 }}</h5>

                    <div class="row">
                        <!-- Cột bên trái: Tên banner và file -->
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Tên banner</label>
                            <input type="text" name="banners[{{ $index }}][title]" class="form-control" value="{{ old('banners.' . $index . '.title', $banner['title'] ?? '') }}">

                            <label class="form-label mt-3">Hình ảnh banner</label>
                            <input type="file" name="banners[{{ $index }}][image_url]" class="form-control" onchange="previewImage(event, {{ $index }})">
                        </div>

                        <!-- Cột bên phải: Ảnh banner -->
                        <div class="col-md-6 mb-3">
                            <div class="row">
                                <!-- Hiển thị ảnh hiện tại nếu có -->
                                @if(isset($banner['image_url']))
                                <div class="col-6 text-center mb-3">
                                    <label class="form-label">Ảnh hiện tại</label>
                                    <img src="{{ asset('storage/' . $banner['image_url']) }}" alt="Banner Image" class="img-fluid" style="max-height: 250px; margin-bottom: 10px;">
                               </div>
                                @else
                                <div class="col-6 text-center mb-3">
                                    <label class="form-label">Ảnh chưa có</label>
                                    <p>Chưa có ảnh cho banner này</p>
                                </div>
                                @endif

                                <!-- Hiển thị ảnh mới chọn -->
                                <div class="col-6 text-center mt-3">
                                    <label class="form-label">Ảnh mới</label>
                                    <img id="preview-image-{{ $index }}" src="" alt="Preview Image" class="img-fluid" style="max-height: 250px; display: none;">
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="btn btn-danger mt-2" onclick="removeBannerField({{ $index }})">Xóa Banner</button>
                </div>
            </div>
            @endforeach
        </div>

        <div class="d-flex justify-content-between align-items-center mt-4">
    <button type="button" class="btn btn-secondary" onclick="addBannerField()">+ Thêm Banner</button>
    <button type="submit" class="btn btn-primary">💾 Cập nhật Banner</button>
</div>
</form>
</div>

<script>
    let bannerIndex = {{ count($banners ?? []) }};

    // Hàm thêm banner
    function addBannerField() {
        const container = document.getElementById('banners-container');
        const newBannerField = `
            <div class="card mb-3" id="banner-${bannerIndex}">
                <div class="card-body">
                    <h5 class="card-title">Banner ${bannerIndex + 1}</h5>

                    <div class="row">
                        <!-- Cột bên trái: Tên banner và file -->
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Tên banner</label>
                            <input type="text" name="banners[${bannerIndex}][title]" class="form-control">

                            <label class="form-label mt-3">Hình ảnh banner</label>
                            <input type="file" name="banners[${bannerIndex}][image_url]" class="form-control" onchange="previewImage(event, ${bannerIndex})">
                        </div>

                        <!-- Cột bên phải: Ảnh banner -->
                        <div class="col-md-6 mb-3">
                            <div class="d-flex justify-content-center mb-3">
                                <div class="text-center" style="max-width: 100%; min-height: 250px; display: flex; justify-content: center; align-items: center;">
                                    <label class="form-label">Ảnh chưa có</label>
                                    <p>Chưa có ảnh cho banner này</p>
                                </div>
                            </div>

                            <!-- Hiển thị ảnh mới chọn -->
                            <div class="d-flex justify-content-center mt-3">
                                <div id="image-preview-${bannerIndex}" class="text-center">
                                    <label class="form-label">Ảnh mới</label>
                                    <img id="preview-image-${bannerIndex}" src="" alt="Preview Image" class="img-fluid" style="max-height: 250px; display: none;">
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="btn btn-danger mt-2" onclick="removeBannerField(${bannerIndex})">Xóa Banner</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', newBannerField);
        bannerIndex++;
    }

    // Hàm xóa banner
    function removeBannerField(index) {
        const bannerElement = document.getElementById('banner-' + index);
        bannerElement.remove();
    }

    // Hàm xem trước ảnh khi chọn file
    function previewImage(event, index) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const imagePreview = document.getElementById('preview-image-' + index);
            if (file) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block'; // Hiển thị ảnh mới
            } else {
                imagePreview.style.display = 'none'; // Ẩn ảnh mới nếu không có file
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }
</script>

@endsection
