<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth','verified']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('pro');
    }

    public function user()
    {
      return view('user');
    }

    public function market()
    {
        return view('market');
    }

    public function store()
    {
        return view('store');
    }

    public function settings()
    {
        return view('settings');
    }

    public function cart()
    {
        return view('cart');
    }
}
