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

  <title>{{env('APP_NAME')}} - {{ $title }}</title>

  <!-- Custom fonts for this template-->
  <link href="{{asset('js/admin/vendor/fontawesome-free/css/all.min.css')}}" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet" />
  <!-- Custom styles for this template-->
  <link href="{{asset('css/admin/theme.css')}}" rel="stylesheet">
  <!-- <link href="{{asset('css/admin/app-loading.css')}}" rel="stylesheet">   -->
  @yield('styles')
</head>

<body id="page-top">

  <!-- Box wrapper -->
  <div id="box">
    <!-- Page Wrapper -->
      <div id="wrapper">

        <!-- Sidebar -->
          @include('admin.section.sidebar')
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

          <!-- Main Content -->
          <div id="content">

            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

              <!-- Sidebar Toggle (Topbar) -->
              <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                <i class="fa fa-bars"></i>
              </button>

              <!-- Breadcrumbs view -->
              <div class="breadcrumb-view">
                {!! generate_breadcrumbs() !!}
              </div>
              <!-- End breadcrumbs view -->

              <!-- Topbar Search -->
              @yield('search')

              <!-- Topbar Navbar -->
              <ul class="navbar-nav ml-auto">

                <!-- Nav Item - Alerts -->
                @yield('alerts')

                <!-- Nav Item - Messages -->
                @yield('messages')

                <li class="nav-item">
                    <a target="_blank" class="nav-link no-push" href="{{url('/')}}">
                      <span class="medium text-gray-600">Visit the website</span>
                    </a>
                </li>

                <div class="topbar-divider d-none d-sm-block"></div>

                <!-- Nav Item - User Information -->
                <li class="nav-item dropdown no-arrow">
                  <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 medium">{{ auth()->user()->name }}</span>
                    @if(auth()->user()->image !== null) 
                      <div class="user-image-rounded" style="background:url({{asset('storage/users/'.auth()->user()->image)}}) no-repeat center; background-size: cover;"></div>
                    @else
                      <div class="user-image-rounded">{{substr(auth()->user()->name,0,1)}}</div>
                    @endif
                  </a>
                  <!-- Dropdown - User Information -->
                  <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="{{admin_url('/user/edit/'.auth()->user()->id)}}">
                      <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </a>
                    <a class="dropdown-item" href="{{admin_url('/settings/system')}}">
                      <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                      Settings
                    </a>
                    <!-- <a class="dropdown-item" href="#">
                      <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                      Activity Log
                    </a> -->
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                      <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </a>
                  </div>
                </li>

              </ul>

            </nav>
            <!-- End of Topbar -->

            <!-- Begin Page Content -->
            <div class="container-fluid">
                @yield('content')
            </div>
            <!-- /.container-fluid -->

          </div>
          <!-- End of Main Content -->

          <!-- Footer -->
          <footer class="sticky-footer shadow bg-white">
            <div class="container my-auto">
              <div class="copyright text-center my-auto">
                <span>Made with <i class="fas fa-heart"></i> at Digitalbit Labs</span>
              </div>
            </div>
          </footer>
          <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

      </div>
    <!-- End of Page Wrapper -->
  </div>
  <!-- End box wrapper -->
  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  <!-- Logout Modal-->
  <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal"><i class="fas fa-times"></i> Cancel</button>
          <a class="btn btn-primary" href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
            <i class="fas fa-sign-out-alt"></i> {{ __('Logout') }}
          </a>
          <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap core JavaScript-->
  <script src="{{asset('js/admin/vendor/jquery/jquery.min.js')}}"></script>
  <script src="{{asset('js/admin/vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>

  <!-- Core plugin JavaScript-->
  <script src="{{asset('js/admin/vendor/jquery-easing/jquery.easing.min.js')}}"></script>

  <!-- <script src="{{asset('js/admin/vendor/chart.js/Chart.min.js')}}"></script> -->

  <!-- Postbox js -->
  <script src="{{ asset('js/admin/admin.js') }}"></script>  
  <script src="{{ asset('js/app.js') }}" defer></script>  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
  <script data-type="push-router" src="{{ asset('js/push-router/push-config.js') }}" defer></script>      
  <script data-type="push-router" src="{{ asset('js/push-router/push-router.js') }}" defer></script>  
  <script data-type="push-router">
    // Global variables
    $(document).ready(function() {
      // console.log(baseURL());
      $.pushRoute({
        'element': 'a'
      });
    });
  </script>
  <!-- Page level plugins -->
  @yield('scripts')
  <!-- Stacked scripts Harimayco Menu builder -->
  @stack('scripts')

</body>

</html>
