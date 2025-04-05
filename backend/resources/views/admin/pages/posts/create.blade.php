@extends('admin.index')

@section('title', 'Tạo bài viết mới')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Bài viết /</span> Thêm bài viết</h4>

            <div class="row">
                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body">
                            <form action="{{ route('admin.posts.store') }}" method="POST" enctype="multipart/form-data">
                                @csrf

                                <!-- Tiêu đề bài viết -->
                                <div class="mb-3">
                                    <label for="title" class="form-label">Tiêu đề bài viết</label>
                                    <input type="text" class="form-control form-control-lg @error('title') is-invalid @enderror"
                                           id="title" name="title" placeholder="Tiêu đề bài viết" value="{{ old('title') }}">
                                    @error('title')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Slug -->
                                <div class="mb-3">
                                    <label for="slug" class="form-label">Slug bài viết</label>
                                    <input type="text" class="form-control @error('slug') is-invalid @enderror"
                                           id="slug" name="slug" placeholder="Slug bài viết" value="{{ old('slug') }}" readonly>
                                    @error('slug')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Nội dung -->
                                <div class="mb-3">
                                    <label for="content" class="form-label">Nội dung bài viết</label>
                                    <textarea class="form-control @error('content') is-invalid @enderror"
                                              id="content" name="content" rows="10" placeholder="Nhập nội dung bài viết">{{ old('content') }}</textarea>
                                    @error('content')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Cột phải: Trạng thái, Danh mục, Tác giả, Ảnh đại diện -->
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <form action="{{ route('admin.posts.store') }}" method="POST" enctype="multipart/form-data">
                                @csrf

                                <!-- Trạng thái -->
                                <div class="mb-3">
                                    <label for="status" class="form-label">Trạng thái</label>
                                    <select class="form-select @error('status') is-invalid @enderror" id="status" name="status">
                                        <option value="draft" {{ old('status') == 'draft' ? 'selected' : '' }}>Bản nháp</option>
                                        <option value="published" {{ old('status') == 'published' ? 'selected' : '' }}>Đã xuất bản</option>
                                    </select>
                                    @error('status')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                    <div class="mb-3 col-md-6">
                                        <label for="slug" class="form-label">Slug</label>
                                        <input type="text" class="form-control @error('slug') is-invalid @enderror"
                                            id="slug" name="slug" value="{{ old('slug') }}" placeholder="">
                                        @error('slug')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                        @enderror
                                    </div>

                                <!-- Tác giả -->
                                <div class="mb-3">
                                    <label for="author_name" class="form-label">Tác giả</label>
                                    <input type="text" class="form-control" id="author_name" placeholder="Nhập để tìm tác giả">
                                    <input type="hidden" id="author_id" name="user_id" value="{{ old('user_id') }}">
                                    <ul id="author-results" class="list-group position-absolute w-100 bg-white border" style="display: none; z-index: 1000;"></ul>
                                    @error('user_id')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Ảnh đại diện -->
                                <div class="mb-3">
                                    <label for="image" class="form-label">Ảnh đại diện</label>
                                    <input type="file" class="form-control @error('image') is-invalid @enderror" id="image"
                                           name="image">
                                    @error('image')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Nút lưu bài viết -->
                                <div class="text-end">
                                    <button type="submit" class="btn btn-primary">Lưu bài viết</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Thư viện jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            // Tự động tạo slug từ title
            $('#title').on('keyup', function() {
                let title = $(this).val();
                let slug = title.toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, '') // Xóa ký tự đặc biệt
                    .replace(/\s+/g, '-')         // Thay khoảng trắng bằng dấu -
                    .replace(/-+/g, '-');         // Xóa các dấu - dư thừa
                $('#slug').val(slug);
            });

            function searchData(inputId, resultId, hiddenId, route) {
                $('#' + inputId).on('keyup', function() {
                    let query = $(this).val().trim();
                    if (query.length < 2) {
                        $('#' + resultId).hide();
                        return;
                    }

                    $.ajax({
                        url: route,
                        type: "GET",
                        data: { q: query },
                        success: function(response) {
                            let results = $('#' + resultId);
                            results.empty().show();

                            if (response.length === 0) {
                                results.append('<li class="list-group-item text-muted">Không tìm thấy</li>');
                            } else {
                                response.forEach(item => {
                                    results.append(`<li class="list-group-item list-group-item-action" data-id="${item.id}">${item.name}</li>`);
                                });
                            }
                        },
                        error: function(xhr) {
                            console.log(xhr.responseText);
                        }
                    });
                });

                $(document).on('click', '#' + resultId + ' li', function() {
                    let selectedText = $(this).text();
                    let selectedId = $(this).data('id');
                    $('#' + inputId).val(selectedText);
                    $('#' + hiddenId).val(selectedId);
                    $('#' + resultId).hide();
                });

                $(document).on('click', function(event) {
                    if (!$(event.target).closest('#' + inputId + ', #' + resultId).length) {
                        $('#' + resultId).hide();
                    }
                });
            }

            searchData('category_name', 'category-results', 'category_id', "{{ route('admin.posts.searchCategory') }}");
            searchData('author_name', 'author-results', 'author_id', "{{ route('admin.posts.searchAuthor') }}");
        });
    </script>
@endsection
