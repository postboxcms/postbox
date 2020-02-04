<div class="container py-4">
    <div class="row justify-content-left">          
        <div class="col-md-8 col-sm-12 col-xs-12">    
            <h1 class="h2 mb-3 text-gray-800 brand-color">
                {{$name}}
            </h1>

            @if(count($posts) <= 0)
            <div class="card">
                <div class="card-header text-center">
                    <h1 class="mug-hot-large">
                        <i class="fas fa-mug-hot"></i>
                    </h1>
                </div>
                <div class="card-body text-center">                            
                    <p>The content is brewing behind the scenes. <br> Please wait for sometime else come back later.</p>
                </div>
            </div>    
            @else
                @foreach($posts as $post)
                    <div class="card">
                        <div class="card-header py-0 px-0">
                            @if($post->image == '')
                                <div class="text-center h1 image-header">
                                    <i class="fas fa-image"></i>
                                </div>
                            @else
                                <div class="post-header" style="background:url('{{asset('storage/posts/'.$post->image)}}')"></div>        
                            @endif
                        </div>
                        <div class="card-body">                    
                            <h2 class="h2 mb-3 brand-color">
                                <a class="text-dark" href="{{url('post/'.$post->url)}}">
                                    {{$post->title}}
                                </a>
                            </h2>
                            <p>{{$post->summary}}</p>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
    </div>
</div>