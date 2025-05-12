<?php
namespace App\Repositories;

use App\Models\Doctor;

class DoctorRepository
{
    /**
     * 
     *
     * @param string 
     * @param int|null 
     * @param int|null 
     */
    public function search(string $query, ?int $specialty_id = null, ?int $min_exp = null)
    {
        $doctorQuery = Doctor::query()
            ->where('approve', true)
            ->where('isDeleted', false);

        if (!empty($query)) {
            $doctorQuery->where('doctor_name', 'like', '%' . $query . '%');
        }

        if (!is_null($specialty_id)) {
            $doctorQuery->where('specialty_id', $specialty_id);
        }

        if (!is_null($min_exp)) {
            $doctorQuery->where('exp', '>=', $min_exp);
        }

        return $doctorQuery->get();
    }
}
