<?php

namespace Modules\Documentos\Entities;

use Illuminate\Database\Eloquent\Model;

class TipoMovimiento extends Model
{
    protected $table = 'tipo_movimiento';

    public function documentos()
    {
        return $this->hasMany(Documento::class, 'id_tipo_movimiento');
    }
}

