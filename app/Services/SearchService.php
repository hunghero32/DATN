<?php 

namespace App\Services;

use App\Repositories\SpecialtyRepository;
use App\Repositories\ServiceRepository;
use App\Repositories\ResultRepository;
use App\Repositories\FeedbackRepository;

class SearchService
{
    protected $specialtyRepo;
    protected $serviceRepo;
    protected $resultRepo;
    protected $feedbackRepo;

    public function __construct(
        SpecialtyRepository $specialtyRepo,
        ServiceRepository $serviceRepo,
        ResultRepository $resultRepo,
        FeedbackRepository $feedbackRepo
    ) 
    
    {
        $this->specialtyRepo = $specialtyRepo;
        $this->serviceRepo = $serviceRepo;
        $this->resultRepo = $resultRepo;
        $this->feedbackRepo = $feedbackRepo;
    }

    public function searchAll(string $query): array
    {
        return [
            'specialties' => $this->specialtyRepo->search($query),
            'services'    => $this->serviceRepo->search($query),
            'results'     => $this->resultRepo->search($query),
            'feedbacks'   => $this->feedbackRepo->search($query),
        ];
    }
}