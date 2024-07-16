var asset = document.getElementById("asset").value;
var rol = '';
var imgVice = asset+'/icaro/img/vice.jpg';
var imgDbie = asset+'/icaro/img/logoazul.jpg';
var imgUatf = asset+'/icaro/img/uatf.png';
var imgPrev = asset+'/icaro/img/previa.jpg';
var fecha = new Date();
var canvasElement = document.getElementById("canvas");

//Propiedades pdf
var footther = {
    fontSize: 9,
    margin: [0,40,0,0],
    alignment:'right',
    stack: [
        [{text:$('#user').val(),bold:true, fontSize:14}],
        'Fecha de Impresión: '+fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+'   Horas: '+fecha.getHours()+':'+fecha.getMinutes()+'.',
        'Proyecto Odiseo - Sistema Icaro'
    ],
};
var imgs={
    vice: imgVice,
    uatf: imgUatf,
    dbie: imgDbie,
    previa: imgPrev
};

function headd (){
    switch(rol){
        case 'ts':
            header='Oficina Trabajo Social';
            break;
        default:
            header={
                text:'"La calidad del servicio depende de la calidad de la persona"',
                italics:'true',
                fontSize:13
            }
    }
    return [{
        columns:[
            {
                margin:[50,20,0,0],
                width: '20%',
                alignment:'left',
                image: 'uatf',
                fit: [90,90]
            },{
                margin:[0,20,0,0],
                width: '60%',
                alignment: 'center',
                color: '#0a1394',
                style: 'header',
                fontSize: 16,
                bold: true,
                stack:[
                    'Universidad Autónoma Tomás Frías',
                    'Vicerrectorado',
                    'Departamento de Bienestar Universitario',
                    '---------------------------------------------------',
                    header
                ],
            },
            {
                margin:[0,20,0,0],
                width: '20%',
                image: 'vice',
                fit: [90,90],
                alignment: 'left'
            }
        ]
    }];
};
function header(doc){
    doc['images']=imgs;
    doc['header']=headd();
    doc['footer']= footerDocL;
    doc['pageMargins']=marginsL;
    doc['background']= backgroundDocLL('');
    doc.content.splice(4,0,footther);
};
function headdSm (){
    return [{
        margin:[45,20,45,0],
        columns:[
            {
                width: '35%',
                alignment: 'center',
                style: 'header',
                fontSize: 9,
                bold: true,
                stack:[
                    'Universidad Autónoma Tomás Frías',
                    'Vicerrectorado',
                    'Departamento de Bienestar Universitario'
                ],
            },
            {
                width: '30%',
                alignment: 'center',
                color: '#0a1394',
                style: 'header',
                fontSize: 16,
                bold: true,
                stack:[
                ],
            },
            {
                width: '35%',
                alignment: 'center',
                style: 'header',
                fontSize: 8,
                stack:[
                    '',
                    'Proyecto Odiseo - Sistema Icaro',
                    'Fecha de Impresión: '+fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+'   Horas: '+fecha.getHours()+':'+fecha.getMinutes()+'.',
                ],
            }
        ]
    }];
}
var footerDocLSm=function(currentPage, pageCount){
    return[{
        margin:[45,0,45,0],
        columns: [
            {
                width: '72%',
                fontSize : 8,
                text: 'Av. Las Banderas, Ciudadela Universitaria, Edificio Vicerrectorado (Primer Piso), Telfono/Fax: 6225489'
            },{
                width: '28%',
                fontSize : 8,
                text: 'Página '+currentPage.toString() +'/' + pageCount,
                alignment: 'right'
            }
          ]
    }];
}
function headerSm(doc,vp){
    doc['images']=imgs;
    doc['header']=headdSm();
    doc['footer']= footerDocLSm;
    doc['background']= backgroundDocLL(vp);
    doc['pageMargins']=marginsLSm;
}
var marginsLSm=[50,60,45,40];
var footerDocL=function (currentPage, pageCount){
    return [{
        margin:[45,0,45,45],
        color: '#0a1394',
        columns: [
            {
                width: '72%',
                fontSize : 10,
                text: '================================================================                                                                        Av. Las Banderas, Ciudadela Universitaria, Edificio Vicerrectorado (Primer Piso)           Telfono/Fax: 6225489 Potosí - Bolivia'
            },{
                width: '28%',
                fontSize : 10,
                margin:[0,20,0,0],
                text: 'Página '+currentPage.toString() +' de ' + pageCount,
                alignment: 'right'
            }
          ]
    }];
};
function backgroundDocL(tip){
    if( tip=='Vp'){
        return [{
            image:'previa',
            width: 480,
        }];
    }
    else{
        return [{
            margin: [210,400,0,0],
            image:'dbie',
            width: 480,
        }];
    }
};
function backgroundDocLL(tip){
    if( tip=='Vp'){
        return [{
            image:'previa'
        }];
    }
    else{
        return [{
            margin: [70,210,0,0],
            image:'dbie',
            width: 480,
        }];
    }
};
var marginsL=[50,120,40,50];
//end Propiedades

