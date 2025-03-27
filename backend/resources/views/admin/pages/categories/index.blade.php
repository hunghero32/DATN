@extends('admin.index')
@section('title', 'Thông tin danh mục')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="fw-bold">DANH MỤC SẢN PHẨM</h4>
                <a href="{{ route('admin.categories.create') }}" class="btn btn-success">
                    <i class="bx bx-plus"></i> Thêm mới
                </a>
            </div>

            <!-- Form tìm kiếm -->
            <form action="{{ route('admin.categories.index') }}" method="GET" class="d-flex justify-content-end mb-3">
                <div class="input-group w-25">
                    <input type="text" id="searchInput" name="search" class="form-control"
                        placeholder="Tìm kiếm theo tên..." value="{{ request('search') }}">
                    <button type="submit" class="btn btn-primary">
                        <i class="bx bx-search"></i> Tìm kiếm
                    </button>
                </div>
            </form>

            <div class="card shadow-sm">
                <div class="table-responsive">
                    <table class="table table-hover table-striped table-bordered">
                        <thead class="table-primary text-center">
                            <tr>
                                <th>ID</th>
                                <th>Tên danh mục</th>
                                <th>Danh mục cha</th>
                                <th>Mô tả</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody class="text-center align-middle">
                            @foreach ($listCategory as $category)
                                <tr>
                                    <td><strong>{{ $category->id }}</strong></td>
                                    <td>
                                        <a href="{{ route('admin.categories.index', $category->id) }}"
                                            class="text-primary fw-bold">
                                            {{ $category->name }}
                                        </a>
                                    </td>
                                    <td>{{ $category->parent ? $category->parent->name : 'Không có' }}</td>
                                    <td>
                                        <textarea class="form-control" readonly>{{ $category->description }}</textarea>
                                    </td>
                                    <td>
                                        <div class="btn-group">
                                            <a href="{{ route('admin.categories.edit', $category->id) }}"
                                                class="btn btn-warning btn-sm">
                                                <i class="bx bx-edit-alt"></i> Sửa
                                            </a>
                                            <form action="{{ route('admin.categories.delete', $category->id) }}"
                                                method="POST">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger btn-sm"
                                                    onclick="return confirm('Bạn có muốn xóa không?')">
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

                <!-- Phân trang -->
                <div class="mt-3 d-flex justify-content-center">
                    {{ $listCategory->links('pagination::bootstrap-5') }}
                </div>
            </div>
        </div>
    </div>

    <!-- Hiển thị thông báo thành công -->
    @if (session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bx bx-check-circle"></i> {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <!-- Script tìm kiếm -->
    <script>
        document.getElementById('searchInput').addEventListener('keyup', function() {
            let filter = this.value.toLowerCase();
            let rows = document.querySelectorAll('#categoryTable tr');

            rows.forEach(row => {
                let name = row.querySelector('td:nth-child(2) a').innerText.toLowerCase();
                row.style.display = name.includes(filter) ? '' : 'none';
            });
        });
    </script>
@endsection
