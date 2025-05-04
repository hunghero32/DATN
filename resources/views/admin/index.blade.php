<!DOCTYPE html>
<html lang="en" class=" layout-navbar-fixed layout-menu-fixed layout-compact " dir="ltr" data-skin="default" data-assets-path="../../admin/assets/" data-template="vertical-menu-template" data-bs-theme="light">

<head>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <title>@yield('title')</title>


    <meta name="description" content="" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('admin/assets/img/favicon/favicon.ico') }}" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('assets/vendor/fonts/iconify-icons.css') }}" />

    <!-- Icons. Uncomment required icon fonts -->
    <link rel="stylesheet" href="{{ asset('admin/assets/vendor/fonts/boxicons.css') }}" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Core CSS -->
    <link rel="stylesheet" href="{{ asset('admin/assets/vendor/css/core.css') }}"
        class="template-customizer-core-css" />
    <link rel="stylesheet" href="{{ asset('admin/assets/vendor/css/theme-default.css') }}"
        class="template-customizer-theme-css" />
    <link rel="stylesheet" href="{{ asset('admin/assets/css/demo.css') }}" />

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{ asset('admin/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}" />

    <link rel="stylesheet" href="{{ asset('admin/assets/vendor/fonts/flag-icons.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/assets/vendor/libs/apex-charts/apex-charts.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/assets/vendor/libs/flatpickr/flatpickr.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/assets/vendor/libs/typeahead-js/typeahead.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/assets/vendor/libs/tagify/tagify.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/assets/vendor/libs/select2/select2.css') }}" />

    <!-- Helpers -->
    <script src="{{ asset('admin/assets/vendor/js/helpers.js') }}"></script>

    <!-- Template customizer -->
    <script src="{{ asset('admin/assets/vendor/js/template-customizer.js') }}"></script>

    <!-- Config -->
    <script src="{{ asset('admin/assets/js/config.js') }}"></script>
</head>

<body>
    <!-- Toast Container -->
<div class="position-fixed bottom-0 start-0 p-3" style="z-index: 9999">
  @if(session('success'))
  <div id="success-toast" class="toast align-items-center text-bg-success border-0 show bg-success" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{ session('success') }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  @endif

  @if($errors->any())
  <div id="error-toast" class="toast align-items-center text-bg-danger border-0 show bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <ul class="mb-0">
            @foreach($errors->all() as $error)
              <li>{{ $error }}</li>
            @endforeach
          </ul>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  @endif
</div>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->

            @include('admin.layouts.sidebarMenu')
            <!-- / Menu -->

            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->

                @include('admin.layouts.nav')

                <!-- / Navbar -->

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->
                        @yield('content')
                    <!-- / Content -->

                    <!-- Footer -->
                    <footer class="content-footer footer bg-footer-theme">
                        <div
                            class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                            <div class="mb-2 mb-md-0">
                                ©
                                <script>
                                    document.write(new Date().getFullYear());
                                </script>
                                , made with ❤️ by Quick Care
                            </div>
                        </div>
                    </footer>
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
    <!-- Vendor JS -->
    <!-- Đảm bảo sử dụng đúng asset() trong Laravel -->
    <script src="{{ asset('admin/assets/vendor/libs/jquery/jquery.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/popper/popper.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/js/bootstrap.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/@algolia/autocomplete-js.js') }}"></script>

    <script src="{{ asset('admin/assets/vendor/libs/pickr/pickr.js') }}"></script>

    <script src="{{ asset('admin/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>

    <script src="{{ asset('admin/assets/vendor/libs/hammer/hammer.js') }}"></script>

    <script src="{{ asset('admin/assets/vendor/libs/i18n/i18n.js') }}"></script>

    <script src="{{ asset('admin/assets/vendor/js/menu.js') }}"></script>

    <!-- Vendors JS -->
    <script src="{{ asset('admin/assets/vendor/libs/select2/select2.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/apex-charts/apexcharts.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/select2/select2.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/bootstrap-select/bootstrap-select.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/moment/moment.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/flatpickr/flatpickr.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/typeahead-js/typeahead.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/tagify/tagify.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/@form-validation/popular.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/@form-validation/bootstrap5.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/libs/@form-validation/auto-focus.js') }}"></script>

    <!-- Main JS -->
    <script src="{{ asset('admin/assets/js/main.js') }}"></script>
    <script src="{{ asset('js/ui-toasts.js') }}"></script>
    <!-- Page JS -->
    <script src="{{ asset('admin/assets/js/dashboards-crm.js') }}"></script>


    <script src="{{ asset('admin/assets/js/pages-account-settings-account.js') }}"></script>
    <!-- Place this tag in your head or just before your close body tag. -->
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    @stack('scripts')
    @yield('scripts')
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
</body>

</html>
