//funcion para editar cliente
function setEditarCliente()
{
    var nombre = $('#cliente').val();
    var id = $('#id').val();
    if(!vacio(nombre)) servidor("https://fletes-delgado.000webhostapp.com/fletes/cliente/update.php?id="+id+"&nombre="+nombre,getEditarCliente);
    else alerta("Estan los espacios vacios!");
}
function getEditarCliente(xhttp)
{
    var respuesta = xhttp.responseText;
    if(respuesta == 1) 
    {
        alerta("Cliente Editado!");
        resetearPilaFunction(setMostrarClientes); 
    }
}



//funcion para eliminar el cliente
function setEliminarCliente(id)
{
    servidor("https://fletes-delgado.000webhostapp.com/fletes/cliente/delete.php?id="+id,getEliminarCliente);
}
function getEliminarCliente(xhttp)
{
    var respuesta = xhttp.responseText;
    if(respuesta == 1)
    {
        alerta("Cliente eliminado con EXITO!");
        setMostrarClientes();
    }
}



//funcion para agregar los clientes
function setAgregarClient()
{
    var nombre = $("#cliente").val();
    if(!vacio(nombre))
    {
        servidor("https://fletes-delgado.000webhostapp.com/fletes/cliente/add.php?nombre="+nombre,getAgregarCliente);
    }
    else alerta("Espacios Vacios!");
    
}
function getAgregarCliente(xhttp)
{
    var respuesta = xhttp.responseText;

    if (respuesta == 1) 
    {
        alerta("Cliente Registrado!");
        resetearPilaFunction(setMostrarClientes);
    }

}



//funcion para mostrar los clientes
function setMostrarClientes()
{
    $('#loadingCliente').empty();
    $('#loadingCliente').append("<ons-progress-bar indeterminate></ons-progress-bar>");
    servidor("https://fletes-delgado.000webhostapp.com/fletes/cliente/select.php",getMostrarClientes);
}

function getMostrarClientes(xhttp)
{
    var respuesta = xhttp.responseText;
    var arrayJson = respuesta.split('|');
    listaInfinita('listaClientes','loadingCliente',arrayJson,enlistarClientes);

    //alerta(arrayJson);
}




//funcion para mostrar clientes
function enlistarClientes(arrayJson)
{
    //console.log(arrayJson);
    let html1 = "";
   
    html1 += '<ons-card class="enlistar boton" onclick="opciones(\''+arrayJson.codigo+'\',\''+arrayJson.nombre+'\')"> ';
    html1 += '    <ons-list-item modifier="nodivider"> ';
    html1 += '        <div class="left"> ';
    html1 += '            <i class="fa-solid fa-user fa-2x" style="color: #44BD66"></i> ';
    html1 += '        </div> ';
    html1 += '        <div class="center textoEnlistar" style="color:linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,255,64,1) 100%);"> ';
    html1 += arrayJson.nombre;
    html1 += '        </div>'; 
    html1 += '    </ons-list-item> ';
    html1 += '</ons-card>'; 

    return html1;
}


//mensjae de opciones
function opciones(...datos)
{
    mensajeArriba("<b>Opciones</b>",["Editar","Eliminar"],botonesOpciones,datos);
}
function botonesOpciones(index,datos)
{
    console.log(datos);
    if(index == 0) nextPageFunction('clienteEditar.html',llenarDatosCliente,datos); //alerta("Entro en editar"+datos);
    else if(index == 1) alertComfirm("Estas seguro de eliminar este cliente?",["Aceptar","Cancelar"],confirmarEliminar,datos[0]); //setEliminarCliente(id)
}


//funcion para confirmar eliminar
function confirmarEliminar(index,codigo)
{
    if(index == 0) setEliminarCliente(codigo);  
}

//funcion para llenar los datos
function llenarDatosCliente(datos)
{
    $('#cliente').val(datos[1]);
    $('#id').val(datos[0]);
}