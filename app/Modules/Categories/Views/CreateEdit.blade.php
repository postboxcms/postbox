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
                <i class="fas fa-layer-group"></i> {{ $title }}
            </h1>
        </div>
    </div>
</div>
<form action="{{url($category['form'])}}" id="category-form" enctype="multipart/form-data" method="post" class="push-form">
    <div class="row">
        {{ csrf_field() }}
        @if(isset($category['id']))
            <input type="hidden" value="{{$category['id']}}" name="id"/>
        @endif
        <div class="col-lg-8 col-md-8 col-sm-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">{{__('categories.create_details')}}</h6>
                </div>
                <div class="card-body row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <input placeholder="{{__('categories.create_name_placeholder')}}" class="form-control" type="text" value="{{$category['name']}}" name="name"/>
                            <input type="hidden" id="url" value="{{$category['url']}}" name="url"/>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <select class="form-control" name="parent">
                                <option value="">{{__('categories.select')}}</option>
                                @foreach($categories as $list)
                                    @if(isset($list->id) && $list->id == $category['parent'])
                                        <option value="{{$list->id}}" selected>{{$list->name}}</option>
                                    @else
                                        <option value="{{$list->id}}">{{$list->name}}</option>
                                    @endif
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>    
                <div class="card-footer">
                    <div class="form-group">
                        <button class="btn btn-primary btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-paper-plane"></i> 
                            </span>
                            @if($pagemode == 'add')
                                <span class="text">{{__('categories.add')}}</span>
                            @else 
                                <span class="text">{{__('categories.update')}}</span>
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
                redirect: '{{config("app.admin_prefix")}}/categories'
            });
        });        

    });

</script>
@stop
