<div class="modal fade" id="showModal{{ $notification->id }}" tabindex="-1" aria-labelledby="showModalLabel{{ $notification->id }}" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content shadow-lg">
      <div class="modal-header">
        <h5 class="modal-title" id="showModalLabel{{ $notification->id }}">Chi tiết thông báo</h5>
        <button type="button" class="btn-close btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
      </div>
      <div class="modal-body">

        <div class="row g-3">
          <div class="col-md-6">
            <p><strong>Người dùng:</strong> {{ $notification->user->name ?? 'N/A' }}</p>
            <p><strong>Mã lịch đặt :</strong> #{{ $notification->booking_id ?? 'N/A' }}</p>
          </div>

          <div class="col-md-6">
            <p><strong>Loại:</strong> {{ ucfirst($notification->type) }}</p>
            <p><strong>Trạng thái:</strong> 
              <span class="badge bg-{{ $notification->is_read ? 'success' : 'warning' }}">
                {{ $notification->is_read ? 'Đã đọc' : 'Chưa đọc' }}
              </span>
            </p>
          </div>

          <div class="col-12">
            <p><strong>Tiêu đề:</strong> {{ strip_tags($notification->title) }}</p>
          </div>

          <div class="col-12">
            <p><strong>Nội dung:</strong></p>
            <div class="alert alert-secondary">{{ strip_tags($notification->content) }}</div>
          </div>
        </div>

      </div>
      <div class="modal-footer bg-light">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
      </div>
    </div>
  </div>
</div>
