<?php

namespace Modules\Documentos\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Documentos\Database\factories\ArchivoFactory;

namespace Modules\Documentos\Entities;

use Illuminate\Database\Eloquent\Model;

class Archivo extends Model
{
    protected $table = 'archivos';

    public function documento()
    {
        return $this->belongsTo(Documento::class, 'id_documento');
    }
}

