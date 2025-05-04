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

                                <!-- Danh mục cha -->
                                <div class="mb-3 position-relative">
                                    <label for="parent_name" class="form-label">Danh mục cha</label>
                                    <input type="text" class="form-control" id="parent_name" name="parent_name"
                                        placeholder="Nhập để tìm danh mục cha">
                                    <input type="hidden" id="parent_id" name="parent_id">
                                    <ul id="parent-results" class="list-group position-absolute w-100 bg-white border"
                                        style="display: none; z-index: 1000;"></ul>
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

    <!-- Thư viện jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <script>
        $(document).ready(function() {
            // Xử lý tìm kiếm danh mục cha
            $('#parent_name').on('keyup', function() {
                let query = $(this).val().trim();
                if (query.length < 2) {
                    $('#parent-results').hide();
                    return;
                }

                $.ajax({
                    url: "{{ route('admin.categories.search') }}",
                    type: "GET",
                    data: { q: query },
                    success: function(response) {
                        let results = $('#parent-results');
                        results.empty().show();

                        if (response.length === 0) {
                            results.append('<li class="list-group-item text-muted">Không tìm thấy danh mục</li>');
                        } else {
                            response.forEach(category => {
                                results.append(`<li class="list-group-item list-group-item-action" data-id="${category.id}">${category.name}</li>`);
                            });
                        }
                    },
                    error: function(xhr) {
                        console.log(xhr.responseText);
                    }
                });
            });

            // Chọn danh mục cha từ danh sách kết quả
            $(document).on('click', '#parent-results li', function() {
                let selectedText = $(this).text();
                let selectedId = $(this).data('id');

                $('#parent_name').val(selectedText);
                $('#parent_id').val(selectedId);
                $('#parent-results').hide();
            });

            // Ẩn danh sách khi click ra ngoài
            $(document).on('click', function(event) {
                if (!$(event.target).closest('#parent_name, #parent-results').length) {
                    $('#parent-results').hide();
                }
            });
        });
    </script>
@endsection
