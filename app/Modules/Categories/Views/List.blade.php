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
    <a href="{{ url(config('app.admin_prefix').'/category/create') }}" class="btn btn-primary"><i class="fas fa-plus"></i> {{__('categories.add')}}</a>
</div>

<div class="card shadow mb-4">
    <div class="card-body card-datatable">
      <div class="table-responsive">
        <table class="table " id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th><input type="checkbox" name="select_element" value="1"/></th>
              <th>{{__('categories.title')}}</th>
              <th>{{__('categories.parent')}}</th>
              <th>{{__('categories.actions')}}</th>
            </tr>
          </thead>
          <tbody>
            @if(count($categories) > 0)
              @foreach($categories as $category)
                <tr>
                  <td width="5%"><input type="checkbox" name="select_element" value="1"/></td>
                  <td>{{$category->name}}</td>
                  <td>{{$category->parent}}</td>
                  <td width="10%">
                    <a href="{{url(config('app.admin_prefix').'/category/edit/'.$category->id)}}" class="btn btn-primary"><i class="fas fa-edit"></i></a>
                    <a onclick="javascript:document.getElementById('categoryId').value = {{$category->id}};" href="#" data-toggle="modal" data-target="#deleteModal" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                  </td>
                </tr>            
              @endforeach
            @else
              <tr>
                <td colspan="3" class="text-center">{{__('categories.unavailable')}}</td>
              </tr>
            @endif
          </tbody>
        </table>
      </div>
    </div>
</div>
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{__('categories.delete_category_confirm')}}</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">{{__('categories.delete_category_confirm_message')}}</div>
        <div class="modal-footer">
          <form class="push-form" id="delete-form" action="{{ url(config('app.admin_prefix').'/category/delete/') }}"  method="POST">          
            @csrf          
            <input type="hidden" name="id" id="categoryId" value=""/>
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
  $(document).ready(function() {
    $.pushScripts(
        ["{{asset('js/push-router/push-form.js')}}"]        
    ).done(function(){
      $(document).ready(function() {
        $('.push-form').pushForm({
          modal: 'deleteModal',
          redirect: '{{config("app.admin_prefix")}}/categories'
        });
      });
    })
  });
</script>
@stop
