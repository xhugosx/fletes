function setBuscarClientesPagado()
{
    $('#loadingClientePagado').empty();
    $('#loadingClientePagado').append("<ons-progress-bar indeterminate></ons-progress-bar>");

    servidor("https://fletes-delgado.000webhostapp.com/fletes/pagado/select.php?fecha1="+fecha1+"&fecha2="+fecha2,getBuscarClientesPagado);
}
function getBuscarClientesPagado(xhttp)
{
    var respuesta = xhttp.responseText;
    var arrayJson = respuesta.split('|');
    listaInfinita('listaClientesPagado','loadingClientePagado',arrayJson,enlistarClientesPagado);
}

function setBuscarClientePagadoServicios(id)
{
    $('#loadingServiciosPagado').empty();
    $('#loadingServiciosPagado').append("<ons-progress-bar indeterminate></ons-progress-bar>");
    servidor("https://fletes-delgado.000webhostapp.com/fletes/pagado/clienteServicios.php?cliente="+id+"&fecha1="+fecha1+"&fecha2="+fecha2,getBuscarClientePagadoServicios);
}
function getBuscarClientePagadoServicios(xhttp)
{
    var respuesta = xhttp.responseText;
    var arrayJson = respuesta.split('|');
    listaInfinita('listaServiciosPagado','loadingServiciosPagado',arrayJson,enlistarClientesPagadoServicios);
}

function enlistarClientesPagadoServicios(arrayJson)
{
    var html="";
        //"id": "2", "origen": "ECO EMPAQUES", "destino": "PCM", "hrInicio": "10:53:00", "hrTermino": "00:52:00", "costo": "1500", "fecha": "2023-06-26", "observaciones": ""
    html += '<ons-card class="enlistar boton" onclick="" style="padding: 15px;">';
    html += '    <div>';
    html += '        <div style="float: right; font-weight: bold; color: gray;">Fecha: '+arrayJson.fecha+'</div>';
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
    html += '        <div style="float: right; font-weight: bold; color: gray;">Pagado: '+arrayJson.fechaPagado+'</div>';
    html += '        <center><div style="font-size: 25px; font-weight: bold; color:#03C03C">  $'+new Intl.NumberFormat().format(arrayJson.costo)+'</div></center>';
    html += '    </div>'; 
    html += '</ons-card>';  


    return html;
}

function enlistarClientesPagado(arrayJson)
{
    var html = "";
    html += '<ons-card class="enlistar boton" onclick="nextPageFunction(\'serviciosPagado.html\',setBuscarClientePagadoServicios,'+arrayJson.id+')">';  
    html += '    <ons-list-item modifier="nodivider">';  
    html += '        <div class="left">';  
    html += '            <i class="fa-solid fa-user fa-2x" style="color: #44BD66"></i> '; 
    html += '        </div>';  
    html += '        <div class="center textoEnlistar" style="color:linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,255,64,1) 100%);">';  
    html += '            <span class="list-item__title" style="font-size:larger;margin-bottom: 5px;">'+arrayJson.nombre+'</span>';
    html += '            <span class="list-item__subtitle">Servicios: '+arrayJson.servicios+'</span>';
    html += '        </div>';
    html += '        <div class="right" style="font-size:large; color:#03C03C"> <span style="font-weight:bold">$'+new Intl.NumberFormat().format(arrayJson.debe)+'</span> </div>' ; 
    html += '    </ons-list-item>';  
    html += '</ons-card>';  
    return html;
}