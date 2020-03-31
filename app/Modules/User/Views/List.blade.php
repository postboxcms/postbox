@extends('admin.master')
@section('styles')
    <link href="{{asset('js/admin/vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">
@stop
@section('content')
<!-- Page Heading -->
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">
        <i class="fas {{$module_icon}}"></i> {{$title}}
    </h1>
    <a href="{{ url(config('app.admin_prefix').'/user/create') }}" class="btn btn-primary"><i class="fas fa-plus"></i> {{__('user.add')}}</a>
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
              <th><input type="checkbox" value=""/></th>
              <th>{{__('user.username')}}</th>              
              <th>{{__('user.email')}}</th>
              <th>{{__('user.name')}}</th>              
              <th>{{__('user.role')}}</th>
              <th>{{__('user.created_at')}}</th>              
              <th>{{__('user.actions')}}</th>
            </tr>
          </thead>
          <tbody>
            @foreach($users as $user)
              <tr>            
                <td><input type="checkbox" value=""/></td>
                <td>{{$user->username}}</td>
                <td>{{$user->email}}</td>              
                <td>{{$user->name}}</td>
                <td>{{$user->roles[0]->rolename}}</td>
                <td>{{date('d M, Y',strtotime($user->created_at))}}</td>
                <td>
                  <a href="{{url(config('app.admin_prefix').'/user/edit/'.$user->id)}}" class="btn btn-primary"><i class="fas fa-edit"></i> Edit</a>
                  <a onclick="javascript:document.getElementById('userId').value = {{$user->id}};" href="#" data-toggle="modal" data-target="#deleteModal" class="btn btn-danger"><i class="fas fa-trash"></i> Delete</a>
                </td>
              </tr>              
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
</div>
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{__('user.delete_user_confirm')}}</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">{{__('user.delete_user_confirm_message')}}</div>
        <div class="modal-footer">
          <form class="push-form" id="delete-form" action="{{ url(config('app.admin_prefix').'/user/delete/') }}"  method="POST">          
            @csrf          
            <input type="hidden" name="id" id="userId" value=""/>
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-danger">
              <i class="fas fa-trash"></i> Delete
            </button>
          </form>
        </div>
      </div>
    </div>
</div>
@stop
@section('scripts')
<script>
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
              $('.push-form').pushForm({
                modal: 'deleteModal',
                redirect: '{{config("app.admin_prefix")}}/user/list'
              });
      });
    });
</script>
@stop
