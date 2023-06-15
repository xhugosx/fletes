function setAgregarServicio()
{
    var origen = $('#origen').val();
    var destino = $('#destino').val();
    var hrInicio = $('#hrInicio').val();
    var hrTermino = $('#hrTermino').val();
    var costo = $('#costo').val();
    var fecha = $('#fecha').val();
    var observaciones = $('#observaciones').val();
    var idCliente = $('#cliente').val();
    if(!vacio(origen,destino,hrInicio,hrTermino,costo,fecha,idCliente))
    {
        servidor("https://fletes-delgado.000webhostapp.com/fletes/servicio/add.php?destino="+destino+"&origen="+origen+"&hrInicio="+hrInicio+"&hrTermino="+hrTermino+"&costo="+costo+"&fecha="+fecha+"&observaciones="+observaciones+"&idCliente="+idCliente,getAgregarServicio);
    }
    else alerta("Espacios vacios!")

    //console.log(origen,destino,hrInicio,hrTermino,costo,fecha,observaciones);
}
function getAgregarServicio(xhttp)
{
    var respuesta = xhttp.responseText;
    if(respuesta == 1 ) 
    {
        alerta("Servicio Registrado con Exito!");
        resetearPilaFunction(setBuscarHome);
    }
    //alerta(""+respuesta)
}

function setBuscarClienteServicio()
{
    servidor("https://fletes-delgado.000webhostapp.com/fletes/cliente/select.php",getBuscarClienteServicio);
}
function getBuscarClienteServicio(xhttp)
{
    var respuesta = xhttp.responseText;
    //console.log(respuesta);
    var arrayJson = respuesta.split("|");
    for(i=0;i<arrayJson.length-1; i++) 
    {
        arrayJson[i] =  JSON.parse(arrayJson[i]);
        $("#cliente").append('<option value="'+arrayJson[i].codigo+'" >'+arrayJson[i].nombre+'</option>')
    }

    console.log(arrayJson);
}