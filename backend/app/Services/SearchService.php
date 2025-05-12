<?php 

namespace App\Services;

use App\Repositories\SpecialtyRepository;
use App\Repositories\ServiceRepository;
use App\Repositories\ResultRepository;
use App\Repositories\FeedbackRepository;
use App\Repositories\DoctorRepository;

class SearchService
{
    protected $specialtyRepo;
    protected $serviceRepo;
    protected $resultRepo;
    protected $feedbackRepo;
    protected $doctorRepo;

    public function __construct(
        SpecialtyRepository $specialtyRepo,
        ServiceRepository $serviceRepo,
        ResultRepository $resultRepo,
        FeedbackRepository $feedbackRepo,
        DoctorRepository $doctorRepo
    ) 
    {
        $this->specialtyRepo = $specialtyRepo;
        $this->serviceRepo = $serviceRepo;
        $this->resultRepo = $resultRepo;
        $this->feedbackRepo = $feedbackRepo;
        $this->doctorRepo = $doctorRepo;
    }

    public function searchAll(string $query): array
    {
        return [
            'specialties' => $this->specialtyRepo->search($query),
            'services'    => $this->serviceRepo->search($query),
            'results'     => $this->resultRepo->search($query),
            'feedbacks'   => $this->feedbackRepo->search($query),
            'doctors'     => $this->doctorRepo->search($query),
        ];
    }
}





