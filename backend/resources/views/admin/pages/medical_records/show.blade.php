<!-- Modal hiển thị chi tiết hồ sơ bệnh án -->
<div class="modal fade" id="recordDetailModal{{ $record->id }}" tabindex="-1" aria-labelledby="recordDetailLabel{{ $record->id }}" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="recordDetailLabel{{ $record->id }}">Chi tiết hồ sơ bệnh án #{{ $record->id }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
      </div>
      <div class="modal-body row">
        <div class="col-md-6 mb-2">
            <strong>Tên khách:</strong> {{ $record->guest->guest_name ?? 'N/A' }}
        </div>
        <div class="col-md-6 mb-2">
            <strong>Mã khách:</strong>#{{ $record->guest_id }}
        </div>
        <div class="col-md-6 mb-2">
            <strong>Số BHYT:</strong> {{ $record->BHYT ?? 'Không có' }}
        </div>
        <div class="col-md-6 mb-2">
            <strong>Tình trạng bệnh:</strong> {{ $record->medical_condition ?? 'Chưa cập nhật' }}
        </div>
        <div class="col-md-6 mb-2">
            <strong>Thuốc đang sử dụng:</strong> {{ $record->medications ?? 'Không rõ' }}
        </div>
        <div class="col-md-6 mb-2">
            <strong>Dị ứng:</strong> {{ $record->allergies ?? 'Không có' }}
        </div>
        <div class="col-md-6 mb-2">
            <strong>Tiền sử gia đình:</strong> {{ $record->family_history ?? 'Không có thông tin' }}
        </div>
        <div class="col-md-6 mb-2">
            <strong>Phác đồ điều trị:</strong> {{ $record->treatment ?? 'Chưa cập nhật' }}
        </div>
        <div class="col-12 mt-3">
            <strong>Ghi chú thêm:</strong><br>
            {{ $record->note ?? 'Không có ghi chú' }}
        </div>
      </div>
      <div class="modal-footer">
        <a href="{{ route('admin.medical_records.edit', $record->id) }}" class="btn btn-warning">Sửa</a>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
      </div>
    </div>
  </div>
</div>
