@extends('layouts.app')

@section('content')
<div class="container">
  <div class="row">
    <div class="col-lg-3">
      @if (Auth::user()->roles->pluck('name')->contains('user'))
      <div id="user_navbar"></div>
      @else
      <div id="pro_navbar"></div>
      @endif
    </div>
    <div class="col-lg-9">
      <div id="body_market">

      </div>
    </div>
  </div>
</div>
@endsection
