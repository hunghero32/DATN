<!-- Modal hiển thị chi tiết hồ sơ bệnh án và kết quả khám -->
<div class="modal fade" id="recordDetailModal{{ $record->id }}" tabindex="-1" aria-labelledby="recordDetailLabel{{ $record->id }}" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Chi tiết hồ sơ bệnh án #{{ $record->id }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
      </div>

      <div class="modal-body">
        <div class="row">
          <div class="col-md-6"><strong>Tên khách:</strong> {{ $record->guest->guest_name ?? 'N/A' }}</div>
          <div class="col-md-6"><strong>Mã khách:</strong> #{{ $record->guest_id }}</div>
          <div class="col-md-6"><strong>Số BHYT:</strong> {{ $record->BHYT ?? 'Không có' }}</div>
          <div class="col-md-6"><strong>Tình trạng bệnh:</strong> {{ $record->medical_condition ?? 'Chưa cập nhật' }}</div>
          <div class="col-md-6"><strong>Thuốc:</strong> {{ $record->medications ?? 'Không rõ' }}</div>
          <div class="col-md-6"><strong>Dị ứng:</strong> {{ $record->allergies ?? 'Không có' }}</div>
          <div class="col-md-6"><strong>Tiền sử gia đình:</strong> {{ $record->family_history ?? 'Không rõ' }}</div>
          <div class="col-md-6"><strong>Phác đồ điều trị:</strong> {{ $record->treatment ?? 'Chưa cập nhật' }}</div>
          <div class="col-12 mt-2"><strong>Ghi chú:</strong><br>{{ $record->note ?? 'Không có ghi chú' }}</div>
        </div>

        @php
          $guestResults = \App\Models\Result::where('guest_id', $record->guest_id)->orderByDesc('created_at')->get();
        @endphp

        @if ($guestResults->count())
          <div class="border-top pt-3 mt-4">
            <h5 class="mb-3">Tất cả kết quả khám của khách</h5>
            <div class="accordion" id="resultsAccordion{{ $record->id }}">
              @foreach ($guestResults as $i => $result)
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading{{ $record->id }}{{ $i }}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{{ $record->id }}{{ $i }}">
                      Kết quả #{{ $i + 1 }} - {{ $result->created_at->format('d/m/Y H:i') }}
                    </button>
                  </h2>
                  <div id="collapse{{ $record->id }}{{ $i }}" class="accordion-collapse collapse">
                    <div class="accordion-body" id="printableResult{{ $record->id }}{{ $i }}">
                      <p><strong>Chẩn đoán:</strong> {{ $result->diagnosis ?? '...' }}</p>
                      <p><strong>Đơn thuốc:</strong> {{ $result->prescription ?? '...' }}</p>
                      <p><strong>Ghi chú:</strong> {{ $result->note ?? '...' }}</p>
                      <p><strong>Ngày tạo:</strong> {{ $result->created_at->format('d/m/Y H:i') }}</p>
                      <p>
                        <strong>File:</strong>
                        @if ($result->file)
                          <a href="{{ asset('storage/' . $result->file) }}" target="_blank" class="btn btn-sm btn-outline-primary">Xem file</a>
                        @else
                          <span class="text-muted">Không có</span>
                        @endif
                      </p>
                      <button class="btn btn-sm btn-primary mt-2" onclick="printResult('printableResult{{ $record->id }}{{ $i }}')">
                        <i class="bi bi-printer"></i> In kết quả
                      </button>
                    </div>
                  </div>
                </div>
              @endforeach
            </div>
          </div>
        @else
          <div class="alert alert-warning mt-3">Khách này chưa có kết quả khám nào.</div>
        @endif
      </div>

      <div class="modal-footer">
        <a href="{{ route('admin.pages.medical_records.edit', $record->id) }}" class="btn btn-warning">Sửa</a>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
      </div>
    </div>
  </div>
</div>
