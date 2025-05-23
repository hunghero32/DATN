@extends('admin.index')

@section('content')
    <div class="container py-5">
        <div class="p-5 shadow bg-white" style="max-width: 800px; margin: auto; border: 1px solid #ddd;">
            <h4 class="text-center mb-4">Hồ sơ bệnh án</h4>

            @foreach ($records as $record)
                <div class="mb-3 text-end">
                    <strong>Mã hồ sơ:</strong> #{{ $record->id }}
                </div>

                <p><strong>Tên:</strong> {{ $guest->guest_name }}</p>
                <p><strong>Giới tính:</strong> {{ $guest->gender ?? '---' }}</p>
                <p><strong>Ngày sinh:</strong> {{ $guest->birthday ?? '---' }}</p>
                <p><strong>BHYT:</strong> {{ $record->BHYT ?? 'Không có' }}</p>
                <p><strong>SĐT:</strong> {{ $guest->guest_phone ?? '---' }}</p>
                <p><strong>Email:</strong> {{ $guest-> guest_email ?? '---' }}</p>

                <hr>

                <p><strong>Tình trạng bệnh:</strong> {{ $record->medical_condition ?? 'Chưa có thông tin' }}</p>
                <p><strong>Tiền sử gia đình:</strong> {{ $record->family_history ?? 'Không có' }}</p>
                <p><strong>Dị ứng:</strong> {{ $record->allergies ?? 'Không có' }}</p>
                <p><strong>Thuốc đang dùng:</strong> {{ $record->medications ?? 'Không có' }}</p>
                <p><strong>Phác đồ điều trị:</strong> {{ $record->treatment ?? 'Không có' }}</p>

                <hr>

                <p><strong>Ghi chú và nhận xét:</strong></p>
                <div style="min-height: 100px; border: 1px dashed #ccc; padding: 10px;">
                    {{ $record->note ?? 'Không có ghi chú' }}
                </div>

                <hr>

                <p><strong>Trạng thái:</strong>
                    <span class="badge {{ $record->isDeleted ? 'bg-danger' : 'bg-success' }}">
                        {{ $record->isDeleted ? 'Đã Xóa' : 'Còn Hiệu Lực' }}
                    </span>
                </p>
                <p><strong>Ngày tạo:</strong> {{ $record->created_at->format('d/m/Y H:i') }}</p>
                <p><strong>Ngày cập nhật:</strong> {{ $record->updated_at->format('d/m/Y H:i') }}</p>

                <hr style="border-top: 2px dashed #aaa;">
            @endforeach

            <div class="mt-4 text-center">
                <a href="{{ route('admin.guests.index') }}" class="btn btn-secondary">Quay lại</a>
            </div>
        </div>
    </div>
@endsection
