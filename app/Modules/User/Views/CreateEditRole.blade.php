@extends('admin.master')
@section('content')
<!-- Page Heading -->
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">
                <i class="fas fa-user-edit"></i> {{ $title }}
            </h1>
        </div>
    </div>
</div>
<form action="{{url($role['form'])}}" id="role-form" enctype="multipart/form-data" method="post" class="push-form">
    <div class="row">
        {{ csrf_field() }}
        @if(isset($role['id']))
            <input type="hidden" value="{{$role['id']}}" name="id"/>
        @endif
        <div class="col-lg-12 col-md-12 col-sm-12">       
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{__('user.rolename')}}</h6>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        @php
                            if($pagemode == 'add') {
                                $placeholder = __('user.add_rolename_placeholder');
                            } else {
                                $placeholder = __('user.update_rolename_placeholder');                            
                            }
                        @endphp
                        <input value="{{$role['rolename']}}" type="text" name="rolename" placeholder="{{$placeholder}}" class="form-control"/>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="form-group">
                        <button class="btn btn-primary btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-paper-plane"></i> 
                            </span>
                            @if($pagemode == 'add')
                                <span class="text">{{__('user.add_role')}}</span>
                            @else 
                                <span class="text">{{__('user.update_role')}}</span>
                            @endif
                        </button>
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
                redirect: '{{config("app.admin_prefix")}}/user/roles'
            });
        });        

    });

</script>
@stop
