@extends('admin.index')

@section('title', 'Thêm Hồ Sơ Bệnh Án')

@section('content')

    <h2>Thêm Hồ Sơ Bệnh Án</h2>

    <form method="POST" action="{{ route('admin.medical_records.store') }}">
        @csrf

        <div class="mb-3">
            <label class="form-label">Khách hàng</label>
            <select name="guest_id" class="form-control" required>
                <option value="">-- Chọn Khách hàng --</option>
                @foreach ($guests as $guest)
                    <option value="{{ $guest->id }}">{{ $guest->guest_name }}</option>
                @endforeach
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Bảo hiểm y tế (BHYT)</label>
            <input type="text" name="BHYT" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Tình trạng bệnh</label>
            <textarea name="medical_condition" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Thuốc điều trị</label>
            <textarea name="medications" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Dị ứng</label>
            <textarea name="allergies" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Tiền sử gia đình</label>
            <textarea name="family_history" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Phương pháp điều trị</label>
            <textarea name="treatment" class="form-control" required></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Ghi chú</label>
            <textarea name="note" class="form-control" required></textarea>
        </div>

        <button type="submit" class="btn btn-success">Thêm mới</button>
        <a href="{{ route('admin.medical_records.index') }}" class="btn btn-secondary">Quay lại</a>

    </form>

@endsection
