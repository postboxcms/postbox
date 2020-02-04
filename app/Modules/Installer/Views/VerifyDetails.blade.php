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
                    <h1 class="h4 install-heading text-gray-900 mb-5">
                        <span class="btn btn-success btn-circle"><i class="fas fa-check"></i></span> Verify details                        
                    </h1>
                  </div>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="75"
                    aria-valuemin="0" aria-valuemax="100" style="width:75%">
                      <span class="sr-only">70% Complete</span>
                    </div>
                  </div>

                  <div class="user health-check">                    
                    <div class="row mb-4">
                        <div class="col-md-6 col-sm-12 col-xs-12 col-xl-6 col-lg-12">
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>
                                </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3><b>{{__('installer.app_name')}}:</b> <br/> {{env('APP_NAME')}}</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>                                    </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3><b>{{__('installer.app_description')}}:</b> <br/>{{env('APP_DESCRIPTION')}}</b></h3>
                                </div>
                            </div>                                        
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>                                    </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3><b>{{__('installer.app_keywords')}}:</b> <br/>{{env('APP_TAGS')}}</b></h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12 col-xl-6 col-lg-12">
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>                                    </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3><b>{{__('installer.db_conn')}}:</b> <br/>{{env('DB_CONNECTION')}}</b></h3>
                                </div>
                            </div>                                    
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>                                    </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3><b>{{__('installer.db_host')}}:</b> <br/>{{env('DB_HOST')}}</b></h3>
                                </div>
                            </div>                                    
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>                                    </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3><b>{{__('installer.db_port')}}:</b> <br/>{{env('DB_PORT')}}</b></h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>                                    </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3><b>{{__('installer.db_database')}}:</b> <br/>{{env('DB_DATABASE')}}</b></h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>                                    </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3><b>{{__('installer.db_username')}}:</b> <br/>{{env('DB_USERNAME')}}</b></h3>
                                </div>
                            </div>                                            
                            <div class="row">
                                <div class="col-md-2 col-sm-2 col-xs-2">
                                    <span class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></span>                                    </div>
                                <div class="col-md-10 col-sm-10 col-xs-10 text-left">
                                    <h3><b>{{__('installer.db_password')}}:</b> <br/>{{str_repeat('*',strlen(env('DB_PASSWORD')))}}</b></h3>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 text-center">
                            <a class="btn btn-light btn-block btn-user" href="{{url('/install/step/2')}}">Back</a>
                        </div>        
                        <div class="col-md-6 text-center">
                            <a class="btn btn-primary btn-block btn-user" href="{{url('/install/step/4')}}">Next step</a>
                        </div>        
                    </div>                                               
                  </div>
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
                  redirect: '/install/step/4'
              });
          });        
  
      });
  
  </script>
  @stop  