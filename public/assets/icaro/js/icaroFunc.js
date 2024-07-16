function tabSegAcad(response, parametros){
    let convocatoria=response.convocatorias;
    let ban=0;
    var colores = ["btn btn-info", "btn btn-warning","btn btn-info", "btn btn-warning","btn btn-indigo"];
    let conv='<div class="container text-center mt-5"><div class="btn-group dropup">  <a href="javascript:;" class="btn btn-info"><i class="fas fa-print fa-sm"></i>  Imprimir Listas</a> <a href="#" data-toggle="dropdown" class="btn btn-info dropdown-toggle"><b class="caret"></b></a>  <div class="dropdown-menu dropdown-menu-right">';
    convocatoria.forEach(element => {
        conv=conv+'<a href="'+element['urlCalif']+'" target="_blank" class="dropdown-item">'+element.descripcion+'</a>&nbsp;';
        ban++;
    });
    conv=conv+ '</div> </div> </div>';
    tab=conv;
    tab=tab+'<div class="table-responsive"><table id="tableSegAcad" class="table table-striped table-bordered table-td-valign-middle dt-responsive"><thead><tr><th>Nº</th><th>Ci</th><th>Ap. Paterno</th><th>Ap. Materno</th><th>Nombres</th><th>Beca Alim.</th><th>Materias</th><th>Ru</th><th>Sit. Social</th><th>Sit. Acad</th><th>Puntaje</th><th>Observación</th><th>Opciones</th> </thead><tbody>';
    modals='';
    cont = 1;
    let datos=response.seguimiento;
    datos.forEach(element => {
        matAprob = 0;
        modals = modals+'<div class="modal fade" id="modal-'+element['ci']+'">';
        modals = modals+'<div class="modal-dialog" style="max-width: 50%;"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Detalle del Avance Académico</h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button></div><div class="modal-body"><h5>Estudiante</h5><table class="table table-striped "><tbody><tr><th>Ci</th><td>'+element['ci']+'</td></tr><tr><th>Nombres</th><td>'+element['paterno']+' '+element['materno']+', '+element['nombres']+'</td></tr><tr><th>Gestión</th><td>'+parametros['age']+'</td></tr><tr><th>Periodo</th><td>'+parametros['period']+'</td></tr></tbody></table><hr><h5>Notas</h5><div class="table-responsive"><table class="table table-striped table-bordered table-td-valign-middle dt-responsive " style="width:100%"><thead><tr><th class="text-nowrap">Sigla</th><th class="text-nowrap">Materia</th><th class="text-nowrap">1 Parcial</th><th class="text-nowrap">2 Parcial</th><th class="text-nowrap">3 Parcial</th><th class="text-nowrap">Ex. Final</th><th class="text-nowrap">Nota Final</th><th class="text-nowrap">2° Turno</th></tr></thead><tbody>';
        element['programacion'].forEach(element2 => {
            modals=modals+'<tr><td>'+element2.sigla+'</td>';
            modals=modals+'<td>'+element2.materia+'</td>';
            modals=modals+'<td>'+element2.pparcial+'</td>';
            modals=modals+'<td>'+element2.sparcial+'</td>';
            modals=modals+'<td>'+element2.tparcial+'</td>';
            modals=modals+'<td>'+element2.exfinal+'</td>';
            modals=modals+'<td>'+element2.nota+'</td>';
            modals=modals+'<td>'+element2.nota_2da+'</td></tr>';
            if(element2.nota>50 || element2.nota_2da>50){
                matAprob++;
            }
        });
        modals = modals+'</tbody></table></div></div><div class="modal-footer"><a href="javascript:;" class="btn btn-white" data-dismiss="modal">Cerrar</a></div></div></div></div>';
        mats = matAprob+"/"+element['programacion'].length;
        style = '';
        if(mats == "0/0")
            style = ' style="background-color: #ec1c24" ';
            //+'<a class="btn btn-sm btn-success" href="'+element['urlCalif']+'">Calificar</a>'
        tab=tab+'<tr'+style+'><td>'+cont+'</td><td>'+element['ci']+'</td><td>'+element['paterno']+'</td><td>'+element['materno']+'</td><td>'+element['nombres']+'</td><td>'+element['state']+'</td><td>'+mats+'</td><td>'+element['ru']+'</td><td>'+element['sit_social']+'</td><td>'+element['sit_acad']+'</td><td>'+element['total']+'</td><td>'+element['obs']+'</td><td>'+'<a class="btn btn-sm btn-success" href="'+element['urlCalif']+'">Calificar</a>'+'<a class="btn btn-sm btn-info" href="#modal-'+element['ci']+'" data-toggle="modal">Ver Programación</a>'+'</td></tr>';
        cont++;
    });
    tab=tab+'</tbody></table></div>'+modals;
    $('#searchList').html(tab);
    $("#tableSegAcad").css("width","100%");
    var table=$('#tableSegAcad').DataTable({
        dom: '<"dataTables_wrapper dt-bootstrap"<"row"<"col-xl-7 d-block d-sm-flex d-xl-block justify-content-center"<"d-block d-lg-inline-flex mr-0 mr-sm-3"l><"d-block d-lg-inline-flex"B>><"col-xl-5 d-flex d-xl-block justify-content-center"fr>>t<"row"<"col-sm-5"i><"col-sm-7"p>>>',
        language: {
            "url": "/assets/plugins/datatables.net/spanish.json"
        },
        responsive: true,
        fixedHeader: true,
        dom: 'lBfrtip',
        columnDefs: [
            { orderable: false, targets: 12 },
            {
                "targets": [11],
                "visible": false
            }
        ],
        buttons: [
            {
                extend: 'copy',
                text: 'Copiar',
                className: 'btn-sm'
            },
            { extend: 'excel', className: 'btn-sm',exportOptions: { columns: [ 0,1,2,3,4,5,6,7,9,10,11 ],  } },
        ]
    });
}
function listInfInv(parametros){
    list='';
    parametros.list.forEach((element,i) => {
        list+='<tr>'+
        '<td>'+(i+1)+'</td>'+
        '<td>'+element.ci+'</td>'+
        '<td>'+element.names+'</td>'+
        '<td>'+element.ru+'</td>'+
        '<td>'+element.obs+'</td></tr>';
    });
    html='<table class="table table-striped"><tbody><tr><th>CODIGO:</th>'+
    '<td><strong>'+parametros.head.cod+'</strong></td><th></th><td></td></tr><tr><th>Carrera:</th>'+
    '<td>'+parametros.head.career+'</td>'+
    '<th>Gestion:</th>'+
    '<td>'+parametros.head.age+'</td>'+
    '</tr><tr><th>Motivo:</th>'+
    '<td>'+parametros.head.motive+'</td>'+
    '<th>Fecha:</th>'+
    '<td>'+parametros.head.fecha+'</td>'+
    '</tr><tr><th>Dictamen:</th>'+
    '<td>'+parametros.head.dictum+'</td>'+
    '<th>Fecha:</th>'+
    '<td>'+parametros.head.dictumFec+'</td>'+
    '</tr></tbody></table><hr><h4>Lista de Investigaciones</h4>'+
    '<table class="table table-striped"><thead><tr><th>N°</th><th>Ci</th><th>Apellidos y Nombres</th><th>R.U.</th><th>Observaciones</th></tr></thead><tbody>'+
    list+'</tbody></table><hr>'+
    '<input type="hidden" id="rusInf" value="'+parametros.rus+'">'+
    '<input type="hidden" id="ageInf" value="'+parametros.head.age+'">'+
    '<button class="btn btn-success" type="submit" onclick="valInfInv();">Validar</button><hr><div id="confList"></div>';
    $('#listInv').html(html);
}
