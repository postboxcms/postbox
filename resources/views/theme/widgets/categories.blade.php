<div class="card">
    <div class="card-header">Categories</div>
    <div class="card-body card-list">                   
        @if(count($categories) <= 0)        
            <ul class="category-list">
                <li><a href="#">Uncategorized (0)</a></li>
            </ul>
        @else
            <ul class="category-list">        
                @foreach ($categories as $category)
                    <li>
                        <a class="brand-color" href="{{url('categories/'.$category->url)}}">{{$category->name}}</a>
                    </li>
                @endforeach
            </ul>
        @endif
    </div>
</div>
