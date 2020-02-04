<!DOCTYPE html>
<html lang="en">

<head>
  <base href="{{env('APP_URL')}}" />
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Postbox - </title>

  <!-- Custom fonts for this template-->
  <link href="{{asset('js/admin/vendor/fontawesome-free/css/all.min.css')}}" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="{{asset('css/admin/theme.css')}}" rel="stylesheet">
  <!-- <link href="{{asset('css/admin/app-loading.css')}}" rel="stylesheet"> -->

</head>

<body class="bg-gradient-white">

  <div class="container" id="box">
    <div class="row justify-content-center border-0 my-2">
      <a class="container-brand d-flex align-items-center justify-content-center" href="{{admin_url('/')}}">
        <div class="container-brand-icon">
          <!-- <i class="fas fa-laugh-wink"></i> -->
          <img src= "{{ asset('images/logo_blue_min.png') }}" height="56px" />
        </div>
        <div class="container-brand-text mx-3"></div>
      </a>
    </div>

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-3">
          <div class="card-body p-0">
                @yield('content')
          </div>
        </div>

      </div>

    </div>

  </div>

  <!-- Bootstrap core JavaScript-->
  <script src="{{ asset('js/admin/vendor/jquery/jquery.min.js') }}"></script>

  <!-- Core plugin JavaScript-->
  <script src="{{ asset('js/admin/vendor/jquery-easing/jquery.easing.min.js') }}"></script>

  <!-- Postbox js -->
  <script src="{{ asset('js/admin/admin.js') }}"></script>  
  <script src="{{ asset('js/app.js') }}" defer></script>  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
  <script data-type="push-router" src="{{ asset('js/push-router/push-config.js') }}" defer></script>    
  <script data-type="push-router" src="{{ asset('js/push-router/push-router.js') }}" defer></script>  
  <script data-type="push-router">
    // Global variables
    $(document).ready(function() {
      $.pushRoute({
        'element': 'a'
      });
    });
  </script>

</body>

</html>
