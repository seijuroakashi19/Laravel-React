<?php

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes(['verify'=>true]);

Route::group(['middleware'=>['auth']],function()
{
  Route::group(['middleware'=>['check']],function()
  {
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('pro');
    Route::get('/store', [App\Http\Controllers\HomeController::class, 'store'])->name('store');
  });
  Route::get('/user', [App\Http\Controllers\HomeController::class, 'user'])->name('user');
});

// Page Routes
Route::get('/market', [App\Http\Controllers\HomeController::class, 'market'])->name('market');
Route::get('/settings', [App\Http\Controllers\HomeController::class, 'settings'])->name('settings');
Route::get('/orders', [App\Http\Controllers\HomeController::class, 'cart'])->name('cart');

// GET Routes
Route::get('/Crud/Order', [App\Http\Controllers\CrudController::class, 'buy']);
Route::get('/Crud/LstOrder', [App\Http\Controllers\CrudController::class, 'readorder']);
Route::get('/Crud/Create', [App\Http\Controllers\CrudController::class, 'create']);
Route::get('/Crud/Read', [App\Http\Controllers\CrudController::class, 'read']);
Route::get('/Crud/ReadAll', [App\Http\Controllers\CrudController::class, 'readall']);
Route::get('/Crud/Update', [App\Http\Controllers\CrudController::class, 'update']);
Route::get('/Crud/updateStore', [App\Http\Controllers\CrudController::class, 'updatestore']);
Route::get('/Crud/Delete', [App\Http\Controllers\CrudController::class, 'delete']);
Route::get('/Crud/Register', [App\Http\Controllers\CrudController::class, 'register']);

// POST Routes
Route::post('/api/service', [App\Http\Controllers\CrudController::class, 'image']);
