@extends('admin.master')

@section('content') 
<!-- Page Heading -->
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">
        <i class="fas {{$module_icon}}"></i> {{$module_name}}
    </h1>
</div>
<div class="row">
    @foreach($modules as $module)
        {{--  <a href="{{url($module['data']['module_url'])}}">  --}}
            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <a href="{{url(config('app.admin_prefix').'/'.$module['data']['module_name'])}}">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">{{ucfirst($module['data']['module_name'])}}</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{$module['count']}}</div>
                                </a>
                            </div>
                            <div class="col-auto">
                                <i class="{{$module['data']['module_icon']}} fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {{--  </a>  --}}
    @endforeach
</div>
@stop