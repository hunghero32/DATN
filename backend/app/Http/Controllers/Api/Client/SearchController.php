<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\SearchService;
use App\Http\Requests\SearchRequest; 

class SearchController extends Controller
{
    protected $searchService;

    public function __construct(SearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    public function search(Request $request)
    {
        $query = $request->query('query', '');

        $results = $this->searchService->searchAll($query);

        return response()->json($results);
    }

    public function searchBookings(Request $request)
    {
        $filters = $request->only([
            'doctor_name',
            'service_name',
            'guest_name',
            'guest_phone',
            'booking_date',
            'booking_time'
        ]);

        $results = $this->searchService->searchBookings($filters);

        return response()->json($results);
    }
}