function invSocial(tip){
    camp = document.getElementById("campos").value;
    camp = camp.split('-');
    lis= [];
    for(var i=0; i<camp.length-1; i++){
        lis.push([{
            margin: [0,15,0,0],
            text:(i+2)+".- "+camp[i].toUpperCase(),
            bold: true
        },{
            alignment: 'justify',
            text: document.getElementById(camp[i]).value
        }]);
    }
    n='000000'+document.getElementById("id_inv").value;
    fecNac = new Date(document.getElementById("dateInf").value);
    año = fecha.getFullYear()-fecNac.getFullYear();
    qqr='N°'+document.getElementById("id_inv").value+' -*- Apellidos y nombres: '+document.getElementById("nameInf").value+' -*- Carrera: '+document.getElementById("careerInf").value+' -*- Sugerencia: '+(document.getElementById('suggestion').value).toUpperCase();
    cont=[
        {
            text:'INFORME SOCIAL',
            alignment:'center',
            style: 'header',
            fontSize: 14,
            bold: true,
            margin: [0,10,0,0]
        },footther,{
            margin: [0,5,0,0],
            text:'1.- DATOS DE IDENTIFICACIÓN',
            bold: true
        },{
            columns: [

                {
                    width: '30%',
                    margin:[0,20,0,0],
                    fontSize: 11,
                    bold: true,
                    alignment:'right',
                    stack:[
                        'APELLIDOS Y NOMBRES:   ',
                        'FECHA DE NACIMIENTO:   ',
                        'EDAD:   ',
                        'PROCEDENCIA:   ',
                        'ESTADO CIVIL:   ',
                        'INGERSO A LA UNIVERSIDAD:  ',
                        'CARRERA:   ',
                        'NIVEL:   ',
                        'DOMICILIO ACTUAL:   ',
                        'CONTACTO(Sistema): ',
                    ]
                },{
                    width: '50%',
                    fontSize: 11,
                    margin: [20,20,0,0],
                    alignment: 'left',
                    stack:[
                        document.getElementById("nameInf").value,
                        fecNac.toLocaleDateString("es")+'.',
                        año+' años',
                        document.getElementById("lugarN").value,
                        document.getElementById("stateInf").value,
                        document.getElementById("initU").value,
                        document.getElementById("careerInf").value,
                        parseInt(document.getElementById("levelInf").value,10),
                        document.getElementById("addressInf").value,
                        document.getElementById("phone").value
                    ]
                },{
                    width: '20%',
                    margin: [0,20,0,0],
                    stack:[
                        {
                            alignment: 'left',
                            qr: qqr,
                            fit: 100
                        },{
                            bold: true,
                            text:'N° '+n
                        }

                    ]

                }
            ]
        },lis,{
            margin: [0,15,0,0],
            text:'CONCLUSIÓN',
            bold: true
        },{
            alignment: 'justify',
            stack: [
                'me permito sugerir a la instacia pertinente '+(document.getElementById('suggestion').value).toUpperCase()+'.',
                'En cuanto me permito informar para los fines que convengan.'
            ]
        },{
            margin:[0,100,0,0],
            alignment:'center',
            columns: [
                {
                    width:'50%',
                    stack:[
                        $('#tsInv').val(),
                        { bold: true, text:'TRABAJADORA SOCIAL'}
                    ]
                },{
                    width:'50%',
                    margin:[0,40],
                    stack:[
                        'Abog. Carlos Barrientos Calizaya',
                        {text: 'VoBo JEFE DEPARTAMENTO DE BIENESTAR UNIVERSITARIO', bold: true,}
                    ]
                }
            ]
        },footther

    ];

    printPdf('asdas',tip,cont);

}
function downloadImageAsDataUrl(url) {// Define una función para descargar y convertir una imagen en un dataURL
    return fetch(url)
      .then(response => response.blob())
      .then(blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = function() {
            const dataUrl = reader.result;
            resolve(dataUrl);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });
  }
