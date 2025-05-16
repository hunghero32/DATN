<!-- Modal hiển thị chi tiết hồ sơ bệnh án --> 
<div class="modal fade" id="recordDetailModal{{ $record->id }}" tabindex="-1" aria-labelledby="recordDetailLabel{{ $record->id }}" aria-hidden="true">
  
  <div class="modal-dialog modal-dialog-centered modal-xl">
    
    <div class="modal-content">

      <div class="modal-header">
        
        <h5 class="modal-title" id="recordDetailLabel{{ $record->id }}">Chi tiết hồ sơ bệnh án #{{ $record->id }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
      </div>

      <div class="modal-body">
        
        <div class="row">
          
          <div class="col-md-6 mb-2">
            <strong>Tên khách:</strong> {{ $record->guest->guest_name ?? 'N/A' }}
          </div>
          
          <div class="col-md-6 mb-2">
            <strong>Mã khách:</strong> #{{ $record->guest_id }}
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
          
          <div class="col-12 mt-3 mb-4">
            <strong>Ghi chú thêm:</strong><br>
            {{ $record->note ?? 'Không có ghi chú' }}
          </div>
        
        </div>

        @if ($record->results && $record->results->count())
          <div class="border-top pt-3">
            <h5 class="mb-3">Danh sách kết quả khám </h5>

            <div class="accordion" id="resultsAccordion{{ $record->id }}">
              @foreach ($record->results->sortByDesc('created_at')->take(5) as $result)
                
              <div class="accordion-item">
              
                <h2 class="accordion-header" id="heading{{ $record->id }}{{ $loop->iteration }}">
              
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{{ $record->id }}{{ $loop->iteration }}" aria-expanded="false" aria-controls="collapse{{ $record->id }}{{ $loop->iteration }}">
                      Kết quả khám #{{ $loop->iteration }}
                    </button>
                  </h2>
                  
                  <div id="collapse{{ $record->id }}{{ $loop->iteration }}" class="accordion-collapse collapse" aria-labelledby="heading{{ $record->id }}{{ $loop->iteration }}" data-bs-parent="#resultsAccordion{{ $record->id }}">
                  
                    <div class="accordion-body" id="printableResult{{ $record->id }}{{ $loop->iteration }}">
                      
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

                      <!-- Nút In -->
                      <button type="button" class="btn btn-primary btn-sm mt-2" onclick="printResult('printableResult{{ $record->id }}{{ $loop->iteration }}')">
                        <i class="bi bi-printer"></i> In kết quả
                      </button>

                    </div>
                  
                  </div>
                
                </div>
              
                @endforeach
            
              </div>

          </div>
        @else
          <div class="alert alert-warning mt-3">Chưa có kết quả khám nào.</div>
        @endif

      </div>

      <div class="modal-footer">
        <a href="{{ route('admin.medical_records.edit', $record->id) }}" class="btn btn-warning">Sửa</a>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
      </div>

    </div>

  </div>

</div>

