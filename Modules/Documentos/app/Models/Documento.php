<?php

namespace Modules\Documentos\Entities;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $table = 'documentos';

    public function tipoDocumento()
    {
        return $this->belongsTo(TipoDocumento::class, 'id_tipo_documento');
    }

    public function programa()
    {
        return $this->belongsTo(Programa::class, 'id_programa');
    }

    public function tipoMovimiento()
    {
        return $this->belongsTo(TipoMovimiento::class, 'id_tipo_movimiento');
    }

    public function archivos()
    {
        return $this->hasMany(Archivo::class, 'id_documento');
    }

    public function notificaciones()
    {
        return $this->hasMany(Notificacion::class, 'id_documento');
    }
}
