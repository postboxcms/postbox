<div class="card">
    <div class="card-header">Categories</div>
    <div class="card-body card-list">                   
        @if(count($categories['categoryList']) <= 0)        
            <ul class="category-list">
                <li><a href="{{url('category/all')}}">Uncategorized ({{$categories['uncategorizedPosts']}})</a></li>
            </ul>
        @else
            <ul class="category-list">        
                @foreach ($categories['categoryList'] as $category)
                    <li>
                        <a class="brand-color" href="{{url('category/'.$category->url)}}">{{$category->name}}</a>
                    </li>
                @endforeach
            </ul>
        @endif
    </div>
</div>
