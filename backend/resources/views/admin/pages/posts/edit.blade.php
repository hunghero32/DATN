@extends('admin.index')

@section('title', 'Chỉnh sửa bài viết')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Bài viết /</span> Chỉnh sửa bài viết</h4>

            <div class="row">
                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-body">
                            <form id="editPostForm" action="{{ route('admin.posts.update', $post->id) }}" method="POST"
                                enctype="multipart/form-data">
                                @csrf
                                @method('PUT')

                                <div class="row">
                                    <!-- Cột bên trái -->
                                    <div class="col-md-6">
                                        <!-- Tiêu đề bài viết -->
                                        <div class="mb-3">
                                            <label for="title" class="form-label">Tiêu đề bài viết</label>
                                            <input type="text"
                                                class="form-control form-control-lg @error('title') is-invalid @enderror"
                                                id="title" name="title" placeholder="Tiêu đề bài viết"
                                                value="{{ old('title', $post->title) }}">
                                            @error('title')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>

                                        <!-- Slug -->
                                        <div class="mb-3">
                                            <label for="slug" class="form-label">Slug bài viết</label>
                                            <input type="text" class="form-control @error('slug') is-invalid @enderror"
                                                id="slug" name="slug" placeholder="Slug bài viết"
                                                value="{{ old('slug', $post->slug) }}" readonly>
                                            @error('slug')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>

                                        <!-- Nội dung -->
                                        <div class="mb-3">
                                            <label for="content" class="form-label">Nội dung bài viết</label>
                                            <textarea class="form-control @error('content') is-invalid @enderror" id="content" name="content" rows="10"
                                                placeholder="Nhập nội dung bài viết">{{ old('content', $post->content) }}</textarea>
                                            @error('content')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>

                                        <!-- Trạng thái -->
                                        <div class="mb-3">
                                            <label for="status" class="form-label">Trạng thái</label>
                                            <select class="form-select @error('status') is-invalid @enderror" id="status"
                                                name="status">
                                                <option value="draft"
                                                    {{ old('status', $post->status) == 'draft' ? 'selected' : '' }}>Bản nháp
                                                </option>
                                                <option value="published"
                                                    {{ old('status', $post->status) == 'published' ? 'selected' : '' }}>Đã
                                                    xuất bản</option>
                                            </select>
                                            @error('status')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    </div>

                                    <!-- Cột bên phải -->
                                    <div class="col-md-6">
                                        <!-- Danh mục -->
                                        <div class="mb-3 position-relative">
                                            <label for="category_name" class="form-label">Danh mục</label>
                                            <input type="text" class="form-control" id="category_name"
                                                placeholder="Nhập để tìm danh mục"
                                                value="{{ old('category_name', $post->category->name) }}">
                                            <input type="hidden" id="category_id" name="category_id"
                                                value="{{ old('category_id', $post->category_id) }}">
                                            <ul id="category-results"
                                                class="list-group position-absolute w-100 bg-white border"
                                                style="display: none; z-index: 1000;"></ul>
                                            @error('category_id')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>


                                    <div class="mb-3 col-md-6">
                                        <label for="status" class="form-label">Trạng thái</label>
                                        <select id="status" name="status" class="select2 form-select">
                                            @foreach ($statuss as $key => $value)
                                                <option value="{{ $key }}"
                                                    {{ isset($post) && $post->status == $key ? 'selected' : '' }}>
                                                    {{ $value }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>

                                        <!-- Ảnh đại diện -->
                                        <div class="mb-3">
                                            <label for="image" class="form-label">Ảnh đại diện</label>
                                            <input type="file" class="form-control @error('image') is-invalid @enderror"
                                                id="image" name="image">
                                            @if ($post->image)
                                                <img src="{{ asset('storage/' . $post->image) }}"
                                                    alt="Ảnh đại diện hiện tại" class="img-thumbnail mt-2"
                                                    style="max-height: 100px;">
                                            @endif
                                            @error('image')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    </div>
                                </div>

                                <!-- Nút cập nhật bài viết -->
                                <div class="text-end">
                                    <button type="submit" class="btn btn-primary" disabled>Cập nhật bài viết</button>
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
            // Disable the submit button by default
            $('button[type="submit"]').prop('disabled', true);

            // Tự động tạo slug từ title
            $('#title').on('keyup', function() {
                let title = $(this).val();
                let slug = title.toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, '') // Xóa ký tự đặc biệt
                    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu -
                    .replace(/-+/g, '-'); // Xóa các dấu - dư thừa
                $('#slug').val(slug);
            });

            // Search functionality for category and author
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
                        data: {
                            q: query
                        },
                        success: function(response) {
                            let results = $('#' + resultId);
                            results.empty().show();

                            if (response.length === 0) {
                                results.append(
                                    '<li class="list-group-item text-muted">Không tìm thấy</li>'
                                    );
                            } else {
                                response.forEach(item => {
                                    results.append(
                                        `<li class="list-group-item list-group-item-action" data-id="${item.id}">${item.name}</li>`
                                    );
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

                    // Validate form after selection
                    validateForm();
                });

                $(document).on('click', function(event) {
                    if (!$(event.target).closest('#' + inputId + ', #' + resultId).length) {
                        $('#' + resultId).hide();
                    }
                });
            }

            // Validate form: Check if both category and author are selected
            function validateForm() {
                let categorySelected = $('#category_id').val() !== '' && $('#category_id').val() !== null;
                let authorSelected = $('#author_id').val() !== '' && $('#author_id').val() !== null;

                // Enable or disable submit button based on validation
                if (categorySelected && authorSelected) {
                    $('button[type="submit"]').prop('disabled', false);
                } else {
                    $('button[type="submit"]').prop('disabled', true);
                }
            }

            // Initial form validation
            validateForm();

            // Search functionality for category and author
            searchData('category_name', 'category-results', 'category_id',
                "{{ route('admin.posts.searchCategory') }}");
            searchData('author_name', 'author-results', 'author_id', "{{ route('admin.posts.searchAuthor') }}");
        });
    </script>
@endsection
