@props(['columns', 'data', 'actions' => [], 'route' => '', 'selects' => [], 'detailModal' => []])
<x-flash-message />
<div class="content-wrapper mt-3">
    <div class="container-xxl flex-grow-1 container-p-y mb-5">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Danh sách /</span> {{ $title }}</h4>
        <form method="GET" action="{{ $route }}">
            <div class="d-flex align-items-center gap-2 w-100 mb-3">
                {{-- Input Search --}}
                <div class="flex-grow-1">
                    <x-input-search
                        id="search-doctor"
                        name="search"
                        placeholder="Tìm kiếm..."
                        :value="request()->get('search')"
                    />
                </div>

                {{-- Select Search --}}
                @foreach ($selects as $select)
                    <div class="flex-grow-1">
                        <x-select-search
                            id="{{ $select['id'] }}"
                            name="{{ $select['name'] }}"
                            :options="$select['options']"
                            :selected="request()->get($select['name'])"
                        />
                    </div>
                @endforeach

                {{-- Hidden input for per_page --}}
                <input type="hidden" name="per_page" value="{{ request()->get('per_page', 10) }}">

                {{-- Button Search --}}
                <div>
                    <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                </div>
            </div>
        </form>

        {{-- Clear Filter Button --}}
        @if(request()->hasAny(['search', 'status', 'per_page']))
            <div class="mb-3">
                <a href="{{ $route }}" class="badge bg-danger text-decoration-none">
                    <i class='bx bx-x-circle'></i> Xóa lọc
                </a>
            </div>
        @endif

        {{-- Nút hành động toàn cục --}}
        @if (collect($actions)->where('type', 'global')->isNotEmpty())
            <div class="text-end mt-5">
                @foreach ($actions as $action)
                    @if ($action['type'] == 'global')
                        <a href="{{ $action['route']() }}" class="btn {{ $action['class'] }}">
                            {{ $action['label'] }}
                        </a>
                    @endif
                @endforeach
            </div>
        @endif

        <table class="table">
            <thead>
                <tr>
                    <th>STT</th>
                    @foreach ($columns as $column)
                        <th>{{ $column['label'] }}</th>
                    @endforeach
                    @if (collect($actions)->where('type', 'row')->isNotEmpty())
                        <th>Actions</th>
                    @endif
                </tr>
            </thead>
            <tbody>
                @foreach ($data as $index => $row)
                    <tr>
                        <td>{{ ($data->currentPage() - 1) * $data->perPage() + $index + 1 }}</td>
                        @foreach ($columns as $column)
                            <td>
                                {{-- Hiển thị trạng thái --}}
                                @if ($column['key'] == 'status')
                                    @php
                                        $status = $row[$column['name']] ?? 'default';
                                        $statusConfig = config(
                                            "common.statuses.$status",
                                            config('common.statuses.default'),
                                        );
                                        $statusText = $statusConfig['text'] ?? 'Unknown';
                                        $badgeClass = $statusConfig['class'] ?? 'badge badge-dark';
                                    @endphp
                                    <span class="{{ $badgeClass }}">{{ $statusText }}</span>

                                {{-- Hiển thị hình ảnh nếu có --}}
                                @elseif (
                                    !empty($row[$column['key']]) &&
                                        is_string($row[$column['key']]) &&
                                        preg_match('/\.(jpg|jpeg|png|gif|svg)$/i', $row[$column['key']]))
                                    <img src="{{ Storage::url($row[$column['key']]) }}" alt="Image" class="img-thumbnail" width="100">

                                {{-- Hiển thị dữ liệu khác --}}
                                @elseif (!empty($row[$column['key']]) && strtotime($row[$column['key']]) !== false)
                                    @if (preg_match('/^\d{2}:\d{2}:\d{2}$/', $row[$column['key']]))
                                        {{ $row[$column['key']] }}
                                    @else
                                        {{ \Carbon\Carbon::parse($row[$column['key']])->format('d/m/Y') }}
                                    @endif
                                @elseif (is_numeric($row[$column['key']]))
                                    {{ number_format($row[$column['key']], 0, ',', '.') }}
                                @else
                                    {{ $row[$column['key']] ?? '' }}
                                @endif
                            </td>
                        @endforeach

                        {{-- Cột Actions với dropdown --}}
                        @if (collect($actions)->where('type', 'row')->isNotEmpty())
                            <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        @foreach ($actions as $action)
                                            @if ($action['type'] == 'row')
                                                @if ($action['method'] == 'DELETE')
                                                    <button type="button" class="dropdown-item" data-bs-toggle="modal"
                                                        data-bs-target="#confirmDelete{{ $row['id'] }}">
                                                        {{ $action['label'] }}
                                                    </button>
                                                @elseif (isset($action['modal']) && $action['modal'])
                                                    <button type="button" class="dropdown-item" data-bs-toggle="modal"
                                                        data-bs-target="#detailModal{{ $row['id'] }}">
                                                        {{ $action['label'] }}
                                                    </button>
                                                @else
                                                    <a href="{{ $action['route']($row['id']) }}" class="dropdown-item">
                                                        {{ $action['label'] }}
                                                    </a>
                                                @endif
                                            @endif
                                        @endforeach
                                    </div>
                                </div>
                            </td>
                        @endif
                    </tr>
                @endforeach
            </tbody>
        </table>

        </table>

            <x-pagination-component :data="$data" />

            {{-- Modal xác nhận xóa --}}
        @foreach ($data as $row)
            <div class="modal fade" id="confirmDelete{{ $row['id'] }}" tabindex="-1" aria-labelledby="modalLabel{{ $row['id'] }}" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabel{{ $row['id'] }}">Xác nhận xóa</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Bạn có chắc muốn xóa mục này không?
                        </div>
                        <div class="modal-footer">
                            <form action="{{ route('admin.doctors.delete', $row['id']) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">Xóa</button>
                            </form>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach

        {{-- Modal chi tiết cố định với giao diện giống form tạo mới và cuộn --}}
        @foreach ($data as $row)
            <div class="modal fade" id="detailModal{{ $row['id'] }}" tabindex="-1" aria-labelledby="detailModalLabel{{ $row['id'] }}" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content modal-scrollable">
                        <div class="modal-header">
                            <h5 class="modal-title" id="detailModalLabel{{ $row['id'] }}">Chi tiết bác sĩ</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card mb-4">
                                <h5 class="card-header">Profile Details</h5>
                                <hr class="my-0" />
                                <div class="card-body">
                                    <div class="row mt-3">
                                        @foreach ($detailModal['fields'] as $field)
                                            @if ($field['type'] == 'avatar')
                                                <!-- Giao diện Avatar -->
                                                <div class="mb-3 col-md-12">
                                                    <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                                    <div class="d-flex align-items-center gap-3">
                                                        <img src="{{ !empty($row[$field['name']]) ? Storage::url($row[$field['name']]) : asset('admin/assets/img/avatars/1.png') }}"
                                                            alt="user-avatar" class="avatar-preview rounded-circle" id="uploadedAvatar{{ $row['id'] }}" />
                                                    </div>
                                                </div>
                                            @elseif ($field['type'] == 'file')
                                                <!-- Giao diện hiển thị ảnh -->
                                                <div class="mb-3 col-md-12">
                                                    <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                                    <div class="image-upload-container">
                                                        @if (!empty($row[$field['name']]) && preg_match('/\.(jpg|jpeg|png|gif|svg)$/i', $row[$field['name']]))
                                                            <img src="{{ Storage::url($row[$field['name']]) }}"
                                                                alt="{{ $field['label'] }}" class="image-preview-large" />
                                                        @else
                                                            <img src="{{ asset('admin/assets/img/default-image.png') }}"
                                                                alt="{{ $field['label'] }}" class="image-preview-large" />
                                                            <p class="text-muted">Chưa có ảnh</p>
                                                        @endif
                                                    </div>
                                                </div>
                                            @elseif ($field['type'] == 'textarea')
                                                <!-- Giao diện textarea -->
                                                <div class="mb-3 col-md-12">
                                                    <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                                    <textarea class="form-control" id="{{ $field['name'] }}{{ $row['id'] }}" readonly>{{ $row[$field['name']] ?? 'Chưa cập nhật' }}</textarea>
                                                </div>
                                            @else
                                                <!-- Giao diện input/select thông thường -->
                                                <div class="mb-3 col-md-6">
                                                    <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                                    @if ($field['type'] == 'select')
                                                        <input type="text" class="form-control" value="{{ $field['options'][$row[$field['name']]] ?? 'Chưa cập nhật' }}" readonly>
                                                    @else
                                                        <input type="text" class="form-control" value="{{ $row[$field['name']] ?? 'Chưa cập nhật' }}" readonly>
                                                    @endif
                                                </div>
                                            @endif
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="{{ route('admin.doctors.edit', $row['id']) }}" class="btn btn-primary">Chỉnh sửa</a>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>

{{-- Ngăn dropdown bị đóng khi nhấn vào modal --}}
<script>
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
</script>

<style>
    .avatar-preview {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid #ccc;
        transition: all 0.3s;
    }

    .avatar-preview:hover {
        border-color: #007bff;
    }

    .image-upload-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        border: 1px dashed #ccc;
        padding: 10px;
        text-align: center;
    }

    .image-preview-large {
        width: 100%;
        max-height: 600px;
        object-fit: contain;
        border: 2px solid #ddd;
    }

   /* Thu nhỏ thanh cuộn */
.modal-scrollable::-webkit-scrollbar {
    width: 6px; /* Độ rộng của thanh cuộn dọc */
}

/* Định dạng phần kéo của thanh cuộn */
.modal-scrollable::-webkit-scrollbar-thumb {
    background-color: #888; /* Màu của phần kéo */
    border-radius: 4px; /* Bo tròn thanh cuộn */
}

/* Thêm hiệu ứng khi hover vào thanh cuộn */
.modal-scrollable::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}

/* Định dạng phần nền của thanh cuộn */
.modal-scrollable::-webkit-scrollbar-track {
    background: #f1f1f1; /* Màu nền */
    border-radius: 4px;
}

</style>
