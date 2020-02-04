@if(!isset($logo->value))
    <a class="navbar-brand" href="{{ url('/') }}">
        {{ config('app.name', 'Postbox') }}
    </a>
@else
    <a class="navbar-brand" href="{{ url('/') }}">
        <img height="36px" src="{{ asset('storage/settings/'.$logo->value) }}"/>
    </a>
@endif