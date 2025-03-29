@extends('admin.index')
@section('title', 'Sua mới')
@section('content')
    <div class="content-wrapper">

        <!-- Content -->

        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Settings /</span> sua bài viết</h4>

            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-4">
                        <h5 class="card-header">Profile Details</h5>
                        <!-- Account -->

                        <hr class="my-0" />
                        <div class="card-body">
                            <form action="{{ route('admin.posts.update', $post->id) }}" method="POST"
                                enctype="multipart/form-data">
                                @method('PUT')
                                @csrf

                                <div class="row mt-3">
                                    <div class="mb-3 col-md-12">

                                        <div class="d-flex align-items-start align-items-sm-center gap-4">

                                            <div class="button-wrapper">

                                            </div>
                                        </div>

                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="title" class="form-label">Tiêu đề</label>
                                        <input type="text" class="form-control" id="title" name="title"
                                            value="{{ $post->title }}" placeholder="">
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="user_id" class="form-label">danh muc </label>
                                        <select id="category_id" name="category_id" class="select2 form-select">
                                            <option value="">-- Chọn danh mục --</option>
                                            @foreach ($categories as $category)
                                                <option value="{{ $category->id }}"
                                                    {{ $post->category_id == $category->id ? 'selected' : '' }}>
                                                    {{ $category->name }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label for="user_id" class="form-label">Tác giả </label>
                                        <select id="user_id" name="user_id" class="select2 form-select">
                                            <option value="">-- Chọn tác giả --</option>
                                            @foreach ($users as $user)
                                                <option value="{{ $user->id }}"
                                                    {{ $post->category_id == $user->id ? 'selected' : '' }}>
                                                    {{ $user->name }}
                                                </option>
                                            @endforeach
                                        </select>
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
                                    <div class="mb-3 col-md-6">
                                        <label for="image" class="form-label">Ảnh</label>
                                        <input type="file" class="form-control" id="image" name="image">

                                        @if (isset($post) && $post->image)
                                            <div class="mt-2">
                                                <img src="{{ Storage::url($post->image) }}" width="100px"
                                                    style="border-radius: 5px;">
                                            </div>
                                        @endif
                                    </div>


                                    <div class="mb-3 col-md-6">
                                        <label for="slug" class="form-label">slug</label>
                                        <input type="text" class="form-control" id="slug" name="slug"
                                            value="{{ $post->slug }}" placeholder="">
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="contentcontent" class="form-label">content</label>
                                        <textarea name="content">{{ old('content', $post->content ?? '') }}</textarea>
                                    </div>

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

    </div>
@endsection
