<?php

namespace Modules\Documentos\Entities;

use Illuminate\Database\Eloquent\Model;

class TipoDocumento extends Model
{
    protected $table = 'tipo_documento';

    public function documentos()
    {
        return $this->hasMany(Documento::class, 'id_tipo_documento');
    }
}