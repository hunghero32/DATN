<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = ['guest_id'];

    public function guest()
    {
        return $this->belongsTo(User::class, 'guest_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
