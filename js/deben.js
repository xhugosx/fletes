
//bucar cliente para editarlo

function setBuscarServicioEditar(id)
{
    //llenar option de los clientes
    setBuscarClienteServicio();
    servidor("https://fletes-delgado.000webhostapp.com/fletes/deben/clienteServicios.php?id="+id,getBuscarServicioEditar);
}
function getBuscarServicioEditar(xhttp)
{
    var respuesta = xhttp.responseText;
    var arrayJson = respuesta.split('|');
    var tempJson = JSON.parse(arrayJson[0]);
    $('#origen').val(tempJson.origen);
    $('#destino').val(tempJson.destino);
    $('#hrInicio').val(tempJson.hrInicio);
    $('#hrTermino').val(tempJson.hrTermino);
    $('#costo').val(tempJson.costo);
    $('#fecha').val(tempJson.fecha);
    $('#observaciones').val(tempJson.observaciones);
    $('#cliente').val(tempJson.idCliente);
    
}

function setMandarIngresoServicio(idServicio,fecha)
{
    servidor("https://fletes-delgado.000webhostapp.com/fletes/servicio/update.php?idServicio="+idServicio+"&fecha="+fecha,getMandarIngresoServicio);
}
function getMandarIngresoServicio(xhttp)
{
    var respuesta = xhttp.responseText;
    if(respuesta == 1)
    {
        alerta("Servicio Pagado");
        resetearPilaFunction(setBuscarClientesDeben);
    }
}


function setEliminarServicioDeben(id)
{
    servidor("https://fletes-delgado.000webhostapp.com/fletes/servicio/delete.php?id="+id,getEliminarServicioDeben);
}
function getEliminarServicioDeben(xhttp)
{
    var respuesta = xhttp.responseText;
    if(respuesta == 1)
    {
        alerta("Servicio Eliminado");
        resetearPilaFunction(setBuscarClientesDeben);
    }
}


function setBuscarClientesDeben()
{
    var fechaInicio = 0;
    var fechaTermino = 0;
    $('#loadingClienteDeben').empty();
    $('#loadingClienteDeben').append("<ons-progress-bar indeterminate></ons-progress-bar>");

    servidor("https://fletes-delgado.000webhostapp.com/fletes/deben/select.php",getBuscarClientesDeben);
    // actualizar siempre la pagina principal
    setBuscarHome();
}
function getBuscarClientesDeben(xhttp)
{
    var respuesta = xhttp.responseText;
    var arrayJson = respuesta.split('|');
    listaInfinita('listaClientesDeben','loadingClienteDeben',arrayJson,enlistarClientesDeben);
    //console.log(arrayJson);
}


function setBuscarClienteDebeServicios(id)
{
    $('#loadingServicios').empty();
    $('#loadingServicios').append("<ons-progress-bar indeterminate></ons-progress-bar>");
    servidor("https://fletes-delgado.000webhostapp.com/fletes/deben/clienteServicios.php?cliente="+id,getBuscarClienteDebeServicios);
    //console.log("https://fletes-delgado.000webhostapp.com/fletes/deben/clienteServicios.php?cliente="+id)
}
function getBuscarClienteDebeServicios(xhttp)
{
    var respuesta = xhttp.responseText;
    var arrayJson = respuesta.split('|');
    listaInfinita('listaServicios','loadingServicios',arrayJson,enlistarClientesServicios);
    //console.log(arrayJson);
}


//mensjae de opciones debe servicio
function opcionesDeben(...datos)
{
    mensajeArriba("<b>Opciones</b>",["<span style=\"color:#03C03C\">Ya pago!</span>","Editar","Eliminar"],botonesOpcionesDeben,datos);
}
function botonesOpcionesDeben(index,datos)
{
    //console.log(datos);
    if(index == 0) alertComfirmDato("Cuando Pago?","date","Aceptar",mensajeConfirmarFecha,datos[0]);//nextPageFunction('clienteEditar.html',llenarDatosCliente,datos); //alerta("Entro en editar"+datos);
    else if(index == 1) nextPageFunction("servicioEditar.html",setBuscarServicioEditar,datos[0]);
    else if(index == 2) alertComfirm("Estas seguro de eliminar este Servicio?",["Aceptar","Cancelar"],confirmarEliminarServicio,datos[0]);
}

