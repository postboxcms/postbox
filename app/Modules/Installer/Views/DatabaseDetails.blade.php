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
                    <h1 class="h4 text-gray-900 mb-4 install-heading"><span class="btn btn-primary btn-circle">2</span> Database details</h1>
                  </div>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="50"
                    aria-valuemin="0" aria-valuemax="100" style="width:50%">
                      <span class="sr-only">70% Complete</span>
                    </div>
                  </div>
                  <form method="post" action="{{url('install/update/database')}}" class="user push-form">
                    {{-- <hr/> --}}
                    @csrf
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <select name="connection" class="form-control form-control-select">
                            <option value="mysql">MySQL</option>
                            <option value="sqlite">SQLite</option>
                            <option value="pgsql">Postgre SQL</option>
                            <option value="sqlsrv">SQL Server</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                        <input value="{{$db['host']}}" type="text" name="host" class="form-control form-control-user @error('host') is-invalid @enderror" id="host" aria-describedby="host" placeholder="Database host ({{env('DB_HOST')}})">
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
                        <input value="{{$db['port']}}" type="text" name="port" class="form-control form-control-user @error('port') is-invalid @enderror" id="port" aria-describedby="port" placeholder="Database port ({{env('DB_PORT')}})">
                          @error('port')
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
                          <input value="{{$db['database']}}" type="text" name="database" class="form-control form-control-user @error('database') is-invalid @enderror" id="database" aria-describedby="database" placeholder="Database name ({{env('DB_DATABASE')}})">
                            @error('database')
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
                          <input value="{{$db['user']}}" type="text" name="user" class="form-control form-control-user @error('user') is-invalid @enderror" id="user" aria-describedby="user" placeholder="Database user ({{env('DB_USERNAME')}})">
                            @error('user')
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
                          <input value="{{$db['password']}}" type="password" name="password" class="form-control form-control-user @error('password') is-invalid @enderror" id="password" aria-describedby="password" placeholder="Database password ({{env('DB_PASSWORD')}})">
                            @error('password')
                              <span class="invalid-feedback" role="alert">
                                  <strong>{{ $message }}</strong>
                              </span>
                            @enderror
                          </div>
                        </div>
                    </div>                     

                    {{-- <hr/> --}}
                    <div class="row">
                        <div class="col-md-6 text-center">
                            <a class="btn btn-light btn-block btn-user" href="{{url('/install/step/1')}}">Back</a>
                        </div>        
                        <div class="col-md-6 text-center">
                            <button class="btn btn-primary btn-block btn-user" type="submit">Next step</button>
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
              $('form').pushForm({
                  errors:{
                      spanClass: 'invalid-feedback',
                      fieldClass: 'validation-error'
                  },
                  redirect: '/install/step/3'
              });
          });        
  
      });
  
  </script>
  @stop  