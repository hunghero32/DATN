<!DOCTYPE html>
<html
  lang="en"
  class="light-style"
  dir="ltr"
  data-theme="theme-default"
  data-assets-path="{{ asset('') }}"
  data-template="vertical-menu-template-free"></html>

<head>
  <meta charset="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    <!-- <title>{{$system->site_name}} | @yield('title')</title>
  <meta name="keywords" content="{{ $system->site_keywords }}">
  @if(View::hasSection('description'))
  <meta name="description" content="@yield('description')">
  @else
  <meta name="description" content="{{ $system->site_description }}">
  @endif
  <meta name="copyright" content="{{$system->site_name}}">
  <meta name="author" content="{{$system->site_name}}">
  <meta property="og:url" content="{{$system->site_url}}">
  <meta property="og:site_name" content="{{$system->site_name}} | @yield('title')">
  <meta property="og:title" content="{{$system->site_name}}">
  @if(View::hasSection('description'))
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
  @if(View::hasSection('description'))
  <meta name="twitter:description" content="@yield('description')">
  @else
  <meta name="twitter:description" content="{{ $system->site_description }}">
  @endif
  <meta name="twitter:image"
    content="{{ asset( 'storage/'.$system->site_logo) }}">
  <meta name="twitter:image:alt" content="{{$system->site_name}} | @yield('title')"> -->

  <!-- Favicon -->
  <!-- <link rel="icon" type="image/x-icon" href="{{ asset( 'storage/'.$system->site_favicon) }}" /> -->

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
    rel="stylesheet" />

  <!-- Icons. Uncomment required icon fonts -->
  <link rel="stylesheet" href="{{ asset('vendor/fonts/boxicons.css') }}" />

  <!-- Core CSS -->
  <link rel="stylesheet" href="{{ asset('vendor/css/core.css') }}" class="template-customizer-core-css" />
  <link rel="stylesheet" href="{{ asset('vendor/css/theme-default.css') }}" class="template-customizer-theme-css" />
  <link rel="stylesheet" href="{{ asset('css/demo.css') }}" />

  <!-- Vendors CSS -->
  <link rel="stylesheet" href="{{ asset('vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}" />
  <!-- Page CSS -->
  <!-- Page -->
  <link rel="stylesheet" href="{{ asset('vendor/css/pages/page-misc.css') }}" />
  <!-- Helpers -->
  <script src="{{ asset('vendor/js/helpers.js') }}"></script>

  <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
  <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
  <script src="{{ asset('js/config.js') }}"></script>
</head>

<body>
  <!-- Content -->

  <!-- Error -->
  <div class="container-xxl container-p-y">
    <div class="misc-wrapper">
      @yield(section: 'content')
      <a href="/dashboard" class="btn btn-primary">về trang chủ</a>
      <div class="mt-3">
        <img
          src="{{ asset('img/illustrations/man-with-laptop-light.png') }}"
          alt="page-misc-error-light"
          width="500"
          class="img-fluid"
          data-app-dark-img="illustrations/page-misc-error-dark.png"
          data-app-light-img="illustrations/page-misc-error-light.png" />
      </div>
    </div>
  </div>
  <!-- /Error -->

  <!-- / Content -->
  <!-- Core JS -->
  <!-- build:js assets/vendor/js/core.js -->
  <script src="{{ asset('vendor/libs/jquery/jquery.js') }}"></script>
  <script src="{{ asset('vendor/libs/popper/popper.js') }}"></script>
  <script src="{{ asset('vendor/js/bootstrap.js') }}"></script>
  <script src="{{ asset('vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>

  <script src="{{ asset('vendor/js/menu.js') }}"></script>
  <!-- endbuild -->

  <!-- Vendors JS -->

  <!-- Main JS -->
  <script src="{{ asset('js/main.js') }}"></script>

  <!-- Page JS -->

  <!-- Place this tag in your head or just before your close body tag. -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
</body>

</html>