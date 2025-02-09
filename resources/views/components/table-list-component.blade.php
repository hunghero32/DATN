@props(['columns', 'data', 'actions' => []])

<div class="content-wrapper mt-3">
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Tables /</span> Basic Tables</h4>

        {{-- Nút hành động toàn cục --}}
        @if (collect($actions)->where('type', 'global')->isNotEmpty())
            <div class="text-end">
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
                    @foreach ($columns as $column)
                        <th>{{ $column['label'] }}</th>
                    @endforeach
                    @if (collect($actions)->where('type', 'row')->isNotEmpty())
                        <th>Actions</th>
                    @endif
                </tr>
            </thead>
            <tbody>
                @foreach ($data as $row)
                    <tr>
                        @foreach ($columns as $column)
                            <td>
                                {{-- Hiển thị trạng thái --}}
                                @if ($column['key'] == 'status')
                                    @php
                                        $status = $row[$column['key']];
                                        switch ($status) {
                                            case 0:
                                                $statusText = 'Inactive';
                                                $badgeClass = 'badge bg-danger';
                                                break;
                                            case 1:
                                                $statusText = 'Active';
                                                $badgeClass = 'badge bg-success';
                                                break;
                                            case 2:
                                                $statusText = 'Pending';
                                                $badgeClass = 'badge bg-secondary';
                                                break;
                                            default:
                                                $statusText = 'Unknown';
                                                $badgeClass = 'badge badge-dark';
                                                break;
                                        }
                                    @endphp
                                    <span class="{{ $badgeClass }}">{{ $statusText }}</span>

                                {{-- Hiển thị hình ảnh nếu có --}}
                                @elseif (!empty($row[$column['key']]) && is_string($row[$column['key']]) && preg_match('/\.(jpg|jpeg|png|gif|svg)$/i', $row[$column['key']]))
                                    <img src="{{ Storage::url($row[$column['key']]) }}" alt="Image" class="img-thumbnail" width="100">

                                {{-- Hiển thị dữ liệu khác --}}
                                @else
                                    {{ $row[$column['key']] ?? '' }}
                                @endif
                            </td>
                        @endforeach

                        {{-- Cột Actions với dropdown --}}
                        @if (collect($actions)->where('type', 'row')->isNotEmpty())
                            <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                                        data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        @foreach ($actions as $action)
                                            @if ($action['type'] == 'row')
                                                @if ($action['method'] == 'DELETE')
                                                    {{-- Nút mở modal xác nhận xoá --}}
                                                    <button type="button" class="dropdown-item" data-bs-toggle="modal"
                                                        data-bs-target="#confirmDelete{{ $row['id'] }}">
                                                        {{ $action['label'] }}
                                                    </button>
                                                @else
                                                    {{-- Nút thực hiện hành động khác --}}
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

        {{-- Modal xác nhận xoá (được đặt ngoài vòng lặp bảng để không bị ẩn khi dropdown đóng) --}}
        @foreach ($data as $row)
            <div class="modal fade" id="confirmDelete{{ $row['id'] }}" tabindex="-1"
                aria-labelledby="modalLabel{{ $row['id'] }}" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabel{{ $row['id'] }}">Xác nhận xoá</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Bạn có chắc muốn xóa mục này không?
                        </div>
                        <div class="modal-footer">
                            <form action="{{ isset($action['route']) && is_callable($action['route']) ? $action['route']($row['id']) : '#' }}" method="POST">
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
    </div>
</div>

{{-- Ngăn dropdown bị đóng khi nhấn vào modal --}}
<script>
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
</script>
