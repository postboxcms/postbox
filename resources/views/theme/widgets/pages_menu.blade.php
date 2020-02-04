<ul class="navbar-nav navbar-top ml-auto">
    <!-- Page Links -->
    @foreach($pages as $page)
        <li class="nav-item">
            <a class="nav-link text-gray-100" href="{{ url('page/'.$page->url) }}">{{ $page->title }}</a>
        </li>
    @endforeach
</ul>