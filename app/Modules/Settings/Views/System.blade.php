@extends('admin.master')

@section('content')
<!-- Page Heading -->
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">
        <i class="fas {{$icon}}"></i> {{$title}}
    </h1>
</div>
<div class="row">
    <div class="col-lg-8 col-md-8 col-sm-12">
        <div class="card shadow mb-4">
            <div class="card-body">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        {{-- <a class="nav-item nav-link active" id="nav-home-tab-app" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fas fa-tablet-alt"></i> {{__('settings.app_label')}}</a> --}}
                        <a class="nav-item nav-link active" id="nav-profile-tab-website" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fas fa-globe"></i> {{__('settings.website_label')}}</a>
                        <!-- <a class="nav-item nav-link" id="nav-profile-tab-user" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fas fa-user"></i> {{__('settings.user_label')}}</a> -->
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    {{-- <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <form enctype="multipart/form-data" action="{{admin_url('/settings/app/save')}}" method="post" class="app-form">
                            {{ csrf_field() }}
                            <input type="hidden" value="app" name="mode"/>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <input value="{{$app['name']}}" class="form-control" type="text" name="name" placeholder="{{__('settings.app_placeholder')}}" name="parameter"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-xs-12 col-lg-6">
                                    <div class="form-group">                        
                                        <div class="upload-btn-wrapper">
                                            <button class="btn-upload btn-primary">{{__('settings.upload_app_btn_label')}}</button>
                                            <input onchange="readURL(this)" type="file" name="image" value="{{$app['image']}}"/>
                                            @if(isset($app['image']) && $app['image'] != '' && file_exists(base_path('public/storage/settings/'.$app['image'])))
                                                <img width="90%" style="margin-top:5px" id="data-image" src="{{url('/storage/settings/'.$app['image'])}}"/>
                                            @else
                                                <div class="image-placeholder" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12 col-lg-6">
                                    <div class="form-group">                        
                                        <div class="upload-btn-wrapper">
                                            <button class="btn-upload btn-primary">{{__('settings.upload_app_btn_full_label')}}</button>
                                            <input onchange="readURL(this)" type="file" name="image_full" value="{{$app['image_full']}}"/>
                                            @if(isset($app['image_full']) && $app['image_full'] != '' && file_exists(base_path('public/storage/settings/'.$app['image_full'])))
                                                <img width="90%" style="margin-top:5px" id="data-image" src="{{url('/storage/settings/'.$app['image_full'])}}"/>
                                            @else
                                                <div class="image-placeholder" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">                            
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <button class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-paper-plane"></i> 
                                            </span>
                                            <span class="text">{{__('settings.button_save')}}</span>                    
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div> --}}
                    <div class="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-home-tab">
                        <form enctype="multipart/form-data" action="{{admin_url('/settings/site/save')}}" method="post" class="site-form">
                            {{ csrf_field() }}
                            <input type="hidden" value="site" name="mode"/>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <input value="{{$site['name']}}" class="form-control" type="text" placeholder="{{__('settings.site_placeholder')}}" name="name"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <textarea class="form-control" placeholder="{{__('settings.site_description')}}" name="description">{{$site['description']}}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <input value="{{$site['keywords']}}" class="form-control" type="text" placeholder="{{__('settings.site_keywords')}}" name="keywords"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">                        
                                        <div class="upload-btn-wrapper">
                                            {{-- <button class="btn-upload btn-primary">{{__('settings.upload_site_btn_label')}}</button>
                                            <input onchange="readURL(this)" type="file" name="image" value="{{$site['image']}}"/>
                                            @if(isset($site['image']) && $site['image'] != '' && file_exists(assets_path('storage/settings/'.$site['image'])))
                                                <img width="90%" style="margin-top:5px" id="data-image" src="{{asset('/storage/settings/'.$site['image'])}}"/>
                                            @else
                                                <div class="image-placeholder" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @endif --}}
                                            <button class="btn-upload btn-primary">{{__('settings.upload_site_btn_label')}}</button>
                                            <input type="hidden" id="image_flag" name="image_flag" value = "0" />
                                            <input id="image-file" onchange="readURL(this)" type="file" name="image" value="{{$site['image']}}"/>
                                            @if(isset($site['image']) && $site['image'] != '' && file_exists(assets_path('storage/settings/'.$site['image'])))
                                                <img onmouseover="showDeleteOverlay()" width="200px" style="margin-top:5px" id="data-image" src="{{asset('/storage/settings/'.$site['image'])}}"/>
                                                <div id="image-placeholder" class="image-placeholder d-none" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @else
                                                <div id="image-placeholder" class="image-placeholder" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @endif
                                            <div onmouseout="hideDeleteOverlay()" id="image-overlay"><a onclick="removeImage()" class="rounded" href="javascript:;"><i class="fas fa-times"></i></a></div>
                                        </div>
                                    </div>
                                </div>
                                {{-- <div class="col-md-6 col-xs-12 col-lg-6 hide">
                                    <div class="form-group">                        
                                        <div class="upload-btn-wrapper">
                                            {{-- <button class="btn-upload btn-primary">{{__('settings.upload_site_btn_full_label')}}</button>
                                            <input onchange="readURL(this)" type="file" name="image_full" value="{{$site['image_full']}}"/>
                                            @if(isset($site['image_full']) && $site['image_full'] != '' && file_exists(assets_path('storage/settings/'.$site['image_full'])))
                                                <img width="90%" style="margin-top:5px" id="data-image" src="{{asset('/storage/settings/'.$site['image_full'])}}"/>
                                            @else
                                                <div class="image-placeholder" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @endif --}}
                                            {{-- <button class="btn-upload btn-primary">{{__('settings.upload_site_btn_full_label')}}</button>
                                            <input type="hidden" id="image_flag" name="image_flag" value = "0" />
                                            <input id="image-file" onchange="readURL(this)" type="file" name="image_full" value="{{$site['image_full']}}"/>
                                            @if(isset($site['image_full']) && $site['image_full'] != '' && file_exists(assets_path('storage/settings/'.$site['image_full'])))
                                                <img onmouseover="showDeleteOverlay()" width="200px" style="margin-top:5px" id="data-image" src="{{asset('/storage/settings/'.$site['image_full'])}}"/>
                                                <div id="image-placeholder" class="image-placeholder d-none" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @else
                                                <div id="image-placeholder" class="image-placeholder" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @endif
                                            <div onmouseout="hideDeleteOverlay()" id="image-overlay"><a onclick="removeImage()" class="rounded" href="javascript:;"><i class="fas fa-times"></i></a></div>
                                        </div>
                                    </div>
                                </div> --}}
                            </div>
                            <div class="row">                            
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <button class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-paper-plane"></i> 
                                            </span>
                                            <span class="text">{{__('settings.button_save')}}</span>                    
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>                       
                </div>
            </div>
        </div>
    </div>
</div>
@stop
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
            $('.app-form').pushForm({
                errors:{
                    spanClass: 'invalid-feedback',
                    fieldClass: 'validation-error'
                },
                files: ['image'],
                // redirect: 'settings/system'
            });
            $('.site-form').pushForm({
                errors:{
                    spanClass: 'invalid-feedback',
                    fieldClass: 'validation-error'
                },
                files: ['image'],
                // redirect: 'settings/system'
            });
        });        

    });

</script>
@stop
