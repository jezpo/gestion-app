var urlFunc =  $("#urlAjx").val();
var date = new Date();

function headCsfr(){
    $.ajaxSetup({
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}
function searchRu(){
    headCsfr();
    parametros = {
        'type'  : $('#type').val(),
        'ru'    : $('#ru').val(),
    };
    $.ajax({
        data    : parametros,
        url     : urlFunc,
        type    : 'POST',
        beforeSend  : function(){
            $('#searchList').html('<h3>Procesando...</h3>');
        },
        success     : (response)=>{
            if(response == 'sn/tiempo')
                $('#searchList').html('<h3>Expediente no presentado/Los tiempos de presentacion de la convocatoria vencieron</h3>');
            else{
                if(response == 'sn/declaracion')
                    $('#searchList').html('<h3>Expediente no presentado/Declacion jurada no esta llenado</h3>');
                else
                    recepTab(response);
            }
        }
    });
}
function reportRecep(){
    headCsfr();
    parametros = {
        'ts'    : $('#tts').val(),
        'type'  : $('#type').val(),
        'career': $('#career').val(),
        'dateIn': $('#dateIn').val(),
        'dateFn': $('#dateFn').val(),
    };
    $.ajax({
        data    : parametros,
        url     : urlFunc,
        type    : 'POST',
        beforeSend  : ()=>{
            $('#report').html('<h3>Procesando...</h3>');
        },
        success : (response)=>{
            repRecepTab(response);
        }
    });
}
function recepcionarDoc(id_conv,id_alumno, ra, age, post, ref){
    headCsfr();
    parametros = {
        'id_convocatoria': id_conv,
        'id_alumno' : id_alumno,
        'ra'        : ra,
        'age'       : age,
        'post'      : post,
        'obs'       : $('#obs').val(),
        'period'    : $('#period').val(),
    };
    $.ajax({
        data    : parametros,
        url     : ref,
        type    : 'POST',
        success : (response)=>{
            swal({
                icon: "success",
                title: response
            });
            document.getElementById("ru").value = "";
        }
    });
}

function recepTab(Postulante){
    if(Postulante.post=='A')
        post='Beca Alimentación';
    else if(Postulante.post=='I')
        post='Beneficio Internado Universitario';
    if(date.toLocaleString('en-US',{month:'numeric'})<6)
        periodo = 1;
    else
        periodo = 2;
    html = '<h2>Detalle del Postulante</h2>'+
            '<div class="col-md-8 offset-md-2"><table  class="table table-hover"><tbody><tr><th>Apelidos y Nombres</th><td>'+
            Postulante.paterno+' '+
            Postulante.materno+', '+
            Postulante.nombres+'</td><th>Ci</th><td>'+
            Postulante.ci+
            '</td></tr><tr><th>Facultad</th><td>'+
            Postulante.facultad+
            '</td><th>Carrera</th><td>'+
            Postulante.carrera+
            '</td></tr><tr><th>Fecha de nacimiento:</th><td>'+
            Postulante.fec_nac+
            '</td><th></th><td></td></tr><tr><th>Postulación</th><th>'+
            post+
            '</th><th>Periodo de recepcion</th><th>'+
            '<select name="" id="period" class="form-control"><option value="'+
            Postulante.id_periodo+'">'+Postulante.id_periodo+
            '</option><option value="1">1</option><option value="2">2</option></select>'+
            '</th></tr></tbody></table></div>';
    if(Postulante.id_recep == null)
        html +=
            '<br><div class="col-md-12"><div class="input-group"><div class="input-group-prepend"><span class="input-group-text">Observación Trabajadora Social</span></div><input type="text" id="obs" class="form-control" value="" placeholder="Ingrese texto aqui..."/></div></div><hr><input type="hidden" id="urlForm"  value="'+Postulante.url+'">'+
            '<div id="fomrEst"></div><button type="submit" onclick="formularioAnt('+
            "'"+Postulante.ru+"','"+Postulante.id_ra+"','"+Postulante.age+"','"+Postulante.post+"'"+
            ');" class="btn btn-lime"><i class="fas fa-eye fa-sm"></i> Ver Formulario</button>'+
            '<button class="btn btn-success" type="submit" onclick="recepcionarDoc('+"'"+Postulante.id_conv+"','"+Postulante.bc+"','"+Postulante.id_ra+"','"+Postulante.age+"','"+Postulante.post+"','"+Postulante.urlRep+"'"+')"><i class="fas fa-check-square fa-sm"></i> Recepcionar</button><br><hr><div id="form"></div>';
    else
        html += '<hr> <h3>Expediente ya recepcionado... </h3>';
    $('#searchList').html(html);
}
function formularioAnt(ru,ra,age,post){
    headCsfr();
    parametros = {
        'id_alumno' : ru,
        'id_ra'     : ra,
        'age'       : age,
        'post'      : post,
    };
    $.ajax({
        data    : parametros,
        url     : $('#urlForm').val(),
        type    : 'POST',
        beforeSend  : ()=>{
            $('#form').html('<h3>Procesando...</h3>');
        },
        success     : (response)=>{
            console.log(response);
            formularioAntHtml(response);

        }
    });
}
function formularioAntHtml(formulario){
    groupFam='', groupAp='',groupDep='',cont1=1,cont2=1,ap=0;
    hoy = new Date();
    formulario.family.forEach((element, i) => {
        groupFam+='<tr>'+
        '<td>'+(i+1)+'</td>'+
        '<td>'+element.paterno+' '+element.materno+', '+element.nombres+'</td>'+
        '<td>'+((new Date()).getFullYear()-(new Date(element.fech_nac)).getFullYear())+'</td>'+
        '<td>'+element.parentesco+'</td>'+
        '<td>'+element.grado_ins+'</td>'+
        '<td>'+element.estado_civ.estado_civil+'</td>'+
        '<td>'+element.ocupacion+'</td>'+
        '</tr>';
        if(element.establecimiento!=""){
            groupDep+='<tr>'+
            '<td>'+cont1+'</td>'+
            '<td>'+element.paterno+' '+element.materno+', '+element.nombres+'</td>'+
            '<td>'+element.establecimiento+'</td>'+
            '<td>'+element.curso+'</td>'+
            '</tr>';
            cont1++;
        }
        if(element.aportador!= null){
            groupAp+='<tr>'+
            '<td>'+cont2+'</td>'+
            '<td>'+element.paterno+' '+element.materno+', '+element.nombres+'</td>'+
            '<td>'+element.salario+'</td>'+
            '</tr>';
            cont2++;ap+=parseInt(element.salario);
        }
    });
    html='<div class="div"><ul class="nav nav-pills"><li class="nav-items"><a href="#nav-pills-tab-1" data-toggle="tab" class="nav-link active"><span class="d-sm-none">Datos</span><span class="d-sm-block d-none">Datos del Solicitante</span></a></li><li class="nav-items"><a href="#nav-pills-tab-2" data-toggle="tab" class="nav-link"><span class="d-sm-none">Familia</span><span class="d-sm-block d-none">Datos de la Familia</span></a></li><li class="nav-items"><a href="#nav-pills-tab-3" data-toggle="tab" class="nav-link"><span class="d-sm-none">DJ</span><span class="d-sm-block d-none">Declaracion Jurada</span></a></li></ul>'+
    '<div class="tab-content"><div class="tab-pane fade active show" id="nav-pills-tab-1"><h3 class="m-t-10">Datos del Solicitante</h3><div class="table-responsive"><table class="table table-striped"><tbody><tr><th colspan="8">NOMBRE COMPLETO</th></tr><tr>'+
    '<td colspan="2">'+formulario.paterno+'</td>'+
    '<td colspan="2">'+formulario.materno+'</td>'+
    '<td colspan="2">'+formulario.nombres+'</td>'+
    '<td>'+formulario.apConyuge+'</td>'+
    '<td>'+formulario.ciConyuge+'</td>'+
    '</tr><tr><td colspan="2">Apellido Paterno</td><td colspan="2">Apellido Materno</td><td colspan="2">Nombres</td><td >Apellido Cónyuge</td><td> Ci Cónyuge</td></tr><tr><th colspan="4">FECHA DE NACIMIENTO</th><th colspan="4">LUGAR DE NACIMIENTO</th></tr><tr><td></td>'+
    '<td>'+(new Date(formulario.fec_nac)).getDate()+'</td>'+
    '<td>'+((new Date(formulario.fec_nac)).getMonth()+1)+'</td>'+
    '<td>'+(new Date(formulario.fec_nac)).getFullYear()+'</td>'+
    '<td>'+formulario.lugar.Country+'</td>'+
    '<td>'+formulario.lugar.Departament+'</td>'+
    '<td>'+formulario.lugar.Municipality+'</td>'+
    '<td>'+formulario.lugar.Province+'</td>'+
    '</tr><tr><td></td><td>Día</td><td>Mes</td><td>Año</td><td>Pais</td><td>Departamento</td><td>Provincia</td><td>Localidad</td></tr><tr><th colspan="2">CI</th><th colspan="2">SEXO</th><th colspan="2">ESTADO CIVIL</th><th colspan="2">TELEFONO</th></tr><tr>'+
    '<td colspan="2">'+formulario.ci+'</td>'+
    '<td colspan="2">'+formulario.sexo+'</td>'+
    '<td colspan="2">'+formulario.stateCiv+'</td>'+
    '<td colspan="2">'+formulario.phone1+' / '+formulario.phone2+'</td>'+
    '</tr><tr><th colspan="8">DOMICILIO ACTUAL DEL ESTUDIANTE</th></tr><tr>'+
    '<td colspan="2">'+formulario.direccion+'</td>'+
    '<td colspan="2">'+formulario.zona+'</td>'+
    '<td colspan="2">'+formulario.typeHome+'</td>'+
    '<td colspan="2"></td></tr><tr><td colspan="2">Calle</td><td colspan="2">Zona</td><td colspan="2">Tipo de Vivienda</td><td colspan="2"></td></tr><tr><th colspan="2">FACULTAD</th><th colspan="2">CARRERA</th><th colspan="2">RU</th><th colspan="2">INGRESO A LA UNIVERSIDAD</th></tr><tr>'+
    '<td colspan="2">'+formulario.faculty+'</td>'+
    '<td colspan="2">'+formulario.career+'</td>'+
    '<td colspan="2">'+formulario.ru+'</td>'+
    '<td colspan="2">'+formulario.dateInU+'</td>'+
    '</tr><tr><th colspan="8">MOTIVO</th></tr><tr>'+
    '<td colspan="8">'+formulario.motive+'</td>'+
    '</tr></tbody></table></div></div><div class="tab-pane fade" id="nav-pills-tab-2"><h3 class="m-t-10">Datos de la familia</h3><div class="table-responsive"><table class="table table-striped"><tbody><tr><th colspan="4">DOMICILIO RADICATORIA DE LOS PADRES</th></tr><tr>'+
    '<td>'+formulario.localidadF+'</td>'+
    '<td>'+formulario.direccionF+'</td>'+
    '<td>'+formulario.zonaF+'</td>'+
    '<td>'+formulario.typeHomeF+'</td>'+
    '</tr><tr>'+
    '<td>Localidad</td>'+
    '<td>Dirección</td>'+
    '<td>Zona</td>'+
    '<td>Tipo de Vivienda</td>'+
    '</tr><tr><th>Telefono Familiar</th>'+
    '<th colspan="3"></th>'+
    '</tr>'+
    '<tr>'+
    '<td>'+formulario.phoneF+'</td>'+
    '<td colspan="3"></td>'+
    '</tr>'+
    '</tbody>'+
    '</table>'+
    '<h6><strong>  GRUPO FAMILIAR</strong></h6>'+
    '<table class="table table-striped">'+
    '<thead>'+
    '<tr>'+
    '<th>N°</th>'+
    '<th>Nombres y Apellidos</th>'+
    '<th>Edad</th>'+
    '<th>Parentesco</th>'+
    '<th>Grado de Instrucción</th>'+
    '<th>Estado Civil</th>'+
    '<th>Ocupación</th>'+
    '</tr>'+
    '</thead>'+
    '<tbody>'+
    groupFam+
    '</tbody>'+
    '</table>'+
    '<h6><strong>  HIJOS DEPENDIENTES</strong></h6>'+
    '<table class="table table-striped">'+
    '<thead>'+
    '<tr>'+
    '<th>N°</th>'+
    '<th>Nombres y Apellidos</th>'+
    '<th>Establecimiento</th>'+
    '<th>Curso</th>'+
    '</tr>'+
    '</thead>'+
    '<tbody>'+
    groupDep+
    '</tbody>'+
    '</table>'+
    '<h6><strong>  APORTADORES</strong></h6>'+
    '<table class="table table-striped">'+
    '<thead>'+
    '<tr>'+
    '<th>N°</th>'+
    '<th>Nombres y Apellidos</th>'+
    '<th>Monto</th>'+
    '</tr>'+
    '</thead>'+
    '<tbody>'+groupAp+
    '</tbody><tfoot><tr>'+
    '<td colspan="2">TOTAL</td>'+
    '<td>'+ap+'</td>'+
    '</tr></tfoot></table></div></div><div class="tab-pane fade" id="nav-pills-tab-3"><h3 class="m-t-10">Declaración Jurada</h3><div class="table-responsive"><table class="table table-striped"><tbody><tr>'+
    '<th>Situacion Social e Ingreso Ecónomico</th>'+
    '</tr><tr>'+
    '<td>'+formulario.declaracion+'</td>'+
    '</tr>'+
    '<tr>'+
    '<th>Tenencia Familiar</th>'+
    '</tr>'+
    '<tr>'+
    '<td>'+formulario.dec_vivienda+'</td>'+
    '</tr>'+
    '<tr>'+
    '<th>Estudios</th>'+
    '</tr>'+
    '<tr>'+
    '<td>'+formulario.dec_estudios+'</td>'+
    '</tr>'+
    '</tbody>'+
    '</table>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    $('#form').html(html);
}
function repRecepTab(list){
    console.log(list);
    if(list[0].count){
        tab='<table class="table" id="repRecep"><thead><tr>'+
            '<th>Nº</th>'+
            '<th>Carrera</th>'+
            '<th>Cantidad</th>'+
            '</tr></thead><tbody>';
        sum=0;
        n=0;
        list.forEach((element,i)=>{
            n=i+1;
            tab += '<tr><td>'+n+'</td>'+
                    '<td>'+element.career+'</td>'+
                    '<td>'+element.count+'</td></tr>';
            sum += element.count;
        });
        tab +=  '<tr><td>'+(n+1)+'</td>'+
                '<th>Total</th>'+
                '<th>'+sum+'</th>'+
                '</tr></tbody></table>';
    }
    else{
        list=list.sort((a, b)=>{
            if (a.names > b.names) {
            return 1;
            }
            if (a.names < b.names) {
            return -1;
            }
            return 0;
        });
        list=list.sort((a, b)=>{
            if (a.career > b.career) {
            return 1;
            }
            if (a.career < b.career) {
            return -1;
            }
            return 0;
        });
        tab='<table class="table" id="repRecep"><thead><tr>'+
        '<th>Nº</th>'+
        '<th>Ci</th>'+
        '<th>Apellidos y Nombres</th>'+
        '<th>Carrera</th>'+
        '<th>Fecha Recepcion</th>'+
        '</tr></thead><tbody>';
        list.forEach((element,i) => {
            tab+='<tr><td>'+(i+1)+'</td>'+
                    '<td>'+element.ci+'</td>'+
                    '<td>'+element.names+'</td>'+
                    '<td>'+element.career+'</td>'+
                    '<td>'+element.date+'</td></tr>';
        });
        tab+='</tbody></table>';
    }

    if($('#type').val()=='A')
        post = 'Beca Alimentación';
    else if($('#type').val()=='I')
        post = 'Beneficio Internado';
    $('#report').html(tab);
    $('#repRecep').DataTable({
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'pdf',
                text: 'pdf',
                className: 'btn-sm',
                download :'open',
                customize: function(doc){
                    if(list[0].ban==='general'){
                        headerSm(doc,'  ');
                    }else{
                        header(doc,'Lista de investigación','Trabajadora Social','Lista de investigaciones pendientes');
                    }       
                    doc.content.splice(0,1,{
                        alignment:'center',
                        text:'Reporte de Recepcion de Expedientes',
                        fontSize: 15,
                        bold: true
                    });
                    doc.content.splice(1,0,{
                        margin:[0,5,0,10],
                        columns:[{
                            width:'100%',
                            columns:[
                                {text:[{text: 'POSTULACIÓN: \n FECHA INICIAL: ',bold:true}]},
                                {text:post+'\n'+$('#dateIn').val()},
                                {text:[{text: '\n FECHA FINAL: ',bold:true}]},
                                {text:'\n'+$('#dateFn').val()}
                            ],
                        }]
                    });
                },
            },{
                extend: 'copy',
                text: 'Copiar',
                className: 'btn-sm'
            }
        ]
    });
}
