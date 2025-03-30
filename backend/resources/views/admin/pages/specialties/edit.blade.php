@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2>Cập nhật chuyên khoa</h2>

    @if($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach($errors->all() as $err)
                    <li>{{ $err }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('admin.specialties.update', $specialty->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="name" class="form-label">Tên chuyên khoa</label>
            <input type="text" class="form-control" name="name" required value="{{ $specialty->name }}">
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Mô tả</label>
            <textarea id="description" name="description" class="form-control">{{ $specialty->description }}</textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Biểu tượng hiện tại:</label><br>
            @if($specialty->icon)
                <img src="{{ asset('storage/' . $specialty->icon) }}" width="50" height="50">
            @endif
            <input type="file" class="form-control mt-2" name="icon">
        </div>

        <div class="mb-3">
            <label class="form-label">Hình ảnh hiện tại:</label><br>
            @if($specialty->image)
                <img src="{{ asset('storage/' . $specialty->image) }}" width="100" height="70">
            @endif
            <input type="file" class="form-control mt-2" name="image">
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
