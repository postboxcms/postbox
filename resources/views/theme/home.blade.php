@extends('theme.master')

@section('content')
<div class="container py-4">
    <div class="row justify-content-left">
          
        <div class="col-md-8">
            {!! Widget::render('posts') !!}
        </div>
        {{--  Theme::widget('categories_list')  --}}
        <div class="col-md-4">
            {!! Widget::render('categories') !!}
            {!! Widget::render('copyright') !!} 
        </div>
    </div>
</div>
@endsection
