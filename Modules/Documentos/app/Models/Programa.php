<?php

namespace Modules\Documentos\Entities;

use Illuminate\Database\Eloquent\Model;

class Programa extends Model
{
    protected $table = 'programas';

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_categoria');
    }

    public function documentos()
    {
        return $this->hasMany(Documento::class, 'id_programa');
    }
}
