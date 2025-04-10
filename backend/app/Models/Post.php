<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    use HasFactory, SoftDeletes; // Kích hoạt chức năng xóa mềm

    protected $fillable = [
        'category_id',
        'user_id',
        'slug',
        'title',
        'content',
        'image',
        'views',
        'status',
        'published_at',
        'isDeleted',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    // Quan hệ với bảng Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    // Quan hệ với bảng User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    // Scope tìm kiếm theo title và content
    public function scopeSearch(Builder $query, $search)
    {
        return $query->when($search, function ($q) use ($search) {
            $q->where('title', 'like', "%$search%")
                ->orWhere('content', 'like', "%$search%");
        });
    }

    // Scope lọc theo category, status, published_at
    public function scopeFilter(Builder $query, $filters)
    {
        return $query->when($filters['category_id'] ?? null, fn($q, $id) => $q->where('category_id', $id))
            ->when($filters['status'] ?? null, fn($q, $status) => $q->where('status', $status))
            ->when($filters['published_at'] ?? null, fn($q, $date) => $q->whereDate('published_at', $date));
    }
    // Accessor để xử lý URL ảnh
    public function getImageAttribute($value)
    {
        if (!$value) {
            return $value; // Trả về null hoặc giá trị gốc nếu không có ảnh
        }
        if (str_starts_with($value, 'http')) {
            return $value; // Trả về nguyên gốc nếu đã là URL tuyệt đối
        }
        try {
            return Storage::disk('s3')->url($value); // Thử lấy URL từ S3
        } catch (\Exception $e) {
            return url('storage/' . $value); // Fallback về storage cục bộ nếu S3 thất bại
        }
    }
}
