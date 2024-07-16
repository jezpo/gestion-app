<?php

namespace Modules\Documentos\Entities;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categorias';

    public function programas()
    {
        return $this->hasMany(Programa::class, 'id_categoria');
    }
}
