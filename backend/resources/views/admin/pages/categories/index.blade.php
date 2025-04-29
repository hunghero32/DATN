@extends('admin.index')
@section('title', 'Thông tin Danh mục')

@section('content')
<div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Quản lý /</span> Danh Mục</h4>

        {{-- Thông báo --}}
        @if (session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bx bx-check-circle"></i> {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        @endif

        @if (session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bx bx-error-circle"></i> {{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        @endif

        <div class="card">
            <!-- Bộ lọc -->
            <div class="card-body">
                <form action="{{ route('admin.categories.index') }}" method="GET" class="mb-3">
                    <div class="d-flex justify-content-between flex-wrap align-items-end">
                        <!-- Bên trái: Tìm kiếm + Quay lại -->
                        <div class="d-flex gap-2 flex-wrap align-items-end col-md-6 col-sm-12">
                            <div class="input-group">
                                <input type="text" id="searchInput" name="search" class="form-control"
                                    placeholder="Tìm kiếm theo tên danh mục..." value="{{ request('search') }}">
                                <button type="submit" class="btn btn-primary">
                                    <i class="bx bx-search"></i> Tìm kiếm
                                </button>
                            </div>

                            @if(request('search'))
                            <a href="{{ route('admin.categories.index') }}" class="btn btn-secondary">
                                Quay lại
                            </a>
                            @endif
                        </div>

                        <!-- Bên phải: Thêm mới -->
                        <a href="{{ route('admin.categories.create') }}" class="btn btn-success col-md-2 col-sm-12">
                            <i class="bx bx-plus"></i> Thêm mới
                        </a>
                    </div>
                </form>
            </div>

            <!-- Bảng danh sách -->
            <div class="table-responsive px-3 pb-3">
                <table class="table table-hover">
                    <thead class=" text-center">
                        <tr>
                            <th>#</th>
                            <th>Tên danh mục</th>
                            <th>Danh mục cha</th>
                            <th>Mô tả</th>
                            <th><i class='bx bx-menu'></i></th>
                        </tr>
                    </thead>
                    <tbody class="text-center align-middle">
                        @foreach ($listCategory as $category)
                        <tr>
                            <td><strong>{{ ($listCategory->currentPage() - 1) * $listCategory->perPage() + $loop->iteration }}</strong></td>
                            <td>
                                <a href="{{ route('admin.categories.index', $category->id) }}" class="fw-bold text-primary">
                                    {{ $category->name }}
                                </a>
                            </td>
                            <td>{{ $category->parent ? $category->parent->name : 'Không có' }}</td>
                            <td>
                                <textarea class="form-control" rows="1" readonly>{{ $category->description }}</textarea>
                            </td>
                            <td>
                                <div class="d-flex justify-content-center gap-2">
                                    <a class="btn btn-sm btn-icon btn-primary"
                                        href="{{ route('admin.categories.edit', $category->id) }}" title="Chỉnh sửa">
                                        <i class="bx bx-edit-alt"></i>
                                    </a>
                                    {{-- Thêm các hành động khác nếu cần --}}
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <!-- Phân trang -->
            <div class="d-flex justify-content-center mt-3">
                {{ $listCategory->links() }}
            </div>
        </div>
    </div>
</div>

{{-- Tìm kiếm realtime (nếu vẫn muốn giữ) --}}
<script>
    document.getElementById('searchInput').addEventListener('keyup', function() {
        let filter = this.value.toLowerCase();
        let rows = document.querySelectorAll('table tbody tr');

        rows.forEach(row => {
            let name = row.querySelector('td:nth-child(2) a').innerText.toLowerCase();
            row.style.display = name.includes(filter) ? '' : 'none';
        });
    });
</script>
@endsection