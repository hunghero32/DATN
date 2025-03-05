@extends('layouts.app')

@section('content')
<div class="container my-5">
    <div class="card">
        <div class="card-header">
            <h2 class="mb-0 text-center text-warning">Chỉnh Sửa Chuyên Môn</h2>
        </div>
        <div class="card-body">
            <form action="{{ route('specialties.update', $specialty->id) }}" method="POST" enctype="multipart/form-data" class="needs-validation" novalidate>
                @csrf
                @method('PUT')

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="name" class="form-label">Tên Chuyên Môn:</label>
                        <input type="text" id="name" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name', $specialty->name) }}" placeholder="Nhập tên chuyên môn" required>
                        @error('name')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="col-md-6">
                        <label for="icon" class="form-label">Biểu Tượng (Icon):</label>
                        <input type="file" id="icon" name="icon" class="form-control @error('icon') is-invalid @enderror">
                        @if ($specialty->icon)
                        <div class="mt-2">
                            <img src="{{ asset('storage/' . $specialty->icon) }}" alt="Current Icon" width="50">
                            <small>(Hiện tại)</small>
                        </div>
                        @endif
                        @error('icon')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-12">
                        <label for="description" class="form-label">Mô Tả:</label>
                        <textarea id="description" name="description" class="form-control @error('description') is-invalid @enderror" rows="4" placeholder="Nhập mô tả chuyên môn" required>{{ old('description', $specialty->description) }}</textarea>
                        @error('description')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-12">
                        <label for="image" class="form-label">Hình Ảnh Chi Tiết:</label>
                        <input type="file" id="image" name="image" class="form-control @error('image') is-invalid @enderror">
                        @if ($specialty->image)
                        <div class="mt-2">
                            <img src="{{ asset('storage/' . $specialty->image) }}" alt="Current Image" width="100">
                            <small>(Hiện tại)</small>
                        </div>
                        @endif
                        @error('image')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="d-flex justify-content-between mt-4">
                    <button type="submit" class="btn btn-warning btn-lg px-5">Cập Nhật</button>
                    <a href="{{ route('specialties.index') }}" class="btn btn-secondary btn-lg px-5">Hủy</a>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
