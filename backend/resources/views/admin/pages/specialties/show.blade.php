<!-- Modal hiển thị thông tin chuyên khoa -->
<div class="modal fade" id="viewModal{{ $specialtie->id }}" tabindex="-1" aria-labelledby="modalLabel{{ $specialtie->id }}" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Chi tiết chuyên khoa: {{ $specialtie->name }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
            </div>
            <div class="modal-body">
                <p><strong>Tên chuyên khoa:</strong> {{ $specialtie->name }}</p>
                <p><strong>Mô tả:</strong> {!! $specialtie->description ?? 'Không có' !!}</p>
                <p><strong>Biểu tượng:</strong><br>
                    @if($specialtie->icon)
                        <img src="{{ asset('storage/' . $specialtie->icon) }}" width="60">
                    @endif
                </p>
                <p><strong>Hình ảnh:</strong><br>
                    @if($specialtie->image)
                        <img src="{{ asset('storage/' . $specialtie->image) }}" width="100">
                    @endif
                </p>
            </div>
            <div class="modal-footer">
                <a href="{{ route('admin.specialties.edit', $specialtie->id) }}" class="btn btn-warning">Sửa</a>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>
