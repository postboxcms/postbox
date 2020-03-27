@if(!isset($logo->value))
    <a class="navbar-brand" href="{{ url('/') }}">
        {{ config('app.name', 'Postbox') }}
    </a>
@elseif(isset($logo->parameter) && $logo->parameter == 'site.image' && $logo->value != NULL)
    <a class="navbar-brand" href="{{ url('/') }}">
        <img height="50px" src="{{ asset('storage/settings/'.$logo->value) }}"/>
    </a>
@else
    <a class="navbar-brand" href="{{ url('/') }}">
        {{$logo->value}}
    </a>
@endif