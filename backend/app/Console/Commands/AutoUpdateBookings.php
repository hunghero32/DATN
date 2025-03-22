<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use Carbon\Carbon;
class AutoUpdateBookings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bookings:autoupdate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Tự động cập nhật trạng thái booking theo thời gian';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Chuyển từ 'pending' => 'confirmed' sau 30 phút
        $pendingToConfirmed = Booking::where('status', 'pending')
            ->where('created_at', '<=', Carbon::now()->subMinutes(30))
            ->update(['status' => 'confirmed']);
        $this->info("Cập nhật: $pendingToConfirmed pending -> confirmed");
    }
}
