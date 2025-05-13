<nav class="layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0   d-xl-none ">
        <a class="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
            <i class="icon-base bx bx-menu icon-md"></i>
        </a>
    </div>


    <div class="navbar-nav-right d-flex align-items-center justify-content-end" id="navbar-collapse">
        <!-- Search -->
        <!-- /Search -->

        <ul class="navbar-nav flex-row align-items-center ms-md-auto">
            <!-- Place this tag where you want the button to render. -->
            <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                <span class="position-relative">
                    <i class="icon-base bx bx-bell icon-md"></i>
                    <span class="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
                </span>
            </a>

            <!-- User -->
            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    {{-- <span class="fw-bold">{{ Auth::user()->name }}</span> --}}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <a class="dropdown-item" href="#">
                            <div class="d-flex">
                                <div class="flex-grow-1">
                                    {{-- <span class="fw-semibold d-block">{{ Auth::user()->name }}</span>
                                    <small class="text-muted">{{ Auth::user()->role }}</small> --}}
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <div class="dropdown-divider"></div>
                    </li>
                    <li>
                        <a class="dropdown-item" href="{{ route('admin.profile.edit') }}">
                            <i class="bx bx-user me-2"></i>
                            <span class="align-middle">Tài Khoản</span>
                        </a>
                    </li>
                    <li>
                        <div class="dropdown-divider"></div>
                    </li>

                    <!-- Form đăng xuất với xác minh -->
                    <form id="logout-form" method="POST" action="{{ route('admin.logout') }}" style="display: none;">
                        @csrf
                    </form>
                    <a class="dropdown-item" href="javascript:void(0);" onclick="confirmLogout()">
                        <i class='bx bx-log-out-circle me-2'></i>
                        <span class="align-middle">Đăng xuất</span>
                    </a>
                </ul>
            </li>
            <script>
                function confirmLogout() {
                    // Hiển thị hộp thoại xác nhận trước khi thực hiện logout
                    if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
                        // Nếu người dùng chọn "OK", gửi form đăng xuất
                        document.getElementById('logout-form').submit();
                    }
                }
            </script>
            <!--/ User -->
        </ul>
    </div>
</nav>
