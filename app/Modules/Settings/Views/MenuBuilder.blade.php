@extends('admin.master')

@section('content')
<!-- Page Heading -->
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">
        <i class="fas {{$icon}}"></i> {{$title}}
    </h1>
</div>
<div class="row">
    {!! Menu::render() !!}
</div>
<!-- Menu Scripts -->
@push('scripts')
    {!! Menu::scripts() !!}
@endpush
@stop
