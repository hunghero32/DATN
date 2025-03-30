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
                        <div class="dropdown">
                            <a href="#" role="button" id="dropdownMenuButton{{ $item->id }}" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none; font-size: 20px; color: #000;">
                                &#8942;
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton{{ $item->id }}">
                                <li>
                                    <a class="dropdown-item" href="{{ route('admin.specialties.show', $item->id) }}">Xem</a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="{{ route('admin.specialties.edit', $item->id) }}">Sửa</a>
                                </li>
                                <li>
                                    <form action="{{ route('admin.specialties.delete', $item->id) }}" method="POST" onsubmit="return confirm('Bạn có chắc muốn xóa?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="dropdown-item text-danger">Xóa</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </td>
                    
                </tr>
            @endforeach
        </tbody>
    </table>

    {{ $specialties->links() }}
</div>
@endsection
