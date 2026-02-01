@extends('web');
@section('title', 'Server Error')
@section('meta_description', '500 - Server Error')
@section('meta_keywords', '')
@section('content')
    <div class="min-h-screen flex flex-col">
        <div class="flex-grow flex flex-col justify-center items-center text-center px-4">
            <h1 class="text-6xl font-bold mb-4">500</h1>
            <h2 class="text-2xl font-semibold mb-6">Server Error</h2>
            <p class="text-lg mb-8">Oops! Something went wrong on our end. Please try again later.</p>
            <a href="{{ url('/') }}" class="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">Go to Homepage</a>
        </div>
        <footer class="bg-gray-100 text-center py-4">
            <p class="text-sm text-gray-600">&copy; {{ date('Y') }} {{ env('APP_NAME', 'Postbox') }}. All rights reserved.</p>
        </footer>
    </div>
@endsection