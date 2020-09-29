<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class CrudController extends Controller
{
    //
    public function Create()
    {
      $item = $_GET["item"];
      $qty = $_GET["qty"];
      $price = $_GET["price"];
      $image = $_GET["image"];

      DB::table('item')->insert([
          'ids' =>  Auth::id(),
          'name' => $item,
          'qty' => $qty,
          'price' => $price,
          'img'=>$image,
          'created_at' => null,
          'updated_at' => null,
        ]);
     echo "success";
    }

    public function updatestore()
    {
      $name = $_GET["store"];
      DB::table('store')->insert([
          'uid' =>  Auth::id(),
          'name' => $name,
        ]);
     echo "success";
    }

    public function Buy()
    {
      $item = $_GET["idi"];
      $qty = $_GET["qty"];
      $name = $_GET["name"];
      $price = $_GET["price"];
      $image = $_GET["img"];

      DB::table('orders')->insert([
          'uid' => Auth::id(),
          'idi' => $item,
          'qty' => $qty,
          'name' => $name,
          'price' => $price,
          'img'=>$image,
          'created_at' => null,
        ]);
     echo "success";
    }

    public function Read()
    {
      $tbl = "store";
      $id = Auth::id();
      $user = DB::table($tbl)->select()->where(['uid'=>$id])->first();
      if ($user!="") {
        $users = DB::table($tbl)->select()->where(['uid'=>$id])->get();
        $check_tbl = json_decode($users);
        $ids = $check_tbl[0]->id;

        $data_items = array();
        $users = DB::table('item')->select()->orderByDesc('id')->where(['ids'=>$ids])->get();
        $check_tbl = json_decode($users);
        for ($i=0; $i <count($check_tbl) ; $i++) {
          array_push($data_items,array($check_tbl[$i]->name,$check_tbl[$i]->qty,$check_tbl[$i]->price,$check_tbl[$i]->id,$check_tbl[$i]->img));
        }
        $arr = array('data_items' =>$data_items);
        $api_data = json_encode($arr);
        return $api_data;
      }else {
        return false;
      }
    }

    public function ReadAll()
    {
      $data_items = array();
      $users = DB::table('item')->select()->orderByDesc('id')->get();
      $check_tbl = json_decode($users);
      for ($i=0; $i <count($check_tbl) ; $i++) {
        array_push($data_items,array($check_tbl[$i]->name,$check_tbl[$i]->qty,$check_tbl[$i]->price,$check_tbl[$i]->id,$check_tbl[$i]->img));
      }
      $arr = array('data_items' =>$data_items);
      $api_data = json_encode($arr);
      return $api_data;
    }

    public function ReadOrder()
    {
      $data_items = array();
      $users = DB::table('orders')->select()->orderByDesc('id')->where(array('uid' =>Auth::id()))->get();
      $check_tbl = json_decode($users);
      for ($i=0; $i <count($check_tbl) ; $i++) {
        array_push($data_items,array($check_tbl[$i]->name,$check_tbl[$i]->qty,$check_tbl[$i]->price,$check_tbl[$i]->id,$check_tbl[$i]->img));
      }
      $arr = array('data_items' =>$data_items);
      $api_data = json_encode($arr);
      return $api_data;
    }

    public function Update()
    {
      $id = $_GET["ids"];
      $item = $_GET["item"];
      $qty = $_GET["qty"];
      $price = $_GET["price"];
      $tbl = "store";
      $uid = Auth::id();
      $users = DB::table($tbl)->select()->where(['uid'=>$uid])->get();
      $check_tbl = json_decode($users);
      $ids = $check_tbl[0]->id;

      $tbl = "item";
      DB::table($tbl)
              ->where(array('ids' => $ids,'id'=>$id ))
              ->update(['name' => $item,'qty' => $qty,'price' => $price]);
      echo "success";
    }

    public function Delete()
    {
      $tbl = "store";
      $uid = Auth::id();
      $users = DB::table($tbl)->select()->where(['uid'=>$uid])->get();
      $check_tbl = json_decode($users);
      $ids = $check_tbl[0]->id;

      $id = $_GET["ids"];
      $tbl = "item";
      DB::table($tbl)->where(array('id' =>$id ,'ids'=>$ids ))->delete();
      echo "success";
    }

    public function Image(Request $request)
    {
      $img = str_replace('base64,','',$request->input('image'));
      file_put_contents(public_path().'/img/'.$request->input('name'),base64_decode($img));
      $url = Storage::url($request->input('name'));
      echo storage_path();
    }

    public function Register()
    {
      $now = date('Y-m-d H:i');
      User::create([
          'name' => $_GET['name'],
          'email' => $_GET['email'],
          'password' => Hash::make($_GET['pass']),
      ]);

      $users = DB::table("users")->select()->orderByDesc('id')->get();
      $check_tbl = json_decode($users);
      $id = $check_tbl[0]->id;
      DB::table('users')
      ->where(array('id' => $id))
      ->update(['email_verified_at' => $now]);

      DB::table('role_user')->insert([
          'user_id' =>  $id,
          'role_id' =>  3,
      ]);
      echo "successfully registered";
    }

}
