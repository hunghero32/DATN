<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
  <div class="app-brand demo">
    <a href="/dashboard" class="app-brand-link">
      <span class="app-brand-text demo menu-text fw-bolder ms-2">DATN</span>
    </a>

    <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
      <i class="bx bx-chevron-left bx-sm align-middle"></i>
    </a>
  </div>

  <div class="menu-inner-shadow"></div>

  <ul class="menu-inner py-1">
    <!-- Dashboard -->
    <li class="menu-item {{ request()->is('dashboard*') ? 'active' : '' }}">
      <a href="{{ route('dashboard') }}" class="menu-link">
        <i class="menu-icon tf-icons bx bx-home-circle"></i>
        <div data-i18n="Analytics">Dashboard</div>
      </a>
    </li>
    <!-- Admin -->
    <li class="menu-header small text-uppercase">
      <span class="menu-header-text">Admin</span>
    </li>
    <li class="menu-item {{ request()->is('admin*') ? 'active open' : '' }}">
      <a href="javascript:void(0);" class="menu-link menu-toggle">
        <i class="menu-icon tf-icons bx bx-layout"></i>
        <div data-i18n="Admins">Admin</div>
      </a>
      <ul class="menu-sub">
        <li class="menu-item {{ request()->is('*system*') ? 'active' : '' }}">
          <a href="" class="menu-link">
            <div data-i18n="system">Hệ Thống</div>
          </a>
        </li>
        <li class="menu-item {{ request()->is('*user*') ? 'active' : '' }}">
          <a href="" class="menu-link">
            <div data-i18n="users">Người Dùng</div>
          </a>
        </li>
        <li class="menu-item {{ request()->is('*doctor*') ? 'active' : '' }}">
          <a href="" class="menu-link">
            <div data-i18n="doctor">Bác sĩ</div>
          </a>
        </li>
      </ul>
    </li>

    <li class="menu-header small text-uppercase">
      <span class="menu-header-text">Doctor</span>
    </li>


  </ul>
</aside>