function assingmentInvTsPdf(action,parameter){
    cont=[];
    let cad=parameter.replaceAll('"','');
    cad=cad.replace("[","");
    cad=cad.replace(',"-"]',"");
    cad=cad.split(",-,*,");
    cad.forEach(item => {
        let ts=item.split(",:,");
        cont.push(
            {
                stack:[
                    'Nota de Instrucción',
                    'Asignación de Investigaciones Sociales'
                ],
                fontSize: 15,
                bold:true,
                alignment:'center'
            },{
                stack: [
                    'Trabajador(a) Social: '+ts[0],
                    {
                        text:'Fecha: '+fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+'.',
                        fontSize: 11
                    }],
                margin: [0,20,20,10]
            },{
                text:'Mediante el presente se le INSTRUYE realizar las investigaciones Socioeconómicas, de acuerdo al reglamento de Beca Alimentación en vigencia, art 51. Insc c) “ES RESPONSASBILIDAD DEL DEPARTAMENTO DE BIENESTAR UNIVERSITARIO LLEVAR ADELANTE EL SEGUIMIENTO SOCIO ECONÓMICO DE LOS BENEFICIARIOS PROCEDIENDO A LAS INVESTIGACIONES SOCIALES PERTINENTES de acuerdo a la planificación interna prevista para tal efecto”, para lo cual se envía los siguientes casos:',
                fontSize: 11,
                italics:true,
                alignment:'justify',
                margin:[0,0,0,10]
            }
        );
        tab=[{text:'N',bold:true},
             {text:'Carrera',bold:true},
             {text:'C.I.',bold:true},
             {text:'Apellidos y Nombres', bold:true},
             {text:'Contacto', bold:true},
            ];
        let ests=ts[1].split(",-,");
        tab2=[];
        tab2.push(tab);
        num=1;
        ests.forEach(item3=>{
            slot=item3.split(",");
            aux=[];
            aux.push({text: num, fontSize:9});
            aux.push({text:slot[0].toString(), fontSize:8});
            aux.push({text:slot[1].toString(), fontSize: 8});
            aux.push({text:slot[2].toString()+' '+slot[3].toString()+' '+slot[4].toString(), fontSize: 8});
            aux.push({text:slot[5].toString()+'/ '+slot[6].toString(), fontSize:8});
            tab2.push(aux);
            num++;
        });
        n=tab2.length;
        cont.push({
            layout: 'lightHorizontalLines',
            table:{
                headerRows:1,
                widths:[12,100,60,180,88],
                body:tab2
            }
        },{
            stack:[
                'Abog. Carlos Barrientos Calizaya',
                'Jefatura del Departamento de Bienestar Universitario'
            ],
            bold:true,
            alignment:'center',
            margin:[20,150,0,0],
            pageBreak:'after'
        });
    });


    Promise.all([
        downloadImageAsDataUrl(imgVice),
        downloadImageAsDataUrl(imgUatf),
        downloadImageAsDataUrl(imgDbie),
        downloadImageAsDataUrl(imgPrev)
      ])
        .then(results => {
          var dataUrls = {
            vice: results[0],
            uatf: results[1],
            dbie: results[2],
            previa: results[3]
          };
      
          var docDefinition = {
            pageSize: 'LETTER',
            pageMargins: marginsL,
            images: dataUrls, // Utiliza los dataURLs en lugar de las rutas de las imágenes
            header: headd(),
            footer: [{
              margin: [45, 0, 45, 45],
              color: '#0a1394',
              columns: [{
                width: '72%',
                fontSize: 10,
                text: '================================================================                                                                        Av. Las Banderas, Ciudadela Universitaria, Edificio Vicerrectorado (Primer Piso)           Telfono/Fax: 6225489 Potosí - Bolivia'
              }]
            }],
            background: backgroundDocL(action),
            content: [
              cont
            ]
          };
      
          var pdf = createPdf(docDefinition);
          pdf.open();
        })
        .catch(error => {
          console.error('Error al descargar las imágenes:', error);
        });
}
function printPdf(qrr,tip,cont) {
    var docDefinition = {
        pageSize: 'LETTER',
        pageMargins: marginsL,
        images: imgs,
        header:headd(),
        footer: footerDocL,
        background : backgroundDocL(tip),
        content: [
            cont
        ]
    };

    var pdf = createPdf(docDefinition);
    pdf.open();
}
function printPdfSm(qrr,tip,cont){
    var docDefinition = {
        pageSize: 'LETTER',
        pageMargins: marginsLSm,
        images: imgs,
        header:headdSm(),
        footer: footerDocLSm,
        background : backgroundDocL(tip),
        content: [
            cont
        ]
    };
    var pdf = createPdf(docDefinition);
    pdf.open();
}
function inforComissionExcel(parameter){
    var filename = parameter['head']['career']+"_"+fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+".xlsx";

    var data = [
        ['Informe Ofcial de Beca Alimentacion'],
        [],
        [null,null,null,null,null,null,'COD: '+parameter.head.cod],
        ['Carrera:',parameter['head']['career'],null,'Gestion:',parameter['head']['age']],
        ['Motivo:',parameter['head']['motive'],null,'Fecha:',parameter['head']['infDate']],
        ['Dictamen:',parameter['head']['dictum'],null,'Fecha:',parameter['head']['dictDate']],
        [],
        ['N°','C.I.','Apellidos y Nombres','Sit. Soc','Sit. Acad','Total','Obs','Estado']
    ];
    parameter['note'].forEach(element=>{
        if(element['revisado'] == 'P')
            rev='Bec. Parcial';
        else if(element['revisado'] == 'C')
            rev='Bec. Completa';
        else if(element['revisado'] == 'R')
            rev='Rechazado';
        else
            rev='Error';
        data.push([
            element['nro'],
            element['ci'],
            element['names'],
            element['sit_soc'],
            element['sit_acad'],
            element['total'],
            element['obs'],
            rev
        ]);
    });
    data.push([],['Fecha y hora de generación:',fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()]);
    var ws_name = "Informe";


    var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(data);
    var wbcols = [
		{wpx:10.38},
		{wpx:11},
		{wpx:33},
		{wpx:10.38},
		{wpx:10.38},
		{wpx:10.38},
		{wpx:20},
		{wpx:10.38},
	];
    wb['!cols'] = wbcols;
    /* add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    /* write workbook */
    XLSX.writeFile(wb, filename);

}
function inforComissionPdf(parameter){
    cont = [];
    tab = [[
        {border:[false,true,false,true],text:'N°', bold:true},
        {border:[false,true,false,true],text:'C.I.', bold:true},
        {border:[false,true,false,true],text:'Apellidos y Nombres', bold:true},
        {border:[false,true,false,true],text:'Inves.', bold:true},
        {border:[false,true,false,true],text:'Sit.Soc', bold:true},
        {border:[false,true,false,true],text:'Sit.Acad', bold:true},
        {border:[false,true,false,true],text:'Total', bold:true},
        {border:[false,true,false,true],text:'Obs.', bold:true},
        {border:[false,true,false,true],text:'Estado', bold:true},
    ]];
    parameter['note'].forEach(element => {
        if(element['revisado'] == 'P')
            rev='Bec. Parcial';
        else if(element['revisado'] == 'C')
            rev='Bec. Completa';
        else if(element['revisado'] == 'R')
            rev='Rechazado';
        else
            rev='Error';
        tab.push([
            {text:element['nro']},
            {text:element['ci']},
            {text:element['names']},
            {text:element['invest_soc']},
            {text:element['sit_soc']},
            {text:element['sit_acad']},
            {text:element['total']},
            {text:element['obs']},
            {text:rev}
        ]);
    });
    if(parameter['itms']['inv']>0){
        contTab = [[
            {border:[false,true,false,true],text:'N°', bold:true},
            {border:[false,true,false,true],text:'C.I.', bold:true},
            {border:[false,true,false,true],text:'Apellidos y Nombres', bold:true},
            {border:[false,true,false,true],text:'Obs.', bold:true},
        ]]
        parameter['invs'].forEach(element => {
            contTab.push([
                {text:element['nro']},
                {text:element['ci']},
                {text:element['names']},
                {text:element['obs']},
            ]);
        });
        tab2 = [{
            layout: {
                defaultBorder: false,
                headerLineOnly: true,
                fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex % 2 === 0) ? '#d4d5db' : null;
                }
            },
            headerRows: 1,
            margin: [7,10,0,10],
            fontSize: 8,
            table:{
                widths: [ 13, 50, 200, 200],
                body: contTab
            },
        }];
    }
    else{
        tab2 = [{
            text:'No existen postulantes a investigar.'
        }]
    }
    comision = [];
    parameter['listCom'].forEach(element => {
        comision.push({
            width:130,
            stack:[
                {alignment:'center', text: element['names']},
                {alignment:'center', text: element['type'], bold:true},
                {alignment:'center', text: 'Ci: '+element['ci']},
            ]
        });
    });
    cont.push({
        text        : 'Informe Oficial de Beca Alimentacion',
        bold        : true,
        alignment   : 'center',
        fontSize    : 12
    },{
        layout: 'noBorders',
        margin: [0,10,0,10],
        fontSize: 10,
        table:{
            widths: [ 50, 230, 50, 150 ],
            body:[
                [
                    {},
                    {},
                    {text: '', bold: true},
                    {text: 'Cod: '+parameter.head.cod, bold:true, italics:true, fontSize:12, alignment:'right'}
                ],[
                    {text: 'Carrera: ', bold: true},
                    {text: parameter['head']['career']},
                    {text: 'Gestion: ', bold: true},
                    {text: parameter['head']['age']},
                ],[
                    {text: 'Motivo: ', bold: true},
                    {text: parameter['head']['motive']},
                    {text: 'Fecha: ', bold: true},
                    {text: parameter['head']['infDate']},
                ],[
                    {text: 'Dictamen: ', bold: true},
                    {text: parameter['head']['dictum']},
                    {text: 'Fecha:', bold: true},
                    {text: parameter['head']['dictDate']}
                ]
            ]
        }
    },{
        canvas:[{type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2}]
    },{
        text: 'Calificación de los Postulantes',
        bold: true,
        fontSize: 10,
        alignment: 'center',
        margin: [0,5,0,0]
    },{
        layout: {
            defaultBorder: false,
            headerLineOnly: true,
            fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#d4d5db' : null;
            }
        },
        headerRows: 1,
        margin: [-25,10,0,10],
        fontSize: 8,
        table:{
            widths: [18, 50, 145,40, 32, 32, 32, 86, 50],
            body: tab
        },
    },{
        canvas:[{type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2}]
    },{
        text: 'Nómina de Postulantes a Investigar',
        bold: true,
        fontSize: 11,
        alignment: 'center',
        margin: [0,5,0,0]
    },tab2,{
        canvas:[{type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2}]
    },{
        layout  : {defaultBorder:false},
        margin  : [150,5,0,5],
        fontSize: 10,
        table    : {
            body: [
                [{ colSpan:4, text: 'NRO DE ITEMS PARA LA GESTION', bold: true, alignment: 'center'},{},{},{}],
                [{text:'Items Completos: ', bold:true},{text:parameter['itms']['itCom']},{text:'Items Parciales: ',bold:true},{text:parameter['itms']['itPar']}],
                [{ colSpan:4, text: 'ITEMS EJECUTADOS', bold: true, alignment: 'center'},{},{},{}],
                [{text:'Items Completos: ', bold:true},{text:parameter['itms']['itECom']},{text:'items Parciales: ',bold:true},{text:parameter['itms']['itEPar']}],
                [{text:'Rechazados: ', bold:true},{text:parameter['itms']['rech']},{text:'Items en Custodia: ', bold:true},{text:parameter['itms']['itCust']}],
                [{ colSpan:4, text: 'ITEMS A INVESTIGAR', bold: true, alignment: 'center'},{},{},{}],
                [{text:'Postulantes a Investigar: ', bold:true},{text:parameter['itms']['inv']},{},{}],
            ]
        }
    },{
        canvas:[{type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2}]
    },{
        fontSize : 9,
        margin : [0,60,0,0],
        columns:comision
    });

    printPdfSm('asdf','',cont);
}
function califIndAlimPdf(parameter){
    tab = [[
        {border:[false,true,false,true],text:'Parametro', bold:true},
        {border:[false,true,false,true],text:'Descripcion', bold:true},
        {border:[false,true,false,true],text:'Puntos', bold:true},
    ]];
    parameter['soc'].forEach(element => {
        tab.push([
            {text:element['parametro']},
            {text:element['description']},
            {text:element['points'], alignment:'rigth'},
        ]);
    });
    tab1 = [[
        {border:[false,true,false,true],text:'Parametro', bold:true},
        {border:[false,true,false,true],text:'Descripcion', bold:true},
        {border:[false,true,false,true],text:'Puntos', bold:true},
    ]];
    tab1.push([
        {text:'Ponderacion Historica'},
        {text:'15%'},
        {text:parameter['acad']['historico']}
    ],[
        {text:'Ponderacion Actual'},
        {text:'15%'},
        {text:parameter['acad']['semestre']}
    ]);
    if(parameter['head']['inv']) inv='Sujeto a Investigación Social'; else inv = 'Sin Investigación Social';
    switch(parameter['head']['isbeca']){
        case 'P':
            bec = 'Beca Parcial';
            break;
        case 'C':
            bec = 'Beca Completa';
            break;
        case 'R':
            bec = 'Beca Rechazada';
            break;
    }
    tab2 = [[
        {border:[false,true,false,false],text:'Observaciones:', bold:true},
        {border:[false,true,false,false],text:parameter['head']['obs']},
    ],[
        {text:'Investigación Social:',bold:true},
        {text: inv},
    ],[
        {text:'Puntaje total:',bold:true},
        {text:(parseFloat(parameter['head']['soc'])+parseFloat(parameter['head']['acad'])).toFixed(2)},
    ],[
        {border:[false,false,false,true],text:'Estado:',bold:true},
        {border:[false,false,false,true],text: bec},
    ]];
    comision = [];
    parameter['com'].forEach(element => {
        comision.push({
            width:130,
            stack:[
                {alignment:'center', text: element['names']},
                {alignment:'center', text: element['type'], bold:true},
                {alignment:'center', text: 'Ci: '+element['ci']},
            ]
        });
    });
    cont = [];
    cont.push({
        text        : 'Calificacion de Beca Alimentacion Gestion '+parameter['head']['gestion'],
        bold        : true,
        alignment   : 'center',
        fontSize    : 12
    },{
        fontSize: 10,
        stack   : [
            {text:[ {text:'Faultad:     ', bold: true,},
                    parameter['head']['facultad'],
                ]},
            {text: [{text: 'Carrera:     ', bold:true},parameter['head']['carrera']]},
            {text: [{text: 'Ci:              ', bold:true},parameter['head']['ci'],'                ',
                    {text:' Id Ra:      ',bold:true},parameter['head']['id_ra'],'                ',
                    {text:'Ru:      ', bold: true},parameter['head']['ru']]},
            {text: [{text:'Apellidos y Nombres:  ',bold:true},parameter['head']['names']]},
        ]
    },{
        margin:[0,10,0,10],
        canvas:[{type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2}]
    },{
        text        : 'SITUACIÓN SOCIAL',
        bold        : true,
        fontSize    : 11,
        alignment   : 'center',
    },{
        margin:[0,5,0,5],
        canvas:[{type: 'line', x1: 25, y1: 0, x2: 480, y2: 0, lineWidth: 1}]
    },{
        layout: {
            defaultBorder: false,
            headerLineOnly: true,
            fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#d4d5db' : null;
            }
        },
        margin:[0,0,0,10],
        headerRows: 1,
        fontSize: 10,
        table:{
            widths: [ 200, 220, 50],
            body: tab
        },
    },{
        text: 'Ponderacion Social(70%): '+parameter['head']['soc'],
    },{
        margin:[0,10,0,10],
        canvas:[{type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2}]
    },{
        text        : 'SITUACIÓN ACADÉMICA',
        bold        : true,
        fontSize    : 11,
        alignment   : 'center',
    },{
        margin:[0,5,0,5],
        canvas:[{type: 'line', x1: 25, y1: 0, x2: 480, y2: 0, lineWidth: 1}]
    },{
        layout: {
            defaultBorder: false,
            headerLineOnly: true,
            fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#d4d5db' : null;
            }
        },
        margin:[0,0,0,10],
        headerRows: 1,
        fontSize: 10,
        table:{
            widths: [ 200, 220, 50],
            body: tab1
        },
    },{
        text: 'Ponderacion Académica(30%): '+parameter['head']['acad'],
    },{
        margin:[0,10,0,10],
        canvas:[{type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2}]
    },{
        text        : 'CONSIDERACIONES FINALES',
        bold        : true,
        fontSize    : 11,
        alignment   : 'center',
    },{
        margin:[0,5,0,5],
        canvas:[{type: 'line', x1: 25, y1: 0, x2: 480, y2: 0, lineWidth: 1}]
    },{
        layout: {
            defaultBorder: false,
            headerLineOnly: true,
            fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#d4d5db' : null;
            }
        },
        margin:[10,0,0,10],
        fontSize: 10,
        table:{
            widths: [ 150, 330],
            body: tab2
        },
    },{
        fontSize : 9,
        margin : [0,30,0,0],
        columns:comision
    });
    printPdfSm('asd','',cont);
}
$('#tableInvCom').DataTable({
    dom: 'lBfrtip',
    buttons: [
        {
            extend: 'pdf',
            text: 'pdf',
            className: 'btn-sm',
            download :'open',
            orientation: 'landscape',
            customize: function(doc){
                header(doc);
                doc.content.splice(1,0,{
                    margin:[0,10,0,5],
                    alignment: 'center',
                    text: 'Listas de Investigación',
                    fontSize: 15,
                    bold: true
                });
                doc.content.splice(2,0,{
                    margin:[0,5,0,10],
                    columns:[{
                        width:'50%',
                        stack:[
                            'Facultad: ',
                            'Carrera: '
                        ],
                        margin:[0,0,20,0]
                    },{
                        width:'50%',
                        stack:[
                            'Gestion:',
                            'Periodo: '
                        ],
                        margin:[0,0,20,0]
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

$('#tableLisBA').DataTable({
    dom: 'lBfrtip',
    buttons: [
        {
            extend: 'pdf',
            text: 'pdf',
            className: 'btn-sm',
            download :'open',
            orientation: 'landscape'
        },{
            extend: 'copy',
            text: 'Copiar',
            className: 'btn-sm'
        }
    ]
});
$(document).ready(function(){
    $('#tableTracingInv thead tr').clone(true).appendTo('#tableTracingInv thead');
    $('#tableTracingInv thead tr:eq(1) th').each( function (i) {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Buscar" />' );
        $( 'input', this ).on( 'keyup change', function () {
            if ( table.column(i).search() !== this.value ) {
                table
                    .column(i)
                    .search( this.value )
                    .draw();
            }
        } );
    } );
    var table=$('#tableTracingInv').DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'pdf',
                text: 'pdf',
                className: 'btn-sm',
                download :'open',
                exportOptions:{
                    columns:":not(.no-exportar)"
                },
                customize: function(doc){
                    header(doc,'Lista de investigación','Trabajadora Social','Lista de investigaciones pendientes');
                    doc.content.splice(0,1,{
                        alignment:'center',
                        text:'Seguimiento de Investigaciones',
                        fontSize: 15,
                        bold: true
                    });
                },
            },{
                extend: 'copy',
                text: 'Copiar',
                className: 'btn-sm'
            }
        ]
    });
});
