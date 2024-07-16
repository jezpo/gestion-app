<?php

namespace Modules\Documentos\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Documentos\Database\factories\NotificacionFactory;

namespace Modules\Documentos\Entities;

use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    protected $table = 'notificaciones';

    public function documento()
    {
        return $this->belongsTo(Documento::class, 'id_documento');
    }
}
