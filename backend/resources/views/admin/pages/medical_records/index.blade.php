@extends('admin.index')
@section('title', 'Danh sách hồ sơ bệnh án')

@section('content')
    <form method="GET" action="{{ route('admin.medical_records.index') }}">
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Tìm theo Tên hoặc SĐT">
        <button type="submit">Tìm kiếm</button>
    </form>

    <a  href="{{ route('admin.medical_records.create') }}" class="btn btn-success" >Thêm mới</a>

    <table>
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
                            <button type="submit" onclick="return confirm('Bạn có chắc muốn xóa?')">Xóa</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{ $data->links() }}
@endsection
