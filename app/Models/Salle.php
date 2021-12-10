<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    use HasFactory;

    public function id() {
        return $this->id;
    }

    public function libele() {
        return $this->libele;
    }

    public function place() {
        return $this->total_place;
    }
}
