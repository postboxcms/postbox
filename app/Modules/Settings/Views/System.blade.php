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
                        <a class="nav-item nav-link active" id="nav-profile-tab-website" data-toggle="tab" href="#nav-website" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fas fa-globe"></i> {{__('settings.website_label')}}</a>
                        <a class="nav-item nav-link" id="nav-profile-tab-seo" data-toggle="tab" href="#nav-seo" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fas fa-rocket"></i> {{__('settings.seo_label')}}</a>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-website" role="tabpanel" aria-labelledby="nav-home-tab">
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
                                        <div class="upload-btn-wrapper" onmouseover="showDeleteOverlay()">                                            
                                            <button class="btn-upload btn-primary">{{__('settings.upload_site_btn_label')}}</button>
                                            <input type="hidden" id="image_flag" name="image_flag" value = "0" />
                                            <input id="image-file" onchange="readURL(this)" type="file" name="image" value="{{$site['image']}}"/>
                                            @if(isset($site['image']) && $site['image'] != '' && file_exists(assets_path('storage/settings/'.$site['image'])))
                                                <img onmouseover="showDeleteOverlay()" class="upload-image" style="margin-top:5px" id="data-image" src="{{asset('/storage/settings/'.$site['image'])}}"/>
                                                <div id="image-placeholder" class="image-placeholder d-none" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @else
                                                <div id="image-placeholder" class="image-placeholder" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @endif
                                            <div onmouseout="hideDeleteOverlay()" id="image-overlay" class="image-overlay"><a onclick="removeImage()" class="rounded" href="javascript:;"><i class="fas fa-times"></i></a></div>
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
                    </div>                       
                    <div class="tab-pane fade" id="nav-seo" role="tabpanel" aria-labelledby="nav-home-tab">
                        <form enctype="multipart/form-data" action="{{admin_url('/settings/seo/save')}}" method="post" class="seo-form">
                            {{ csrf_field() }}
                            <input type="hidden" value="seo" name="mode"/>

                            {{-- Twitter SEO tags --}}
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <input value="{{$seo['twitter_title']}}" class="form-control" type="text" placeholder="{{__('settings.seo_twitter_title')}}" name="twitter_title"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <input value="{{$seo['twitter_site']}}" class="form-control" type="text" placeholder="{{__('settings.seo_twitter_site')}}" name="twitter_site"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <textarea class="form-control" type="text" placeholder="{{__('settings.seo_twitter_description')}}" name="twitter_description">{{$seo['twitter_description']}}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">                        
                                        <div class="upload-btn-wrapper" onmouseover="showDeleteOverlay('twitter')">
                                            <button class="btn-upload btn-primary">{{__('settings.upload_seo_twitter_img_btn_label')}}</button>
                                            <input type="hidden" id="twitter_image_flag" name="twitter_image_flag" value = "0" />
                                            <input type="hidden" name="_prefix[0]" value="twitter_"/>
                                            <input id="twitter_image-file" onchange="readURL(this)" type="file" name="twitter_image" value="{{$seo['twitter_image']}}"/>
                                            @if(isset($seo['twitter_image']) && $seo['twitter_image'] != '' && file_exists(assets_path('storage/settings/'.$seo['twitter_image'])))
                                                <img class="upload-image" style="margin-top:5px" id="twitter_data-image" src="{{asset('/storage/settings/'.$seo['twitter_image'])}}"/>
                                                <div id="twitter_image-placeholder" class="image-placeholder d-none" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @else
                                                <div id="twitter_image-placeholder" class="image-placeholder" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @endif
                                            <div onmouseout="hideDeleteOverlay('twitter')" id="twitter_image-overlay" class="image-overlay"><a onclick="removeImage('twitter')" class="rounded" href="javascript:;"><i class="fas fa-times"></i></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {{-- Facebook SEO tags Open Graph --}}
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <input value="{{$seo['facebook_title']}}" class="form-control" type="text" placeholder="{{__('settings.seo_facebook_title')}}" name="facebook_title"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <input value="{{$seo['facebook_site']}}" class="form-control" type="text" placeholder="{{__('settings.seo_facebook_site')}}" name="facebook_site"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">
                                        <textarea class="form-control" type="text" placeholder="{{__('settings.seo_facebook_description')}}" name="facebook_description">{{$seo['facebook_description']}}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xs-12 col-lg-12">
                                    <div class="form-group">                        
                                        <div class="upload-btn-wrapper" onmouseover="showDeleteOverlay('facebook')">
                                            <button class="btn-upload btn-primary">{{__('settings.upload_seo_facebook_img_btn_label')}}</button>
                                            <input type="hidden" id="facebook_image_flag" name="facebook_image_flag" value = "0" />
                                            <input type="hidden" name="_prefix[1]" value="facebook_"/>
                                            <input id="facebook_image-file" onchange="readURL(this)" type="file" name="facebook_image" value="{{$seo['facebook_image']}}"/>
                                            @if(isset($seo['facebook_image']) && $seo['facebook_image'] != '' && file_exists(assets_path('storage/settings/'.$seo['facebook_image'])))
                                                <img class="upload-image" style="margin-top:5px" id="facebook_data-image" src="{{asset('/storage/settings/'.$seo['facebook_image'])}}"/>
                                                <div id="facebook_image-placeholder" class="image-placeholder d-none" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @else
                                                <div id="facebook_image-placeholder" class="image-placeholder" style="margin:5px auto">{!! __('settings.no_img_message') !!}</div>
                                            @endif
                                            <div onmouseout="hideDeleteOverlay('facebook')" id="facebook_image-overlay" class="image-overlay"><a onclick="removeImage('facebook')" class="rounded" href="javascript:;"><i class="fas fa-times"></i></a></div>
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
            $('.seo-form').pushForm({
                errors:{
                    spanClass: 'invalid-feedback',
                    fieldClass: 'validation-error'
                },
                files: ['twitter_image','facebook_image'],
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
