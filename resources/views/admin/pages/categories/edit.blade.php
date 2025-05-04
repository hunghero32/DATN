@extends('admin.index')

@section('title', 'Chỉnh sửa danh mục')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Cài đặt /</span> Chỉnh sửa danh mục</h4>

            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-4">
                        <h5 class="card-header">Thông tin danh mục</h5>
                        <div class="card-body">
                            <form action="{{ route('admin.categories.update', $category->id) }}" method="POST">
                                @csrf
                                @method('PUT')

                                <!-- Tìm kiếm danh mục cha -->
                                <div class="mb-3 position-relative">
                                    <label for="search-parent" class="form-label">Danh mục cha</label>
                                    <input type="text" class="form-control" id="search-parent"
                                        placeholder="Tìm danh mục cha"
                                        value="{{ $category->parent ? $category->parent->name : '' }}">
                                    <input type="hidden" name="parent_id" id="parent_id"
                                        value="{{ $category->parent_id }}">
                                    <div class="dropdown-menu w-100 shadow" id="parent-results"></div>
                                </div>

                                <!-- Tên danh mục -->
                                <div class="mb-3">
                                    <label for="name" class="form-label">Tên danh mục</label>
                                    <input type="text" class="form-control @error('name') is-invalid @enderror"
                                        id="name" name="name" placeholder="Nhập tên danh mục"
                                        value="{{ old('name', $category->name) }}">
                                    @error('name')
                                        <small class="text-danger d-block mt-1">{{ $message }}</small>
                                    @enderror
                                </div>

                                <!-- Mô tả -->
                                <div class="mb-3">
                                    <label for="description" class="form-label">Mô tả</label>
                                    <textarea class="form-control @error('description') is-invalid @enderror" name="description" id="description"
                                        rows="3" placeholder="Nhập mô tả danh mục">{{ old('description', $category->description) }}</textarea>
                                    @error('description')
                                        <small class="text-danger d-block mt-1">{{ $message }}</small>
                                    @enderror
                                </div>

                                <!-- Nút Lưu & Xoá -->
                                <div class="d-flex justify-content-start gap-2 mt-3">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="bx bx-save"></i> Lưu thay đổi
                                    </button>

                                    <button type="button" class="btn btn-danger" onclick="confirmDelete()">
                                        <i class="bx bx-trash"></i> Xoá
                                    </button>

                                    <a href="{{ route('admin.categories.index') }}" class="btn btn-outline-secondary">
                                        Quay lại
                                    </a>
                                </div>
                            </form>

                            <!-- Form xoá ẩn -->
                            <form id="delete-form" action="{{ route('admin.categories.delete', $category->id) }}"
                                method="POST" style="display: none;">
                                @csrf
                                @method('DELETE')
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#search-parent').on('keyup', function() {
                let query = $(this).val().trim();
                if (query === '') {
                    $('#parent-results').empty().hide();
                    return;
                }

                $.ajax({
                    url: "{{ route('admin.categories.search') }}",
                    type: "GET",
                    data: {
                        q: query
                    },
                    success: function(response) {
                        let resultsList = $('#parent-results');
                        resultsList.empty().show();
                        if (response.length > 0) {
                            response.forEach(function(category) {
                                resultsList.append(
                                    `<button class="dropdown-item" data-id="${category.id}">${category.name}</button>`
                                );
                            });

                            $('.dropdown-item').on('click', function() {
                                $('#search-parent').val($(this).text());
                                $('#parent_id').val($(this).data('id'));
                                $('#parent-results').hide();
                            });
                        } else {
                            resultsList.append(
                                '<button class="dropdown-item disabled">Không tìm thấy kết quả</button>'
                            );
                        }
                    },
                    error: function(xhr) {
                        console.log(xhr.responseText);
                    }
                });
            });

            $(document).click(function(e) {
                if (!$(e.target).closest('.position-relative').length) {
                    $('#parent-results').hide();
                }
            });

            $('#search-parent').on('input', function() {
                if ($(this).val().trim() === '') {
                    $('#parent_id').val('');
                }
            });
        });

        function confirmDelete() {
            if (confirm('Bạn có chắc chắn muốn xoá danh mục này không?')) {
                document.getElementById('delete-form').submit();
            }
        }
    </script>
@endsection
