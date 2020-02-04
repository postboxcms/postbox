@extends('master')
  @section('content')
            <!-- Nested Row within Card Body -->
            <div class="row">
              {{-- <div class="col-lg-6 d-none d-lg-block bg-login-image bg-install-image">
                <img src="{{asset('images/cms-background.jpg')}}"/>
              </div> --}}
              <div class="col-lg-12">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 install-heading text-gray-900 mb-4"><span class="btn btn-primary btn-circle">1</span> Application details</h1>
                  </div>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0"
                    aria-valuemin="0" aria-valuemax="100" style="width:25%">
                      <span class="sr-only">70% Complete</span>
                    </div>
                  </div>
                  <form method="post" action="{{url('install/update/app')}}" class="user push-form">
                      {{-- <hr/> --}}
                      @csrf
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                          <input value="{{$app['title']}}" required type="text" name="title" class="form-control form-control-user @error('title') is-invalid @enderror" id="title" aria-describedby="title" placeholder="Add a title for your app. E.g '{{env('APP_NAME')}}'">
                            @error('title')
                              <span class="invalid-feedback" role="alert">
                                  <strong>{{ $message }}</strong>
                              </span>
                            @enderror
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                          <input value="{{$app['description']}}" type="text" name="description" class="form-control form-control-user @error('description') is-invalid @enderror" id="description" aria-describedby="description" placeholder="Add a description for your app">
                            @error('description')
                              <span class="invalid-feedback" role="alert">
                                  <strong>{{ $message }}</strong>
                              </span>
                            @enderror
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                          <input value="{{$app['keywords']}}" type="text" name="keywords" class="form-control form-control-user @error('keywords') is-invalid @enderror" id="keywords" aria-describedby="keywords" placeholder="Add some keywords which describe your app">
                            @error('keywords')
                              <span class="invalid-feedback" role="alert">
                                  <strong>{{ $message }}</strong>
                              </span>
                            @enderror
                          </div>
                        </div>
                      </div>  
                      <div class="row">
                          <div class="col-md-6 text-center">
                              {{-- <a class="btn btn-light btn-block btn-user" href="{{url('/welcome')}}">Back</a> --}}
                          </div>        
                          <div class="col-md-6 text-center">
                              <button type="submit" class="btn btn-primary btn-block btn-user" href="{{url('/install/step/2')}}">Next step</button>
                          </div>        
                      </div>
                  </form>
                  {{-- <hr>
                  <div class="text-center">
                    <a class="small" href="forgot-password.html">Forgot Password?</a>
                  </div> --}}
                </div>
              </div>
            </div>
  @endsection

  @section('scripts')
  <script>
      // console.log(editorData)
      $.when(
          $.getScript( "{{asset('js/push-router/push-form.js')}}" ),
          $.getScript( "{{asset('js/box.js')}}" ),
          $.Deferred(function( deferred ){
              $( deferred.resolve );
          })
      ).done(function(){
  
          //place your code here, the scripts are all loaded
          $(document).ready(function(){
              $('.push-form').pushForm({
                  errors:{
                      spanClass: 'invalid-feedback',
                      fieldClass: 'validation-error'
                  },
                  redirect: '/install/step/2'
              });
          });        
  
      });
  
  </script>
  @stop  