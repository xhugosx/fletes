function alertComfirmDato(mensaje,tipoDato,botones,miFuncion,json)
{
  ons.notification.prompt({
    title: '',
    inputType: tipoDato,
    buttonLabels: botones,
    message: mensaje,
    cancelable : true,
    }).then(function(input) {
     miFuncion(input,json);
  });
}


function nextPage(miPage)
{
    myNavigator.pushPage(miPage, {data: {title: ''}});
}
function nextPageFunction(miPage,miFunction)
{
    myNavigator.pushPage(miPage, {data: {title: ''}}).then(function(){ 
        miFunction(); 
    });
}
function nextPageFunction(miPage,miFunction,datos)
{
    myNavigator.pushPage(miPage, {data: {title: ''}}).then(function(){ 
        miFunction(datos); 
    });
}
function vacio(...datos)
{
  for(var i = 0; i<datos.length;i++) if(datos[i] == "") return true;

  return false;

}
function alerta(mensaje)
{
    ons.notification.alert({
        title: "",
        message: mensaje,
    });
}

function servidor(link,miFuncion)
{
  if(window.navigator.onLine){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            miFuncion(this);

        }
    
    };

    xhttp.open("GET",link,true);
    xhttp.send();
  }
  else{
    alerta('Revisa tu conexión <i style="color:gray" class="fa-solid fa-wifi fa-lg"></i>');
  }
   
}

function resetearPilaFunction(miFuncion)
{
    document.querySelector('ons-navigator').popPage().then(function(){
        miFuncion();
    }); 
}
function resetearPilaFunction(miFuncion,dato)
{
    document.querySelector('ons-navigator').popPage().then(function(){
        miFuncion(dato);
    }); 
}


//LISTA INFINITA
function listaInfinita(agregarHtml,eliminarLoadingHtml,arrayJson,miFuncion)
{
  //alerta(""+arrayJson)
  if(eliminarLoadingHtml!="")$("#"+eliminarLoadingHtml).empty();
  var contador = 1;
  //var resultado;
  var html = '<ons-card style="border-radius:20px"> <center> <h2>Sin resultados...</h2> </center> </ons-card>';

  var infiniteList = document.getElementById(agregarHtml);
  
  infiniteList.delegate = {
    createItemContent: function(i) {
        
      if(arrayJson!=""){
        //alert(arrayJson[i]);
        var tempJson = JSON.parse(arrayJson[i]);
      }
      //alert(miFuncion(tempJson,i));
      return  ons.createElement(arrayJson==""  ? html : miFuncion(tempJson,i));
    },
    countItems: function() {
      //console.log(arrayJson.length-1);
    return contador = arrayJson=="" ? contador : arrayJson.length-1;
    }
  };
  infiniteList.refresh();
}


//funcion para mensaje de opciones 
function mensajeArriba(titulo,botones,funcion,datos) 
{
    ons.openActionSheet({
      title: titulo,
      cancelable: true,
      buttons: botones
    }).then(function (index) { 
      funcion(index,datos)
    });
}

//funcion para mensaje de confirmacion
function alertComfirm(mensaje,botones,miFuncion,json)
{
  ons.notification.confirm({
    title :"",
    message: mensaje,
    buttonLabels: botones,
    callback: function(idx) {
      miFuncion(idx,json);
    } 
  });
}