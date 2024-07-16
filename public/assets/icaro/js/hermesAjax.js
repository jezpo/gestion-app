function headCsfr(){
    $.ajaxSetup({
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}
$('#saveCorresp').click(()=>{
    var parametros = {
        'regFis'    : $('#regFis').val(),
        'type'      : $('#type').val(),
        'cite'      : $('#cite').val(),
        'ref'       : $('#ref').val(),
        'dateCorr'  : $('#dateCorr').val(),
        'remOf'     : $('#remOf').val(),
        'remName'   : $('#remName').val(),
        'remCargo'  : $('#remCargo').val(),
        'recOf'     : $('#recOf').val(),
        'recName'   : $('#recName').val(),
        'docDig'    : $('#docDig').val(),
        'anexos'    : $('#anexos').val(),
    }
    headCsfr();
    $.ajax({
        data    : parametros,
        url     : $('#urlAjax').val(),
        type    : 'POST',
        beforeSend: ()=>{
            $('#result').html('<h1> Procesando... </h1>');
            console.log(parametros.docDig);
        },
        success : (response)=>{
            console.log(response);
        }
    });
});
$('#searchCorrespondence').click(()=>{
    var parametros ={
        'correspondence'    : $('#correspondence').val(),
        'type'              : $('#type').val(),
        'unity'             : $('#unity').val(),
        'dateIn'            : $('#dateIn').val(),
        'dateFn'            : $('#dateFn').val(),
    }
    headCsfr();
    $.ajax({
        data    : parametros,
        url     : $('#urlAjx').val(),
        type    : 'POST',
        beforeSend: ()=>{
            console.log('holas');
        },
        success :   (response)=>{
            listCorrespondence(response);
        }
    });
});
function viewPdf(id){
    var parametros = {'id':id}
    headCsfr();
    $.ajax({
        data    : parametros,
        url     : $('#urlAjx2').val(),
        type    : 'GET',
        success : (response)=>{
            console.log('positvo');
        }
    });
}
