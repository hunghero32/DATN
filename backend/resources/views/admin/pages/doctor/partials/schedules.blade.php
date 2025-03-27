@if(isset($item->schedules) && count($item->schedules) > 0)
    <div class="schedule-container">
        @php
            // Group schedules by date
            $groupedSchedules = $item->schedules->groupBy(function($schedule) {
                return \Carbon\Carbon::parse($schedule->working_date)->format('d/m/Y');
            });
        @endphp

        @foreach($groupedSchedules as $date => $schedules)
            <div class="date-group mb-3">
                <h6 class="date-header">{{ $date }}</h6>
                <div class="time-slots">
                    @foreach($schedules as $schedule)
                        <div class="time-slot-pill {{ $schedule->status == 1 ? 'active' : 'inactive' }}">
                            {{ \Carbon\Carbon::parse($schedule->time_start)->format('H:i') }} -
                            {{ \Carbon\Carbon::parse($schedule->time_end)->format('H:i') }}
                        </div>
                    @endforeach
                </div>
            </div>
        @endforeach
    </div>
@else
    <div class="alert alert-info">
        <i class="bx bx-info-circle me-1"></i>
        Bác sĩ này chưa có lịch làm việc nào.
    </div>
@endif

<style>
    .schedule-container {
        max-height: 400px;
        overflow-y: auto;
        padding-right: 10px;
    }

    .date-header {
        font-weight: 600;
        color: #566a7f;
        margin-bottom: 10px;
    }

    .time-slots {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 15px;
    }

    .time-slot-pill {
        background-color: #d9f7be;
        border-radius: 20px;
        padding: 6px 15px;
        font-size: 0.85rem;
        display: inline-block;
        color: #389e0d;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        transition: all 0.2s;
    }

    .time-slot-pill:hover {
        transform: translateY(-2px);
        box-shadow: 0 3px 5px rgba(0,0,0,0.1);
    }

    .time-slot-pill.inactive {
        background-color: #f5f5f5;
        color: #8c8c8c;
    }
</style>
