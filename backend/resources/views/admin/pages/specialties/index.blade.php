@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2>Danh sách chuyên khoa</h2>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <form action="{{ route('admin.specialties.index') }}" method="GET" class="mb-3">
        <div class="row">
            <div class="col-md-4">
                <input type="text" name="search" class="form-control" placeholder="Tìm kiếm theo tên chuyên khoa" value="{{ request()->search }}">
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-success">Tìm kiếm</button>
            </div>
            <div class="col-md-6 text-end">
                <a href="{{ route('admin.specialties.create') }}" class="btn btn-primary">Thêm chuyên khoa</a>
            </div>
        </div>
    </form>
    


    <table class="table table-bordered">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Biểu tượng</th>
                <th>Hình ảnh</th>
                {{-- <th>Mô tả</th> --}}
                <th>Trạng thái</th>

                <th></th>
            </tr>
        </thead>
        <tbody>
            @foreach($specialties as $item)
                <tr>
                    <td>{{ ($specialties->currentPage() - 1) * $specialties->perPage() + $loop->iteration }}</td>
                    <td>{{ $item->name }}</td>
                    <td>
                        @if($item->icon)
                            <img src="{{ asset('storage/' . $item->icon) }}" width="50" height="50">
                        @endif
                    </td>
                    <td>
                        @if($item->image)
                            <img src="{{ asset('storage/' . $item->image) }}" width="100" height="70">
                        @endif
                    </td>
                    {{-- <td>{!! Str::limit($item->description, 100) !!}</td> --}}
                    <td>
                        <form action="{{ route('admin.specialties.updateStatus', $item->id) }}" method="POST">
                            @csrf
                            @method('PUT')
                            <select name="isDeleted" onchange="this.form.submit()" 
                                class="form-select form-select-sm fw-bold text-white 
                                    {{ $item->isDeleted == 0 ? 'bg-success' : 'bg-danger' }}">
                                <option class="bg-success text-white" value="0" {{ $item->isDeleted == 0 ? 'selected' : '' }}>Đã phê duyệt</option>
                                <option class="bg-danger text-white" value="1" {{ $item->isDeleted == 1 ? 'selected' : '' }}>Chưa phê duyệt</option>
                            </select>
                        </form>
                    </td>
                    
                    
                    <td>
                        <div class="dropdown">
                            <a href="#" role="button" id="dropdownMenuButton{{ $item->id }}" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none; font-size: 20px; color: #000;">
                                &#8942;
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton{{ $item->id }}">
                                <li>
                                    <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#viewSpecialtyModal{{ $item->id }}">Xem</a> 
                                </li>
                                <li>
                                    <a class="dropdown-item" href="{{ route('admin.specialties.edit', $item->id) }}">Sửa</a>
                                </li>
                                {{-- <li>
                                    <form action="{{ route('admin.specialties.delete', $item->id) }}" method="POST" onsubmit="return confirm('Bạn có chắc muốn xóa?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="dropdown-item text-danger">Xóa</button>
                                    </form>
                                </li> --}}
                            </ul>
                        </div>
                    </td>
                    
                </tr>
                <!-- modal chi tiet -->
                <div class="modal fade" id="viewSpecialtyModal{{ $item->id }}" tabindex="-1" aria-labelledby="viewSpecialtyModalLabel{{ $item->id }}" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewSpecialtyModalLabel{{ $item->id }}">Chi tiết chuyên khoa</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label class="form-label"><strong>Tên chuyên khoa:</strong></label>
                                    <p>{{ $item->name }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label"><strong>Mô tả:</strong></label>
                                    <div>{!! $item->description !!}</div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label"><strong>Biểu tượng:</strong></label><br>
                                    @if($item->icon)
                                        <img src="{{ asset('storage/' . $item->icon) }}" width="50" height="50">
                                    @else
                                        <p>Không có</p>
                                    @endif
                                </div>
                                <div class="mb-3">
                                    <label class="form-label"><strong>Hình ảnh:</strong></label><br>
                                    @if($item->image)
                                        <img src="{{ asset('storage/' . $item->image) }}" width="150" height="100">
                                    @else
                                        <p>Không có</p>
                                    @endif
                                </div>
                            </div>
                            <div class="modal-footer">
                                <a href="{{ route('admin.specialties.edit', $item->id) }}" class="btn btn-warning">Sửa</a>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>

            @endforeach
        </tbody>
    </table>

    {{ $specialties->links() }}
</div>
@endsection
