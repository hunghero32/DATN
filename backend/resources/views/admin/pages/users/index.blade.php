@extends('admin.index')

@section('title', 'Thông tin nguoi dung')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Tables /</span> USERS</h4>

            <div class="text-end mb-3">
                <a href="{{route('admin.users.create')}}" class="btn btn-success">Thêm mới</a>
            </div>

            <div class="card mt-3">
                <div class="table-responsive text-nowrap">
                    <table class="table table-bordered table-hover align-middle">
                        <thead class="table-dark text-center">
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>social_id</th>
                                <th>social_provider</th>
                                <th>password</th>
                                <th>ROLE</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            @foreach ($user as $key => $value)
                                <tr>
                                    <td class="text-center"><strong>{{ $key + 1 }}</strong></td>

                                    <td>{{ $value->name }}</td>
                                    <td>{{ $value->email }}</td>
                                    <td>{{ $value->phone }}</td>
                                    <td class="text-center">{{ $value->social_id }}</td>
                                    <td class="text-center">{{ $value->social_provider }}</td>
                                    <td class="text-center">{{ $value->password }}</td>
                                    <td class="text-center">
                                        <span class="badge bg-warning text-dark">{{ ucfirst($value->role) }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="d-flex justify-content-center gap-2">
                                            <a class="btn btn-primary btn-sm"
                                                href="{{route('admin.users.edit', $value->id)}}">
                                                <i class="bx bx-edit-alt"></i> Sửa
                                            </a>
                                            <form action="{{route('admin.users.delete',$value->id)}}" method="POST"
                                                onsubmit="return confirm('Bạn có chắc chắn muốn xóa?')">
                                                @method('delete')
                                                @csrf
                                                <button type="submit" class="btn btn-danger btn-sm">
                                                    <i class="bx bx-trash"></i> Xóa
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="content-backdrop fade"></div>
    </div>
@endsection
