<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Paypal Scripts -->
    <script src="https://www.paypal.com/sdk/js?client-id=AeSMP32GvbNRcfy7Ej7jMwHoPu2-bHD4CT_d5cDmcV_HSdu-PMjgmHIkW7uKhKH-TC0eyKgs0omvu9aJ&currency=USD" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body style="background-color: #101520;">
    <div id="app">
      <div id="navbars"></div>
    </div>
</body>
</html>
