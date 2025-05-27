<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Services;
use App\Models\Guest;
use App\Models\Schedule;
use App\Models\DoctorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotificationEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class BookingController extends Controller
{

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $today = date('Y-m-d');

        // Lấy tất cả dữ liệu booking
        $bookings = Booking::join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->join('guests', 'bookings.guest_id', '=', 'guests.id')
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->select('bookings.*', 'guests.guest_name')
            ->where('bookings.isDeleted', 0)
            ->get();

        // Phân loại các lịch đặt
        $currentBookings = [];
        $futureBookings = [];
        $pastBookings = [];

        foreach ($bookings as $booking) {
            if ($booking->booking_date == $today) {
                $currentBookings[] = $booking;
            } elseif ($booking->booking_date > $today) {
                $futureBookings[] = $booking;
            } else {
                $pastBookings[] = $booking;
            }
        }

        // Sắp xếp các lịch đặt tương lai theo thứ tự tăng dần theo ngày
        usort($futureBookings, function($a, $b) {
            return strcmp($a->booking_date, $b->booking_date);
        });

        // Sắp xếp các lịch đặt quá khứ theo thứ tự giảm dần theo ngày (gần nhất trước)
        usort($pastBookings, function($a, $b) {
            return strcmp($b->booking_date, $a->booking_date);
        });

        // Kết hợp các mảng theo thứ tự: hiện tại, tương lai, quá khứ
        $sortedBookings = array_merge($currentBookings, $futureBookings, $pastBookings);

        // Phân trang kết quả
        $data = new \Illuminate\Pagination\LengthAwarePaginator(
            array_slice($sortedBookings, ($perPage * (request()->get('page', 1) - 1)), $perPage),
            count($sortedBookings),
            $perPage,
            request()->get('page', 1),
            ['path' => request()->url(), 'query' => request()->query()]
        );

        $doctors = Doctor::join('bookings', 'doctors.id', '=', 'bookings.doctor_id')
            ->where('doctors.isDeleted', 0)
            ->where('bookings.isDeleted', 0)
            ->distinct()
            ->pluck('doctors.doctor_name', 'doctors.id')
            ->toArray();

        return view('admin.pages.booking.index', compact('data', 'doctors'));
    }

    public function search(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $status = $request->input('status');
        $search = $request->input('search');
        $guest_name = $request->input('guest_name');

        $query = Booking::join('doctors', 'bookings.doctor_id', '=', 'doctors.id')
            ->join('guests', 'bookings.guest_id', '=', 'guests.id')
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->select(
                'bookings.*',
                'doctors.doctor_name',
                'guests.guest_name',
                'services.services_name',
                'services.price as service_price'
            )
            ->where('bookings.isDeleted', 0);

        // Search by keyword across multiple fields
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('doctors.doctor_name', 'like', '%' . $search . '%')
                    ->orWhere('guests.guest_name', 'like', '%' . $search . '%')
                    ->orWhere('services.services_name', 'like', '%' . $search . '%')
                    ->orWhere('bookings.booking_date', 'like', '%' . $search . '%')
                    ->orWhere('bookings.booking_time', 'like', '%' . $search . '%');
            });
        }

        // Filter by guest name
        if ($guest_name) {
            $query->where('guests.guest_name', 'like', '%' . $guest_name . '%');
        }

        // Filter by status
        if ($status && $status !== 'all') {
            $query->where('bookings.status', $status);
        }

        // Add specific filters
        if ($request->input('guest_id') && $request->input('guest_id') !== 'all') {
            $query->where('bookings.guest_id', $request->input('guest_id'));
        }
        if ($request->input('doctor_id') && $request->input('doctor_id') !== 'all') {
            $query->where('bookings.doctor_id', $request->input('doctor_id'));
        }
        if ($request->input('service_id') && $request->input('service_id') !== 'all') {
            $query->where('bookings.service_id', $request->input('service_id'));
        }

        // Lấy tất cả dữ liệu booking theo điều kiện tìm kiếm
        $bookings = $query->get();
        $today = date('Y-m-d');

        // Phân loại các lịch đặt
        $currentBookings = [];
        $futureBookings = [];
        $pastBookings = [];

        foreach ($bookings as $booking) {
            if ($booking->booking_date == $today) {
                $currentBookings[] = $booking;
            } elseif ($booking->booking_date > $today) {
                $futureBookings[] = $booking;
            } else {
                $pastBookings[] = $booking;
            }
        }

        // Sắp xếp các lịch đặt tương lai theo thứ tự tăng dần theo ngày
        usort($futureBookings, function($a, $b) {
            return strcmp($a->booking_date, $b->booking_date);
        });

        // Sắp xếp các lịch đặt quá khứ theo thứ tự giảm dần theo ngày (gần nhất trước)
        usort($pastBookings, function($a, $b) {
            return strcmp($b->booking_date, $a->booking_date);
        });

        // Kết hợp các mảng theo thứ tự: hiện tại, tương lai, quá khứ
        $sortedBookings = array_merge($currentBookings, $futureBookings, $pastBookings);

        // Phân trang kết quả
        $data = new \Illuminate\Pagination\LengthAwarePaginator(
            array_slice($sortedBookings, ($perPage * ($request->get('page', 1) - 1)), $perPage),
            count($sortedBookings),
            $perPage,
            $request->get('page', 1),
            ['path' => $request->url(), 'query' => $request->query()]
        );
        $data->appends($request->all());

        // Get data for dropdowns
        $guests = Guest::join('bookings', 'guests.id', '=', 'bookings.guest_id')
            ->where('guests.isDeleted', 0)
            ->where('bookings.isDeleted', 0)
            ->distinct()
            ->pluck('guests.guest_name', 'guests.id')
            ->toArray();
        $doctors = Doctor::join('bookings', 'doctors.id', '=', 'bookings.doctor_id')
            ->where('doctors.isDeleted', 0)
            ->where('bookings.isDeleted', 0)
            ->distinct()
            ->pluck('doctors.doctor_name', 'doctors.id')
            ->toArray();

        $services = Services::where('isDeleted', 0)->pluck('services_name', 'id')->toArray();
        $statuses = config('app.statuses');

        return view('admin.pages.booking.index', compact('data', 'guests', 'doctors', 'services', 'statuses'));
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $booking = Booking::findOrFail($id);
            $currentStatus = $booking->status;
            $newStatus = $request->status;

            // Kiểm tra các điều kiện không cho phép thay đổi trạng thái

            // Định nghĩa thứ tự trạng thái
            $statusOrder = [
                'pending' => 1,
                'confirmed' => 2,
                'examining' => 3,
                'completed' => 4,
                'canceled' => 5
            ];

            // Không cho phép hủy khi đang khám hoặc đã hoàn thành
            if ($newStatus === 'canceled' && ($currentStatus === 'examining' || $currentStatus === 'completed')) {
                return redirect()->back()->with('error', 'Không thể hủy lịch khám đang trong trạng thái đang khám hoặc đã hoàn thành');
            }

            // Không cho phép chuyển từ trạng thái cao hơn về trạng thái thấp hơn (trừ trường hợp hủy)
            if ($newStatus !== 'canceled' && isset($statusOrder[$currentStatus]) && isset($statusOrder[$newStatus])) {
                if ($statusOrder[$newStatus] < $statusOrder[$currentStatus]) {
                    $statusNames = config('app.order_statuses');
                    return redirect()->back()->with('error', "Không thể chuyển từ trạng thái '{$statusNames[$currentStatus]}' về trạng thái '{$statusNames[$newStatus]}'.");
                }
            }

            // Cập nhật trạng thái nếu thỏa mãn điều kiện
            $booking->status = $newStatus;
            $booking->save();

            // Gửi email thông báo nếu booking liên kết với guest có email
            $guest = $booking->guest;
            if ($guest && isset($guest->email)) {
                $statusNames = config('app.order_statuses');
                $statusText = isset($statusNames[$booking->status]) ? $statusNames[$booking->status] : $booking->status;

                $title   = 'Cập nhật trạng thái đặt lịch';
                $content = "Lịch khám #{$booking->id} của bạn đã được cập nhật sang trạng thái: {$statusText}.";

                $url     = route('admin.bookings.edit', ['booking' => $booking->id]);

                Mail::to($guest->email)
                    ->send(new NotificationEmail($title, $content, $url));
            }

            return redirect()->back()->with('success', 'Cập nhật trạng thái thành công');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Có lỗi xảy ra khi cập nhật trạng thái: ' . $e->getMessage());
        }
    }
    public function create()
    {
        $doctors = Doctor::where('isDeleted', 0)
            ->where('approve', 1)
            ->pluck('doctor_name', 'id')
            ->toArray();

        // Không lấy tất cả dịch vụ ở đây, sẽ lấy theo bác sĩ bằng AJAX
        $services = [];

        // Lấy thông tin khách hàng bao gồm tên, số điện thoại và email
        $guests = Guest::where('isDeleted', 0)
            ->select('id', 'guest_name', 'guest_phone', 'guest_email')
            ->get()
            ->mapWithKeys(function ($guest) {
                $guestInfo = $guest->guest_name;
                if ($guest->guest_phone) {
                    $guestInfo .= ' - ' . $guest->guest_phone;
                }
                if ($guest->guest_email) {
                    $guestInfo .= ' - ' . $guest->guest_email;
                }
                return [$guest->id => $guestInfo];
            })
            ->toArray();

        $statuses = config('app.order_statuses');

        return view('admin.pages.booking.create', compact('doctors', 'services', 'guests', 'statuses'));
    }

    // Thêm phương thức mới để lấy dịch vụ theo bác sĩ
    public function getServicesByDoctor(Request $request)
    {
        $doctorId = $request->doctor_id;

        if (!$doctorId) {
            return response()->json([]);
        }

        try {
            // Get services for the doctor from doctor_services table
            $services = DB::table('doctor_service')
                ->join('services', 'doctor_service.service_id', '=', 'services.id')
                ->where('doctor_service.doctor_id', $doctorId)
                ->where('services.isDeleted', 0)
                ->select('services.id', 'services.services_name')
                ->get()
                ->pluck('services_name', 'id');

            return response()->json($services);
        } catch (\Exception $e) {
            \Log::error('Error loading doctor services: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Kiểm tra xem người dùng đang tạo khách hàng mới hay chọn khách hàng có sẵn
            $guestId = $request->input('guest_id');
            $isNewGuest = $request->input('is_new_guest', false);

            if ($isNewGuest) {
                // Validate thông tin khách hàng mới
                $guestValidator = Validator::make($request->all(), [
                    'guest_name' => 'required|string|max:255',
                    'gender' => 'required|in:male,female,other',
                    'birthday' => 'nullable|date',
                    'guest_phone' => 'nullable|string|max:255',
                    'guest_email' => 'nullable|email|max:255',
                    'address' => 'nullable|string',
                ]);

                if ($guestValidator->fails()) {
                    return redirect()->back()
                        ->withErrors($guestValidator)
                        ->withInput();
                }

                // Tạo khách hàng mới
                $guest = new Guest();
                $guest->guest_name = $request->input('guest_name');
                $guest->gender = $request->input('gender');
                $guest->birthday = $request->input('birthday');
                $guest->guest_phone = $request->input('guest_phone');
                $guest->guest_email = $request->input('guest_email');
                $guest->address = $request->input('address');
                $guest->isDeleted = 0;
                $guest->save();

                // Sử dụng ID của khách hàng mới tạo
                $guestId = $guest->id;
            } else {
                // Validate guest_id nếu không tạo mới
                $guestValidator = Validator::make($request->all(), [
                    'guest_id' => 'required|exists:guests,id',
                ]);

                if ($guestValidator->fails()) {
                    return redirect()->back()
                        ->withErrors($guestValidator)
                        ->withInput();
                }
            }

            // Validate dữ liệu đặt lịch (loại bỏ status khỏi validation)
            $bookingValidator = Validator::make($request->all(), [
                'doctor_id' => 'required|exists:doctors,id',
                'service_id' => 'required|exists:services,id',
                'booking_date' => 'required|date|after_or_equal:today',
                'booking_time' => 'required',
                'notes' => 'nullable|string|max:500',
            ]);

            if ($bookingValidator->fails()) {
                return redirect()->back()
                    ->withErrors($bookingValidator)
                    ->withInput();
            }

            // Kiểm tra xem bác sĩ có lịch trống vào thời gian đã chọn không
            $existingBooking = Booking::where('doctor_id', $request->doctor_id)
                ->where('booking_date', $request->booking_date)
                ->where('booking_time', $request->booking_time)
                ->where('status', '!=', 'cancelled')
                ->where('isDeleted', 0)
                ->first();

            if ($existingBooking) {
                return redirect()->back()
                    ->with('error', 'Bác sĩ đã có lịch hẹn vào thời gian này. Vui lòng chọn thời gian khác.')
                    ->withInput();
            }

            // Lấy thông tin bác sĩ và dịch vụ để lưu vào booking
            $doctor = Doctor::findOrFail($request->doctor_id);
            $service = Services::findOrFail($request->service_id);
            
            // Lấy doctor_fee từ bảng doctor_service
            $doctorService = DoctorService::where('doctor_id', $request->doctor_id)
                ->where('service_id', $request->service_id)
                ->first();
            if (!$doctorService) {
                return redirect()->back()
                    ->with('error', 'Không tìm thấy thông tin phí bác sĩ cho dịch vụ này')
                    ->withInput();
            }

            // Tạo booking mới
            $booking = new Booking();
            $booking->guest_id = $guestId;
            $booking->doctor_id = $request->doctor_id;
            $booking->doctor_name = $doctor->doctor_name;
            $booking->service_id = $request->service_id;
            $booking->service_name = $service->services_name;
            $booking->service_price = $service->price;
            $booking->doctor_fee = $doctorService->doctor_fee;
            $booking->booking_date = $request->booking_date;
            $booking->booking_time = $request->booking_time;
            $booking->status = 'pending';
            $booking->notes = $request->notes;
            $booking->isDeleted = 0;
            $booking->save();

            // Gửi email thông báo nếu booking liên kết với guest có email
            $guest = $booking->guest;
            if ($guest && isset($guest->guest_email)) {
                $title   = 'Thông báo đặt lịch khám';
                $content = "Lịch khám #{$booking->id} của bạn đã được tạo thành công. Trạng thái hiện tại: {$booking->status}.";
                $url     = route('admin.bookings.edit', ['booking' => $booking->id]);

                Mail::to($guest->guest_email)
                    ->send(new NotificationEmail($title, $content, $url));
            }

            return redirect()->route('admin.bookings.index')
                ->with('success', 'Tạo lịch hẹn mới thành công');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Có lỗi xảy ra khi tạo lịch hẹn: ' . $e->getMessage())
                ->withInput();
        }
    }

    // Thêm phương thức mới để lấy khung giờ làm việc
    public function getWorkingDates(Request $request)
    {
        $doctorId = $request->input('doctor_id');

        if (!$doctorId) {
            return response()->json([]);
        }

        // Lấy ngày hiện tại
        $today = date('Y-m-d');

        // Lấy các ngày làm việc của bác sĩ từ bảng lịch làm việc (chỉ lấy ngày hiện tại và tương lai)
        $workingDates = DB::table('schedules')
            ->where('doctor_id', $doctorId)
            ->where('status', 1)
            ->where('isDeleted', 0)
            ->where('working_date', '>=', $today) // Chỉ lấy ngày hiện tại và tương lai
            ->distinct()
            ->pluck('working_date')
            ->toArray();

        // Phân loại các ngày làm việc
        $currentDates = [];
        $futureDates = [];

        foreach ($workingDates as $date) {
            if ($date == $today) {
                $currentDates[] = $date;
            } else { // $date > $today
                $futureDates[] = $date;
            }
        }

        // Sắp xếp các ngày tương lai theo thứ tự tăng dần
        sort($futureDates);

        // Kết hợp các mảng theo thứ tự: hiện tại, tương lai
        $sortedDates = array_merge($currentDates, $futureDates);

        return response()->json($sortedDates);
    }
    public function getDoctorServices(Request $request)
    {
        $doctorId = $request->input('doctor_id');

        if (!$doctorId) {
            return response()->json([
                'success' => false,
                'message' => 'Không có ID bác sĩ được cung cấp',
                'services' => []
            ]);
        }

        // Kiểm tra xem bác sĩ có tồn tại không
        $doctor = Doctor::find($doctorId);
        if (!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy bác sĩ với ID: ' . $doctorId,
                'services' => []
            ]);
        }

        // Lấy dịch vụ của bác sĩ
        $doctorServices = DoctorService::where('doctor_id', $doctorId)->get();

        // Kiểm tra xem bác sĩ có dịch vụ nào không
        if ($doctorServices->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Bác sĩ này chưa được gán dịch vụ nào',
                'services' => []
            ]);
        }

        $services = DoctorService::join('services', 'doctor_services.service_id', '=', 'services.id')
            ->where('doctor_services.doctor_id', $doctorId)
            ->where('services.isDeleted', 0)
            ->select('services.id', 'services.services_name')
            ->get();

        // Kiểm tra kết quả sau khi join
        if ($services->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dịch vụ hợp lệ cho bác sĩ này',
                'services' => []
            ]);
        }

        $servicesArray = $services->pluck('services_name', 'id')->toArray();

        return response()->json([
            'success' => true,
            'message' => 'Lấy dịch vụ thành công',
            'services' => $servicesArray,
            'count' => count($servicesArray)
        ]);
    }

    public function getAvailableTimeSlots(Request $request)
    {
        $doctorId = $request->input('doctor_id');
        $date = $request->input('date');

        if (!$doctorId || !$date) {
            return response()->json([
                'success' => false,
                'time_slots' => [],
                'message' => 'Missing doctor_id or date'
            ]);
        }

        // Retrieve available time slots for the doctor on the specified date
        $timeSlots = DB::table('schedules')
            ->where('doctor_id', $doctorId)
            ->where('working_date', $date)
            ->where('status', 1)
            ->where('isDeleted', 0)
            ->select('id', 'time_start', 'time_end')
            ->get();

        // Check booking count for each time slot
        foreach ($timeSlots as $key => $slot) {
            // Count current bookings for this time slot
            $bookingCount = DB::table('bookings')
                ->where('doctor_id', $doctorId)
                ->where('booking_date', $date)
                ->where('booking_time', $slot->id)
                ->where('status', '!=', 'canceled')
                ->count();

            // Add booking count to the slot object for response
            $timeSlots[$key]->booking_count = $bookingCount;
        }

        // Sắp xếp thời gian theo thứ tự: hiện tại, tương lai, quá khứ
        $currentTime = now()->format('H:i:s');

        // Chuyển collection thành mảng để sắp xếp
        $timeSlotsArray = $timeSlots->toArray();

        // Phân loại các khung giờ
        $currentSlots = [];
        $futureSlots = [];
        $pastSlots = [];

        foreach ($timeSlotsArray as $slot) {
            if ($slot->time_start == $currentTime) {
                $currentSlots[] = $slot;
            } elseif ($slot->time_start > $currentTime) {
                $futureSlots[] = $slot;
            } else {
                $pastSlots[] = $slot;
            }
        }

        // Sắp xếp các khung giờ tương lai theo thứ tự tăng dần
        usort($futureSlots, function($a, $b) {
            return strcmp($a->time_start, $b->time_start);
        });

        // Sắp xếp các khung giờ quá khứ theo thứ tự tăng dần
        usort($pastSlots, function($a, $b) {
            return strcmp($a->time_start, $b->time_start);
        });

        // Kết hợp các mảng theo thứ tự: hiện tại, tương lai, quá khứ
        $sortedTimeSlots = array_merge($currentSlots, $futureSlots, $pastSlots);

        return response()->json([
            'success' => true,
            'time_slots' => $sortedTimeSlots
        ]);
    }
}
