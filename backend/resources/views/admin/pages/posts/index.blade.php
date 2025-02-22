@extends('admin.index')

@section('title', 'Thông tin Bài viết')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Tables /</span> POSTS</h4>

            <div class="text-end mb-3">
                <a href="{{route('admin.posts.create')}}" class="btn btn-success">Thêm mới</a>
            </div>

            <div class="card mt-3">
                <div class="table-responsive text-nowrap">
                    <table class="table table-bordered table-hover align-middle">
                        <thead class="table-dark text-center">
                            <tr>
                                <th>ID</th>
                                <th>Danh mục</th>
                                <th>Tác giả</th>
                                <th>Slug</th>
                                <th>Tiêu đề</th>
                                <th>Nội dung</th>
                                <th>Lượt xem</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            @foreach ($post as $key => $value)
                                <tr>
                                    <td class="text-center"><strong>{{ $key + 1 }}</strong></td>
                                    <td class="text-center">{{ $value->category ? $value->category->name : 'Không có danh mục' }}</td>
                                    <td class="text-center">{{ $value->user ? $value->user->name : 'Không có tác giả' }}</td>
                                    <td>{{ $value->slug }}</td>
                                    <td>{{ $value->title }}</td>
                                    <td>{{ Str::limit($value->content, 50) }}</td>
                                    <td class="text-center">{{ $value->views }}</td>
                                    <td class="text-center">
                                        <span class="badge bg-warning text-dark">{{ ucfirst($value->status) }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="d-flex justify-content-center gap-2">
                                            <a class="btn btn-primary btn-sm" href="{{route('admin.posts.edit',$value->id)}}">
                                                <i class="bx bx-edit-alt"></i> Sửa
                                            </a>
                                            <form action="{{route('admin.posts.delete',$value->id)}}" method="POST" onsubmit="return confirm('Bạn có chắc chắn muốn xóa?')">
                                                @method('DELETE')
                                                @csrf
                                                <button type="submit" class="btn btn-danger btn-sm">
                                                    <i class="bx bx-trash"></i> Xóa
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="content-backdrop fade"></div>
    </div>
@endsection
