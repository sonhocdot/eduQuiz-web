<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Demo;

class DemoController extends Controller
{
    public function index()
    {
        return response()->json(Demo::all(), 200);
    }
}
