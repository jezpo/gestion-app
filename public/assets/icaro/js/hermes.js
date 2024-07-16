function listCorrespondence(lists){
    $("#ajx").html("");
    $("#ajx2").html("");
    lists.forEach(element => {
        if(element.recep){
            titulo = 'Recibida';
            etq = "#ajx";
            cad = element.recep;
        }
        else if(element.expedida){
            titulo = 'Expedida';
            etq = "#ajx2";
            cad = element.expedida;
        }
        js = "<script>"+
             " $(document).ready(function(){"+
                "$('#"+titulo+"').DataTable({"+
                "orderCellsTop: true,"+
                "fixedHeader: true,"+
                "dom: 'lBfrtip',"+
                "buttons: ["+
                "{"+
                "extend: 'pdf',"+
                "text:   'Pdf',"+
                "className:  'btn-sm',"+
                "download :  'open',"+
                "header:     true,"+
                "orientation: 'landscape'"+
                "},{"+
                "extend: 'copy',"+
                "text: 'Copiar',"+
                "className: 'btn-sm'"+
                "},"+
                "]"+
                "});"+
             "});"+
             "</script>";
        html = js +
                '<br><hr><br><h3 class="page-header">Correspondencia '+titulo+'</h3>'+
                '<div class="table-responsive">'+
                '<table class="table" id="'+titulo+'">'+
                '<thead>'+
                '<th>N°</th>'+
                '<th>Tipo</th>'+
                '<th>Unidad</th>'+
                '<th>Referencia</th>'+
                '<th>Fecha</th>'+
                '<th>Opciones</th>'+
                '</thead><tbody>';

        cad.forEach((element2,i) => {
            if(element.recep)
                unidad = element2.senderOff.name;
            else if(element.expedida)
                unidad = element2.receiverOff.name;
            html += '<tr>'+
            '<td>'+(i+1)+'</td>'+
            '<td>'+element2.type+'</td>'+
            '<td>'+unidad+'</td>'+
            '<td>'+element2.reference+'</td>'+
            '<td>'+element2.dateCorresp+'</td>'+
            '<td>'+
            '<a class="btn btn-lg btn-danger btn-sm" href="'+element2.url+'" target="_blank"><i class="fas fa-file-archive fa-2x fa-spin pull-left m-r-10 text-white"></i><b>PDF</b></a>'
            '</td>'+
            '</tr>';
        });
        html += '</tbody></table>';
        $(etq).html(html);
    });
}

