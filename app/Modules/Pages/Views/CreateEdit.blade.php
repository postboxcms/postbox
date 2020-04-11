@extends('admin.master')
@section('styles')
    <link href="{{asset('js/admin/vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
@stop
@section('content')
<!-- Page Heading -->
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">
                <i class="fas fa-envelope-open"></i> {{ $title }}
            </h1>
        </div>
    </div>
</div>

<form action="{{url($page['form'])}}" id="page-form" enctype="multipart/form-data" method="post" class="push-form">
    <div class="row">
            {{ csrf_field() }}
            @if(isset($page['id']))
                <input type="hidden" value="{{$page['id']}}" name="id"/>
            @endif
            <div class="col-lg-8 col-md-8 col-sm-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{__('pages.create_title')}}</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <input placeholder="{{__('pages.create_title_placeholder')}}" class="form-control" type="text" value="{{$page['title']}}" name="title"/>
                        </div>
                    </div>
                </div>
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{__('pages.create_content')}}</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <textarea name="content" rows="10" class="form-control editor">{{$page['content']}}</textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">        
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">{{__('pages.page_actions')}}</h6>
                    </div>
                    <div class="card-body text-center">
                            <select name="status" class="form-control">
                                <option value="1" {{$page['status'] == 1?'selected':''}}>Draft</option>
                                <option value="2" {{$page['status'] == 2?'selected':''}}>Publish</option>
                                <option value="3" {{$page['status'] == 3?'selected':''}}>Delete</option>
                            </select>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-paper-plane"></i> 
                            </span>
                            <span class="text">{{__('pages.save')}}</span>
                        </button>
                    </div>
                </div>
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{__('pages.details')}}</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="url">{{__('pages.create_url')}}</label>
                            <input value="{{$page['url']}}" id="url" placeholder="{{__('pages.create_url_placeholder')}}" class="form-control" type="text" value="" name="url"/>
                        </div>
                    </div>
                </div>        
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">{{__('pages.create_image')}}</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-group">                        
                            <div class="upload-btn-wrapper"  onmouseover="showDeleteOverlay()">
                                <button class="btn-upload btn-primary">{{__('pages.upload_btn_label')}}</button>
                                <input type="hidden" id="image_flag" name="image_flag" value = "0" />
                                <input id="image-file" onchange="readURL(this)" type="file" name="image" value="{{$page['image']}}"/>
                                @if(isset($page['image']) && $page['image'] != '' && file_exists(assets_path('storage/pages/'.$page['image'])))
                                    <img onmouseover="showDeleteOverlay()" class="upload-image" style="margin-top:5px" id="data-image" src="{{asset('/storage/pages/'.$page['image'])}}"/>
                                    <div id="image-placeholder" class="image-placeholder d-none" style="margin:5px auto">{!! __('posts.no_img_message') !!}</div>
                                @else
                                    <div id="image-placeholder" class="image-placeholder" style="margin:5px auto">{!! __('pages.no_img_message') !!}</div>
                                @endif
                                <div onmouseout="hideDeleteOverlay()" id="image-overlay" class="image-overlay"><a onclick="removeImage()" class="rounded" href="javascript:;"><i class="fas fa-times"></i></a></div>                                
                            </div>
                        </div>
                    </div>
                </div>        
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{__('pages.create_seo')}}</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="meta_description">Meta description</label>
                            <textarea placeholder="{{__('pages.create_seo_meta_desc')}}" class="form-control" type="text" value="" id="meta_description" name="meta_description">{{$page['meta_description']}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="meta_keywords">Meta keywords</label>
                            <textarea placeholder="{{__('pages.create_seo_meta_keywords')}}" class="form-control" type="text" id="meta_keywords" value="" name="meta_keywords">{{$page['meta_keywords']}}</textarea>
                        </div>
                    </div>
                </div>                
            </div>
    </div>
</form>
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
            $('.push-form').pushForm({
                editor:'.editor',
                files: ['image'],
                errors:{
                    spanClass: 'invalid-feedback',
                    fieldClass: 'validation-error'
                },
                redirect: '{{config("app.admin_prefix")}}/pages'
            });
        });        

    });

</script>
@stop
