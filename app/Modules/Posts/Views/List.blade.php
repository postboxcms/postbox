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
    @if($pagemode == 'edit')
      <a href="{{ url(config('app.admin_prefix').'/post/create') }}" class="btn btn-primary"><i class="fas fa-plus"></i> {{__('posts.add')}}</a>
    @endif
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
              <th width="5%">
                <input type="checkbox" name="select_element" value="1"/>
              </th>
              <th width="25%">{{__('posts.title')}}</th>
              <th>{{__('posts.image')}}</th>
              <th>{{__('posts.status')}}</th>
              @if($pagemode == 'trash')
                <th>{{__('posts.deleted')}}</th>
              @elseif($pagemode == 'edit')
                <th>{{__('posts.created')}}</th>
                <th>{{__('posts.updated')}}</th>
              @endif
              <!-- <th>{{__('posts.actions')}}</th> -->
            </tr>
          </thead>
          <tbody>
            @foreach($posts as $post)
              <tr class="feed-row">
                <td>
                  <input type="checkbox" name="select_element" value="1"/>
                </td>
                <td>
                  {{$post->title}}
                  <div class="clear hidden-popup">
                    @if($pagemode == 'trash')
                      <a onclick="javascript:document.getElementById('restoreId').value = {{$post->id}};" data-toggle="modal" data-target="#restoreModal" href="#" class=""><i class="fas fa-undo-alt"></i> {{ __('posts.restore_label') }}</a>
                      <a onclick="javascript:document.getElementById('postDelId').value = {{$post->id}};" href="#" data-toggle="modal" data-target="#deletePermModal" class=""><i class="fas fa-trash"></i> {{ __('posts.delete_permanently_label') }}</a>
                    @elseif($pagemode == 'edit')
                      <a href="{{url(config('app.admin_prefix').'/post/edit/'.$post->id)}}" class=""><i class="fas fa-edit"></i> {{ __('posts.edit_label') }}</a> | 
                      <a onclick="javascript:document.getElementById('postId').value = {{$post->id}};" href="#" data-toggle="modal" data-target="#deleteModal" class=""><i class="fas fa-trash"></i> {{ __('posts.delete_label') }}</a>
                    @endif
                  </div>
                </td>
                <td class="">
                  @if($post->image !== null && file_exists(assets_path('storage/posts/'.$post->image)))
                    <div class="image-placeholder"><img src="{{asset('storage/posts/'.$post->image)}}" width="100px"/></div>
                  @else
                    <div class="image-placeholder">{!! __('posts.no_img_message') !!}</div>
                  @endif
                </td>
                <td class="">
                  @if($post->status == 1)
                    <label class="status-label draft">{{ __('posts.draft_label')}}</label>
                  @elseif($post->status == 2)
                    <label class="status-label published">{{ __('posts.published_label')}}</label>
                  @elseif($post->status == 3)
                    <label class="status-label trash">{{ __('posts.deleted_label')}}</label>
                  @endif
                </td>
                @if($pagemode == 'trash')
                  <td class="">{{$post->deleted_at}}</td>
                @elseif($pagemode == 'edit')
                  <td class="">{{$post->created_at}}</td>
                  <td class="">{{$post->updated_at}}</td>
                @endif
                <!-- <td class="text-center">
                  @if($pagemode == 'trash')
                    <a onclick="javascript:document.getElementById('restoreId').value = {{$post->id}};" data-toggle="modal" data-target="#restoreModal" href="#" class="btn btn-success"><i class="fas fa-undo-alt"></i> Restore</a>
                    <a onclick="javascript:document.getElementById('postDelId').value = {{$post->id}};" href="#" data-toggle="modal" data-target="#deletePermModal" class="btn btn-danger"><i class="fas fa-trash"></i> Delete Permanently</a>
                  @elseif($pagemode == 'edit')
                    <a href="{{url('/post/edit/'.$post->id)}}" class="btn btn-primary"><i class="fas fa-edit"></i> Edit</a>
                    <a onclick="javascript:document.getElementById('postId').value = {{$post->id}};" href="#" data-toggle="modal" data-target="#deleteModal" class="btn btn-danger"><i class="fas fa-trash"></i> Delete</a>
                  @endif
                </td> -->
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
          <h5 class="modal-title" id="exampleModalLabel">{{__('posts.delete_post_confirm')}}</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">{{__('posts.delete_post_confirm_message')}}</div>
        <div class="modal-footer">
          <form class="push-form" id="delete-form" action="{{ url(config('app.admin_prefix').'/post/delete/') }}"  method="POST">          
            @csrf          
            <input type="hidden" name="id" id="postId" value=""/>
            <input type="hidden" name="status" id="postStatus" value="3"/>
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-danger">
              <i class="fas fa-trash"></i> Delete
            </button>
          </form>
        </div>
      </div>
    </div>
</div>
<div class="modal fade" id="restoreModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{__('posts.restore_post_confirm')}}</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">{{__('posts.restore_post_confirm_message')}}</div>
        <div class="modal-footer">
          <form class="push-form" id="restore-form" action="{{ url(config('app.admin_prefix').'/post/restore/') }}"  method="POST">          
            @csrf          
            <input type="hidden" name="id" id="restoreId" value=""/>
            <input type="hidden" name="status" id="postStatus" value="1"/>
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-success">
              <i class="fas fa-undo-alt"></i> Restore
            </button>
          </form>
        </div>
      </div>
    </div>
</div>
<div class="modal fade" id="deletePermModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{__('posts.delete_post_confirm')}}</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">{{__('posts.delete_post_confirm_message')}}</div>
        <div class="modal-footer">
          <form class="push-form" id="delete-perm-form" action="{{ url(config('app.admin_prefix').'/post/remove/') }}"  method="POST">          
            @csrf          
            <input type="hidden" name="id" id="postDelId" value=""/>
            <!-- <input type="hidden" name="status" id="postStatus" value="3"/> -->
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
  // $.getScript("{{asset('js/push-router/push-router.config.js')}}", function() {
  //   $.pushConfig({
  //     usejQuery: true,
  //     dependencies:{
  //       "jquery": "{{asset('js/admin/vendor/jquery/jquery.min')}}",
  //       "datatables.net": "{{asset('js/admin/vendor/datatables/jquery.dataTables.min')}}",
  //       "datatables": "{{asset('js/admin/vendor/datatables/dataTables.bootstrap4.min')}}",
  //       "bootstrap": "{{asset('js/admin/vendor/bootstrap/js/bootstrap.bundle.min')}}"
  //     },
  //     code: function() {
  //       $(document).ready(function() {
  //           // console.log(document.getElementById('dataTable'));
  //             $('#dataTable').DataTable({
  //               "retrieve": true,
  //             });
  //             $.getScript("{{asset('js/push-router/push-form.js')}}", function() {
  //               $('.push-form').pushForm({
  //                 modal: 'deleteModal',
  //                 redirect: 'posts'
  //               });
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
