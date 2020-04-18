@extends('admin.master')
@section('styles')
    <link href="{{asset('js/admin/vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
@stop
@section('content')
<!-- Page Heading -->
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">
        <i class="fas {{$module_icon}}"></i> {{$module_name}}
    </h1>
</div>

<div class="card shadow mb-4">
    <div class="card-body card-datatable">
      <div class="table-responsive">
        <table class="table " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th><input type="checkbox" name="select_element" value="1"/></th>
              <th>{{__('comments.title')}}</th>
              <th>{{__('comments.actions')}}</th>
            </tr>
          </thead>
          <tbody>
            @if(count($comments) > 0)
              @foreach($comments as $comment)
                <tr>
                  <td width="2%"><input type="checkbox" name="select_element" value="1"/></td>
                  <td>{{$comment->name}}</td>
                  <td></td>
                </tr>            
              @endforeach
            @else
              <tr>
                <td colspan="3" class="text-center">{{__('comments.unavailable')}}</td>
              </tr>            
            @endif
          </tbody>
        </table>
      </div>
    </div>
</div>
@stop
@section('scripts')
<script>
  $(document).ready(function() {
    $.pushScripts(
        ["{{asset('js/push-router/push-form.js')}}"]        
    ).done(function(){
      $(document).ready(function() {
        $('.push-form').pushForm({
          modal: 'deleteModal',
          redirect: '{{config("app.admin_prefix")}}/posts'
        });
      });
    });
  });
</script>
@stop
