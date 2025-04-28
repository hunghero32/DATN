@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2>Cập nhật chuyên khoa</h2> 
    
    <form action="{{ route('admin.specialties.update', $specialty->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="name" class="form-label">Tên chuyên khoa</label>
            <input type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name', $specialty->name) }}">
            @error('name')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        
        <div class="mb-3">
            <label for="description" class="form-label">Mô tả</label>
            <textarea id="description" name="description" class="form-control @error('description') is-invalid @enderror">{{ old('description', $specialty->description) }}</textarea>
            @error('description')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        
        <div class="mb-3">
            <label class="form-label">Biểu tượng hiện tại:</label>
            <div class="preview-container mb-2" id="icon-preview-container" style="width: 120px; height: 120px; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center;">
                @if($specialty->icon)
                    <img id="icon-preview" src="{{ asset('storage/' . $specialty->icon) }}" style="max-width: 100%; max-height: 100%;">
                @else
                    <img id="icon-preview" src="https://via.placeholder.com/50" style="max-width: 100%; max-height: 100%;">
                @endif
            </div>
            <input type="file" id="icon-input" class="form-control mt-2 @error('icon') is-invalid @enderror" name="icon" accept="image/*">
            @error('icon')
                <div class="invalid-feedback d-block">{{ $message }}</div>
            @enderror
        </div>
        
        <div class="mb-3">
            <label class="form-label">Hình ảnh hiện tại:</label>
            <div class="preview-container mb-2" id="image-preview-container" style="width: 200px; height: 120px; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center;">
                @if($specialty->image)
                    <img id="image-preview" src="{{ asset($specialty->image) }}" style="max-width: 100%; max-height: 100%;">
                @else
                    <img id="image-preview" src="https://via.placeholder.com/150" style="max-width: 100%; max-height: 100%;">
                @endif
            </div>
            <input type="file" id="image-input" class="form-control mt-2 @error('image') is-invalid @enderror" name="image" accept="image/*">
            @error('image')
                <div class="invalid-feedback d-block">{{ $message }}</div>
            @enderror
        </div>
        
        <button type="submit" class="btn btn-primary">Cập nhật</button>
        <a href="{{ route('admin.specialties.index') }}" class="btn btn-secondary">Quay lại</a>
    </form>
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
