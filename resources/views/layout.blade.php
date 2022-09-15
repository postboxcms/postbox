<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{csrf_token()}}">

        <title>{{env('APP_NAME','Postbox')}}</title>
        <link href="{{asset('css/app.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/element.css')}}" rel="stylesheet"/>
    </head>
    <body>
        <div id="app">
            <div class="spinner">
                <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <div class="lds-text">{{env('APP_NAME','Postbox')}} is loading...</div>
            </div>
            {{-- React code UI rendered here --}}
        </div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
