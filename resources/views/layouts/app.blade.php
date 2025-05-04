<!DOCTYPE html>
<html lang="en" class="light-style layout-menu-fixed" dir="ltr" data-theme="theme-default"
    data-assets-path="{{ asset('') }}" data-template="vertical-menu-template-free">

<head>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    {{-- <title>{{$system->site_name}} | @yield('title')</title>
  <meta name="keywords" content="{{ $system->site_keywords }}">
  @if (View::hasSection('description'))
  <meta name="description" content="@yield('description')">
  @else
  <meta name="description" content="{{ $system->site_description }}">
  @endif
  <meta name="copyright" content="{{$system->site_name}}">
  <meta name="author" content="{{$system->site_name}}">
  <meta property="og:url" content="{{$system->site_url}}">
  <meta property="og:site_name" content="{{$system->site_name}} | @yield('title')">
  <meta property="og:title" content="{{$system->site_name}}">
  @if (View::hasSection('description'))
  <meta property="og:description" content="@yield('description')">
  @else
  <meta property="og:description" content="{{ $system->site_description }}">
  @endif
  <meta property="og:type" content="website">
  <meta property="og:image"
    content="{{ asset( 'storage/'.$system->site_logo) }}">
  <meta property="og:image:secure"
    content="{{ asset( 'storage/'.$system->site_logo) }}">
  <meta name="twitter:title" content="{{$system->site_name}} | @yield('title')" />
  @if (View::hasSection('description'))
  <meta name="twitter:description" content="@yield('description')">
  @else
  <meta name="twitter:description" content="{{ $system->site_description }}">
  @endif
  <meta name="twitter:image"
    content="{{ asset( 'storage/'.$system->site_logo) }}">
  <meta name="twitter:image:alt" content="{{$system->site_name}} | @yield('title')"> --}}

    <!-- Favicon -->
    {{-- <link rel="icon" type="image/x-icon" href="{{ asset( 'storage/'.$system->site_favicon) }}" /> --}}

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet" />

    <!-- Icons. Uncomment required icon fonts -->
    <link rel="stylesheet" href="{{ asset('vendor/fonts/boxicons.css') }}" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Core CSS -->
    <link rel="stylesheet" href="{{ asset('vendor/css/core.css') }}" class="template-customizer-core-css" />
    <link rel="stylesheet" href="{{ asset('vendor/css/theme-default.css') }}" class="template-customizer-theme-css" />
    <link rel="stylesheet" href="{{ asset('css/demo.css') }}" />

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{ asset('vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}" />

    <link rel="stylesheet" href="{{ asset('vendor/libs/apex-charts/apex-charts.css') }}" />

    <!-- Page CSS -->
    <!-- Helpers -->
    <script src="{{ asset('vendor/js/helpers.js') }}"></script>

    <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
    <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
    <script src="{{ asset('js/config.js') }}"></script>
    <!-- Load jQuery nếu chưa có -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Load Select2 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" />

</head>

<body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->
            @include('components.menu')
            <!-- / Menu -->
            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->
                @include('components.nav')
                <!-- / Navbar -->
                <!-- <button type="button" id="showToastPlacement">Test nha </button> -->
                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Thông báo thành công -->
                    @if (session('success'))
                        <div class="bs-toast toast toast-placement-ex m-2 fade show bg-success top-5 start-0"
                            role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000"
                            id="success-toast">
                            <div class="toast-header">
                                <i class="bx bx-bell me-2"></i>
                                <div class="me-auto fw-semibold">Thành Công</div>
                                <button type="button" class="btn-close" data-bs-dismiss="toast"
                                    aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                {{ session('success') }}
                            </div>
                        </div>
                    @endif

                    <!-- Thông báo lỗi -->
                    @if (session('error'))
                        <div class="bs-toast toast toast-placement-ex m-2 fade show bg-danger top-5 start-0"
                            role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000" id="error-toast">
                            <div class="toast-header">
                                <i class="bx bx-bell me-2"></i>
                                <div class="me-auto fw-semibold">Thất Bại</div>
                                <button type="button" class="btn-close" data-bs-dismiss="toast"
                                    aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                {{ session('error') }}
                            </div>
                        </div>
                    @endif
                    <!-- Content -->
                    @yield('content')
                    <!-- / Content -->

                    <!-- Footer -->
                    @include('components.footer')
                    <!-- / Footer -->

                    <div class="content-backdrop fade"></div>
                </div>
                <!-- Content wrapper -->
            </div>
            <!-- / Layout page -->
        </div>

        <!-- Overlay -->
        <div class="layout-overlay layout-menu-toggle"></div>
    </div>
    <!-- / Layout wrapper -->

    <!-- Core JS -->
    <!-- build:js assets/vendor/js/core.js -->
    <script src="{{ asset('vendor/libs/jquery/jquery.js') }}"></script>
    <script src="{{ asset('vendor/libs/popper/popper.js') }}"></script>
    <script src="{{ asset('vendor/js/bootstrap.js') }}"></script>
    <script src="{{ asset('vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>

    <script src="{{ asset('vendor/js/menu.js') }}"></script>
    <!-- endbuild -->

    <!-- Vendors JS -->
    <script src="{{ asset('vendor/libs/apex-charts/apexcharts.js') }}"></script>

    <!-- Main JS -->
    <script src="{{ asset('js/main.js') }}"></script>
    <script src="{{ asset('js/ui-toasts.js') }}"></script>
    <!-- Page JS -->
    <script src="{{ asset('js/dashboards-analytics.js') }}"></script>

    <!-- Place this tag in your head or just before your close body tag. -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Tự động ẩn thông báo sau 5 giây (5000ms)
            setTimeout(function() {
                var successAlert = document.querySelector('.alert-success');
                var errorAlert = document.querySelector('.alert-danger');
                var successToast = document.getElementById('success-toast');
                var errorToast = document.getElementById('error-toast');
                if (successAlert, successToast) {
                    var alert = new bootstrap.Alert(successAlert);
                    alert.close(); // Ẩn thông báo thành công
                }
                if (errorAlert) {
                    var alert = new bootstrap.Alert(errorAlert);
                    alert.close(); // Ẩn thông báo lỗi
                }
                if (successToast) {
                    var toast = new bootstrap.Toast(successToast);
                    toast.hide(); // Ẩn thông báo thành công
                }
                if (errorToast) {
                    var toast = new bootstrap.Toast(errorToast);
                    toast.hide(); // Ẩn thông báo lỗi
                }
            }, 5000);
        });
    </script>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    @yield('JS')
</body>

</html>
