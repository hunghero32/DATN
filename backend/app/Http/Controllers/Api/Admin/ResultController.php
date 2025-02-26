<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreResultRequest;
use App\Http\Requests\UpdateResultRequest;

class ResultController extends Controller
{
    public function index()
    {
        $results = Result::with(['booking', 'doctor', 'guest'])->paginate(10);
        return response()->json($results, 200);
    }

    public function store(StoreResultRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('results', 'public');
        }

        $result = Result::create($data);

        return response()->json([
            'message' => 'Tạo kết quả thành công.',
            'data' => $result
        ], 201);
    }
    public function show($id)
    {
        $result = Result::with(['booking', 'doctor', 'guest'])->find($id);
    
        if (!$result) {
            return response()->json(['message' => 'Không tìm thấy kết quả.'], 404);
        }
    
        return response()->json($result, 200);
    }

    public function update(UpdateResultRequest $request, Result $result)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            if ($result->file) {
                Storage::disk('public')->delete($result->file);
            }
            $data['file'] = $request->file('file')->store('results', 'public');
        }

        $result->update($data);

        return response()->json([
            'message' => 'Cập nhật kết quả thành công.',
            'data' => $result
        ], 200);
    }

    public function destroy(Result $result)
    {
        if ($result->file) {
            Storage::disk('public')->delete($result->file);
        }

        $result->delete();

        return response()->json([
            'message' => 'Xóa kết quả thành công.'
        ], 200);
    }
}
