@extends('admin.index')
@section('title', 'Danh sách hồ sơ bệnh án')

@section('content')

    <form class="row g-2" method="GET" action="{{ route('admin.medical_records.index') }}">
        <div class="col-md-2">
        <input class="form-control me-3" type="text" name="search" value="{{ request('search') }}" placeholder="Tìm theo Tên hoặc SĐT">
    </div>
    <div class="col-md-2">
        <button class="btn btn-primary " type="submit">Tìm kiếm</button>
    </div>
    </form>

    <a  href="{{ route('admin.medical_records.create') }}" class="btn btn-success" >Thêm mới</a>

    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Tên Khách</th>
                <th>BHYT</th>
                <th>Tình trạng bệnh</th>
                <th>Điều trị</th>
                <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $record)
                <tr>
                    <td>{{ $record->id }}</td>
                    <td>{{ $record->guest ? $record->guest->guest_name : 'N/A' }}</td>
                    <td>{{ $record->BHYT }}</td>
                    <td>{{ $record->medical_condition }}</td>
                    <td>{{ $record->treatment }}</td>
                    <td>
                        <a href="{{ route('admin.medical_records.show', $record->id) }}" class="btn btn-info">Chi tiết</a>
                        <a href="{{ route('admin.medical_records.edit', $record->id) }}" class="btn btn-warning btn-sm">Sửa</a>
                        <form action="{{ route('admin.medical_records.destroy', $record->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Bạn có chắc muốn xóa?')" class="btn btn-danger btn-sm">Xóa</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{ $data->links() }}
@endsection
