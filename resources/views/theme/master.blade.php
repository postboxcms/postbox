<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <base href="{{env('APP_URL')}}" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- SEO tags -->
    <meta name="description" content="{{ $pageData['meta_description'] }}"/>
    <meta name="keywords" content="{{ $pageData['meta_keywords'] }}"/>
    <meta name="robots" content="index,follow"/>


    <title>{{ Template::display('title') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="{{asset('js/admin/vendor/fontawesome-free/css/all.min.css')}}" rel="stylesheet" type="text/css">    

    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"/>
    <!-- Styles -->
    <link href="{{ asset('css/theme.css') }}" rel="stylesheet">
</head>
<body>
    <div id="box">
        <nav class="navbar navbar-expand-md navbar-light shadow-sm">
            <div class="container">
                {{-- @if() --}}
                {!! Widget::render('logo') !!}
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    {!! Widget::menu('pages') !!}                    
                </div>
            </div>
        </nav>

        <main class="">
            @yield('content')
        </main>
    </div>
    <script src="//code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>    
    <script type="text/javascript" src="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script data-type="push-router" src="{{ asset('js/push-router/push-config.js') }}" defer></script>      
    <script data-type="push-router" src="{{ asset('js/push-router/push-router.js') }}" defer></script>  
    <script data-type="push-router">
      // Global variables
      $(document).ready(function() {
        $.pushRoute({
          'element': 'a',
        });
      });
    </script>  
    {{-- Additional plugins --}}
    @yield('scripts')    
</body>
</html>
