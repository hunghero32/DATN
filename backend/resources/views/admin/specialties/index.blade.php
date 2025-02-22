@extends('layouts.app')
@section('content')
<div class="container-xxl mt-5">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Danh Sách Chuyên khoa</h5>
            <div class="d-flex gap-2">
                <a href="{{ route('specialties.create') }}" class="btn btn-primary"><i class="fa-solid fa-notes-medical"></i></a>
            </div>
        </div>
        <div class="card-body table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Mô Tả</th>
                        <th>Icon</th>
                        <th>Ảnh</th>
                        <th class="text-center"><i class="fa-solid fa-gear"></i>HĐ</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($specialties as $index => $specialty)
                    <tr>
                        <td>{{ ($specialties->currentPage() - 1) * $specialties->perPage() + $loop->iteration }}</td>
                        <td>{{ $specialty->name }}</td>
                        <td>{{ $specialty->description }}</td>
                        @if (filter_var($specialty->icon, FILTER_VALIDATE_URL))
                        <td><img src="{{$specialty->icon }}" alt="{{ $specialty->name }}" width="50"></td>
                        <td><img src="{{$specialty->image }}" alt="{{ $specialty->name }}" width="50"></td>
                        
                        @else
                        <td><img src="{{ asset('storage/'.$specialty->icon) }}" alt="{{ $specialty->name }}" width="50"></td>
                        <td><img src="{{ asset('storage/'.$specialty->image) }}" alt="{{ $specialty->name }}" width="50"></td>
                        @endif
                        <td>
                            <a href="{{ route('specialties.edit', $specialty->id) }}" class="btn btn-warning btn-sm"><i class="fa-solid fa-gear"></i></a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col">
                <div class="demo-inline-spacing">
                    <!-- Basic Pagination -->
                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <!-- First Page -->
                            @if ($specialties->currentPage() > 1)
                            <li class="page-item first">
                                <a class="page-link" href="{{ $specialties->url(1) }}">
                                    <i class="tf-icon bx bx-chevrons-left"></i>
                                </a>
                            </li>
                            @endif

                            <!-- Previous Page -->
                            @if ($specialties->currentPage() > 1)
                            <li class="page-item prev">
                                <a class="page-link" href="{{ $specialties->previousPageUrl() }}">
                                    <i class="tf-icon bx bx-chevron-left"></i>
                                </a>
                            </li>
                            @endif

                            <!-- Page Numbers (max 5 pages) -->
                            @php
                            $currentPage = $specialties->currentPage();
                            $lastPage = $specialties->lastPage();
                            $start = max(1, $currentPage - 2); // Start 2 pages before current page
                            $end = min($lastPage, $currentPage + 2); // End 2 pages after current page
                            @endphp

                            @for ($i = $start; $i <= $end; $i++)
                                <li class="page-item {{ $currentPage == $i ? 'active' : '' }}">
                                <a class="page-link" href="{{ $specialties->url($i) }}">{{ $i }}</a>
                                </li>
                                @endfor

                                <!-- Next Page -->
                                @if ($specialties->currentPage() < $specialties->lastPage())
                                    <li class="page-item next">
                                        <a class="page-link" href="{{ $specialties->nextPageUrl() }}">
                                            <i class="tf-icon bx bx-chevron-right"></i>
                                        </a>
                                    </li>
                                    @endif

                                    <!-- Last Page -->
                                    @if ($specialties->currentPage() < $specialties->lastPage())
                                        <li class="page-item last">
                                            <a class="page-link" href="{{ $specialties->url($specialties->lastPage()) }}">
                                                <i class="tf-icon bx bx-chevrons-right"></i>
                                            </a>
                                        </li>
                                        @endif
                        </ul>
                    </nav>
                    <!--/ Basic Pagination -->
                </div>
            </div>
        </div>
    </div>
</div>
@endsection