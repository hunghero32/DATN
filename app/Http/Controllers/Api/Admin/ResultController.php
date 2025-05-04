<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Result;

class ResultController extends Controller
{
    public function index()
    {
        $results = Result::with(['booking', 'doctor', 'guest'])->paginate(10);
        return response()->json($results, 200);
    }
    public function show($id)
    {
        $result = Result::with(['booking', 'doctor', 'guest'])->find($id);
    
        if (!$result) {
            return response()->json(['message' => 'Không tìm thấy kết quả.'], 404);
        }
    
        return response()->json($result, 200);
    }
}
