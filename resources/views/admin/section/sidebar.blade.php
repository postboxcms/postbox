<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion {{ filter_input(INPUT_COOKIE,'toggle_switch') == 1?'toggled':'' }}" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{admin_url('/')}}">
        <div class="sidebar-brand-icon">
            <!-- <i class="fas fa-laugh-wink"></i> -->
            <img src= "{{ asset('images/logo_white.png') }}" height="36px" />
        </div>
        <!-- <div class="sidebar-brand-text mx-3"></div> -->
    </a>

<a class="sidebar-brand-min d-flex align-items-center justify-content-center" href="{{admin_url('/')}}">
        <div class="sidebar-brand-icon">
            <!-- <i class="fas fa-laugh-wink"></i> -->
            <img src= "{{ asset('images/logo_white_min.png') }}" height="36px" />
        </div>
    </a>


    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    @foreach(admin_menu() as $item)
        @php
            if(config('app.admin_prefix') == '') {
                $segment = '/'. Request::segment(1);
            } else {
                $segment = config('app.admin_prefix').'/'.Request::segment(2);
            }
        @endphp
        <li class="nav-item {{ $status = $segment == $item['link'] ? 'active':''}}">
            @if( $item['child'] )
                <a data-update = '{"type":"div", "id":"wrapper"}' class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse{{str_replace(' ','',$item['label'])}}" aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas {{$item['class']}}"></i>
                    <span>{{ ucfirst($item['label']) }}</span>
                </a>
                <div id="collapse{{str_replace(' ','',$item['label'])}}" class="collapse" aria-labelledby="heading{{$item['label']}}" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">{{$item['label']}}</h6>
                        @foreach( $item['child'] as $child )                        
                            <a class="collapse-item" href="{{url($child['link'])}}">
                                <i class="fas {{$child['class']}}"></i>
                                {{$child['label']}}
                            </a>
                        @endforeach
                    </div>
                </div>
            @else
                <a data-update = '{"type":"div", "id":"wrapper"}' class="nav-link" href="{{url($item['link'])}}">
                    <i class="fas {{$item['class']}}"></i>
                    <span>{{ ucfirst($item['label']) }}</span>
                </a>
            @endif
        </li>
    @endforeach

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

</ul>