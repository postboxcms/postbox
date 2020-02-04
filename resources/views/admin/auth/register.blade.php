@extends('admin.auth.template')
@section('content')
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-6 d-none d-lg-block bg-register-image">
            <img src="{{asset('images/cms-background.jpg')}}"/>
          </div>
          <div class="col-lg-6">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form class="user" method="POST" action="{{ route('register') }}">
                @csrf
                <div class="form-group row">
                  <div class="col-sm-12 mb-3 mb-sm-0">
                      <input type="text" required name="username" value="{{old('username')}}" class="form-control form-control-user @error('username') is-invalid @enderror" id="username" placeholder="Username">                    
                      @error('username')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                      @enderror
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-12 mb-3 mb-sm-0">
                    <input type="text" required name="name" value="{{old('name')}}" class="form-control form-control-user @error('name') is-invalid @enderror" id="name" placeholder="Name">                    
                    @error('name')
                      <span class="invalid-feedback" role="alert">
                          <strong>{{ $message }}</strong>
                      </span>
                    @enderror
                  </div>
                  <!-- <div class="col-sm-6">
                    <input type="text" class="form-control form-control-user" id="exampleLastName" placeholder="Last Name">
                  </div> -->
                </div>
                <div class="form-group row">
                  <div class="col-sm-12 mb-3 mb-sm-0">
                    <input required type="email" name="email" class="form-control form-control-user @error('email') is-invalid @enderror" id="email" value="{{old('email')}}" placeholder="Email address">
                    @error('email')
                      <span class="invalid-feedback" role="alert">
                          <strong>{{ $message }}</strong>
                      </span>
                    @enderror
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input type="password" class="form-control form-control-user @error('password') is-invalid @enderror" name="password" required autocomplete="new-password" id="password" placeholder="Password">
                    @error('password')
                      <span class="invalid-feedback" role="alert">
                          <strong>{{ $message }}</strong>
                      </span>
                    @enderror
                  </div>
                  <div class="col-sm-6">
                    <input type="password" name="password_confirmation" autocomplete="new-password" required class="form-control form-control-user" id="repeatpassword" placeholder="Repeat Password">
                  </div>
                </div>
                <button type="submit" class="btn btn-primary btn-user btn-block">
                  {{ __('Register') }}
                </button>
                <hr>
                {{-- <a href="index.html" class="btn btn-google btn-user btn-block">
                  <i class="fab fa-google fa-fw"></i> Register with Google
                </a>
                <a href="index.html" class="btn btn-facebook btn-user btn-block">
                  <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                </a> --}}
              </form>
              {{-- <hr>
              <div class="text-center">
                <a class="small" href="forgot-password.html">Forgot Password?</a>
              </div> --}}
              <div class="text-center">
                <a class="small" href="{{admin_url('/login')}}">Already have an account? Login!</a>
              </div>
            </div>
          </div>
        </div>
@endsection