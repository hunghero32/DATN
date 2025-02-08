@props(['columns', 'data', 'actions' => []])

<div class="content-wrapper mt-3">
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Tables /</span> Basic Tables</h4>
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
                    @if (collect($actions)->where('type', 'global')->isNotEmpty())
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

                                    {{-- Tự động nhận diện cột ảnh --}}
                                @elseif (
                                    !empty($row[$column['key']]) &&
                                        is_string($row[$column['key']]) &&
                                        preg_match('/\.(jpg|jpeg|png|gif|svg)$/i', $row[$column['key']]))
                                    <img src="{{ Storage::url($row[$column['key']]) }}" alt="Image"
                                        class="img-thumbnail" width="100">

                                    {{-- Hiển thị dữ liệu khác --}}
                                @else
                                    {{ $row[$column['key']] ?? '' }}
                                @endif
                            </td>
                        @endforeach

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
                                                <form
                                                    action="{{ isset($action['route']) && is_callable($action['route']) ? $action['route']($row['id']) : '#' }}"
                                                    method="POST">
                                                    @csrf
                                                    @if ($action['method'] == 'DELETE')
                                                        @method('DELETE')
                                                    @endif
                                                    <button type="submit" class="dropdown-item"
                                                        @if (isset($action['confirm'])) onclick="return confirm('{{ $action['confirm'] }}')" @endif>
                                                        {{ $action['label'] }}
                                                    </button>
                                                </form>
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
</div>
