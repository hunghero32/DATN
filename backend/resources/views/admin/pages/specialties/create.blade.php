@extends('admin.index')

@section('content')
{{-- <div class="container mt-4"> --}}
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Chuyên khoa /</span> Thêm chuyên khoa</h4>
    
            <div class="card">
                {{-- <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Danh sách chuyên khoa</h5>
                </div> --}}
    
                <div class="card-body">
    {{-- <h2>Thêm chuyên khoa</h2> --}}

    {{-- @if ($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif --}}
    <form action="{{ route('admin.specialties.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="mb-3">
            <label for="name" class="form-label"><span class="text-danger">*</span> Tên chuyên khoa</label>
            <input type="text" class="form-control" name="name" value="{{ old('name') }}">
            @error('name')
                <div class="text-danger mt-1">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Mô tả</label>
            <textarea id="description" name="description" class="form-control">{{ old('description') }}</textarea>
            @error('description')
                <div class="text-danger mt-1">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="icon" class="form-label">Biểu tượng</label>
            <div class="preview-container mb-2" id="icon-preview-container" style="width: 120px; height: 120px; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center;">
                <img id="icon-preview" src="https://via.placeholder.com/50" style="max-width: 100%; max-height: 100%;">
            </div>
            <input type="file" id="icon-input" class="form-control mt-2 @error('icon') is-invalid @enderror" name="icon" accept="image/*">            
            @error('icon')
                <div class="text-danger mt-1">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="image" class="form-label">Hình ảnh</label>
            <div class="preview-container mb-2" id="image-preview-container" style="width: 200px; height: 120px; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center;">
                <img id="image-preview" src="https://via.placeholder.com/150" style="max-width: 100%; max-height: 100%;">
            </div>
            <input type="file" id="image-input" class="form-control mt-2 @error('image') is-invalid @enderror" name="image" accept="image/*">
            @error('image')
                <div class="text-danger mt-1">{{ $message }}</div>
            @enderror
        </div>

        <button type="submit" class="btn btn-success">Thêm</button>
        <a href="{{ route('admin.specialties.index') }}" class="btn btn-secondary">Quay lại</a>
    </form>
</div>
</div>
</div>
</div>

@endsection

@push('scripts')
    <script src="https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js"></script>
    <script>
        ClassicEditor
            .create(document.querySelector('#description'))
            .catch(error => {
                console.error(error);
            });
            function previewImage(inputElement, previewElement) {
            inputElement.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewElement.src = e.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });
        }

        function enableDragDrop(previewContainer, inputElement, previewElement) {
            previewContainer.addEventListener('dragover', function(event) {
                event.preventDefault();
                previewContainer.style.border = '2px dashed #007bff';
            });

            previewContainer.addEventListener('dragleave', function(event) {
                event.preventDefault();
                previewContainer.style.border = '1px dashed #ccc';
            });

            previewContainer.addEventListener('drop', function(event) {
                event.preventDefault();
                previewContainer.style.border = '1px dashed #ccc';
                const file = event.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewElement.src = e.target.result;
                    }
                    reader.readAsDataURL(file);

                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    inputElement.files = dataTransfer.files;
                }
            });
        }

        const iconInput = document.getElementById('icon-input');
        const iconPreview = document.getElementById('icon-preview');
        const iconPreviewContainer = document.getElementById('icon-preview-container');

        previewImage(iconInput, iconPreview);
        enableDragDrop(iconPreviewContainer, iconInput, iconPreview);

        const imageInput = document.getElementById('image-input');
        const imagePreview = document.getElementById('image-preview');
        const imagePreviewContainer = document.getElementById('image-preview-container');

        previewImage(imageInput, imagePreview);
        enableDragDrop(imagePreviewContainer, imageInput, imagePreview);
    </script>
@endpush
