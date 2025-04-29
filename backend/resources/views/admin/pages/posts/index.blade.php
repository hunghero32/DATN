@extends('admin.index')

@section('title', 'Thông tin Bài viết')

@section('content')
<div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Danh Mục /</span> Bài Viết</h4>
        <div class="card">
            <!-- Thanh tìm kiếm & bộ lọc -->
            <div class="card-body">
                <form action="{{ route('admin.posts.index') }}" method="GET" class="mb-3">
                    <div class="row g-2 align-items-end">
                        <div class="col-md-3">
                            <input type="text" class="form-control" name="search"
                                placeholder="Tìm theo tiêu đề, nội dung, tác giả..." value="{{ request('search') }}">
                        </div>
                        <div class="col-md-2">
                            <select name="category_id" class="form-select">
                                <option value="">-- Lọc theo danh mục --</option>
                                @foreach ($categories as $category)
                                <option value="{{ $category->id }}"
                                    {{ request('category_id') == $category->id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select name="status" class="form-select">
                                <option value="">-- Trạng thái --</option>
                                <option value="draft" {{ request('status') == 'draft' ? 'selected' : '' }}>Nháp</option>
                                <option value="published" {{ request('status') == 'published' ? 'selected' : '' }}>Xuất bản</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <input type="date" class="form-control" name="published_at" value="{{ request('published_at') }}">
                        </div>
                        <div class="col-md-1 d-grid">
                            <button type="submit" class="btn btn-primary">Lọc</button>
                        </div>
                        <div class="col-md-2 text-end">
                            <a href="{{ route('admin.posts.create') }}" class="btn btn-success">Thêm mới</a>
                        </div>
                        @if (request('search') || request('category_id') || request('status') || request('published_at'))
                        <div class="col-md-1 d-grid">
                            <a href="{{ route('admin.posts.index') }}" class="btn btn-secondary">Quay lại</a>
                        </div>
                        @endif
                    </div>
                </form>
            </div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Danh mục</th>
                            <th>Tác giả</th>

                            <th>Tiêu đề</th>
                            <th>view</th>
                            <th>Ngày xuất bản </th>
                            <th><i class='bx bx-menu'></i></th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach ($posts as $key => $post)
                        <tr>
                            <td ><strong>{{ $key + 1 }}</strong></td>
                            <td >
                                {{ $post->category ? $post->category->name : 'Không có danh mục' }}
                            </td>
                            <td >{{ $post->user ? $post->user->name : 'Không có tác giả' }}</td>

                            <td>{{ $post->title }}</td>
                            <td>{{ $post->views }}</td>
                            <td>{{ $post->published_at }}</td>


                            <td >
                                <div class="d-flex justify-content-center gap-2">
                                    <a class="btn btn-sm btn-icon btn-primary"
                                        href="{{ route('admin.posts.edit', $post->id) }}" title="Chỉnh sửa">
                                        <i class="bx bx-edit-alt"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <!-- Phân trang -->
            <div class="d-flex justify-content-center mt-3">
                {{ $posts->links() }}
            </div>
        </div>
    </div>
</div>
@endsection