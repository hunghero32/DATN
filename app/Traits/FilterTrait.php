<?php
namespace App\Traits;

use Illuminate\Http\Request;

trait FilterTrait
{
    public function applyFilters($query, Request $request, array $filterableFields)
    {
        foreach ($filterableFields as $field) {
            if ($request->filled($field)) {
                $value = $request->input($field);

                // Kiểm tra nếu giá trị có dạng khoảng (min-max)
                if (preg_match('/^(\d+)-(\d+)$/', $value, $matches)) {
                    $query->whereBetween($field, [(int) $matches[1], (int) $matches[2]]);
                }
                // Kiểm tra nếu giá trị có dạng "value+" (Lớn hơn hoặc bằng)
                elseif (preg_match('/^(\d+)\+$/', $value, $matches)) {
                    $query->where($field, '>=', (int) $matches[1]);
                }
                // Mặc định lọc bằng LIKE
                else {
                    $query->where($field, 'LIKE', "%$value%");
                }
            }
        }
        return $query;
    }
}
