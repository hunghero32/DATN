@props(['columns', 'data', 'actions' => [], 'route' => '', 'selects' => [], 'detailModal' => []])
<div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
        <x-flash-message />
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Danh sách /</span> {{ $title }}</h4>
        <div class="card">
            <div class="card-body">
                <form method="GET" action="{{ $route }}">
                    <div class="d-flex align-items-center gap-2 w-100 mb-3">
                        {{-- Input Search --}}
                        <div class="flex-grow-1">
                            <x-input-search
                                id="search-doctor"
                                name="search"
                                placeholder="Tìm kiếm..."
                                :value="request()->get('search')" />
                        </div>
                        @if($selects)
                        {{-- Select Search --}}
                        @foreach ($selects as $select)
                        <div class="flex-grow-1">
                            <x-select-search
                                id="{{ $select['id'] }}"
                                name="{{ $select['name'] }}"
                                :options="$select['options']"
                                :selected="request()->get($select['name'])" />
                        </div>
                        @endforeach
                        @endif

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
                    <a href="{{ request()->url() }}" class="badge bg-danger text-decoration-none">
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
            </div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            @foreach ($columns as $column)
                            <th>{{ $column['label'] }}</th>
                            @endforeach
                            @if (collect($actions)->where('type', 'row')->isNotEmpty())
                            <th><i class='bx bx-menu'></i></th>
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
                                @if ($column['key'] == 'status' && isset($column['status_config']))
                                @php
                                $status = $row[$column['name']] ?? 'default';
                                $statusConfig = $column['status_config'];
                                $currentState = $statusConfig['states'][$status] ?? ['text' => 'Unknown', 'class' => 'badge bg-secondary'];
                                @endphp
                                <div class="status-dropdown">
                                    <button type="button"
                                        class="{{ $currentState['class'] }} status-btn"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        {{ $currentState['text'] }}
                                        <i class='bx bx-chevron-down ms-2'></i>
                                    </button>
                                    <ul class="dropdown-menu status-menu">
                                        @foreach($statusConfig['states'] as $stateKey => $stateValue)
                                        @if($stateKey != $status)
                                        <li>
                                            <form action="{{ route($statusConfig['route'], ['id' => $row['id']]) }}"
                                                method="POST"
                                                class="status-form">
                                                @csrf
                                                @method('PATCH')
                                                <input type="hidden" name="status" value="{{ $stateKey }}">
                                                <button type="submit" class="dropdown-item status-item">
                                                    {{ $stateValue['text'] }}
                                                </button>
                                            </form>
                                        </li>
                                        @endif
                                        @endforeach
                                    </ul>
                                </div>
                                @elseif (!empty($row[$column['key']]) &&
                                is_string($row[$column['key']]) &&
                                preg_match('/\.(jpg|jpeg|png|gif|svg)$/i', $row[$column['key']]))
                                <img src="{{ Storage::url($row[$column['key']]) }}" alt="Image" class="img-thumbnail" width="100">

                                {{-- Hiển thị dữ liệu khác --}}
                                @elseif (is_numeric($row[$column['key']]))
                                {{ number_format($row[$column['key']], 0, ',', '.') }}
                                @elseif (!empty($row[$column['key']]) && strtotime($row[$column['key']]) !== false)
                                @if (preg_match('/^\d{2}:\d{2}:\d{2}$/', $row[$column['key']]))
                                {{ $row[$column['key']] }}
                                @else
                                {{ \Carbon\Carbon::parse($row[$column['key']])->format('d/m/Y') }}
                                @endif
                                @else
                                {{ $row[$column['key']] ?? '' }}
                                @endif
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
            </div>


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
                            <form action="{{ collect($actions)->where('type', 'row')->where('method', 'DELETE')->first()['route']($row['id']) }}" method="POST">
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
                            <h5 class="modal-title" id="detailModalLabel{{ $row['id'] }}">Chi tiết {{ $title }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card mb-4">
                                <hr class="my-0" />
                                <div class="card-body">
                                    <div class="row mt-3">
                                        @foreach ($detailModal['fields'] as $field)
                                        @if (isset($field['type']))
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
                                            <div class="form-control textarea-content" style="min-height: 150px; overflow-y: auto;">
                                                {!! $row[$field['name']] ?? 'Chưa cập nhật' !!}
                                            </div>
                                        </div>
                                        @elseif ($field['type'] == 'custom' && isset($field['template']))
                                        <!-- Giao diện tùy chỉnh với template -->
                                        <div class="mb-3 col-md-12">
                                            <label class="form-label">{{ $field['label'] }}</label>
                                            <div class="custom-field-container">
                                                @include($field['template'], ['item' => $row])
                                            </div>
                                        </div>
                                        @else
                                        <!-- Giao diện input/select thông thường -->
                                        <div class="mb-3 col-md-6">
                                            <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                            @if ($field['type'] == 'select')
                                            <input type="text" class="form-control" value="{{ $field['options'][$row[$field['name']]] ?? 'Chưa cập nhật' }}" readonly>
                                            @elseif ($field['type'] == 'number' || $field['name'] == 'price' || (is_numeric($row[$field['name']] ?? '') && $row[$field['name']] > 999))
                                            <input type="text" class="form-control" value="{{ number_format($row[$field['name']] ?? 0, 0, ',', '.') }}" readonly>
                                            @else
                                            <input type="text" class="form-control" value="{{ $row[$field['name']] ?? 'Chưa cập nhật' }}" readonly>
                                            @endif
                                        </div>
                                        @endif
                                        @else
                                        <!-- Default display for fields without type -->
                                        <div class="mb-3 col-md-6">
                                            <label for="{{ $field['name'] }}" class="form-label">{{ $field['label'] }}</label>
                                            <input type="text" class="form-control" value="{{ $row[$field['name']] ?? 'Chưa cập nhật' }}" readonly>
                                        </div>
                                        @endif
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
            <div class="card-footer">
                <x-pagination-component :data="$data" />
            </div>
        </div>
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

    /* Custom field container styling */
    .custom-field-container {
        background-color: #f8f9fa;
        border-radius: 6px;
        padding: 15px;
        margin-top: 8px;
    }

    .custom-field-container .table {
        margin-bottom: 0;
    }

    .custom-field-container .table th {
        background-color: #e9ecef;
        font-size: 0.85rem;
    }

    .custom-field-container .table td {
        font-size: 0.85rem;
        vertical-align: middle;
    }

    /* Thu nhỏ thanh cuộn */
    .modal-scrollable::-webkit-scrollbar {
        width: 6px;
        /* Độ rộng của thanh cuộn dọc */
    }

    /* Định dạng phần kéo của thanh cuộn */
    .modal-scrollable::-webkit-scrollbar-thumb {
        background-color: #888;
        /* Màu của phần kéo */
        border-radius: 4px;
        /* Bo tròn thanh cuộn */
    }

    /* Thêm hiệu ứng khi hover vào thanh cuộn */
    .modal-scrollable::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    /* Định dạng phần nền của thanh cuộn */
    .modal-scrollable::-webkit-scrollbar-track {
        background: #f1f1f1;
        /* Màu nền */
        border-radius: 4px;
    }

    .status-dropdown {
        position: relative;
        display: inline-block;
    }

    .status-btn {
        border: none;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.8rem;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        min-width: auto;
        font-weight: 500;
    }

    .status-menu {
        min-width: 140px;
        padding: 0.25rem 0;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .status-item {
        padding: 0.4rem 0.75rem;
        display: flex;
        align-items: center;
        font-size: 0.8rem;
    }

    .status-item:hover {
        background-color: #f8f9fa;
    }

    .status-form {
        margin: 0;
        padding: 0;
    }

    .textarea-content {
        white-space: pre-wrap;
        word-break: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 0.75rem;
        border-radius: 0.375rem;
    }

    .textarea-content img {
        max-width: 100%;
        height: auto;
    }


    /* Status colors */
    .badge.bg-success {
        --status-color: #28a745;
    }

    .badge.bg-danger {
        --status-color: #dc3545;
    }

    .badge.bg-warning {
        --status-color: #ffc107;
    }

    .badge.bg-info {
        --status-color: #17a2b8;
    }

    .badge.bg-secondary {
        --status-color: #6c757d;
    }
</style>
