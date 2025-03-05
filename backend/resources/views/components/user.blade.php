<li class="nav-item navbar-dropdown dropdown-user dropdown">
    <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
        <span class="fw-bold">Name</span>
    </a>
    <ul class="dropdown-menu dropdown-menu-end">
        <li>
            <a class="dropdown-item" href="#">
                <div class="d-flex">
                    <div class="flex-grow-1">
                        <span class="fw-semibold d-block">Name</span>
                        <small class="text-muted">Role</small>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <div class="dropdown-divider"></div>
        </li>
        <li>
            <a class="dropdown-item" href="{{ route('profile.edit') }}">
                <i class="bx bx-user me-2"></i>
                <span class="align-middle">Hồ sơ của tôi</span>
            </a>
        </li>
        {{-- @if (in_array(Auth::user()->role, ['admin'])) --}}
        <li>
            <a class="dropdown-item" href="{{ route('system.edit') }}">
                <i class="bx bx-cog me-2"></i>
                <span class="align-middle">Cài đặt</span>
            </a>
        </li>
        {{-- @endif --}}
        <li>
            <a class="dropdown-item" href="#">
                <span class="d-flex align-items-center align-middle">
                    <i class="flex-shrink-0 bx bx-credit-card me-2"></i>
                    <span class="flex-grow-1 align-middle">Hóa đơn</span>
                    <span class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                </span>
            </a>
        </li>
        <li>
            <div class="dropdown-divider"></div>
        </li>
        <li>
            <form id="logout-form" method="POST" action="{{ route('logout') }}" style="display: none;">
                @csrf
            </form>

            <a class="dropdown-item" href="#"
                onclick="event.preventDefault(); if(confirm('Bạn chắc chắn muốn đăng xuất?')) { document.getElementById('logout-form').submit(); }">
                <i class="bx bx-power-off me-2"></i>
                <span class="align-middle">Đăng xuất</span>
            </a>

        </li>
    </ul>
</li>
