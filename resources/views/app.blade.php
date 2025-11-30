<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">

    <title>Postbox</title>
    <link href="{{asset('css/app.css')}}" rel="stylesheet" />
    <link href="{{asset('css/theme.css')}}" rel="stylesheet" />
</head>

<body>
    <div id="app">
        <div class="app-loader">
            <div class="spinner-wrapper">
                <div class="shadow"></div>
                <div class="loader">
                    <div class="inner-ball"></div>
                </div>
            </div>
        </div>
        {{-- React code UI rendered here --}}
    </div>
    <script src="{{asset('js/app.js')}}"></script>
</body>

</html>