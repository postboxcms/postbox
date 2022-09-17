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
            <div class="app-loader">
                <div class="cube-wrapper">
                    <div class="cube-folding">
                        <span class="leaf1"></span>
                        <span class="leaf2"></span>
                        <span class="leaf3"></span>
                        <span class="leaf4"></span>
                    </div>
                    <span class="loading" data-name="{{env('APP_NAME','Postbox')}}">{{env('APP_NAME','Postbox')}} is loading</span>
                </div>
            </div>
            {{-- React code UI rendered here --}}
        </div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
