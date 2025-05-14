var myLink = "https://www.empaquessr.com/sistema/fletes/";
function alertComfirmDato(mensaje, tipoDato, botones, miFuncion, json, valor) {
  //console.log(valor);
  ons.notification.prompt({
    title: '',
    inputType: tipoDato,
    buttonLabels: botones,
    message: mensaje,
    cancelable: true,
    defaultValue: valor = valor == undefined ? hoy() : valor,
  }).then(function (input) {
    //$('.text-input').val();
    //console.log($('.text-input'));
    miFuncion(input, json);
  });
}


function nextPage(miPage) {
  myNavigator.pushPage(miPage, { data: { title: '' } });
}
function nextPageFunction(miPage, miFunction) {
  myNavigator.pushPage(miPage, { data: { title: '' } }).then(function () {
    miFunction();
  });
}
function nextPageFunction(miPage, miFunction, datos) {
  myNavigator.pushPage(miPage, { data: { title: '' } }).then(function () {
    miFunction(datos);
  });
}
function vacio(...datos) {
  for (var i = 0; i < datos.length; i++) if (datos[i] == "") return true;

  return false;

}
function alerta(mensaje) {
  ons.notification.alert({
    title: "",
    message: mensaje,
  });
}

function servidor(link, miFuncion) {
  if (window.navigator.onLine) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        miFuncion(this);

      }

    };

    xhttp.open("GET", link, true);
    xhttp.send();
  }
  else {
    alerta('Revisa tu conexión <i style="color:gray" class="fa-solid fa-wifi fa-lg"></i>');
  }

}

function resetearPilaFunction(miFuncion) {
  document.querySelector('ons-navigator').popPage().then(function () {
    miFuncion();
  });
}
function resetearPilaFunction(miFuncion, dato) {
  document.querySelector('ons-navigator').popPage().then(function () {
    miFuncion(dato);
  });
}


//LISTA INFINITA
function listaInfinita(agregarHtml, eliminarLoadingHtml, arrayJson, miFuncion) {
  //alerta(""+arrayJson)
  if (eliminarLoadingHtml != "") $("#" + eliminarLoadingHtml).empty();
  var contador = 1;
  //var resultado;
  var html = '<ons-card style="border-radius:20px"> <center> <h2>Sin resultados...</h2> </center> </ons-card>';

  var infiniteList = document.getElementById(agregarHtml);

  infiniteList.delegate = {
    createItemContent: function (i) {

      if (arrayJson != "") {
        //alert(arrayJson[i]);
        var tempJson = JSON.parse(arrayJson[i]);
      }
      //alert(miFuncion(tempJson,i));
      return ons.createElement(arrayJson == "" ? html : miFuncion(tempJson, i));
    },
    countItems: function () {
      //console.log(arrayJson.length-1);
      return contador = arrayJson == "" ? contador : arrayJson.length - 1;
    }
  };
  infiniteList.refresh();
}


//funcion para mensaje de opciones 
function mensajeArriba(titulo, botones, funcion, datos) {
  ons.openActionSheet({
    title: titulo,
    cancelable: true,
    buttons: botones
  }).then(function (index) {
    funcion(index, datos)
  });
}

//funcion para mensaje de confirmacion
function alertComfirm(mensaje, botones, miFuncion, json) {
  ons.notification.confirm({
    title: "",
    message: mensaje,
    buttonLabels: botones,
    callback: function (idx) {
      miFuncion(idx, json);
    }
  });
}

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
  document.querySelector('ons-navigator').popPage();
}

function formatearFecha(fecha) {
  // Convertir la fecha en un objeto Date
  const fechaObj = new Date(fecha);

  // Array con los nombres de los días de la semana
  const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  // Array con los nombres de los meses
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  // Obtener el día de la semana, el día del mes, el mes y el año
  const diaSemana = diasSemana[fechaObj.getDay() + 1];
  const diaMes = fechaObj.getDate() + 1;
  const mes = meses[fechaObj.getMonth()];
  const anio = fechaObj.getFullYear();

  // Formatear la fecha
  return `${diaSemana} ${diaMes} de ${mes} del ${anio}`;
}
function hoy() {
  var fechaActual = new Date();
  var año = fechaActual.getFullYear();
  var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  var dia = fechaActual.getDate().toString().padStart(2, '0');

  return `${año}-${mes}-${dia}`;
}