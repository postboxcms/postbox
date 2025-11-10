<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{csrf_token()}}">

        <title>{{env('APP_NAME','Postbox')}}</title>
        @viteReactRefresh
        @vite(['resources/js/website/client.js', 'resources/js/website/server.js'])
        <link href="{{asset('css/app.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/theme.css')}}" rel="stylesheet"/>
    </head>
    <body>
        <div id="web">
            <!-- <div class="web-loader">
                <div class="cube-wrapper">
                    <div class="cube-folding">
                        <span class="leaf1"></span>
                        <span class="leaf2"></span>
                        <span class="leaf3"></span>
                        <span class="leaf4"></span>
                    </div>
                    <span class="loading" data-name="{{env('APP_NAME','Postbox')}}">{{env('APP_NAME','Postbox')}} is loading</span>
                </div>
            </div> -->
            {{-- React code UI rendered here --}}
            {!! $ssr ?? '' !!}
        </div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
