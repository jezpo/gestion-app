<div class="btn-group dropup m-r-5 m-b-5">
    <a href="javascript:;" class="btn btn-primary">Acción</a>
    <a href="#" data-toggle="dropdown" class="btn btn-primary dropdown-toggle"><b class="caret"></b></a>
    <div class="btn  dropdown-menu dropdown-menu-right">
        {{-- <a class="dropdown-item" href="{{ URL::to('users/' . $id) }}" data-toggle="tooltip" title="Show">
            <i class="fas fa-eye fa-sm"></i> Ver
        </a> --}}
        <a class="dropdown-item" href="{{ route('permissions.edit', $id) }}" data-toggle="tooltip" title="Edit">
            <i class="fas fa-edit fa-sm"></i> Editar
        </a>
        <form method="post" action="{{route('permissions.destroy', $id)}}"  accept-charset="utf-8" data-toggle="tooltip" title="Eliminar Permiso" >
            {{ csrf_field() }}
            {{ method_field('DELETE') }}
            <a class="dropdown-item" type="button" style="width: 100%; color: red;" data-toggle="modal" data-target="#confirmDelete" data-title="Eliminar Permiso" data-message="¿Está seguro de que desea eliminar permiso: {{$name}} ?" >
                <i class="fas fa-trash fa-sm"></i> Eliminar
            </a>
        </form>
    </div>
</div>
