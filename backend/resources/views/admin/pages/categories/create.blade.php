@extends('admin.index')
@section('title', 'Tạo mới')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Settings /</span> Thêm danh mục</h4>

            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-4">
                        <h5 class="card-header">Thông tin danh mục</h5>

                        <div class="card-body">
                            <form action="{{ route('admin.categories.store') }}" method="POST">
                                @csrf

                                <!-- Select2 Dropdown -->
                                <div class="mb-3">
                                    <label for="parent_id" class="form-label">Danh mục cha</label>
                                    <select class="form-select select2 @error('parent_id') is-invalid @enderror" name="parent_id" id="parent_id" required>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}" {{ old('parent_id') == $category->id ? 'selected' : '' }}>
                                                {{ $category->id }} | {{ $category->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('parent_id')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Tên danh mục -->
                                <div class="mb-3">
                                    <label for="name" class="form-label">Tên danh mục</label>
                                    <input type="text" class="form-control @error('name') is-invalid @enderror"
                                        id="name" name="name" placeholder="Nhập tên danh mục"
                                        value="{{ old('name') }}">
                                    @error('name')
                                        <small class="text-danger d-block mt-1">{{ $message }}</small>
                                    @enderror
                                </div>

                                <!-- Mô tả -->
                                <div class="mb-3">
                                    <label for="description" class="form-label">Mô tả</label>
                                    <textarea class="form-control @error('description') is-invalid @enderror" name="description" id="description"
                                        rows="3" placeholder="Nhập mô tả danh mục">{{ old('description') }}</textarea>
                                    @error('description')
                                        <small class="text-danger d-block mt-1">{{ $message }}</small>
                                    @enderror
                                </div>

                                <div class="mt-2">
                                    <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
                                    <a href="{{ route('admin.categories.index') }}" class="btn btn-outline-secondary">Quay lại</a>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
@endsection

@section('JS')
    <script>
        $(document).ready(function() {
            $('#parent_id').select2({
                placeholder: "Chọn danh mục cha",
                allowClear: true
            });
        });
    </script>
@endsection
