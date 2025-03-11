@extends('admin.index')
@section('title', 'Thông tin danh mục')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Tables /</span> CATEGORIES</h4>
            <div class="d-flex justify-content-between">
                <a href="{{ route('admin.categories.create') }}" class="btn btn-success">Thêm mới</a>

            </div>
            <form action="{{ route('admin.categories.index') }}" method="GET" class="d-flex justify-content-end mb-3">
                <input type="text" name="search" class="form-control w-25" placeholder="Tìm kiếm theo tên..."
                    value="{{ request('search') }}">
                <button type="submit" class="btn btn-primary ms-2">Tìm kiếm</button>
            </form>

            <div class="card mt-3">
                <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody class="table-border-bottom-0" id="categoryTable">
                            @foreach ($listCategory as $category)
                                <tr>
                                    <td><strong>{{ $category->id }}</strong></td>
                                    <td>
                                        <a href="{{ route('admin.categories.index', $category->id) }}"
                                            class="category-link">{{ $category->name }}</a>
                                    </td>
                                    <td>
                                        <textarea readonly>{{ $category->description }}</textarea>
                                    </td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                                                data-bs-toggle="dropdown">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item"
                                                    href="{{ route('admin.categories.edit', $category->id) }}">
                                                    <i class="bx bx-edit-alt me-2"></i> Edit
                                                </a>
                                                <form action="{{ route('admin.categories.delete', $category->id) }}"
                                                    method="POST">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit"
                                                        onclick="return confirm('Bạn có muốn xóa không?')"
                                                        class="dropdown-item">
                                                        <i class="bx bx-trash me-2"></i> Delete
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="mt-3">
                    {{ $listCategory->links() }}
                </div>
            </div>
        </div>
        <div class="content-backdrop fade"></div>
    </div>
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif


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
