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

            {{-- Thông báo --}}
            @if (session('success'))
                <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    <i class="bx bx-check-circle"></i> {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            @if (session('error'))
                <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                    <i class="bx bx-error-circle"></i> {{ session('error') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif
            @if (session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif

    

            {{-- Form tìm kiếm --}}
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
                    <table class="table table-hover table-striped table-bordered" id="categoryTable">
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
                                        <div class="dropdown text-center">
                                            <button class="btn btn-link text-dark p-0" type="button"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="bx bx-dots-vertical-rounded fs-4"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a class="dropdown-item"
                                                        href="{{ route('admin.categories.edit', $category->id) }}">
                                                        <i class="bx bx-pencil"></i> Sửa
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                {{-- Phân trang --}}
                <div class="mt-3 d-flex justify-content-center">
                    {{ $listCategory->links('pagination::bootstrap-5') }}
                </div>
            </div>
        </div>
    </div>

    {{-- Script tìm kiếm realtime --}}
    <script>
        document.getElementById('searchInput').addEventListener('keyup', function() {
            let filter = this.value.toLowerCase();
            let rows = document.querySelectorAll('#categoryTable tbody tr');

            rows.forEach(row => {
                let name = row.querySelector('td:nth-child(2) a').innerText.toLowerCase();
                row.style.display = name.includes(filter) ? '' : 'none';
            });
        });
    </script>
@endsection
