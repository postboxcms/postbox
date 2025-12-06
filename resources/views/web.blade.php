<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{csrf_token()}}">

        <title>{{env('APP_NAME','Postbox')}}</title>
        @viteReactRefresh
        @vite(['resources/js/website/client.js'])
        <link href="{{asset('css/app.css')}}" rel="stylesheet"/>
        <link href="{{asset('themes/'.$theme.'/css/theme.css')}}" rel="stylesheet"/>
    </head>
    <body>
        <div id="web">
            {!! $html ?? '' !!}
        </div>
        <script src="/build/client.js"></script>
    </body>
</html>
