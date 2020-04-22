<div class="container-fluid px-0" style="background:#eee">
    @if($image == '')
        {{-- <div class="text-center h1 image-header">
            <i class="fas fa-image"></i>
        </div> --}}
    @else
        <div class="post-header" style="background:url('{{asset('storage/posts/'.$image)}}')"></div>        
    @endif
</div>

<div class="container py-4">
    <div class="row justify-content-left">          
        <div class="col-md-8 col-sm-12 col-xs-12">    
            <h1 class="h1 mb-3 text-gray-800 brand-color">
                {{$title}}
            </h1>
            <div class="post-timeline">
                Posted by {{ $author }} on {{ $created_at }} under {{ $category }}
            </div>
        </div>
    </div>
    <div class="row justify-content-left">          
        <div class="col-md-8 col-sm-12 col-xs-12">    
            {!! $content !!}
        </div>
    </div>
</div>