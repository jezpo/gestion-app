var urlFunc =  $("#urlAjx").val();

function headCsfr(){
    $.ajaxSetup({
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}
function checks(form,array){
    checks = new Array();
    for (var i = 0, total = (document.getElementsByName(array)).length; i < total; i++){
      if (document.getElementsByName(array)[i].checked)
         checks[checks.length] = document.getElementsByName(array)[i].value;
     }
     return checks.join(",");
 }

function verifyInv(tip){
    var parametros={
        "typeForm":tip,
        "gestion":document.getElementById("id_gestion").value,
        "periodo":document.getElementById("id_periodo").value,
        "typeInv":document.getElementById("cssRadio1").checked,
        "rus":document.getElementById("rus").value
    };
    headCsfr();
    $.ajax({
        data: parametros,
        url: document.getElementById("urlVerLis").value,
        type: 'POST',
        beforeSend:function(){
            if(tip=='verify'){
                $("#lisVerify").html("<h1>Cargando</h1>");
            }
            else if(tip=='aggregate'){
                $("#obsInv").html("<h1>Cargando</h1>");
            }
        },
        success: function(response){
            var aux=response;
            if(tip=='verify'){
                $("#lisVerify").html(aux);
            }
            else if(tip=='aggregate'){
                $("#obsInv").html(aux);
            }
        }
    });
}
function verAssign(){
    chekeds=checks(document.checked,'assign[]');
    var parametros={
        'checked': chekeds,
        'ts': document.getElementById("tsInv").value,
    };
    headCsfr();
    $.ajax({
        data: parametros,
        url: document.getElementById("assignmentInv").value,
        type: 'POST',
        beforeSend:function(){
            $("#lisAssingnment").html("<h1>Cargando</h1>");
        },
        success: function(response){
            var aux=response;
            $("#lisAssingnment").html(aux);
        }
    });
}
function Asignar(){
    chekeds=checks(document.checked,'assign[]');
    var parametros={
        'checked': chekeds,
        'ts': document.getElementById("tsInv").value,
    };
    headCsfr();
    $.ajax({
        data: parametros,
        url: document.getElementById("assignmentInv").value,
        type: 'POST',
        success: function(response){
            $('#tableInv').DataTable().ajax.reload();
            $('#tableAsig').DataTable().ajax.reload();
            $("#lisAssingnment").html(response);
        }
    });
}
function listSearch(){
    console.log(document.getElementById("urlSBA").value);
    if( $("#comission_id").length){
        id_com = document.getElementById('comission_id').value;
    }
    else{
        id_com = 0;
    }
    var parametros={
        'caerrer': document.getElementById("caerrer").value,
        'age': document.getElementById("age").value,
        'comission': id_com,
    };
    headCsfr();
    $.ajax({
        data: parametros,
        url: document.getElementById("urlSBA").value,
        type: 'POST',
        beforeSend:function(){
            $("#searchList").html("<h1>Cargando</h1>");
        },
        success: function(response){
            var aux=response;
            $("#searchList").html(aux);
        }
    });
}
function assignmentInvTS(action){
    var parametros={
        'accion':'asignar',
        'age': document.getElementById('age').value,
        'type': action,
    };
    headCsfr();
    $.ajax({
        data: parametros,
        url: document.getElementById("urlAssInTs").value,
        type: 'POST',
        beforeSend:function(){
            $("#action2").html("<h1>Cargando</h1>");
        },
        success: function(response){
            assingmentInvTsPdf(action,response);
            $("#action2").html("<h3>Ejecutado con Exito</h3>");

        }
    });
}
function addParInv(){
    var parametros={
        'cod' : document.getElementById("cod").value,
        'parameter' : document.getElementById("parameter").value,
        'state' : document.getElementById("state").value,
    }
    headCsfr();
    $.ajax({
        data: parametros,
        url: urlFunc,
        type: 'POST',
        beforeSend:function(){
            $("#result").html("<h1>Cargando</h1>");
        },
        success: function(response){
            var aux=response;
            $("#result").html("<h3>Agregado...</h3>");
        }
    });
}
function stateParInv(id){
    var parametros={
        'id' : id,
        'state' : document.getElementById("est-"+id).value,
    }
    alert(document.getElementById("est-"+id).value);
    headCsfr();
    $.ajax({
        data: parametros,
        url: document.getElementById("urlAjx2").value,
        type: 'POST',
        beforeSend:function(){
            $("#result").html("<h1>Cargando</h1>");
        },
        success: function(response){
            $("#result").html("<h3>Actualizado...</h3>");
        }
    });
}
function stateInv(id){
    var parametros={
        'id' :id,
        'estado' : document.getElementById("estado").value
    }
    headCsfr();
    $.ajax({
        data: parametros,
        url: urlFunc,
        type: 'POST',
        beforeSend:function(){
            $("#result").html("<h1>Cargando</h1>");
        },
        success: function(response){
            $("#result").html('<div class="alert alert-success fade show m-b-0"><span class="close" data-dismiss="alert">&times;</span>Actualizado...</div>');
        }
    });
}
function saveInvSoc(){
    parametros={
        'inv' : $("#id_edit").val(),
        'ref_caso': $("#ref_caso").val(),
        'ant_familia': $("#ant_familia").val(),
        'sit_act_estudiante': $("#sit_act_estudiante").val(),
        'concep_social': $("#concep_social").val(),
        'sugerencia' : $("#sugerencia").val(),
    };
    headCsfr();
    $.ajax({
        data:parametros,
        url: urlFunc,
        type: 'POST',
        success: function(response){
            if(response==='OK'){
                swal({
                    icon: "success",
                    title: "Modificado Correctamente"
                });
            }else{
                swal({
                    icon: "error",
                    title: response
                });
            }
        }
    });
}
function saveInvFin(){
    parametros={
        'inv' : $("#id_edit").val(),
        'ref_caso': $("#ref_caso").val(),
        'ant_familia': $("#ant_familia").val(),
        'sit_act_estudiante': $("#sit_act_estudiante").val(),
        'concep_social': $("#concep_social").val(),
        'sugerencia' : $("#sugerencia").val(),
    };
    headCsfr();
    $.ajax({
        data:parametros,
        url: document.getElementById("urlAjx2").value,
        type: 'POST',
        success: function(response){
            if(response==='OK'){
                swal({
                    icon: "success",
                    title: "Guardado Correctamente"
                });
                setTimeout(function(){
                    location.reload();
                }, 2000);
            }else{
                swal({
                    icon: "error",
                    title: response
                });
            }
        }
    });
}
function reportInv(){
    parametros={
        'id_ts'     : $('#ts').val(),
        'caerrer'   : $('#caerrer').val(),
        'type'      : $('#typeInv').val(),
        'indate'    : $('#indate').val(),
        'fndate'    : $('#fndate').val(),
        'gestion'   : $('#gestion').val(),
    };
    headCsfr();
    $.ajax({
        data:parametros,
        url: urlFunc,
        type: 'POST',
        beforeSend:function(){
            $("#result").html("<h1>Cargando</h1>");
        },
        success: function(response){
            var aux=response;
            $("#result").html("<p>"+aux+"</p>");
        }
    });
}
function insertComission(){
    parametros={
        'id_comission' : document.getElementById('id_comission').value,
        'id_career' : document.getElementById('id_career').value,
        'dictTitulo' : document.getElementById('dictTitulo').value,
        'dictType' : document.getElementById('dictType').value,
        'dictDate' : document.getElementById('dictDate').value,
        'dcType' : document.getElementById('dcType').value,
        'ci' : document.getElementById('ci').value,
        'apPat' : document.getElementById('apPat').value,
        'apMat' : document.getElementById('apMat').value,
        'names' : document.getElementById('names').value,
        'dateNac' : document.getElementById('dateNac').value,
        'lugNac' : document.getElementById('lugNac').value,
        'sex' : document.getElementById('sex').value,
        'phone' : document.getElementById('phone').value,
    };
    headCsfr();
    $.ajax({
        data:parametros,
        url: urlFunc,
        type: 'POST',
        beforeSend:function(){
            $("#result").html("<h1>Cargando</h1>");
        },
        success: function(response){
            alert('procedimiento exitoso..');
            location.reload();
        }
    });
}
function downComission(id){
    parametros={
        'id_dictComission': id,
    }
    headCsfr();
    $.ajax({
        data:parametros,
        url: document.getElementById('urlAjx2').value,
        type: 'POST',
        success: function(response){
            alert('procedimiento exitoso..');
            location.reload();
        }
    });
}
function presiComission(id){
    parametros={
        'id_comission':document.getElementById('id_comission').value,
        'id_dictComission': id,
    }
    console.log(parametros);
    headCsfr();
    $.ajax({
        data:parametros,
        url: document.getElementById('urlAjx3').value,
        type: 'POST',
        success: function(response){
            alert(response);
            location.reload();
        }
    });
}
function califComission(){
    camp = document.getElementById("campos").value;
    camp = camp.split('-');
    const aux= [];
    for(var i=0; i<camp.length-1; i++){
        let elementoActivo = document.querySelector('input[name='+camp[i].trim()+']:checked');
        if(elementoActivo) {
            aux.push([camp[i].trim(),elementoActivo.value]);
        } else {
            aux.push([camp[i].trim(),0]);
        }
        
    }
    parametros={
        'id_bc'     : document.getElementById('id_bc').value,
        'parAcad'   : document.getElementById('parAcad').value,
        'acad'      : document.getElementById('rendAcad').value,
        'obs'       : document.getElementById('obsBc').value,
        'state'     : document.getElementById('stateBc').value,
        'inv'       : document.getElementById('invBc').value,
        'values'    : aux,
    }
    headCsfr();
    $.ajax({
        data:parametros,
        url: urlFunc,
        type: 'POST',
        success: function(response){
            if(response==='OK'){
                swal({
                    icon: "success",
                    title: "Procedimiento exitoso..."
                });
            }else{
                swal({
                    icon: "error",
                    title: response
                });
            }
        }
    });
}
function verAlimList(){
    parametros = {
        'ids'   : document.getElementById('idBcVer').value
    }
    headCsfr();
    $.ajax({
        data    : parametros,
        url     : document.getElementById('urlAjax5').value,
        type    : 'POST',
        success : function(response){
            alert(response);
        }
    });
}
function informComission(){
    parametros={
        'career'       : document.getElementById('caerrer').value,
        'infMotive'    : document.getElementById('motInf').value,
        'comission_id' : document.getElementById('comission_id').value,
        'age'          : document.getElementById('age').value,
    }
    headCsfr();
    $.ajax({
        data    : parametros,
        url     : document.getElementById('urlAjax2').value,
        type    : 'POST',
        success : function(response){
            alert(response);
            location.reload();
        }
    });
}
function informComissionUpdate(id){
    headCsfr();
    $.ajax({
        data    : {'id' : id},
        url     : $("#upInfCom").val(),
        type    : 'POST',
        success : function(response){
            alert(response);
        }
    });
}
function informComissionUpdateFin(id){
    headCsfr();
    a = '#dictName'+id;
    $.ajax({
        data    : {'id' : id,
                    'dictum'  : $('#dictName'+id).val(),
                    'date'    : $('#dictDate'+id).val(),
                  },
        url     : $("#urlAjxF").val(),
        type    : 'POST',
        success : function(response){
            alert(response);
        }
    });
}
function printComission(id,type){
    headCsfr();
    parametros = { 'id' : id  },
    $.ajax({
        data    : parametros,
        url     : document.getElementById('urlAjax3').value,
        type    : 'POST',
        success : function(response){
            if(type=='PDF')
                inforComissionPdf(response);
            else if(type=='EXCEL')
                inforComissionExcel(response);
        }
    });
}

function pdfCalifEst(){
    headCsfr();
    parametros = {
        'id'        :document.getElementById('id_bc').value,
        'history'   : document.getElementById('rendAdHys').value,
        'parAcad'   : document.getElementById('parAcad').value,
    },
    $.ajax({
        data    : parametros,
        url     : document.getElementById('urlAjax2').value,
        type    : 'POST',
        success : function(response){
            califIndAlimPdf(response);
        }
    });
}
function segAcadCom(){
    headCsfr();
    var carrera = document.getElementById("career");
    var programa = carrera.options[carrera.selectedIndex].text;
    parametros = {
        'career'    : $("#career").val(),
        'age'       : $("#age").val(),
        'ageSeg'    : $("#ageSA").val(),
        'period'    : $("#period").val(),
        'programa'  : programa,
    };
    $.ajax({
        data        : parametros,
        url         : urlFunc,
        type        : 'POST',
        beforeSend  : function(){
            $('#searchList').html('<h3>Procesando...</h3>');
        },
        success     : function(response){
            tabSegAcad(response,parametros);
        }
    });
}
function viewInfInv(){
    headCsfr();
    $.ajax({
        data    : {'id':$("#inform").val()},
        url     : $('#urlVII').val(),
        type    : 'POST',
        success : (response)=>{
            console.log(response);
            listInfInv(response);
        }
    });
}
function valInfInv(){
    var parametros={
        "typeForm":'aggregate',
        "age":$('#ageInf').val(),
        "typeInv":true,
        "rus":document.getElementById("rusInf").value
    };
    headCsfr();
    $.ajax({
        data: parametros,
        url: document.getElementById("urlVerLis").value,
        type: 'POST',
        success: function(response){
                $("#confList").html(response);
        }
    });
}
