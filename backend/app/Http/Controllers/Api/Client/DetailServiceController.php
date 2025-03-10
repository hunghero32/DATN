<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Services;
use Illuminate\Http\Request;

class DetailServiceController extends Controller
{
    public function detailService(Request $request)
    {
        $services = Services::where('status', 1)
            ->where('isDeleted', 0)
            ->take(10)
            ->get();

        return response()->json($services);
    }
}
