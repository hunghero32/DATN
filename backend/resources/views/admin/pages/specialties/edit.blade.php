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
            <label class="form-label">Biểu tượng hiện tại:</label><br>
            @if($specialty->icon)
                <img src="{{ asset('storage/' . $specialty->icon) }}" width="50" height="50">
            @endif
            <input type="file" class="form-control mt-2 @error('icon') is-invalid @enderror" name="icon">
            @error('icon')
                <div class="invalid-feedback d-block">{{ $message }}</div>
            @enderror
        </div>
        
        <div class="mb-3">
            <label class="form-label">Hình ảnh hiện tại:</label><br>
            @if($specialty->image)
                <img src="{{ asset('storage/' . $specialty->image) }}" width="100" height="70">
            @endif
            <input type="file" class="form-control mt-2 @error('image') is-invalid @enderror" name="image">
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
    </script>
@endpush
