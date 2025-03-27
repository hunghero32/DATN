@extends('admin.index')
@section('title', 'Chỉnh sửa danh mục')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Settings /</span> Sửa danh mục</h4>

            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-4">
                        <h5 class="card-header">Chi tiết danh mục</h5>

                        <hr class="my-0" />
                        <div class="card-body">
                            <form action="{{ route('admin.categories.update', $category->id) }}" method="POST">
                                @method('PUT')
                                @csrf
                                <div class="row mt-3">
                                    <!-- Tên danh mục -->
                                    <div class="mb-3 col-md-6">
                                        <label for="name" class="form-label">Tên danh mục</label>
                                        <input type="text" class="form-control" id="name" name="name"
                                            placeholder="Nhập tên danh mục" value="{{ old('name', $category->name) }}">
                                    </div>

                                    <!-- Mô tả danh mục -->
                                    <div class="mb-3 col-md-12">
                                        <label for="description" class="form-label">Mô tả</label>
                                        <textarea name="description" id="description" class="form-control">{{ old('description', $category->description ?? '') }}</textarea>
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label for="parent_id" class="form-label">Danh mục cha</label>
                                        <select class="form-select select2" name="parent_id" id="parent_id">
                                            <option value="">-- Chọn danh mục cha --</option>
                                            @foreach ($categories as $cat)
                                                <option value="{{ $cat->id }}"
                                                    {{ $category->parent_id == $cat->id ? 'selected' : '' }}>
                                                    {{ $cat->name }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>


                                    <div class="mt-2">
                                        <button class="btn btn-primary me-2">Lưu thay đổi</button>
                                    </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Thêm Select2 -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>

    <script>
        $(document).ready(function() {
            $('#parent_id').select2({
                placeholder: "Chọn danh mục cha",
                allowClear: true,
                width: "100%"
            });
        });
    </script>

@endsection
