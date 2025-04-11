@extends('admin.index')

@section('title', 'Chỉnh sửa bài viết')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Bài viết /</span> Chỉnh sửa bài viết</h4>

            <div class="row">
                <div class="col-12 col-md-12">
                    <div class="card mb-4">
                        <div class="card-body">
                            <form action="{{ route('admin.posts.update', $post->id) }}" method="POST"
                                enctype="multipart/form-data">
                                @csrf
                                @method('PUT')

                                <div class="row">
                                    <!-- Cột trái -->
                                    <div class="col-lg-8">
                                        <div class="card mb-4">
                                            <div class="card-body">
                                                <!-- Tiêu đề -->
                                                <div class="mb-3">
                                                    <label for="title" class="form-label">Tiêu đề bài viết</label>
                                                    <input type="text"
                                                        class="form-control @error('title') is-invalid @enderror"
                                                        id="title" name="title"
                                                        value="{{ old('title', $post->title) }}">
                                                    @error('title')
                                                        <div class="invalid-feedback">{{ $message }}</div>
                                                    @enderror
                                                </div>

                                                <!-- Slug -->
                                                <div class="mb-3">
                                                    <label for="slug" class="form-label">Slug</label>
                                                    <input type="text"
                                                        class="form-control @error('slug') is-invalid @enderror"
                                                        id="slug" name="slug" value="{{ old('slug', $post->slug) }}"
                                                        readonly>
                                                    @error('slug')
                                                        <div class="invalid-feedback">{{ $message }}</div>
                                                    @enderror
                                                </div>

                                                <!-- Nội dung -->
                                                <div class="mb-3">
                                                    <label for="content" class="form-label">Nội dung</label>
                                                    <textarea style="width: 100%; height: 300px;" class="form-control @error('content') is-invalid @enderror" id="content"
                                                        name="content">{{ old('content', $post->content) }}</textarea>
                                                    @error('content')
                                                        <div class="invalid-feedback">{{ $message }}</div>
                                                    @enderror
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Cột phải -->
                                    <div class="col-12 col-md-4">
                                        <div class="card mb-4">
                                            <div class="card-body">
                                                <!-- Danh mục -->
                                                <div class="mb-3">
                                                    <label for="category_id" class="form-label">Danh mục</label>
                                                    <select
                                                        class="form-select select2 @error('category_id') is-invalid @enderror"
                                                        id="category_id" name="category_id">
                                                        <option value="">Chọn danh mục</option>
                                                        @foreach ($categories as $category)
                                                            <option value="{{ $category->id }}"
                                                                {{ old('category_id', $post->category_id) == $category->id ? 'selected' : '' }}>
                                                                {{ $category->name }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                    @error('category_id')
                                                        <div class="invalid-feedback">{{ $message }}</div>
                                                    @enderror
                                                </div>

                                                <!-- Tác giả -->
                                                <div class="mb-3">
                                                    <label for="user_id" class="form-label">Tác giả</label>
                                                    <select
                                                        class="form-select select2 @error('user_id') is-invalid @enderror"
                                                        id="user_id" name="user_id">
                                                        <option value="">Chọn tác giả</option>
                                                        @foreach ($users as $author)
                                                            <option value="{{ $author->id }}"
                                                                {{ old('user_id', $post->user_id) == $author->id ? 'selected' : '' }}>
                                                                {{ $author->name }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                    @error('user_id')
                                                        <div class="invalid-feedback">{{ $message }}</div>
                                                    @enderror
                                                </div>

                                                <!-- Trạng thái -->
                                                <div class="mb-3">
                                                    <label for="status" class="form-label">Trạng thái</label>
                                                    <select class="form-select @error('status') is-invalid @enderror"
                                                        id="status" name="status">
                                                        <option value="draft"
                                                            {{ old('status', $post->status) == 'draft' ? 'selected' : '' }}>
                                                            Bản nháp
                                                        </option>
                                                        <option value="published"
                                                            {{ old('status', $post->status) == 'published' ? 'selected' : '' }}>
                                                            Đã xuất bản
                                                        </option>
                                                    </select>
                                                    @error('status')
                                                        <div class="invalid-feedback">{{ $message }}</div>
                                                    @enderror
                                                </div>

                                                <!-- Ảnh đại diện -->
                                                <div class="mb-3">
                                                    <label for="image" class="form-label">Ảnh đại diện</label>
                                                    <input type="file"
                                                        class="form-control @error('image') is-invalid @enderror"
                                                        id="image" name="image">
                                                    @error('image')
                                                        <div class="invalid-feedback">{{ $message }}</div>
                                                    @enderror
                                                    @if ($post->image)
                                                        <div class="mt-2">
                                                            <img src="{{ $post->image }}" width="70px"
                                                                alt="Ảnh bài viết">
                                                        </div>
                                                    @endif
                                                </div>

                                                <!-- Nút cập nhật và xóa -->
                                                <div class="d-flex justify-content-end gap-2">
                                                    <!-- Form xóa -->
                                                    <form action="{{ route('admin.posts.delete', $post->id) }}"
                                                        method="POST"
                                                        onsubmit="return confirm('Bạn có chắc chắn muốn xóa?')">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" class="btn btn-danger">
                                                            <i class="bx bx-trash"></i> Xóa
                                                        </button>
                                                    </form>

                                                    <!-- Nút cập nhật -->
                                                    <form action="{{ route('admin.posts.update', $post->id) }}"
                                                        method="POST" enctype="multipart/form-data">
                                                        @csrf
                                                        @method('PUT')
                                                        <button type="submit" class="btn btn-primary">
                                                            <i class="bx bx-save"></i> Cập nhật
                                                        </button>
                                                    </form>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Đảm bảo jQuery được tải trước -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- Thư viện Select2 -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>

    <!-- Thư viện CKEditor -->
    <script src="https://cdn.ckeditor.com/ckeditor5/36.0.1/classic/ckeditor.js"></script>

    <script>
        $.noConflict();
        jQuery(document).ready(function($) {
            $(".select2").select2();

            function slugify(text) {
                return text.toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-');
            }

            $('#title').on('input', function() {
                let slug = slugify($(this).val());
                $('#slug').val(slug);
            });

            ClassicEditor
                .create(document.querySelector('#content'))
                .catch(error => {
                    console.error(error);
                });
        });
    </script>
@endsection
