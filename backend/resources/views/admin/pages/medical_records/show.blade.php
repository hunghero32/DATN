@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2 class="mb-3">Chi tiết Hồ sơ bệnh án</h2>
    <div class="card">
        <div class="card-body">
            <p><strong>ID:</strong> {{ $record->id }}</p>
            <p><strong>Tên bệnh nhân:</strong> {{ $record->guest->guest_name }}</p>
            <p><strong>Số điện thoại:</strong> {{ $record->guest->guest_phone }}</p>
            <p><strong>BHYT:</strong> {{ $record->BHYT }}</p>
            <p><strong>Tình trạng bệnh:</strong> {{ $record->medical_condition }}</p>
            <p><strong>Thuốc:</strong> {{ $record->medications }}</p>
            <p><strong>Dị ứng:</strong> {{ $record->allergies }}</p>
            <p><strong>Tiền sử gia đình:</strong> {{ $record->family_history }}</p>
            <p><strong>Phương pháp điều trị:</strong> {{ $record->treatment }}</p>
            <p><strong>Ghi chú:</strong> {{ $record->note }}</p>
            <p><strong>Ngày tạo:</strong> {{ $record->created_at->format('d/m/Y H:i') }}</p>
        </div>
    </div>
    <a href="{{ route('admin.medical_records.index') }}" class="btn btn-secondary mt-3">Quay lại</a>
</div>
@endsection
