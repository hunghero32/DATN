<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $data=Booking::join('doctors','bookings.doctor_id','=','doctors.id')
            ->join('guests','bookings.guest_id','=','guests.id')
            ->join('services','bookings.service_id','=','services.id')
            ->select('bookings.*','doctors.doctor_name','guests.guest_name','services.services_name')
            ->where('bookings.isDeleted',0)
            ->get();
        return view('admin.pages.booking.index',compact('data'));
    }

    public function destroy($id)
    {
        $data=Booking::find($id);
        if($data->status=='pending'){
            $data->isDeleted=1;
            $data->save();
            return redirect()->route('admin.bookings.index')->with('success','Xóa thành công đặt lịch khám bệnh');
        }else{
            return redirect()->route('admin.bookings.index')->with('error','Không thể xóa đặt lịch khám bệnh đã được xác nhận');
        }


    }

}
