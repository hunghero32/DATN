@props(['data'])

<div class="d-flex justify-content-between align-items-center mt-3">
    <div class="d-flex align-items-center">
        <select class="form-select" style="width: auto;" onchange="window.location.href=this.value">
            @foreach ([5, 10, 20, 50] as $pageSize)
                <option value="{{ request()->fullUrlWithQuery(['per_page' => $pageSize, 'page' => 1]) }}"
                    {{ $data->perPage() == $pageSize ? 'selected' : '' }}>
                    {{ $pageSize }} bản ghi
                </option>
            @endforeach
        </select>
    </div>

    <div class="pagination-container d-flex justify-content-center flex-grow-1">
        {{ $data->appends(['per_page' => request()->get('per_page')])->links() }}
    </div>

    <div class="d-flex align-items-center">
        <span>
            Hiển thị {{ $data->firstItem() ?? 0 }}-{{ $data->lastItem() ?? 0 }} của {{ $data->total() }} bản ghi
        </span>
    </div>
</div>

<style>
    .pagination-container .pagination {
        margin-bottom: 0;
    }
</style>
