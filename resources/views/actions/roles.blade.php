<div class="btn-group dropup m-r-5 m-b-5">
    <a href="javascript:;" class="btn btn-primary">Acción</a>
    <a href="#" data-toggle="dropdown" class="btn btn-primary dropdown-toggle"><b class="caret"></b></a>
    <div class="btn  dropdown-menu dropdown-menu-right">
        {{-- <a class="dropdown-item" href="{{ URL::to('users/' . $id) }}" data-toggle="tooltip" title="Show">
            <i class="fas fa-eye fa-sm"></i> Ver
        </a> --}}
        <a class="dropdown-item" href="{{ route('roles.edit', $id) }}" data-toggle="tooltip" title="Edit">
            <i class="fas fa-edit fa-sm"></i> Editar
        </a>
        <form method="post" action="{{route('roles.destroy', $id)}}"  accept-charset="utf-8" data-toggle="tooltip" title="Eliminar Rol">
            {{ csrf_field() }}
            {{ method_field('DELETE') }}
            <a class="btn dropdown-item" type="button" style="width: 100%; color: red;" data-toggle="modal" data-target="#confirmDelete" data-title="Eliminar Rol" data-message="¿Está seguro de que desea eliminar rol: {{$name}} ?" >
                <i class="fas fa-trash fa-sm"></i> Eliminar
            </a>
        </form>
    </div>
</div>
