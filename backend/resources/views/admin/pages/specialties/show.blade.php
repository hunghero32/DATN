@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2>Chi tiết chuyên khoa</h2>

    <div class="mb-3">
        <label class="form-label"><strong>Tên chuyên khoa:</strong></label>
        <p>{{ $specialty->name }}</p>
    </div>

    <div class="mb-3">
        <label class="form-label"><strong>Mô tả:</strong></label>
        <div>{!! $specialty->description !!}</div>
    </div>

    <div class="mb-3">
        <label class="form-label"><strong>Biểu tượng:</strong></label><br>
        @if($specialty->icon)
            <img src="{{ asset('storage/' . $specialty->icon) }}" width="50" height="50">
        @else
            <p>Không có</p>
        @endif
    </div>

    <div class="mb-3">
        <label class="form-label"><strong>Hình ảnh:</strong></label><br>
        @if($specialty->image)
            <img src="{{ asset('storage/' . $specialty->image) }}" width="150" height="100">
        @else
            <p>Không có</p>
        @endif
    </div>
    
    <a href="{{ route('admin.specialties.index') }}" class="btn btn-secondary">Quay lại</a>
    <a href="{{ route('admin.specialties.edit', $specialty->id) }}" class="btn btn-warning">Sửa</a>

</div>
@endsection
