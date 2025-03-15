<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\Guest;
use App\Models\Doctor;
use App\Models\Service;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index(Request $request)
    {
        $query = Feedback::where('isDeleted', 0)->with(['guest', 'doctor', 'service']);
    
        // Tìm kiếm theo comments và service
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = '%' . $request->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('comments', 'LIKE', $searchTerm)
                  ->orWhereHas('service', function ($subQuery) use ($searchTerm) {
                      $subQuery->where('services_name', 'LIKE', $searchTerm);
                  });
            });
        }
    
        // Bộ lọc theo rating
        if ($request->has('rating') && !empty($request->rating)) {
            $query->where('rating', $request->rating);
        }
    
        // Lấy danh sách feedback
        $feedbacks = $query->paginate(10);
    
        // Tính trung bình rating của từng dịch vụ
        $averageRatings = Feedback::where('isDeleted', 0)
            ->selectRaw('service_id, AVG(rating) as avg_rating')
            ->groupBy('service_id')
            ->with('service')
            ->get();
    
        return view('admin.pages.feedback.index', compact('feedbacks', 'averageRatings'));
    }
    


    public function create()
    {
        $guests = Guest::all();
        $doctors = Doctor::all();
        $service = Service::all();
        return view('admin.pages.feedback.create', compact('guests', 'doctors', 'services'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'guest_id' => 'required|exists:guests,id',
            'rating' => 'required|integer|min:1|max:5',
            'comments' => 'nullable|string|max:500',
            'doctor_id' => 'nullable|exists:doctors,id',
            'service_id' => 'nullable|exists:services,id',
            'status' => 'required|in:pending,approved,rejected',
        ], [
            'guest_id.required' => 'Vui lòng chọn khách hàng.',
            'guest_id.exists' => 'Khách hàng không hợp lệ.',
            'rating.required' => 'Vui lòng chọn xếp hạng.',
            'rating.integer' => 'Xếp hạng phải là số nguyên.',
            'rating.min' => 'Xếp hạng tối thiểu là 1.',
            'rating.max' => 'Xếp hạng tối đa là 5.',
            'comments.max' => 'Nội dung phản hồi tối đa 500 ký tự.',
            'doctor_id.exists' => 'Bác sĩ không hợp lệ.',
            'service_id.exists' => 'Dịch vụ không hợp lệ.',
            'status.required' => 'Vui lòng chọn trạng thái.',
            'status.in' => 'Trạng thái không hợp lệ.',
        ]);

        Feedback::create([
            'guest_id' => $request->guest_id,
            'doctor_id' => $request->doctor_id,
            'service_id' => $request->service_id,
            'rating' => $request->rating,
            'comments' => $request->comments,
            'status' => $request->status,
            'isDeleted' => 0
        ]);

        return redirect()->route('admin.feedback.index')->with('success', 'Phản hồi đã được tạo!');
    }

    public function edit($id)
    {
        $feedback = Feedback::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        $guests = Guest::all();
        $doctors = Doctor::all();
        $service = Service::all();
        return view('admin.pages.feedback.edit', compact('feedback', 'guests', 'doctors', 'services'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'guest_id' => 'required|exists:guests,id',
            'rating' => 'required|integer|min:1|max:5',
            'comments' => 'nullable|string|max:500',
            'doctor_id' => 'nullable|exists:doctors,id',
            'service_id' => 'nullable|exists:services,id',
            'status' => 'required|in:pending,approved,rejected',
        ], [
            'guest_id.required' => 'Vui lòng chọn khách hàng.',
            'guest_id.exists' => 'Khách hàng không hợp lệ.',
            'rating.required' => 'Vui lòng chọn xếp hạng.',
            'rating.integer' => 'Xếp hạng phải là số nguyên.',
            'rating.min' => 'Xếp hạng tối thiểu là 1.',
            'rating.max' => 'Xếp hạng tối đa là 5.',
            'comments.max' => 'Nội dung phản hồi tối đa 500 ký tự.',
            'doctor_id.exists' => 'Bác sĩ không hợp lệ.',
            'service_id.exists' => 'Dịch vụ không hợp lệ.',
            'status.required' => 'Vui lòng chọn trạng thái.',
            'status.in' => 'Trạng thái không hợp lệ.',
        ]);

        $feedback = Feedback::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        $feedback->update([
            'guest_id' => $request->guest_id,
            'doctor_id' => $request->doctor_id,
            'service_id' => $request->service_id,
            'rating' => $request->rating,
            'comments' => $request->comments,
            'status' => $request->status
        ]);

        return redirect()->route('admin.feedback.index')->with('success', 'Phản hồi đã được cập nhật!');
    }

    public function delete($id)
    {
        $feedback = Feedback::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        $feedback->update(['isDeleted' => 1]);

        return redirect()->route('admin.feedback.index')->with('success', 'Phản hồi đã bị xóa!');
    }
}
