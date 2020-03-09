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
                        <span class="btn btn-primary btn-circle"><i class="fas fa-sync-alt"></i></span> <span class="title">Installing {{env('APP_NAME')}}...</span>                        
                    </h1>
                  </div>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="50"
                    aria-valuemin="0" aria-valuemax="100" style="width:100%">
                      <span class="sr-only">70% Complete</span>
                    </div>
                  </div>

                  <div class="user health-check">                    
                    <div class="row mb-4">
                        <div class="col-md-12 col-sm-12 col-xs-12 col-xl-12 col-lg-12">
                            <div class="row migrations">
                                <div class="col-md-1 col-sm-2 col-xs-2">
                                    <span class="btn btn-primary btn-circle btn-sm"><i class="fas fa-circle-notch"></i></span>
                                </div>
                                <div class="col-md-11 col-sm-10 col-xs-10 text-left">
                                    <h3>{{__('installer.app_install_run_migrations')}}</h3>
                                </div>
                            </div>
                            <div class="row storage">
                                <div class="col-md-1 col-sm-2 col-xs-2">
                                    <span class="btn btn-primary btn-circle btn-sm"><i class="fas fa-circle-notch"></i></span>
                                </div>
                                <div class="col-md-11 col-sm-10 col-xs-10 text-left">
                                    <h3>{{__('installer.app_install_update_storage_link')}}</h3>
                                </div>
                            </div>        
                            <div class="row environment">
                                <div class="col-md-1 col-sm-2 col-xs-2">
                                    <span class="btn btn-primary btn-circle btn-sm"><i class="fas fa-circle-notch"></i></span>
                                </div>
                                <div class="col-md-11 col-sm-10 col-xs-10 text-left">
                                    <h3>{{__('installer.app_install_update_env')}}</h3>
                                </div>
                            </div>        
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8 text-center">                        
                        </div>        
                        <div class="col-md-4 text-center">
                            <a class="btn btn-light btn-block btn-user" href="#"><i class="fas fa-sync-alt"></i> <span>Loading</span></a>
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
              $.ajax({
                url: $.baseUrl('/install/run/migrations'),
                type: 'post',
                cache: false,
                headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
                success: function(response) {
                    if(response.flag == 1) {
                        $('.migrations span').removeClass('btn-primary');
                        $('.migrations span > i').removeClass('fa-circle-notch');
                        $('.migrations span').addClass('btn-success');                        
                        $('.migrations span > i').addClass('fa-check');
                        $('.migrations div > h3').text("{{__('installer.app_install_run_migrations_success')}}");
                        $.ajax({
                            url: $.baseUrl('/install/update/storage'),
                            type: 'post',
                            cache: false,
                            headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
                            success: function(response) {
                                if(response.flag == 1) {
                                    $('.storage span').removeClass('btn-primary');
                                    $('.storage span > i').removeClass('fa-circle-notch');
                                    $('.storage span').addClass('btn-success');                        
                                    $('.storage span > i').addClass('fa-check');
                                    $('.storage div > h3').text("{{__('installer.app_install_update_storage_link_success')}}");
                                    $.ajax({
                                        url: $.baseUrl('/install/update/environment'),
                                        type: 'post',
                                        cache: false,
                                        headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
                                        success: function(response) {
                                            if(response.flag == 1) {
                                                    $('.environment span').removeClass('btn-primary');
                                                    $('.environment span > i').removeClass('fa-circle-notch');
                                                    $('.environment span').addClass('btn-success');                        
                                                    $('.environment span > i').addClass('fa-check');
                                                    $('.environment div > h3').text("{{__('installer.app_install_update_env_success')}}");
                                                    $('.install-heading span.btn').removeClass('btn-primary');
                                                    $('.install-heading span.btn > i').removeClass('fa-sync-alt');
                                                    $('.install-heading span.btn').addClass('btn-success');
                                                    $('.install-heading span.btn > i').addClass('fa-check');
                                                    $('.install-heading span.title').html("{{__('installer.app_install_success') }}");
                                                    $('.btn-user').removeClass('btn-light');
                                                    $('.btn-user').addClass('btn-primary');
                                                    $('.btn-user > i').removeClass('fa-sync-alt');
                                                    $('.btn-user > i').addClass('fa-flag');
                                                    $('.btn-user > span').text('Finish');   
                                                    $('.btn-user').attr('href','javascript:location.reload();');                                      
                                            } else {
                                                $('.environment span').removeClass('btn-primary');
                                                $('.environment span > i').removeClass('fa-circle-notch');
                                                $('.environment span').addClass('btn-danger');                        
                                                $('.environment span > i').addClass('fa-times');
                                                $('.environment div > h3').text("{!!__('installer.app_install_update_env_failed')!!}");
                                                $('.environment span').removeClass('btn-primary');
                                                $('.install-heading span.btn').removeClass('btn-primary');
                                                $('.install-heading span.btn > i').removeClass('fa-sync-alt');
                                                $('.install-heading span.btn').addClass('btn-danger');
                                                $('.install-heading span.btn > i').addClass('fa-times');
                                                $('.install-heading span.title').html("{{__('installer.app_install_failed') }}");
                                                $('.btn-user').removeClass('btn-light');
                                                $('.btn-user').addClass('btn-primary');
                                                $('.btn-user > i').removeClass('fa-sync-alt');
                                                $('.btn-user > i').addClass('fa-redo-alt');
                                                $('.btn-user > span').text('Refresh'); 
                                                $('.btn-user').attr('href','javascript:location.reload();');                                   
                                            }
                                        }
                                    });
                                } else {
                                    $('.storage span').removeClass('btn-primary');
                                    $('.storage span > i').removeClass('fa-circle-notch');
                                    $('.storage span').addClass('btn-danger');                        
                                    $('.storage span > i').addClass('fa-times');
                                    $('.storage div > h3').text("{{__('installer.app_install_update_storage_link_failed')}}");
                                    $('.environment span').removeClass('btn-primary');
                                    $('.environment span > i').removeClass('fa-circle-notch');
                                    $('.environment span').addClass('btn-danger');                        
                                    $('.environment span > i').addClass('fa-times');
                                    $('.environment div > h3').text("{{__('installer.app_install_update_env_failed')}}");
                                    $('.environment span').removeClass('btn-primary');
                                    $('.install-heading span.btn').removeClass('btn-primary');
                                    $('.install-heading span.btn > i').removeClass('fa-sync-alt');
                                    $('.install-heading span.btn').addClass('btn-danger');
                                    $('.install-heading span.btn > i').addClass('fa-times');
                                    $('.install-heading span.title').html("{{__('installer.app_install_failed') }}");
                                    $('.btn-user').removeClass('btn-light');
                                    $('.btn-user').addClass('btn-primary');
                                    $('.btn-user > i').removeClass('fa-sync-alt');
                                    $('.btn-user > i').addClass('fa-redo-alt');
                                    $('.btn-user > span').text('Refresh'); 
                                    $('.btn-user').attr('href','javascript:location.reload();');                                   
                                }
                            }
                        });

                    } else {
                        $('.migrations span').removeClass('btn-primary');
                        $('.migrations span > i').removeClass('fa-circle-notch');
                        $('.migrations span').addClass('btn-danger');                        
                        $('.migrations span > i').addClass('fa-times');
                        $('.migrations div > h3').text("{{__('installer.app_install_run_migrations_failed')}}");
                        $('.storage span').removeClass('btn-primary');
                        $('.storage span > i').removeClass('fa-circle-notch');
                        $('.storage span').addClass('btn-danger');                        
                        $('.storage span > i').addClass('fa-times');
                        $('.storage div > h3').text("{{__('installer.app_install_update_env_failed')}}");
                        $('.install-heading span.btn').removeClass('btn-primary');
                        $('.install-heading span.btn > i').removeClass('fa-sync-alt');
                        $('.install-heading span.btn').addClass('btn-danger');
                        $('.install-heading span.btn > i').addClass('fa-times');
                        $('.install-heading span.title').html("{{__('installer.app_install_failed') }}");
                        $('.btn-user').removeClass('btn-light');
                        $('.btn-user').addClass('btn-primary');
                        $('.btn-user > i').removeClass('fa-sync-alt');
                        $('.btn-user > i').addClass('fa-redo-alt');
                        $('.btn-user > span').text('Refresh'); 
                        $('.btn-user').attr('href','javascript:location.reload();');                                   
                    }
                }
              })
          });
      });
  
  </script>
  @stop  