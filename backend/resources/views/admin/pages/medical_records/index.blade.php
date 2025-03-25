@extends('admin.index')

@section('title', 'Danh sách hồ sơ bệnh án')

@section('content')

    <div class="content-wrapper">

        <div class="container-xxl flex-grow-1 container-p-y">

            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Hồ sơ bệnh án /</span> Danh sách</h4>

            <div class="card">

                <div class="card-header d-flex justify-content-between">
                    <h5 class="mb-0">Danh sách hồ sơ bệnh án</h5>
                    <a href="{{ route('admin.medical_records.create') }}" class="btn btn-success">Thêm mới</a>
                </div>

                <div class="card-body">

                    <form method="GET" action="{{ route('admin.medical_records.index') }}" class="row g-3">
                        <div class="col-md-4">
                            <input type="text" name="search" class="form-control"
                                placeholder="Tìm theo Tên hoặc SĐT" value="{{ request('search') }}">
                        </div>

                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                        </div>

                        @if (request('search'))
                            <div class="col-md-2">
                                <a href="{{ route('admin.medical_records.index') }}" class="btn btn-secondary">Quay lại</a>
                            </div>
                        @endif
                        
                    </form>

                </div>

                <div class="table-responsive">

                    <table class="table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Tên Khách</th>
                                <th>BHYT</th>
                                <th>Ghi chú</th>
                                <th>Hành động</th>
                            </tr>
                            
                        </thead>

                        <tbody>
                            @foreach ($data as $record)
                                <tr>
                                    <td>{{ ($data->currentPage() - 1) * $data->perPage() + $loop->iteration }}</td>
                                    <td>{{ $record->guest ? $record->guest->guest_name : 'N/A' }}</td>
                                    <td>{{ $record->BHYT }}</td>
                                    <td>{{ $record->note }}</td>
                                    <td>
                                        <a href="{{ route('admin.medical_records.show', $record->id) }}" class="btn btn-info btn-sm">Chi tiết</a>
                                        <a href="{{ route('admin.medical_records.edit', $record->id) }}" class="btn btn-warning btn-sm">Sửa</a>
                                        <form action="{{ route('admin.medical_records.destroy', $record->id) }}" method="POST" class="d-inline">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" onclick="return confirm('Bạn có chắc muốn xóa?')" class="btn btn-danger btn-sm">Xóa</button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>

                    </table>

                </div>

                <div class="card-footer">
                    {{ $data->appends(request()->query())->links() }} 
                </div>
            </div>

        </div>

    </div>

@endsection
