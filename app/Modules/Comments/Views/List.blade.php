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
    <a href="{{ url(config('app.admin_prefix').'/post/create') }}" class="btn btn-primary"><i class="fas fa-plus"></i> {{__('comments.add')}}</a>
</div>

<div class="card shadow mb-4">
    <!-- <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary"></h6>
    </div> -->
    <div class="card-body card-datatable">
      <div class="table-responsive">
        <table class="table " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>{{__('comments.title')}}</th>
              <th>{{__('comments.actions')}}</th>
            </tr>
          </thead>
          <tbody>
            @foreach($comments as $comment)
              <tr>
                <td>{{$comment->name}}</td>
                <td></td>
              </tr>            
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
</div>

@stop
@section('scripts')
<script>
  // $.getScript("{{asset('js/push-router/push-router.config.js')}}", function() {
  //   $.pushConfig({
  //     usejQuery: true,
  //     dependencies:{              
  //       "jquery": "{{asset('js/admin/vendor/jquery/jquery.min')}}",
  //       "datatables.net": "{{asset('js/admin/vendor/datatables/jquery.dataTables.min')}}",
  //       "datatables": "{{asset('js/admin/vendor/datatables/dataTables.bootstrap4.min')}}",
  //     },
  //     code: function() {
  //       $(document).ready(function() {
  //           // console.log(document.getElementById('dataTable'));
  //             $('#dataTable').DataTable({
  //               "retrieve": true,
  //             });
  //       });
  //     }
  //   });
  // });
    $.when(
        $.getScript( "{{asset('js/admin/vendor/datatables/jquery.dataTables.min.js')}}" ),
        $.getScript( "{{asset('js/admin/vendor/datatables/dataTables.bootstrap4.min.js')}}" ),
        $.getScript( "{{asset('js/admin/vendor/bootstrap/js/bootstrap.bundle.min.js')}}" ),        
        $.getScript( "{{asset('js/push-router/push-form.js')}}" ),        
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    ).done(function(){
      $(document).ready(function() {
            // console.log(document.getElementById('dataTable'));
              $('#dataTable').DataTable({
                "retrieve": true,
                "bInfo" : false,
              });
              // $.getScript("{{asset('js/push-router/push-form.js')}}", function() {
                $('.push-form').pushForm({
                  modal: 'deleteModal',
                  redirect: '{{config("app.admin_prefix")}}/posts'
                });
              // });
      });
    });
</script>
@stop
