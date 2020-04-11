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
                <i class="fas fa-user"></i> {{ $title }}
            </h1>
        </div>
    </div>
</div>
<form action="{{url($user['form'])}}" id="user-form" enctype="multipart/form-data" method="post" class="push-form">
    <div class="row">
        {{ csrf_field() }}
        @if(isset($user['id']))
            <input type="hidden" value="{{$user['id']}}" name="id"/>
        @endif
        <div class="col-lg-8 col-md-8 col-sm-12">       
            <div class="card shadow mb-4">
                @php
                    if($pagemode == 'add') {
                        $placeholder = __('user.add_user_placeholder');
                    } else {
                        $placeholder = __('user.update_user_placeholder');                            
                    }
                @endphp
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{__('user.details')}}</h6>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="url">{{__('user.name')}}</label>
                        <input value="{{$user['name']}}" type="text" name="name" placeholder="{{$placeholder.' '.strtolower(__('user.name')) }}" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="url">{{__('user.email')}}</label>
                        <input value="{{$user['email']}}" type="text" name="email" placeholder="{{$placeholder.' '.strtolower(__('user.email')) }}" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="url">{{__('user.role')}}</label>
                        <select name="role" class="form-control">
                            @foreach($user['roles'] as $role)
                                @if($role->id == $user['role'])
                                    <option value="{{$role->id}}" selected>{{$role->rolename}}</option>
                                @else
                                    <option value="{{$role->id}}">{{$role->rolename}}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{__('user.security_details')}}</h6>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="username">{{__('user.username')}}</label>
                        <input value="{{$user['username']}}" type="text" name="username" placeholder="{{$placeholder.' '.strtolower(__('user.username')) }}" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="password">{{__('user.password')}}</label>
                        <input value="" type="password" name="password" placeholder="{{$placeholder.' '.strtolower(__('user.password')) }}" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="confirm_password">{{__('user.confirm_password')}}</label>
                        <input value="" type="password" name="password_confirmation" placeholder="{{__('user.password_confirmation')}}" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="status">{{__('user.status')}}</label>
                        <select class="form-control" name="status" id="status">
                            @if($user['status'] == 1)
                                <option value="1" selected>Active</option>                        
                                <option value="0">Inactive</option>
                            @else
                                <option value="1">Active</option>                        
                                <option value="0" selected>Inactive</option>
                            @endif
                        </select>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="form-group">
                        <button class="btn btn-primary btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-paper-plane"></i> 
                            </span>
                            @if($pagemode == 'add')
                                <span class="text">{{__('user.add_user')}}</span>
                            @else 
                                <span class="text">{{__('user.update_user')}}</span>
                            @endif
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">       
            <div class="card shadow mb-4">
                @php
                    if($pagemode == 'add') {
                        $placeholder = __('user.add_user_placeholder');
                    } else {
                        $placeholder = __('user.update_user_placeholder');                            
                    }
                @endphp
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{__('user.profile_picture')}}</h6>
                </div>
                <div class="card-body py-3">
                    <div class="form-group">                        
                        <div class="upload-btn-wrapper" onmouseover="showDeleteOverlay()">
                            <button class="btn-upload btn-primary">{{__('user.upload_btn_label')}}</button>
                            <input type="hidden" id="image_flag" name="image_flag" value = "0" />                            
                            <input id="image-file" onchange="readURL(this)" type="file" name="image" value="{{$user['image']}}"/>
                            @if(isset($user['image']) && $user['image'] != '' && file_exists(assets_path('storage/users/'.$user['image'])))
                                <img onmouseover="showDeleteOverlay()" class="upload-image" style="margin-top:5px" id="data-image" src="{{asset('/storage/users/'.$user['image'])}}"/>
                                <div id="image-placeholder" class="image-placeholder d-none" style="margin:5px auto">{!! __('posts.no_img_message') !!}</div>
                            @else
                                <div class="image-placeholder" style="margin:5px auto">{!! __('user.no_img_message') !!}</div>
                            @endif
                            <div onmouseout="hideDeleteOverlay()" id="image-overlay" class="image-overlay"><a onclick="removeImage()" class="rounded" href="javascript:;"><i class="fas fa-times"></i></a></div>                                
                        </div>
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
                errors:{
                    spanClass: 'invalid-feedback',
                    fieldClass: 'validation-error'
                },
                files: ['image'],
                redirect: '{{config("app.admin_prefix")}}/user/list'
            });
        });        

    });

</script>
@stop