//funcion para mensaje de confirm con dato de fecha
function mensajeConfirmarFecha(index,datos)
{
    var id = datos;
    if(index == "") alerta("Selecciona la fecha primero"); 
    else if(index != null) setMandarIngresoServicio(id,index);
    //console.log(index,datos)

}

//funcion para confirmar eliminar
function confirmarEliminarServicio(index,id)
{
    if(index == 0) setEliminarServicioDeben(id); 
}

function enlistarClientesServicios(arrayJson)
{
    var html="";
        //"id": "2", "origen": "ECO EMPAQUES", "destino": "PCM", "hrInicio": "10:53:00", "hrTermino": "00:52:00", "costo": "1500", "fecha": "2023-06-26", "observaciones": ""
    html += '<ons-card class="enlistar boton" onclick="opcionesDeben('+arrayJson.id+')" style="padding: 15px;">';
    html += '    <div>';
    html += '        <div style="float: right; font-weight: bold; color: gray;">'+arrayJson.fecha+'</div>';
    html += '        <table>';
    html += '            <tr>';
    html += '                <td style="font-weight: bold">Origen:</td> ';
    html += '                <td style="font-weight: bold">Destino:</td> ';
    html += '            </tr>';
    html += '            <tr>';
    html += '                <td >'+arrayJson.origen+'</td>';
    html += '                <td>'+arrayJson.destino+'</td>';
    html += '            </tr>';
    html += '            <tr>';
    html += '                <td style="font-weight: bold">Inicio</td>';
    html += '                <td style="font-weight: bold">Termino</td>';
    html += '            </tr>';
    html += '            <tr>';
    html += '                <td>'+arrayJson.hrInicio+'</td>';
    html += '                <td>'+arrayJson.hrTermino+'</td>';
    html += '            </tr>';
    html += '            <tr>';
    html += '                <td style="font-weight: bold">Observaciones: </td>';
    html += '            </tr>';
    html += '            <tr>';
    html += '                 <td>'+(arrayJson.observaciones == "" ? "(sin observaciones)" : arrayJson.observaciones) +'</td>';
    html += '            </tr>';
    html += '        </table>';
    html += '        <br>';
    html += '        <center><div style="font-size: 25px; font-weight: bold; color:#C23B22">  $ '+new Intl.NumberFormat().format(arrayJson.costo)+'</div></center>';
    html += '    </div>'; 
    html += '</ons-card>';  


    return html;
}


function enlistarClientesDeben(arrayJson)
{
    var html = "";
    html += '<ons-card class="enlistar boton" onclick="nextPageFunction(\'servicios.html\',setBuscarClienteDebeServicios,'+arrayJson.id+')">';  
    html += '    <ons-list-item modifier="nodivider">';  
    html += '        <div class="left">';  
    html += '            <i class="fa-solid fa-user fa-2x" style="color: #44BD66"></i> '; 
    html += '        </div>';  
    html += '        <div class="center textoEnlistar" style="color:linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,255,64,1) 100%);">';  
    html += '            <span class="list-item__title" style="font-size:larger;margin-bottom: 5px;">'+arrayJson.nombre+'</span>';
    html += '            <span class="list-item__subtitle">Servicios: '+arrayJson.servicios+'</span>';
    html += '        </div>';
    html += '        <div class="right" style="font-size:large; color:#C23B22"> <span style="font-weight:bold">$ '+new Intl.NumberFormat().format(arrayJson.debe)+'</span> </div>' ; 
    html += '    </ons-list-item>';  
    html += '</ons-card>';  
    return html;
}